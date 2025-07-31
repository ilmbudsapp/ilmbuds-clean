import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { QuizContainer } from '@/components/quiz-container';
import { QuizComplete } from '@/components/quiz-complete';
import { Celebration } from '@/components/celebration';
import { useQuizContext } from '@/context/quiz-context';
import { useUserContext } from '@/context/user-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Icon } from '@/components/ui/icons';
import audioService from '@/services/audio-service';
import { Button } from '@/components/ui/button';

export default function Quiz() {
  const [_, setLocation] = useLocation();
  const { user } = useUserContext();
  const { 
    selectedCategory,
    selectedQuiz,
    questions,
    currentQuestionIndex,
    selectedAnswers,
    isQuizStarted,
    isQuizFinished,
    isReviewing,
    correctAnswers,
    totalQuestions,
    earnedPoints,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    reviewAnswers,
    resetQuiz
  } = useQuizContext();
  
  const [showCelebration, setShowCelebration] = useState(false);
  
  // Initialize and handle selected category with enhanced loading logic
  useEffect(() => {
    // Auto-start the quiz when opening this page if a category is already selected and questions are loaded
    if (selectedCategory && questions.length > 0 && !isQuizStarted && !isQuizFinished) {
      console.log('✅ Auto-starting quiz with', questions.length, 'questions for category:', selectedCategory.name);
      startQuiz();
      audioService.playBismillah();
    } else if (selectedCategory && questions.length === 0) {
      console.log('⏳ Category selected but waiting for questions to load...', {
        category: selectedCategory.name,
        questionsCount: questions.length,
        isQuizStarted,
        isQuizFinished
      });
    }
  }, [selectedCategory, questions, isQuizStarted, isQuizFinished, startQuiz]);
  
  // Set default category if none is selected
  useEffect(() => {
    if (!selectedCategory) {
      // Try to get category from sessionStorage as fallback
      const storedCategory = sessionStorage.getItem('selectedCategory');
      if (storedCategory) {
        try {
          const category = JSON.parse(storedCategory);
          console.log('Loaded category from sessionStorage:', category.name);
          
          // Redirect to categories page to properly select a category
          console.log('Redirecting to categories page');
          setLocation('/quiz-categories');
        } catch (error) {
          console.error('Failed to parse stored category:', error);
          setLocation('/');
        }
      } else {
        // If quiz page is accessed directly without a category, redirect to home
        console.log('No category selected, redirecting to home');
        setLocation('/');
      }
    } else {
      console.log('Current selected category:', selectedCategory.name, 'ID:', selectedCategory.id);
    }
  }, [selectedCategory]);
  
  // Play finish sound when quiz is completed
  useEffect(() => {
    if (isQuizFinished) {
      audioService.playAllahuEkber(); // Play Allahu Ekber to celebrate completion
    }
  }, [isQuizFinished]);
  
  const handleAnswerSubmit = (questionId: number, selectedOption: number, isCorrect: boolean) => {
    submitAnswer(questionId, selectedOption, isCorrect);
    
    if (isCorrect) {
      setShowCelebration(true);
    }
  };
  
  const handleNextQuestion = () => {
    // If this is the last question and not reviewing, finish the quiz
    if (currentQuestionIndex === questions.length - 1 && !isReviewing) {
      console.log("Finishing quiz...");
      // Ensure finishQuiz is called correctly
      finishQuiz().catch(error => {
        console.error("Failed to finish quiz:", error);
      });
    } else {
      nextQuestion();
    }
  };
  
  const handleNewQuiz = () => {
    resetQuiz();
    setLocation('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-50">
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2 p-1 text-white" 
            onClick={() => setLocation('/')}
          >
            <Icon name="arrow_back" className="text-2xl" />
          </Button>
          <h1 className="text-lg font-bold">
            {selectedCategory?.name || "Quiz"}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto px-4 py-6">
        {isQuizFinished ? (
          <QuizComplete 
            correctAnswers={correctAnswers}
            totalQuestions={totalQuestions}
            earnedPoints={earnedPoints}
            onReviewAnswers={reviewAnswers}
            onNewQuiz={handleNewQuiz}
          />
        ) : (
          <>
            {questions.length > 0 && isQuizStarted ? (
              <QuizContainer 
                questions={questions}
                currentQuestionIndex={currentQuestionIndex}
                onAnswerSubmit={handleAnswerSubmit}
                onNextQuestion={handleNextQuestion}
                onPreviousQuestion={previousQuestion}
                canGoBack={currentQuestionIndex > 0}
                canGoForward={
                  isReviewing || 
                  selectedAnswers[questions[currentQuestionIndex]?.id] !== undefined
                }
                selectedAnswers={selectedAnswers}
              />
            ) : (
              <div className="bg-white rounded-2xl p-5 shadow-lg mb-6 text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon name="quiz" className="text-2xl text-primary" />
                  </div>
                  <p className="text-lg font-semibold mb-2">
                    {questions.length === 0 ? 
                      "Loading Quiz Questions..." : 
                      "Preparing Quiz..."
                    }
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedCategory?.name || "Quiz"} • {questions.length} questions
                  </p>
                  {questions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-green-600">
                        ✅ {questions.length} questions loaded. Starting quiz...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
        
        <Celebration 
          isVisible={showCelebration} 
          onComplete={() => setShowCelebration(false)} 
        />
      </main>
    </div>
  );
}
