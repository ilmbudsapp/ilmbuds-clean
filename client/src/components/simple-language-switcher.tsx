import React from 'react';
import { useLanguage } from '@/context/language-context';

export function SimpleLanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  
  // Dobijanje boje za svaki jezik
  const getLanguageColor = (lang: string) => {
    const colors = {
      en: 'text-blue-700',
      sq: 'text-red-600',
      bs: 'text-blue-800',
      de: 'text-yellow-600',
      it: 'text-green-600'
    };
    return colors[lang as keyof typeof colors] || 'text-gray-500';
  };

  // Dobijanje naziva jezika za prikaz
  const getLanguageName = (lang: string) => {
    const names = {
      en: 'EN',
      sq: 'AL',
      bs: 'BS',
      de: 'DE',
      it: 'IT'
    };
    return names[lang as keyof typeof names];
  };

  return (
    <div className="flex items-center bg-white/80 rounded-full shadow-sm px-1 py-0.5 space-x-0.5">
      {(['en', 'sq', 'bs', 'de', 'it'] as const).map(lang => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`
            px-1.5 py-0.5 rounded-full text-xs font-bold 
            transition-all duration-200 ease-in-out
            ${currentLanguage === lang 
              ? `${getLanguageColor(lang)} bg-gray-100` 
              : 'text-gray-400 hover:bg-gray-50'}
          `}
        >
          {getLanguageName(lang)}
        </button>
      ))}
    </div>
  );
}