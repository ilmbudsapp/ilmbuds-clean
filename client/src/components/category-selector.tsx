import React from 'react';
import { Icon, StarRating } from '@/components/ui/icons';
import { Category } from '@shared/schema';
import { useTranslation } from '@/hooks/use-translation';

type CategorySelectorProps = {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
};

export function CategorySelector({ categories, onSelectCategory }: CategorySelectorProps) {
  const { t, tCategory } = useTranslation();
  
  // Group categories by folder
  const categoriesByFolder = categories.reduce((acc, category) => {
    const folder = category.folder || 'QUIZ';
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(category);
    return acc;
  }, {} as Record<string, Category[]>);
  
  return (
    <div>
      {Object.entries(categoriesByFolder).map(([folder, folderCategories]) => (
        <div key={folder} className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            {folder === 'QUIZ' ? t('topics', 'exploreTopics') : folder}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {folderCategories.map((category, index) => {
              // Calculate difficulty stars (1-3)
              const difficultyStars = Math.min(Math.max(category.difficulty, 1), 3);
              
              return (
                <div 
                  key={category.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => onSelectCategory(category)}
                >
                  <div 
                    className="h-24 flex items-center justify-center overflow-hidden relative"
                    style={{ backgroundColor: category.backgroundColor }}
                  >
                    {/* Animated background effects for 3D appearance */}
                    <div className="absolute inset-0 opacity-20" 
                      style={{
                        background: `radial-gradient(circle at 30% 40%, ${category.iconColor}40, transparent 60%), 
                                    radial-gradient(circle at 70% 60%, ${category.iconColor}30, transparent 50%)`,
                      }}
                    />
                    
                    {/* Shiny line effect that moves on hover */}
                    <div className="absolute inset-0 opacity-30 transition-all duration-700 ease-in-out"
                      style={{
                        background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.7) 50%, transparent 60%)',
                        backgroundSize: '200% 200%',
                        animation: 'shine 3s infinite ease-in-out',
                      }}
                    />
                    
                    {/* Large Metallic 3D Icon without shadow */}
                    <Icon 
                      name={category.icon} 
                      className="text-6xl relative z-10" 
                      color={category.iconColor}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold">{tCategory(categories.findIndex(c => c.id === category.id))}</h3>
                    <div className="flex mt-1">
                      <StarRating rating={difficultyStars} />
                      <span className="text-xs ml-1 text-gray-600">
                        {category.totalQuizzes} {t('topics', 'quizzes')}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
