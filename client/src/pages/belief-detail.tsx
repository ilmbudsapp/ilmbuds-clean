import { useEffect, useState } from "react";
import { useLocation, useRoute, Link } from "wouter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/language-context";
import { useTranslation } from "@/hooks/use-translation";
import { useUserContext } from "@/context/user-context";
import { ProfileBadge } from "@/components/profile-badge";
import { Navbar } from "@/components/navbar";
import { islamicBeliefsData } from "./catechism";
import { Icon } from "@/components/ui/icons";

export default function BeliefDetail() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/belief/:id');
  const [belief, setBelief] = useState<any>(null);

  useEffect(() => {
    if (params?.id) {
      const foundBelief = islamicBeliefsData.find(b => b.id === params.id);
      if (foundBelief) {
        setBelief(foundBelief);
      } else {
        // Redirect to catechism if belief not found
        setLocation("/catechism");
      }
    }
  }, [params?.id, setLocation]);

  if (!belief) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pb-16">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="mosque" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? 'Islamic Beliefs' : 
             currentLanguage === 'sq' ? 'Shartët e Imanit' : 
             currentLanguage === 'bs' ? 'Šest imanskih šarti' : 
             currentLanguage === 'de' ? 'Islamische Glaubenslehre' : 
             currentLanguage === 'it' ? 'Credenze Islamiche' :
             'Šest imanskih šarti'}
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
              window.location.href = "/beliefs";
              return false;
            }}
          >
            <Icon name="arrow-left" className="mr-2" />
            {currentLanguage === 'en' ? 'Back to Islamic Beliefs' : 
             currentLanguage === 'sq' ? 'Kthehu te Shartët e Imanit' :
             currentLanguage === 'de' ? 'Zurück zur Islamischen Glaubenslehre' :
             currentLanguage === 'it' ? 'Torna alle Credenze Islamiche' :
             'Nazad na Šest Imanskih šarti'}
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <img 
                src={belief.imageUrl}
                alt={belief.title} 
                className="w-full rounded-t-md mb-3 object-contain" 
                style={{ maxHeight: '400px' }}
              />
              <CardTitle className="text-2xl font-bold">
                {currentLanguage === 'sq' && belief.albanianTitle ? belief.albanianTitle : 
                 currentLanguage === 'bs' && belief.bosnianTitle ? belief.bosnianTitle : 
                 currentLanguage === 'de' && belief.germanTitle ? belief.germanTitle :
                 currentLanguage === 'it' && belief.italianTitle ? belief.italianTitle :
                 belief.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentLanguage === 'sq' && belief.albanianDescription ? belief.albanianDescription : 
                 currentLanguage === 'bs' && belief.bosnianDescription ? belief.bosnianDescription : 
                 currentLanguage === 'de' && belief.germanDescription ? belief.germanDescription :
                 currentLanguage === 'it' && belief.italianDescription ? belief.italianDescription :
                 belief.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="whitespace-pre-line">
                {currentLanguage === 'sq' && belief.albanianContent ? belief.albanianContent : 
                 currentLanguage === 'bs' && belief.bosnianContent ? belief.bosnianContent : 
                 currentLanguage === 'de' && belief.germanContent ? belief.germanContent :
                 currentLanguage === 'it' && belief.italianContent ? belief.italianContent :
                 belief.content}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => {
                window.location.href = "/beliefs";
                return false;
              }}>
                {currentLanguage === 'en' ? 'Return to Islamic Beliefs' : 
                 currentLanguage === 'sq' ? 'Kthehu te Shartët e Imanit' :
                 currentLanguage === 'de' ? 'Zurück zur Islamischen Glaubenslehre' :
                 currentLanguage === 'it' ? 'Torna alle Credenze Islamiche' :
                 'Povratak na Šest Imanskih šarti'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Navbar />
    </div>
  );
}