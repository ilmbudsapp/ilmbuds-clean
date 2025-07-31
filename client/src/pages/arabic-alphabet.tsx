import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import { playSound } from "@/lib/sounds";
import InterstitialAd from "@/components/ads/InterstitialAd";

// Arabic alphabet data with pronunciations
const arabicAlphabet = [
  {
    id: 1,
    arabic: "أ",
    name: "Alif",
    pronunciation: "A",
    example: {
      en: "Apple",
      bs: "Alif",
      sq: "Alif",
      de: "Alif",
      it: "Alif"
    },
    color: "bg-gradient-to-br from-red-500 to-red-600"
  },
  {
    id: 2,
    arabic: "ب",
    name: "Ba",
    pronunciation: "B",
    example: {
      en: "Book",
      bs: "Knjiga",
      sq: "Libër",
      de: "Buch",
      it: "Libro"
    },
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    id: 3,
    arabic: "ت",
    name: "Ta",
    pronunciation: "T",
    example: {
      en: "Tree",
      bs: "Drvo",
      sq: "Pemë",
      de: "Baum",
      it: "Albero"
    },
    color: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    id: 4,
    arabic: "ث",
    name: "Tha",
    pronunciation: "TH",
    example: {
      en: "Think",
      bs: "Misliti",
      sq: "Mendoj",
      de: "Denken",
      it: "Pensare"
    },
    color: "bg-gradient-to-br from-yellow-500 to-orange-500"
  },
  {
    id: 5,
    arabic: "ج",
    name: "Jim",
    pronunciation: "J",
    example: {
      en: "Jump",
      bs: "Skakati",
      sq: "Kërcej",
      de: "Springen",
      it: "Saltare"
    },
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    id: 6,
    arabic: "ح",
    name: "Ha",
    pronunciation: "H",
    example: {
      en: "House",
      bs: "Kuća",
      sq: "Shtëpi",
      de: "Haus",
      it: "Casa"
    },
    color: "bg-gradient-to-br from-pink-500 to-pink-600"
  },
  {
    id: 7,
    arabic: "خ",
    name: "Kha",
    pronunciation: "KH",
    example: {
      en: "Loch",
      bs: "Hladno",
      sq: "Ftohtë",
      de: "Kalt",
      it: "Freddo"
    },
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600"
  },
  {
    id: 8,
    arabic: "د",
    name: "Dal",
    pronunciation: "D",
    example: {
      en: "Door",
      bs: "Vrata",
      sq: "Derë",
      de: "Tür",
      it: "Porta"
    },
    color: "bg-gradient-to-br from-teal-500 to-teal-600"
  },
  {
    id: 9,
    arabic: "ذ",
    name: "Dhal",
    pronunciation: "DH",
    example: {
      en: "This",
      bs: "Ovo",
      sq: "Kjo",
      de: "Dies",
      it: "Questo"
    },
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600"
  },
  {
    id: 10,
    arabic: "ر",
    name: "Ra",
    pronunciation: "R",
    example: {
      en: "Run",
      bs: "Trčati",
      sq: "Vrapoj",
      de: "Laufen",
      it: "Correre"
    },
    color: "bg-gradient-to-br from-rose-500 to-rose-600"
  },
  {
    id: 11,
    arabic: "ز",
    name: "Zay",
    pronunciation: "Z",
    example: {
      en: "Zoo",
      bs: "Zoološki vrt",
      sq: "Zoo",
      de: "Zoo",
      it: "Zoo"
    },
    color: "bg-gradient-to-br from-amber-500 to-amber-600"
  },
  {
    id: 12,
    arabic: "س",
    name: "Sin",
    pronunciation: "S",
    example: {
      en: "Sun",
      bs: "Sunce",
      sq: "Diell",
      de: "Sonne",
      it: "Sole"
    },
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  },
  {
    id: 13,
    arabic: "ش",
    name: "Shin",
    pronunciation: "SH",
    example: {
      en: "Ship",
      bs: "Brod",
      sq: "Anije",
      de: "Schiff",
      it: "Nave"
    },
    color: "bg-gradient-to-br from-lime-500 to-lime-600"
  },
  {
    id: 14,
    arabic: "ص",
    name: "Sad",
    pronunciation: "S",
    example: {
      en: "Sand",
      bs: "Pijesak",
      sq: "Rërë",
      de: "Sand",
      it: "Sabbia"
    },
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
  },
  {
    id: 15,
    arabic: "ض",
    name: "Dad",
    pronunciation: "D",
    example: {
      en: "Dad",
      bs: "Otac",
      sq: "Baba",
      de: "Vater",
      it: "Papà"
    },
    color: "bg-gradient-to-br from-violet-500 to-violet-600"
  },
  {
    id: 16,
    arabic: "ط",
    name: "Ta",
    pronunciation: "T",
    example: {
      en: "Top",
      bs: "Vrh",
      sq: "Lart",
      de: "Oben",
      it: "Sopra"
    },
    color: "bg-gradient-to-br from-sky-500 to-sky-600"
  },
  {
    id: 17,
    arabic: "ظ",
    name: "Zha",
    pronunciation: "ZH",
    example: {
      en: "Measure",
      bs: "Mjeriti",
      sq: "Matë",
      de: "Messen",
      it: "Misurare"
    },
    color: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600"
  },
  {
    id: 18,
    arabic: "ع",
    name: "Ain",
    pronunciation: "'",
    example: {
      en: "Eye",
      bs: "Oko",
      sq: "Sy",
      de: "Auge",
      it: "Occhio"
    },
    color: "bg-gradient-to-br from-stone-500 to-stone-600"
  },
  {
    id: 19,
    arabic: "غ",
    name: "Ghain",
    pronunciation: "GH",
    example: {
      en: "Ghaib",
      bs: "Nevidljivo",
      sq: "I padukshëm",
      de: "Unsichtbar",
      it: "Invisibile"
    },
    color: "bg-gradient-to-br from-neutral-500 to-neutral-600"
  },
  {
    id: 20,
    arabic: "ف",
    name: "Fa",
    pronunciation: "F",
    example: {
      en: "Fish",
      bs: "Riba",
      sq: "Peshk",
      de: "Fisch",
      it: "Pesce"
    },
    color: "bg-gradient-to-br from-red-400 to-red-500"
  },
  {
    id: 21,
    arabic: "ق",
    name: "Qaf",
    pronunciation: "Q",
    example: {
      en: "Quran",
      bs: "Kuran",
      sq: "Kuran",
      de: "Koran",
      it: "Corano"
    },
    color: "bg-gradient-to-br from-blue-400 to-blue-500"
  },
  {
    id: 22,
    arabic: "ك",
    name: "Kaf",
    pronunciation: "K",
    example: {
      en: "Key",
      bs: "Ključ",
      sq: "Çelës",
      de: "Schlüssel",
      it: "Chiave"
    },
    color: "bg-gradient-to-br from-green-400 to-green-500"
  },
  {
    id: 23,
    arabic: "ل",
    name: "Lam",
    pronunciation: "L",
    example: {
      en: "Love",
      bs: "Ljubav",
      sq: "Dashuri",
      de: "Liebe",
      it: "Amore"
    },
    color: "bg-gradient-to-br from-yellow-400 to-yellow-500"
  },
  {
    id: 24,
    arabic: "م",
    name: "Mim",
    pronunciation: "M",
    example: {
      en: "Moon",
      bs: "Mjesec",
      sq: "Hënë",
      de: "Mond",
      it: "Luna"
    },
    color: "bg-gradient-to-br from-purple-400 to-purple-500"
  },
  {
    id: 25,
    arabic: "ن",
    name: "Nun",
    pronunciation: "N",
    example: {
      en: "Night",
      bs: "Noć",
      sq: "Natë",
      de: "Nacht",
      it: "Notte"
    },
    color: "bg-gradient-to-br from-pink-400 to-pink-500"
  },
  {
    id: 26,
    arabic: "ه",
    name: "Ha",
    pronunciation: "H",
    example: {
      en: "Heart",
      bs: "Srce",
      sq: "Zemër",
      de: "Herz",
      it: "Cuore"
    },
    color: "bg-gradient-to-br from-indigo-400 to-indigo-500"
  },
  {
    id: 27,
    arabic: "و",
    name: "Waw",
    pronunciation: "W",
    example: {
      en: "Water",
      bs: "Voda",
      sq: "Ujë",
      de: "Wasser",
      it: "Acqua"
    },
    color: "bg-gradient-to-br from-teal-400 to-teal-500"
  },
  {
    id: 28,
    arabic: "ي",
    name: "Ya",
    pronunciation: "Y",
    example: {
      en: "Yes",
      bs: "Da",
      sq: "Po",
      de: "Ja",
      it: "Sì"
    },
    color: "bg-gradient-to-br from-cyan-400 to-cyan-500"
  }
];

