import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { Celebration } from '@/components/celebration';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { playSound } from '@/lib/sounds';

type Verse = {
  id: number;
  surahId: number;
  verseNumber: number;
  arabicText: string;
  transliteration: string;
};

type Translation = {
  id: number;
  verseId: number;
  language: string;
  translation: string;
  explanation: string;
};

type VerseWithTranslation = {
  verse: Verse;
  translations: Translation[];
};

export enum MemorizationLevel {
  NotStarted = 0,
  Familiar = 1,
  PartiallyMemorized = 2,
  MostlyMemorized = 3,
  FullyMemorized = 4,
  Mastered = 5,
}

export type VerseProgressStatus = {
  verseId: number;
  memorizationLevel: MemorizationLevel;
  lastReviewed?: Date;
};

type QuranVerseLearningProps = {
  surahId: number;
  verses: VerseWithTranslation[];
  audioUrl?: string;
  userId: number;
  initialProgress?: VerseProgressStatus[];
  onProgressUpdate?: (progress: VerseProgressStatus[]) => void;
};

export function QuranVerseLearning({ 
  surahId, 
  verses, 
  audioUrl, 
  userId, 
  initialProgress = [],
  onProgressUpdate 
}: QuranVerseLearningProps) {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [progress, setProgress] = useState<VerseProgressStatus[]>(initialProgress);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState('read');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Set up audio element
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      setAudioElement(audio);
      return () => {
        audio.pause();
        audio.src = '';
      };
    }
  }, [audioUrl]);

  const updateProgressMutation = useMutation({
    mutationFn: async (data: { userId: number; surahId: number; verseId: number; level: MemorizationLevel }) => {
      const response = await fetch(`/api/users/${data.userId}/quran/verses/${data.verseId}/memorization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: data.level }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update progress');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/quran/progress`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/quran/surahs/${surahId}/progress`] });
    },
  });

  const currentVerse = verses[currentVerseIndex]?.verse;
  const currentTranslations = verses[currentVerseIndex]?.translations || [];
  const currentTranslation = currentTranslations.find(t => t.language === currentLanguage) || 
                             currentTranslations.find(t => t.language === 'en');

  const currentMemorizationLevel = progress.find(p => p.verseId === currentVerse?.id)?.memorizationLevel || MemorizationLevel.NotStarted;

  const handleMemorizationProgress = (increment: boolean) => {
    if (!currentVerse) return;

    const verseId = currentVerse.id;
    const currentLevel = progress.find(p => p.verseId === verseId)?.memorizationLevel || MemorizationLevel.NotStarted;
    
    // Calculate new level
    let newLevel = increment 
      ? Math.min(currentLevel + 1, MemorizationLevel.Mastered) 
      : Math.max(currentLevel - 1, MemorizationLevel.NotStarted);
    
    // Play sound based on action
    if (increment) {
      playSound('success');
    } else if (currentLevel > MemorizationLevel.NotStarted) {
      playSound('click');
    }

    // Update local progress state
    const updatedProgress = progress.filter(p => p.verseId !== verseId);
    updatedProgress.push({
      verseId,
      memorizationLevel: newLevel,
      lastReviewed: new Date()
    });
    
    setProgress(updatedProgress);
    
    // Call API to update progress
    updateProgressMutation.mutate({
      userId,
      surahId,
      verseId,
      level: newLevel
    });

    // If a verse was fully mastered
    if (newLevel === MemorizationLevel.Mastered && currentLevel !== MemorizationLevel.Mastered) {
      setShowCelebration(true);
      // Callback
      if (onProgressUpdate) {
        onProgressUpdate(updatedProgress);
      }
    }
  };

  const handlePlayAudio = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing audio:", err));
      
      audioElement.onended = () => setIsPlaying(false);
    }
  };

  const moveToVerse = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentVerseIndex > 0) {
      setCurrentVerseIndex(currentVerseIndex - 1);
    } else if (direction === 'next' && currentVerseIndex < verses.length - 1) {
      setCurrentVerseIndex(currentVerseIndex + 1);
    }
  };

  // Calculate overall progress percentage
  const totalVerses = verses.length;
  const completedVerses = progress.filter(p => p.memorizationLevel === MemorizationLevel.Mastered).length;
  const progressPercentage = totalVerses > 0 ? (completedVerses / totalVerses) * 100 : 0;

  // Helper to get memorization label
  const getMemorizationLabel = (level: MemorizationLevel) => {
    switch(level) {
      case MemorizationLevel.NotStarted: return t('quran', 'memLevelNotStarted');
      case MemorizationLevel.Familiar: return t('quran', 'memLevelFamiliar');
      case MemorizationLevel.PartiallyMemorized: return t('quran', 'memLevelPartiallyMemorized');
      case MemorizationLevel.MostlyMemorized: return t('quran', 'memLevelMostlyMemorized');
      case MemorizationLevel.FullyMemorized: return t('quran', 'memLevelFullyMemorized');
      case MemorizationLevel.Mastered: return t('quran', 'memLevelMastered');
      default: return '';
    }
  };

  // Helper to get memorization color
  const getMemorizationColor = (level: MemorizationLevel) => {
    switch(level) {
      case MemorizationLevel.NotStarted: return 'bg-gray-200';
      case MemorizationLevel.Familiar: return 'bg-blue-200';
      case MemorizationLevel.PartiallyMemorized: return 'bg-teal-200';
      case MemorizationLevel.MostlyMemorized: return 'bg-yellow-200';
      case MemorizationLevel.FullyMemorized: return 'bg-orange-200';
      case MemorizationLevel.Mastered: return 'bg-green-200';
      default: return 'bg-gray-200';
    }
  };

  if (!currentVerse) {
    return (
      <Card className="p-4 text-center">
        {t('quran', 'noVersesAvailable')}
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex-1">
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <span className="text-sm font-medium">
          {completedVerses}/{totalVerses}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => moveToVerse('prev')}
          disabled={currentVerseIndex === 0}
        >
          <Icon name="arrow_back_ios" className="h-4 w-4 mr-1" />
          {t('quran', 'previousVerse')}
        </Button>
        
        <span className="text-sm font-medium">
          {t('quran', 'verse')} {currentVerse.verseNumber}
        </span>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => moveToVerse('next')}
          disabled={currentVerseIndex === verses.length - 1}
        >
          {t('quran', 'nextVerse')}
          <Icon name="arrow_forward_ios" className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Audio Control */}
      {audioUrl && (
        <Button 
          variant="outline" 
          className="w-full mb-4"
          onClick={handlePlayAudio}
        >
          <Icon name={isPlaying ? "pause" : "play_arrow"} className="h-5 w-5 mr-2" />
          {isPlaying ? t('quran', 'pauseRecitation') : t('quran', 'playRecitation')}
        </Button>
      )}

      {/* Verse Content */}
      <Card className="overflow-hidden">
        <Tabs defaultValue="read" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="read">{t('quran', 'read')}</TabsTrigger>
            <TabsTrigger value="translate">{t('quran', 'translation')}</TabsTrigger>
            <TabsTrigger value="memorize">{t('quran', 'memorize')}</TabsTrigger>
          </TabsList>
          
          {/* Read Tab - Shows Arabic text and transliteration */}
          <TabsContent value="read" className="p-4 space-y-4">
            <div className="text-right mb-4">
              <p className="text-2xl font-arabic leading-loose">{currentVerse.arabicText}</p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-500 mb-1">{t('quran', 'transliteration')}</h4>
              <p className="italic">{currentVerse.transliteration}</p>
            </div>
          </TabsContent>
          
          {/* Translate Tab - Shows translation and explanation */}
          <TabsContent value="translate" className="p-4 space-y-4">
            {currentTranslation ? (
              <>
                <div>
                  <h4 className="font-medium text-sm text-gray-500 mb-1">{t('quran', 'translation')}</h4>
                  <p>{currentTranslation.translation}</p>
                </div>
                {currentTranslation.explanation && (
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t('quran', 'explanation')}</h4>
                    <p className="text-sm text-gray-700">{currentTranslation.explanation}</p>
                  </div>
                )}
              </>
            ) : (
              <p>{t('quran', 'translationNotAvailable')}</p>
            )}
          </TabsContent>
          
          {/* Memorize Tab - Shows memorization progress */}
          <TabsContent value="memorize" className="p-4">
            <div className="text-center mb-4">
              <div className={`inline-block px-3 py-1 rounded-full text-sm ${getMemorizationColor(currentMemorizationLevel)}`}>
                {getMemorizationLabel(currentMemorizationLevel)}
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleMemorizationProgress(false)}
                disabled={currentMemorizationLevel === MemorizationLevel.NotStarted}
              >
                <Icon name="arrow_downward" className="h-4 w-4 mr-1" />
                {t('quran', 'decreaseLevel')}
              </Button>
              
              <Button 
                variant="default" 
                className="flex-1"
                onClick={() => handleMemorizationProgress(true)}
                disabled={currentMemorizationLevel === MemorizationLevel.Mastered}
              >
                <Icon name="arrow_upward" className="h-4 w-4 mr-1" />
                {t('quran', 'increaseLevel')}
              </Button>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-sm mb-2">{t('quran', 'memorizationTips')}</h4>
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li>{t('quran', 'tipRepetition')}</li>
                <li>{t('quran', 'tipUnderstand')}</li>
                <li>{t('quran', 'tipChunks')}</li>
                <li>{t('quran', 'tipReview')}</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Celebration overlay */}
      <Celebration 
        isVisible={showCelebration} 
        onComplete={() => setShowCelebration(false)} 
      />
    </div>
  );
}