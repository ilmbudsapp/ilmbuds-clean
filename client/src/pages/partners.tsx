import React, { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { Navbar } from '@/components/navbar';
import { Icon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/contact-form';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Partner {
  id: number;
  name: string;
  type: {
    en: string;
    sq: string;
    bs: string;
    de: string;
    it: string;
  };
  location: {
    en: string;
    sq: string;
    bs: string;
    de: string;
    it: string;
  };
  founder?: {
    en: string;
    sq: string;
    bs: string;
    de: string;
    it: string;
  };
  logo: string;
  social: {
    facebook?: string;
    website?: string;
    instagram?: string;
  };
  contact: {
    phone?: string;
    email?: string[];
  };
}

export default function Partners() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);

  // Email za kontakt koji će biti korišten za slanje poruka
  const contactEmail = "agron6922@gmail.com";

  // Lista partnera
  const partners: Partner[] = [
    {
      id: 1,
      name: "KERIMFOUNDATION",
      type: {
        en: "Islamic Humanitarian Organization",
        sq: "Organizatë Humanitare Islame",
        bs: "Islamska Humanitarna Organizacija",
        de: "Islamische Humanitäre Organisation",
        it: "Organizzazione Umanitaria Islamica"
      },
      location: {
        en: "Gracanica (Kosovo)",
        sq: "Graçanicë Kosovë",
        bs: "Gračanica (Kosovo)",
        de: "Gracanica (Kosovo)",
        it: "Gracanica (Kosovo)"
      },
      founder: {
        en: "Founded by local imam Afrim Osmani",
        sq: "Themeluar nga imami vendor Afrim Osmani",
        bs: "Osnovao lokalni imam Afrim Osmani",
        de: "Gegründet vom lokalen Imam Afrim Osmani",
        it: "Fondata dall'imam locale Afrim Osmani"
      },
      logo: "/images/partners/kerimfoundation-logo.png",
      social: {
        facebook: "https://www.facebook.com/ismaniafrim"
      },
      contact: {
        phone: "+383 49 935 564",
        email: ["kerimfoundation@gmail.com", "osmaniafrim@gmail.com"]
      }
    }
  ];

  // Funkcija za prikazivanje naziva tipa organizacije u zavisnosti od jezika
  const getPartnerType = (partner: Partner) => {
    switch (currentLanguage) {
      case 'en': return partner.type.en;
      case 'sq': return partner.type.sq;
      case 'bs': return partner.type.bs;
      case 'de': return partner.type.de;
      case 'it': return partner.type.it;
      default: return partner.type.en;
    }
  };

  // Funkcija za prikazivanje lokacije u zavisnosti od jezika
  const getPartnerLocation = (partner: Partner) => {
    switch (currentLanguage) {
      case 'en': return partner.location.en;
      case 'sq': return partner.location.sq;
      case 'bs': return partner.location.bs;
      case 'de': return partner.location.de;
      case 'it': return partner.location.it;
      default: return partner.location.en;
    }
  };

  // Funkcija za prikazivanje informacije o osnivaču u zavisnosti od jezika
  const getPartnerFounder = (partner: Partner) => {
    if (!partner.founder) return "";
    
    switch (currentLanguage) {
      case 'en': return partner.founder.en;
      case 'sq': return partner.founder.sq;
      case 'bs': return partner.founder.bs;
      case 'de': return partner.founder.de;
      case 'it': return partner.founder.it;
      default: return partner.founder.en;
    }
  };

  // Funkcija za prikazivanje teksta za Facebook link u zavisnosti od jezika
  const getFacebookLinkText = () => {
    switch (currentLanguage) {
      case 'en': return 'Visit Facebook Page';
      case 'sq': return 'Vizito Faqen e Facebook';
      case 'bs': return 'Posjeti Facebook stranicu';
      case 'de': return 'Facebook-Seite besuchen';
      case 'it': return 'Visita la pagina Facebook';
      default: return 'Visit Facebook Page';
    }
  };

  // Funkcija za prikazivanje teksta za kontakt informacije u zavisnosti od jezika
  const getContactInfoText = () => {
    switch (currentLanguage) {
      case 'en': return 'Contact Information';
      case 'sq': return 'Informacionet e Kontaktit';
      case 'bs': return 'Kontakt Informacije';
      case 'de': return 'Kontaktinformationen';
      case 'it': return 'Informazioni di contatto';
      default: return 'Contact Information';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 pb-16">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="handshake" className="text-3xl mr-2" />
          <h1 className="text-xl font-bold">
            {currentLanguage === 'en' ? 'Partners' : 
             currentLanguage === 'sq' ? 'Partnerët' : 
             currentLanguage === 'de' ? 'Partner' :
             currentLanguage === 'it' ? 'Partner' :
             'Partneri'}
          </h1>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center mb-6 text-gray-700">
            {currentLanguage === 'en' ? 'Our valued partners and collaborators' : 
             currentLanguage === 'sq' ? 'Partnerët dhe bashkëpunëtorët tanë të vlerësuar' : 
             currentLanguage === 'de' ? 'Unsere geschätzten Partner und Mitarbeiter' :
             currentLanguage === 'it' ? 'I nostri stimati partner e collaboratori' :
             'Naši cijenjeni partneri i saradnici'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <Card key={partner.id} className="bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold">{partner.name}</CardTitle>
                  <CardDescription>{getPartnerType(partner)} • {getPartnerLocation(partner)}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col items-center flex-grow">
                  <div className="w-24 h-24 mx-auto bg-black rounded-full mb-4 flex items-center justify-center p-2 overflow-hidden shadow-lg">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`} 
                      className="w-20 h-20 object-contain"
                    />
                  </div>
                  {partner.founder && (
                    <p className="text-sm text-gray-600 mb-3 text-center">{getPartnerFounder(partner)}</p>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full mb-2" 
                    onClick={() => window.open(partner.social.facebook, '_blank')}
                  >
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {getFacebookLinkText()}
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4 pt-0 border-t mt-auto">
                  <h3 className="text-sm font-semibold mb-2">{getContactInfoText()}</h3>
                  <div className="text-sm">
                    {partner.contact.phone && (
                      <div className="flex items-center mb-1">
                        <span className="mr-2">📱</span>
                        <span>{partner.contact.phone}</span>
                      </div>
                    )}
                    {partner.contact.email?.map((email, index) => (
                      <div key={index} className="flex items-center mb-1">
                        <span className="mr-2">📧</span>
                        <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>
                      </div>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              {currentLanguage === 'en' ? 'Become a Partner' : 
               currentLanguage === 'sq' ? 'Bëhuni Partner' : 
               currentLanguage === 'de' ? 'Partner werden' :
               currentLanguage === 'it' ? 'Diventa un partner' :
               'Postanite Partner'}
            </h2>
            <p className="text-gray-700 mb-4 text-center">
              {currentLanguage === 'en' ? 'Interested in partnering with us? Contact us to learn more about partnership opportunities.' : 
               currentLanguage === 'sq' ? 'Të interesuar për t\'u bërë partner me ne? Na kontaktoni për të mësuar më shumë rreth mundësive të partneritetit.' : 
               currentLanguage === 'de' ? 'Interessiert an einer Partnerschaft mit uns? Kontaktieren Sie uns, um mehr über Partnerschaftsmöglichkeiten zu erfahren.' :
               currentLanguage === 'it' ? 'Interessato a collaborare con noi? Contattaci per saperne di più sulle opportunità di partnership.' :
               'Zainteresovani za partnerstvo s nama? Kontaktirajte nas da saznate više o mogućnostima partnerstva.'}
            </p>
            <div className="flex justify-center">
              <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Icon name="mail" className="mr-2" />
                    {currentLanguage === 'en' ? 'Contact Us' : 
                     currentLanguage === 'sq' ? 'Na Kontaktoni' : 
                     currentLanguage === 'de' ? 'Kontaktiere uns' :
                     currentLanguage === 'it' ? 'Contattaci' :
                     'Kontaktirajte nas'}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <ContactForm 
                    onClose={() => setContactOpen(false)} 
                    recipientEmail={contactEmail} 
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}