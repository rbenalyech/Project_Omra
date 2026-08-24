import { useState, useEffect } from 'react';
import content from '../content/fr.json';
import './Nav.css';

export default function Nav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = content.nav.sections.map(s => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          const sorted = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(sorted[0].target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="nav" aria-label="Navigation principale">
      <button
        className="nav-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Menu de navigation"
      >
        <span className="nav-toggle-icon">{isOpen ? '✕' : '☰'}</span>
      </button>

      <ul className={`nav-list ${isOpen ? 'nav-list--open' : ''}`}>
        {content.nav.sections.map(section => (
          <li key={section.id}>
            <button
              className={`nav-item ${activeSection === section.id ? 'nav-item--active' : ''}`}
              onClick={() => scrollTo(section.id)}
              title={section.label}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-dots">
        {content.nav.sections.map(section => (
          <button
            key={section.id}
            className={`nav-dot ${activeSection === section.id ? 'nav-dot--active' : ''}`}
            onClick={() => scrollTo(section.id)}
            title={section.label}
            aria-label={section.label}
          />
        ))}
      </div>
    </nav>
  );
}
