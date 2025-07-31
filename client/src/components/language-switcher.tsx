import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/context/language-context';

// Jednostavnija verzija Language Switcher-a
export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  
  // Definisanje funkcija za promenu jezika
  const setLanguage = (lang: 'en' | 'sq' | 'bs' | 'de' | 'it') => {
    return () => changeLanguage(lang);
  };
  
  // Provera da li je Bosanski trenutni jezik
  const isBosnian = currentLanguage === 'bs';

  // Mapiranje jezika na imena
  const languageNames: Record<string, { native: string, translated: string }> = {
    en: { native: 'English', translated: 'English' },
    sq: { native: 'Shqip', translated: isBosnian ? 'Albanski' : 'Albanian' },
    bs: { native: 'Bosanski', translated: 'Bosanski' },
    de: { native: 'Deutsch', translated: isBosnian ? 'Njemački' : 'German' },
    it: { native: 'Italiano', translated: isBosnian ? 'Italijanski' : 'Italian' }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-lg hover:scale-105 transition-all duration-300"
        >
          <span className="font-bold uppercase">{currentLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="min-w-[200px] bg-white/95 backdrop-blur-md shadow-xl border-none rounded-xl p-2">
        {Object.entries(languageNames).map(([lang, names]) => (
          <DropdownMenuItem 
            key={lang}
            onClick={setLanguage(lang as any)} 
            className={`flex items-center my-1 rounded-lg transition-all ${
              currentLanguage === lang ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50'
            }`}
          >
            <div className="mr-2 h-6 w-9 rounded overflow-hidden shadow-sm border border-gray-200">
              <img 
                src={`/images/flags/0${lang === 'en' ? '1.ZASTAVA ENGLESKE' : 
                       lang === 'sq' ? '2.ZASTAVA ALBANIJE' : 
                       lang === 'bs' ? '3.ZASTAVA BOSNE' : 
                       lang === 'de' ? '4.ZASTAVA NEMACKE' : 
                       '5.ZASTAVA ITALIJE'}.png`} 
                alt={`${names.native} Flag`}
                className="h-full w-full object-cover"
              />
            </div>
            {names.translated}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}