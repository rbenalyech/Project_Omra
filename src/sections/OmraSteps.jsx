import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './OmraSteps.css';

gsap.registerPlugin(ScrollTrigger);

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

function TawafAnimation() {
  const pilgrimRef = useRef(null);

  useEffect(() => {
    if (!pilgrimRef.current) return;
    const tween = gsap.to(pilgrimRef.current, {
      rotation: 360,
      duration: 4,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });
    return () => tween.kill();
  }, []);

  return (
    <div className="tawaf-animation">
      <svg viewBox="0 0 200 200" className="tawaf-svg">
        <rect x="75" y="75" width="50" height="50" rx="4" fill="var(--color-primary-dark)" stroke="var(--color-accent)" strokeWidth="2" />
        <text x="100" y="105" textAnchor="middle" fill="var(--color-accent)" fontSize="10" fontWeight="bold">KAABA</text>

        <circle cx="100" cy="100" r="80" fill="none" stroke="var(--color-sand)" strokeWidth="1" strokeDasharray="4 4" />

        <g ref={pilgrimRef} className="tawaf-pilgrim">
          <circle cx="100" cy="22" r="6" fill="var(--color-primary)" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="8">🚶</text>
        </g>

        <path d="M 60 60 L 75 75" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <text x="50" y="55" fill="var(--color-text-muted)" fontSize="7" textAnchor="middle">Pierre</text>
        <text x="50" y="63" fill="var(--color-text-muted)" fontSize="7" textAnchor="middle">Noire</text>

        <text x="100" y="196" fill="var(--color-text-muted)" fontSize="8" textAnchor="middle">Sens antihoraire</text>

        <path d="M 130 190 A 35 35 0 0 0 70 190" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="var(--color-primary)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function SaiAnimation() {
  return (
    <div className="sai-animation">
      <svg viewBox="0 0 300 100" className="sai-svg">
        <rect x="10" y="20" width="40" height="60" rx="4" fill="var(--color-primary)" opacity="0.2" />
        <text x="30" y="55" textAnchor="middle" fill="var(--color-primary-dark)" fontSize="9" fontWeight="bold">Safâ</text>

        <rect x="250" y="20" width="40" height="60" rx="4" fill="var(--color-accent)" opacity="0.2" />
        <text x="270" y="55" textAnchor="middle" fill="var(--color-accent-dark)" fontSize="9" fontWeight="bold">Marwah</text>

        <rect x="120" y="22" width="6" height="56" rx="2" fill="#4CAF50" opacity="0.3" />
        <rect x="174" y="22" width="6" height="56" rx="2" fill="#4CAF50" opacity="0.3" />
        <text x="150" y="16" textAnchor="middle" fill="#4CAF50" fontSize="6">Repères verts</text>

        {[1,2,3,4,5,6,7].map(n => {
          const isForward = n % 2 === 1;
          const y = 48 + (n - 4) * 4;
          return (
            <g key={n}>
              <line
                x1={isForward ? 55 : 245}
                y1={y}
                x2={isForward ? 245 : 55}
                y2={y}
                stroke={isForward ? 'var(--color-primary)' : 'var(--color-accent)'}
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.4"
              />
              <text
                x={150}
                y={y - 4}
                textAnchor="middle"
                fill="var(--color-text-muted)"
                fontSize="6"
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ArriveeMekkah() {
  const { arriveeMekkah } = content.omra;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`arrivee-mekkah ${inView ? 'visible' : ''}`}>
      <h3 className="omra-section-title">{arriveeMekkah.title}</h3>
      <p className="omra-text">{arriveeMekkah.text}</p>

      <div className="arrivee-dua-group">
        <p className="dua-instruction">{arriveeMekkah.mosqueeEntry.instruction}</p>
        <DuaCard
          arabic={arriveeMekkah.mosqueeEntry.arabic}
          phonetic={arriveeMekkah.mosqueeEntry.phonetic}
          translation={arriveeMekkah.mosqueeEntry.translation}
        />
      </div>

      <div className="arrivee-dua-group">
        <p className="dua-instruction">{arriveeMekkah.voirKaaba.instruction}</p>
        <DuaCard
          arabic={arriveeMekkah.voirKaaba.arabic}
          phonetic={arriveeMekkah.voirKaaba.phonetic}
          translation={arriveeMekkah.voirKaaba.translation}
          className="dua-card--highlight"
        />
      </div>
    </div>
  );
}

function TawafStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`omra-step-full ${inView ? 'visible' : ''}`}>
      <div className="omra-step-number-badge">
        <span>{step.number}</span>
      </div>

      <div className="omra-step-body">
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        <div className="omra-step-illustration">
          <TawafAnimation />
        </div>

        <p className="omra-text">{step.description}</p>

        <div className="step-detail-card">
          <p className="dua-instruction">{step.pierreNoire.instruction}</p>
          <DuaCard
            arabic={step.pierreNoire.arabic}
            phonetic={step.pierreNoire.phonetic}
            translation={step.pierreNoire.translation}
          />
        </div>

        <div className="step-sunna-notes">
          <div className="sunna-note">
            <span className="sunna-label">Idhtibâ'</span>
            <p>{step.idhtiba}</p>
          </div>
          <div className="sunna-note">
            <span className="sunna-label">Raml</span>
            <p>{step.raml}</p>
          </div>
        </div>

        <div className="step-detail-card">
          <p className="dua-instruction">{step.coinYemenite.instruction}</p>
          <DuaCard
            arabic={step.coinYemenite.arabic}
            phonetic={step.coinYemenite.phonetic}
            translation={step.coinYemenite.translation}
            source={step.coinYemenite.source}
          />
        </div>

        <p className="omra-text omra-text--note">{step.pendantTours}</p>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function MaqamStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`omra-step-full ${inView ? 'visible' : ''}`}>
      <div className="omra-step-number-badge">
        <span>{step.number}</span>
      </div>

      <div className="omra-step-body">
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        <p className="omra-text">{step.description}</p>

        <DuaCard
          arabic={step.verset.arabic}
          phonetic={step.verset.phonetic}
          translation={step.verset.translation}
          source={step.verset.source}
          className="dua-card--highlight"
        />

        <p className="omra-text">{step.details}</p>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ZamzamStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`omra-step-full ${inView ? 'visible' : ''}`}>
      <div className="omra-step-number-badge">
        <span>{step.number}</span>
      </div>

      <div className="omra-step-body">
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        <p className="omra-text">{step.description}</p>

        <div className="hadith-cards">
          {step.hadiths.map((hadith, i) => (
            <blockquote key={i} className="hadith-block card">
              <p>{hadith}</p>
            </blockquote>
          ))}
        </div>

        <p className="omra-text omra-text--note">{step.suite}</p>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SaiStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <div ref={ref} className={`omra-step-full ${inView ? 'visible' : ''}`}>
      <div className="omra-step-number-badge">
        <span>{step.number}</span>
      </div>

      <div className="omra-step-body">
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        <div className="omra-step-illustration">
          <SaiAnimation />
        </div>

        <p className="omra-text">{step.description}</p>

        <div className="step-detail-card">
          <p className="dua-instruction">{step.montSafa.instruction}</p>
          <DuaCard
            arabic={step.montSafa.arabic}
            phonetic={step.montSafa.phonetic}
            translation={step.montSafa.translation}
            source={step.montSafa.source}
          />
          <p className="omra-text omra-text--note">{step.montSafa.ajout}</p>
        </div>

        <div className="step-detail-card">
          <p className="dua-instruction">{step.surSafa.instruction}</p>
          <DuaCard
            arabic={step.surSafa.arabic}
            phonetic={step.surSafa.phonetic}
            translation={step.surSafa.translation}
            className="dua-card--highlight"
          />
          <p className="omra-text omra-text--note">{step.surSafa.note}</p>
        </div>

        <div className="green-marker-note card">
          <span className="green-marker-icon">🟢</span>
          <p>{step.versMarwah}</p>
        </div>

        <div className="step-detail-card">
          <DuaCard
            arabic={step.pendantTrajet.arabic}
            phonetic={step.pendantTrajet.phonetic}
            translation={step.pendantTrajet.translation}
          />
        </div>

        <div className="comptage-card card">
          <p>{step.comptage}</p>
        </div>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RasageStep({ step }) {
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className={`omra-step-full ${inView ? 'visible' : ''}`}>
      <div className="omra-step-number-badge">
        <span>{step.number}</span>
      </div>

      <div className="omra-step-body">
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        <p className="omra-text">{step.description}</p>

        <div className="rasage-details">
          <div className="rasage-genre card">
            <h4 className="rasage-genre-title rasage-genre-title--homme">Homme</h4>
            <p>{step.homme}</p>
          </div>
          <div className="rasage-genre card">
            <h4 className="rasage-genre-title rasage-genre-title--femme">Femme</h4>
            <p>{step.femme}</p>
          </div>
        </div>

        <div className="fin-note card">
          <span>✅</span>
          <p>{step.fin}</p>
        </div>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const STEP_RENDERERS = [TawafStep, MaqamStep, ZamzamStep, SaiStep, RasageStep];

export default function OmraSteps() {
  return (
    <section id="omra" className="omra-steps section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 5</span>
          <h2 className="section-title">{content.omra.sectionTitle}</h2>
          <p className="section-subtitle">{content.omra.sectionSubtitle}</p>
        </div>

        <ArriveeMekkah />

        <div className="omra-timeline">
          {content.omra.steps.map((step, i) => {
            const Renderer = STEP_RENDERERS[i];
            return <Renderer key={i} step={step} />;
          })}
        </div>

        <div className="omra-complete card">
          <span className="omra-complete-icon">🎉</span>
          <p className="omra-complete-text">{content.omra.completionNote}</p>
        </div>
      </div>
    </section>
  );
}
