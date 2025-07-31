import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { Question, Quiz, Category } from '@shared/schema';
import { useUserContext } from './user-context';
import { useToast } from '@/hooks/use-toast';

interface QuizContextProps {
  selectedCategory: Category | null;
  selectedQuiz: Quiz | null;
  questions: Question[];
  quizzesForCategory: Quiz[];
  isLoadingQuizzes: boolean;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, number>;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
  isReviewing: boolean;
  correctAnswers: number;
  totalQuestions: number;
  earnedPoints: number;
  
  selectCategory: (category: Category) => void;
  selectQuiz: (quiz: Quiz) => void;
  startQuiz: () => void;
  submitAnswer: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  finishQuiz: () => Promise<void>;
  reviewAnswers: () => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

// Global context reference for access outside React components
let globalQuizContext: QuizContextProps | null = null;

// Add to window for debugging and direct access
if (typeof window !== 'undefined') {
  (window as any).quizContext = null;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const { user } = useUserContext();
  const { toast } = useToast();
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Fetch quizzes when a category is selected
  const { 
    data: quizzesForCategory = [] as Quiz[], 
    isLoading: isLoadingQuizzes 
  } = useQuery<Quiz[]>({
    queryKey: selectedCategory ? [`/api/categories/${selectedCategory.id}/quizzes`] : [],
    enabled: !!selectedCategory,
  });

  // Auto-select the first quiz when quizzes are loaded with better logging
  useEffect(() => {
    if (quizzesForCategory && quizzesForCategory.length > 0 && !selectedQuiz) {
      console.log(`🎯 Auto-selecting first quiz:`, quizzesForCategory[0]);
      selectQuiz(quizzesForCategory[0]);
    } else if (quizzesForCategory && quizzesForCategory.length === 0 && selectedCategory) {
      console.warn(`⚠️ No quizzes found for category "${selectedCategory.name}" (ID: ${selectedCategory.id})`);
    }
  }, [quizzesForCategory, selectedQuiz, selectedCategory]);

  // Fetch questions when a quiz is selected with retry logic
  const { 
    data: questions = [] as Question[],
    isLoading: isLoadingQuestions,
    isError: isErrorQuestions,
    refetch: refetchQuestions,
  } = useQuery<Question[]>({
    queryKey: selectedQuiz ? [`/api/quizzes/${selectedQuiz.id}/questions`] : [],
    enabled: !!selectedQuiz,
    retry: 3,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
  
  // Log question loading results with enhanced debugging
  useEffect(() => {
    if (selectedQuiz) {
      console.log(`Quiz ${selectedQuiz.id} state:`, {
        questionsCount: questions.length,
        isLoading: isLoadingQuestions,
        isError: isErrorQuestions,
        quizId: selectedQuiz.id,
        quizTitle: selectedQuiz.title
      });
      
      if (questions.length > 0) {
        console.log(`✅ Successfully loaded ${questions.length} questions for quiz "${selectedQuiz.title}" (ID: ${selectedQuiz.id})`);
        console.log('Questions:', questions.map(q => ({ id: q.id, text: q.text.substring(0, 50) + '...' })));
      } else if (isLoadingQuestions) {
        console.log(`⏳ Loading questions for quiz "${selectedQuiz.title}" (ID: ${selectedQuiz.id})...`);
      } else if (isErrorQuestions) {
        console.error(`❌ Failed to load questions for quiz "${selectedQuiz.title}" (ID: ${selectedQuiz.id})`);
        toast({
          title: "Error Loading Questions",
          description: `Could not load quiz questions. Please try again.`,
          variant: "destructive",
        });
      } else if (!isLoadingQuestions && questions.length === 0) {
        console.warn(`⚠️ No questions found for quiz "${selectedQuiz.title}" (ID: ${selectedQuiz.id}) - attempting retry...`);
        // Retry loading questions after a short delay
        setTimeout(() => {
          refetchQuestions();
        }, 1000);
      }
    }
  }, [selectedQuiz, questions, isLoadingQuestions, isErrorQuestions, toast, refetchQuestions]);

  // Submit quiz results mutation
  const submitResultsMutation = useMutation({
    mutationFn: async (data: any) => {
      if (!user) throw new Error("User not logged in");
      return apiRequest('POST', `/api/users/${user.id}/progress`, data);
    },
    onSuccess: () => {
      // Invalidate user data to refresh points
      if (user) {
        queryClient.invalidateQueries({ queryKey: [`/api/users/${user.id}`] });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to save quiz results",
        variant: "destructive",
      });
      console.error("Failed to submit quiz results:", error);
    }
  });

  // Reset when quiz changes and force question loading
  useEffect(() => {
    if (selectedQuiz) {
      resetQuizState();
      // Force question loading after a short delay if they haven't loaded
      const timeoutId = setTimeout(() => {
        if (questions.length === 0 && !isLoadingQuestions) {
          console.log('🔄 Forcing question reload for quiz:', selectedQuiz.title);
          refetchQuestions();
        }
      }, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedQuiz, questions.length, isLoadingQuestions, refetchQuestions]);

  const resetQuizState = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setIsQuizStarted(false);
    setIsQuizFinished(false);
    setIsReviewing(false);
    setCorrectAnswers(0);
    setEarnedPoints(0);
  };

  const selectCategory = (category: Category) => {
    console.log(`🏷️ Selecting category: "${category.name}" (ID: ${category.id})`);
    setSelectedCategory(category);
    setSelectedQuiz(null);
    resetQuizState();
  };

  const selectQuiz = (quiz: Quiz) => {
    console.log(`📝 Selecting quiz: "${quiz.title}" (ID: ${quiz.id})`);
    setSelectedQuiz(quiz);
  };

  const startQuiz = () => {
    console.log(`🚀 Starting quiz with ${questions.length} questions`);
    setIsQuizStarted(true);
    setIsQuizFinished(false);
    setIsReviewing(false);
  };

  const submitAnswer = (questionId: number, selectedOption: number, isCorrect: boolean) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = async () => {
    console.log("finishQuiz function called");
    if (!user || !selectedQuiz) {
      console.log("No user or quiz selected, can't finish quiz");
      // Always set isQuizFinished to true regardless of user or API
      setIsQuizFinished(true);
      return;
    }

    // Calculate points - 10 points per correct answer
    const points = correctAnswers * 10;
    setEarnedPoints(points);
    
    // Calculate score as percentage
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Set quiz finished immediately to improve user experience
    setIsQuizFinished(true);

    // Submit results to API (we don't wait for this to complete)
    try {
      submitResultsMutation.mutate({
        quizId: selectedQuiz.id,
        score,
        completed: true,
        correctAnswers,
        incorrectAnswers: questions.length - correctAnswers
      });
    } catch (error) {
      console.error("Error submitting quiz results:", error);
    }
  };

  const reviewAnswers = () => {
    setIsReviewing(true);
    setCurrentQuestionIndex(0);
    setIsQuizFinished(false);
  };

  const resetQuiz = () => {
    resetQuizState();
    setSelectedQuiz(null);
  };

  const totalQuestions = questions.length;
  
  const value: QuizContextProps = {
    selectedCategory,
    selectedQuiz,
    questions,
    quizzesForCategory,
    isLoadingQuizzes,
    currentQuestionIndex,
    selectedAnswers,
    isQuizStarted,
    isQuizFinished,
    isReviewing,
    correctAnswers,
    totalQuestions,
    earnedPoints,
    
    selectCategory,
    selectQuiz,
    startQuiz,
    submitAnswer,
    nextQuestion,
    previousQuestion,
    finishQuiz,
    reviewAnswers,
    resetQuiz
  };
  
  // Update the global reference
  globalQuizContext = value;
  
  // Update window reference for direct access
  if (typeof window !== 'undefined') {
    (window as any).quizContext = value;
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
}
