import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { CategorySelector } from '@/components/category-selector';
import { useQuizContext } from '@/context/quiz-context';
import { useUserContext } from '@/context/user-context';
import { useLanguage } from '@/context/language-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Icon } from '@/components/ui/icons';
import { playSound } from '@/lib/sounds';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';

// Define feature card type
type FeatureCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  path: string;
};

export default function Topics() {
  const { user } = useUserContext();
  const { selectCategory } = useQuizContext();
  const [_, setLocation] = useLocation();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("quizzes");
  
  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['/api/categories'],
  });
  
  const handleSelectCategory = (category: any) => {
    // Only navigate to quiz for quiz categories
    if (category.folder === "QUIZ") {
      playSound('click');
      selectCategory(category);
      setLocation('/quiz');
    } else {
      // For specialized sections, navigate to their dedicated pages
      playSound('click');
      switch(category.folder) {
        case "THE QURAN FOR CHILDREN":
          setLocation('/quran');
          break;
        case "ISLAMIC STORIES":
          setLocation('/stories');
          break;
        case "ILMIHAL":
          setLocation('/ilmihal');
          break;
        default:
          // Default to quiz for any other folder types
          selectCategory(category);
          setLocation('/quiz');
      }
    }
  };

  // Get current language
  const { currentLanguage } = useLanguage();
  
  // Define feature cards for other Islamic learning sections with translations
  const featureCards: FeatureCard[] = [
    {
      id: "quran",
      title: currentLanguage === 'en' ? "Quran for Children" : 
             currentLanguage === 'sq' ? "Kurani për Fëmijë" : 
             currentLanguage === 'de' ? "Koran für Kinder" :
             currentLanguage === 'it' ? "Corano per Bambini" :
             currentLanguage === 'tr' ? "Çocuklar için Kuran" :
             "Kuran za Djecu",
      description: currentLanguage === 'en' ? "Learn and memorize surahs with interactive features designed for young learners." : 
                   currentLanguage === 'sq' ? "Mëso dhe memorizoni suret me funksione interaktive të dizajnuara për nxënësit e rinj." : 
                   currentLanguage === 'de' ? "Lerne und memoriere Suren mit interaktiven Funktionen, die für junge Lernende konzipiert sind." :
                   currentLanguage === 'it' ? "Impara e memorizza le sure con funzionalità interattive progettate per giovani studenti." :
                   currentLanguage === 'tr' ? "Genç öğreniciler için tasarlanmış interaktif özelliklerle sureleri öğrenin ve ezberleyin." :
                   "Naučite i memorirajte sure s interaktivnim funkcijama dizajniranim za mlade učenike.",
      icon: "menu_book",
      iconColor: "rgb(22, 163, 74)",
      bgColor: "rgb(240, 253, 244)",
      path: "/quran"
    },
    {
      id: "stories",
      title: currentLanguage === 'en' ? "Islamic Stories" : 
             currentLanguage === 'sq' ? "Tregime Islame" : 
             currentLanguage === 'de' ? "Islamische Geschichten" :
             currentLanguage === 'it' ? "Storie Islamiche" :
             currentLanguage === 'tr' ? "İslami Hikayeler" :
             "Islamske Priče",
      description: currentLanguage === 'en' ? "Discover inspiring stories from Islamic tradition, prophets and companions." : 
                   currentLanguage === 'sq' ? "Zbuloni tregime frymëzuese nga tradita islamike, profetët dhe shokët." : 
                   currentLanguage === 'de' ? "Entdecke inspirierende Geschichten aus islamischer Tradition, über Propheten und Gefährten." :
                   currentLanguage === 'it' ? "Scopri storie ispiratrici della tradizione islamica, profeti e compagni." :
                   currentLanguage === 'tr' ? "İslam geleneğinden ilham verici hikayeler, peygamberler ve sahabeleri keşfedin." :
                   "Otkrijte inspirativne priče iz islamske tradicije, o poslanicima i ashabima.",
      icon: "auto_stories",
      iconColor: "rgb(219, 39, 119)",
      bgColor: "rgb(253, 242, 248)",
      path: "/stories"
    },
    {
      id: "ilmihal",
      title: "ILMIHAL",
      description: currentLanguage === 'en' ? "Learn the fundamentals of Islam including ablution, prayer, and core beliefs." : 
                   currentLanguage === 'sq' ? "Mëso bazat e Islamit, përfshirë abdesin, namazin dhe besimet themelore." : 
                   currentLanguage === 'de' ? "Lerne die Grundlagen des Islam, einschließlich Waschung, Gebet und Grundüberzeugungen." :
                   currentLanguage === 'it' ? "Impara i fondamenti dell'Islam inclusi abluzione, preghiera e credenze fondamentali." :
                   currentLanguage === 'tr' ? "Abdest, namaz ve temel inançlar dahil İslam'ın temellerini öğrenin." :
                   "Naučite osnove islama, uključujući abdest, namaz i osnovna vjerovanja.",
      icon: "school",
      iconColor: "rgb(2, 132, 199)",
      bgColor: "rgb(240, 249, 255)",
      path: "/ilmihal"
    }
  ];
  
  const handleFeatureCardClick = (path: string) => {
    playSound('click');
    setLocation(path);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50">
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="category" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? "Islamic Learning" : 
             currentLanguage === 'sq' ? "Mësimi Islamik" : 
             currentLanguage === 'de' ? "Islamisches Lernen" :
             currentLanguage === 'it' ? "Apprendimento Islamico" :
             currentLanguage === 'tr' ? "İslami Öğrenme" :
             "Islamsko Učenje"}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto px-4 py-6">
        <Tabs defaultValue="quizzes" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="quizzes">
              {currentLanguage === 'en' ? "Quiz Topics" : 
               currentLanguage === 'sq' ? "Temat e Kuizit" : 
               currentLanguage === 'de' ? "Quiz-Themen" :
               currentLanguage === 'it' ? "Argomenti del Quiz" :
               "Teme Kviza"}
            </TabsTrigger>
            <TabsTrigger value="features">
              {currentLanguage === 'en' ? "Other Features" : 
               currentLanguage === 'sq' ? "Funksione të Tjera" : 
               currentLanguage === 'de' ? "Andere Funktionen" :
               currentLanguage === 'it' ? "Altre Funzionalità" :
               "Ostale Funkcije"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quizzes" className="mt-4">
            {isLoading ? (
              <p className="text-center py-4">
                {currentLanguage === 'en' ? "Loading categories..." : 
                 currentLanguage === 'sq' ? "Duke ngarkuar kategoritë..." : 
                 currentLanguage === 'de' ? "Kategorien werden geladen..." :
                 currentLanguage === 'it' ? "Caricamento categorie..." :
                 "Učitavanje kategorija..."}
              </p>
            ) : (
              <CategorySelector 
                categories={(categories || []).filter((cat: any) => !cat.folder || cat.folder === "QUIZ")} 
                onSelectCategory={handleSelectCategory} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="features" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureCards.map(card => (
                <Card 
                  key={card.id} 
                  className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
                  onClick={() => handleFeatureCardClick(card.path)}
                  style={{ backgroundColor: card.bgColor }}
                >
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: `${card.iconColor}20` }}>
                      <Icon name={card.icon} className={`text-2xl`} />
                    </div>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button variant="outline" className="w-full">
                      {currentLanguage === 'en' ? "Explore" : 
                       currentLanguage === 'sq' ? "Eksploro" : 
                       currentLanguage === 'de' ? "Erkunden" :
                       currentLanguage === 'it' ? "Esplora" :
                       "Istraži"} {card.title}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Navbar />
    </div>
  );
}
