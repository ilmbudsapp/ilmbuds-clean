import { Category } from '@shared/schema';

interface QuizContext {
  selectedCategory: Category | null;
  selectCategory: (category: Category) => void;
  [key: string]: any;
}

interface Window {
  isBosanski?: boolean;
  quizContext?: QuizContext;
}