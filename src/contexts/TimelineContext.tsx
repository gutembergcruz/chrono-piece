'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { Year, YearsData } from '@/types';

interface TimelineContextType {
  years: Year[];
  selectedYearIndex: number;
  selectedYear: Year | null;
  selectedEventId: string | null;
  setSelectedYearIndex: (index: number) => void;
  setSelectedEventId: (eventId: string | null) => void;
  loading: boolean;
}

const TimelineContext = createContext<TimelineContextType | undefined>(undefined);

const STORAGE_KEYS = {
  YEAR_INDEX: 'chronopiece_selected_year_index',
  EVENT_ID: 'chronopiece_selected_event_id',
};

export function TimelineProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch('/data/years.json');
        const data: YearsData = await response.json();
        setYears(data.years);
      } catch (error) {
        console.error('Failed to load years:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchYears();
  }, []);

  useEffect(() => {
    if (years.length > 0 && !initialized) {
      const urlEventId = searchParams.get('event');
      const urlYearId = searchParams.get('year');
      
      let yearIndexToSet = years.length - 1;
      let eventIdToSet: string | null = null;

      if (urlYearId) {
        const yearIndex = years.findIndex(y => y.id === urlYearId);
        if (yearIndex !== -1) {
          yearIndexToSet = yearIndex;
        }
      } else {
        const savedYearIndex = localStorage.getItem(STORAGE_KEYS.YEAR_INDEX);
        if (savedYearIndex !== null) {
          const index = parseInt(savedYearIndex, 10);
          if (index >= 0 && index < years.length) {
            yearIndexToSet = index;
          }
        }
      }

      setSelectedYearIndex(yearIndexToSet);

      if (urlEventId) {
        eventIdToSet = urlEventId;
        setSelectedEventId(urlEventId);
        setInitialized(true);
      } else {
        const savedEventId = localStorage.getItem(STORAGE_KEYS.EVENT_ID);
        if (savedEventId) {
          eventIdToSet = savedEventId;
          setSelectedEventId(savedEventId);
          setInitialized(true);
        } else {
          const yearToLoad = years[yearIndexToSet];
          if (yearToLoad) {
            fetch(`/data/events-by-year/${yearToLoad.id}.json`)
              .then(res => res.json())
              .then(data => {
                if (data.events && data.events.length > 0) {
                  setSelectedEventId(data.events[0].id);
                }
                setInitialized(true);
              })
              .catch(err => {
                console.error('Failed to load most recent event:', err);
                setInitialized(true);
              });
          } else {
            setInitialized(true);
          }
        }
      }
    }
  }, [years, initialized, searchParams]);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEYS.YEAR_INDEX, selectedYearIndex.toString());
    }
  }, [selectedYearIndex, initialized]);

  useEffect(() => {
    if (initialized && selectedEventId) {
      localStorage.setItem(STORAGE_KEYS.EVENT_ID, selectedEventId);
    }
  }, [selectedEventId, initialized]);

  const selectedYear = years[selectedYearIndex] || null;

  useEffect(() => {
    if (initialized && selectedYear && selectedEventId) {
      const params = new URLSearchParams();
      params.set('year', selectedYear.id);
      params.set('event', selectedEventId);
      router.replace(`/?${params.toString()}`, { scroll: false });
    }
  }, [selectedYear, selectedEventId, initialized, router]);

  return (
    <TimelineContext.Provider
      value={{
        years,
        selectedYearIndex,
        selectedYear,
        selectedEventId,
        setSelectedYearIndex,
        setSelectedEventId,
        loading,
      }}
    >
      {children}
    </TimelineContext.Provider>
  );
}

export function useTimeline() {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
}
