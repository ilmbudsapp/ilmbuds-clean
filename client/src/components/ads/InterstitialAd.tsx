import React, { useState, useEffect } from 'react';
import CapacitorAdMobService from '@/services/capacitor-admob';
import { motion, AnimatePresence } from 'framer-motion';

interface InterstitialAdProps {
  isOpen: boolean;
  onClose: () => void;
  testMode?: boolean;
  adUnitId?: string;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({
  isOpen,
  onClose,
  testMode = false,
  adUnitId = "ca-app-pub-9746293142643974/7649626393"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);
  const [showWebPreview, setShowWebPreview] = useState(true); // Start with true for web environment

  useEffect(() => {
    const initializeInterstitial = async () => {
      try {
        console.log('Showing interstitial ad with ID:', adUnitId);
        
        // Show interstitial ad using service
        await CapacitorAdMobService.showInterstitial(adUnitId);
        
        setAdLoaded(true);
        console.log('Interstitial ad shown successfully');
        
        // Auto close after 3 seconds in native environment
        setTimeout(() => {
          handleComplete();
        }, 3000);
        
      } catch (error) {
        console.error('Interstitial ad error:', error);
        // In web environment, show fallback UI immediately
        console.log('Using web preview for testing');
        setShowWebPreview(true);
      }
    };

    // Always show web preview in web environment
    if (typeof window !== 'undefined') {
      console.log('Web environment detected, showing web preview');
      setTimeout(() => setShowWebPreview(true), 100);
    } else {
      initializeInterstitial();
    }
  }, [adUnitId, testMode]);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleWebPreviewClose = () => {
    console.log('Web preview ad closed by user');
    handleComplete();
  };

  // Show web preview or let native handle
  return (
    <AnimatePresence>
      {isVisible && showWebPreview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg max-w-md mx-4 shadow-2xl relative"
          >
            {/* Close Button (X) */}
            <button
              onClick={handleWebPreviewClose}
              className="absolute top-2 right-2 w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-10"
            >
              ✕
            </button>
            
            {/* Ad Content */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg">
              <h2 className="text-xl font-bold mb-4">📺 Advertisement</h2>
              <p className="text-sm opacity-90 mb-4">
                Educational Islamic cartoons for children
              </p>
              <div className="bg-white/20 p-4 rounded text-center">
                <div className="text-2xl mb-2">🎬</div>
                <div className="text-sm">AdMob Policy Compliant</div>
                <div className="text-xs mt-2 opacity-75">
                  Click X to close and continue
                </div>
              </div>
              <div className="text-xs opacity-75 mt-4">
                ID: {adUnitId}
              </div>
            </div>

            {/* Instructions */}
            <div className="p-4 text-center text-sm text-gray-600">
              <div className="mb-2">
                <strong>Development Preview</strong>
              </div>
              <div>
                In the mobile app, users will see a real AdMob interstitial ad.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InterstitialAd;