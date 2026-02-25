const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

function cleanWikitext(text) {
  return text
    .replace(/\[\[(.+?\|)?(.+?)\]\]/g, "$2")
    .replace(/<ref[^>]*>.*?<\/ref>/gi, "")
    .replace(/{{Cref[^}]*}}/gi, "")
    .replace(/{{br}}/gi, " ")
    .replace(/{{Nihongo[^}]*}}/gi, "")
    .replace(/{{W\|([^}]+)}}/gi, "$1")
    .replace(/{{Âncora[^}]*}}/gi, "")
    .replace(/'''([^']+)'''/g, "$1")
    .replace(/''([^']+)''/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTimeline(wikitext) {
  const yearsMap = new Map();
  
  const templateRegex = /{{Linha do Tempo\|([^|]+)\|eventos=([\s\S]*?)}}/g;
  
  let match;
  while ((match = templateRegex.exec(wikitext)) !== null) {
    const yearStr = match[1].trim();
    const eventsText = match[2].trim();
    
    if (yearStr === 'TOPO') continue;
    
    const isApprox = yearStr.startsWith('~');
    const yearNum = parseInt(yearStr.replace(/[~\s]/g, ''));
    
    if (isNaN(yearNum)) continue;
    
    const eventLines = eventsText
      .split(/\n\n+/)
      .map(line => cleanWikitext(line))
      .filter(line => line.length > 10);
    
    if (eventLines.length === 0) continue;
    
    if (!yearsMap.has(yearNum)) {
      yearsMap.set(yearNum, {
        CM: yearNum,
        EC: null,
        approx: isApprox,
        events: []
      });
    }
    
    const year = yearsMap.get(yearNum);
    
    for (const eventText of eventLines) {
      const cmEcMatch = eventText.match(/Calendário do Círculo do Mar (\d+)/i);
      if (cmEcMatch) {
        const cmFromText = parseInt(cmEcMatch[1]);
        if (!isNaN(cmFromText) && year.EC === null) {
          year.EC = cmFromText + 2600;
        }
      }
      
      let title = eventText;
      let subtitle = "";
      
      const colonIndex = eventText.indexOf(':');
      if (colonIndex > 0 && colonIndex < 100) {
        const beforeColon = eventText.substring(0, colonIndex).trim();
        if (beforeColon.length < 80 && !beforeColon.includes('.')) {
          title = beforeColon;
          subtitle = eventText.substring(colonIndex + 1).trim();
        }
      }
      
      if (title.length > 150) {
        const sentences = title.split(/\.\s+/);
        if (sentences.length > 1) {
          title = sentences[0];
          subtitle = sentences.slice(1).join('. ');
        } else {
          title = title.substring(0, 147) + "...";
        }
      }
      
      const id = `cm-${yearNum}-${slugify(title)}`;
      
      year.events.push({
        id,
        title: title.substring(0, 200),
        subtitle: subtitle.substring(0, 300),
        fullText: eventText,
        sources: [
          { 
            label: "Linha do Tempo do Mundo - One Piece Wiki", 
            url: "https://onepiece.fandom.com/pt/wiki/Linha_do_Tempo_do_Mundo",
            type: "other"
          }
        ]
      });
    }
  }
  
  const years = [...yearsMap.values()].sort((a, b) => a.CM - b.CM);
  
  for (const year of years) {
    if (year.EC === null) {
      year.EC = year.CM + 2600;
    }
  }
  
  return years;
}

function categorizeImportance(eventText) {
  const globalKeywords = [
    'governo mundial', 'joy boy', 'século vazio', 'grande guerra',
    'roger', 'one piece', 'laugh tale', 'armas antigas', 'poneglyph',
    'dragões celestiais', 'mary geoise', 'grande era pirata'
  ];
  
  const regionalKeywords = [
    'reino', 'ilha', 'país', 'cidade', 'tribo', 'família'
  ];
  
  const lowerText = eventText.toLowerCase();
  
  for (const keyword of globalKeywords) {
    if (lowerText.includes(keyword)) return 'global';
  }
  
  for (const keyword of regionalKeywords) {
    if (lowerText.includes(keyword)) return 'regional';
  }
  
  return 'local';
}

function writeOutputs(years) {
  const base = path.join(process.cwd(), "public", "data");
  const yearsPath = path.join(base, "years.json");
  const byYearDir = path.join(base, "events-by-year");
  const eventsDir = path.join(base, "events");

  ensureDir(byYearDir);
  ensureDir(eventsDir);

  const yearsIndex = years.map((y) => ({
    id: `cm-${y.CM}`,
    CM: y.CM,
    EC: y.EC,
    approx: y.approx,
    label: `${y.CM} CM / ${y.EC} EC${y.approx ? " (~)" : ""}`
  }));

  fs.writeFileSync(yearsPath, JSON.stringify({ years: yearsIndex }, null, 2), "utf-8");
  console.log(`✅ years.json criado com ${yearsIndex.length} anos`);

  let totalEvents = 0;
  
  for (const y of years) {
    const previews = y.events.map((e) => ({
      id: e.id,
      title: e.title,
      subtitle: e.subtitle,
      importance: categorizeImportance(e.fullText)
    }));

    fs.writeFileSync(
      path.join(byYearDir, `${y.CM}.json`),
      JSON.stringify({ year: { CM: y.CM, EC: y.EC }, events: previews }, null, 2),
      "utf-8"
    );

    for (const e of y.events) {
      const detail = {
        id: e.id,
        year: { CM: y.CM, EC: y.EC },
        title: e.title,
        subtitle: e.subtitle,
        whatHappened: e.fullText,
        keyCharacters: [],
        importance: categorizeImportance(e.fullText),
        sources: e.sources
      };

      fs.writeFileSync(
        path.join(eventsDir, `${e.id}.json`), 
        JSON.stringify(detail, null, 2), 
        "utf-8"
      );
      totalEvents++;
    }
  }
  
  console.log(`✅ ${years.length} arquivos events-by-year/*.json criados`);
  console.log(`✅ ${totalEvents} arquivos events/*.json criados`);
}

function main() {
  console.log("📖 Lendo wikitext-debug.txt...");
  
  if (!fs.existsSync("wikitext-debug.txt")) {
    console.error("❌ Arquivo wikitext-debug.txt não encontrado!");
    console.error("Execute primeiro: node scripts/fetch-wikitext.js");
    process.exit(1);
  }
  
  const wikitext = fs.readFileSync("wikitext-debug.txt", "utf-8");
  
  console.log("🔍 Parseando timeline...");
  const years = parseTimeline(wikitext);

  console.log(`📊 Encontrados ${years.length} anos com eventos`);
  
  if (years.length < 10) {
    console.warn("⚠️ Poucos anos detectados. Verificando...");
  }
  
  const sampleYear = years.find(y => y.CM === 1517);
  if (sampleYear) {
    console.log(`\n📋 Exemplo - Ano ${sampleYear.CM}:`);
    console.log(`   Eventos: ${sampleYear.events.length}`);
    sampleYear.events.slice(0, 2).forEach(e => {
      console.log(`   - ${e.title}`);
    });
  }
  
  writeOutputs(years);
  console.log(`\n✅ Concluído! Arquivos gerados em public/data/`);
}

main();
