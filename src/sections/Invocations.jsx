import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Invocations.css';

function InvocationCard({ dua, index, forceOpen }) {
  const [copied, setCopied] = useState(false);
  const [localOpen, setLocalOpen] = useState(false);
  const expanded = forceOpen || localOpen;

  const copyAll = async () => {
    const text = `${dua.arabic}\n\n${dua.phonetic}\n\n${dua.translation}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* */ }
  };

  return (
    <div
      className={`invocation-card card ${expanded ? 'invocation-card--expanded' : ''}`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <button className="invocation-header" onClick={() => setLocalOpen(!localOpen)}>
        <span className="invocation-moment">{dua.moment}</span>
        <span className={`invocation-chevron ${expanded ? 'invocation-chevron--open' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {expanded && (
        <div className="invocation-body">
          <div className="invocation-arabic arabic-text">{dua.arabic}</div>
          <div className="invocation-phonetic">
            <p>{dua.phonetic}</p>
            <button className="invocation-copy" onClick={copyAll} title="Copier tout">
              {copied ? '✓' : '📋'}
            </button>
          </div>
          <p className="invocation-translation">{dua.translation}</p>
          {dua.source && <cite className="invocation-source">{dua.source}</cite>}
        </div>
      )}
    </div>
  );
}

export default function Invocations() {
  const { invocations } = content;
  const [ref, inView] = useInView();
  const [allOpen, setAllOpen] = useState(false);

  return (
    <section id="invocations" className="invocations section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 8</span>
          <h2 className="section-title">{invocations.sectionTitle}</h2>
          <p className="section-subtitle">{invocations.sectionSubtitle}</p>
        </div>

        <div ref={ref} className={`invocations-content ${inView ? 'visible' : ''}`}>
          <div className="invocations-toolbar">
            <span className="invocations-count">{invocations.list.length} invocations</span>
            <button className="invocations-toggle" onClick={() => setAllOpen(!allOpen)}>
              {allOpen ? 'Tout fermer' : 'Tout ouvrir'}
            </button>
          </div>

          <div className="invocations-list">
            {invocations.list.map((dua, i) => (
              <InvocationCard key={i} dua={dua} index={i} forceOpen={allOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
