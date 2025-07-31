import React from 'react';
import { useLocation } from 'wouter';
import { Icon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import { useUserContext } from '@/context/user-context';
import { useLanguage } from '@/context/language-context';
// import BannerAd from '@/components/ads/BannerAd';

// Define NavItem type for type safety
type NavItem = {
  path: string;
  label: string;
  icon: string;
  customIcon?: React.ReactNode;
};

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { t } = useTranslation();
  const { user } = useUserContext();
  const { currentLanguage } = useLanguage();

  const isActive = (path: string) => location === path;
  
  const getNavItems = () => {
    const items: NavItem[] = [
      { 
        path: '/', 
        label: currentLanguage === 'en' ? 'Home' : 
               currentLanguage === 'sq' ? 'Kryefaqja' : 
               currentLanguage === 'de' ? 'Startseite' :
               currentLanguage === 'it' ? 'Home' :
               'Početna', 
        icon: 'home'
      },
      // Cartoons section removed from navigation menu as requested
      // Donate section removed from navigation menu as requested
      { 
        path: '/about', 
        label: currentLanguage === 'en' ? 'About' : 
               currentLanguage === 'sq' ? 'Rreth nesh' : 
               currentLanguage === 'de' ? 'Über uns' :
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
        icon: 'handshake',
        customIcon: <img src="/images/handshake.png" alt="Partners" style={{ width: '24px', height: '24px', transform: 'scale(1.5)' }} />
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

  return null; // Navigation is now handled in BannerWithNav component
}
