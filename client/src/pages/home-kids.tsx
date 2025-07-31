import React, { useState, useEffect, useRef } from 'react';
import { useQuizContext } from '@/context/quiz-context';
import { useUserContext } from '@/context/user-context';
import { useLanguage } from '@/context/language-context';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { ProfileBadge } from '@/components/profile-badge';
import { useTranslation } from '@/hooks/use-translation';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import audioService from '../services/audio-service';
import InterstitialAd from '@/components/ads/InterstitialAd';

export default function HomeKids() {
  const { selectCategory } = useQuizContext();
  const [_, setLocation] = useLocation();
  const { user } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  // Koristimo direktno 'currentLanguage === "bs"' za bosanski jezik
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [showArabicAlphabetAd, setShowArabicAlphabetAd] = useState(false);

  // Floating cloud positions
  const [clouds, setClouds] = useState([
    { id: 1, x: '10%', y: '15%', size: 80, speed: 20 },
    { id: 2, x: '65%', y: '35%', size: 60, speed: 30 },
    { id: 3, x: '40%', y: '75%', size: 70, speed: 25 },
  ]);
  
  // Balloon positions - removed as requested
  const [balloons, setBalloons] = useState<{
    id: number;
    x: string;
    y: string;
    size: number;
    bgColor: string;
    speed: number;
  }[]>([]);
  
  // Star positions
  const [stars, setStars] = useState([
    { id: 1, x: '15%', y: '25%', size: 20, delay: 0, duration: 2 },
    { id: 2, x: '45%', y: '15%', size: 15, delay: 0.5, duration: 1.5 },
    { id: 3, x: '75%', y: '40%', size: 25, delay: 1, duration: 3 },
    { id: 4, x: '25%', y: '70%', size: 18, delay: 1.5, duration: 2.5 },
    { id: 5, x: '65%', y: '65%', size: 22, delay: 0.7, duration: 2.2 },
    { id: 6, x: '90%', y: '30%', size: 16, delay: 1.2, duration: 1.8 },
  ]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
    
    // Show confetti when the page loads
    setShowConfetti(true);
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000); // Show confetti for 5 seconds
    
    // Animate clouds
    const cloudInterval = setInterval(() => {
      setClouds(prev => 
        prev.map(cloud => ({
          ...cloud,
          x: `${(parseFloat(cloud.x) + 0.1) % 100}%`
        }))
      );
    }, 100);
    
    // Balloon animation removed as requested
    
    return () => {
      clearInterval(cloudInterval);
      clearTimeout(confettiTimer);
    };
  }, []);

  // Card animation variants
  const cardVariants = {
    hover: {
      scale: 1.05,
      y: -10,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-400 to-blue-500 relative overflow-hidden">
      {/* Decorative elements */}
      {clouds.map(cloud => (
        <div 
          key={cloud.id}
          className="absolute rounded-full bg-white opacity-80 blur-xl"
          style={{
            width: cloud.size,
            height: cloud.size * 0.6,
            left: cloud.x,
            top: cloud.y,
            transition: `left ${cloud.speed}s linear`
          }}
        />
      ))}
      
      {/* Balloons removed as requested */}
      
      {/* Twinkling stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute text-yellow-100 z-0"
          style={{
            left: star.x,
            top: star.y,
            fontSize: star.size
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay
          }}
        >
          ✦
        </motion.div>
      ))}
      
      {/* Sun in the corner */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-300 rounded-full blur-md animate-pulse-slow"></div>
      
      {/* Header with kid-friendly design */}
      <header className="bg-white/20 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-md z-10 rounded-b-3xl">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 10, 0, -10, 0] }}
            transition={{ 
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut",
              repeatDelay: 3
            }}
          >
            <img src="/images/ilmbuds_logo.png" alt="ILMBUDS" className="h-12 w-12 mr-3" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-extrabold text-olive-500">ILMBUDS</h1>
            <p className="text-xs font-semibold text-olive-500">
              {currentLanguage === 'en' ? 'Islamic education for children' : 
               currentLanguage === 'sq' ? 'Edukim islamik për fëmijë' : 
               currentLanguage === 'de' ? 'Islamische Bildung für Kinder' :
               currentLanguage === 'it' ? 'Educazione islamica per bambini' :
               'Islamsko obrazovanje za djecu'}
            </p>
            <div className="mt-1 text-xl font-arabic text-olive-500">
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
            </div>
          </div>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 container mx-auto p-4 pb-24 z-10">
        <div className={`transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Welcome Section with fun styling */}
          <div className="mb-8 text-center">
            <motion.h2 
              className="text-3xl font-bold text-white mb-2 drop-shadow-lg"
              style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.5)', WebkitTextStroke: '0.7px rgba(0,0,0,0.4)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t('home', 'welcome')}
            </motion.h2>
            <motion.p 
              className="text-white text-lg"
              style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.4px rgba(0,0,0,0.3)' }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t('home', 'subtitle')}
            </motion.p>
            
            {/* Fun decorative elements */}
            <div className="flex justify-center mt-4 space-x-3">
              <motion.div 
                className="w-6 h-6 bg-yellow-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.div 
                className="w-6 h-6 bg-green-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
              />
              <motion.div 
                className="w-6 h-6 bg-pink-400 rounded-full"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quiz Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #3B82F6 0%, #1E40AF 25%, #1E3A8A 50%, #312E81 75%, #1E1B4B 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                // Navigiramo na novi put za kategorije
                setLocation('/quiz-categories');
              }}
              onHoverStart={() => setHoveredCard('quiz')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
              <div className="absolute left-4 top-4 w-16 h-16 bg-yellow-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3"
                    animate={{ rotate: hoveredCard === 'quiz' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'quiz' ? Infinity : 0, duration: 1 }}
                  >
                    <img src="/images/01.QUIZ.png" alt="Quiz" className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>{t('home', 'islamicQuiz')}</h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {t('home', 'quizSectionDescription')}
                </p>
                
                <motion.button 
                  className="bg-white text-indigo-600 py-2 px-6 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'bs' ? "Igraj" : currentLanguage === 'sq' ? "Luaj" : currentLanguage === 'de' ? "Spielen" : currentLanguage === 'it' ? "Gioca" : "Play"}
                </motion.button>
              </div>
              
              {/* Decorative stars */}
              <motion.div 
                className="absolute top-6 right-10 text-yellow-300 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                ✦
              </motion.div>
              <motion.div 
                className="absolute bottom-10 left-10 text-pink-300 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                ✦
              </motion.div>
            </motion.div>

            {/* Stories Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #FBBF24 0%, #F59E0B 25%, #EA580C 50%, #DC2626 75%, #B91C1C 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                setLocation('/stories');
              }}
              onHoverStart={() => setHoveredCard('stories')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl"></div>
              <div className="absolute right-4 top-4 w-16 h-16 bg-red-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3"
                    animate={{ rotate: hoveredCard === 'stories' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'stories' ? Infinity : 0, duration: 1 }}
                  >
                    <img src="/images/02.ISLAMIC STORIES.png" alt="Islamic Stories" className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                    {currentLanguage === 'en' ? "Islamic Stories" : 
                     currentLanguage === 'sq' ? "Tregime Islame" : 
                     currentLanguage === 'de' ? "Islamische Geschichten" :
                     currentLanguage === 'it' ? "Storie Islamiche" :
                     "Islamske priče za djecu"}
                  </h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {t('home', 'storiesSectionDescription')}
                </p>
                
                <motion.button 
                  className="bg-white text-orange-600 py-2 px-6 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'bs' ? "Istraži" : currentLanguage === 'sq' ? "Eksploro" : currentLanguage === 'de' ? "Entdecken" : currentLanguage === 'it' ? "Esplora" : "Explore"}
                </motion.button>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-16 right-6 text-yellow-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              >
                ✦
              </motion.div>
              <motion.div 
                className="absolute bottom-16 left-6 text-red-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
              >
                ✦
              </motion.div>
            </motion.div>

            {/* Quran Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #2DD4BF 0%, #14B8A6 25%, #0F766E 50%, #065F46 75%, #064E3B 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                setLocation('/quran');
              }}
              onHoverStart={() => setHoveredCard('quran')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl"></div>
              <div className="absolute left-4 bottom-4 w-16 h-16 bg-teal-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3"
                    animate={{ rotate: hoveredCard === 'quran' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'quran' ? Infinity : 0, duration: 1 }}
                  >
                    <img src="/images/03.QURAN.png" alt="Quran" className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                    {currentLanguage === 'en' ? "Quran" : 
                     currentLanguage === 'sq' ? "Kuran" : 
                     currentLanguage === 'de' ? "Koran" :
                     currentLanguage === 'it' ? "Corano" :
                     "Kur'an za djecu"}
                  </h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {t('home', 'quranSectionDescription') || "Learn Quran verses and their meaning with fun interactive activities."}
                </p>
                
                <motion.button 
                  className="bg-white text-teal-600 py-2 px-6 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'bs' ? "Uči" : currentLanguage === 'sq' ? "Mëso" : currentLanguage === 'de' ? "Lernen" : currentLanguage === 'it' ? "Impara" : "Learn"}
                </motion.button>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-10 right-16 text-green-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
              >
                ✦
              </motion.div>
              <motion.div 
                className="absolute bottom-12 left-16 text-blue-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}
              >
                ✦
              </motion.div>
            </motion.div>

            {/* Catechism Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #A855F7 0%, #9333EA 25%, #7C3AED 50%, #6D28D9 75%, #5B21B6 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                setLocation('/catechism');
              }}
              onHoverStart={() => setHoveredCard('catechism')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
              <div className="absolute right-4 bottom-4 w-16 h-16 bg-purple-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3"
                    animate={{ rotate: hoveredCard === 'catechism' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'catechism' ? Infinity : 0, duration: 1 }}
                  >
                    <img src="/images/04.CATECHISM ILMIHAL.png" alt="Ilmihal" className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                    {currentLanguage === 'en' ? "Catechism" : 
                     currentLanguage === 'sq' ? "Ilmihal" : 
                     currentLanguage === 'de' ? "Katechismus-Ilmihal" :
                     currentLanguage === 'it' ? "Catechismo" :
                     "Ilmihal za djecu"}
                  </h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {t('home', 'catechismDescription') || "Learn about the five pillars of Islam, Islamic beliefs, and how to perform ablution correctly."}
                </p>
                
                <motion.button 
                  className="bg-white text-purple-600 py-2 px-6 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'bs' ? "Otkrij" : currentLanguage === 'sq' ? "Zbulo" : currentLanguage === 'de' ? "Entdecken" : currentLanguage === 'it' ? "Scopri" : "Discover"}
                </motion.button>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-16 right-4 text-pink-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
              >
                ✦
              </motion.div>
              <motion.div 
                className="absolute bottom-16 left-4 text-purple-200 text-xl"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
              >
                ✦
              </motion.div>
            </motion.div>
            
            {/* Cartoons Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #F87171 0%, #EF4444 25%, #DC2626 50%, #B91C1C 75%, #991B1B 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                // Show interstitial ad before navigating to cartoons
                setShowInterstitialAd(true);
              }}
              onHoverStart={() => setHoveredCard('cartoons')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-red-400/20 rounded-full blur-2xl"></div>
              <div className="absolute right-4 bottom-4 w-16 h-16 bg-purple-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3"
                    animate={{ rotate: hoveredCard === 'cartoons' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'cartoons' ? Infinity : 0, duration: 1 }}
                  >
                    <img src="/images/05.CARTOONS.png" alt="Cartoons" className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                    {currentLanguage === 'en' ? "Cartoons" : 
                     currentLanguage === 'sq' ? "Filma vizatimorë" : 
                     currentLanguage === 'de' ? "Zeichentrickfilme" :
                     currentLanguage === 'it' ? "Cartoni animati" :
                     "Crtani filmovi"}
                  </h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {currentLanguage === 'en' ? "Watch fun Islamic cartoons that teach important lessons in an entertaining way." : 
                   currentLanguage === 'sq' ? "Shikoni filma vizatimorë islamikë që mësojnë mësime të rëndësishme në një mënyrë argëtuese." : 
                   currentLanguage === 'de' ? "Schaue unterhaltsame islamische Zeichentrickfilme, die wichtige Lektionen auf unterhaltsame Weise vermitteln." :
                   currentLanguage === 'it' ? "Guarda divertenti cartoni animati islamici che insegnano importanti lezioni in modo divertente." :
                   "Gledajte zabavne islamske crtane filmove koji podučavaju važne lekcije na zabavan način."}
                </p>
                
                <motion.button 
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-full flex items-center transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('ui', 'watch') || "Watch"}
                </motion.button>
              </div>
              
              <motion.div 
                className="absolute right-0 top-0 text-6xl font-bold text-white/10 transform translate-x-4 -translate-y-4"
                animate={{ rotate: hoveredCard === 'cartoons' ? [0, 5, 0, -5, 0] : 0 }}
                transition={{ repeat: Infinity, duration: 6 }}
              >
                ✧
              </motion.div>
            </motion.div>
            
            {/* Arabic Alphabet Card with Metallic effect */}
            <motion.div 
              className="rounded-3xl p-6 cursor-pointer overflow-hidden relative group"
              style={{
                background: 'linear-gradient(145deg, #D97706 0%, #B45309 25%, #92400E 50%, #78350F 75%, #451A03 100%)',
                backgroundSize: '200% 200%',
                animation: 'metallic-shimmer 3s ease-in-out infinite',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.3)',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))',
              }}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => {
                audioService.playBismillah();
                setShowArabicAlphabetAd(true);
              }}
              onHoverStart={() => setHoveredCard('arabic-alphabet')}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {/* Glass reflection effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl"></div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="absolute left-4 top-4 w-16 h-16 bg-emerald-300/30 rounded-full blur-md"></div>
              {/* Animated light reflection */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-3">
                  <motion.div 
                    className="mr-3 text-4xl"
                    animate={{ rotate: hoveredCard === 'arabic-alphabet' ? [0, 10, 0, -10, 0] : 0 }}
                    transition={{ repeat: hoveredCard === 'arabic-alphabet' ? Infinity : 0, duration: 1 }}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      أ
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>
                    {currentLanguage === 'en' ? "Arabic Alphabet" : 
                     currentLanguage === 'sq' ? "Alfabeti Arab" : 
                     currentLanguage === 'de' ? "Arabisches Alphabet" :
                     currentLanguage === 'it' ? "Alfabeto Arabo" :
                     "Sufara-Arapska slova"}
                  </h3>
                </div>
                
                <p className="text-white/90 text-base mb-4">
                  {currentLanguage === 'en' ? "Learn the 28 letters of Arabic alphabet with pronunciation and examples." : 
                   currentLanguage === 'sq' ? "Mësoni 28 shkronjat e alfabetit arab me shqiptim dhe shembuj." : 
                   currentLanguage === 'de' ? "Lernen Sie die 28 Buchstaben des arabischen Alphabets mit Aussprache und Beispielen." :
                   currentLanguage === 'it' ? "Impara le 28 lettere dell'alfabeto arabo con pronuncia ed esempi." :
                   "Naučite 28 slova arapskog alfabeta sa izgovorom i primjerima."}
                </p>
                
                <motion.button 
                  className="bg-white text-gray-800 py-2 px-6 rounded-full font-medium shadow-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLanguage === 'bs' ? "Učiti" : currentLanguage === 'sq' ? "Mëso" : currentLanguage === 'de' ? "Lernen" : currentLanguage === 'it' ? "Impara" : "Learn"}
                </motion.button>
              </div>
              
              {/* Decorative Arabic letters */}
              <motion.div 
                className="absolute top-10 right-6 text-white/30 text-2xl font-bold"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.1 }}
              >
                ب
              </motion.div>
              <motion.div 
                className="absolute bottom-10 left-6 text-white/30 text-2xl font-bold"
                animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >
                ت
              </motion.div>
            </motion.div>
          </div>
          
          {/* Progress section for logged in users */}
          {user && (
            <motion.div 
              className="mt-8 bg-white/20 backdrop-blur-sm rounded-3xl p-4 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">{t('profile', 'yourProgress')}</h3>
              <div className="bg-white/30 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
                  style={{ width: `${(user?.points || 0) / 10}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-sm text-white">{user?.points || 0} {t('profile', 'points')}</span>
                <span className="text-sm text-white">1000 {t('profile', 'points')}</span>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={200}
          colors={['#FFEB3B', '#4CAF50', '#E91E63', '#03A9F4', '#9C27B0']}
        />
      )}
      
      {/* Interstitial Ad for Cartoons */}
      {showInterstitialAd && (
        <InterstitialAd
          isOpen={showInterstitialAd}
          onClose={() => {
            setShowInterstitialAd(false);
            setLocation('/cartoons');
          }}
          testMode={false}
          adUnitId="ca-app-pub-9746293142643974/7649626393"
        />
      )}
      
      {/* Interstitial Ad for Arabic Alphabet */}
      {showArabicAlphabetAd && (
        <InterstitialAd
          isOpen={showArabicAlphabetAd}
          onClose={() => {
            setShowArabicAlphabetAd(false);
            setLocation('/arabic-alphabet');
          }}
          testMode={false}
          adUnitId="ca-app-pub-9746293142643974/7649626393"
        />
      )}
      
      <Navbar />
    </div>
  );
}