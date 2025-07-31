import React from 'react';
import { Icon } from '@/components/ui/icons';
import { useUserContext } from '@/context/user-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Navbar } from '@/components/navbar';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function About() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <header className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="info" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {language === 'sq' ? 'Rreth Nesh' : 
             language === 'bs' ? 'O nama' : 
             language === 'de' ? 'Über uns' :
             language === 'it' ? 'Chi siamo' :
             'About Us'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* App Info Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="w-40 h-40 mb-4 sm:mb-0 sm:mr-6 flex items-center justify-center">
                  <img 
                    src="/images/ilmbuds_logo.png"
                    alt="ILMBUDS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-blue-800 mb-2">
                    {language === 'bs' 
                      ? 'ILMBUDS 1.0 - Islamska aplikacija za djecu'
                      : language === 'de'
                      ? 'ILMBUDS 1.0 - Islamische Kinder-App'
                      : language === 'sq'
                      ? 'ILMBUDS 1.0 - Aplikacion islamik për fëmijë'
                      : language === 'it'
                      ? 'ILMBUDS 1.0 - App islamica per bambini'
                      : 'ILMBUDS 1.0 - Islamic Children\'s App'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'sq' 
                      ? 'Një platformë arsimore islame për fëmijë dhe prindër' 
                      : language === 'bs'
                      ? 'Islamska obrazovna platforma za djecu i roditelje'
                      : language === 'de'
                      ? 'Eine islamische Bildungsplattform für Kinder und Eltern'
                      : language === 'it'
                      ? 'Una piattaforma educativa islamica per bambini e genitori'
                      : 'An Islamic educational platform for children and parents'}
                  </p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                {language === 'sq' ? 'Misioni ynë' : 
                 language === 'bs' ? 'Naša misija' : 
                 language === 'de' ? 'Unsere Mission' :
                 language === 'it' ? 'La nostra missione' :
                 'Our Mission'}
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'sq' 
                  ? 'Misioni ynë është të ofrojmë një platformë edukative islame të aksesueshme dhe angazhuese për fëmijët, duke i ndihmuar ata të mësojnë për fenë e tyre në një mjedis interaktiv dhe argëtues. Ne besojmë se edukimi islamik duhet të jetë i përshtatshëm për moshën, tërheqës, dhe i disponueshëm në shumë gjuhë.' 
                  : language === 'bs'
                  ? 'Naša misija je da pružimo pristupačnu i zanimljivu islamsku obrazovnu platformu za djecu, pomažući im da uče o svojoj vjeri u interaktivnom i zabavnom okruženju. Vjerujemo da islamsko obrazovanje treba biti primjereno uzrastu, privlačno i dostupno na više jezika.'
                  : language === 'de'
                  ? 'Unsere Mission ist es, eine zugängliche und ansprechende islamische Bildungsplattform für Kinder anzubieten, die ihnen hilft, ihren Glauben in einer interaktiven und unterhaltsamen Umgebung zu lernen. Wir glauben, dass islamische Bildung altersgerecht, ansprechend und in mehreren Sprachen verfügbar sein sollte.'
                  : language === 'it'
                  ? 'La nostra missione è fornire una piattaforma educativa islamica accessibile e coinvolgente per i bambini, aiutandoli a conoscere la loro fede in un ambiente interattivo e divertente. Crediamo che l\'educazione islamica debba essere adatta all\'età, attraente e disponibile in più lingue.'
                  : 'Our mission is to provide an accessible and engaging Islamic educational platform for children, helping them learn about their faith in an interactive and fun environment. We believe Islamic education should be age-appropriate, appealing, and available in multiple languages.'}
              </p>
              
              {/* Developer Bio Section */}
              <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-100">
                <h4 className="font-semibold text-blue-700 mb-2">
                  {language === 'sq' ? 'Nga Zhvilluesi' : 
                   language === 'bs' ? 'Od developera' : 
                   language === 'de' ? 'Vom Entwickler' :
                   language === 'it' ? 'Dallo sviluppatore' :
                   'From the Developer'}
                </h4>
                <p className="text-gray-700 mb-3 italic">
                  {language === 'sq' 
                    ? 'Unë jam Agron Osmani, Dizajner Grafik dhe Zhvillues. E kam filluar këtë aplikacion për t\'i ndihmuar fëmijët e moshës së vogël të mësojnë besimin Islam në një mënyrë që është e lehtë për ta kuptuar dhe angazhuese. Qëllimi im është të krijoj një përvojë mësimore që jo vetëm informon por edhe frymëzon.' 
                    : language === 'bs'
                    ? 'Ja sam Agron Osmani, grafički dizajner i developer po profesiji. Pokrenuo sam ovu aplikaciju kako bih pomogao maloj djeci da uče o islamskoj vjeri na način koji je lak za razumijevanje i zanimljiv. Moj cilj je stvoriti iskustvo učenja koje ne samo da informiše već i inspiriše.'
                    : language === 'de'
                    ? 'Ich bin Agron Osmani, von Beruf Grafikdesigner und Entwickler. Ich habe diese Anwendung gestartet, um kleinen Kindern zu helfen, den islamischen Glauben auf eine Weise zu erlernen, die sowohl leicht verständlich als auch ansprechend ist. Mein Ziel ist es, eine Lernerfahrung zu schaffen, die nicht nur informiert, sondern auch inspiriert.'
                    : language === 'it'
                    ? 'Sono Agron Osmani, Designer Grafico e Sviluppatore di professione. Ho iniziato questa applicazione per aiutare i bambini a conoscere la fede islamica in un modo facile da capire e coinvolgente. Il mio obiettivo è creare un\'esperienza di apprendimento che non solo informi ma anche ispiri.'
                    : 'I am Agron Osmani, a Graphic Designer and Developer by profession. I started this application to help young children learn about the Islamic faith in a way that is both easy to understand and engaging. My goal is to create a learning experience that not only informs but also inspires.'}
                </p>
              </div>
              
              <h3 className="text-lg font-semibold text-blue-700 mb-3 mt-6">
                {language === 'sq' ? 'Veçoritë kryesore' : 
                 language === 'bs' ? 'Ključne karakteristike' : 
                 language === 'de' ? 'Hauptfunktionen' :
                 language === 'it' ? 'Caratteristiche chiave' :
                 'Key Features'}
              </h3>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <Icon name="check_circle" className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'sq' 
                      ? 'Kuize interaktive mbi njohuritë islamike' 
                      : language === 'bs'
                      ? 'Interaktivni kvizovi o islamskom znanju'
                      : language === 'de'
                      ? 'Interaktive Quizspiele über islamisches Wissen'
                      : language === 'it'
                      ? 'Quiz interattivi sulla conoscenza islamica'
                      : 'Interactive quizzes on Islamic knowledge'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Icon name="check_circle" className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'sq' 
                      ? 'Tregime islamike me mësime morale' 
                      : language === 'bs'
                      ? 'Islamske priče s moralnim lekcijama'
                      : language === 'de'
                      ? 'Islamische Geschichten mit moralischen Lehren'
                      : language === 'it'
                      ? 'Storie islamiche con lezioni morali'
                      : 'Islamic stories with moral lessons'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Icon name="check_circle" className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'sq' 
                      ? 'Mësimi i Kuranit për fëmijë' 
                      : language === 'bs'
                      ? 'Učenje Kurana za djecu'
                      : language === 'de'
                      ? 'Koran-Lernen für Kinder'
                      : language === 'it'
                      ? 'Apprendimento del Corano per bambini'
                      : 'Quran learning for children'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Icon name="check_circle" className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'sq' 
                      ? 'Mbështetje për shumë gjuhë (Anglisht, Shqip, Boshnjakisht, Gjermanisht, Italisht)' 
                      : language === 'bs'
                      ? 'Podrška za više jezika (engleski, albanski, bosanski, njemački, italijanski)'
                      : language === 'de'
                      ? 'Mehrsprachige Unterstützung (Englisch, Albanisch, Bosnisch, Deutsch, Italienisch)'
                      : language === 'it'
                      ? 'Supporto multilingue (inglese, albanese, bosniaco, tedesco, italiano)'
                      : 'Multi-language support (English, Albanian, Bosnian, German, Italian)'}
                  </span>
                </li>
                <li className="flex items-start">
                  <Icon name="check_circle" className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    {language === 'sq' 
                      ? 'Panel kontrolli për prindërit për të monitoruar progresin e fëmijëve' 
                      : language === 'bs'
                      ? 'Kontrolna tabla za roditelje za praćenje napretka djece'
                      : 'Parent dashboard to monitor children\'s progress'}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Team Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-5">
                {language === 'sq' ? 'Ekipi Ynë' : 
                 language === 'bs' ? 'Naš tim' : 
                 language === 'de' ? 'Unser Team' :
                 language === 'it' ? 'Il nostro team' :
                 'Our Team'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Team Member 1 */}
                <div className="flex flex-col items-center p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/images/team/agron.jpg" alt="Agron Osmani" />
                    <AvatarFallback className="bg-blue-200 text-blue-700">AO</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-gray-800">Agron Osmani</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {language === 'bs' ? 'Osnivač i Developer' : 
                     language === 'de' ? 'Gründer & Entwickler' :
                     language === 'sq' ? 'Themelues & Zhvillues' :
                     language === 'it' ? 'Fondatore e Sviluppatore' :
                     'Founder & Developer'}
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-1 mb-2">
                    {language === 'sq' 
                      ? 'Krijuesi i ILMBUDS dhe zhvilluesi kryesor i aplikacionit'
                      : language === 'bs'
                      ? 'Tvorac ILMBUDS-a i glavni developer aplikacije'
                      : language === 'de'
                      ? 'Schöpfer von ILMBUDS und leitender Anwendungsentwickler'
                      : language === 'it'
                      ? 'Creatore di ILMBUDS e sviluppatore principale dell\'applicazione'
                      : 'Creator of ILMBUDS and lead application developer'}
                  </p>
                </div>
                
                {/* Team Member 2 */}
                <div className="flex flex-col items-center p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/images/team/afrim.jpg" alt="Afrim Osmani" />
                    <AvatarFallback className="bg-green-200 text-green-700">AO</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-gray-800">Afrim Osmani</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {language === 'bs' ? 'Stručnjak za islamski sadržaj' : 
                     language === 'de' ? 'Experte für islamische Inhalte' :
                     language === 'sq' ? 'Ekspert i Përmbajtjes Islame' :
                     language === 'it' ? 'Esperto di Contenuti Islamici' :
                     'Islamic Content Expert'}
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-1 mb-2">
                    {language === 'sq' 
                      ? 'Hoxha Afrim Osmani ka rishikuar dhe kontrolluar të gjithë përmbajtjen islame në aplikacion'
                      : language === 'bs'
                      ? 'Hodža Afrim Osmani je recenzirao i kontrolisao sav islamski sadržaj u aplikaciji' 
                      : language === 'de'
                      ? 'Imam Afrim Osmani hat alle islamischen Inhalte in der Anwendung überprüft und kontrolliert'
                      : language === 'it'
                      ? 'Imam Afrim Osmani ha recensito e controllato tutti i contenuti islamici nell\'applicazione'
                      : 'Imam Afrim Osmani has reviewed and verified all Islamic content in the application'}
                  </p>
                </div>
                
                {/* Team Member 3 */}
                <div className="flex flex-col items-center p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/images/team/agron.jpg" alt="Agron Osmani" />
                    <AvatarFallback className="bg-purple-200 text-purple-700">AO</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-gray-800">Agron Osmani</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {language === 'bs' ? 'Stručnjak za prevođenje' : 
                     language === 'de' ? 'Übersetzungsspezialist' :
                     language === 'sq' ? 'Specialist i Përkthimit' :
                     language === 'it' ? 'Specialista di Traduzione' :
                     'Translation Specialist'}
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-1 mb-2">
                    {language === 'sq' 
                      ? 'Koordinon dhe verifikon përkthimet në gjuhë të ndryshme'
                      : language === 'bs'
                      ? 'Koordinira i verifikuje prijevode na različitim jezicima'
                      : language === 'de'
                      ? 'Koordiniert und überprüft Übersetzungen in mehreren Sprachen'
                      : language === 'it'
                      ? 'Coordina e verifica le traduzioni in diverse lingue'
                      : 'Coordinates and verifies translations in multiple languages'}
                  </p>
                </div>
                
                {/* Team Member 4 */}
                <div className="flex flex-col items-center p-4 rounded-lg bg-white border border-blue-100 shadow-sm">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src="/images/team/agron.jpg" alt="Agron Osmani" />
                    <AvatarFallback className="bg-amber-200 text-amber-700">AO</AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-gray-800">Agron Osmani</h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {language === 'bs' ? 'Grafički dizajner' : 
                     language === 'de' ? 'Grafikdesigner' :
                     language === 'sq' ? 'Dizajner Grafik' :
                     language === 'it' ? 'Designer Grafico' :
                     'Graphic Designer'}
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-1 mb-2">
                    {language === 'sq' 
                      ? 'Agron Osmani ka krijuar të gjithë dizajnin grafik në aplikacion'
                      : language === 'bs'
                      ? 'Agron Osmani je kreirao sav grafički dizajn u aplikaciji'
                      : language === 'de'
                      ? 'Agron Osmani hat das gesamte grafische Design der Anwendung erstellt'
                      : language === 'it'
                      ? 'Agron Osmani ha creato tutto il design grafico nell\'applicazione'
                      : 'Agron Osmani created all graphic design in the application'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Contact Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                {language === 'sq' ? 'Na Kontaktoni' : 
                 language === 'bs' ? 'Kontaktirajte nas' : 
                 language === 'de' ? 'Kontaktieren Sie uns' :
                 language === 'it' ? 'Contattaci' :
                 'Contact Us'}
              </h3>
              <p className="text-gray-700 mb-6">
                {language === 'sq' 
                  ? 'Nëse keni ndonjë pyetje, sugjerim, ose dëshironi të kontribuoni në projektin tonë, ju lutem na kontaktoni.' 
                  : language === 'bs'
                  ? 'Ako imate bilo kakva pitanja, prijedloge ili želite doprinijeti našem projektu, molimo vas da nas kontaktirate.'
                  : language === 'de'
                  ? 'Wenn Sie Fragen oder Anregungen haben oder zu unserem Projekt beitragen möchten, kontaktieren Sie uns bitte.'
                  : language === 'it'
                  ? 'Se hai domande, suggerimenti o desideri contribuire al nostro progetto, ti preghiamo di contattarci.'
                  : 'If you have any questions, suggestions, or would like to contribute to our project, please reach out to us.'}
              </p>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="email" className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Email</h4>
                    <p className="text-blue-600">agron6922@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Icon name="public" className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Website</h4>
                    <p className="text-blue-600">www.ilmbuds.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-5">
                {language === 'sq' ? 'Politika e Privatësisë' : 
                 language === 'bs' ? 'Politika Privatnosti' : 
                 language === 'de' ? 'Datenschutzrichtlinie' :
                 language === 'it' ? 'Politica sulla Privacy' :
                 'Privacy Policy'}
              </h3>
              
              <div className="text-sm text-gray-700 space-y-4">
                <p className="font-medium">
                  {language === 'sq' 
                    ? 'Data e fundit e përditësimit: 6 Prill, 2025' 
                    : language === 'bs'
                    ? 'Posljednje ažuriranje: 6. April, 2025' 
                    : language === 'de'
                    ? 'Zuletzt aktualisiert: 6. April 2025'
                    : language === 'it'
                    ? 'Ultimo aggiornamento: 6 Aprile, 2025'
                    : 'Last updated: April 6, 2025'}
                </p>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '1. Informacione për ne' : 
                   language === 'bs' ? '1. Informacije o nama' : 
                   language === 'de' ? '1. Informationen über uns' :
                   language === 'it' ? '1. Informazioni su di noi' :
                   '1. Information About Us'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'ILMBUDS është një aplikacion edukativ islamik për fëmijë i zhvilluar dhe menaxhuar nga AGRONDESIGN. Pronari i AGRONDESIGN është Agron Osmani, një dizajner grafik dhe zhvillues, me seli në Luise-Hainlen-Weg 4/4, 73312 Geislingen an der Steige, Gjermani.' 
                    : language === 'bs'
                    ? 'ILMBUDS je islamska obrazovna aplikacija za djecu koju je razvio i kojom upravlja AGRONDESIGN. Vlasnik AGRONDESIGN-a je Agron Osmani, grafički dizajner i developer, sa sjedištem na adresi Luise-Hainlen-Weg 4/4, 73312 Geislingen an der Steige, Njemačka.'
                    : language === 'de'
                    ? 'ILMBUDS ist eine islamische Bildungs-App für Kinder, die von AGRONDESIGN entwickelt und verwaltet wird. Der Inhaber von AGRONDESIGN ist Agron Osmani, ein Grafikdesigner und Entwickler, mit Sitz in Luise-Hainlen-Weg 4/4, 73312 Geislingen an der Steige, Deutschland.'
                    : language === 'it'
                    ? 'ILMBUDS è un\'applicazione educativa islamica per bambini sviluppata e gestita da AGRONDESIGN. Il proprietario di AGRONDESIGN è Agron Osmani, un designer grafico e sviluppatore, con sede in Luise-Hainlen-Weg 4/4, 73312 Geislingen an der Steige, Germania.'
                    : 'ILMBUDS is an Islamic educational application for children developed and managed by AGRONDESIGN. The owner of AGRONDESIGN is Agron Osmani, a graphic designer and developer, based at Luise-Hainlen-Weg 4/4, 73312 Geislingen an der Steige, Germany.'}
                </p>
                <p>
                  {language === 'sq' 
                    ? 'Për pyetje në lidhje me këtë Politikë të Privatësisë, ju lutemi na kontaktoni në: agron6922@gmail.com' 
                    : language === 'bs'
                    ? 'Za pitanja u vezi s ovom Politikom privatnosti, kontaktirajte nas na: agron6922@gmail.com'
                    : language === 'de'
                    ? 'Bei Fragen zu dieser Datenschutzrichtlinie kontaktieren Sie uns bitte unter: agron6922@gmail.com'
                    : language === 'it'
                    ? 'Per domande relative a questa Informativa sulla privacy, contattateci all\'indirizzo: agron6922@gmail.com'
                    : 'For questions regarding this Privacy Policy, please contact us at: agron6922@gmail.com'}
                </p>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '2. Të dhënat që mbledhim' : 
                   language === 'bs' ? '2. Podaci koje prikupljamo' : 
                   language === 'de' ? '2. Daten, die wir sammeln' :
                   language === 'it' ? '2. Dati che raccogliamo' :
                   '2. Data We Collect'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'Ne mbledhim lloje të ndryshme të të dhënave kur përdorni aplikacionin ILMBUDS:' 
                    : language === 'bs'
                    ? 'Prikupljamo različite vrste podataka kada koristite ILMBUDS aplikaciju:'
                    : language === 'de'
                    ? 'Wir sammeln verschiedene Arten von Daten, wenn Sie die ILMBUDS-Anwendung verwenden:'
                    : language === 'it'
                    ? 'Raccogliamo diversi tipi di dati quando utilizzi l\'applicazione ILMBUDS:'
                    : 'We collect various types of data when you use the ILMBUDS application:'}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    {language === 'sq' 
                      ? 'Informacione të profilit të përdoruesit (emër përdoruesi, fjalëkalim i enkriptuar, roli, pikët, etj.)' 
                      : language === 'bs'
                      ? 'Informacije o korisničkom profilu (korisničko ime, šifrirana lozinka, uloga, bodovi, itd.)'
                      : language === 'de'
                      ? 'Benutzerprofilinformationen (Benutzername, verschlüsseltes Passwort, Rolle, Punkte usw.)'
                      : language === 'it'
                      ? 'Informazioni sul profilo utente (nome utente, password crittografata, ruolo, punti, ecc.)'
                      : 'User profile information (username, encrypted password, role, points, etc.)'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Të dhënat e progresit të mësimit (rezultatet e kuizeve, surahet e lexuara, etj.)' 
                      : language === 'bs'
                      ? 'Podaci o napretku učenja (rezultati kviza, pročitane sure, itd.)'
                      : language === 'de'
                      ? 'Lernfortschrittsdaten (Quizergebnisse, gelesene Suren usw.)'
                      : language === 'it'
                      ? 'Dati di avanzamento dell\'apprendimento (risultati dei quiz, sure lette, ecc.)'
                      : 'Learning progress data (quiz results, surahs read, etc.)'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Të dhëna të përdorimit anonim për të përmirësuar aplikacionin' 
                      : language === 'bs'
                      ? 'Anonimni podaci o korištenju za poboljšanje aplikacije'
                      : language === 'de'
                      ? 'Anonyme Nutzungsdaten zur Verbesserung der Anwendung'
                      : language === 'it'
                      ? 'Dati di utilizzo anonimi per migliorare l\'applicazione'
                      : 'Anonymous usage data to improve the application'}
                  </li>
                </ul>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '3. Si i përdorim të dhënat tuaja' : 
                   language === 'bs' ? '3. Kako koristimo vaše podatke' : 
                   language === 'de' ? '3. Wie wir Ihre Daten verwenden' :
                   language === 'it' ? '3. Come utilizziamo i tuoi dati' :
                   '3. How We Use Your Data'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'Ne përdorim të dhënat e mbledhura për qëllimet e mëposhtme:' 
                    : language === 'bs'
                    ? 'Prikupljene podatke koristimo za sljedeće svrhe:'
                    : language === 'de'
                    ? 'Wir verwenden die gesammelten Daten für folgende Zwecke:'
                    : language === 'it'
                    ? 'Utilizziamo i dati raccolti per i seguenti scopi:'
                    : 'We use the collected data for the following purposes:'}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    {language === 'sq' 
                      ? 'Për të ofruar dhe personalizuar përvojën tuaj të të mësuarit' 
                      : language === 'bs'
                      ? 'Za pružanje i personaliziranje vašeg iskustva učenja'
                      : language === 'de'
                      ? 'Um Ihre Lernerfahrung bereitzustellen und zu personalisieren'
                      : language === 'it'
                      ? 'Per fornire e personalizzare la tua esperienza di apprendimento'
                      : 'To provide and personalize your learning experience'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Për t\'iu mundësuar prindërve të monitorojnë progresin e fëmijëve të tyre' 
                      : language === 'bs'
                      ? 'Da omogućimo roditeljima da prate napredak svoje djece'
                      : language === 'de'
                      ? 'Um Eltern zu ermöglichen, den Fortschritt ihrer Kinder zu überwachen'
                      : language === 'it'
                      ? 'Per consentire ai genitori di monitorare i progressi dei loro figli'
                      : 'To enable parents to monitor their children\'s progress'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Për të përmirësuar dhe optimizuar aplikacionin dhe përmbajtjen e tij' 
                      : language === 'bs'
                      ? 'Za poboljšanje i optimizaciju aplikacije i njenog sadržaja'
                      : language === 'de'
                      ? 'Um die Anwendung und ihre Inhalte zu verbessern und zu optimieren'
                      : language === 'it'
                      ? 'Per migliorare e ottimizzare l\'applicazione e i suoi contenuti'
                      : 'To improve and optimize the application and its content'}
                  </li>
                </ul>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '4. Reklamat dhe AdMob' : 
                   language === 'bs' ? '4. Oglasi i AdMob' : 
                   language === 'de' ? '4. Werbung und AdMob' :
                   language === 'it' ? '4. Pubblicità e AdMob' :
                   '4. Advertising and AdMob'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'Aplikacioni ILMBUDS përdor Google AdMob për të shfaqur reklama. AdMob mund të mbledhë informacione anonim dhe informacione identifikuese jo personale për të përmirësuar cilësinë e reklamave. Ne jemi të përkushtuar që të filtrojmë përmbajtje të papërshtatshme të reklamave duke përdorur filtrat e AdMob, duke garantuar që vetëm reklamat e përshtatshme për fëmijë dhe për mjedise fetare shfaqen në aplikacion.' 
                    : language === 'bs'
                    ? 'ILMBUDS aplikacija koristi Google AdMob za prikazivanje oglasa. AdMob može prikupljati anonimne i neidentificirajuće informacije za poboljšanje kvalitete oglasa. Posvećeni smo filtriranju neprikladnog sadržaja oglasa koristeći AdMob filtere, osiguravajući da se u aplikaciji prikazuju samo oglasi prikladni za djecu i vjersko okruženje.'
                    : language === 'de'
                    ? 'Die ILMBUDS-Anwendung verwendet Google AdMob, um Werbung anzuzeigen. AdMob kann anonyme und nicht identifizierende Informationen sammeln, um die Qualität der Werbung zu verbessern. Wir sind bestrebt, unangemessene Werbeinhalte mit AdMob-Filtern zu filtern und sicherzustellen, dass in der Anwendung nur kindgerechte und für religiöse Umgebungen geeignete Werbung angezeigt wird.'
                    : language === 'it'
                    ? 'L\'applicazione ILMBUDS utilizza Google AdMob per visualizzare annunci pubblicitari. AdMob può raccogliere informazioni anonime e non identificative per migliorare la qualità degli annunci. Ci impegniamo a filtrare contenuti pubblicitari inappropriati utilizzando i filtri di AdMob, garantendo che solo annunci adatti ai bambini e agli ambienti religiosi vengano visualizzati nell\'applicazione.'
                    : 'The ILMBUDS application uses Google AdMob to display advertisements. AdMob may collect anonymous and non-identifying information to improve the quality of advertisements. We are committed to filtering inappropriate advertising content using AdMob filters, ensuring that only advertisements suitable for children and religious environments are displayed in the application.'}
                </p>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '5. Të drejtat tuaja' : 
                   language === 'bs' ? '5. Vaša prava' : 
                   language === 'de' ? '5. Ihre Rechte' :
                   language === 'it' ? '5. I tuoi diritti' :
                   '5. Your Rights'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'Në varësi të vendndodhjes suaj, ju mund të keni të drejta të caktuara në lidhje me të dhënat tuaja personale, duke përfshirë:' 
                    : language === 'bs'
                    ? 'Ovisno o vašoj lokaciji, možete imati određena prava vezana za vaše osobne podatke, uključujući:'
                    : language === 'de'
                    ? 'Abhängig von Ihrem Standort haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre personenbezogenen Daten, darunter:'
                    : language === 'it'
                    ? 'A seconda della tua posizione, potresti avere determinati diritti relativi ai tuoi dati personali, tra cui:'
                    : 'Depending on your location, you may have certain rights regarding your personal data, including:'}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    {language === 'sq' 
                      ? 'Të drejtën për të qasur të dhënat tuaja personale' 
                      : language === 'bs'
                      ? 'Pravo na pristup vašim osobnim podacima'
                      : language === 'de'
                      ? 'Das Recht auf Zugriff auf Ihre personenbezogenen Daten'
                      : language === 'it'
                      ? 'Il diritto di accedere ai tuoi dati personali'
                      : 'The right to access your personal data'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Të drejtën për të kërkuar korrigjimin ose fshirjen e të dhënave' 
                      : language === 'bs'
                      ? 'Pravo na zahtjev za ispravkom ili brisanjem podataka'
                      : language === 'de'
                      ? 'Das Recht, die Korrektur oder Löschung von Daten zu verlangen'
                      : language === 'it'
                      ? 'Il diritto di richiedere la correzione o la cancellazione dei dati'
                      : 'The right to request correction or deletion of data'}
                  </li>
                  <li>
                    {language === 'sq' 
                      ? 'Të drejtën për të kundërshtuar përpunimin e të dhënave tuaja' 
                      : language === 'bs'
                      ? 'Pravo na prigovor obradi vaših podataka'
                      : language === 'de'
                      ? 'Das Recht, der Verarbeitung Ihrer Daten zu widersprechen'
                      : language === 'it'
                      ? 'Il diritto di opporsi al trattamento dei tuoi dati'
                      : 'The right to object to processing of your data'}
                  </li>
                </ul>
                <p>
                  {language === 'sq' 
                    ? 'Për të ushtruar ndonjë nga këto të drejta, ju lutemi na kontaktoni duke përdorur informacionin e dhënë më lart.' 
                    : language === 'bs'
                    ? 'Za ostvarivanje bilo kojeg od ovih prava, molimo kontaktirajte nas koristeći gore navedene informacije.'
                    : language === 'de'
                    ? 'Um eines dieser Rechte auszuüben, kontaktieren Sie uns bitte unter den oben angegebenen Informationen.'
                    : language === 'it'
                    ? 'Per esercitare uno qualsiasi di questi diritti, contattaci utilizzando le informazioni fornite sopra.'
                    : 'To exercise any of these rights, please contact us using the information provided above.'}
                </p>

                <h4 className="font-bold text-blue-600">
                  {language === 'sq' ? '6. Ndryshimet në këtë politikë' : 
                   language === 'bs' ? '6. Promjene ove politike' : 
                   language === 'de' ? '6. Änderungen dieser Richtlinie' :
                   language === 'it' ? '6. Modifiche a questa politica' :
                   '6. Changes to This Policy'}
                </h4>
                <p>
                  {language === 'sq' 
                    ? 'Ne mund të përditësojmë këtë Politikë të Privatësisë herë pas here. Kur e bëjmë këtë, do të përditësojmë datën "e përditësuar së fundmi" në krye të Politikës së Privatësisë. Ne ju inkurajojmë të rishikoni rregullisht këtë Politikë të Privatësisë për të qëndruar të informuar se si ne po mbrojmë informacionin tuaj.' 
                    : language === 'bs'
                    ? 'Možemo s vremena na vrijeme ažurirati ovu Politiku privatnosti. Kada to učinimo, ažurirat ćemo datum "posljednje ažuriranje" na vrhu Politike privatnosti. Potičemo vas da redovito pregledavate ovu Politiku privatnosti kako biste bili informirani o tome kako štitimo vaše informacije.'
                    : language === 'de'
                    ? 'Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wenn wir dies tun, aktualisieren wir das Datum "Zuletzt aktualisiert" oben in der Datenschutzrichtlinie. Wir empfehlen Ihnen, diese Datenschutzrichtlinie regelmäßig zu überprüfen, um darüber informiert zu bleiben, wie wir Ihre Informationen schützen.'
                    : language === 'it'
                    ? 'Potremmo aggiornare questa Informativa sulla privacy di tanto in tanto. Quando lo facciamo, aggiorneremo la data "ultimo aggiornamento" in cima all\'Informativa sulla privacy. Ti incoraggiamo a rivedere regolarmente questa Informativa sulla privacy per rimanere informato su come stiamo proteggendo le tue informazioni.'
                    : 'We may update this Privacy Policy from time to time. When we do, we will update the "last updated" date at the top of the Privacy Policy. We encourage you to review this Privacy Policy regularly to stay informed about how we are protecting your information.'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Impresum/Legal Information Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-5">
                {language === 'sq' ? 'Impresum / Informacione Ligjore' : 
                 language === 'bs' ? 'Impresum / Pravne Informacije' : 
                 language === 'de' ? 'Impressum / Rechtliche Informationen' :
                 language === 'it' ? 'Impressum / Informazioni Legali' :
                 'Imprint / Legal Information'}
              </h3>
              
              <div className="text-sm text-gray-700 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-blue-600 mb-2">
                      {language === 'sq' ? 'Informacione për kompaninë' : 
                       language === 'bs' ? 'Informacije o kompaniji' : 
                       language === 'de' ? 'Unternehmensangaben' :
                       language === 'it' ? 'Informazioni aziendali' :
                       'Company Information'}
                    </h4>
                    <p className="mb-1">
                      <span className="font-medium">
                        {language === 'sq' ? 'Emri i kompanisë:' : 
                         language === 'bs' ? 'Naziv kompanije:' : 
                         language === 'de' ? 'Firmenname:' :
                         language === 'it' ? 'Nome dell\'azienda:' :
                         'Company name:'}
                      </span> AGRONDESIGN
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">
                        {language === 'sq' ? 'Pronari:' : 
                         language === 'bs' ? 'Vlasnik:' : 
                         language === 'de' ? 'Inhaber:' :
                         language === 'it' ? 'Proprietario:' :
                         'Owner:'}
                      </span> Agron Osmani
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">
                        {language === 'sq' ? 'Profesioni:' : 
                         language === 'bs' ? 'Profesija:' : 
                         language === 'de' ? 'Beruf:' :
                         language === 'it' ? 'Professione:' :
                         'Profession:'}
                      </span> {language === 'sq' ? 'Dizajner Grafik & Zhvillues' : 
                              language === 'bs' ? 'Grafički Dizajner & Developer' : 
                              language === 'de' ? 'Grafikdesigner & Entwickler' :
                              language === 'it' ? 'Designer Grafico & Sviluppatore' :
                              'Graphic Designer & Developer'}
                    </p>
                    <p className="mb-3">
                      <span className="font-medium">
                        {language === 'sq' ? 'Adresa:' : 
                         language === 'bs' ? 'Adresa:' : 
                         language === 'de' ? 'Adresse:' :
                         language === 'it' ? 'Indirizzo:' :
                         'Address:'}
                      </span> Luise-Hainlen-Weg 4/4<br/>73312 Geislingen an der Steige<br/>{language === 'sq' ? 'Gjermani' : 
                                                                                           language === 'bs' ? 'Njemačka' : 
                                                                                           language === 'de' ? 'Deutschland' :
                                                                                           language === 'it' ? 'Germania' :
                                                                                           'Germany'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-600 mb-2">
                      {language === 'sq' ? 'Informacione kontakti' : 
                       language === 'bs' ? 'Kontakt informacije' : 
                       language === 'de' ? 'Kontaktinformationen' :
                       language === 'it' ? 'Informazioni di contatto' :
                       'Contact Information'}
                    </h4>
                    <p className="mb-1">
                      <span className="font-medium">Email:</span> agron6922@gmail.com
                    </p>
                    <h4 className="font-bold text-blue-600 mt-4 mb-2">
                      {language === 'sq' ? 'Informacione ligjore' : 
                       language === 'bs' ? 'Pravne informacije' : 
                       language === 'de' ? 'Rechtliche Informationen' :
                       language === 'it' ? 'Informazioni legali' :
                       'Legal Information'}
                    </h4>
                    <p className="mb-1">
                      <span className="font-medium">
                        {language === 'sq' ? 'Numri i taksave (Steuernummer):' : 
                         language === 'bs' ? 'Porezni broj (Steuernummer):' : 
                         language === 'de' ? 'Steuernummer:' :
                         language === 'it' ? 'Codice fiscale (Steuernummer):' :
                         'Tax number (Steuernummer):'}
                      </span> 48267305956
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">
                        {language === 'sq' ? 'Numri i Identifikimit të TVSH-së (USt-IdNr):' : 
                         language === 'bs' ? 'PDV identifikacijski broj (USt-IdNr):' : 
                         language === 'de' ? 'USt-IdNr:' :
                         language === 'it' ? 'Partita IVA (USt-IdNr):' :
                         'VAT identification number (USt-IdNr):'}
                      </span> DE35 401 6444
                    </p>
                    <p className="mt-4">
                      {language === 'sq' 
                        ? 'Përfaqësuar ligjërisht nga Agron Osmani, pronari i AGRONDESIGN.' 
                        : language === 'bs'
                        ? 'Pravno zastupano od strane Agron Osmani, vlasnika AGRONDESIGN-a.'
                        : language === 'de'
                        ? 'Rechtlich vertreten durch Agron Osmani, Inhaber von AGRONDESIGN.'
                        : language === 'it'
                        ? 'Legalmente rappresentato da Agron Osmani, proprietario di AGRONDESIGN.'
                        : 'Legally represented by Agron Osmani, owner of AGRONDESIGN.'}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500 italic">
                    {language === 'sq' 
                      ? 'Ky Impresum është në përputhje me kërkesat ligjore gjermane (§ 5 TMG).' 
                      : language === 'bs'
                      ? 'Ovaj Impresum je u skladu s njemačkim zakonskim zahtjevima (§ 5 TMG).'
                      : language === 'de'
                      ? 'Dieses Impressum entspricht den gesetzlichen Anforderungen in Deutschland (§ 5 TMG).'
                      : language === 'it'
                      ? 'Questo Impressum è conforme ai requisiti legali tedeschi (§ 5 TMG).'
                      : 'This Imprint complies with German legal requirements (§ 5 TMG).'}
                  </p>
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