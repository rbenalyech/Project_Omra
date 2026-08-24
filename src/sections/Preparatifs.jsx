import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from '../hooks/useInView';
import content from '../content/fr.json';
import './Preparatifs.css';

gsap.registerPlugin(ScrollTrigger);

const ITEM_ICONS = {
  ihram: '🕊️', passport: '📕', prayermat: '🧎', sandals: '🩴', backpack: '🎒',
  belt: '💰', sunglasses: '🕶️', phone: '📱', battery: '🔋', adapter: '🔌',
  medkit: '💊', cream: '🧴', bandage: '🩹', toothbrush: '🪥', flashlight: '🔦',
  snacks: '🥜', book: '📖', bag: '👜',
};

const CHECKLIST_ICONS = {
  calendar: '📅', passport: '📕', document: '📄', syringe: '💉', stamp: '📋',
};

function PatienceRules() {
  const { patience } = content.preparatifs;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`prep-patience ${inView ? 'visible' : ''}`}>
      <h3 className="prep-card-title">{patience.title}</h3>
      <p className="prep-card-text">{patience.text}</p>
      <div className="patience-rules">
        {patience.rules.map((rule, i) => (
          <div
            key={rule.word}
            className="patience-rule"
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className="patience-word">{rule.word}</span>
            <span className="patience-detail">{rule.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checklist() {
  const { checklist } = content.preparatifs;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`prep-checklist card ${inView ? 'visible' : ''}`}>
      <h3 className="prep-card-title">{checklist.title}</h3>
      <ul className="checklist-items">
        {checklist.items.map((item, i) => (
          <li key={i} className="checklist-item" style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="checklist-icon">{CHECKLIST_ICONS[item.icon] || '📋'}</span>
            <span className="checklist-text">{item.text}</span>
            <span className="checklist-check">☐</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhysiqueCards() {
  const { physique } = content.preparatifs;
  const [ref, inView] = useInView();

  const icons = { walking: '🚶', shoe: '🩴', sun: '☀️', food: '🍽️', mask: '😷' };

  return (
    <div ref={ref} className={`prep-physique ${inView ? 'visible' : ''}`}>
      <h3 className="prep-card-title">{physique.title}</h3>
      <div className="physique-grid">
        {physique.items.map((item, i) => (
          <div key={i} className="physique-card card" style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="physique-icon">{icons[item.icon] || '💡'}</span>
            <span className="physique-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuitcaseWidget() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const { valise } = content.preparatifs;

  useEffect(() => {
    const tweens = [];
    itemsRef.current.forEach((el, i) => {
      if (!el) return;
      tweens.push(gsap.fromTo(el,
        { opacity: 0, y: -40, scale: 0.8, rotation: gsap.utils.random(-15, 15) },
        {
          opacity: 1, y: 0, scale: 1, rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.04,
        }
      ));
    });

    return () => tweens.forEach(t => t.scrollTrigger?.kill());
  }, []);

  const categories = { essentiel: 'Essentiel', confort: 'Confort', santé: 'Santé' };

  return (
    <div className="suitcase-widget" ref={containerRef}>
      <div className="suitcase-header">
        <h3 className="prep-card-title">{valise.title}</h3>
        <p className="prep-card-text">{valise.subtitle}</p>
      </div>

      <div className="suitcase-body">
        <div className="suitcase-visual">
          <div className="suitcase-shell">
            <div className="suitcase-handle" />
            <div className="suitcase-interior">
              {valise.items.map((item, i) => (
                <div
                  key={i}
                  ref={el => itemsRef.current[i] = el}
                  className={`suitcase-item suitcase-item--${item.category}`}
                >
                  <span className="suitcase-item-icon">{ITEM_ICONS[item.icon] || '📦'}</span>
                  <span className="suitcase-item-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="suitcase-legend">
          {Object.entries(categories).map(([key, label]) => (
            <span key={key} className={`badge badge--${key === 'essentiel' ? 'essential' : key === 'santé' ? 'health' : 'comfort'}`}>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BudgetSection() {
  const { budget } = content.preparatifs;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`prep-budget ${inView ? 'visible' : ''}`}>
      <h3 className="prep-card-title">{budget.title}</h3>
      <p className="prep-card-text">{budget.text}</p>

      <div className="budget-highlights">
        <div className="budget-highlight card">
          <span className="budget-highlight-value">{budget.exchange}</span>
        </div>
        <div className="budget-highlight card">
          <span className="budget-highlight-value">{budget.dailyBudget}</span>
        </div>
      </div>

      <div className="budget-tip card">
        <span className="budget-tip-icon">💡</span>
        <p>{budget.tip}</p>
      </div>

      <div className="budget-prices card">
        <h4>Prix courants en Arabie Saoudite</h4>
        <div className="prices-grid">
          {budget.prices.map((p, i) => (
            <div key={i} className="price-row">
              <span className="price-item">{p.item}</span>
              <span className="price-dots" />
              <span className="price-value">{p.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApprendreSection() {
  const { apprendre } = content.preparatifs;
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={`prep-apprendre ${inView ? 'visible' : ''}`}>
      <h3 className="prep-card-title">{apprendre.title}</h3>
      <p className="prep-card-text">{apprendre.text}</p>

      <div className="reward-cards">
        <div className="reward-card">
          <span className="reward-number">100 000</span>
          <span className="reward-label">{apprendre.rewardMecca}</span>
        </div>
        <div className="reward-card">
          <span className="reward-number">1 000</span>
          <span className="reward-label">{apprendre.rewardMedina}</span>
        </div>
      </div>

      <blockquote className="golden-rule card">
        <p className="golden-rule-text">{apprendre.goldenRule}</p>
      </blockquote>

      <blockquote className="hadith-quote">
        <p className="hadith-text">{apprendre.hadith}</p>
        <cite className="hadith-source">{apprendre.hadithSource}</cite>
      </blockquote>
    </div>
  );
}

export default function Preparatifs() {
  return (
    <section id="preparatifs" className="preparatifs section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-number">Chapitre 1</span>
          <h2 className="section-title">{content.preparatifs.sectionTitle}</h2>
          <p className="section-subtitle">{content.preparatifs.sectionSubtitle}</p>
        </div>

        <div className="prep-grid">
          <div className="prep-block">
            <div className="card prep-intention">
              <h3 className="prep-card-title">{content.preparatifs.intention.title}</h3>
              <p className="prep-card-text">{content.preparatifs.intention.text}</p>
            </div>
          </div>

          <PatienceRules />
          <Checklist />
          <PhysiqueCards />
          <SuitcaseWidget />
          <BudgetSection />
          <ApprendreSection />
        </div>
      </div>
    </section>
  );
}
