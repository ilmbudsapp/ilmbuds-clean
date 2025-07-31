import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useUserContext } from "@/context/user-context";
import { useTranslation } from "@/hooks/use-translation";
import { Icon } from "@/components/ui/icons";
import { HandshakeIcon } from "@/components/icons/HandshakeIcon";
import { MosqueIcon } from "@/components/icons/MosqueIcon";
import NativeAdMobBanner from "@/components/ads/NativeAdMobBanner";
import InterstitialAd from "@/components/ads/InterstitialAd";
import CapacitorAdMobService from "@/services/capacitor-admob";


const BannerWithNav: React.FC = () => {
  const [, setLocation] = useLocation();
  const { user } = useUserContext();
  const { currentLanguage } = useTranslation();
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [navigationCount, setNavigationCount] = useState(0);

  // Show interstitial ad every 3rd navigation
  const handleNavigation = async (path: string) => {
    const newCount = navigationCount + 1;
    setNavigationCount(newCount);
    
    // Show interstitial every 3rd navigation
    if (newCount % 3 === 0) {
      console.log('Showing interstitial ad after', newCount, 'navigations');
      try {
        await CapacitorAdMobService.showInterstitial("ca-app-pub-9746293142643974/7649626393");
        // In web, show our custom interstitial
        setShowInterstitial(true);
      } catch (error) {
        console.log('Interstitial ad error, showing web preview:', error);
        setShowInterstitial(true);
      }
    }
    
    // Navigate after potential ad
    setLocation(path);
  };

  const isActive = (path: string) => {
    return window.location.pathname === path;
  };

  const getNavItems = () => {
    const items = [
      { 
        path: '/', 
        label: currentLanguage === 'en' ? 'Home' : 
               currentLanguage === 'sq' ? 'Fillimi' : 
               currentLanguage === 'de' ? 'Startseite' :
               currentLanguage === 'it' ? 'Home' :
               'Početna', 
        icon: 'home' 
      },
      { 
        path: '/about', 
        label: currentLanguage === 'en' ? 'About' : 
               currentLanguage === 'sq' ? 'Rreth' : 
               currentLanguage === 'de' ? 'Über' :
               currentLanguage === 'it' ? 'Chi siamo' :
               'O nama', 
        icon: 'info' 
      },
      { 
        path: '/partners', 
        label: currentLanguage === 'en' ? 'Partners' : 
               currentLanguage === 'sq' ? 'Partnerët' : 
               currentLanguage === 'de' ? 'Partner' :
               currentLanguage === 'it' ? 'Partner' :
               'Partneri', 
        icon: 'handshake' 
      },
      { 
        path: '/settings', 
        label: currentLanguage === 'en' ? 'Settings' : 
               currentLanguage === 'sq' ? 'Cilësimet' : 
               currentLanguage === 'de' ? 'Einstellungen' :
               currentLanguage === 'it' ? 'Impostazioni' :
               'Postavke', 
        icon: 'settings' 
      }
    ];
    
    // Add parent dashboard link for parent users
    if (user?.role === 'parent') {
      items.push({ 
        path: '/parent-dashboard', 
        label: currentLanguage === 'en' ? 'Dashboard' : 
               currentLanguage === 'sq' ? 'Paneli' : 
               currentLanguage === 'de' ? 'Dashboard' :
               currentLanguage === 'it' ? 'Pannello' :
               'Kontrolna tabla', 
        icon: 'dashboard' 
      });
    }
    
    return items;
  };

  const navItems = getNavItems();

  return (
    <div className="w-full">
      {/* Bottom Navigation - FIXED positioning above AdMob banner */}
      <nav className="fixed bottom-14 left-0 right-0 z-50 w-full h-14 bg-white border-t border-gray-200 flex items-center justify-around px-2 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <div className="w-full max-w-lg mx-auto flex justify-between px-2">
          {navItems.map(item => (
            <button 
              key={item.path}
              className={`flex flex-col items-center justify-center relative py-1.5 px-3 rounded-lg transition-all duration-300 ${
                isActive(item.path) 
                  ? 'text-primary bg-primary/5 scale-105' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {isActive(item.path) && (
                <span className="absolute top-0 left-1/2 w-8 h-1 bg-primary rounded-b-full transform -translate-y-full -translate-x-1/2 opacity-80"></span>
              )}
              
              <div className={`relative ${isActive(item.path) ? 'nav-icon-active' : ''}`}>
                {item.path === '/' ? (
                  <MosqueIcon 
                    size={24}
                    color={isActive(item.path) ? 'var(--primary-dark)' : '#6B7280'}
                    className={`transition-all duration-300 ${isActive(item.path) ? 'scale-110' : 'scale-100'}`}
                  />
                ) : item.path === '/partners' ? (
                  <HandshakeIcon 
                    size={24}
                    color={isActive(item.path) ? 'var(--primary-dark)' : '#6B7280'}
                    className={`transition-all duration-300 ${isActive(item.path) ? 'scale-110' : 'scale-100'}`}
                  />
                ) : (
                  <Icon 
                    name={item.icon} 
                    className={`transition-all duration-300 ${isActive(item.path) ? 'scale-110' : 'scale-100'}`}
                    color={isActive(item.path) ? 'var(--primary-dark)' : '#6B7280'} 
                  />
                )}
                {isActive(item.path) && (
                  <span className="absolute inset-0 bg-primary/10 blur-md rounded-full transform scale-150 -z-10"></span>
                )}
              </div>
              
              <span className={`text-xs mt-1 font-medium transition-all duration-300 ${
                isActive(item.path) ? 'text-primary' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* AdMob Banner - FIXED at bottom - Native Implementation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full">
        <NativeAdMobBanner 
          testMode={false}
          adUnitId="ca-app-pub-9746293142643974/3548505956"
          appId="ca-app-pub-9746293142643974~5047751469"
        />
      </div>
      
      {/* Interstitial Ad Modal */}
      <InterstitialAd
        isOpen={showInterstitial}
        onClose={() => setShowInterstitial(false)}
        adUnitId="ca-app-pub-9746293142643974/7649626393"
      />
    </div>
  );
};

export default BannerWithNav;