"use client";

import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "./styles.scss";
import { useTimeline } from "@/contexts/TimelineContext";
import { useEventsByYear } from "@/hooks/useEvents";

const importanceIcons: Record<string, string> = {
  global: "🌍",
  regional: "🗺️",
  local: "📍"
};

export function Sidebar() {
  const { selectedYear, selectedEventId, setSelectedEventId } = useTimeline();
  const { events: eventsData, loading } = useEventsByYear(selectedYear?.id || null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const events = eventsData?.events || [];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isCollapsed ? (
          <LuChevronRight size={20} />
        ) : (
          <LuChevronLeft size={20} />
        )}
      </button>
      <div className={isCollapsed ? "sidebar-events-header collapsed" : "sidebar-events-header"}>
        <h3>Acontecimentos ({events.length})</h3>
      </div>
      <div className={isCollapsed ? "sidebar-events-list collapsed" : "sidebar-events-list"}>
        {loading ? (
          <div className="loading-state">Carregando...</div>
        ) : events.length === 0 ? (
          <div className="empty-state">Nenhum evento neste ano</div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`event-item ${selectedEventId === event.id ? "active" : ""}`}
              onClick={() => setSelectedEventId(event.id)}
            >
              <div className="event-icon">{importanceIcons[event.importance]}</div>
              <div className="event-info">
                <h4>{event.title}</h4>
                <p>{event.subtitle}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
