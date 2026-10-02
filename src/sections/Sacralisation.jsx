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
          <p className="sacra-text"><strong>Homme :</strong> {ihram.descriptionHomme}</p>
          <p className="sacra-text"><strong>Femme :</strong> {ihram.descriptionFemme}</p>
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
