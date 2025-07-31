import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { playSound } from '@/lib/sounds';
import { motion } from 'framer-motion';

// Simplified Quran surahs for children - 10 short surahs
const childrenSurahs = [
  {
    id: 1,
    number: 1,
    nameArabic: "الفاتحة",
    nameTransliteration: "Al-Fatiha",
    nameTranslations: {
      en: "The Opening",
      bs: "Otvaranje",
      sq: "Hapja",
      de: "Die Eröffnung",
      it: "L'Apertura"
    },
    verses: 7,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    icon: "auto_stories"
  },
  {
    id: 2,
    number: 112,
    nameArabic: "الإخلاص",
    nameTransliteration: "Al-Ikhlas",
    nameTranslations: {
      en: "The Sincerity",
      bs: "Iskrenost",
      sq: "Sinqeriteti",
      de: "Die Aufrichtigkeit",
      it: "La Sincerità"
    },
    verses: 4,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/112.mp3",
    color: "bg-gradient-to-br from-green-500 to-green-600",
    icon: "favorite"
  },
  {
    id: 3,
    number: 113,
    nameArabic: "الفلق",
    nameTransliteration: "Al-Falaq",
    nameTranslations: {
      en: "The Dawn",
      bs: "Zora",
      sq: "Agimi",
      de: "Die Morgendämmerung",
      it: "L'Alba"
    },
    verses: 5,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/113.mp3",
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    icon: "wb_sunny"
  },
  {
    id: 4,
    number: 114,
    nameArabic: "الناس",
    nameTransliteration: "An-Nas",
    nameTranslations: {
      en: "The People",
      bs: "Ljudi",
      sq: "Njerëzit",
      de: "Die Menschen",
      it: "Gli Uomini"
    },
    verses: 6,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/114.mp3",
    color: "bg-gradient-to-br from-purple-500 to-purple-600",
    icon: "group"
  },
  {
    id: 5,
    number: 108,
    nameArabic: "الكوثر",
    nameTransliteration: "Al-Kawthar",
    nameTranslations: {
      en: "The Abundance",
      bs: "Obilnost",
      sq: "Bollëku",
      de: "Die Fülle",
      it: "L'Abbondanza"
    },
    verses: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/108.mp3",
    color: "bg-gradient-to-br from-teal-500 to-teal-600",
    icon: "water_drop"
  },
  {
    id: 6,
    number: 103,
    nameArabic: "العصر",
    nameTransliteration: "Al-Asr",
    nameTranslations: {
      en: "The Time",
      bs: "Vrijeme",
      sq: "Koha",
      de: "Die Zeit",
      it: "Il Tempo"
    },
    verses: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/103.mp3",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
    icon: "schedule"
  },
  {
    id: 7,
    number: 105,
    nameArabic: "الفيل",
    nameTransliteration: "Al-Fil",
    nameTranslations: {
      en: "The Elephant",
      bs: "Slon",
      sq: "Elefanti",
      de: "Der Elefant",
      it: "L'Elefante"
    },
    verses: 5,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/105.mp3",
    color: "bg-gradient-to-br from-gray-500 to-gray-600",
    icon: "pets"
  },
  {
    id: 8,
    number: 106,
    nameArabic: "قريش",
    nameTransliteration: "Quraysh",
    nameTranslations: {
      en: "The Quraysh",
      bs: "Kurejš",
      sq: "Kurejshi",
      de: "Die Quraisch",
      it: "I Coreisciti"
    },
    verses: 4,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/106.mp3",
    color: "bg-gradient-to-br from-rose-500 to-rose-600",
    icon: "family_restroom"
  },
  {
    id: 9,
    number: 109,
    nameArabic: "الكافرون",
    nameTransliteration: "Al-Kafirun",
    nameTranslations: {
      en: "The Disbelievers",
      bs: "Nevjernici",
      sq: "Jobesimtarët",
      de: "Die Ungläubigen",
      it: "I Miscredenti"
    },
    verses: 6,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/109.mp3",
    color: "bg-gradient-to-br from-red-500 to-red-600",
    icon: "block"
  },
  {
    id: 10,
    number: 110,
    nameArabic: "النصر",
    nameTransliteration: "An-Nasr",
    nameTranslations: {
      en: "The Victory",
      bs: "Pomoć",
      sq: "Ndihma",
      de: "Die Hilfe",
      it: "L'Aiuto"
    },
    verses: 3,
    audioUrl: "https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/110.mp3",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    icon: "military_tech"
  }
];

