"use client";

import { Footer } from "@/Components/Footer";
import "./styles.scss";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { useTimeline } from "@/contexts/TimelineContext";
import { useEventDetail } from "@/hooks/useEvents";
import { useEffect } from "react";

const sourceTypeLabels: Record<string, string> = {
  manga: "Mangá",
  anime: "Anime",
  sbs: "SBS",
  databook: "Databook",
  other: "Outro"
};

export function MainContent() {
  const { selectedEventId, selectedYear, setSelectedEventId } = useTimeline();
  const { event, loading } = useEventDetail(selectedEventId);

  useEffect(() => {
    if (!selectedEventId && selectedYear) {
      setSelectedEventId(null);
    }
  }, [selectedYear, selectedEventId, setSelectedEventId]);

  if (!selectedEventId || !event) {
    return (
      <main className="main-content-container">
        <div className="main-content-wrapper">
          <div className="event-hero">
            <div className="event-hero-background">
              <h1>Selecione um evento</h1>
              <p className="event-period">
                {selectedYear ? `${selectedYear.CM} CM / ${selectedYear.EC} EC` : "Navegue pela linha do tempo"}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (loading) {
    return (
      <main className="main-content-container">
        <div className="main-content-wrapper">
          <div className="event-hero">
            <div className="event-hero-background">
              <h1>Carregando...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="main-content-container">
      <div className="main-content-wrapper">
        <div className="event-hero">
          <div className="event-hero-background">
            <h1>{event.title}</h1>
            <p className="event-period">{event.year.CM} CM / {event.year.EC} EC</p>
          </div>
        </div>

        <div className="event-details">
          <section className="event-description">
            <h2>O que aconteceu</h2>
            <p>{event.whatHappened}</p>
          </section>
          <aside className="event-sidebar-info">
            <section className="key-characters">
              <h3>Personagens Chave</h3>
              <div className="character-list">
                {event.keyCharacters.map((character, index) => (
                  <div key={index} className="character-item">
                    <div className="character-info">
                      <h4>{character}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="key-characters">
              <h3>Fontes</h3>
              <div className="character-list">
                {event.sources.map((source, index) => (
                  <div key={index} className="character-item">
                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="character-avatar"
                      >
                        <LuSquareArrowOutUpRight color="#386be3" />
                      </a>
                    )}
                    <div className="character-info">
                      <h4>{source.type ? sourceTypeLabels[source.type] || source.type : "Fonte"}</h4>
                      <p>{source.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
