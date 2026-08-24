import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Aeroport.css';

const STEP_ICONS = {
  checkin: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 10l2 2 4-4"/>
    </svg>
  ),
  security: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  gate: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 3v4M8 3v4M2 11h20"/>
    </svg>
  ),
  takeoff: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
    </svg>
  ),
};

export default function Aeroport() {
  const { aeroport } = content;
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="aeroport" className="aeroport section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 2</span>
          <h2 className="section-title">{aeroport.sectionTitle}</h2>
          <p className="section-subtitle">{aeroport.sectionSubtitle}</p>
        </div>

        <div ref={ref} className={`aeroport-timeline ${inView ? 'visible' : ''}`}>
          <div className="aeroport-timeline-line" />
          {aeroport.steps.map((step, i) => (
            <div
              key={i}
              className="aeroport-step"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="aeroport-step-icon">
                {STEP_ICONS[step.icon]}
              </div>
              <div className="aeroport-step-content">
                <h4 className="aeroport-step-title">{step.title}</h4>
                <p className="aeroport-step-text">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="aeroport-note card">
          <span className="aeroport-note-icon">⏰</span>
          <p>{aeroport.importantNote}</p>
        </div>
      </div>
    </section>
  );
}
