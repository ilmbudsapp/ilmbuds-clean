import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { Category } from '@shared/schema';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuizContext } from '@/context/quiz-context';
import { useLanguage } from '@/context/language-context';
import { useTranslation } from '@/hooks/use-translation';
import audioService from '@/services/audio-service';

// Material Icons
type IconProps = {
  name: string;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, className = "" }) => {
  return (
    <span className={`material-icons ${className}`}>{name}</span>
  );
};

// Simplified Navbar component for now
const Navbar = () => {
  return (
    <div className="flex justify-center fixed bottom-0 left-0 right-0 bg-white shadow-md p-2">
      <div className="flex space-x-6">
        <a href="/" className="text-primary flex flex-col items-center">
          <Icon name="home" className="text-xl" />
          <span className="text-xs">Home</span>
        </a>
        <a href="/quiz-categories" className="text-primary flex flex-col items-center">
          <Icon name="quiz" className="text-xl" />
          <span className="text-xs">Quiz</span>
        </a>
      </div>
    </div>
  );
};

export default function QuizCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();
  const { selectCategory } = useQuizContext();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    setLoading(true);
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load categories:', err);
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category: Category) => {
    // Play the Bismillah sound when a category is selected
    audioService.playBismillah();
    
    // Select the category in the context
    selectCategory(category);
    
    // Store the category in session storage for fallback
    sessionStorage.setItem('selectedCategory', JSON.stringify(category));
    
    // Navigate to the quiz page
    setLocation('/quiz');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-primary/20 to-primary/5 relative overflow-hidden">
      {/* Beautiful Islamic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
          {/* Large geometric pattern */}
          <defs>
            <pattern id="mainIslamicPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <g className="text-primary">
                {/* Central star pattern */}
                <path d="M60 20L70 40L90 40L75 55L80 75L60 65L40 75L45 55L30 40L50 40L60 20Z" fill="currentColor" opacity="0.3"/>
                <circle cx="60" cy="60" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
                
                {/* Corner ornaments */}
                <path d="M10 10L20 20L10 30L0 20L10 10Z" fill="currentColor" opacity="0.2"/>
                <path d="M110 10L120 20L110 30L100 20L110 10Z" fill="currentColor" opacity="0.2"/>
                <path d="M10 90L20 100L10 110L0 100L10 90Z" fill="currentColor" opacity="0.2"/>
                <path d="M110 90L120 100L110 110L100 100L110 90Z" fill="currentColor" opacity="0.2"/>
                
                {/* Connecting lines */}
                <line x1="30" y1="60" x2="90" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
                <line x1="60" y1="30" x2="60" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              </g>
            </pattern>
            
            {/* Secondary smaller pattern */}
            <pattern id="secondaryPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <g className="text-amber-600">
                <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.2"/>
                <path d="M30 15L35 25L30 35L25 25L30 15Z" fill="currentColor" opacity="0.15"/>
              </g>
            </pattern>
          </defs>
          
          {/* Apply patterns */}
          <rect width="100%" height="100%" fill="url(#mainIslamicPattern)"/>
          
          {/* Overlay secondary pattern with offset */}
          <g transform="translate(30, 30)">
            <rect width="100%" height="100%" fill="url(#secondaryPattern)"/>
          </g>
          
          {/* Large decorative mosque silhouettes */}
          <g className="text-primary" transform="translate(650, 450)" opacity="0.08">
            <path d="M0 100L20 60L40 70L60 50L80 60L100 40L120 60L100 100Z" fill="currentColor"/>
            <rect x="25" y="70" width="8" height="30" fill="currentColor"/>
            <rect x="65" y="60" width="8" height="40" fill="currentColor"/>
            <circle cx="29" cy="65" r="4" fill="currentColor"/>
            <circle cx="69" cy="55" r="4" fill="currentColor"/>
          </g>
          
          <g className="text-amber-600" transform="translate(50, 400)" opacity="0.06">
            <path d="M0 80L15 50L30 55L45 40L60 50L75 30L90 50L75 80Z" fill="currentColor"/>
            <rect x="20" y="55" width="6" height="25" fill="currentColor"/>
            <rect x="50" y="50" width="6" height="30" fill="currentColor"/>
            <circle cx="23" cy="52" r="3" fill="currentColor"/>
            <circle cx="53" cy="47" r="3" fill="currentColor"/>
          </g>
          
          {/* Crescent and star decorations */}
          <g className="text-primary" transform="translate(150, 100)" opacity="0.1">
            <path d="M25 20C25 30 20 40 10 40C20 40 25 50 25 60C35 50 45 40 45 30C45 20 35 10 25 10C25 13.33 25 16.67 25 20Z" fill="currentColor"/>
            <path d="M65 30L68 38L76 38L70 43L73 51L65 47L57 51L60 43L54 38L62 38Z" fill="currentColor"/>
          </g>
          
          <g className="text-amber-600" transform="translate(600, 150)" opacity="0.08">
            <path d="M20 15C20 22 16 30 8 30C16 30 20 38 20 45C28 38 36 30 36 22C36 15 28 7 20 7C20 9.67 20 12.33 20 15Z" fill="currentColor"/>
            <path d="M50 22L52 28L58 28L54 32L56 38L50 35L44 38L46 32L42 28L48 28Z" fill="currentColor"/>
          </g>
          
          {/* Arabic calligraphy-inspired flowing lines */}
          <g className="text-primary" opacity="0.05">
            <path d="M100 200Q200 180 300 200T500 220Q600 200 700 220" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M50 350Q150 330 250 350T450 370Q550 350 650 370" fill="none" stroke="currentColor" strokeWidth="2"/>
          </g>
          
          {/* Decorative border elements */}
          <g className="text-amber-600" opacity="0.1">
            {/* Top border decoration */}
            <path d="M0 0L800 0L800 20Q400 40 0 20Z" fill="currentColor"/>
            {/* Bottom border decoration */}
            <path d="M0 580Q400 560 800 580L800 600L0 600Z" fill="currentColor"/>
          </g>
        </svg>
      </div>
      <header className="bg-primary text-white p-4 flex justify-between items-center shadow-md relative z-10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2 p-1 text-white" 
            onClick={() => setLocation('/')}
          >
            <Icon name="arrow_back" className="text-2xl" />
          </Button>
          <h1 className="text-xl font-bold">{t('topics', 'selectCategory')}</h1>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 relative z-10">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
            <Button 
              variant="outline" 
              className="mt-2" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`overflow-hidden cursor-pointer border-2 hover:border-primary transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                    category.name === 'History of Islam' 
                      ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200 relative' 
                      : 'hover:border-primary transition-colors'
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {/* Special background for History of Islam */}
                  {category.name === 'History of Islam' && (
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                        {/* Islamic geometric pattern */}
                        <defs>
                          <pattern id="islamicPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M20 0L30 15L20 30L10 15L20 0Z" fill="currentColor" opacity="0.3"/>
                            <circle cx="20" cy="20" r="3" fill="currentColor" opacity="0.4"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#islamicPattern)" className="text-amber-600"/>
                        
                        {/* Mosque silhouette */}
                        <g className="text-amber-700" transform="translate(300, 120)">
                          <path d="M0 50L10 30L20 35L30 25L40 30L50 20L60 30L50 50Z" fill="currentColor" opacity="0.15"/>
                          <rect x="15" y="35" width="4" height="15" fill="currentColor" opacity="0.2"/>
                          <rect x="35" y="30" width="4" height="20" fill="currentColor" opacity="0.2"/>
                          <circle cx="17" cy="32" r="2" fill="currentColor" opacity="0.25"/>
                          <circle cx="37" cy="27" r="2" fill="currentColor" opacity="0.25"/>
                        </g>
                        
                        {/* Crescent and star */}
                        <g className="text-amber-600" transform="translate(50, 30)">
                          <path d="M15 10C15 15 10 20 5 20C10 20 15 25 15 30C20 25 25 20 25 15C25 10 20 5 15 5C15 6.67 15 8.33 15 10Z" fill="currentColor" opacity="0.2"/>
                          <path d="M35 15L37 20L42 20L38 23L40 28L35 25L30 28L32 23L28 20L33 20Z" fill="currentColor" opacity="0.2"/>
                        </g>
                      </svg>
                    </div>
                  )}
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full mr-3 ${
                        category.name === 'History of Islam' 
                          ? 'bg-gradient-to-br from-amber-100 to-orange-100 border-2 border-amber-200 shadow-md' 
                          : 'bg-primary/10'
                      }`}>
                        <Icon 
                          name={category.name === 'History of Islam' ? "account_balance" : (category.icon || "category")} 
                          className={`text-2xl ${
                            category.name === 'History of Islam' 
                              ? 'text-amber-700' 
                              : 'text-primary'
                          }`} 
                        />
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg mb-1 ${
                          category.name === 'History of Islam' 
                            ? 'text-amber-800 drop-shadow-sm' 
                            : ''
                        }`}>
                          {category.name === 'History of Islam' && 
                            (currentLanguage === 'en' ? 'History of Islam' :
                             currentLanguage === 'sq' ? 'Historia e Islamit' :
                             currentLanguage === 'de' ? 'Geschichte des Islams' :
                             currentLanguage === 'it' ? 'Storia dell\'Islam' :
                             'Historija Islama')}
                          {category.name === 'Five Pillars' && 
                            (currentLanguage === 'en' ? 'Five Pillars' :
                             currentLanguage === 'sq' ? 'Pesë shtyllat e Islamit' :
                             currentLanguage === 'de' ? 'Die fünf Säulen' :
                             currentLanguage === 'it' ? 'I cinque pilastri' :
                             'Pet stupova Islama')}
                          {category.name === 'Prophets' && 
                            (currentLanguage === 'en' ? 'Prophets' :
                             currentLanguage === 'sq' ? 'Pejgamberët' :
                             currentLanguage === 'de' ? 'Propheten' :
                             currentLanguage === 'it' ? 'Profeti' :
                             'Poslanici')}
                          {category.name === 'Quran' && 
                            (currentLanguage === 'en' ? 'Quran' :
                             currentLanguage === 'sq' ? 'Kuran' :
                             currentLanguage === 'de' ? 'Koran' :
                             currentLanguage === 'it' ? 'Corano' :
                             'Kuran')}
                          {category.name === 'Quran for Children' && 
                            (currentLanguage === 'en' ? 'Quran for Children' :
                             currentLanguage === 'sq' ? 'Kurani për fëmijë' :
                             currentLanguage === 'de' ? 'Koran für Kinder' :
                             currentLanguage === 'it' ? 'Corano per bambini' :
                             'Kuran za djecu')}
                          {category.name === 'Islamic Stories' && 
                            (currentLanguage === 'en' ? 'Islamic Stories' :
                             currentLanguage === 'sq' ? 'Tregime Islame' :
                             currentLanguage === 'de' ? 'Islamische Geschichten' :
                             currentLanguage === 'it' ? 'Storie Islamiche' :
                             'Islamske priče')}
                          {category.name === 'ILMIHAL' && 
                            (currentLanguage === 'en' ? 'Catechism' :
                             currentLanguage === 'sq' ? 'Ilmihal' :
                             currentLanguage === 'de' ? 'Katechismus-Ilmihal' :
                             currentLanguage === 'it' ? 'Catechismo' :
                             'Ilmihal')}
                          {!['History of Islam', 'Five Pillars', 'Prophets', 'Quran', 'Quran for Children', 'Islamic Stories', 'ILMIHAL'].includes(category.name) && category.name}
                        </h3>
                        <p className={`text-sm ${
                          category.name === 'History of Islam' 
                            ? 'text-amber-700' 
                            : 'text-gray-600'
                        }`}>
                          {category.name === 'History of Islam' 
                            ? (currentLanguage === 'en' ? 'Explore the rich heritage of Islam' :
                               currentLanguage === 'sq' ? 'Zbuloni trashëgiminë e pasur të Islamit' :
                               currentLanguage === 'de' ? 'Entdecken Sie das reiche Erbe des Islam' :
                               currentLanguage === 'it' ? 'Esplora la ricca eredità dell\'Islam' :
                               'Istražite bogatu baštinu Islama')
                            : t('topics', 'tapToStart')
                          }
                        </p>
                        <div className="flex items-center mt-2">
                          <Icon name="star" className={`mr-1 ${
                            category.name === 'History of Islam' 
                              ? 'text-amber-500' 
                              : 'text-yellow-500'
                          }`} />
                          <span className={`text-sm ${
                            category.name === 'History of Islam' 
                              ? 'text-amber-700 font-medium' 
                              : ''
                          }`}>
                            {t('topics', 'difficultyLevel')}: {category.difficulty || 1}
                          </span>
                          {category.name === 'History of Islam' && (
                            <div className="ml-auto flex space-x-1">
                              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Islamic pattern decoration below History of Islam card */}
                {category.name === 'History of Islam' && (
                  <div className="mt-4 flex justify-center">
                    <div className="w-64 h-12 relative">
                      <svg className="w-full h-full" viewBox="0 0 256 48" fill="none">
                        {/* Central decorative pattern */}
                        <g className="text-amber-600">
                          {/* Main central motif */}
                          <path d="M128 6L140 18L128 30L116 18L128 6Z" fill="currentColor" opacity="0.4"/>
                          <circle cx="128" cy="18" r="3" fill="currentColor" opacity="0.6"/>
                          
                          {/* Side ornaments */}
                          <g transform="translate(80, 12)">
                            <path d="M0 6L8 12L0 18L-8 12L0 6Z" fill="currentColor" opacity="0.3"/>
                            <circle cx="0" cy="12" r="2" fill="currentColor" opacity="0.5"/>
                          </g>
                          
                          <g transform="translate(176, 12)">
                            <path d="M0 6L8 12L0 18L-8 12L0 6Z" fill="currentColor" opacity="0.3"/>
                            <circle cx="0" cy="12" r="2" fill="currentColor" opacity="0.5"/>
                          </g>
                          
                          {/* Outer decorative elements */}
                          <g transform="translate(40, 18)">
                            <path d="M0 3L4 6L0 9L-4 6L0 3Z" fill="currentColor" opacity="0.25"/>
                          </g>
                          
                          <g transform="translate(216, 18)">
                            <path d="M0 3L4 6L0 9L-4 6L0 3Z" fill="currentColor" opacity="0.25"/>
                          </g>
                          
                          {/* Connecting lines */}
                          <line x1="48" y1="18" x2="72" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                          <line x1="184" y1="18" x2="208" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                          
                          {/* Small dots pattern */}
                          <circle cx="60" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          <circle cx="64" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          <circle cx="68" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          
                          <circle cx="188" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          <circle cx="192" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          <circle cx="196" cy="18" r="1" fill="currentColor" opacity="0.4"/>
                          
                          {/* Arabesque curves */}
                          <path d="M20 18Q30 12 40 18Q30 24 20 18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                          <path d="M216 18Q226 12 236 18Q226 24 216 18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Navbar />
    </div>
  );
}