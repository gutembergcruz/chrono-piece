'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

export function TimelineProvider({ children }: { children: ReactNode }) {
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  const selectedYear = years[selectedYearIndex] || null;

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
