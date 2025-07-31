import React from 'react';
import { useLocation } from 'wouter';
import { Icon } from '@/components/ui/icons';
import { useUserContext } from '@/context/user-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Navbar } from '@/components/navbar';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// Import the data from catechism
import { ablutionGuideContent } from '@/pages/catechism';

export default function Ablution() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();

  // Handle back button
  const handleBack = () => {
    setLocation('/catechism');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pb-16">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="mr-2 text-white" 
            onClick={handleBack}
          >
            <Icon name="arrow-left" className="text-xl" />
          </Button>
          <Icon name="mosque" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? 'Ablution Guide - al Wudu' : 
             currentLanguage === 'sq' ? 'Si të marrim abdest' : 
             currentLanguage === 'de' ? 'Anleitung zur rituellen Waschung - al Wudu' : 
             currentLanguage === 'it' ? 'Guida all\'abluzione - al Wudu' :
             'Objašnjenje kako se uzima abdest slikovito'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentLanguage === 'sq' 
                  ? ablutionGuideContent.albanianTitle 
                  : currentLanguage === 'bs'
                  ? ablutionGuideContent.bosnianTitle
                  : currentLanguage === 'de'
                  ? ablutionGuideContent.germanTitle
                  : currentLanguage === 'it'
                  ? ablutionGuideContent.italianTitle
                  : ablutionGuideContent.title}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'en' 
                  ? 'Complete guide for performing ablution (al-Wudu) correctly before prayer.' 
                  : currentLanguage === 'sq'
                  ? 'Udhëzues i plotë për kryerjen e abdesit (al-Wudu) para namazit në mënyrë të saktë.'
                  : currentLanguage === 'de'
                  ? 'Vollständige Anleitung zur korrekten Durchführung der rituellen Waschung (al-Wudu) vor dem Gebet.'
                  : currentLanguage === 'it'
                  ? 'Guida completa per eseguire correttamente l\'abluzione (al-Wudu) prima della preghiera.'
                  : 'Kompletan vodič za pravilno uzimanje abdesta prije namaza.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="mb-6 max-w-full">
                  <img 
                    src={ablutionGuideContent.imageUrl} 
                    alt={currentLanguage === 'sq' 
                         ? "Si të marrim abdest" 
                         : currentLanguage === 'de' 
                         ? "Anleitung zur rituellen Waschung - al Wudu"
                         : currentLanguage === 'it'
                         ? "Guida all'abluzione - al Wudu"
                         : "Ablution Guide - al Wudu"}
                    className="rounded-lg shadow-md max-w-full"
                  />
                </div>
                <div className="mt-4 whitespace-pre-line">
                  <h3 className="text-lg font-semibold mb-2">
                    {currentLanguage === 'en' 
                      ? 'Steps:' 
                      : currentLanguage === 'sq' 
                      ? 'Hapat:'
                      : currentLanguage === 'de'
                      ? 'Schritte:'
                      : currentLanguage === 'it'
                      ? 'Passi:'
                      : 'Koraci:'}
                  </h3>
                  <p className="text-md">
                    {currentLanguage === 'sq'
                      ? ablutionGuideContent.albanianSteps
                      : currentLanguage === 'bs'
                      ? ablutionGuideContent.bosnianSteps
                      : currentLanguage === 'de'
                      ? ablutionGuideContent.germanSteps
                      : currentLanguage === 'it'
                      ? ablutionGuideContent.italianSteps
                      : ablutionGuideContent.steps}
                  </p>
                </div>
                
                <div className="mt-8 w-full flex justify-center">
                  <Button 
                    variant="default" 
                    className="bg-purple-700 hover:bg-purple-800 text-white"
                    onClick={handleBack}
                  >
                    {currentLanguage === 'en' ? 'GO BACK' : 
                     currentLanguage === 'sq' ? 'KTHEHU PRAPA' : 
                     currentLanguage === 'de' ? 'ZURÜCK' : 
                     currentLanguage === 'it' ? 'TORNA INDIETRO' : 
                     'VRATI SE NAZAD'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Navbar />
    </div>
  );
}