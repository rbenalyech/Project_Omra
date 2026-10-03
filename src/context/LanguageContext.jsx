import { createContext, useState, useEffect } from 'react';
import fr from '../content/fr.json';

const modules = { fr };

function loadLang(code) {
  if (modules[code]) return modules[code];
  return fr;
}

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('omra-lang') || 'fr'; } catch { return 'fr'; }
  });
  const [content, setContent] = useState(() => loadLang(language));

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (modules[language]) {
        setContent(modules[language]);
        return;
      }
      try {
        const mod = await import(`../content/${language}.json`);
        modules[language] = mod.default;
        if (!cancelled) setContent(mod.default);
      } catch {
        if (!cancelled) setContent(fr);
      }
    }
    load();

    try { localStorage.setItem('omra-lang', language); } catch {}

    const meta = (modules[language] || fr).meta;
    document.documentElement.lang = meta.lang;
    document.documentElement.dir = meta.direction;

    return () => { cancelled = true; };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ content, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
