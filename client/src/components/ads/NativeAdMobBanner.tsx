import React, { useEffect, useRef } from 'react';
import CapacitorAdMobService from '@/services/capacitor-admob';

interface NativeAdMobBannerProps {
  testMode?: boolean;
  adUnitId?: string;
  appId?: string;
}

const NativeAdMobBanner: React.FC<NativeAdMobBannerProps> = ({
  testMode = false,
  adUnitId = "ca-app-pub-9746293142643974/3548505956",
  appId = "ca-app-pub-9746293142643974~5047751469"
}) => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [bannerLoaded, setBannerLoaded] = React.useState(false);

  useEffect(() => {
    const initializeAdMob = async () => {
      try {
        console.log('Initializing AdMob Banner with ID:', adUnitId);
        
        // Initialize and show banner using service
        await CapacitorAdMobService.showBanner(adUnitId);
        
        setIsInitialized(true);
        setBannerLoaded(true);
        console.log('AdMob banner shown successfully');
        
      } catch (error: any) {
        console.error('AdMob banner error:', error);
        console.log('Banner will show web preview instead');
      }
    };

    // Initialize after component mount
    const timer = setTimeout(initializeAdMob, 1000);
    
    return () => {
      clearTimeout(timer);
      // Clean up banner when component unmounts
      CapacitorAdMobService.hideBanner().catch(console.error);
    };
  }, [adUnitId, testMode]);

  // Web fallback - show clickable placeholder for testing
  const handleBannerClick = () => {
    console.log('Banner clicked - would open ad in real app');
    // Simulate ad click behavior
    window.open('https://www.google.com', '_blank');
  };

  // In web environment, show empty div - AdMob will work in native app
  if (!bannerLoaded) {
    return (
      <div 
        ref={bannerRef}
        className="w-full h-14 bg-transparent"
        style={{ minHeight: '50px' }}
      />
    );
  }

  // Native AdMob banner will be shown by Capacitor plugin
  return null;


};

export default NativeAdMobBanner;