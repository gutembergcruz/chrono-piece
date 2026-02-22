'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { LuChevronsLeft, LuChevronLeft, LuChevronRight, LuChevronsRight, LuCalendar, LuX } from 'react-icons/lu'
import './styles.scss'
import eventsData from '@/datas/years.json'

interface YearData {
  CM: string | number
  EC: string | number
}

export function Footer() {
  const years: YearData[] = useMemo(() => {
    const uniqueYears = new Map<string, YearData>()
    
    eventsData.eventos_principais.forEach(event => {
      const key = `${event.CM}-${event.EC}`
      if (!uniqueYears.has(key)) {
        uniqueYears.set(key, {
          CM: event.CM,
          EC: event.EC
        })
      }
    })
    
    return Array.from(uniqueYears.values())
  }, [])

  const [selectedYearIndex, setSelectedYearIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const timelineItemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (timelineItemsRef.current[selectedYearIndex]) {
      timelineItemsRef.current[selectedYearIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    }
  }, [selectedYearIndex])

  const handleYearClick = (index: number) => {
    setSelectedYearIndex(index)
    setIsModalOpen(false)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleFirst = () => {
    setSelectedYearIndex(0)
  }

  const handlePrevious = () => {
    if (selectedYearIndex > 0) {
      setSelectedYearIndex(selectedYearIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedYearIndex < years.length - 1) {
      setSelectedYearIndex(selectedYearIndex + 1)
    }
  }

  const handleLast = () => {
    setSelectedYearIndex(years.length - 1)
  }

  const selectedYear = years[selectedYearIndex]

  return (
    <footer className="footer-container">
      <div className="mobile-year-selector">
        <div className="selected-year-display">
          <div className="year-info">
            <span className="year-label">Ano Selecionado</span>
            <span className="year-value">CM {selectedYear?.CM} / EC {selectedYear?.EC}</span>
          </div>
          <button className="open-modal-btn" onClick={toggleModal}>
            <LuCalendar size={20} />
          </button>
        </div>
      </div>

      <div className="timeline-nav-buttons">
        <button 
          className="timeline-nav-button" 
          onClick={handleFirst}
          disabled={selectedYearIndex === 0}
          title="Primeiro ano"
        >
          <LuChevronsLeft size={20} />
        </button>
        <button 
          className="timeline-nav-button" 
          onClick={handlePrevious}
          disabled={selectedYearIndex === 0}
          title="Ano anterior"
        >
          <LuChevronLeft size={20} />
        </button>
      </div>

      <div className="timeline-ruler">
        <div className="timeline-track">
          {years.map((year, index) => (
            <div 
              key={`${year.CM}-${year.EC}`} 
              className="timeline-item"
              ref={(el) => (timelineItemsRef.current[index] = el)}
            >
              <div 
                className={`timeline-marker ${selectedYearIndex === index ? 'active' : ''}`}
                onClick={() => handleYearClick(index)}
              />
              
              <div className="timeline-year">
                <div>CM {year.CM}</div>
                <div>EC {year.EC}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="timeline-nav-buttons">
        <button 
          className="timeline-nav-button" 
          onClick={handleNext}
          disabled={selectedYearIndex === years.length - 1}
          title="Próximo ano"
        >
          <LuChevronRight size={20} />
        </button>
        <button 
          className="timeline-nav-button" 
          onClick={handleLast}
          disabled={selectedYearIndex === years.length - 1}
          title="Último ano"
        >
          <LuChevronsRight size={20} />
        </button>
      </div>

      {isModalOpen && (
        <div className="year-modal-overlay" onClick={toggleModal}>
          <div className="year-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Selecione um Ano</h3>
              <button className="close-modal-btn" onClick={toggleModal}>
                <LuX size={24} />
              </button>
            </div>
            <div className="modal-year-list">
              {years.map((year, index) => (
                <div
                  key={`${year.CM}-${year.EC}`}
                  className={`modal-year-item ${selectedYearIndex === index ? 'active' : ''}`}
                  onClick={() => handleYearClick(index)}
                >
                  <div className="year-marker" />
                  <div className="year-text">
                    <span className="cm-year">CM {year.CM}</span>
                    <span className="ec-year">EC {year.EC}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  )
}
