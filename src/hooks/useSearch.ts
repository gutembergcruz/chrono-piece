import { useState, useEffect, useMemo } from 'react';

interface SearchEvent {
  id: string;
  title: string;
  subtitle: string;
  yearId: string;
  yearCM: number;
  yearEC: number;
}

export function useSearch() {
  const [allEvents, setAllEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const yearsResponse = await fetch('/data/years.json');
        const yearsData = await yearsResponse.json();
        
        const eventsPromises = yearsData.years.map(async (year: any) => {
          try {
            const response = await fetch(`/data/events-by-year/${year.id}.json`);
            const data = await response.json();
            
            return data.events.map((event: any) => ({
              id: event.id,
              title: event.title,
              subtitle: event.subtitle,
              yearId: year.id,
              yearCM: year.CM,
              yearEC: year.EC,
            }));
          } catch {
            return [];
          }
        });

        const eventsArrays = await Promise.all(eventsPromises);
        const flatEvents = eventsArrays.flat();
        
        setAllEvents(flatEvents);
      } catch (error) {
        console.error('Failed to load events for search:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);

  const searchEvents = useMemo(() => {
    return (query: string): SearchEvent[] => {
      if (!query.trim()) return [];
      
      const lowerQuery = query.toLowerCase();
      
      return allEvents
        .filter(event => 
          event.title.toLowerCase().includes(lowerQuery) ||
          event.subtitle.toLowerCase().includes(lowerQuery)
        )
        .slice(0, 10);
    };
  }, [allEvents]);

  return { searchEvents, loading };
}
