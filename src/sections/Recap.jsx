import { useContext } from 'react';
import { useInView } from '../hooks/useInView';
import { LanguageContext } from '../context/LanguageContext';
import './Recap.css';

const STEP_EMOJIS = ['🕊️', '🕋', '🤲', '💧', '🚶', '✂️'];

export default function Recap() {
  const { content } = useContext(LanguageContext);
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section id="recap" className="recap section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Récap</span>
          <h2 className="section-title">{content.recap.sectionTitle}</h2>
          <p className="section-subtitle">{content.recap.sectionSubtitle}</p>
        </div>

        <div ref={ref} className={`recap-card card ${inView ? 'visible' : ''}`}>
          <div className="recap-steps">
            {content.recap.steps.map((step, i) => (
              <div
                key={i}
                className="recap-step"
                style={{ transitionDelay: `${i * 0.12}s` }}
              >
                <div className="recap-step-number">
                  <span className="recap-step-emoji">{STEP_EMOJIS[i]}</span>
                  <span className="recap-step-num">{i + 1}</span>
                </div>
                <span className="recap-step-label">{step}</span>
                {i < content.recap.steps.length - 1 && (
                  <div className="recap-step-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="recap-footer">
          <p className="recap-dua">
            Qu'Allah accepte ta Omra et te facilite chaque étape du voyage.
          </p>
          <button
            className="btn btn--outline"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Revenir en haut
          </button>
        </div>

        <footer className="site-footer">
          <p className="footer-source">
            Contenu extrait du livre <em>« Le guide du Hajj et de la Omra »</em> — Éditions BDouin.
          </p>
          <p className="footer-disclaimer">
            Ce site est un outil pédagogique. En cas de doute, consulte un savant.
          </p>
        </footer>
      </div>
    </section>
  );
}
