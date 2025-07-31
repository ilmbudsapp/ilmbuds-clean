import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/language-context';
import { BackButton } from '@/components/back-button';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/icons';
import { getTranslation } from '@shared/translations';

// Globalna deklaracija za YouTube Player API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface CartoonItem {
  id: number;
  titleKey: string; // Key for getTranslation
  descriptionKey: string; // Key for getTranslation
  thumbnailUrl: string; // Path to thumbnail image
  videoUrls: { // Different video URLs for each language
    en: string;
    bs: string;
    sq: string;
    de: string;
    it: string;
  };
  ageGroup: string; // e.g., "3-6", "7-10"
  duration: string; // e.g., "5:30"
}

export default function Cartoons() {
  const { currentLanguage } = useLanguage();
  const [location, setLocation] = useLocation();
  const [fullscreenCartoon, setFullscreenCartoon] = useState<CartoonItem | null>(null);

  // Cartoon data using centralized translations - 8 cartoons per language
  const cartoons: CartoonItem[] = [
    {
      id: 1,
      titleKey: "alhamdulillahTitle",
      descriptionKey: "alhamdulillahDescription",
      thumbnailUrl: "/attached_assets/Alhamdulillah, Bismillah, InshaAllah .jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/AwW8s_r4g4w", // English
        bs: "https://www.youtube.com/embed/kFS9B3RP5X0", // Bosnian
        sq: "https://www.youtube.com/embed/iPQuPt24IBY", // Albanian
        de: "https://www.youtube.com/embed/YbP3lbctKf0", // German
        it: "https://www.youtube.com/embed/7jPiT80fAGo"  // Italian
      },
      ageGroup: "3-7",
      duration: "2:40"
    },
    {
      id: 2,
      titleKey: "bacaanSurahTitle",
      descriptionKey: "bacaanSurahDescription",
      thumbnailUrl: "/attached_assets/Bacaan Surah Pendek, Al-Fatihah & 4Qul.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/ChzxXMwL2RE", // English
        bs: "https://www.youtube.com/embed/8krpklCb6F4", // Bosnian
        sq: "https://www.youtube.com/embed/9R6bUM8fHug", // Albanian
        de: "https://www.youtube.com/embed/2DIOUCEqh9Q", // German
        it: "https://www.youtube.com/embed/LW6DJHmeKcg"  // Italian
      },
      ageGroup: "4-10",
      duration: "11:38"
    },
    {
      id: 3,
      titleKey: "azanTitle",
      descriptionKey: "azanDescription",
      thumbnailUrl: "https://img.youtube.com/vi/ChzxXMwL2RE/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/Bc_Bf6W8jHE", // English
        bs: "https://www.youtube.com/embed/JDdtKQ8_WXI", // Bosnian
        sq: "https://www.youtube.com/embed/oEyZhd3naXw", // Albanian
        de: "https://www.youtube.com/embed/p_nSw663VAA", // German
        it: "https://www.youtube.com/embed/UCwLRnkLSmc"  // Italian
      },
      ageGroup: "3-8",
      duration: "1:45"
    },
    {
      id: 4,
      titleKey: "namesOfAllahTitle",
      descriptionKey: "namesOfAllahDescription",
      thumbnailUrl: "https://img.youtube.com/vi/-b0yL8QwTSk/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/19V4VxqZ__8", // English
        bs: "https://www.youtube.com/embed/t3zE1WHtM5k", // Bosnian
        sq: "https://www.youtube.com/embed/8eYtxssVP7w", // Albanian
        de: "https://www.youtube.com/embed/BVuWny820uE", // German
        it: "https://www.youtube.com/embed/QIpyWF0jZh4"  // Italian
      },
      ageGroup: "5-12",
      duration: "7:58"
    },
    {
      id: 5,
      titleKey: "ayatulKursiTitle",
      descriptionKey: "ayatulKursiDescription",
      thumbnailUrl: "https://img.youtube.com/vi/n-MKwbOyNEY/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/6iCBi9ZB_1w", // English
        bs: "https://www.youtube.com/embed/-DxDXUoUnwU", // Bosnian
        sq: "https://www.youtube.com/embed/Vu7njdUr198", // Albanian
        de: "https://www.youtube.com/embed/9KKpfQFNr6o", // German
        it: "https://www.youtube.com/embed/OK9PdIoF9jk"  // Italian
      },
      ageGroup: "6-12",
      duration: "3:40"
    },
    {
      id: 6,
      titleKey: "howToPrayTitle",
      descriptionKey: "howToPrayDescription",
      thumbnailUrl: "https://img.youtube.com/vi/WKblVpFHCdY/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/VOI6TZxEuIw", // English
        bs: "https://www.youtube.com/embed/pj0E_vEw37U", // Bosnian
        sq: "https://www.youtube.com/embed/u3ztC15cHSg", // Albanian
        de: "https://www.youtube.com/embed/8Q71KCY4ka4", // German
        it: "https://www.youtube.com/embed/gr56mWJsZFw"  // Italian
      },
      ageGroup: "7-14",
      duration: "8:31"
    },
    {
      id: 7,
      titleKey: "islamicAnimalsTitle",
      descriptionKey: "islamicAnimalsDescription",
      thumbnailUrl: "https://img.youtube.com/vi/Cm8qBSHZhAY/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/IIYU2y3a6L8", // English
        bs: "https://www.youtube.com/embed/SJ6hy0xfXqI", // Bosnian
        sq: "https://www.youtube.com/embed/tn8EKJSMnFY", // Albanian
        de: "https://www.youtube.com/embed/PPw06erb2us", // German
        it: "https://www.youtube.com/embed/83ERg9NEseA"  // Italian
      },
      ageGroup: "4-9",
      duration: "5:20"
    },
    {
      id: 8,
      titleKey: "prophetStoriesTitle",
      descriptionKey: "prophetStoriesDescription",
      thumbnailUrl: "https://img.youtube.com/vi/yvLPOGANRBg/maxresdefault.jpg",
      videoUrls: {
        en: "https://www.youtube.com/embed/v2gx24YqI68", // English
        bs: "https://www.youtube.com/embed/NgwSHN4_Tq8", // Bosnian
        sq: "https://www.youtube.com/embed/3rpbA_gn2ec", // Albanian
        de: "https://www.youtube.com/embed/xXgS_HxD9O8", // German
        it: "https://www.youtube.com/embed/skdJQ3mQ1P8"  // Italian
      },
      ageGroup: "5-12",
      duration: "6:45"
    }
  ];

  // YouTube player state
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
  }, []);

  const handleBackClick = () => {
    if (fullscreenCartoon) {
      setFullscreenCartoon(null);
    } else {
      setLocation('/');
    }
  };

  const toggleFullscreen = (cartoon: CartoonItem) => {
    setFullscreenCartoon(cartoon);
  };

  const closeFullscreen = () => {
    setFullscreenCartoon(null);
  };

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && fullscreenCartoon) {
        setFullscreenCartoon(null);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [fullscreenCartoon]);

  // Get current title and description using centralized translations
  const getTitle = (cartoon: CartoonItem) => {
    return getTranslation('cartoons', cartoon.titleKey, currentLanguage);
  };

  const getDescription = (cartoon: CartoonItem) => {
    return getTranslation('cartoons', cartoon.descriptionKey, currentLanguage);
  };

  // Get current video URL based on language
  const getVideoUrl = (cartoon: CartoonItem) => {
    return cartoon.videoUrls[currentLanguage] || cartoon.videoUrls.en;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <BackButton onClick={handleBackClick} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            {getTranslation('cartoons', 'title', currentLanguage)}
          </h1>
        </motion.div>

        {/* Fullscreen Overlay */}
        {fullscreenCartoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="flex justify-between items-center p-4 bg-black bg-opacity-50 z-10">
              <h2 className="text-2xl font-bold text-white">
                {getTitle(fullscreenCartoon)}
              </h2>
              <button
                onClick={closeFullscreen}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors text-white"
              >
                <Icon name="x" size={24} />
              </button>
            </div>
            
            <div className="flex-1">
              <iframe
                src={getVideoUrl(fullscreenCartoon)}
                title={getTitle(fullscreenCartoon)}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        )}

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cartoons.map((cartoon) => (
            <motion.div
              key={cartoon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: cartoon.id * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-video bg-black relative">
                <iframe
                  src={getVideoUrl(cartoon)}
                  title={getTitle(cartoon)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleFullscreen(cartoon)}
                    className="p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-colors text-white"
                    title={getTranslation('cartoons', 'fullscreen', currentLanguage)}
                  >
                    <Icon name="maximize" size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                  {getTitle(cartoon)}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {getDescription(cartoon)}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{cartoon.ageGroup} {getTranslation('cartoons', 'years', currentLanguage)}</span>
                  <span>{cartoon.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-white text-lg">
            {getTranslation('cartoons', 'comingSoon', currentLanguage)}
          </p>
        </motion.div>
      </div>
    </div>
  );
}