import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Question } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import audioService from '@/services/audio-service';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useTranslation } from '@/hooks/use-translation';
import { CandyConfetti } from './candy';

type QuizContainerProps = {
  questions: Question[];
  currentQuestionIndex: number;
  onAnswerSubmit: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  selectedAnswers: Record<number, number>;
};

export function QuizContainer({
  questions,
  currentQuestionIndex,
  onAnswerSubmit,
  onNextQuestion,
  onPreviousQuestion,
  canGoBack,
  canGoForward,
  selectedAnswers
}: QuizContainerProps) {
  const { toast } = useToast();
  const { t, tQuizContent, tQuizOption } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // Dodajemo stanje za prikaz bombona

  const currentQuestion = questions[currentQuestionIndex];
  
  // Reset state when question changes
  useEffect(() => {
    if (currentQuestion) {
      const previousSelection = selectedAnswers[currentQuestion.id];
      setSelectedOption(previousSelection !== undefined ? previousSelection : null);
      setAnswerSubmitted(previousSelection !== undefined);
      setIsCorrect(previousSelection === currentQuestion.correctOption);
      setShowConfetti(false); // Sakrijemo bombone kada se promeni pitanje
      
      console.log("Question changed: ", {
        currentQuestionId: currentQuestion.id,
        previousSelection,
        answerSubmitted: previousSelection !== undefined,
        isCorrect: previousSelection === currentQuestion.correctOption,
        canGoForward
      });
    }
  }, [currentQuestionIndex, currentQuestion, selectedAnswers, canGoForward]);

  // Enhanced debug information if question is missing
  if (!currentQuestion) {
    console.error(`Quiz container error: No question at index ${currentQuestionIndex}`);
    console.log('All questions:', questions);
    
    return (
      <div className="bg-white rounded-2xl p-5 shadow-lg mb-6">
        <p className="text-center">{t('quiz', 'noQuestions')}</p>
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          <p className="font-semibold">Debug Information:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Question Index: {currentQuestionIndex}</li>
            <li>Total Questions: {questions.length}</li>
            <li>Questions Array: {JSON.stringify(questions.map(q => q.id))}</li>
          </ul>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (answerSubmitted) return; // Can't change answer after submission
    
    setSelectedOption(optionIndex);
    const correct = optionIndex === currentQuestion.correctOption;
    setIsCorrect(correct);
    setAnswerSubmitted(true);
    
    // Aktiviramo animaciju bombona za tačan odgovor
    if (correct) {
      console.log("Correct answer selected, showing confetti!");
      setShowConfetti(false); // Prvo resetujemo
      setTimeout(() => {
        setShowConfetti(true); // Onda aktiviramo nakon kratke pauze
      }, 50);
    }
    
    onAnswerSubmit(currentQuestion.id, optionIndex, correct);
    
    // Play Islamic sound based on answer with a small delay for better UX
    setTimeout(() => {
      if (correct) {
        // Play correct answer sound (Allahu Akbar)
        audioService.playAllahuEkber();
      } else {
        // Play incorrect answer sound (Subhanallah)
        audioService.playSubhanallah();
      }
    }, 300);
    
    // Show Islamic-themed toast for feedback
    toast({
      title: correct ? t('quiz', 'excellent') : t('quiz', 'keepPracticing'),
      description: correct ? t('quiz', 'correctAnswer') : t('quiz', 'incorrectAnswer'),
      variant: correct ? "default" : "destructive",
      duration: 2000,
    });
  };

  const handlePlayAudio = () => {
    if (currentQuestion.audioUrl) {
      // Play Bismillah sound when custom audio is clicked
      audioService.playBismillah();
    } else {
      // If no custom audio, use text-to-speech
      const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
      utterance.rate = 0.9; // Slightly slower for children
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-lg mb-4 sm:mb-6 max-w-xl mx-auto relative overflow-hidden">
      {/* Animacija bombona za tačne odgovore */}
      <CandyConfetti active={showConfetti} />
      {/* Naslov i Back button */}
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <div className="flex items-center">
          {/* Strelica za nazad umjesto plusića */}
          <button 
            className="mr-2 bg-primary/10 p-1.5 rounded-full relative group
              hover:bg-primary/15
              shadow-[0_2px_5px_rgba(0,0,0,0.1)]
              hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]
              transition-all duration-300"
            onClick={onPreviousQuestion}
            disabled={!canGoBack}
            aria-label={t('general', 'back')}
          >
            <Icon 
              name="arrow_back" 
              className={`text-primary group-hover:-translate-x-1 transition-transform duration-300 ${!canGoBack ? 'opacity-50' : ''}`} 
            />
          </button>
          <span className="font-bold text-primary text-sm sm:text-base">
            {t('quiz', 'question')} {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        
        {/* 3D Progress Bar */}
        <div className="w-24 sm:w-32 h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden relative
          shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
          {/* Animated shine effect */}
          <div className="absolute inset-0 w-full opacity-50 z-10 overflow-hidden">
            <div 
              className="h-full w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                skew-x-[-45deg] animate-[shine_1.5s_ease-in-out_infinite]"
              style={{
                animation: progressPercentage > 0 ? 'shine 1.5s ease-in-out infinite' : 'none',
                left: '-100%',
              }}
            />
          </div>
          
          {/* Progress fill */}
          <div 
            className="bg-secondary h-full rounded-full relative z-0
              shadow-[0_0_6px_rgba(59,130,246,0.5)]
              transition-all duration-700 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card - bez plusića na desnoj strani */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-start sm:items-center mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg font-bold flex-1">
            {tQuizContent(
              'islamicHistory', 
              currentQuestionIndex, 
              'text'
            ) || currentQuestion.text}
          </h3>
          {/* Audio Button - bez plusića */}
          <button 
            className="ml-2 bg-primary/10 p-1.5 rounded-full shrink-0 relative group
              hover:bg-primary/15
              shadow-[0_2px_5px_rgba(0,0,0,0.1)]
              hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)]
              hover:translate-y-[-1px]
              active:translate-y-[1px]
              active:shadow-[0_1px_2px_rgba(0,0,0,0.1)]
              transition-all duration-300"
            onClick={handlePlayAudio}
            aria-label={t('quiz', 'playAudio')}
          >
            <div className="relative">
              {/* Pulsing effect when hovered */}
              <div className="absolute inset-0 bg-primary/20 rounded-full scale-0 group-hover:scale-150 blur-[2px] transition-all duration-300 opacity-0 group-hover:opacity-70"></div>
              <Icon 
                name="volume_up" 
                className="text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" 
                is3D={true}
              />
            </div>
          </button>
        </div>
        
        {currentQuestion.imageUrl && (
          <div className="mb-3 sm:mb-4 rounded-xl overflow-hidden h-32 sm:h-48 bg-gray-100 flex items-center justify-center">
            <OptimizedImage 
              src={currentQuestion.imageUrl}
              alt={t('quiz', 'questionIllustration')}
              className="object-cover w-full h-full"
              fallback={`/images/quiz/${currentQuestion.imageUrl.split('/').pop()}`}
            />
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
        {currentQuestion.options.map((option, index) => {
          // Base classes with 3D effects
          let buttonClasses = "w-full text-left p-3 sm:p-4 rounded-xl border-2 flex items-center transition-all duration-300 ";
          
          // Određivanje stanja dugmeta i kružića
          const isSelected = index === selectedOption;
          const isCorrectOption = index === currentQuestion.correctOption;
          const isCorrectlySelected = isSelected && isCorrectOption;
          const isIncorrectlySelected = isSelected && !isCorrectOption;
          
          // Stilovi za dugme u zavisnosti od stanja
          if (answerSubmitted) {
            if (isCorrectOption) {
              buttonClasses += "border-success bg-success/10 shadow-[0_0_12px_rgba(34,197,94,0.2)] ";
            } else if (isIncorrectlySelected) {
              buttonClasses += "border-error bg-error/10 ";
            } else {
              buttonClasses += "border-gray-200 opacity-70 ";
            }
          } else {
            buttonClasses += !answerSubmitted ? 
              "hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] active:shadow-[0_2px_4px_rgba(0,0,0,0.05)] " +
              "hover:translate-y-[-1px] active:translate-y-[1px] " : "";
            
            if (isSelected) {
              buttonClasses += "border-success bg-success/5 shadow-[0_0_10px_rgba(34,197,94,0.15)] ";
            } else {
              buttonClasses += "border-gray-200 active:bg-gray-50 ";
            }
          }
          
          return (
            <button 
              key={index}
              className={buttonClasses}
              onClick={() => handleOptionSelect(index)}
              disabled={answerSubmitted}
            >
              {/* Nema više kružića */}
              
              <span className="text-sm sm:text-base relative">
                {tQuizOption(
                  currentQuestion.quizId === 1 ? 'islamicHistory' : 'importantProphets',
                  currentQuestionIndex,
                  index
                ) || option}
                
                {/* Add subtle highlight for correct answer after submission */}
                {answerSubmitted && isCorrectOption && (
                  <span className="absolute -inset-1 bg-success/5 rounded-md -z-10"></span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Answer Feedback - bez kružića i plusa */}
      {answerSubmitted && (
        <div 
          className={`rounded-xl ${
            isCorrect 
              ? 'bg-success/10 border-success shadow-[0_0_15px_rgba(34,197,94,0.15)]' 
              : 'bg-error/10 border-error shadow-[0_0_15px_rgba(239,68,68,0.15)]'
          } p-3 sm:p-4 border-2 mb-4 sm:mb-6 transform transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-3`}
        >
          <div className="flex items-start">
            <div className="relative mr-2 mt-1">
              {/* Icon glow effect */}
              <div className={`absolute inset-0 blur-[3px] rounded-full ${
                isCorrect ? 'bg-success/30' : 'bg-error/30'
              } scale-150 animate-pulse`}></div>
              
              <Icon 
                name={isCorrect ? "check_circle" : "cancel"} 
                className={`${isCorrect ? 'text-success' : 'text-error'} relative z-10`} 
                is3D={true}
              />
            </div>
            
            <div className="relative">
              <h4 className={`font-bold ${isCorrect ? 'text-success' : 'text-error'} mb-1 text-sm sm:text-base flex items-center`}>
                {isCorrect ? t('quiz', 'correctAnswer') : t('quiz', 'incorrectAnswer')}
                
                {/* Small decorative dot */}
                <span className={`inline-block w-1.5 h-1.5 rounded-full ml-2 ${
                  isCorrect ? 'bg-success' : 'bg-error'
                }`}></span>
              </h4>
              
              <p className="text-xs sm:text-sm relative">
                <span className={`absolute -left-1 top-0 bottom-0 w-1 rounded-full ${
                  isCorrect ? 'bg-success/20' : 'bg-error/20'
                }`}></span>
                
                <span className="pl-2">
                  {tQuizContent(
                    currentQuestion.quizId === 1 ? 'islamicHistory' : 'importantProphets',
                    currentQuestionIndex,
                    'explanation'
                  ) || currentQuestion.explanation}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons - bez kružića sa plusevima */}
      <div className="flex justify-between">
        {/* Leva strelica za vraćanje nazad */}
        <Button
          variant="ghost"
          size="sm"
          className="text-primary font-medium flex items-center text-xs sm:text-sm relative overflow-hidden group"
          onClick={onPreviousQuestion}
          disabled={!canGoBack}
        >
          <div className="relative flex items-center">
            <div className="mr-1 relative">
              <Icon name="arrow_back" className="group-hover:-translate-x-1 transition-transform duration-300" />
            </div>
            <span className="group-hover:-translate-x-1 transition-transform duration-300">{t('general', 'previous')}</span>
          </div>
        </Button>
        
        {/* Desno Next dugme bez plusića */}
        <Button 
          variant="default" 
          size="sm"
          className="px-3 sm:px-6 py-2 sm:py-3 bg-primary text-white rounded-full font-bold flex items-center 
            shadow-[0_4px_10px_rgba(0,0,0,0.2)] 
            hover:shadow-[0_6px_14px_rgba(0,0,0,0.25)]
            hover:translate-y-[-2px]
            active:translate-y-[1px]
            active:shadow-[0_2px_5px_rgba(0,0,0,0.15)]
            transition-all duration-300 ease-out
            text-xs sm:text-sm"
          onClick={onNextQuestion}
          disabled={!answerSubmitted} // Uklanjamo canGoForward proveru jer može biti problem
        >
          <div className="relative flex items-center">
            {currentQuestionIndex === questions.length - 1 ? (
              <>
                <span className="relative z-10">{t('quiz', 'finishQuiz')}</span>
                <div className="ml-1 relative">
                  <Icon name="check" className="relative z-10" />
                </div>
              </>
            ) : (
              <>
                <span className="relative z-10">{t('general', 'next')}</span>
                <div className="ml-1 relative">
                  <Icon name="arrow_forward" className="relative z-10" />
                </div>
              </>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
