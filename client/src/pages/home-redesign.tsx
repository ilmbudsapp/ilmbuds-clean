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
import { playSound } from '@/lib/sounds';

export default function Home() {
  const { selectCategory } = useQuizContext();
  const [_, setLocation] = useLocation();
  const { user } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showKaaba, setShowKaaba] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const animatingRef = useRef(false);

  // Trigger animation after component mounts
  useEffect(() => {
    // Initial animations
    setTimeout(() => setIsLoaded(true), 100);
    setTimeout(() => setShowKaaba(true), 800);
    
    // Preload hover sound
    if (!animatingRef.current) {
      animatingRef.current = true;
      const timer = setTimeout(() => {
        animatingRef.current = false;
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCardHover = () => {
    if (!animatingRef.current) {
      playSound('hover');
    }
  };

  const handleCardClick = (path: string) => {
    playSound('click');
    setLocation(path);
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed overflow-x-hidden" 
      style={{ 
        backgroundImage: 'linear-gradient(to bottom, #05111f, #051729, #051c33, #05223e, #042748)'
      }}
    >
      {/* Stars background */}
      <div className="fixed inset-0 w-full h-full bg-repeat z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'400\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23283B59\' stroke-width=\'1\'%3E%3Cpath d=\'M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63\'/%3E%3Cpath d=\'M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764\'/%3E%3Cpath d=\'M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880\'/%3E%3Cpath d=\'M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382\'/%3E%3Cpath d=\'M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269\'/%3E%3C/g%3E%3Cg fill=\'%234B679C\'%3E%3Ccircle cx=\'769\' cy=\'229\' r=\'2\'/%3E%3Ccircle cx=\'539\' cy=\'269\' r=\'1\'/%3E%3Ccircle cx=\'603\' cy=\'493\' r=\'1\'/%3E%3Ccircle cx=\'731\' cy=\'737\' r=\'1\'/%3E%3Ccircle cx=\'520\' cy=\'660\' r=\'1\'/%3E%3Ccircle cx=\'309\' cy=\'538\' r=\'1.5\'/%3E%3Ccircle cx=\'295\' cy=\'764\' r=\'2\'/%3E%3Ccircle cx=\'40\' cy=\'599\' r=\'1\'/%3E%3Ccircle cx=\'102\' cy=\'382\' r=\'1.5\'/%3E%3Ccircle cx=\'127\' cy=\'80\' r=\'2\'/%3E%3Ccircle cx=\'370\' cy=\'105\' r=\'1\'/%3E%3Ccircle cx=\'578\' cy=\'42\' r=\'1\'/%3E%3Ccircle cx=\'237\' cy=\'261\' r=\'2\'/%3E%3Ccircle cx=\'390\' cy=\'382\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}
      />

      {/* Mosque silhouette panorama */}
      <div className="fixed bottom-0 left-0 w-full z-0 pointer-events-none">
        <div 
          className="w-full h-40 bg-repeat-x"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 300\' preserveAspectRatio=\'none\'%3E%3Cpath fill=\'%23061e37\' d=\'M0,250 L50,240 L75,245 L100,235 L125,250 L150,245 L200,255 L250,240 C300,220 350,210 400,220 C450,230 500,260 550,265 C600,270 650,250 700,240 C750,230 800,230 850,240 C875,245 880,240 900,230 L920,220 L940,225 L950,220 L975,230 L1000,225 L1025,235 L1050,230 L1075,240 L1100,235 L1125,245 L1150,235 L1175,240 L1200,250 L1200,300 L0,300 Z\'/%3E%3Cpath fill=\'%23041325\' d=\'M450,250 L450,190 L465,190 L465,250 M535,250 L535,190 L550,190 L550,250 M495,250 L495,140 L510,140 L510,250 M495,140 L440,180 L440,190 L560,190 L560,180 L495,140 M475,190 L475,235 L485,235 L485,190 M525,190 L525,235 L535,235 L535,190\'/%3E%3Cpath fill=\'%23041325\' d=\'M600,250 L600,220 L620,220 L620,250 M650,250 L650,220 L670,220 L670,250 M600,220 L635,180 L670,220 M615,220 L615,235 L625,235 L625,220 M645,220 L645,235 L655,235 L655,220\'/%3E%3Cpath fill=\'%23041325\' d=\'M850,250 L850,190 L865,190 L865,250 M935,250 L935,190 L950,190 L950,250 M895,250 L895,140 L910,140 L910,250 M895,140 L840,180 L840,190 L960,190 L960,180 L895,140 M875,190 L875,235 L885,235 L885,190 M925,190 L925,235 L935,235 L935,190\'/%3E%3Cpath fill=\'%23041325\' d=\'M150,250 L150,220 L170,220 L170,250 M200,250 L200,220 L220,220 L220,250 M150,220 L185,180 L220,220 M165,220 L165,235 L175,235 L175,220 M195,220 L195,235 L205,235 L205,220\'/%3E%3C/svg%3E")',
            backgroundPositionY: 'bottom',
            height: '240px'
          }}
        />
      </div>

      {/* Main content area */}
      <div className="min-h-screen flex flex-col z-10 relative">
        {/* Header with animated logo */}
        <header className="bg-gradient-to-r from-indigo-900/80 to-blue-900/80 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-lg z-10">
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 mr-3 bg-indigo-500 rounded-full shadow-lg transform transition-all hover:scale-110">
                <Icon name="mosque" className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">ILMBUDS</h1>
                <span className="text-xs text-white/70 italic">by Agron Osmani</span>
              </div>
            </div>
          </div>
          {user && <ProfileBadge points={user.points} />}
        </header>

        <main className="flex-1 container mx-auto p-4 pb-24 z-10">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Kaaba illustration with animated reveal */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <div className={`relative transition-all duration-1000 ease-out transform ${showKaaba ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                <div className="w-32 h-32 mx-auto mb-4 relative" style={{ transform: 'perspective(500px) rotateX(10deg)' }}>
                  <img 
                    src="/attached_assets/Kaba Vector png.png" 
                    alt="Kaaba" 
                    className="w-full h-full object-contain drop-shadow-xl"
                  />
                  <div className="absolute inset-0 bg-blue-500/10 animate-pulse-slow rounded-md" style={{ filter: 'blur(20px)' }}></div>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white text-center mb-2 title-3d">
                {t('home', 'welcome')}
              </h2>
              <p className="text-white/80 text-center max-w-lg modern-tagline">
                {t('home', 'subtitle')}
              </p>
            </div>

            {/* Main learning sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {/* Quran Section - Green */}
              <div 
                className="relative group overflow-hidden rounded-2xl transition-all duration-500 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => handleCardClick('/quran')}
                onMouseEnter={handleCardHover}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-900 opacity-90 transition-all duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 mosque-silhouette-green opacity-50"></div>
                <div className="relative z-10 p-6 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                        <Icon name="menu_book" className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {t('quran', 'suraFolder')}
                      </h3>
                    </div>
                    <p className="text-white/90 mt-3 text-sm">
                      {t('home', 'quranSectionDescription')}
                    </p>
                  </div>
                  
                  <button className="group-hover:bg-white/30 bg-white/20 text-white py-2 px-6 rounded-full backdrop-blur-sm self-start transition-all duration-500 flex items-center">
                    <span className="mr-2">{t('common', 'explore')}</span>
                    <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
              
              {/* Stories Section - Orange */}
              <div 
                className="relative group overflow-hidden rounded-2xl transition-all duration-500 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => handleCardClick('/stories')}
                onMouseEnter={handleCardHover}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-700 opacity-90 transition-all duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 mosque-silhouette-orange opacity-50"></div>
                <div className="relative z-10 p-6 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                        <Icon name="auto_stories" className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {t('home', 'islamicStories')}
                      </h3>
                    </div>
                    <p className="text-white/90 mt-3 text-sm">
                      {t('home', 'storiesSectionDescription')}
                    </p>
                  </div>
                  
                  <button className="group-hover:bg-white/30 bg-white/20 text-white py-2 px-6 rounded-full backdrop-blur-sm self-start transition-all duration-500 flex items-center">
                    <span className="mr-2">{t('common', 'explore')}</span>
                    <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
              
              {/* Catechism Section - Purple */}
              <div 
                className="relative group overflow-hidden rounded-2xl transition-all duration-500 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => handleCardClick('/catechism')}
                onMouseEnter={handleCardHover}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 opacity-90 transition-all duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 mosque-silhouette-purple opacity-50"></div>
                <div className="relative z-10 p-6 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                        <Icon name="mosque" className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {t('common', 'catechism')}
                      </h3>
                    </div>
                    <p className="text-white/90 mt-3 text-sm">
                      {t('home', 'catechismDescription') || "Learn about the five pillars of Islam, Islamic beliefs, and how to perform ablution correctly."}
                    </p>
                  </div>
                  
                  <button className="group-hover:bg-white/30 bg-white/20 text-white py-2 px-6 rounded-full backdrop-blur-sm self-start transition-all duration-500 flex items-center">
                    <span className="mr-2">{t('common', 'explore')}</span>
                    <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
              
              {/* Quiz Section - Blue */}
              <div 
                className="relative group overflow-hidden rounded-2xl transition-all duration-500 shadow-xl transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                onClick={() => handleCardClick('/quiz')}
                onMouseEnter={handleCardHover}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900 opacity-90 transition-all duration-500 group-hover:opacity-100"></div>
                <div className="absolute inset-0 mosque-silhouette-blue opacity-50"></div>
                <div className="relative z-10 p-6 h-64 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                        <Icon name="psychology" className="text-2xl text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {t('common', 'quiz')}
                      </h3>
                    </div>
                    <p className="text-white/90 mt-3 text-sm">
                      {t('home', 'quizDescription') || "Test your Islamic knowledge with quizzes on various topics and earn points and badges."}
                    </p>
                  </div>
                  
                  <button className="group-hover:bg-white/30 bg-white/20 text-white py-2 px-6 rounded-full backdrop-blur-sm self-start transition-all duration-500 flex items-center">
                    <span className="mr-2">{t('common', 'explore')}</span>
                    <span className="transform transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Qibla direction button */}
            <div className="mb-8">
              <div 
                className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500/80 to-indigo-700/80 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                onClick={() => handleCardClick('/qibla')}
                onMouseEnter={handleCardHover}
              >
                <div className="bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.05%22 d=%22M50,0 L100,50 L50,100 L0,50 L50,0 Z%22/%3E%3C/svg%3E')] bg-repeat opacity-20 absolute inset-0"></div>
                <div className="p-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-400/30 flex items-center justify-center mr-3">
                      <Icon name="explore" className="text-white text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{t('common', 'qiblaDirection') || "Qibla Direction"}</h4>
                      <p className="text-white/70 text-sm">{t('home', 'findQiblaDescription') || "Find the direction of the Kaaba from anywhere in the world"}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  </div>
                </div>
              </div>
            </div>
            
            {/* Parent Dashboard Button */}
            {user?.role === 'parent' && (
              <div className="mb-8">
                <div 
                  className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/90 to-pink-500/90 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={() => handleCardClick('/parent-dashboard')}
                  onMouseEnter={handleCardHover}
                >
                  <div className="bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.05%22 d=%22M20,20 L80,20 L80,80 L20,80 L20,20 Z%22/%3E%3C/svg%3E')] bg-repeat opacity-20 absolute inset-0"></div>
                  <div className="p-4 flex items-center justify-between relative z-10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-pink-400/30 flex items-center justify-center mr-3">
                        <Icon name="family_restroom" className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{t('parent', 'parentDashboard')}</h4>
                        <p className="text-white/70 text-sm">{t('parent', 'trackProgress')}</p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        
        {/* Navbar at the bottom */}
        <Navbar />
      </div>
    </div>
  );
}