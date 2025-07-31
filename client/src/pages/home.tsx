import React, { useState, useEffect } from 'react';
import { useQuizContext } from '@/context/quiz-context';
import { useUserContext } from '@/context/user-context';
import { useLanguage } from '@/context/language-context';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { ProfileBadge } from '@/components/profile-badge';
import { useTranslation } from '@/hooks/use-translation';
import { Navbar } from '@/components/navbar';
// AdMob komponente uklonjene - direktno integrisano

export default function Home() {
  const { selectCategory } = useQuizContext();
  const [_, setLocation] = useLocation();
  const { user } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    setIsLoaded(true);
    
    // Initialize both web AdSense and Capacitor AdMob
    const initAds = async () => {
      try {
        // For Capacitor (native APK)
        await CapacitorAdMobService.initialize();
        await CapacitorAdMobService.showBannerAd();
        
        // For web preview (fallback to AdSense)
        if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9746293142643974';
          script.crossOrigin = 'anonymous';
          document.head.appendChild(script);
        }
        
        setTimeout(() => {
          try {
            const adElements = document.querySelectorAll('.adsbygoogle');
            adElements.forEach(() => {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            });
          } catch (err) {
            console.log('AdSense fallback error:', err);
          }
        }, 1500);
        
      } catch (e) {
        console.log('Ad initialization error:', e);
      }
    };
    
    initAds();
  }, []);

  return (
    <div className="min-h-screen flex flex-col"
         style={{ 
           background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
           minHeight: '100vh'
         }}>
        

        <header className="bg-gradient-to-r from-indigo-700/80 to-blue-700/80 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center">
            <img src="/images/ilmbuds-logo.png" alt="ILMBUDS" className="h-9 w-9 mr-2" />
            <h1 className="text-lg font-bold">ILMBUDS</h1>
          </div>
          {user && <ProfileBadge points={user.points} />}
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-1">{t('home', 'welcome')}</h2>
              <p className="text-white/80">{t('home', 'subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {/* Quiz - Blue Purple */}
              <div 
                className="rounded-xl p-6 transform transition-all hover:scale-[1.02] cursor-pointer h-64 flex flex-col justify-between overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 15px 30px -10px rgba(102, 126, 234, 0.5)'
                }}
                onClick={() => {
                  fetch('/api/categories')
                    .then(res => res.json())
                    .then(categories => {
                      if (categories && categories.length > 0) {
                        // Always use the first category (History of Islam) regardless of language
                        selectCategory(categories[0]);
                        setLocation('/quiz');
                      }
                    })
                    .catch(err => {
                      console.error("Failed to load categories:", err);
                      setLocation('/topics');
                    });
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center">
                    <Icon name="psychology" className="text-3xl text-white mr-2" />
                    <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>{t('home', 'quiz')}</h3>
                  </div>
                  <p className="text-white/90 mt-2 text-sm">
                    {t('home', 'quizDescription')}
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full backdrop-blur-sm relative z-10 self-start mt-4 transition-colors">
                  Play
                </button>
              </div>

              {/* Islamic Stories - Orange */}
              <div 
                className="rounded-xl p-6 transform transition-all hover:scale-[1.02] cursor-pointer h-64 flex flex-col justify-between overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C00 100%)',
                  boxShadow: '0 15px 30px -10px rgba(255, 107, 53, 0.5)'
                }}
                onClick={() => setLocation('/stories')}
              >
                <div className="relative z-10">
                  <div className="flex items-center">
                    <Icon name="auto_stories" className="text-3xl text-white mr-2" />
                    <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>Islamic Stories</h3>
                  </div>
                  <p className="text-white/90 mt-2 text-sm">
                    Read inspiring stories about prophets and companions
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full backdrop-blur-sm relative z-10 self-start mt-4 transition-colors">
                  Explore
                </button>
              </div>

              {/* Quran - Green Teal */}
              <div 
                className="rounded-xl p-6 transform transition-all hover:scale-[1.02] cursor-pointer h-64 flex flex-col justify-between overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
                  boxShadow: '0 15px 30px -10px rgba(78, 205, 196, 0.5)'
                }}
                onClick={() => setLocation('/quran')}
              >
                <div className="relative z-10">
                  <div className="flex items-center">
                    <Icon name="menu_book" className="text-3xl text-white mr-2" />
                    <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>Quran</h3>
                  </div>
                  <p className="text-white/90 mt-2 text-sm">
                    Read and listen to Quranic verses with translations
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full backdrop-blur-sm relative z-10 self-start mt-4 transition-colors">
                  Learn
                </button>
              </div>
              
              {/* Catechism - Pink */}
              <div 
                className="rounded-xl p-6 transform transition-all hover:scale-[1.02] cursor-pointer h-64 flex flex-col justify-between overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  boxShadow: '0 15px 30px -10px rgba(240, 147, 251, 0.5)'
                }}
                onClick={() => setLocation('/catechism')}
              >
                <div className="relative z-10">
                  <div className="flex items-center">
                    <Icon name="mosque" className="text-3xl text-white mr-2" />
                    <h3 className="text-2xl font-bold text-white" style={{ textShadow: '0px 1px 2px rgba(0,0,0,0.4)', WebkitTextStroke: '0.5px rgba(0,0,0,0.3)' }}>Catechism</h3>
                  </div>
                  <p className="text-white/90 mt-2 text-sm">
                    Learn Islamic teachings and practices (ILMIHAL)
                  </p>
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded-full backdrop-blur-sm relative z-10 self-start mt-4 transition-colors">
                  Learn
                </button>
              </div>
            </div>

            {/* Additional features can be added here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Prayer Times */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="schedule" className="text-white mr-2" />
                    <h3 className="text-white font-semibold">Prayer Times</h3>
                  </div>
                  <p className="text-white/80 text-sm">View daily prayer schedules</p>
                </CardContent>
              </Card>

              {/* Progress Tracking */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="trending_up" className="text-white mr-2" />
                    <h3 className="text-white font-semibold">Progress</h3>
                  </div>
                  <p className="text-white/80 text-sm">Track your learning journey</p>
                </CardContent>
              </Card>

              {/* Community */}
              <Card className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Icon name="group" className="text-white mr-2" />
                    <h3 className="text-white font-semibold">Community</h3>
                  </div>
                  <p className="text-white/80 text-sm">Connect with other learners</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Alternative Monetization */}
            <div style={{ 
              margin: '30px 10px', 
              textAlign: 'center',
              backgroundColor: '#6f42c1',
              padding: '15px',
              borderRadius: '10px',
              border: '3px solid #fff'
            }}>
              <div style={{ 
                color: 'white', 
                fontSize: '16px', 
                marginBottom: '10px',
                fontWeight: 'bold'
              }}>
                Podržite ILMBUDS
              </div>
              <div style={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                padding: '15px',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}>
                Pomoć za razvoj islamske edukacije
                <br />
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => setLocation('/download')}
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      margin: '5px',
                      fontSize: '12px'
                    }}>
                    Download APK
                  </button>
                  <button 
                    onClick={() => setLocation('/donate')}
                    style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '5px',
                      margin: '5px',
                      fontSize: '12px'
                    }}>
                    Donacija
                  </button>
                </div>
              </div>
            </div>

          </div>
        </main>
        
        {/* Capacitor AdMob Ready */}
        <div style={{ 
          margin: '10px', 
          padding: '15px',
          backgroundColor: '#28a745',
          borderRadius: '8px',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bold',
          border: '2px solid white'
        }}>
          Capacitor AdMob Integrisan - Native APK Spreman
          <div style={{ fontSize: '12px', marginTop: '5px', opacity: 0.9 }}>
            ca-pub-9746293142643974 - Native Android SDK
          </div>
        </div>

        <Navbar />
    </div>
  );
}