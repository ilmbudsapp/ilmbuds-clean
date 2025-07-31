import React, { useState } from 'react';
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
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
// Import the data from catechism
import { islamicBeliefsData } from '@/pages/catechism';

export default function Beliefs() {
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
            <Icon name="arrow-left" className="text-xl mr-1" />
            {currentLanguage === 'en' ? 'Back to Catechism' : 
             currentLanguage === 'sq' ? 'Kthehu te Ilmihal' : 
             currentLanguage === 'de' ? 'Zurück zu Katechismus' :
             currentLanguage === 'it' ? 'Torna a Catechismo' :
             'Nazad na Ilmihal'}
          </Button>
          <Icon name="mosque" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? 'Islamic Beliefs' : 
             currentLanguage === 'sq' ? 'Shartët e Imanit' : 
             currentLanguage === 'de' ? 'Islamische Glaubenslehre' :
             currentLanguage === 'it' ? 'Credenze Islamiche' :
             'Šest Imanskih šarti'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {islamicBeliefsData.map(belief => (
              <Card 
                key={belief.id}
                className="cursor-pointer transition-all hover:shadow-md"
                onClick={() => setLocation(`/belief/${belief.id}`)}
              >
                <CardHeader className="p-4 pb-2">
                  <div 
                    className="w-full aspect-video rounded-md mb-3 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${belief.imageUrl})` }}
                  />
                  <CardTitle className="text-md font-bold">
                    {currentLanguage === 'sq' && belief.albanianTitle ? belief.albanianTitle : 
                     currentLanguage === 'bs' && belief.bosnianTitle ? belief.bosnianTitle : 
                     currentLanguage === 'de' && belief.germanTitle ? belief.germanTitle :
                     currentLanguage === 'it' && belief.italianTitle ? belief.italianTitle :
                     belief.title}
                  </CardTitle>
                  <CardDescription>
                    {currentLanguage === 'sq' && belief.albanianDescription ? belief.albanianDescription : 
                     currentLanguage === 'bs' && belief.bosnianDescription ? belief.bosnianDescription : 
                     currentLanguage === 'de' && belief.germanDescription ? belief.germanDescription :
                     currentLanguage === 'it' && belief.italianDescription ? belief.italianDescription :
                     belief.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}