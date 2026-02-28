'use client'
import { useState, useRef, useEffect } from 'react'
import { LuSearch } from 'react-icons/lu'
import logoImg from '@/assets/logo.png'
import Image from 'next/image'
import './styles.scss'
import { useSearch } from '@/hooks/useSearch'
import { useTimeline } from '@/contexts/TimelineContext'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { searchEvents } = useSearch()
  const { years, setSelectedYearIndex, setSelectedEventId } = useTimeline()
  const searchRef = useRef<HTMLDivElement>(null)

  const suggestions = searchEvents(searchQuery)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setShowSuggestions(value.trim().length > 0)
  }

  const handleSelectEvent = (eventId: string, yearId: string) => {
    const yearIndex = years.findIndex(y => y.id === yearId)
    
    if (yearIndex !== -1) {
      setSelectedYearIndex(yearIndex)
      setSelectedEventId(eventId)
      
      const selectedEvent = suggestions.find(s => s.id === eventId)
      if (selectedEvent) {
        setSearchQuery(selectedEvent.title)
      }
      
      setShowSuggestions(false)
    }
  }

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSelectEvent(suggestions[0].id, suggestions[0].yearId)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
   <div className="header-container">
        <div className="header-left">
            <Image src={logoImg} alt="Logo" />
        </div>
        <div className="header-search" ref={searchRef}>
            <input 
              type="text" 
              placeholder='Buscar acontecimentos...' 
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSearch} className='search-button'>
              <LuSearch size={18} className="search-icon" />
            </button>
            
            {showSuggestions && suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((event) => (
                  <div
                    key={event.id}
                    className="suggestion-item"
                    onClick={() => handleSelectEvent(event.id, event.yearId)}
                  >
                    <div className="suggestion-content">
                      <div className="suggestion-title">{event.title}</div>
                      <div className="suggestion-subtitle">{event.subtitle}</div>
                    </div>
                    <div className="suggestion-year">
                      CM {event.yearCM} / EC {event.yearEC}
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
   </div>
  );
}