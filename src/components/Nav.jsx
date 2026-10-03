import { useState, useEffect, useContext, useRef } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import './Nav.css';

const LANGUAGES = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'ar', label: 'عربي', flag: '🇸🇦' },
  { code: 'nl', label: 'NL', flag: '🇧🇪' },
];

export default function Nav() {
  const { content, language, setLanguage } = useContext(LanguageContext);
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

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
      { threshold: [0.1, 0.3, 0.5] }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <>
      {/* Floating language icon */}
      <div className="lang-float" ref={langRef}>
        <button
          className="lang-float-btn"
          onClick={() => setLangOpen(!langOpen)}
          aria-label="Language"
        >
          <span className="lang-float-flag">{currentLang.flag}</span>
        </button>

        <div className={`lang-float-dropdown ${langOpen ? 'lang-float-dropdown--open' : ''}`}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              className={`lang-float-option ${language === lang.code ? 'lang-float-option--active' : ''}`}
              onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
            >
              <span className="lang-float-option-flag">{lang.flag}</span>
              <span className="lang-float-option-label">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      <nav className="nav" aria-label="Navigation">
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Menu"
        >
          <span className={`nav-hamburger ${isOpen ? 'nav-hamburger--open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <div className={`nav-overlay ${isOpen ? 'nav-overlay--visible' : ''}`} onClick={() => setIsOpen(false)} />

        <div className={`nav-panel ${isOpen ? 'nav-panel--open' : ''}`}>
          <ul className="nav-list">
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
        </div>

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
    </>
  );
}
