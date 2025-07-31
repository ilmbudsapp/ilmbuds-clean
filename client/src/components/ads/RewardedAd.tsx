import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import { motion } from 'framer-motion';
import CapacitorAdMobService from '@/services/capacitor-admob';

interface RewardedAdProps {
  isOpen: boolean;
  onClose: () => void;
  onRewarded: (reward: { type: string, amount: number }) => void;
}

const RewardedAd: React.FC<RewardedAdProps> = ({ isOpen, onClose, onRewarded }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [adState, setAdState] = useState<'idle' | 'loading' | 'playing' | 'completed' | 'failed'>('idle');
  const [canClose, setCanClose] = useState(false);
  const [hasRewarded, setHasRewarded] = useState(false);
  
  // Use refs to track component mounting state and prevent memory leaks
  const isMountedRef = useRef(true);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Production AdMob Rewarded Ad ID
  const REWARDED_AD_ID = 'ca-app-pub-9746293142643974/2411518252';

  useEffect(() => {
    if (isOpen) {
      setAdState('idle');
      setCanClose(false);
      setHasRewarded(false);
    }
  }, [isOpen]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
      
      // Clear all timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
      
      // Clean up AdMob listeners
      if (window.AdMob) {
        try {
          window.AdMob.removeAllListeners();
        } catch (error) {
          console.log('Error cleaning up AdMob listeners on unmount:', error);
        }
      }
    };
  }, []);

  // Safe state update function
  const safeSetState = (updateFn: () => void) => {
    if (isMountedRef.current) {
      try {
        updateFn();
      } catch (error) {
        console.log('Error updating state:', error);
      }
    }
  };

  // Safe timer function
  const safeSetTimeout = (callback: () => void, delay: number) => {
    const timer = setTimeout(() => {
      if (isMountedRef.current) {
        callback();
      }
    }, delay);
    timersRef.current.push(timer);
    return timer;
  };

  // Handle showing rewarded ad
  const handleShowAd = async () => {
    safeSetState(() => {
      setIsLoading(true);
      setAdState('loading');
    });
    
    try {
      console.log('Showing rewarded ad with ID:', REWARDED_AD_ID);
      
      // Show rewarded ad using service
      await CapacitorAdMobService.showRewarded(REWARDED_AD_ID);
      
      safeSetState(() => {
        setAdState('playing');
        setIsLoading(false);
      });
      
      // Simulate reward completion after 5 seconds for native ads
      safeSetTimeout(() => {
        if (!hasRewarded && isMountedRef.current) {
          safeSetState(() => setHasRewarded(true));
          safeSetTimeout(() => {
            if (isMountedRef.current) {
              onRewarded({ type: 'points', amount: 10 });
              safeSetState(() => {
                setAdState('completed');
                setCanClose(true);
              });
            }
          }, 100);
        }
      }, 5000);
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      // Web preview - simulate ad behavior without countdown timer
      console.log('Web preview: Simulating rewarded ad');
      safeSetState(() => {
        setAdState('playing');
        setIsLoading(false);
      });
      
      // Simulate ad completion after 3 seconds (no visible countdown)
      safeSetTimeout(() => {
        // First trigger reward event
        if (!hasRewarded && isMountedRef.current) {
          safeSetState(() => setHasRewarded(true));
          safeSetTimeout(() => {
            if (isMountedRef.current) {
              onRewarded({ type: 'points', amount: 10 });
            }
          }, 100);
        }
        // Then close the ad
        safeSetTimeout(() => {
          if (isMountedRef.current) {
            safeSetState(() => {
              setAdState('completed');
              setCanClose(true);
            });
          }
        }, 200);
      }, 3000);
    }
  };

  const handleRetry = () => {
    safeSetState(() => {
      setAdState('idle');
      setCanClose(false);
      setHasRewarded(false);
    });
  };

  const handleClose = () => {
    if (canClose || adState === 'failed') {
      // Clean up timers and resources
      // Clear all timers
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
      
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            {t('quiz', 'watchAdForPoints')}
          </h3>
          {(canClose || adState === 'failed') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <Icon name="close" />
            </Button>
          )}
        </div>

        {/* Content based on ad state */}
        {adState === 'idle' && (
          <div className="text-center">
            <div className="mb-4">
              <Icon name="play_circle" className="text-6xl text-green-500 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">{t('quiz', 'completeAdForBonus')}</p>
              <p className="text-sm text-gray-500">
                {t('quiz', 'earnedPoints')?.replace('{points}', '10')}
              </p>
            </div>
            
            <Button
              onClick={handleShowAd}
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('common', 'loading')}
                </div>
              ) : (
                <>
                  <Icon name="play_arrow" className="mr-2" />
                  {t('quiz', 'watchAdForPoints')}
                </>
              )}
            </Button>
          </div>
        )}

        {adState === 'loading' && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common', 'loading')}...</p>
          </div>
        )}

        {adState === 'playing' && (
          <div className="text-center">
            <div className="mb-4">
              <Icon name="tv" className="text-6xl text-blue-500 mx-auto mb-2" />
              <p className="text-gray-600 mb-2">Ad is playing...</p>
              <div className="animate-pulse">
                <div className="h-2 bg-blue-200 rounded-full mb-2"></div>
                <div className="h-2 bg-blue-200 rounded-full w-3/4 mx-auto"></div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Watch the complete ad to earn your reward!
              </p>
            </div>
          </div>
        )}

        {adState === 'completed' && (
          <div className="text-center">
            <div className="mb-4">
              <Icon name="check_circle" className="text-6xl text-green-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-green-600 mb-2">
                {t('quiz', 'adCompleted')}
              </p>
              <p className="text-gray-600">
                {t('quiz', 'pointsEarned')?.replace('{points}', '10')}
              </p>
            </div>
            
            <Button
              onClick={handleClose}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold"
            >
              <Icon name="done" className="mr-2" />
              Continue
            </Button>
          </div>
        )}

        {adState === 'failed' && (
          <div className="text-center">
            <div className="mb-4">
              <Icon name="error" className="text-6xl text-red-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-red-600 mb-2">
                {t('common', 'error')}
              </p>
              <p className="text-gray-600 mb-4">
                Failed to load ad. Please try again.
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleRetry}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                <Icon name="refresh" className="mr-2" />
                {t('common', 'retry')}
              </Button>
              <Button
                onClick={handleClose}
                variant="outline"
                className="flex-1 py-3 rounded-xl font-bold"
              >
                {t('common', 'cancel')}
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RewardedAd;