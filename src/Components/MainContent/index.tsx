"use client";

import { Footer } from "@/Components/Footer";
import "./styles.scss";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

export function MainContent() {
  return (
    <main className="main-content-container">
      <div className="main-content-wrapper">
        <div className="event-hero">
          <div className="event-hero-background">
            <h1>Expansão do Reino Briss</h1>
            <p className="event-period">1300s EC</p>
          </div>
        </div>

        <div className="event-details">
          <section className="event-description">
            <h2>Descrição</h2>
            <p>
              O Reino Briss expande seus territórios consolidando seu poder e
              iniciando pne série de conquistas que muderián o cursu da histori.
              A tripulação real lidera a grandiôsa jornaan em direção à Grand
              Line.
            </p>
          </section>
          <aside className="event-sidebar-info">
            <section className="key-characters">
              <h3>Personagens Chave</h3>
              <div className="character-list">
                <div className="character-item">
                  <div className="character-info">
                    <h4>Rei St. Briss</h4>
                  </div>
                </div>
                <div className="character-item">
                  <div className="character-info">
                    <h4>Mary Geóise</h4>
                  </div>
                </div>
                <div className="character-item">
                  <div className="character-info">
                    <h4>Emet</h4>
                  </div>
                </div>
              </div>
            </section>
            <section className="key-characters">
              <h3>Fontes</h3>
              <div className="character-list">
                <div className="character-item">
                  <a
                    href="https://onepiece.fandom.com/pt/wiki/SBS_Volume_7"
                    target="_blank"
                    className="character-avatar"
                  >
                    <LuSquareArrowOutUpRight color="#386be3" />
                  </a>
                  <div className="character-info">
                    <h4>Anime</h4>
                    <p>Episodio 100</p>
                  </div>
                </div>
                <div className="character-item">
                  <a
                    href="https://onepiece.fandom.com/pt/wiki/SBS_Volume_7"
                    target="_blank"
                    className="character-avatar"
                  >
                    <LuSquareArrowOutUpRight color="#386be3" />
                  </a>
                  <div className="character-info">
                    <h4>Manga</h4>
                    <p>Capitulo 35 - Volume 4</p>
                  </div>
                </div>
                <div className="character-item">
                  <a
                    href="https://onepiece.fandom.com/pt/wiki/SBS_Volume_7"
                    target="_blank"
                    className="character-avatar"
                  >
                    <LuSquareArrowOutUpRight color="#386be3" />
                  </a>
                  <div className="character-info">
                    <h4>SBS</h4>
                    <p>Volume 7</p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
