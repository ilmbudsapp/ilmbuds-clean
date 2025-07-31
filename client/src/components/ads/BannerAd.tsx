// Web-based AdMob Banner for WebView APK
import { useEffect } from 'react';

const BannerAd = () => {
  useEffect(() => {
    // Load AdSense script for web-based ads
    if (!document.querySelector('script[src*="adsbygoogle"]')) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544';
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }
    
    // Initialize ad after script loads
    const timer = setTimeout(() => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.log('AdSense loading...');
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 px-2 py-2 flex justify-around shadow-[0_-4px_10px_rgba(0,0,0,0.03)]" style={{height: '64px', zIndex: 9999}}>
      <div className="w-full max-w-lg mx-auto flex items-center justify-center">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '50px' }}
          data-ad-client="ca-pub-3940256099942544"
          data-ad-slot="6300978111"
          data-ad-format="rectangle"
        ></ins>
      </div>
    </div>
  );
};

export default BannerAd;