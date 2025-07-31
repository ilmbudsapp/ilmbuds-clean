import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@shared/translations';

interface LanguageContextProps {
  currentLanguage: Language;
  language: Language;  // Alias for currentLanguage for more intuitive usage
  changeLanguage: (language: Language) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initialize with browser language or saved preference
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  // Check for Bosnian language preference on initialization
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('useBosanski') === 'true') {
      window.isBosanski = true;
    }
  }, []);

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
    // Set html lang attribute for accessibility
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      language: currentLanguage, // Add language as alias to currentLanguage
      changeLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}