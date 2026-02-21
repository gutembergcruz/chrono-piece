'use client'

import { useState } from 'react'
import './styles.scss'

interface Event {
  id: string
  title: string
  period: string
  icon: string
}

export function Sidebar() {
  const [selectedYear, setSelectedYear] = useState('1300 EC')
  const [selectedEvent, setSelectedEvent] = useState('expansao-reino-briss')

  const events: Event[] = [
    { id: 'expansao-reino-briss', title: 'Expansão do Reino Briss', period: '1300s EC', icon: '👑' },
    { id: 'chegada-grand-line', title: 'A Chegada da Grand Line', period: '1300s EC', icon: '⛵' },
    { id: 'queda-skypiea', title: 'A Queda de Skypiea', period: '1330s EC', icon: '⚔️' },
    { id: 'criacao-loja-armas', title: 'Criação da Loja de Armas', period: '1350s EC', icon: '⚔️' },
    { id: 'discriminacao-ilha', title: 'Discriminação na Ilha', period: '1400s EC', icon: '👤' },
    { id: 'levly-primeiro-rei', title: 'Levly, o Primeiro Rei', period: '1450s EC', icon: '👑' },
    { id: 'aparecimento-fish-men', title: 'Aparecimento dos Fish-Men', period: '1470s EC', icon: '🐉' },
    { id: 'batalha-green-bit', title: 'Batalha no Green Bit', period: '1490s EC', icon: '🏰' },
  ]

  return (
    <aside className="sidebar-container">
      <div className="sidebar-events-header">
        <h3>Acontecimentos ({events.length})</h3>
      </div>
      <div className="sidebar-events-list">
        {events.map((event) => (
          <div
            key={event.id}
            className={`event-item ${selectedEvent === event.id ? 'active' : ''}`}
            onClick={() => setSelectedEvent(event.id)}
          >
            <div className="event-icon">{event.icon}</div>
            <div className="event-info">
              <h4>{event.title}</h4>
              <p>{event.period}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}
