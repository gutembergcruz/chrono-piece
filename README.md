# ChronoPiece

Linha do tempo interativa de eventos de One Piece com sistema de calendários CM (Calendário do Mar) e EC (Era do Círculo).

## Estrutura de Dados

O projeto utiliza uma arquitetura JSON escalável sem necessidade de backend:

```
public/data/
├── years.json                    # Lista de anos disponíveis
├── events-by-year/              # Eventos por ano (carregamento lazy)
│   ├── 600.json
│   ├── 1517.json
│   └── ...
└── events/                      # Detalhes completos dos eventos
    ├── roger-execution.json
    ├── laugh-tale-discovery.json
    └── ...
```

### Adicionar Novos Eventos

1. **Adicionar ano em `years.json`**:
```json
{ "id": "cm-1525", "CM": 1525, "EC": 4115, "approx": false, "label": "1525 CM / 4115 EC" }
```

2. **Criar arquivo `events-by-year/{ano}.json`**:
```json
{
  "year": { "CM": 1525, "EC": 4115 },
  "events": [
    {
      "id": "event-id",
      "title": "Título do Evento",
      "subtitle": "Subtítulo",
      "importance": "global"
    }
  ]
}
```

3. **Criar arquivo `events/{event-id}.json`**:
```json
{
  "id": "event-id",
  "year": { "CM": 1525, "EC": 4115 },
  "title": "Título do Evento",
  "subtitle": "Subtítulo",
  "whatHappened": "Descrição completa...",
  "keyCharacters": ["Personagem 1", "Personagem 2"],
  "importance": "global",
  "sources": [
    { "label": "Capítulo X", "type": "manga" }
  ]
}
```

## Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Tecnologias

- Next.js 16
- React 19
- TypeScript
- SCSS
- React Icons
