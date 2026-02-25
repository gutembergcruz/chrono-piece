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
    .slice(0, 60);
}

const timelineData = [
  {
    yearsAgo: 5000,
    CM: null,
    EC: null,
    approx: true,
    events: [
      {
        title: "Plantio da Árvore do Conhecimento",
        subtitle: "Início da história de Ohara",
        description: "A Árvore do Conhecimento foi plantada pelo antigo povo de Ohara, marcando o início de uma longa tradição de busca pelo conhecimento na ilha.",
        characters: ["Povo de Ohara"],
        importance: "regional",
        sources: [
          { label: "Yellow Databook - pág. 233", type: "databook" }
        ]
      }
    ]
  },
  {
    yearsAgo: 4000,
    CM: null,
    EC: null,
    approx: true,
    events: [
      {
        title: "Construção do Palácio de Alubarna",
        subtitle: "Erguido no Reino de Alabasta",
        description: "Foi construído o Palácio de Alubarna, que se tornaria a sede do Reino de Alabasta por milênios.",
        characters: ["Reino de Alabasta"],
        importance: "regional",
        sources: [
          { label: "Capítulo 188 - Volume 21", type: "manga" },
          { label: "Episódio 115", type: "anime" }
        ]
      }
    ]
  },
  {
    yearsAgo: 3000,
    CM: null,
    EC: null,
    approx: true,
    events: [
      {
        title: "Construção em Elbaph",
        subtitle: "Instalação antiga erguida",
        description: "Uma instalação foi construída em Elbaph, a ilha dos gigantes, cuja função permanece misteriosa até os dias atuais.",
        characters: ["Gigantes de Elbaph"],
        importance: "regional",
        sources: [
          { label: "Capítulo 1144 - pág. 2-3", type: "manga" }
        ]
      }
    ]
  },
  {
    yearsAgo: 1500,
    CM: 0,
    EC: 2600,
    approx: true,
    events: [
      {
        title: "Possível Início da Era do Círculo do Mar",
        subtitle: "Estabelecimento do calendário marítimo",
        description: "Este é o possível início da Era do Círculo do Mar (Calendário do Mar), o sistema de datação usado por navegadores e exploradores.",
        characters: [],
        importance: "global",
        sources: [
          { label: "Capítulo 228", type: "manga" }
        ]
      }
    ]
  },
  {
    yearsAgo: 1100,
    CM: 402,
    EC: 3002,
    approx: true,
    events: [
      {
        title: "Construção de Shandora",
        subtitle: "A Cidade do Ouro prospera",
        description: "Calendário do Círculo do Mar 402: A Cidade do Ouro, Shandora, é construída e prospera como um centro de civilização avançada.",
        characters: ["Povo Shandia"],
        importance: "regional",
        sources: [
          { label: "Capítulo 261 - pág. 13", type: "manga" },
          { label: "Episódio 172", type: "anime" }
        ]
      }
    ]
  },
  {
    yearsAgo: 1000,
    CM: 500,
    EC: 3100,
    approx: true,
    events: [
      {
        title: "Nascimento de Zunesha",
        subtitle: "O elefante milenar surge",
        description: "Zunesha nasce por volta dessa época. O primeiro avistamento conhecido do elefante gigante é registrado, iniciando sua longa jornada pelos mares.",
        characters: ["Zunesha"],
        importance: "global",
        sources: [
          { label: "Capítulo 802 - pág. 16-17", type: "manga" },
          { label: "Episódio 751", type: "anime" }
        ]
      },
      {
        title: "Isolamento da Tribo Mink",
        subtitle: "Zou se torna lar dos Minks",
        description: "A Tribo Mink isola-se do mundo exterior na ilha Zou, carregada nas costas de Zunesha, estabelecendo sua civilização única.",
        characters: ["Tribo Mink", "Zunesha"],
        importance: "regional",
        sources: [
          { label: "Linha do Tempo - One Piece Wiki", url: "https://onepiece.fandom.com/pt/wiki/Linha_do_Tempo_do_Mundo", type: "other" }
        ]
      },
      {
        title: "Conflito entre Tribos",
        subtitle: "Braços Longos vs Pernas Longas",
        description: "Um conflito entre a Tribo dos Braços Longos e a Tribo dos Pernas Longas começa, durando séculos.",
        characters: ["Tribo dos Braços Longos", "Tribo dos Pernas Longas"],
        importance: "regional",
        sources: [
          { label: "Capa do Capítulo 884", type: "manga" }
        ]
      }
    ]
  }
];

console.log("🔄 Processando dados da timeline...");
console.log(`📊 Total de períodos: ${timelineData.length}`);

const base = path.join(process.cwd(), "public", "data");
const yearsPath = path.join(base, "years.json");
const byYearDir = path.join(base, "events-by-year");
const eventsDir = path.join(base, "events");

ensureDir(byYearDir);
ensureDir(eventsDir);

const years = [];
let totalEvents = 0;

for (const period of timelineData) {
  const currentYear = new Date().getFullYear();
  const estimatedCM = period.CM || (currentYear - 2024 + 1541 - period.yearsAgo);
  const estimatedEC = period.EC || (estimatedCM + 2600);
  
  const yearData = {
    id: `cm-${estimatedCM}`,
    CM: estimatedCM,
    EC: estimatedEC,
    approx: period.approx,
    label: `${estimatedCM} CM / ${estimatedEC} EC${period.approx ? " (~)" : ""}`
  };
  
  years.push(yearData);
  
  const eventPreviews = [];
  
  for (const event of period.events) {
    const eventId = `cm-${estimatedCM}-${slugify(event.title)}`;
    
    eventPreviews.push({
      id: eventId,
      title: event.title,
      subtitle: event.subtitle,
      importance: event.importance
    });
    
    const eventDetail = {
      id: eventId,
      year: {
        CM: estimatedCM,
        EC: estimatedEC
      },
      title: event.title,
      subtitle: event.subtitle,
      whatHappened: event.description,
      keyCharacters: event.characters,
      importance: event.importance,
      sources: event.sources
    };
    
    fs.writeFileSync(
      path.join(eventsDir, `${eventId}.json`),
      JSON.stringify(eventDetail, null, 2),
      "utf-8"
    );
    
    totalEvents++;
  }
  
  const yearFile = {
    year: {
      CM: estimatedCM,
      EC: estimatedEC
    },
    events: eventPreviews
  };
  
  fs.writeFileSync(
    path.join(byYearDir, `${estimatedCM}.json`),
    JSON.stringify(yearFile, null, 2),
    "utf-8"
  );
}

fs.writeFileSync(
  yearsPath,
  JSON.stringify({ years }, null, 2),
  "utf-8"
);

console.log(`✅ ${years.length} anos gerados`);
console.log(`✅ ${totalEvents} eventos gerados`);
console.log(`✅ Arquivos salvos em public/data/`);
