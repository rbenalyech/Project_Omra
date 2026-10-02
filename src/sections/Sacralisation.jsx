import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Sacralisation.css';

function DuaCard({ arabic, phonetic, translation, source, className = '' }) {
  const [copied, setCopied] = useState(false);
  const copyPhonetic = async () => {
    try {
      await navigator.clipboard.writeText(phonetic);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  };

  return (
    <div className={`dua-card card ${className}`}>
      <div className="dua-arabic arabic-text">{arabic}</div>
      <div className="dua-phonetic">
        <p className="phonetic-text">{phonetic}</p>
        <button className="dua-copy" onClick={copyPhonetic} title="Copier">
          {copied ? '✓' : '📋'}
        </button>
      </div>
      <div className="dua-translation">
        <p>{translation}</p>
      </div>
      {source && <cite className="dua-source">{source}</cite>}
    </div>
  );
}

function MiqatMap() {
  const { miqat } = content.sacralisation;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`miqat-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{miqat.title}</h3>
      <p className="sacra-text">{miqat.description}</p>

      <div className="miqat-points">
        {miqat.points.map((point, i) => (
          <div key={i} className="miqat-point card" style={{ transitionDelay: `${i * 0.1}s` }}>
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

function PreparationSection() {
  const { preparation } = content.sacralisation;
  const [ref, inView] = useInView();
  const [activeTab, setActiveTab] = useState('homme');

  return (
    <div ref={ref} className={`prep-ihram-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{preparation.title}</h3>
      <p className="sacra-text">{preparation.intro}</p>

      <div className="gender-tabs">
        <button
          className={`gender-tab ${activeTab === 'homme' ? 'gender-tab--active' : ''}`}
          onClick={() => setActiveTab('homme')}
        >
          Homme
        </button>
        <button
          className={`gender-tab ${activeTab === 'femme' ? 'gender-tab--active' : ''}`}
          onClick={() => setActiveTab('femme')}
        >
          Femme
        </button>
      </div>

      <div className="gender-content card">
        {activeTab === 'homme' ? (
          <>
            <h4 className="gender-title">{preparation.homme.title}</h4>
            <ol className="prep-steps-list">
              {preparation.homme.steps.map((step, i) => (
                <li key={i} className="prep-step-item">
                  <span className="prep-step-number">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="prep-warning-box">
              <span>⚠️</span>
              <p>{preparation.homme.warning}</p>
            </div>
          </>
        ) : (
          <>
            <h4 className="gender-title">{preparation.femme.title}</h4>
            <ol className="prep-steps-list">
              {preparation.femme.steps.map((step, i) => (
                <li key={i} className="prep-step-item">
                  <span className="prep-step-number">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="prep-note-box">
              <p>{preparation.femme.note}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function EntreeSection() {
  const { entree, condition } = content.sacralisation;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`entree-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{entree.title}</h3>
      <p className="sacra-text">{entree.text}</p>

      <DuaCard
        arabic={entree.declaration.arabic}
        phonetic={entree.declaration.phonetic}
        translation={entree.declaration.translation}
        className="dua-card--highlight"
      />

      <div className="condition-block">
        <h4 className="sacra-subtitle-sm">{condition.title}</h4>
        <p className="sacra-text">{condition.text}</p>
        <DuaCard
          arabic={condition.arabic}
          phonetic={condition.phonetic}
          translation={condition.translation}
          source={condition.source}
        />
        <p className="sacra-text sacra-text--small">{condition.effect}</p>
      </div>
    </div>
  );
}

function IhramManSvg() {
  return (
    <svg viewBox="0 0 120 200" className="ihram-svg" aria-label="Homme en Ihram">
      {/* Head */}
      <circle cx="60" cy="30" r="18" fill="#D4A574" />
      {/* Hair/beard */}
      <ellipse cx="60" cy="24" rx="16" ry="12" fill="#2C1810" />
      <path d="M48 35 Q52 42 60 44 Q68 42 72 35" fill="#2C1810" />
      {/* Eyes */}
      <circle cx="53" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="67" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Ridâ' (upper cloth) - left shoulder covered, right exposed */}
      <path d="M38 50 Q42 48 60 52 L80 50 L82 55 L60 56 L38 55 Z" fill="#F5F0E8" stroke="#E0D8C8" strokeWidth="0.5" />
      <path d="M38 55 L38 100 Q40 105 50 108 L60 110 L60 56 Z" fill="#F5F0E8" stroke="#E0D8C8" strokeWidth="0.5" />
      <path d="M60 56 L60 110 Q60 112 55 115 L38 100" fill="none" />
      {/* Right shoulder exposed */}
      <circle cx="75" cy="50" r="5" fill="#D4A574" />
      {/* Right arm */}
      <path d="M78 55 Q82 75 78 95" stroke="#D4A574" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Left arm under cloth */}
      <path d="M42 55 Q38 75 42 95" stroke="#F5F0E8" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Izâr (lower cloth / pagne) */}
      <path d="M42 108 L42 175 Q45 178 60 180 Q75 178 78 175 L78 108 Q70 112 60 110 Q50 112 42 108 Z" fill="#F5F0E8" stroke="#E0D8C8" strokeWidth="0.5" />
      {/* Wrap fold line */}
      <path d="M55 110 L50 175" stroke="#E0D8C8" strokeWidth="0.5" />
      {/* Feet */}
      <ellipse cx="50" cy="185" rx="8" ry="4" fill="#D4A574" />
      <ellipse cx="70" cy="185" rx="8" ry="4" fill="#D4A574" />
      {/* Sandals */}
      <path d="M42 186 Q50 190 58 186" stroke="#8B6914" strokeWidth="1.5" fill="none" />
      <path d="M62 186 Q70 190 78 186" stroke="#8B6914" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function IhramWomanSvg() {
  return (
    <svg viewBox="0 0 120 200" className="ihram-svg" aria-label="Femme en Ihram">
      {/* Head */}
      <circle cx="60" cy="30" r="16" fill="#D4A574" />
      {/* Eyes */}
      <circle cx="54" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="66" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Khimâr (head covering) */}
      <path d="M35 20 Q38 10 60 8 Q82 10 85 20 L88 45 Q85 55 78 65 L60 75 L42 65 Q35 55 32 45 Z" fill="#8B8B8B" stroke="#7A7A7A" strokeWidth="0.5" />
      {/* Face opening */}
      <ellipse cx="60" cy="30" rx="14" ry="16" fill="#D4A574" />
      <circle cx="54" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="66" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Body - loose modest clothing */}
      <path d="M38 65 L34 170 Q40 178 60 180 Q80 178 86 170 L82 65 Q72 72 60 75 Q48 72 38 65 Z" fill="#D4C5A0" stroke="#C4B590" strokeWidth="0.5" />
      {/* Sleeves */}
      <path d="M38 68 L28 90 Q26 95 30 98 L40 85" fill="#D4C5A0" stroke="#C4B590" strokeWidth="0.5" />
      <path d="M82 68 L92 90 Q94 95 90 98 L80 85" fill="#D4C5A0" stroke="#C4B590" strokeWidth="0.5" />
      {/* Hands */}
      <circle cx="30" cy="100" r="4" fill="#D4A574" />
      <circle cx="90" cy="100" r="4" fill="#D4A574" />
      {/* Feet */}
      <ellipse cx="50" cy="183" rx="7" ry="3.5" fill="#D4A574" />
      <ellipse cx="70" cy="183" rx="7" ry="3.5" fill="#D4A574" />
      {/* Sandals */}
      <path d="M43 184 Q50 188 57 184" stroke="#8B6914" strokeWidth="1.5" fill="none" />
      <path d="M63 184 Q70 188 77 184" stroke="#8B6914" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function BeforeManSvg() {
  return (
    <svg viewBox="0 0 120 200" className="ihram-svg" aria-label="Homme avant Ihram">
      {/* Head */}
      <circle cx="60" cy="30" r="18" fill="#D4A574" />
      <ellipse cx="60" cy="24" rx="16" ry="12" fill="#2C1810" />
      <path d="M48 35 Q52 42 60 44 Q68 42 72 35" fill="#2C1810" />
      <circle cx="53" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="67" cy="30" r="1.5" fill="#1a1a1a" />
      {/* T-shirt */}
      <path d="M38 50 L82 50 L85 55 L78 55 L78 110 L42 110 L42 55 L35 55 Z" fill="#607D8B" stroke="#546E7A" strokeWidth="0.5" />
      {/* Sleeves */}
      <path d="M38 50 L28 65 L35 70 L42 58" fill="#607D8B" stroke="#546E7A" strokeWidth="0.5" />
      <path d="M82 50 L92 65 L85 70 L78 58" fill="#607D8B" stroke="#546E7A" strokeWidth="0.5" />
      {/* Pants */}
      <path d="M42 110 L40 175 L55 175 L58 120 L62 120 L65 175 L80 175 L78 110 Z" fill="#37474F" stroke="#263238" strokeWidth="0.5" />
      {/* Shoes */}
      <ellipse cx="48" cy="180" rx="10" ry="5" fill="#3E2723" />
      <ellipse cx="72" cy="180" rx="10" ry="5" fill="#3E2723" />
    </svg>
  );
}

function BeforeWomanSvg() {
  return (
    <svg viewBox="0 0 120 200" className="ihram-svg" aria-label="Femme avant Ihram">
      {/* Head */}
      <circle cx="60" cy="30" r="16" fill="#D4A574" />
      <circle cx="54" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="66" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Hijab */}
      <path d="M35 18 Q38 8 60 6 Q82 8 85 18 L88 48 Q85 56 78 62 L60 68 L42 62 Q35 56 32 48 Z" fill="#6D4C7D" stroke="#5D3C6D" strokeWidth="0.5" />
      <ellipse cx="60" cy="30" rx="14" ry="16" fill="#D4A574" />
      <circle cx="54" cy="30" r="1.5" fill="#1a1a1a" />
      <circle cx="66" cy="30" r="1.5" fill="#1a1a1a" />
      {/* Top */}
      <path d="M40 62 L36 115 L84 115 L80 62 Q72 68 60 68 Q48 68 40 62 Z" fill="#7B5EA7" stroke="#6D4C97" strokeWidth="0.5" />
      {/* Skirt */}
      <path d="M36 115 L32 178 Q45 182 60 182 Q75 182 88 178 L84 115 Z" fill="#37474F" stroke="#263238" strokeWidth="0.5" />
      {/* Shoes */}
      <ellipse cx="48" cy="183" rx="8" ry="4" fill="#3E2723" />
      <ellipse cx="72" cy="183" rx="8" ry="4" fill="#3E2723" />
    </svg>
  );
}

function IhramSection() {
  const { ihram } = content.sacralisation;
  const [ref, inView] = useInView();
  const [showAfter, setShowAfter] = useState(false);

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
            <path d={showAfter ? "M17 8l-5 5-5-5" : "M7 16l5-5 5 5"} />
          </svg>
        </button>

        <div className="ihram-visual">
          <div className={`ihram-figure ${showAfter ? 'hidden' : ''}`}>
            <BeforeManSvg />
            <span className="ihram-label">Homme — avant</span>
          </div>
          <div className={`ihram-figure ${showAfter ? 'hidden' : ''}`}>
            <BeforeWomanSvg />
            <span className="ihram-label">Femme — avant</span>
          </div>
          <div className={`ihram-figure ${showAfter ? '' : 'hidden'}`}>
            <IhramManSvg />
            <span className="ihram-label">Homme — en Ihram</span>
          </div>
          <div className={`ihram-figure ${showAfter ? '' : 'hidden'}`}>
            <IhramWomanSvg />
            <span className="ihram-label">Femme — en Ihram</span>
          </div>
        </div>

        <div className="ihram-descriptions card">
          <p className="sacra-text"><strong>Homme :</strong> {ihram.descriptionHomme}</p>
          <p className="sacra-text"><strong>Femme :</strong> {ihram.descriptionFemme}</p>
        </div>
      </div>

      <div className="ihram-video-section">
        <h4 className="sacra-subtitle-sm">Comment mettre la tenue d'Ihram</h4>
        <p className="sacra-text">Regarde cette vidéo pour apprendre étape par étape comment revêtir l'Ihram correctement :</p>
        <div className="ihram-video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/RN_fv9uc8us?si=EFB8cByp4031-5Ym"
            title="Comment mettre la tenue d'Ihram"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="ihram-interdits">
        <div className="interdits-category">
          <h4 className="interdits-title">{ihram.interditsCommuns.title}</h4>
          <div className="interdits-grid">
            {ihram.interditsCommuns.items.map((item, i) => (
              <div key={i} className="interdit-item" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="interdit-icon">🚫</span>
                <span className="interdit-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="interdits-category">
          <h4 className="interdits-title interdits-title--homme">{ihram.interditsHomme.title}</h4>
          <div className="interdits-grid">
            {ihram.interditsHomme.items.map((item, i) => (
              <div key={i} className="interdit-item interdit-item--homme" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="interdit-icon">🚫</span>
                <span className="interdit-text">{item.text}</span>
              </div>
            ))}
          </div>
          <p className="sacra-text sacra-text--small autorise-note">{ihram.interditsHomme.autorise}</p>
        </div>

        <div className="interdits-category">
          <h4 className="interdits-title interdits-title--femme">{ihram.interditsFemme.title}</h4>
          <div className="interdits-grid">
            {ihram.interditsFemme.items.map((item, i) => (
              <div key={i} className="interdit-item interdit-item--femme" style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="interdit-icon">🚫</span>
                <span className="interdit-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="oubli-note card">
          <span>💡</span>
          <p>{ihram.oubli}</p>
        </div>
      </div>
    </div>
  );
}

function TalbiyahSection() {
  const { talbiyah } = content.sacralisation;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`talbiyah-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{talbiyah.title}</h3>
      <p className="sacra-text">{talbiyah.intro}</p>

      <DuaCard
        arabic={talbiyah.arabic}
        phonetic={talbiyah.phonetic}
        translation={talbiyah.translation}
        className="dua-card--talbiyah"
      />
      <p className="sacra-text sacra-text--small">{talbiyah.instruction}</p>
    </div>
  );
}

function TableauSection() {
  const { tableau } = content.sacralisation;
  const [ref, inView] = useInView();

  const columns = [
    { data: tableau.piliers, color: '#D44', bg: 'rgba(221,68,68,0.08)' },
    { data: tableau.obligations, color: '#FF9800', bg: 'rgba(255,152,0,0.08)' },
    { data: tableau.sunan, color: '#4CAF50', bg: 'rgba(76,175,80,0.08)' },
  ];

  return (
    <div ref={ref} className={`tableau-section ${inView ? 'visible' : ''}`}>
      <h3 className="sacra-subtitle">{tableau.title}</h3>

      <div className="tableau-grid">
        {columns.map((col, i) => (
          <div key={i} className="tableau-column card" style={{ borderTop: `4px solid ${col.color}` }}>
            <h4 className="tableau-col-title" style={{ color: col.color }}>{col.data.title}</h4>
            <p className="tableau-consequence" style={{ background: col.bg }}>{col.data.consequence}</p>
            <ol className="tableau-items">
              {col.data.items.map((item, j) => (
                <li key={j} className="tableau-item">{item}</li>
              ))}
            </ol>
          </div>
        ))}
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
          <PreparationSection />
          <EntreeSection />
          <IhramSection />
          <TalbiyahSection />
          <TableauSection />
        </div>
      </div>
    </section>
  );
}