export default function Quran() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySurah = (surah: typeof childrenSurahs[0]) => {
    playSound('click');
    
    // If the same surah is playing, pause it
    if (currentlyPlaying === surah.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Play new surah
    setCurrentlyPlaying(surah.id);
    setIsPlaying(true);
    
    // Create new audio element with fallback URLs
    const audio = new Audio();
    audioRef.current = audio;
    
    // List of fallback audio URLs
    const audioUrls = [
      surah.audioUrl,
      `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${surah.number.toString().padStart(3, '0')}.mp3`,
      `https://audio.qurancdn.com/quran/audio/128/ar.alafasy/${surah.number}/${surah.number}.mp3`
    ];
    
    let currentUrlIndex = 0;
    
    const tryPlayAudio = () => {
      if (currentUrlIndex >= audioUrls.length) {
        console.error(`All audio sources failed for ${surah.nameTransliteration}`);
        setIsPlaying(false);
        setCurrentlyPlaying(null);
        return;
      }
      
      audio.src = audioUrls[currentUrlIndex];
      console.log(`Trying to play ${surah.nameTransliteration} from: ${audio.src}`);
      
      audio.onended = () => {
        setIsPlaying(false);
        setCurrentlyPlaying(null);
      };
      
      audio.onerror = () => {
        console.warn(`Failed to load audio for ${surah.nameTransliteration} from ${audio.src}, trying next source...`);
        currentUrlIndex++;
        tryPlayAudio();
      };
      
      audio.play().catch(error => {
        console.warn(`Failed to play audio for ${surah.nameTransliteration} from ${audio.src}:`, error);
        currentUrlIndex++;
        tryPlayAudio();
      });
    };
    
    tryPlayAudio();
  };

  const getSurahName = (surah: typeof childrenSurahs[0]) => {
    const translation = surah.nameTranslations[currentLanguage as keyof typeof surah.nameTranslations];
    return translation || surah.nameTranslations.en;
  };

  useEffect(() => {
    // Cleanup audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Icon name="auto_stories" className="text-4xl text-primary mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">
              {t('quran', 'title') || 'Quran for Children'}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            {t('quran', 'subtitle') || 'Listen to beautiful short surahs'}
          </p>
        </motion.div>

        {/* Surahs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {childrenSurahs.map((surah, index) => (
            <motion.div
              key={surah.id}
              className={`${surah.color} rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
              onClick={() => handlePlaySurah(surah)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center">
                {/* Arabic Name */}
                <h2 className="text-white text-2xl font-bold mb-2 arabic-text">
                  {surah.nameArabic}
                </h2>

                {/* Transliteration */}
                <h3 className="text-white/90 text-lg font-semibold mb-1">
                  {surah.nameTransliteration}
                </h3>

                {/* Translation */}
                <p className="text-white/80 text-sm mb-4">
                  {getSurahName(surah)}
                </p>

                {/* Verses Count */}
                <div className="flex items-center justify-center text-white/80 text-sm mb-4">
                  <span>{surah.verses} {t('quran', 'verses') || 'verses'}</span>
                </div>


                {/* Play Button */}
                <Button
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlaySurah(surah);
                  }}
                >
                  {currentlyPlaying === surah.id && isPlaying 
                    ? (t('quran', 'pause') || 'Pause') 
                    : (t('quran', 'listen') || 'Listen')}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
            <Icon name="info" className="text-2xl text-primary mb-2" />
            <p className="text-gray-700">
              {t('quran', 'instruction') || 'Click on any surah to listen to its beautiful recitation'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation Space */}
      <div className="h-20"></div>
    </div>
  );
}