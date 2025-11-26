import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.en) => string;
  toggleLanguage: () => void;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('ghalaba_lang') as Language;
    if (saved && TRANSLATIONS[saved]) setLanguage(saved);
    else setLanguage('ar');
  }, []);

  useEffect(() => {
    localStorage.setItem('ghalaba_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    const langs: Language[] = ['ar', 'en', 'fr', 'tr', 'es'];
    const idx = langs.indexOf(language);
    setLanguage(langs[(idx + 1) % langs.length]);
  };

  const t = (key: keyof typeof TRANSLATIONS.en): string => {
    // Fallback to English if translation missing
    const translation = TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};