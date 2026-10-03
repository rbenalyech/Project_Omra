import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { content } = useContext(LanguageContext);
  const { hero } = content;

  const scrollToStart = () => {
    document.getElementById('preparatifs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero section">
      <div className="hero-bg">
        <div className="hero-star hero-star--1" />
        <div className="hero-star hero-star--2" />
        <div className="hero-star hero-star--3" />
        <div className="hero-crescent" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">Bismillah</div>
        <h1 className="hero-title">{hero.title}</h1>
        <p className="hero-subtitle">{hero.subtitle}</p>

        <div className="hero-actions">
          <button className="btn btn--primary hero-cta" onClick={scrollToStart}>
            {hero.cta}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="hero-route">
          <span className="hero-route-city">BRU</span>
          <svg className="hero-route-plane" width="24" height="24" viewBox="0 0 24 24" fill="var(--color-accent)">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <span className="hero-route-dots" />
          <span className="hero-route-city">ATH</span>
          <svg className="hero-route-plane" width="24" height="24" viewBox="0 0 24 24" fill="var(--color-accent)">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
          <span className="hero-route-dots" />
          <span className="hero-route-city hero-route-city--dest">JED</span>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-wheel" />
        </div>
        <span>Scrolle pour commencer</span>
      </div>
    </section>
  );
}
