import fs from "node:fs";
import path from "node:path";

const API = "https://onepiece.fandom.com/pt/api.php";
const PAGE = "Linha_do_Tempo_do_Mundo";

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

async function fetchWikitext() {
  const url =
    `${API}?action=query&format=json&formatversion=2` +
    `&prop=revisions&rvprop=content&rvslots=main&titles=${encodeURIComponent(PAGE)}`;

  const res = await fetch(url, { headers: { "User-Agent": "onepiece-timeline-json/1.0" } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ao buscar wikitext`);
  const data = await res.json();
  const page = data?.query?.pages?.[0];
  const text = page?.revisions?.[0]?.slots?.main?.content;
  if (!text) throw new Error("Não achei wikitext na resposta. O formato do endpoint pode ter mudado.");
  return text;
}

function parseTimeline(wikitext) {
  const lines = wikitext.split("\n");
  const yearsMap = new Map();
  let currentYear = null;

  const yearHeaderRe = /^={2,5}\s*(.+?)\s*={2,5}\s*$/;
  const bulletRe = /^\*\s*(.+)\s*$/;
  const cmEcRe = /CM\D*([0-9]{1,4})\D+EC\D*([0-9]{1,4})/i;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const yh = line.match(yearHeaderRe);
    if (yh) {
      const title = yh[1].trim();

      const cmNum = title.match(/([0-9]{1,4})/);
      currentYear = cmNum ? Number(cmNum[1]) : null;

      if (currentYear !== null && !yearsMap.has(currentYear)) {
        yearsMap.set(currentYear, { CM: currentYear, EC: null, approx: /~|c\.|aprox/i.test(title), events: [] });
      }
      continue;
    }

    const b = line.match(bulletRe);
    if (b && currentYear !== null) {
      const body = b[1];

      const cleaned = body
        .replace(/\[\[(.+?\|)?(.+?)\]\]/g, "$2")
        .replace(/<ref[^>]*>.*?<\/ref>/g, "")
        .replace(/{{.*?}}/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleaned) continue;

      const [title, ...rest] = cleaned.split(" — ");
      const subtitle = rest.join(" — ").trim();

      const m = cleaned.match(cmEcRe);
      if (m) {
        const cm = Number(m[1]);
        const ec = Number(m[2]);
        const y = yearsMap.get(currentYear);
        if (y && y.EC == null) y.EC = ec;
      }

      const id = `${currentYear}-${slugify(title)}`;

      yearsMap.get(currentYear).events.push({
        id,
        title: title.trim(),
        subtitle: subtitle || "",
        sources: [
          { label: "Linha do Tempo do Mundo - One Piece Wiki", url: "https://onepiece.fandom.com/pt/wiki/Linha_do_Tempo_do_Mundo" }
        ]
      });
    }
  }

  const years = [...yearsMap.values()].sort((a, b) => a.CM - b.CM);
  return years;
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
    label: y.EC ? `${y.CM} CM / ${y.EC} EC${y.approx ? " (~)" : ""}` : `${y.CM} CM${y.approx ? " (~)" : ""}` 
  }));

  fs.writeFileSync(yearsPath, JSON.stringify({ years: yearsIndex }, null, 2), "utf-8");

  for (const y of years) {
    const previews = y.events.map((e) => ({
      id: e.id,
      title: e.title,
      subtitle: e.subtitle,
      importance: "unknown"
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
        whatHappened: "",
        keyCharacters: [],
        importance: "unknown",
        sources: e.sources
      };

      fs.writeFileSync(path.join(eventsDir, `${e.id}.json`), JSON.stringify(detail, null, 2), "utf-8");
    }
  }
}

async function main() {
  console.log("📥 Baixando wikitext da timeline...");
  const wikitext = await fetchWikitext();
  
  fs.writeFileSync("wikitext-debug.txt", wikitext, "utf-8");
  console.log("💾 Wikitext salvo em wikitext-debug.txt para inspeção");

  console.log("🔍 Parseando timeline...");
  const years = parseTimeline(wikitext);

  if (years.length < 5) {
    console.warn("⚠️ Poucos anos detectados. Provavelmente precisa ajustar as regex ao formato real do wikitext.");
  }

  console.log(`📊 Encontrados ${years.length} anos com eventos`);
  
  writeOutputs(years);
  console.log(`✅ Gerado: ${years.length} anos. Arquivos em public/data/`);
}

main().catch((err) => {
  console.error("❌ Erro:", err);
  process.exit(1);
});
