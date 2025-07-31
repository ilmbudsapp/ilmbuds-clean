import React, { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { GlobeIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export function GlobeLanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
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
      en: 'English',
      sq: 'Shqip',
      bs: 'Bosanski',
      de: 'Deutsch',
      it: 'Italiano'
    };
    return names[lang as keyof typeof names];
  };
  
  // Dobijanje zastave za svaki jezik
  const getLanguageFlag = (lang: string) => {
    const flags = {
      en: '🇬🇧',
      sq: '🇦🇱',
      bs: '🇧🇦',
      de: '🇩🇪',
      it: '🇮🇹'
    };
    return flags[lang as keyof typeof flags] || '🌐';
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button 
          className="bg-white/80 text-primary rounded-full p-2 shadow-sm hover:bg-white transition-all"
          aria-label="Change language"
        >
          <GlobeIcon className="h-6 w-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 overflow-hidden">
        {(['en', 'sq', 'bs', 'de', 'it'] as const).map(lang => (
          <DropdownMenuItem
            key={lang}
            className={`flex items-center gap-2 ${currentLanguage === lang ? 'bg-muted' : ''}`}
            onClick={() => {
              changeLanguage(lang);
              setIsOpen(false);
            }}
          >
            <span>{getLanguageFlag(lang)}</span>
            <span className={`${currentLanguage === lang ? getLanguageColor(lang) + ' font-bold' : ''}`}>
              {getLanguageName(lang)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}