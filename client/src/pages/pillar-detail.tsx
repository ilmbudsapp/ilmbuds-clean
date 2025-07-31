import { useEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { useUserContext } from "@/context/user-context";
import { ProfileBadge } from "@/components/profile-badge";
import { Navbar } from "@/components/navbar";
import { fivePillarsData } from "./catechism";
import { Icon } from "@/components/ui/icons";

export default function PillarDetail() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/pillar/:id');
  const [pillar, setPillar] = useState<any>(null);

  useEffect(() => {
    if (params?.id) {
      const foundPillar = fivePillarsData.find(p => p.id === params.id);
      if (foundPillar) {
        setPillar(foundPillar);
      } else {
        // Redirect to catechism if pillar not found
        setLocation("/catechism");
      }
    }
  }, [params?.id, setLocation]);

  if (!pillar) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pb-16">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="mosque" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? 'Five Pillars of Islam' : 
             currentLanguage === 'sq' ? 'Pesë shtyllat e Islamit' : 
             currentLanguage === 'bs' ? 'Pet stubova Islama' : 
             currentLanguage === 'de' ? 'Die fünf Säulen des Islam' : 
             currentLanguage === 'it' ? 'I cinque pilastri dell\'Islam' :
             'Pet stubova Islama'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => {
              window.location.href = "/pillars";
              return false;
            }}
          >
            <Icon name="arrow-left" className="mr-2" />
            {currentLanguage === 'en' ? 'Back to Five Pillars of Islam' : 
             currentLanguage === 'sq' ? 'Kthehu te Pesë shtyllat e Islamit' : 
             currentLanguage === 'de' ? 'Zurück zu den fünf Säulen des Islam' :
             currentLanguage === 'it' ? 'Torna a I cinque pilastri dell\'Islam' :
             'Nazad na Pet stubova Islama'}
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <img 
                src={pillar.imageUrl}
                alt={currentLanguage === 'sq' && pillar.albanianTitle ? pillar.albanianTitle : 
                  currentLanguage === 'bs' && pillar.bosnianTitle ? pillar.bosnianTitle : pillar.title} 
                className="w-full rounded-t-md mb-3 object-contain" 
                style={{ maxHeight: '400px' }}
              />
              <CardTitle className="text-2xl font-bold">
                {currentLanguage === 'sq' && pillar.albanianTitle ? pillar.albanianTitle : 
                 currentLanguage === 'bs' && pillar.bosnianTitle ? pillar.bosnianTitle : 
                 currentLanguage === 'de' && pillar.germanTitle ? pillar.germanTitle :
                 currentLanguage === 'it' && pillar.italianTitle ? pillar.italianTitle :
                 pillar.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentLanguage === 'sq' && pillar.albanianDescription ? pillar.albanianDescription : 
                 currentLanguage === 'bs' && pillar.bosnianDescription ? pillar.bosnianDescription : 
                 currentLanguage === 'de' && pillar.germanDescription ? pillar.germanDescription :
                 currentLanguage === 'it' && pillar.italianDescription ? pillar.italianDescription :
                 pillar.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="whitespace-pre-line">
                {currentLanguage === 'sq' && pillar.albanianContent ? pillar.albanianContent : 
                 currentLanguage === 'bs' && pillar.bosnianContent ? pillar.bosnianContent :
                 currentLanguage === 'de' && pillar.germanContent ? pillar.germanContent :
                 currentLanguage === 'it' && pillar.italianContent ? pillar.italianContent :
                 pillar.content}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                window.location.href = "/pillars";
                return false;
              }}>
                {currentLanguage === 'en' ? 'Return to Five Pillars of Islam' : 
                 currentLanguage === 'sq' ? 'Kthehu te Pesë shtyllat e Islamit' : 
                 currentLanguage === 'de' ? 'Zurück zu den fünf Säulen des Islam' :
                 currentLanguage === 'it' ? 'Torna a I cinque pilastri dell\'Islam' :
                 'Nazad na Pet stubova Islama'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Navbar />
    </div>
  );
}