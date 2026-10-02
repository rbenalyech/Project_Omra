import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Medine.css';

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

function RemarquesSection() {
  const { remarques } = content.medine;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-remarques ${inView ? 'visible' : ''}`}>
      <h3 className="medine-subtitle">{remarques.title}</h3>

      <ul className="remarques-list">
        {remarques.points.map((point, i) => (
          <li key={i} className="remarques-item">
            <span className="remarques-bullet">•</span>
            <p>{point}</p>
          </li>
        ))}
      </ul>

      <blockquote className="medine-hadith card">
        <p>{remarques.hadithTroisMosquees.text}</p>
        <cite>{remarques.hadithTroisMosquees.source}</cite>
      </blockquote>

      <blockquote className="medine-hadith medine-hadith--highlight card">
        <p>{remarques.hadithRecompense.text}</p>
        <cite>{remarques.hadithRecompense.source}</cite>
      </blockquote>
    </div>
  );
}

function EntreeMosquee({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>
        {step.duas.map((dua, i) => (
          <DuaCard
            key={i}
            arabic={dua.arabic}
            phonetic={dua.phonetic}
            translation={dua.translation}
          />
        ))}
      </div>
    </div>
  );
}

function DansMosquee({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>
        <p className="medine-text medine-text--detail">{step.details}</p>
      </div>
    </div>
  );
}

function RawdhahStep({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>

        <div className="rawdhah-hadith">
          <span className="rawdhah-icon">🌿</span>
          <p>{step.hadith}</p>
        </div>

        <div className="medine-conseil">
          <span>💡</span>
          <p>{step.conseil}</p>
        </div>
      </div>
    </div>
  );
}

function SalutationsStep({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>

        <div className="salutations-list">
          {step.salutations.map((sal, i) => (
            <div key={i} className="salutation-group">
              <h5 className="salutation-qui">{sal.qui}</h5>
              {sal.instruction && <p className="medine-text medine-text--small">{sal.instruction}</p>}
              <DuaCard
                arabic={sal.arabic}
                phonetic={sal.phonetic}
                translation={sal.translation}
              />
            </div>
          ))}
        </div>

        <div className="medine-attention">
          <h5 className="attention-title">Attention</h5>
          <ul className="attention-list">
            {step.attention.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="medine-remarque-femme">
          <span>👩</span>
          <p>{step.remarqueFemme}</p>
        </div>
      </div>
    </div>
  );
}

function CimetiereStep({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>

        <div className="enterres-list card">
          <h5 className="enterres-title">Personnalités enterrées à Al-Baqî'</h5>
          <ul>
            {step.enterres.map((name, i) => (
              <li key={i} className="enterres-item">{name}</li>
            ))}
          </ul>
        </div>

        <DuaCard
          arabic={step.dua.arabic}
          phonetic={step.dua.phonetic}
          translation={step.dua.translation}
          source={step.dua.source}
          className="dua-card--highlight"
        />
      </div>
    </div>
  );
}

function SimpleStep({ step }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`medine-step ${inView ? 'visible' : ''}`}>
      <div className="medine-step-badge">
        <span>{step.number}</span>
      </div>
      <div className="medine-step-body card">
        <h4 className="medine-step-title">{step.title}</h4>
        <p className="medine-text">{step.text}</p>
        {step.details && <p className="medine-text medine-text--detail">{step.details}</p>}
        {step.hadith && (
          <blockquote className="medine-hadith card">
            <p>{step.hadith.text}</p>
            <cite>{step.hadith.source}</cite>
          </blockquote>
        )}
        {step.conseil && <p className="medine-text medine-text--small">{step.conseil}</p>}
      </div>
    </div>
  );
}

const STEP_RENDERERS = [EntreeMosquee, DansMosquee, RawdhahStep, SalutationsStep, CimetiereStep, SimpleStep, SimpleStep];

export default function Medine() {
  const { medine } = content;

  return (
    <section id="medine" className="medine section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 7</span>
          <h2 className="section-title">{medine.sectionTitle}</h2>
          <p className="section-subtitle">{medine.sectionSubtitle}</p>
        </div>

        <RemarquesSection />

        <div className="medine-timeline">
          {medine.steps.map((step, i) => {
            const Renderer = STEP_RENDERERS[i];
            return <Renderer key={i} step={step} />;
          })}
        </div>
      </div>
    </section>
  );
}
