import { useCallback } from 'react';
import { useLanguage } from '@/context/language-context';
import { 
  getTranslation, 
  TranslationKeys, 
  getQuizContentTranslation, 
  getQuizOptionTranslation,
  getQuizTitleTranslation,
  getCategoryTranslation
} from '@shared/translations';

export function useTranslation() {
  const { currentLanguage } = useLanguage();

  const t = useCallback(
    (section: TranslationKeys, key: string) => {
      return getTranslation(section, key, currentLanguage);
    },
    [currentLanguage]
  );

  const tQuizContent = useCallback(
    (quizKey: 'islamicHistory' | 'importantProphets', questionIndex: number, field: 'text' | 'explanation') => {
      return getQuizContentTranslation(quizKey, questionIndex, field, currentLanguage);
    },
    [currentLanguage]
  );

  const tQuizOption = useCallback(
    (quizKey: 'islamicHistory' | 'importantProphets', questionIndex: number, optionIndex: number) => {
      return getQuizOptionTranslation(quizKey, questionIndex, optionIndex, currentLanguage);
    },
    [currentLanguage]
  );

  const tQuizTitle = useCallback(
    (quizKey: 'islamicHistory' | 'importantProphets') => {
      return getQuizTitleTranslation(quizKey, currentLanguage);
    },
    [currentLanguage]
  );

  const tCategory = useCallback(
    (index: number) => {
      return getCategoryTranslation(index, currentLanguage);
    },
    [currentLanguage]
  );

  return {
    t,
    tQuizContent,
    tQuizOption,
    tQuizTitle,
    tCategory,
    currentLanguage
  };
}