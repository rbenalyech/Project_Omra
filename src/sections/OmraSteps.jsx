import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './OmraSteps.css';

gsap.registerPlugin(ScrollTrigger);

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
                x={isForward ? 150 : 150}
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

const STEP_ILLUSTRATIONS = {
  tawaf: TawafAnimation,
  sai: SaiAnimation,
};

function OmraStep({ step, index }) {
  const stepRef = useRef(null);
  const [ref, inView] = useInView({ threshold: 0.2 });
  const Illustration = STEP_ILLUSTRATIONS[step.icon];

  return (
    <div
      ref={ref}
      className={`omra-step ${inView ? 'visible' : ''} ${index % 2 === 1 ? 'omra-step--alt' : ''}`}
    >
      <div className="omra-step-number-line">
        <div className="omra-step-number">{step.number}</div>
        {index < content.omra.steps.length - 1 && <div className="omra-step-connector" />}
      </div>

      <div className="omra-step-content" ref={stepRef}>
        <div className="omra-step-header">
          <h3 className="omra-step-title">{step.title}</h3>
          <span className="omra-step-subtitle">{step.subtitle}</span>
        </div>

        {Illustration && (
          <div className="omra-step-illustration">
            <Illustration />
          </div>
        )}

        <p className="omra-step-description">{step.description}</p>

        <div className="omra-step-tips">
          {step.tips.map((tip, i) => (
            <span key={i} className="omra-tip">{tip}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OmraSteps() {
  return (
    <section id="omra" className="omra-steps section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 5</span>
          <h2 className="section-title">{content.omra.sectionTitle}</h2>
          <p className="section-subtitle">{content.omra.sectionSubtitle}</p>
        </div>

        <div className="omra-timeline">
          {content.omra.steps.map((step, i) => (
            <OmraStep key={i} step={step} index={i} />
          ))}
        </div>

        <div className="omra-complete card">
          <span className="omra-complete-icon">🎉</span>
          <p className="omra-complete-text">{content.omra.completionNote}</p>
        </div>
      </div>
    </section>
  );
}
