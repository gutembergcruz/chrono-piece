import { useState, useEffect } from 'react';
import type { EventsByYear, EventDetail } from '@/types';

export function useEventsByYear(yearId: string | null) {
  const [events, setEvents] = useState<EventsByYear | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (yearId === null) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/data/events-by-year/${yearId}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events for year ${yearId}`);
        }
        
        const data: EventsByYear = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setEvents(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [yearId]);

  return { events, loading, error };
}

export function useEventDetail(eventId: string | null) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/data/events/${eventId}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch event ${eventId}`);
        }
        
        const data: EventDetail = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { event, loading, error };
}
