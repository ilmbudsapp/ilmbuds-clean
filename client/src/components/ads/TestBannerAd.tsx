import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const TestBannerAd: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Load AdSense script if not already loaded
      if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }

      // Initialize ad after script loads
      const timer = setTimeout(() => {
        if (window.adsbygoogle && adRef.current) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('AdSense banner initialized');
          } catch (error) {
            console.error('AdSense error:', error);
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    } catch (error) {
      console.error('AdSense script loading error:', error);
    }
  }, []);

  return (
    <div className="w-full h-14 bg-gray-50 border border-gray-200 flex items-center justify-center">
      <div ref={adRef} className="w-full h-full flex items-center justify-center">
        <ins
          className="adsbygoogle block"
          style={{ display: 'block', width: '320px', height: '50px' }}
          data-ad-client="ca-pub-3940256099942544"
          data-ad-slot="6300978111"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default TestBannerAd;