import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Sacralisation.css';

const INTERDIT_ICONS = {
  perfume: '🚫🧴', nails: '🚫💅', scissors: '🚫✂️', heart: '🚫❤️',
  hunt: '🚫🦌', shirt: '🚫👔', hat: '🚫🧢',
};

function MiqatMap() {
  const { miqat } = content.sacralisation;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`miqat-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{miqat.title}</h3>
      <p className="sacra-text">{miqat.description}</p>

      <div className="miqat-points">
        {miqat.points.map((point, i) => (
          <div
            key={i}
            className="miqat-point card"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="miqat-point-marker" />
            <div className="miqat-point-info">
              <strong>{point.name}</strong>
              {point.aka && <span className="miqat-aka">({point.aka})</span>}
              <span className="miqat-distance">{point.distance}</span>
              {point.note && <span className="miqat-note">{point.note}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="miqat-europe-note card">
        <span className="miqat-europe-icon">✈️</span>
        <p>{miqat.europeNote}</p>
      </div>

      <div className="miqat-warning card">
        <span className="miqat-warning-icon">⚠️</span>
        <p>{miqat.warning}</p>
      </div>
    </div>
  );
}

function IhramSection() {
  const { ihram } = content.sacralisation;
  const [showAfter, setShowAfter] = useState(false);
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`ihram-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{ihram.title}</h3>

      <div className="ihram-transform">
        <button
          className={`ihram-toggle ${showAfter ? 'ihram-toggle--after' : ''}`}
          onClick={() => setShowAfter(!showAfter)}
        >
          <span>{showAfter ? 'En Ihram' : 'Avant l\'Ihram'}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 16l5-5 5 5" />
          </svg>
        </button>

        <div className="ihram-visual">
          <div className={`ihram-before ${showAfter ? 'hidden' : ''}`}>
            <div className="ihram-person">
              <div className="ihram-head" />
              <div className="ihram-body ihram-body--normal" />
            </div>
            <span className="ihram-label">Vêtements habituels</span>
          </div>
          <div className={`ihram-after ${showAfter ? '' : 'hidden'}`}>
            <div className="ihram-person">
              <div className="ihram-head ihram-head--bare" />
              <div className="ihram-body ihram-body--ihram" />
            </div>
            <span className="ihram-label">En état d'Ihram</span>
          </div>
        </div>

        <div className="ihram-descriptions">
          <p className="sacra-text">{ihram.descriptionHomme}</p>
          <p className="sacra-text">{ihram.descriptionFemme}</p>
        </div>
      </div>

      <div className="ihram-interdits">
        <h4 className="interdits-title">Les interdits pendant l'Ihram</h4>
        <div className="interdits-grid">
          {ihram.interdits.map((interdit, i) => (
            <div
              key={i}
              className="interdit-item"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="interdit-icon">{INTERDIT_ICONS[interdit.icon] || '🚫'}</span>
              <span className="interdit-text">{interdit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TalbiyahSection() {
  const { talbiyah } = content.sacralisation;
  const [ref, inView] = useInView();
  const [copied, setCopied] = useState(false);

  const copyPhonetic = async () => {
    try {
      await navigator.clipboard.writeText(talbiyah.phonetic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <div ref={ref} className={`talbiyah-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{talbiyah.title}</h3>
      <p className="sacra-text">{talbiyah.instruction}</p>

      <div className="talbiyah-card card">
        <div className="talbiyah-arabic arabic-text">
          {talbiyah.arabic}
        </div>

        <div className="talbiyah-phonetic">
          <p className="phonetic-text">{talbiyah.phonetic}</p>
          <button className="talbiyah-copy" onClick={copyPhonetic} title="Copier">
            {copied ? '✓' : '📋'}
          </button>
        </div>

        <div className="talbiyah-translation">
          <p>{talbiyah.translation}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sacralisation() {
  return (
    <section id="sacralisation" className="sacralisation section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 4</span>
          <h2 className="section-title">{content.sacralisation.sectionTitle}</h2>
          <p className="section-subtitle">{content.sacralisation.sectionSubtitle}</p>
        </div>

        <div className="sacra-content">
          <MiqatMap />
          <IhramSection />
          <TalbiyahSection />
        </div>
      </div>
    </section>
  );
}