export default function ArabicAlphabet() {
  const { t, currentLanguage } = useTranslation();
  const [selectedLetter, setSelectedLetter] = useState<typeof arabicAlphabet[0] | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayLetter = (letter: typeof arabicAlphabet[0]) => {
    // If the same letter is playing, stop it
    if (currentlyPlaying === letter.id && isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      return;
    }
    
    // Stop current audio if playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    // Play new letter
    setCurrentlyPlaying(letter.id);
    setIsPlaying(true);
    
    // Create audio element for authentic Arabic pronunciation
    const audio = new Audio();
    // Store reference for cleanup
    audioRef.current = audio;
    
    // Map letter names to correct audio file names
    const audioFileNames: Record<string, string> = {
      'Alif': 'alif',
      'Ba': 'ba',
      'Ta': 'ta',
      'Tha': 'tha',
      'Jim': 'jim',
      'Hha': 'hha',
      'Kha': 'kha',
      'Dal': 'dal',
      'Dhal': 'dhal',
      'Ra': 'ra',
      'Zay': 'zay',
      'Sin': 'sin',
      'Shin': 'shin',
      'Sad': 'sad',
      'Dad': 'dad',
      'Tah': 'tah',
      'Zha': 'zah',
      'Ain': 'ayn',
      'Ghain': 'ghayn',
      'Fa': 'fa',
      'Qaf': 'qaf',
      'Kaf': 'kaf',
      'Lam': 'lam',
      'Mim': 'mim',
      'Nun': 'nun',
      'Ha': 'ha',
      'Waw': 'waw',
      'Ya': 'ya'
    };
    
    const audioFileName = audioFileNames[letter.name] || letter.name.toLowerCase();
    const audioPath = `/audio/arabic/${audioFileName}.mp3`;
    audio.src = audioPath;
    
    // Postavi volume na maksimum (bez Web Audio API za Android WebView kompatibilnost)
    audio.volume = 1.0;
    
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };
    
    audio.onerror = () => {
      console.warn(`Failed to load authentic Arabic audio for ${letter.name}`);
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    };
    
    audio.play().then(() => {
      console.log(`Playing authentic Arabic pronunciation for ${letter.name}`);
    }).catch(error => {
      console.warn(`Failed to play Arabic audio for ${letter.name}:`, error);
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    });
  };

  const getTitle = () => {
    switch (currentLanguage) {
      case 'en': return 'Arabic Alphabet';
      case 'bs': return 'Sufara-Arapska slova';
      case 'sq': return 'Alfabeti arab';
      case 'de': return 'Arabisches Alphabet';
      case 'it': return 'Alfabeto arabo';
      default: return 'Arabic Alphabet';
    }
  };

  const getSubtitle = () => {
    switch (currentLanguage) {
      case 'en': return 'Learn the 28 letters of Arabic';
      case 'bs': return 'Naučite 28 slova arapskog jezika';
      case 'sq': return 'Mësoni 28 shkronjat e gjuhës arabe';
      case 'de': return 'Lernen Sie die 28 Buchstaben des Arabischen';
      case 'it': return 'Impara le 28 lettere dell\'arabo';
      default: return 'Learn the 28 letters of Arabic';
    }
  };

  const getListenText = () => {
    switch (currentLanguage) {
      case 'en': return 'Listen';
      case 'bs': return 'Slušaj';
      case 'sq': return 'Dëgjo';
      case 'de': return 'Hören';
      case 'it': return 'Ascolta';
      default: return 'Listen';
    }
  };

  const getPlayingText = () => {
    switch (currentLanguage) {
      case 'en': return 'Playing...';
      case 'bs': return 'U reprodukciji...';
      case 'sq': return 'Në riprodhim...';
      case 'de': return 'In Wiedergabe...';
      case 'it': return 'In riproduzione...';
      default: return 'Playing...';
    }
  };

  const getExampleText = () => {
    switch (currentLanguage) {
      case 'en': return 'Example';
      case 'bs': return 'Primjer';
      case 'sq': return 'Shembull';
      case 'de': return 'Beispiel';
      case 'it': return 'Esempio';
      default: return 'Example';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {getTitle()}
          </h1>
          <p className="text-lg text-gray-600">
            {getSubtitle()}
          </p>
        </motion.div>

        {/* Alphabet Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {arabicAlphabet.map((letter, index) => (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`${letter.color} rounded-xl p-6 text-white shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-200`}
              onClick={() => {
                setSelectedLetter(letter);
                handlePlayLetter(letter);
              }}
            >
              <div className="text-center">
                {/* Arabic Letter */}
                <div className="text-6xl font-bold mb-2 arabic-text">
                  {letter.arabic}
                </div>
                
                {/* Letter Name */}
                <h3 className="text-xl font-semibold mb-2">
                  {letter.name}
                </h3>
                
                {/* Pronunciation */}
                <p className="text-white/90 text-sm mb-3">
                  [{letter.pronunciation}]
                </p>
                
                {/* Listen Button */}
                <Button
                  className="w-full bg-white/20 hover:bg-white/30 text-white border-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayLetter(letter);
                  }}
                >
                  {currentlyPlaying === letter.id && isPlaying 
                    ? getPlayingText()
                    : getListenText()}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Letter Detail */}
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-6xl arabic-text mr-4">
                  {selectedLetter.arabic}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {selectedLetter.name}
                  </h3>
                  <p className="text-gray-600">
                    [{selectedLetter.pronunciation}]
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedLetter(null)}
              >
                <Icon name="close" className="text-lg" />
              </Button>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-700 mb-2">
                {getExampleText()}:
              </h4>
              <p className="text-gray-600">
                {selectedLetter.example[currentLanguage as keyof typeof selectedLetter.example]}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interstitial Ad Modal - uklanja se automatski nakon što korisnik klikne X */}
      <InterstitialAd
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
        adUnitId="ca-app-pub-9746293142643974/7649626393"
      />
    </div>
  );
}