import React, { useState, useEffect, useCallback } from 'react';
import { Icon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';
import { playSound } from '@/lib/sounds';
import { useIsMobile } from '@/hooks/use-mobile'; 
import { motion } from 'framer-motion';
import RewardedAd from '@/components/ads/RewardedAd';
import { canShowRewarded, markRewardedShown } from '@/services/ad-service';
import { useTranslation } from '@/hooks/use-translation';

type QuizCompleteProps = {
  correctAnswers: number;
  totalQuestions: number;
  earnedPoints: number;
  onReviewAnswers: () => void;
  onNewQuiz: () => void;
};

export function QuizComplete({ 
  correctAnswers, 
  totalQuestions, 
  earnedPoints,
  onReviewAnswers, 
  onNewQuiz 
}: QuizCompleteProps) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  const [hasEarnedExtraPoints, setHasEarnedExtraPoints] = useState(false);
  const [hasEarnedBonus, setHasEarnedBonus] = useState(false);
  const [totalEarnedPoints, setTotalEarnedPoints] = useState(earnedPoints);
  
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const incorrectAnswers = totalQuestions - correctAnswers;
  
  let messageKey = 'quiz.keepPracticing';
  if (accuracy >= 80) messageKey = 'quiz.goodJob';
  if (accuracy >= 90) messageKey = 'quiz.excellent';
  if (accuracy === 100) messageKey = 'quiz.quizComplete';

  const isPerfectScore = accuracy === 100;
  const earnedBadge = accuracy >= 80;

  // Responsive handler for window size
  const detectSize = useCallback(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);

  useEffect(() => {
    // Detect window size for confetti
    detectSize();
    window.addEventListener('resize', detectSize);
    
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [detectSize]);

  useEffect(() => {
    // Show confetti for perfect score
    if (isPerfectScore) {
      setShowConfetti(true);
      playSound('finish');
      
      // Vibrate on mobile devices for perfect score (if supported)
      if (isMobile && 'vibrate' in navigator) {
        // Short vibration pattern for celebration
        navigator.vibrate([100, 50, 100, 50, 200]);
      }
      
      // Hide confetti after some time
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
    
    // For good scores, play a success sound
    if (accuracy >= 80) {
      playSound('finish');
    } else {
      // For lower scores, play a subtle completion sound
      playSound('click');
    }
    
    // Set animation complete after a delay
    const animTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 800);
    
    return () => clearTimeout(animTimer);
  }, [isPerfectScore, accuracy, isMobile]);

  // Handler for opening rewarded ad
  const handleWatchAd = () => {
    setShowRewardedAd(true);
    markRewardedShown();
  };
  
  // Handler for when user completes ad and is rewarded
  const handleAdRewarded = (reward: { type: string, amount: number }) => {
    console.log(`User earned ${reward.amount} ${reward.type} from rewarded ad`);
    
    // Prevent multiple rewards
    if (hasEarnedExtraPoints) return;
    
    setHasEarnedExtraPoints(true);
    setHasEarnedBonus(true);
    setTotalEarnedPoints(prev => prev + reward.amount);
    
    // Show confetti as celebration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
    
    // Play reward sound
    playSound('finish');
    
    // In a real implementation, this would make an API call to add points to the user's account
    // For now, we just update the local state
  };
  
  return (
    <>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg text-center relative max-w-xl mx-auto"
      >
        {showConfetti && (
          <Confetti
            width={windowDimension.width}
            height={windowDimension.height}
            recycle={true}
            numberOfPieces={isPerfectScore ? 200 : 100}
            gravity={0.25}
            colors={['#FFD700', '#FFA500', '#32CD32', '#87CEEB', '#9370DB', '#FF6347']}
          />
        )}
        
        <motion.div 
          className="flex justify-center mb-3 sm:mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shadow-inner overflow-hidden">
              <motion.div
                animate={isPerfectScore ? {
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                } : {}}
                transition={{ repeat: isPerfectScore ? Infinity : 0, duration: 2 }}
              >
                <Icon 
                  name={isPerfectScore ? "auto_awesome" : "emoji_events"} 
                  className={`${isPerfectScore ? 'text-yellow-500' : 'text-primary'} text-4xl sm:text-6xl`} 
                />
              </motion.div>
            </div>
            <motion.div 
              className={`absolute -top-2 -right-2 ${isPerfectScore ? 'bg-yellow-500' : 'bg-accent'} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-xl font-bold shadow-md`}
              animate={isPerfectScore ? { y: [0, -5, 0] } : {}}
              transition={{ repeat: isPerfectScore ? Infinity : 0, duration: 1.5 }}
            >
              {correctAnswers}/{totalQuestions}
            </motion.div>
          </div>
        </motion.div>
        
        <motion.h3 
          className={`text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ${isPerfectScore ? 'text-yellow-500' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('quiz', messageKey.split('.')[1])}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {t('quiz', 'earnedPoints')}: {totalEarnedPoints} {earnedBadge ? `(${t('quiz', 'badgeEarned')})` : ""}
          {hasEarnedExtraPoints && (
            <span className="text-green-600 font-medium block mt-1">
              +{totalEarnedPoints - earnedPoints} {t('quiz', 'bonusPoints')}
            </span>
          )}
          {isPerfectScore && (
            <motion.span 
              className="block mt-1 text-yellow-500 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Mashallah! {t('quiz', 'excellent')}
            </motion.span>
          )}
        </motion.p>
        
        <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <motion.div 
            className="flex flex-col items-center p-2 sm:p-3 bg-primary/10 rounded-lg min-w-16 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <span className="font-bold text-primary text-base sm:text-lg">{correctAnswers}</span>
            <span className="text-xs text-gray-600">{t('quiz', 'correctAnswers')}</span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-2 sm:p-3 bg-error/10 rounded-lg min-w-16 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <span className="font-bold text-error text-base sm:text-lg">{incorrectAnswers}</span>
            <span className="text-xs text-gray-600">{t('quiz', 'incorrectAnswer')}</span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-2 sm:p-3 bg-secondary/10 rounded-lg min-w-16 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <span className="font-bold text-secondary text-base sm:text-lg">{accuracy}%</span>
            <span className="text-xs text-gray-600">{t('quiz', 'yourScore')}</span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="sm:order-1 order-2"
          >
            <Button 
              variant="outline"
              size="sm"
              className="w-full border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary/5 text-xs sm:text-sm"
              onClick={onReviewAnswers}
            >
              <Icon name="list_alt" className="mr-1 sm:inline" />
              Review Answers
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="sm:order-2 order-1"
          >
            <Button 
              size="sm"
              className={`w-full ${isPerfectScore ? 'bg-yellow-500' : 'bg-primary'} text-white rounded-xl font-bold shadow-md hover:shadow-lg text-xs sm:text-sm`}
              onClick={onNewQuiz}
            >
              <Icon name="play_arrow" className="mr-1 sm:inline" />
              New Quiz
            </Button>
          </motion.div>
        </div>
        
        {/* Badge earned indicator */}
        {earnedBadge && (
          <motion.div 
            className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1.2 }}
              >
                <Icon name="emoji_events" className="text-yellow-500 text-xl" />
              </motion.div>
              <span className="text-sm font-medium">{t('quiz', 'badgeEarned')}</span>
            </div>
          </motion.div>
        )}
        
        {/* Rewarded ad button - show if user hasn't earned extra points yet and all 7 questions were completed */}
        {!hasEarnedExtraPoints && totalQuestions === 7 && (
          <motion.div 
            className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <Button
              onClick={handleWatchAd}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 font-bold shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              {t('quiz', 'watchAdForPoints')}
            </Button>
            <p className="text-xs text-gray-500 mt-2 text-center">{t('quiz', 'completeAdForBonus')}</p>
          </motion.div>
        )}
        
        {/* Show message if quiz is incomplete */}
        {totalQuestions !== 7 && (
          <motion.div 
            className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Icon name="info" className="text-xl" />
              <span className="text-sm">Complete all 7 questions to unlock bonus rewards!</span>
            </div>
          </motion.div>
        )}
        
        {/* Extra points earned message */}
        {hasEarnedExtraPoints && (
          <motion.div 
            className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-2 text-green-600">
              <Icon name="check_circle" className="text-xl" />
              <span className="font-medium">{t('quiz', 'bonusEarned')}</span>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <RewardedAd
        isOpen={showRewardedAd}
        onClose={() => {
          setShowRewardedAd(false);
          // Ensure the component is properly marked as having earned extra points
          if (!hasEarnedExtraPoints && totalEarnedPoints > earnedPoints) {
            setHasEarnedExtraPoints(true);
          }
        }}
        onRewarded={handleAdRewarded}
      />
    </>
  );
}
