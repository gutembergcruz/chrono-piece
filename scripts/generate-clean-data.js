const fs = require('fs');
const path = require('path');

function ensureDir(p) {
  if (fs.existsSync(p)) {
    fs.rmSync(p, { recursive: true, force: true });
  }
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
    id: "5000-anos",
    label: "~5000 anos atrás",
    CM: -3500,
    EC: -900,
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
    id: "4000-anos",
    label: "~4000 anos atrás",
    CM: -2500,
    EC: 100,
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
    id: "3000-anos",
    label: "~3000 anos atrás",
    CM: -1500,
    EC: 1100,
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
    id: "1500-anos",
    label: "~1500 anos atrás",
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
    id: "1100-anos",
    label: "~1100 anos atrás",
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
    id: "1000-anos",
    label: "~1000 anos atrás",
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
  },
  {
    id: "900-anos",
    label: "~900 anos atrás",
    CM: 600,
    EC: 3200,
    approx: true,
    events: [
      {
        title: "Perseguição aos Tontatta",
        subtitle: "Família Donquixote oprime os anões",
        description: "A Família Donquixote persegue a Tribo Tontatta, iniciando séculos de opressão contra os pequenos habitantes de Dressrosa.",
        characters: ["Família Donquixote", "Tribo Tontatta"],
        importance: "regional",
        sources: [
          { label: "Capítulo 718 - pág. 7", type: "manga" },
          { label: "Episódio 648", type: "anime" }
        ]
      },
      {
        title: "Início do Século Vazio",
        subtitle: "Período apagado da história",
        description: "O Século Vazio começa. Neste período, Joy Boy comeu a Hito Hito no Mi, Modelo: Nika, e se tornou o primeiro Pirata da história.",
        characters: ["Joy Boy"],
        importance: "global",
        sources: [
          { label: "Capítulo 392 - pág. 4", type: "manga" },
          { label: "Episódio 275", type: "anime" },
          { label: "Capítulo 1114 - pág. 14-15", type: "manga" }
        ]
      },
      {
        title: "Grande Civilização",
        subtitle: "Reino Antigo domina o mundo",
        description: "Uma grande civilização domina o planeta de um canto a outro, e grandes armas de destruição em massa são construídas.",
        characters: ["Grande Reino"],
        importance: "global",
        sources: [
          { label: "Capítulo 395", type: "manga" },
          { label: "Episódio 277", type: "anime" }
        ]
      },
      {
        title: "Construção de Emet",
        subtitle: "O Gigante de Ferro é criado",
        description: "O Gigante de Ferro Emet é construído durante o Século Vazio.",
        characters: ["Emet"],
        importance: "global",
        sources: [
          { label: "Capítulo 1067 - pág. 9-11", type: "manga" }
        ]
      },
      {
        title: "Promessa Quebrada de Joy Boy",
        subtitle: "Noah não é submersa",
        description: "Joy Boy tenta submergir Noah com a ajuda da Poseidon, mas ele quebra sua parte do acordo com a Ilha dos Homens-Peixe e Noah nunca foi submergido, deixando para esperar o dia em que poderia ser usado.",
        characters: ["Joy Boy", "Poseidon"],
        importance: "global",
        sources: [
          { label: "Capítulo 649 - pág. 16-18", type: "manga" },
          { label: "Episódio 569", type: "anime" }
        ]
      }
    ]
  },
  {
    id: "830-anos",
    label: "~830 anos atrás",
    CM: 670,
    EC: 3270,
    approx: true,
    events: [
      {
        title: "Nascimento de Amatsuki Toki",
        subtitle: "A viajante do tempo nasce",
        description: "Amatsuki Toki nasce, destinada a viajar 800 anos no futuro através dos poderes de sua Akuma no Mi.",
        characters: ["Amatsuki Toki"],
        importance: "global",
        sources: [
          { label: "Capítulo 964 - pág. 17", type: "manga" },
          { label: "Episódio 964", type: "anime" }
        ]
      }
    ]
  },
  {
    id: "800-anos",
    label: "~800 anos atrás",
    CM: 700,
    EC: 3300,
    approx: true,
    events: [
      {
        title: "Destruição de Shandora",
        subtitle: "A Cidade do Ouro cai",
        description: "Após uma grande guerra, Shandora é destruída, encerrando a era dourada da civilização Shandia.",
        characters: ["Povo Shandia"],
        importance: "regional",
        sources: [
          { label: "Capítulo 261 - pág. 13", type: "manga" },
          { label: "Episódio 172", type: "anime" }
        ]
      },
      {
        title: "One Piece é Escondido",
        subtitle: "O tesouro lendário",
        description: "Joy Boy armazena um tesouro mítico apelidado de 'One Piece' na última ilha da Grand Line, que viria a ser conhecida como Laugh Tale.",
        characters: ["Joy Boy"],
        importance: "global",
        sources: [
          { label: "Capítulo 967 - pág. 18-19", type: "manga" },
          { label: "Episódio 968", type: "anime" }
        ]
      },
      {
        title: "Grande Guerra e Fim do Século Vazio",
        subtitle: "Derrota do Grande Reino",
        description: "Uma organização de vinte membros da realeza forma uma aliança contra o Grande Reino e Joy Boy, derrotando-o em uma grande guerra e marcando o fim do Século Vazio.",
        characters: ["Vinte Reis", "Joy Boy", "Grande Reino"],
        importance: "global",
        sources: [
          { label: "Capítulo 1115 - pág. 3-5", type: "manga" }
        ]
      },
      {
        title: "Elevação do Nível do Mar",
        subtitle: "O mundo é inundado",
        description: "O mar subiu 200 metros, alterando drasticamente a geografia do mundo.",
        characters: [],
        importance: "global",
        sources: [
          { label: "Linha do Tempo - One Piece Wiki", url: "https://onepiece.fandom.com/pt/wiki/Linha_do_Tempo_do_Mundo", type: "other" }
        ]
      },
      {
        title: "Desaparecimento das Armas Antigas",
        subtitle: "Poneglyphs são criados",
        description: "As armas antigas desaparecem sob circunstâncias misteriosas. Os únicos vestígios deixados para trás de sua civilização são os Poneglyphs construídos pela Família Kozuki.",
        characters: ["Família Kozuki"],
        importance: "global",
        sources: [
          { label: "Capítulo 818 - pág. 13", type: "manga" },
          { label: "Episódio 770", type: "anime" }
        ]
      },
      {
        title: "Formação do Governo Mundial",
        subtitle: "Os Vinte Reis sobem a Mary Geoise",
        description: "Os Vinte membros da realeza criam o Governo Mundial e se mudam para Mary Geoise. Conforme chegam ao poder, eles controlam e censuram tudo o que aconteceu nos últimos 100 anos, ao mesmo tempo em que proíbem mundialmente a capacidade de pesquisar e ler os Poneglyphs.",
        characters: ["Vinte Reis", "Governo Mundial"],
        importance: "global",
        sources: [
          { label: "Capítulo 497", type: "manga" },
          { label: "Episódio 391", type: "anime" },
          { label: "Capítulo 395", type: "manga" }
        ]
      },
      {
        title: "Família Riku assume Dressrosa",
        subtitle: "Donquixote partem para Mary Geoise",
        description: "A Família Riku se torna a nova governante do Reino de Dressrosa depois que a Família Donquixote deixa o país para viver em Mary Geoise, e pede desculpas sinceras aos Anões que sofreram sob a escravidão nas mãos da Família Donquixote.",
        characters: ["Família Riku", "Família Donquixote", "Tribo Tontatta"],
        importance: "regional",
        sources: [
          { label: "Capítulo 722", type: "manga" },
          { label: "Episódio 653", type: "anime" },
          { label: "Capítulo 726", type: "manga" },
          { label: "Episódio 658", type: "anime" }
        ]
      },
      {
        title: "Sentença de Zunesha",
        subtitle: "Condenada a vagar eternamente",
        description: "Zunesha comete um crime e é sentenciada a andar pelos mares pela eternidade.",
        characters: ["Zunesha"],
        importance: "global",
        sources: [
          { label: "Capítulo 1040 - pág. 15", type: "manga" }
        ]
      },
      {
        title: "Pluton Escondida em Wano",
        subtitle: "Arma Antiga selada",
        description: "Pluton está escondido sob as cavernas subterrâneas de Wano.",
        characters: ["Pluton"],
        importance: "global",
        sources: [
          { label: "Capítulo 1055 - pág. 10-11", type: "manga" }
        ]
      },
      {
        title: "Desaparecimento de Nefertari D. Lili",
        subtitle: "Rainha de Alabasta some",
        description: "Nefertari D. Lili desaparece em seu caminho de Mary Geoise para o Reino de Alabasta.",
        characters: ["Nefertari D. Lili"],
        importance: "global",
        sources: [
          { label: "Capítulo 1084 - pág. 6-8", type: "manga" }
        ]
      },
      {
        title: "Estabelecimento da Cipher Pol",
        subtitle: "Enies Lobby é protegida",
        description: "A Cipher Pol é estabelecida e está estacionada em Enies Lobby para protegê-la.",
        characters: ["Cipher Pol"],
        importance: "global",
        sources: [
          { label: "Capítulo 426 - pág. 6", type: "manga" },
          { label: "Episódio 308", type: "anime" }
        ]
      }
    ]
  },
  {
    id: "700-anos",
    label: "~700 anos atrás",
    CM: 800,
    EC: 3400,
    approx: true,
    events: [
      {
        title: "Construção de Tequila Wolf",
        subtitle: "Pontes para os Nobres Mundiais",
        description: "A construção da Tequila Wolf começa em algum lugar no East Blue, para a segurança dos Nobres Mundiais contra o aumento do nível do mar, juntamente com a Vodka Wolf, a Rum Wolf e a Bourbon Wolf ao redor do mundo.",
        characters: ["Nobres Mundiais"],
        importance: "global",
        sources: [
          { label: "Capítulo 1125 - pág. 17", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "659-anos",
    label: "659 anos atrás",
    CM: 882,
    EC: 3472,
    approx: false,
    events: [
      {
        title: "Nascimento de Oars",
        subtitle: "O lendário demônio gigante",
        description: "Oars nasce, destinado a se tornar um dos gigantes mais temidos da história.",
        characters: ["Oars"],
        importance: "regional",
        sources: [
          { label: "SBS Volume 50", type: "sbs" }
        ]
      }
    ]
  },
  {
    id: "500-anos",
    label: "~500 anos atrás",
    CM: 1000,
    EC: 3600,
    approx: true,
    events: [
      {
        title: "Morte de Oars",
        subtitle: "Congelado nas Terras do Norte",
        description: "Oars, um governante de uma nação de bandidos de todo o mundo, morre de congelamento viajando pelas Terras do Norte e permanece preservado no gelo.",
        characters: ["Oars"],
        importance: "regional",
        sources: [
          { label: "Capítulo 456", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "460-anos",
    label: "~460 anos atrás",
    CM: 1040,
    EC: 3640,
    approx: true,
    events: [
      {
        title: "Cura da Febre das Árvores",
        subtitle: "Salvação de Lvneel",
        description: "Uma cura é encontrada para a Febre das Árvores que assolou a terra de Lvneel, quase exterminando a maioria dos habitantes.",
        characters: ["Povo de Lvneel"],
        importance: "regional",
        sources: [
          { label: "Capítulo 292", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "441-anos",
    label: "441 anos atrás",
    CM: 1100,
    EC: 3690,
    approx: false,
    events: [
      {
        title: "Nascimentos de Noland e Kalgara",
        subtitle: "Futuros heróis de suas terras",
        description: "Mont Blanc Noland nasce em Lvneel, e Kalgara nasce em Jaya. Ambos estão destinados a se tornarem figuras lendárias.",
        characters: ["Mont Blanc Noland", "Kalgara"],
        importance: "regional",
        sources: [
          { label: "SBS Volume 50", type: "sbs" }
        ]
      }
    ]
  },
  {
    id: "400-anos",
    label: "~400 anos atrás",
    CM: 1120,
    EC: 3720,
    approx: true,
    events: [
      {
        title: "Partida de Noland de Vira",
        subtitle: "Início da jornada lendária",
        description: "Calendário do Círculo do Mar 1120, 21 de Junho: Noland parte de Vira com sua tripulação. Seguindo o Log Pose, eles encontram um mercador vendendo um artefato incomum de Skypiea chamado de 'waver'.",
        characters: ["Mont Blanc Noland"],
        importance: "regional",
        sources: [
          { label: "Capítulo 228", type: "manga" }
        ]
      },
      {
        title: "Noland em Green Bit",
        subtitle: "Herói dos Tontatta",
        description: "Durante suas jornadas, Noland chega em Green Bit, onde ele protege os anões dos humanos; ele é feito um herói e uma estátua é erguida em sua homenagem.",
        characters: ["Mont Blanc Noland", "Tribo Tontatta"],
        importance: "regional",
        sources: [
          { label: "Capítulo 711", type: "manga" }
        ]
      },
      {
        title: "Noland Chega a Jaya",
        subtitle: "Cura dos Shandia",
        description: "Calendário do Círculo do Mar 1122, 21 de Maio: Noland chega à ilha de Jaya e traz o fim de uma doença horrível que deixou os Shandia doentes. Nola nasce.",
        characters: ["Mont Blanc Noland", "Kalgara", "Nola"],
        importance: "regional",
        sources: [
          { label: "Capítulo 287", type: "manga" }
        ]
      },
      {
        title: "Jaya é Lançada ao Céu",
        subtitle: "Início da guerra em Skypiea",
        description: "4 anos depois, uma grande parte de Jaya é atirada no ar pela Knock Up Stream. A guerra entre os Skypieans e os Shandia começa.",
        characters: ["Skypieans", "Shandia"],
        importance: "regional",
        sources: [
          { label: "Capítulo 292", type: "manga" }
        ]
      },
      {
        title: "Execução de Noland",
        subtitle: "O mentiroso lendário",
        description: "Calendário do Círculo do Mar 1127, 16 de Novembro: Noland traz o Rei de Lvneel para Jaya mas encontra a ilha vazia. 6 meses depois, Noland é executado por suas 'mentiras' sobre a Cidade do Ouro. Ele morre alegando que a cidade caiu no oceano.",
        characters: ["Mont Blanc Noland", "Rei de Lvneel"],
        importance: "regional",
        sources: [
          { label: "Capítulo 292", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "300-anos",
    label: "~300 anos atrás",
    CM: 1200,
    EC: 3800,
    approx: true,
    events: [
      {
        title: "Império Germa",
        subtitle: "66 dias de domínio",
        description: "O Reino Germa reina sobre o North Blue por 66 dias como o Império Germa.",
        characters: ["Reino Germa"],
        importance: "regional",
        sources: [
          { label: "Capítulo 852", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "200-anos",
    label: "~200 anos atrás",
    CM: 1300,
    EC: 3900,
    approx: true,
    events: [
      {
        title: "Aliança com a Ilha dos Homens-Peixe",
        subtitle: "Primeiro Levely",
        description: "O Governo Mundial faz uma aliança com a Ilha dos Homens-Peixe após séculos de discriminação. A instituição da escravidão é proibida pelo Governo Mundial para garantir um acordo de paz. O Reino Ryugu também participou de seu primeiro Levely.",
        characters: ["Governo Mundial", "Reino Ryugu"],
        importance: "global",
        sources: [
          { label: "Capítulo 626", type: "manga" }
        ]
      },
      {
        title: "Ataque de Emet a Mary Geoise",
        subtitle: "O Gigante de Ferro desperta",
        description: "Emet aparece e ataca Mary Geoise, mas fica sem energia antes de causar dano. Jaygarcia Saturn dos Cinco Anciões ordena que pesquisadores o estudem em segredo.",
        characters: ["Emet", "Jaygarcia Saturn"],
        importance: "global",
        sources: [
          { label: "Capítulo 1067", type: "manga" },
          { label: "Capítulo 1120", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "77-anos",
    label: "77 anos atrás",
    CM: 1464,
    EC: 4054,
    approx: false,
    events: [
      {
        title: "Nascimento de Gol D. Roger",
        subtitle: "O futuro Rei dos Piratas",
        description: "Gol D. Roger nasce, destinado a se tornar o Rei dos Piratas e iniciar a Grande Era dos Piratas.",
        characters: ["Gol D. Roger"],
        importance: "global",
        sources: [
          { label: "SBS Volume 15", type: "sbs" }
        ]
      }
    ]
  },
  {
    id: "78-anos",
    label: "78 anos atrás",
    CM: 1463,
    EC: 4053,
    approx: false,
    events: [
      {
        title: "Nascimentos de Garp e Rayleigh",
        subtitle: "Lendas em formação",
        description: "Monkey D. Garp e Silvers Rayleigh nascem, futuros pilares da Marinha e dos Piratas respectivamente.",
        characters: ["Monkey D. Garp", "Silvers Rayleigh"],
        importance: "global",
        sources: [
          { label: "SBS Volume 15", type: "sbs" }
        ]
      }
    ]
  },
  {
    id: "38-anos",
    label: "38 anos atrás",
    CM: 1503,
    EC: 4093,
    approx: false,
    events: [
      {
        title: "Incidente de God Valley",
        subtitle: "Derrota dos Piratas Rocks",
        description: "Os Nobres Mundiais realizam a Competição de Caça Nativa em God Valley. Os Piratas Rocks atacam a ilha. Monkey D. Garp e Gol D. Roger se unem para derrotá-los, com Garp ganhando o título de 'Herói da Marinha'. Durante o caos, Bartholomew Kuma come a Nikyu Nikyu no Mi e salva vários escravos. Shanks é encontrado como bebê pelos Piratas de Roger.",
        characters: ["Monkey D. Garp", "Gol D. Roger", "Rocks D. Xebec", "Bartholomew Kuma", "Shanks"],
        importance: "global",
        sources: [
          { label: "Capítulo 957", type: "manga" },
          { label: "Capítulo 1096", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "28-anos",
    label: "28 anos atrás",
    CM: 1513,
    EC: 4103,
    approx: false,
    events: [
      {
        title: "Roger Descobre sua Doença",
        subtitle: "Início da jornada final",
        description: "Gol D. Roger descobre que tem uma doença fatal. Preparando-se para sua maior jornada, ele entra na Grand Line e recruta Crocus como médico do navio.",
        characters: ["Gol D. Roger", "Crocus"],
        importance: "global",
        sources: [
          { label: "Capítulo 506", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "26-anos",
    label: "26 anos atrás",
    CM: 1515,
    EC: 4105,
    approx: false,
    events: [
      {
        title: "Kozuki Oden se Junta aos Piratas de Roger",
        subtitle: "Rumo a Laugh Tale",
        description: "Kozuki Oden deixa os Piratas do Barba Branca e se junta aos Piratas de Roger. Inuarashi e Nekomamushi o acompanham mais uma vez. Roger chega em Skypiea e faz Oden gravar a mensagem perto do Poneglyph.",
        characters: ["Kozuki Oden", "Gol D. Roger", "Inuarashi", "Nekomamushi"],
        importance: "global",
        sources: [
          { label: "Capítulo 966", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "25-anos",
    label: "25 anos atrás",
    CM: 1516,
    EC: 4106,
    approx: false,
    events: [
      {
        title: "Descoberta de Laugh Tale",
        subtitle: "Roger se torna o Rei dos Piratas",
        description: "Os Piratas de Roger completam sua jornada até Laugh Tale. Tendo conquistado toda a Grand Line, Roger se torna conhecido como o Rei dos Piratas. Logo depois, Roger dissolve sua tripulação pirata. Kozuki Oden sonha em abrir as fronteiras de Wano em 20 anos.",
        characters: ["Gol D. Roger", "Kozuki Oden", "Piratas de Roger"],
        importance: "global",
        sources: [
          { label: "Capítulo 967", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "24-anos",
    label: "24 anos atrás",
    CM: 1517,
    EC: 4107,
    approx: false,
    events: [
      {
        title: "Execução de Gol D. Roger",
        subtitle: "Início da Grande Era dos Piratas",
        description: "O Rei dos Piratas Gol D. Roger se entrega à Marinha e é sentenciado à morte. O discurso de Roger antes de sua morte leva piratas à Grand Line para procurar seu tesouro escondido, apelidado de 'One Piece'. Este evento marca o início de uma era chamada 'Grande Era dos Piratas'.",
        characters: ["Gol D. Roger", "Marinha"],
        importance: "global",
        sources: [
          { label: "Capítulo 1", type: "manga" },
          { label: "Episódio 1", type: "anime" }
        ]
      },
      {
        title: "Shanks Inicia sua Jornada",
        subtitle: "Novo capitão pirata",
        description: "Shanks inicia sua jornada como capitão pirata pedindo a Buggy para se juntar à sua tripulação, mas ele recusa e foge.",
        characters: ["Shanks", "Buggy"],
        importance: "regional",
        sources: [
          { label: "Capítulo 968", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "22-anos",
    label: "22 anos atrás",
    CM: 1519,
    EC: 4109,
    approx: false,
    events: [
      {
        title: "Incidente de Ohara",
        subtitle: "Destruição da ilha dos estudiosos",
        description: "Ohara é queimada até o chão por um Buster Call convocado pela CP9. Professor Clover, Olvia e todos os cidadãos de Ohara são mortos. Nico Robin, a única sobrevivente, começa sua vida fugindo do Governo Mundial com uma recompensa de 79.000.000 de berries. Jaguar D. Saul é congelado por Kuzan.",
        characters: ["Nico Robin", "Professor Clover", "Nico Olvia", "Jaguar D. Saul", "Kuzan"],
        importance: "global",
        sources: [
          { label: "Capítulo 397", type: "manga" },
          { label: "Episódio 277", type: "anime" }
        ]
      },
      {
        title: "Nascimento de Portgas D. Ace",
        subtitle: "Filho do Rei dos Piratas",
        description: "Portgas D. Ace nasce como 'Gol D. Ace'. Sua mãe, Portgas D. Rouge, morre logo após seu nascimento.",
        characters: ["Portgas D. Ace", "Portgas D. Rouge"],
        importance: "global",
        sources: [
          { label: "Capítulo 550", type: "manga" }
        ]
      },
      {
        title: "Formação do Exército Revolucionário",
        subtitle: "Dragon lidera a resistência",
        description: "Após o Incidente de Ohara, Kuma, Ginny, Ivankov e Dragon formam o Exército Revolucionário.",
        characters: ["Monkey D. Dragon", "Bartholomew Kuma", "Emporio Ivankov"],
        importance: "global",
        sources: [
          { label: "Capítulo 1097", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "20-anos",
    label: "20 anos atrás",
    CM: 1521,
    EC: 4111,
    approx: false,
    events: [
      {
        title: "Execução de Kozuki Oden",
        subtitle: "Sacrifício em Wano",
        description: "Kozuki Oden e os Nove Bainhas Vermelhas tentam derrotar Kaidou para abrir as fronteiras de Wano, mas falham. Oden é executado por Kaidou e Kurozumi Orochi. Antes de sua morte, Kozuki Toki usa os poderes da Toki Toki no Mi para enviar seu filho e seus vassalos 20 anos no futuro.",
        characters: ["Kozuki Oden", "Kaidou", "Kurozumi Orochi", "Kozuki Toki"],
        importance: "regional",
        sources: [
          { label: "Capítulo 972", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "19-anos",
    label: "19 anos atrás",
    CM: 1522,
    EC: 4112,
    approx: false,
    events: [
      {
        title: "Nascimento de Monkey D. Luffy",
        subtitle: "O futuro Rei dos Piratas",
        description: "Monkey D. Luffy nasce, destinado a se tornar um dos piratas mais poderosos e influentes da história.",
        characters: ["Monkey D. Luffy"],
        importance: "global",
        sources: [
          { label: "SBS Volume 15", type: "sbs" }
        ]
      }
    ]
  },
  {
    id: "12-anos",
    label: "12 anos atrás",
    CM: 1529,
    EC: 4119,
    approx: false,
    events: [
      {
        title: "Luffy Come a Gomu Gomu no Mi",
        subtitle: "Poderes de borracha",
        description: "Monkey D. Luffy, aos 7 anos, acidentalmente come a Gomu Gomu no Mi mantida pelos Piratas do Ruivo, ganhando poderes de borracha e incapacidade de nadar. Shanks salva Luffy de um Rei do Mar, perdendo seu braço esquerdo no processo. Shanks deixa a cidade natal de Luffy após ficar lá por quase um ano.",
        characters: ["Monkey D. Luffy", "Shanks"],
        importance: "global",
        sources: [
          { label: "Capítulo 1", type: "manga" },
          { label: "Episódio 4", type: "anime" }
        ]
      },
      {
        title: "Incidente do Gray Terminal",
        subtitle: "Sabo é dado como morto",
        description: "Os Dragões Celestiais visitam o Reino de Goa. Em preparação, os Piratas Bluejam incendeiam o Gray Terminal, mas a maioria dos residentes é salva por Monkey D. Dragon e os Revolucionários. Sabo é atacado pelo Nobre Mundial Saint Jalmack e dado como morto, mas é resgatado por Dragon e perde suas memórias.",
        characters: ["Sabo", "Monkey D. Dragon", "Saint Jalmack"],
        importance: "global",
        sources: [
          { label: "Capítulo 589", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "10-anos",
    label: "10 anos atrás",
    CM: 1531,
    EC: 4121,
    approx: false,
    events: [
      {
        title: "Doflamingo se Torna Shichibukai",
        subtitle: "Chantagem ao Governo Mundial",
        description: "Após capturar navios com Tributo Celestial e chantagear o Governo Mundial, Donquixote Doflamingo se torna um Shichibukai. Ele incrimina Riku Doldo III e assume a posição de rei de Dressrosa.",
        characters: ["Donquixote Doflamingo", "Riku Doldo III"],
        importance: "regional",
        sources: [
          { label: "Capítulo 722", type: "manga" }
        ]
      },
      {
        title: "Invasão de Arlong em Cocoyasi",
        subtitle: "Morte de Bell-mère",
        description: "Arlong invade a Vila Cocoyasi e começa a construir seu império. Bell-mère é assassinada por ele e Nami é recrutada para os Piratas Arlong.",
        characters: ["Arlong", "Nami", "Bell-mère"],
        importance: "regional",
        sources: [
          { label: "Capítulo 77", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "2-anos",
    label: "2 anos atrás",
    CM: 1539,
    EC: 4129,
    approx: false,
    events: [
      {
        title: "Luffy Inicia sua Jornada",
        subtitle: "Formação dos Chapéus de Palha",
        description: "Luffy deixa a Vila Foosha em sua busca para se tornar o Rei dos Piratas. Ele recruta Zoro, Nami, Usopp, Sanji e outros, formando os Piratas do Chapéu de Palha. A tripulação derrota Buggy, Kuro, Don Krieg e Arlong.",
        characters: ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji"],
        importance: "global",
        sources: [
          { label: "Capítulo 1-100", type: "manga" }
        ]
      },
      {
        title: "Guerra de Marineford",
        subtitle: "Morte de Ace e Barba Branca",
        description: "A Guerra do Ápice de Marineford acontece. A herança de Luffy e Ace é revelada ao público. Portgas D. Ace morre quando o punho de magma do Almirante Akainu atravessa seu peito. Edward Newgate morre em pé em Marineford. Marshall D. Teach rouba o poder da Akuma no Mi de Barba Branca. A batalha termina com a chegada de Shanks.",
        characters: ["Portgas D. Ace", "Edward Newgate", "Marshall D. Teach", "Shanks", "Monkey D. Luffy"],
        importance: "global",
        sources: [
          { label: "Capítulo 550-580", type: "manga" }
        ]
      },
      {
        title: "Timeskip de Dois Anos",
        subtitle: "Treinamento da tripulação",
        description: "Monkey D. Luffy decide dissolver os Piratas do Chapéu de Palha por dois anos para permitir que a tripulação treine e se torne mais forte.",
        characters: ["Piratas do Chapéu de Palha"],
        importance: "global",
        sources: [
          { label: "Capítulo 597", type: "manga" }
        ]
      }
    ]
  },
  {
    id: "atual",
    label: "Presente (1541 ECM)",
    CM: 1541,
    EC: 4131,
    approx: false,
    events: [
      {
        title: "Morte do Príncipe e Rei do Reino de Goa",
        subtitle: "Sterry ascende ao trono",
        description: "O príncipe e rei do Reino de Goa morrem de uma morte suspeita, resultando em Sterry ascendendo ao trono.",
        characters: ["Sterry"],
        importance: "regional",
        sources: [{ label: "Capítulo 823", type: "manga" }]
      },
      {
        title: "Viajantes do Tempo Chegam a Wano",
        subtitle: "Kin'emon e aliados do passado",
        description: "Kin'emon, Kiku, Raizo, Kanjuro e Kozuki Momonosuke chegam ao País de Wano deste ano vindos de 20 anos atrás, tendo sido enviados através do tempo pelos poderes da Toki Toki no Mi.",
        characters: ["Kin'emon", "Kiku", "Raizo", "Kanjuro", "Kozuki Momonosuke"],
        importance: "regional",
        sources: [{ label: "Capítulo 919", type: "manga" }]
      },
      {
        title: "Momonosuke Come Akuma no Mi Artificial",
        subtitle: "Fruta criada por Vegapunk",
        description: "Kozuki Momonosuke come a Akuma no Mi artificial criada por Vegapunk, ganhando poderes de dragão.",
        characters: ["Kozuki Momonosuke", "Vegapunk"],
        importance: "regional",
        sources: [{ label: "Capítulo 685", type: "manga" }]
      },
      {
        title: "Falsos Chapéus de Palha Desmascarados",
        subtitle: "Sentomaru promovido",
        description: "A Falsa Tripulação do Chapéu de Palha recruta piratas famosos mas são desmascarados por Sentomaru, que foi promovido na Marinha.",
        characters: ["Sentomaru", "Demalo Black"],
        importance: "local",
        sources: [{ label: "Capítulo 598", type: "manga" }]
      },
      {
        title: "Reunião dos Chapéus de Palha",
        subtitle: "Retorno ao Arquipélago Sabaody",
        description: "Os verdadeiros Piratas do Chapéu de Palha se reúnem no Arquipélago Sabaody e a notícia se espalha que eles estão de volta em ação. Sob perseguição dos marinheiros, eles escapam com seu navio revestido para o mar.",
        characters: ["Piratas do Chapéu de Palha"],
        importance: "global",
        sources: [{ label: "Capítulo 598-603", type: "manga" }]
      },
      {
        title: "Kuma Escravizado",
        subtitle: "Punição por ajudar os Chapéus de Palha",
        description: "Como punição por ajudar os Chapéus de Palha, Bartholomew Kuma foi escravizado pelos Dragões Celestiais.",
        characters: ["Bartholomew Kuma"],
        importance: "global",
        sources: [{ label: "Capítulo 908", type: "manga" }]
      },
      {
        title: "Profecia de Shyarly",
        subtitle: "Destruição da Ilha dos Homens-Peixe",
        description: "Madam Shyarly do Mermaid Cafe prevê a destruição da Ilha dos Homens-Peixe pelas mãos de Luffy do Chapéu de Palha.",
        characters: ["Madam Shyarly", "Monkey D. Luffy"],
        importance: "regional",
        sources: [{ label: "Capítulo 610", type: "manga" }]
      },
      {
        title: "Rebelião em Fish-Man Island",
        subtitle: "Hody Jones e Vander Decken",
        description: "Hody Jones, capitão dos Novos Piratas Homens-Peixe, e Vander Decken IX, capitão dos Piratas Voadores, formam uma aliança e iniciam uma rebelião contra o Reino Ryugu.",
        characters: ["Hody Jones", "Vander Decken IX"],
        importance: "regional",
        sources: [{ label: "Capítulo 611-653", type: "manga" }]
      },
      {
        title: "Shirahoshi Revela Ser Poseidon",
        subtitle: "Poder de invocar Reis do Mar",
        description: "Princesa Shirahoshi manifesta sua habilidade de invocar Reis do Mar para impedir Noah de cair sobre a Ilha dos Homens-Peixe. Ela é revelada ser a arma ancestral Poseidon.",
        characters: ["Shirahoshi"],
        importance: "global",
        sources: [{ label: "Capítulo 626", type: "manga" }]
      },
      {
        title: "Primeira Transfusão Humano-Homem-Peixe",
        subtitle: "Jinbe doa sangue a Luffy",
        description: "Jinbe doa sangue a Luffy na primeira transfusão de sangue humano-homem-peixe desde que foi declarada ilegal.",
        characters: ["Jinbe", "Monkey D. Luffy"],
        importance: "global",
        sources: [{ label: "Capítulo 648", type: "manga" }]
      },
      {
        title: "Jinbe Promete se Juntar aos Chapéus de Palha",
        subtitle: "Após cumprir seus deveres",
        description: "Jinbe promete se juntar aos Chapéus de Palha assim que terminar de cuidar de seus deveres.",
        characters: ["Jinbe"],
        importance: "regional",
        sources: [{ label: "Capítulo 649", type: "manga" }]
      },
      {
        title: "Desafio a Big Mom",
        subtitle: "Luffy declara proteção à Fish-Man Island",
        description: "Os Piratas do Chapéu de Palha são alvos de Big Mom após Luffy desafiá-la e se declarar como o futuro protetor da Ilha dos Homens-Peixe. Luffy dá a Tamago e Pekoms o tesouro que Caribou roubou, incluindo a Tamate Box com um explosivo dentro.",
        characters: ["Monkey D. Luffy", "Charlotte Linlin", "Tamago", "Pekoms"],
        importance: "global",
        sources: [{ label: "Capítulo 651", type: "manga" }]
      },
      {
        title: "Entrada no Novo Mundo",
        subtitle: "Chapéus de Palha cruzam a Red Line",
        description: "Os Chapéus de Palha entram no Novo Mundo.",
        characters: ["Piratas do Chapéu de Palha"],
        importance: "global",
        sources: [{ label: "Capítulo 654", type: "manga" }]
      },
      {
        title: "Aliança Law-Luffy",
        subtitle: "Plano para derrubar Kaidou",
        description: "Os Chapéus de Palha formam uma aliança com os Piratas Heart para destronar Kaidou.",
        characters: ["Monkey D. Luffy", "Trafalgar Law"],
        importance: "global",
        sources: [{ label: "Capítulo 668", type: "manga" }]
      },
      {
        title: "Incidente de Punk Hazard",
        subtitle: "Derrota de Caesar Clown",
        description: "Smiley come o doce, causando um gás venenoso que pode petrificar pessoas a se espalhar por Punk Hazard. O grupo derrota e sequestra Caesar Clown antes de continuar para Dressrosa. Vergo e Monet morrem.",
        characters: ["Caesar Clown", "Vergo", "Monet"],
        importance: "regional",
        sources: [{ label: "Capítulo 658-699", type: "manga" }]
      },
      {
        title: "Crianças Levadas a Vegapunk",
        subtitle: "G-5 resgata crianças",
        description: "G-5 leva as crianças de Punk Hazard para ver Vegapunk.",
        characters: ["Vegapunk"],
        importance: "local",
        sources: [{ label: "Capítulo 700", type: "manga" }]
      },
      {
        title: "Aliança Kid-On Air-Hawkins",
        subtitle: "Plano para depor Shanks",
        description: "Uma aliança entre os Piratas Kid, On Air e Hawkins para depor o Imperador Shanks é formada.",
        characters: ["Eustass Kid", "Scratchmen Apoo", "Basil Hawkins"],
        importance: "regional",
        sources: [{ label: "Capítulo 594", type: "manga" }]
      },
      {
        title: "Caribou Capturado",
        subtitle: "Levado por X Drake",
        description: "Jinbe coloca Caribou em uma base da Marinha G-5. Os Piratas Caribou tentaram resgatá-lo, mas foram capturados enquanto ele navega livre. Caribou acaba em uma das ilhas favoritas de Kaidou e é posteriormente levado por X Drake como prisioneiro em Wano.",
        characters: ["Caribou", "X Drake"],
        importance: "local",
        sources: [{ label: "Capítulo 903", type: "manga" }]
      },
      {
        title: "Invasão de Zou",
        subtitle: "Jack ataca os Minks",
        description: "Zou é invadida por Jack e sua divisão dos Piratas das Feras, que causam devastação em massa enquanto caçam o ninja Raizo.",
        characters: ["Jack", "Raizo"],
        importance: "regional",
        sources: [{ label: "Capítulo 809", type: "manga" }]
      },
      {
        title: "Brinquedos Voltam ao Normal",
        subtitle: "Sugar perde consciência",
        description: "Todos os brinquedos na ilha de Dressrosa retornam às suas formas originais após Sugar perder a consciência.",
        characters: ["Sugar"],
        importance: "regional",
        sources: [{ label: "Capítulo 743", type: "manga" }]
      },
      {
        title: "Sabo Come a Mera Mera no Mi",
        subtitle: "Poder de Ace herdado",
        description: "Sabo, o segundo em comando do Exército Revolucionário, consome a Mera Mera no Mi, que anteriormente pertencia a seu falecido irmão Portgas D. Ace.",
        characters: ["Sabo", "Portgas D. Ace"],
        importance: "global",
        sources: [{ label: "Capítulo 744", type: "manga" }]
      },
      {
        title: "Derrota de Doflamingo",
        subtitle: "Libertação de Dressrosa",
        description: "Donquixote Doflamingo é derrotado, sua tripulação é presa e o reinado sobre Dressrosa retorna à Família Riku. A queda de Doflamingo envia muitas nações que dependiam dele ao caos, permitindo que os Revolucionários aumentem suas vitórias.",
        characters: ["Donquixote Doflamingo", "Monkey D. Luffy", "Riku Doldo III"],
        importance: "global",
        sources: [{ label: "Capítulo 785", type: "manga" }]
      },
      {
        title: "Formação da Grande Frota do Chapéu de Palha",
        subtitle: "Sete tripulações juram lealdade",
        description: "Sete tripulações juram lealdade aos Piratas do Chapéu de Palha, formando a Grande Frota do Chapéu de Palha, que consiste em mais de 5000 membros.",
        characters: ["Cavendish", "Bartolomeo", "Sai", "Ideo", "Leo", "Hajrudin", "Orlumbus"],
        importance: "global",
        sources: [{ label: "Capítulo 800", type: "manga" }]
      },
      {
        title: "Novas Recompensas dos Chapéus de Palha",
        subtitle: "Fotos atualizadas",
        description: "Devido aos eventos desde sua reunião em Sabaody até Dressrosa, todos os Chapéus de Palha recebem novas recompensas, com fotos atualizadas em seus cartazes, e o status de Sanji é mudado para 'Procurado Apenas Vivo'.",
        characters: ["Piratas do Chapéu de Palha", "Sanji"],
        importance: "global",
        sources: [{ label: "Capítulo 801", type: "manga" }]
      },
      {
        title: "Kid e Hawkins Viram Subordinados",
        subtitle: "Confronto com Kaidou",
        description: "Após confrontar Kaidou, os Piratas On Air e Hawkins se tornam subordinados dos Piratas das Feras enquanto Kid permanece prisioneiro.",
        characters: ["Eustass Kid", "Kaidou", "Basil Hawkins", "Scratchmen Apoo"],
        importance: "regional",
        sources: [{ label: "Capítulo 824", type: "manga" }]
      },
      {
        title: "Jack Ataca Escolta de Doflamingo",
        subtitle: "Falsamente declarado morto",
        description: "Jack ataca a escolta de Doflamingo. Ele afunda dois dos navios, mas é derrotado. Ele sobrevive, e os jornais falsamente o reportam como morto.",
        characters: ["Jack"],
        importance: "local",
        sources: [{ label: "Capítulo 824", type: "manga" }]
      },
      {
        title: "Destruição de Baltigo",
        subtitle: "Base dos Revolucionários atacada",
        description: "Os Piratas do Barba Negra atacam a base da ilha dos Revolucionários em Baltigo, resultando na base sendo completamente destruída. A nova base é localizada na Ilha Momoiro.",
        characters: ["Marshall D. Teach", "Monkey D. Dragon"],
        importance: "global",
        sources: [{ label: "Capítulo 904", type: "manga" }]
      },
      {
        title: "Brook Copia Road Poneglyph",
        subtitle: "Infiltração no território de Big Mom",
        description: "Brook dos Piratas do Chapéu de Palha cria cópias do Road Poneglyph de Charlotte Linlin após se infiltrar em seu depósito, tornando os Chapéus de Palha uma das poucas facções no mundo a ter posse de um na época.",
        characters: ["Brook", "Charlotte Linlin"],
        importance: "global",
        sources: [{ label: "Capítulo 856", type: "manga" }]
      },
      {
        title: "Explosão da Tamatebako",
        subtitle: "Queda do Chateau Whole Cake",
        description: "A Tamatebako explode, causando a queda do Chateau Whole Cake.",
        characters: ["Charlotte Linlin"],
        importance: "regional",
        sources: [{ label: "Capítulo 900", type: "manga" }]
      },
      {
        title: "Bartolomeo Queima Bandeira de Shanks",
        subtitle: "Provocação em Gartel Island",
        description: "Bartolomeo e sua tripulação viajam para Gartel Island, queimam a bandeira dos Piratas do Ruivo e a substituem pela de Luffy.",
        characters: ["Bartolomeo", "Shanks"],
        importance: "local",
        sources: [{ label: "Capítulo 875", type: "manga" }]
      },
      {
        title: "Sacrifício de Pedro",
        subtitle: "Explosão com dinamite",
        description: "Pedro se explode com dinamite para que os Chapéus de Palha avancem.",
        characters: ["Pedro"],
        importance: "regional",
        sources: [{ label: "Capítulo 877", type: "manga" }]
      },
      {
        title: "Derrota de Katakuri",
        subtitle: "Luffy vence o comandante",
        description: "Charlotte Katakuri é derrotado por Luffy.",
        characters: ["Charlotte Katakuri", "Monkey D. Luffy"],
        importance: "global",
        sources: [{ label: "Capítulo 896", type: "manga" }]
      },
      {
        title: "Luffy Declarado Quinto Imperador",
        subtitle: "Notícias do ataque a Big Mom",
        description: "Morgans reporta os detalhes do ataque bem-sucedido da Equipe de Resgate de Sanji contra a Imperatriz Charlotte Linlin para o mundo inteiro. Morgans também revela a herança de Sanji, a formação da Grande Frota do Chapéu de Palha, e a adição do ex-Shichibukai Jinbe aos Piratas do Chapéu de Palha. Luffy é considerado por certas partes do mundo como um quinto Imperador.",
        characters: ["Monkey D. Luffy", "Morgans", "Sanji", "Jinbe"],
        importance: "global",
        sources: [{ label: "Capítulo 903", type: "manga" }]
      },
      {
        title: "Reino Germa Expulso",
        subtitle: "Punição por aliança tentada",
        description: "Seguindo as notícias, o Reino Germa é oficialmente expulso do Governo por sua tentativa de aliança.",
        characters: ["Vinsmoke Judge"],
        importance: "regional",
        sources: [{ label: "Capítulo 903", type: "manga" }]
      },
      {
        title: "Morte de Absalom",
        subtitle: "Shiryu obtém Suke Suke no Mi",
        description: "Absalom chega na Ilha Pirata e é morto pelos Piratas do Barba Negra. A Suke Suke no Mi é comida por Shiryu.",
        characters: ["Absalom", "Shiryu"],
        importance: "regional",
        sources: [{ label: "Capítulo 925", type: "manga" }]
      },
      {
        title: "Luffy Chega a Wano",
        subtitle: "3 de Março - Salvamento de Tama",
        description: "3 de Março: Luffy é levado pela correnteza até a Praia de Kuri no País de Wano e salva Tama de um grupo de Piratas das Feras.",
        characters: ["Monkey D. Luffy", "Tama"],
        importance: "regional",
        sources: [{ label: "Capítulo 911", type: "manga" }]
      },
      {
        title: "Execução de Shimotsuki Yasuie",
        subtitle: "Zoro recebe Enma",
        description: "Shimotsuki Yasuie é executado. Roronoa Zoro faz um acordo para substituir Shusui por Enma.",
        characters: ["Shimotsuki Yasuie", "Roronoa Zoro"],
        importance: "regional",
        sources: [{ label: "Capítulo 953-955", type: "manga" }]
      },
      {
        title: "Aliança Big Mom e Kaidou",
        subtitle: "Dois Imperadores se unem",
        description: "Charlotte Linlin e Kaidou decidem formar uma aliança temporária com suas tripulações piratas.",
        characters: ["Charlotte Linlin", "Kaidou"],
        importance: "global",
        sources: [{ label: "Capítulo 954", type: "manga" }]
      },
      {
        title: "Resgate de Kuma no Levely",
        subtitle: "Fujitora ajuda escravos",
        description: "Durante o Levely, Bartholomew Kuma é recuperado com sucesso pelo Exército Revolucionário. O Almirante Fujitora ajuda vários escravos a escapar de Mary Geoise, fazendo com que o Almirante Ryokugyu lute com ele.",
        characters: ["Bartholomew Kuma", "Fujitora", "Ryokugyu"],
        importance: "global",
        sources: [{ label: "Capítulo 1083", type: "manga" }]
      },
      {
        title: "Revelação de Imu a Cobra",
        subtitle: "Pergunta sobre Nefertari D. Lili",
        description: "Nefertari Cobra pergunta aos Cinco Anciões sobre o destino de sua ancestral Nefertari D. Lili, levando ao ocupante do Trono Vazio, Imu, se revelar a Cobra e se envolver com Sabo e Cobra na tentativa de matá-los.",
        characters: ["Nefertari Cobra", "Imu", "Sabo"],
        importance: "global",
        sources: [{ label: "Capítulo 1084", type: "manga" }]
      },
      {
        title: "Morte de Nefertari Cobra",
        subtitle: "Vivi sequestrada",
        description: "Nefertari Cobra morre devido aos ferimentos de Imu e sua filha Vivi é sequestrada pela CP0, mas ela é resgatada involuntariamente por Wapol. Publicamente, a morte de Cobra é atribuída a Sabo e Vivi é declarada desaparecida.",
        characters: ["Nefertari Cobra", "Nefertari Vivi", "Wapol", "Sabo"],
        importance: "global",
        sources: [{ label: "Capítulo 1085-1086", type: "manga" }]
      },
      {
        title: "Abolição do Sistema Shichibukai",
        subtitle: "Marinha ataca ex-Corsários",
        description: "O sistema Shichibukai é abolido e a Marinha começa a atacar os antigos Corsários.",
        characters: ["Marinha"],
        importance: "global",
        sources: [{ label: "Capítulo 956", type: "manga" }]
      },
      {
        title: "Ataque a Amazon Lily",
        subtitle: "Hancock vs Barba Negra e Marinha",
        description: "Amazon Lily é atacada pela Marinha e sua unidade Seraphim, em uma tentativa de capturar Boa Hancock, bem como os Piratas do Barba Negra. Vários marinheiros e piratas são petrificados e Hancock é subjugada por Barba Negra. Silvers Rayleigh chega e assusta os piratas e Marinheiros. Koby é feito refém pelos Piratas do Barba Negra.",
        characters: ["Boa Hancock", "Marshall D. Teach", "Silvers Rayleigh", "Koby"],
        importance: "global",
        sources: [{ label: "Capítulo 1059", type: "manga" }]
      },
      {
        title: "Festival do Fogo em Onigashima",
        subtitle: "17 de Março - Início do ataque",
        description: "17 de Março: Durante o Festival do Fogo em Onigashima os afiliados da Aliança Ninja-Pirata-Mink-Samurai iniciam um ataque. Kurozumi Orochi é traído.",
        characters: ["Aliança Ninja-Pirata-Mink-Samurai", "Kurozumi Orochi"],
        importance: "global",
        sources: [{ label: "Capítulo 985", type: "manga" }]
      },
      {
        title: "Casamento de Lola e Gotti",
        subtitle: "União celebrada",
        description: "Lola se casa com Gotti.",
        characters: ["Lola", "Gotti"],
        importance: "local",
        sources: [{ label: "Capítulo 996", type: "manga" }]
      },
      {
        title: "Traição de Kanjuro Revelada",
        subtitle: "Pintura de Oden mata Ashura Doji",
        description: "Kurozumi Kanjuro se revela um traidor e sua pintura de Oden mata Ashura Doji.",
        characters: ["Kurozumi Kanjuro", "Ashura Doji"],
        importance: "regional",
        sources: [{ label: "Capítulo 1014", type: "manga" }]
      },
      {
        title: "Nascimento de Hera",
        subtitle: "Nova Homie de Big Mom",
        description: "Hera nasce.",
        characters: ["Hera", "Charlotte Linlin"],
        importance: "local",
        sources: [{ label: "Capítulo 1011", type: "manga" }]
      },
      {
        title: "Morte de Kanjuro",
        subtitle: "Criação de Kazenbo",
        description: "Kanjuro cria Kazenbo antes de sucumbir aos ferimentos fatais causados por Kiku e Kin'emon.",
        characters: ["Kurozumi Kanjuro", "Kiku", "Kin'emon"],
        importance: "regional",
        sources: [{ label: "Capítulo 1014", type: "manga" }]
      },
      {
        title: "Derrota de Big Mom",
        subtitle: "Kid e Law vencem Imperatriz",
        description: "A Imperatriz Big Mom é derrotada por Eustass Kid e Trafalgar Law.",
        characters: ["Charlotte Linlin", "Eustass Kid", "Trafalgar Law"],
        importance: "global",
        sources: [{ label: "Capítulo 1040", type: "manga" }]
      },
      {
        title: "Morte de Izo",
        subtitle: "Morto pelo agente CP0",
        description: "Izo é morto pelo agente da CP0 Maha.",
        characters: ["Izo", "Maha"],
        importance: "regional",
        sources: [{ label: "Capítulo 1053", type: "manga" }]
      },
      {
        title: "Morte de Orochi",
        subtitle: "Incinerado por Kazenbo e decapitado",
        description: "Orochi é incendiado por Kazenbo e decapitado por Denjiro, ele é posteriormente incinerado.",
        characters: ["Kurozumi Orochi", "Denjiro"],
        importance: "regional",
        sources: [{ label: "Capítulo 1048", type: "manga" }]
      },
      {
        title: "Morte de Guernika",
        subtitle: "Agente CP0 morto por Kaidou",
        description: "O agente da CP0 Guernika é mortalmente ferido por Kaidou. Ele consegue tirar uma foto de Luffy em sua forma desperta antes de morrer.",
        characters: ["Guernika", "Kaidou"],
        importance: "regional",
        sources: [{ label: "Capítulo 1043", type: "manga" }]
      },
      {
        title: "Derrota de Kaidou",
        subtitle: "Luffy vence o Imperador",
        description: "O Imperador Kaidou é derrotado por Luffy.",
        characters: ["Kaidou", "Monkey D. Luffy"],
        importance: "global",
        sources: [{ label: "Capítulo 1049", type: "manga" }]
      },
      {
        title: "Vitória em Onigashima",
        subtitle: "Momonosuke se torna Xógum",
        description: "O Ataque à Onigashima termina com uma vitória para a Aliança Ninja-Pirata-Mink-Samurai, com Kozuki Momonosuke se declarando o Xógum de Wano.",
        characters: ["Kozuki Momonosuke", "Aliança Ninja-Pirata-Mink-Samurai"],
        importance: "global",
        sources: [{ label: "Capítulo 1051", type: "manga" }]
      },
      {
        title: "Novos Imperadores",
        subtitle: "Luffy e Buggy ascendem",
        description: "Por seu envolvimento nas derrotas de dois Imperadores, Luffy, Kid e Law recebem uma recompensa de 3.000.000.000 de berries. Luffy e Buggy substituem Kaidou e Big Mom como os novos Imperadores.",
        characters: ["Monkey D. Luffy", "Buggy", "Eustass Kid", "Trafalgar Law"],
        importance: "global",
        sources: [{ label: "Capítulo 1053", type: "manga" }]
      },
      {
        title: "Ryokugyu Derrotado por Shanks",
        subtitle: "Almirante recua de Wano",
        description: "O Almirante Ryokugyu derrota e detém King e Queen e é impedido de matar o recém-eleito Imperador Luffy devido a Shanks e recua.",
        characters: ["Ryokugyu", "Shanks", "King", "Queen"],
        importance: "global",
        sources: [{ label: "Capítulo 1055", type: "manga" }]
      },
      {
        title: "Aniquilação do Reino Lulusia",
        subtitle: "Ordem de Imu",
        description: "Reino Lulusia é aniquilado por ordem de Imu depois que Sabo, que partiu do reino, tentou contatar seus companheiros revolucionários na tentativa de dizer a eles que ele não era responsável pelo assassinato do Rei Cobra e pelo que ele viu em Mary Geoise.",
        characters: ["Imu", "Sabo"],
        importance: "global",
        sources: [{ label: "Capítulo 1060", type: "manga" }]
      },
      {
        title: "Chegada a Egghead",
        subtitle: "Aliança com Vegapunk e Bonney",
        description: "Os Piratas do Chapéu de Palha chegam a Egghead e fazem uma aliança temporária com Jewelry Bonney e também com Vegapunk, que foi declarado para ser executado por pesquisar o Século Vazio. Os Marinheiros, o Almirante Kizaru, o ancião Jaygarcia Saturn e a CP0 chegam a Egghead para confrontá-lo.",
        characters: ["Vegapunk", "Jewelry Bonney", "Kizaru", "Jaygarcia Saturn"],
        importance: "global",
        sources: [{ label: "Capítulo 1062-1124", type: "manga" }]
      },
      {
        title: "Sequestro de Charlotte Pudding",
        subtitle: "Capturada por Kuzan",
        description: "Charlotte Pudding é sequestrada por Kuzan e Van Augur.",
        characters: ["Charlotte Pudding", "Kuzan", "Van Augur"],
        importance: "regional",
        sources: [{ label: "Capítulo 1064", type: "manga" }]
      },
      {
        title: "Captura de Edward Weevil",
        subtitle: "Derrotado por Ryokugyu",
        description: "Edward Weevil é derrotado e capturado pelo Almirante Ryokugyu.",
        characters: ["Edward Weevil", "Ryokugyu"],
        importance: "regional",
        sources: [{ label: "Capítulo 1059", type: "manga" }]
      },
      {
        title: "Formação da NEO MADS",
        subtitle: "Judge e Caesar se unem",
        description: "Vinsmoke Judge e Caesar Clown formam a NEO MADS.",
        characters: ["Vinsmoke Judge", "Caesar Clown"],
        importance: "regional",
        sources: [{ label: "Capítulo 1107", type: "manga" }]
      },
      {
        title: "Derrota de Eustass Kid",
        subtitle: "Shanks destrói Victoria Punk",
        description: "Em Elbaph, Eustass Kid é confrontado por Shanks, que ordenou que lhe desse seus road poneglyph, levando a uma batalha onde Kid e Killer são rapidamente derrotados. Dorry e Brogy destroem o Victoria Punk, marcando o fim atual dos Piratas Kid.",
        characters: ["Eustass Kid", "Shanks", "Killer", "Dorry", "Brogy"],
        importance: "global",
        sources: [{ label: "Capítulo 1079", type: "manga" }]
      },
      {
        title: "Derrota de Trafalgar Law",
        subtitle: "Polar Tang afundado",
        description: "Na Ilha Winner, Trafalgar Law é derrotado por Barba Negra e seu Polar Tang é afundado marcando o fim atual dos Piratas Heart. A vida de Law é salva por Bepo.",
        characters: ["Trafalgar Law", "Marshall D. Teach", "Bepo"],
        importance: "global",
        sources: [{ label: "Capítulo 1081", type: "manga" }]
      },
      {
        title: "Assassinato de T Bone",
        subtitle: "Morto por recompensa da Cross Guild",
        description: "Vice-Almirante T Bone é morto no Reino Pepe devido à sua recompensa da Cross Guild.",
        characters: ["T Bone"],
        importance: "local",
        sources: [{ label: "Capítulo 1082", type: "manga" }]
      },
      {
        title: "Execução de Mjosgard",
        subtitle: "Morto por Figarland Garling",
        description: "Mjosgard é executado pelo líder dos Cavaleiros de Deus Figarland Garling por ajudar e proteger Shirahoshi dos Nobres Mundiais.",
        characters: ["Mjosgard", "Figarland Garling", "Shirahoshi"],
        importance: "global",
        sources: [{ label: "Capítulo 1086", type: "manga" }]
      },
      {
        title: "Operação de Resgate em Hachinosu",
        subtitle: "Garp capturado",
        description: "Em Hachinosu, Monkey D. Garp e a SWORD realizam uma operação de resgate para libertar Koby dos Piratas do Barba Negra. A batalha leva ao resgate bem-sucedido de Koby, no entanto Garp é derrotado e congelado por Kuzan, enquanto capturado vivo sua condição pública é deixada desconhecida para o mundo.",
        characters: ["Monkey D. Garp", "Koby", "Kuzan"],
        importance: "global",
        sources: [{ label: "Capítulo 1088", type: "manga" }]
      },
      {
        title: "Libertação de Moria",
        subtitle: "Perona resgata Moria",
        description: "Perona liberta Moria com sucesso de seu aprisionamento em Hachinosu.",
        characters: ["Perona", "Gecko Moria"],
        importance: "local",
        sources: [{ label: "Capítulo 1080", type: "manga" }]
      },
      {
        title: "Incidente de Egghead",
        subtitle: "Evento catastrófico",
        description: "Início do Incidente de Egghead: Um evento catastrófico envolvendo os Piratas do Chapéu de Palha, Jewelry Bonney, Vegapunk, os Marinheiros, Kizaru, os Cinco Anciões, Bartholomew Kuma e os Piratas Guerreiros Gigantes.",
        characters: ["Vegapunk", "Jewelry Bonney", "Kizaru", "Bartholomew Kuma"],
        importance: "global",
        sources: [{ label: "Capítulo 1089-1124", type: "manga" }]
      },
      {
        title: "Morte de Vegapunk",
        subtitle: "Mensagem pré-gravada revelada",
        description: "Vegapunk é morto por Kizaru, disparando uma mensagem pré-gravada detalhando segredos do Mundo.",
        characters: ["Vegapunk", "Kizaru"],
        importance: "global",
        sources: [{ label: "Capítulo 1114", type: "manga" }]
      },
      {
        title: "Despertar de Emet",
        subtitle: "200 anos de sono",
        description: "O Gigante de Ferro Emet desperta após 200 anos de sono.",
        characters: ["Emet"],
        importance: "global",
        sources: [{ label: "Capítulo 1118", type: "manga" }]
      },
      {
        title: "Explosão de Tonalidade Régia",
        subtitle: "Emet libera poder de Joy Boy",
        description: "Emet libera uma explosão massiva de Tonalidade Régia através de um nó que foi selado dentro dele por Joy Boy, nocauteando os Marinheiros e enviando 4 dos 5 anciões de volta para Mary Geoise, e permitindo que os Piratas do Chapéu de Palha, Piratas Guerreiros Gigantes, Kuma e Bonney escapem de Egghead e naveguem para Elbaph.",
        characters: ["Emet", "Joy Boy"],
        importance: "global",
        sources: [{ label: "Capítulo 1120", type: "manga" }]
      },
      {
        title: "Punk Records Flutua",
        subtitle: "Desconectado de Egghead",
        description: "Após o incidente de Egghead e as revelações da mensagem pré-gravada: Punk Records é desconectado de Egghead e flutua para longe graças a Edison.",
        characters: ["Edison"],
        importance: "regional",
        sources: [{ label: "Capítulo 1124", type: "manga" }]
      },
      {
        title: "Queda de Jaygarcia Saturn",
        subtitle: "Imu remove imortalidade",
        description: "Jaygarcia Saturn é destituído de sua imortalidade por Imu por permitir que Luffy escapasse. Sua posição como um dos Cinco Anciões e prestígio de Deidade Guerreira da Defesa Científica é assumida por Figarland Garling.",
        characters: ["Jaygarcia Saturn", "Imu", "Figarland Garling"],
        importance: "global",
        sources: [{ label: "Capítulo 1125", type: "manga" }]
      },
      {
        title: "Derrota de Bartolomeo",
        subtitle: "Navio afundado por Yasopp",
        description: "Bartolomeo e sua tripulação são confrontados e derrotados pelos Piratas do Ruivo, antes que pudessem partir seu navio é afundado por Yasopp deixando seus destinos desconhecidos.",
        characters: ["Bartolomeo", "Yasopp", "Shanks"],
        importance: "local",
        sources: [{ label: "Capítulo 1126", type: "manga" }]
      },
      {
        title: "Captura pelo Muginn",
        subtitle: "Thousand Sunny levado a Road",
        description: "Dois dias após deixar Egghead, o Thousand Sunny é capturado por Muginn após passar pela Zona da Névoa do Sono, trazendo-o para Road. Ele aprisiona os seis chapéus de palha a bordo dentro do País dos Deuses em Elbaph.",
        characters: ["Muginn", "Piratas do Chapéu de Palha"],
        importance: "regional",
        sources: [{ label: "Capítulo 1126", type: "manga" }]
      },
      {
        title: "Luffy Mata o Glutbunny",
        subtitle: "Encontro com Zoro e Sanji",
        description: "Depois de acordar, Luffy mata o Glutbunny antes de ser encontrado por Zoro e Sanji, que cozinha seus restos para comida. Mais tarde, os três salvam Nami e Usopp do Iscat e, mais tarde, Chopper.",
        characters: ["Monkey D. Luffy", "Roronoa Zoro", "Sanji"],
        importance: "local",
        sources: [{ label: "Capítulo 1127-1128", type: "manga" }]
      },
      {
        title: "Escape de Road",
        subtitle: "Luffy faz acordo com Loki",
        description: "Os chapéus de palha escapam do Road enquanto cavalgam Iscat e chegam ao Submundo de Elbaph. Luffy faz contato com Loki e faz um acordo para libertá-lo.",
        characters: ["Monkey D. Luffy", "Loki"],
        importance: "regional",
        sources: [{ label: "Capítulo 1130", type: "manga" }]
      },
      {
        title: "Road Dominado",
        subtitle: "Gerd e Goldberg assumem controle",
        description: "Road é dominado por Gerd e Goldberg, depois que eles se apresentam aos chapéus de palha e os dão oficialmente as boas-vindas a Elbaph.",
        characters: ["Gerd", "Goldberg"],
        importance: "local",
        sources: [{ label: "Capítulo 1131", type: "manga" }]
      },
      {
        title: "Reunião com Saul",
        subtitle: "Robin reencontra amigo após 22 anos",
        description: "O Great Eirik chega a Elbaph e se reagrupa com a tripulação, Robin se reúne com Saul depois de vinte e dois anos.",
        characters: ["Nico Robin", "Jaguar D. Saul"],
        importance: "global",
        sources: [{ label: "Capítulo 1132", type: "manga" }]
      },
      {
        title: "Cavaleiros de Deus em Elbaph",
        subtitle: "Contato estabelecido",
        description: "Os Cavaleiros de Deus fazem contato em Elbaph.",
        characters: ["Cavaleiros de Deus"],
        importance: "global",
        sources: [{ label: "Capítulo 1135", type: "manga" }]
      }
    ]
  }
];

console.log("🔄 Gerando estrutura de dados limpa...\n");

const base = path.join(process.cwd(), "public", "data");
const yearsPath = path.join(base, "years.json");
const byYearDir = path.join(base, "events-by-year");
const eventsDir = path.join(base, "events");

ensureDir(byYearDir);
ensureDir(eventsDir);

const years = [];
let totalEvents = 0;

for (const period of timelineData) {
  years.push({
    id: period.id,
    CM: period.CM,
    EC: period.EC,
    approx: period.approx,
    label: period.label
  });
  
  const eventPreviews = [];
  
  for (const event of period.events) {
    const eventId = `${period.id}-${slugify(event.title)}`;
    
    eventPreviews.push({
      id: eventId,
      title: event.title,
      subtitle: event.subtitle,
      importance: event.importance
    });
    
    const eventDetail = {
      id: eventId,
      year: {
        CM: period.CM,
        EC: period.EC
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
      CM: period.CM,
      EC: period.EC
    },
    events: eventPreviews
  };
  
  fs.writeFileSync(
    path.join(byYearDir, `${period.id}.json`),
    JSON.stringify(yearFile, null, 2),
    "utf-8"
  );
  
  console.log(`✅ ${period.label}: ${period.events.length} evento(s)`);
}

fs.writeFileSync(
  yearsPath,
  JSON.stringify({ years }, null, 2),
  "utf-8"
);

console.log(`\n📊 Resumo:`);
console.log(`   ${years.length} períodos gerados`);
console.log(`   ${totalEvents} eventos gerados`);
console.log(`\n✅ Arquivos salvos em public/data/`);
