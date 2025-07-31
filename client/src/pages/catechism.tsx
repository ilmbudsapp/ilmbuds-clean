import React, { useState, useEffect } from 'react';
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Define types for our ILMIHAL content
type Step = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

type Section = {
  id: string;
  title: string;
  description: string;
  steps?: Step[];
  imageUrl?: string;
  content?: string;
  albanianTitle?: string;
  albanianDescription?: string;
  albanianContent?: string;
  bosnianTitle?: string;
  bosnianDescription?: string;
  bosnianContent?: string;
  germanTitle?: string;
  germanDescription?: string;
  germanContent?: string;
  italianTitle?: string;
  italianDescription?: string;
  italianContent?: string;
};

// Define content for Ablution Guide
const ablutionSteps: Step[] = [];  // Empty as we'll use a different approach for ablution guide

// Define ablution guide content with the complete image and text
export const ablutionGuideContent = {
  title: "Ablution Guide - al Wudu",
  albanianTitle: "Si të marrim abdest",
  bosnianTitle: "Objašnjenje kako se uzima abdest slikovito",
  germanTitle: "Anleitung zur rituellen Waschung - al Wudu",
  italianTitle: "Guida all'abluzione - al Wudu",
  imageUrl: "/ablution_guide.jpg",
  steps: `
1. Study bismillah.
2. Wash your hands 3 times, first the right and then the left.
3. Rinsing the mouth with the right hand 3 times.
4. Rinsing the nose with the left hand 3x.
5. Washing the face 3x.
6. Washing the right and left hands up to behind the elbows 3 times.
7. Head mesh polishing.
8. Ear washing.
9. Washing the legs up to behind the ankles, right and left 3x.
  `,
  albanianSteps: `
1. Studioni bismilahun.
2. Lani duart 3 herë, fillimisht të djathtën dhe pastaj të majtën.
3. Shpërlani gojën me dorën e djathtë 3 herë.
4. Shpërlani hundën me dorën e majtë 3 herë.
5. Lani fytyrën 3 herë.
6. Lani duart e djathta dhe të majta deri pas bërrylave 3 herë.
7. Lëmimi i kokës.
8. Larja e veshëve.
9. Larja e këmbëve deri pas kyçeve të këmbëve, e djathta dhe e majta 3 herë.
  `,
  bosnianSteps: `
1. Proučite bismillu.
2. Operite ruke 3 puta, prvo desnu pa onda lijevu.
3. Isperite usta desnom rukom 3 puta.
4. Isperite nos lijevom rukom 3 puta.
5. Operite lice 3 puta.
6. Operite desnu pa lijevu ruku do iza lakata 3 puta.
7. Potiranje glave.
8. Pranje ušiju.
9. Pranje nogu do iza članaka, desne pa lijeve 3 puta.
  `,
  germanSteps: `
1. Sprechen Sie die Bismillah.
2. Waschen Sie Ihre Hände 3 Mal, zuerst die rechte und dann die linke.
3. Spülen Sie den Mund mit der rechten Hand 3 Mal aus.
4. Spülen Sie die Nase mit der linken Hand 3 Mal aus.
5. Waschen Sie das Gesicht 3 Mal.
6. Waschen Sie die rechte und linke Hand bis hinter die Ellbogen 3 Mal.
7. Streichen Sie über den Kopf.
8. Waschen Sie die Ohren.
9. Waschen Sie die Füße bis hinter die Knöchel, rechts und links 3 Mal.
  `,
  italianSteps: `
1. Recitare bismillah.
2. Lavare le mani 3 volte, prima la destra e poi la sinistra.
3. Sciacquare la bocca con la mano destra 3 volte.
4. Sciacquare il naso con la mano sinistra 3 volte.
5. Lavare il viso 3 volte.
6. Lavare le mani destra e sinistra fino a dietro i gomiti 3 volte.
7. Passare le mani bagnate sulla testa.
8. Lavare le orecchie.
9. Lavare i piedi fino a dietro le caviglie, destro e sinistro 3 volte.
  `
};

// Define content for the five pillars of Islam
export const fivePillarsData: Section[] = [
  {
    id: "shahada",
    title: "Shahada (Faith)",
    albanianTitle: "Shehádeti (Besimi)",
    bosnianTitle: "Šehadet (Vjerovanje)",
    germanTitle: "Schahada (Glaubensbekenntnis)",
    italianTitle: "Shahada (Fede)",
    description: "The declaration of faith and the most important pillar of Islam.",
    albanianDescription: "Deklarata e besimit dhe shtylla më e rëndësishme e Islamit.",
    bosnianDescription: "Izjava vjere i najvažniji stub islama.",
    germanDescription: "Das Glaubensbekenntnis und die wichtigste Säule des Islam.",
    italianDescription: "La dichiarazione di fede e il pilastro più importante dell'Islam.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg",
    content: `The Shahada is the Muslim declaration of faith: "La ilaha illa Allah, Muhammad rasul Allah" (There is no god but Allah, and Muhammad is the messenger of Allah).

When a person recites this with conviction, they become a Muslim. This declaration confirms the belief in the oneness of Allah (Tawhid) and acknowledges Prophet Muhammad ﷺ as His final messenger.

The Shahada is also the first thing whispered into a newborn baby's ear and ideally the last words a Muslim says before death. It is repeated in every prayer and in the call to prayer (adhan).

For children learning about Islam, understanding the Shahada means recognizing:
- Allah is the only One worthy of worship
- Prophet Muhammad ﷺ is our guide who shows us how to live according to Allah's guidance
- This simple declaration connects all Muslims around the world as one community`,
    albanianContent: `Shehadeti është deklarata e besimit musliman: "La ilahe il-lallah, Muhamedun resulullah" (Nuk ka Zot tjetër përveç Allahut dhe Muhamedi është i dërguari i Allahut).

Kur një person e reciton këtë me bindje, ai bëhet musliman. Kjo deklaratë konfirmon besimin në njëshmërinë e Allahut (Teuhid) dhe njeh Profetin Muhamed ﷺ si të dërguarin e Tij të fundit.

Shehadeti është gjithashtu gjëja e parë që i pëshpëritet në vesh një fëmije të sapolindur dhe idealisht fjalët e fundit që një musliman thotë para vdekjes. Përsëritet në çdo namaz dhe në thirrjen për namaz (ezan).

Për fëmijët që mësojnë për Islamin, kuptimi i Shehdetit do të thotë të njohësh:
- Allahu është i vetmi që meriton adhurimin
- Profeti Muhamed ﷺ është udhërrëfyesi ynë që na tregon si të jetojmë sipas udhëzimit të Allahut
- Kjo deklaratë e thjeshtë bashkon të gjithë muslimanët në mbarë botën si një komunitet`,
    germanContent: `Das Schahada ist das muslimische Glaubensbekenntnis: "La ilaha illa Allah, Muhammad rasul Allah" (Es gibt keinen Gott außer Allah, und Muhammad ist der Gesandte Allahs).

Wenn eine Person dies mit Überzeugung rezitiert, wird sie zum Muslim. Diese Erklärung bestätigt den Glauben an die Einheit Allahs (Tawhid) und erkennt den Propheten Muhammad ﷺ als seinen letzten Gesandten an.

Die Schahada ist auch das Erste, was einem neugeborenen Baby ins Ohr geflüstert wird, und idealerweise die letzten Worte, die ein Muslim vor dem Tod spricht. Sie wird in jedem Gebet und im Gebetsruf (Adhan) wiederholt.

Für Kinder, die über den Islam lernen, bedeutet das Verständnis der Schahada:
- Allah ist der Einzige, der der Anbetung würdig ist
- Der Prophet Muhammad ﷺ ist unser Wegweiser, der uns zeigt, wie wir nach Allahs Führung leben sollen
- Dieses einfache Bekenntnis verbindet alle Muslime weltweit als eine Gemeinschaft`,
    bosnianContent: `Šehadet je muslimanska izjava vjere: "La ilahe illallah, Muhammedun resulullah" (Nema drugog boga osim Allaha, a Muhammed je Allahov poslanik).

Kada osoba izgovori ovo s uvjerenjem, postaje musliman. Ova izjava potvrđuje vjerovanje u jednoću Allaha (Tevhid) i priznaje Poslanika Muhammeda ﷺ kao Njegovog posljednjeg poslanika.

Šehadet je također prva stvar koja se šapće u uho novorođenčetu i idealno posljednje riječi koje musliman izgovara prije smrti. Ponavlja se u svakoj molitvi i u pozivu na molitvu (ezan).

Za djecu koja uče o islamu, razumijevanje Šehadeta znači prepoznavanje:
- Allah je jedini Koji je dostojan obožavanja
- Poslanik Muhammed ﷺ je naš vodič koji nam pokazuje kako živjeti prema Allahovoj uputi
- Ova jednostavna izjava povezuje sve muslimane širom svijeta kao jednu zajednicu`,
    italianContent: `La Shahada è la dichiarazione di fede musulmana: "La ilaha illa Allah, Muhammad rasul Allah" (Non c'è dio all'infuori di Allah, e Muhammad è il messaggero di Allah).

Quando una persona recita questo con convinzione, diventa musulmana. Questa dichiarazione conferma la fede nell'unicità di Allah (Tawhid) e riconosce il Profeta Muhammad ﷺ come il Suo ultimo messaggero.

La Shahada è anche la prima cosa sussurrata all'orecchio di un neonato e idealmente le ultime parole che un musulmano pronuncia prima della morte. Viene ripetuta in ogni preghiera e nella chiamata alla preghiera (adhan).

Per i bambini che imparano l'Islam, comprendere la Shahada significa riconoscere:
- Allah è l'unico degno di adorazione
- Il Profeta Muhammad ﷺ è la nostra guida che ci mostra come vivere secondo la guida di Allah
- Questa semplice dichiarazione collega tutti i musulmani in tutto il mondo come un'unica comunità`
  },
  {
    id: "salah",
    title: "Salah (Prayer)",
    albanianTitle: "Namazi (Lutja)",
    bosnianTitle: "Namaz (molitva)",
    germanTitle: "Salah (Gebet)",
    italianTitle: "Salah (Preghiera)",
    description: "The five daily prayers that connect Muslims with Allah.",
    albanianDescription: "Pesë lutjet ditore që lidhin muslimanët me Allahun.",
    bosnianDescription: "Pet dnevnih molitvi koje povezuju muslimane s Allahom.",
    germanDescription: "Die fünf täglichen Gebete, die Muslime mit Allah verbinden.",
    italianDescription: "Le cinque preghiere quotidiane che collegano i musulmani con Allah.",
    imageUrl: "https://camiahaber.com/wp-content/uploads/2024/05/Namaz.jpeg",
    content: `Muslims perform five obligatory prayers each day:

1. Fajr - Dawn prayer, before sunrise
2. Dhuhr - Noon prayer, after the sun passes its highest point
3. Asr - Afternoon prayer, when shadows are twice the length of objects
4. Maghrib - Sunset prayer, just after the sun sets
5. Isha - Night prayer, when darkness has fallen

Each prayer has specific units (rakahs) involving standing, bowing, prostrating, and sitting. Before praying, Muslims must perform wudu (ablution) to purify themselves.

Prayer helps Muslims to:
- Remember Allah throughout the day
- Take breaks from worldly concerns to reconnect with spiritual values
- Develop discipline and focus
- Feel connected to Muslims worldwide who pray at the same times
- Express gratitude and seek guidance

Children typically begin learning prayers around age seven, practicing the movements and short surahs, gradually building their knowledge and understanding.`,
    germanContent: `Muslime verrichten täglich fünf Pflichtgebete:

1. Fadschr - Morgengebet, vor Sonnenaufgang
2. Zuhr - Mittagsgebet, nachdem die Sonne ihren höchsten Punkt überschritten hat
3. Asr - Nachmittagsgebet, wenn die Schatten doppelt so lang sind wie die Gegenstände
4. Maghrib - Abendgebet, direkt nach Sonnenuntergang
5. Isha - Nachtgebet, wenn die Dunkelheit eingetreten ist

Jedes Gebet hat spezifische Einheiten (Rakahs), die Stehen, Verbeugen, Niederwerfen und Sitzen beinhalten. Vor dem Gebet müssen Muslime Wudu (rituelle Waschung) durchführen, um sich zu reinigen.

Das Gebet hilft Muslimen:
- Sich den ganzen Tag über an Allah zu erinnern
- Pausen von weltlichen Sorgen zu machen, um sich mit spirituellen Werten zu verbinden
- Disziplin und Fokus zu entwickeln
- Sich mit Muslimen weltweit verbunden zu fühlen, die zur gleichen Zeit beten
- Dankbarkeit auszudrücken und Führung zu suchen

Kinder beginnen typischerweise im Alter von sieben Jahren, die Gebete zu erlernen, üben die Bewegungen und kurze Suren und bauen so schrittweise ihr Wissen und Verständnis auf.`,
    albanianContent: `Muslimanët kryejnë pesë namaze të detyrueshme çdo ditë:

1. Sabahu - Namazi i agimit, para lindjes së diellit
2. Dreka - Namazi i mesditës, pasi dielli kalon pikën më të lartë
3. Ikindia - Namazi i pasdites, kur hijet janë dyfish më të gjata se objektet
4. Akshami - Namazi i perëndimit të diellit, menjëherë pas perëndimit të diellit
5. Jacia - Namazi i natës, kur errësira ka rënë

Çdo namaz ka njësi specifike (rekate) që përfshin qëndrimin në këmbë, përkuljen, sexhden dhe uljen. Para se të falen, muslimanët duhet të marrin abdest për të pastruar veten.

Namazi i ndihmon muslimanët të:
- Kujtojnë Allahun gjatë gjithë ditës
- Bëjnë pushim nga shqetësimet e kësaj bote për t'u rilidhur me vlerat shpirtërore
- Zhvillojnë disiplinë dhe përqendrim
- Ndjejnë lidhje me muslimanët në mbarë botën që falen në të njëjtat orare
- Shprehin mirënjohje dhe kërkojnë udhëzim

Fëmijët zakonisht fillojnë të mësojnë namazin rreth moshës shtatë vjeç, duke praktikuar lëvizjet dhe suret e shkurtra, duke ndërtuar gradualisht njohuritë dhe kuptimin e tyre.`,
    bosnianContent: `Muslimani obavljaju pet obaveznih molitvi svaki dan:

1. Sabah - Jutarnja molitva, prije izlaska sunca
2. Podne - Podnevna molitva, nakon što sunce pređe najvišu tačku
3. Ikindija - Poslijepodnevna molitva, kada sjene postanu dvostruko duže od predmeta
4. Akšam - Molitva pri zalasku sunca, odmah nakon zalaska sunca
5. Jacija - Noćna molitva, kada padne mrak

Svaka molitva ima specifične jedinice (rekate) koje uključuju stajanje, pregibanje, padanje na sedždu i sjedenje. Prije molitve, muslimani moraju uzeti abdest kako bi se očistili.

Namaz pomaže muslimanima da:
- Sjećaju se Allaha tokom cijelog dana
- Naprave pauzu od svjetovnih briga kako bi se ponovno povezali s duhovnim vrijednostima
- Razvijaju disciplinu i fokus
- Osjećaju povezanost s muslimanima širom svijeta koji klanjaju u isto vrijeme
- Izražavaju zahvalnost i traže upute

Djeca obično počinju učiti namaz oko sedme godine života, vježbajući pokrete i kratke sure, postepeno izgrađujući svoje znanje i razumijevanje.`,
    italianContent: `I musulmani eseguono cinque preghiere obbligatorie ogni giorno:

1. Fajr - Preghiera dell'alba, prima del sorgere del sole
2. Dhuhr - Preghiera di mezzogiorno, dopo che il sole ha superato il punto più alto
3. Asr - Preghiera del pomeriggio, quando le ombre sono due volte la lunghezza degli oggetti
4. Maghrib - Preghiera del tramonto, subito dopo il tramonto del sole
5. Isha - Preghiera della notte, quando è calata l'oscurità

Ogni preghiera ha unità specifiche (raka'at) che comportano stare in piedi, inchinarsi, prostrarsi e sedere. Prima di pregare, i musulmani devono eseguire il wudu (abluzione) per purificarsi.

La preghiera aiuta i musulmani a:
- Ricordare Allah durante tutto il giorno
- Prendere pause dalle preoccupazioni mondane per riconnettersi con i valori spirituali
- Sviluppare disciplina e concentrazione
- Sentirsi connessi con i musulmani di tutto il mondo che pregano negli stessi orari
- Esprimere gratitudine e cercare guida

I bambini in genere iniziano a imparare le preghiere intorno ai sette anni, praticando i movimenti e le sure brevi, costruendo gradualmente la loro conoscenza e comprensione.`
  },
  {
    id: "zakat",
    title: "Zakat (Charity)",
    albanianTitle: "Zekati (Bamirësia)",
    bosnianTitle: "Zekat (milostinja)",
    germanTitle: "Zakat (Almosen)",
    italianTitle: "Zakat (Carità)",
    description: "Giving a portion of one's wealth to those in need.",
    albanianDescription: "Dhënia e një pjese të pasurisë për nevojat e të tjerëve.",
    bosnianDescription: "Davanje dijela svog bogatstva onima kojima je potrebno.",
    germanDescription: "Einen Teil des eigenen Vermögens an Bedürftige geben.",
    italianDescription: "Donare una parte della propria ricchezza a chi è nel bisogno.",
    imageUrl: "https://muslimaid-2022.storage.googleapis.com/upload/img_cache/file-29305-757cec00b07373230a40892072fcc098.jpg",
    content: `Zakat is the obligatory giving of a set portion of one's wealth to charity. It is paid by adult Muslims who possess wealth above a certain threshold (nisab) for one lunar year.

The standard rate of Zakat is 2.5% of a Muslim's total savings and wealth. This wealth is given to specific categories of people mentioned in the Quran, including:
- The poor
- The needy
- Those employed to collect Zakat
- Those whose hearts need to be reconciled
- To free captives or slaves
- Those in debt
- In the cause of Allah
- The traveler in need

Zakat has both spiritual and social benefits:
- It purifies wealth and the heart from greed
- It builds empathy for those less fortunate
- It reduces inequality in society
- It promotes a sense of community and mutual support

Children can learn about Zakat by participating in charity activities, donating from their allowance or gifts, and understanding that sharing wealth is an act of worship that pleases Allah.`,
    germanContent: `Zakat ist die obligatorische Abgabe eines festgelegten Teils des eigenen Vermögens für wohltätige Zwecke. Es wird von erwachsenen Muslimen gezahlt, die über ein bestimmtes Vermögen (Nisab) für ein Mondjahr verfügen.

Der Standardsatz für Zakat beträgt 2,5% der gesamten Ersparnisse und des Vermögens eines Muslims. Dieses Vermögen wird bestimmten im Koran erwähnten Personengruppen gegeben, darunter:
- Die Armen
- Die Bedürftigen
- Diejenigen, die für das Sammeln von Zakat angestellt sind
- Diejenigen, deren Herzen versöhnt werden müssen
- Um Gefangene oder Sklaven zu befreien
- Diejenigen, die verschuldet sind
- Für die Sache Allahs
- Der Reisende in Not

Zakat hat sowohl spirituelle als auch soziale Vorteile:
- Es reinigt das Vermögen und das Herz von Gier
- Es baut Empathie für die weniger Glücklichen auf
- Es verringert die Ungleichheit in der Gesellschaft
- Es fördert ein Gefühl der Gemeinschaft und gegenseitigen Unterstützung

Kinder können über Zakat lernen, indem sie an Wohltätigkeitsaktivitäten teilnehmen, von ihrem Taschengeld oder Geschenken spenden und verstehen, dass das Teilen von Reichtum eine Handlung der Anbetung ist, die Allah gefällt.`,
    albanianContent: `Zekati është dhënia e detyrueshme e një pjese të caktuar të pasurisë së dikujt për bamirësi. Paguhet nga muslimanët e rritur që posedojnë pasuri mbi një prag të caktuar (nisab) për një vit hënor.

Norma standarde e Zekatit është 2.5% e kursimeve dhe pasurisë totale të një muslimani. Kjo pasuri u jepet kategorive specifike të njerëzve të përmendur në Kuran, duke përfshirë:
- Të varfërit
- Nevojtarët
- Ata që punojnë për të mbledhur Zekatin
- Ata zemrat e të cilëve duhet të pajtohen
- Për të liruar të burgosurit ose skllevërit
- Ata që janë në borxh
- Në rrugën e Allahut
- Udhëtarët në nevojë

Zekati ka përfitime si shpirtërore ashtu edhe sociale:
- Pastron pasurinë dhe zemrën nga lakmia
- Ndërton empati për ata që janë më pak të fortunshëm
- Zvogëlon pabarazinë në shoqëri
- Promovon një ndjenjë komuniteti dhe mbështetjeje të ndërsjellë

Fëmijët mund të mësojnë për Zekatin duke marrë pjesë në aktivitete bamirësie, duke dhuruar nga të ardhurat ose dhuratat e tyre, dhe duke kuptuar se ndarja e pasurisë është një veprim adhurimi që i pëlqen Allahut.`,
    bosnianContent: `Zekat je obavezno davanje određenog dijela svog bogatstva u dobrotvorne svrhe. Plaćaju ga odrasli muslimani koji posjeduju bogatstvo iznad određenog praga (nisab) tokom jedne lunarne godine.

Standardna stopa zekata je 2,5% ukupne ušteđevine i bogatstva muslimana. Ovo bogatstvo se daje određenim kategorijama ljudi spomenutim u Kuranu, uključujući:
- Siromašne
- Potrebite
- One koji su zaposleni da sakupljaju zekat
- One čija srca treba pridobiti
- Za oslobađanje zarobljenika ili robova
- One koji su u dugovima
- Na Allahovom putu
- Putnike u potrebi

Zekat ima i duhovne i društvene koristi:
- Čisti bogatstvo i srce od pohlepe
- Gradi empatiju prema onima koji su manje sretni
- Smanjuje nejednakost u društvu
- Promovira osjećaj zajednice i međusobne podrške

Djeca mogu učiti o zekatu kroz učešće u dobrotvornim aktivnostima, doniranjem iz svog džeparca ili poklona, i razumijevanjem da je dijeljenje bogatstva čin obožavanja koji je Allahu drag.`,
    italianContent: `Lo Zakat è l'offerta obbligatoria di una parte stabilita della propria ricchezza in beneficenza. Viene pagato dai musulmani adulti che possiedono ricchezza al di sopra di una certa soglia (nisab) per un anno lunare.

La percentuale standard dello Zakat è del 2,5% del totale dei risparmi e della ricchezza di un musulmano. Questa ricchezza viene donata a specifiche categorie di persone menzionate nel Corano, tra cui:
- I poveri
- I bisognosi
- Coloro che sono impiegati per raccogliere lo Zakat
- Coloro i cui cuori hanno bisogno di essere riconciliati
- Per liberare prigionieri o schiavi
- Coloro che sono indebitati
- Per la causa di Allah
- Il viaggiatore in difficoltà

Lo Zakat ha benefici sia spirituali che sociali:
- Purifica la ricchezza e il cuore dall'avidità
- Sviluppa empatia per i meno fortunati
- Riduce la disuguaglianza nella società
- Promuove un senso di comunità e supporto reciproco

I bambini possono imparare a conoscere lo Zakat partecipando ad attività di beneficenza, donando dalla loro paghetta o dai regali, e comprendendo che condividere la ricchezza è un atto di adorazione che piace ad Allah.`
  },
  {
    id: "sawm",
    title: "Sawm (Fasting)",
    albanianTitle: "Agjërimi (Saum)",
    bosnianTitle: "Post (mjesec Ramazan)",
    germanTitle: "Sawm (Fasten)",
    italianTitle: "Sawm (Digiuno)",
    description: "Fasting during the month of Ramadan.",
    albanianDescription: "Agjërimi gjatë muajit të Ramazanit.",
    bosnianDescription: "Post tokom mjeseca Ramazana.",
    germanDescription: "Fasten während des Monats Ramadan.",
    italianDescription: "Digiuno durante il mese di Ramadan.",
    imageUrl: "https://img.freepik.com/vektoren-kostenlos/realistischer-hintergrund-fuer-die-islamische-ramadan-feier_23-2150144249.jpg?t=st=1743182538~exp=1743186138~hmac=a93e0c8f0e319da68376ea6f22cfb059b2a0e285e31dc665b320a3804f81b7fa&w=996",
    content: `Sawm is fasting during the month of Ramadan, the ninth month of the Islamic lunar calendar. From dawn until sunset, Muslims abstain from:
- Food and drink
- Marital relations
- Bad behavior such as lying, backbiting, and arguing

The fast begins with suhoor (pre-dawn meal) and ends with iftar (breaking the fast at sunset).

Benefits of fasting include:
- Developing self-control and discipline
- Building empathy for those who don't have enough food
- Focusing on spiritual growth over physical desires
- Strengthening community bonds through shared iftar meals
- Experiencing the joy of Eid al-Fitr celebration at the end of Ramadan

Fasting becomes obligatory when children reach puberty, but many begin practicing partial fasts at a younger age. Children, elderly people, travelers, pregnant or nursing women, and those who are ill are exempted from fasting.

During Ramadan, Muslims also increase other acts of worship such as reading the Quran, giving charity, and performing extra prayers (Taraweeh).`,
    germanContent: `Sawm ist das Fasten während des Monats Ramadan, dem neunten Monat des islamischen Mondkalenders. Von der Morgendämmerung bis zum Sonnenuntergang enthalten sich Muslime:
- Essen und Trinken
- Eheliche Beziehungen
- Schlechtes Verhalten wie Lügen, Nachrede und Streiten

Das Fasten beginnt mit Suhoor (Mahlzeit vor der Morgendämmerung) und endet mit Iftar (Fastenbrechen bei Sonnenuntergang).

Zu den Vorteilen des Fastens gehören:
- Entwicklung von Selbstkontrolle und Disziplin
- Aufbau von Empathie für diejenigen, die nicht genug zu essen haben
- Fokussierung auf spirituelles Wachstum gegenüber körperlichen Bedürfnissen
- Stärkung der Gemeinschaftsbindungen durch gemeinsame Iftar-Mahlzeiten
- Erleben der Freude des Eid al-Fitr-Festes am Ende des Ramadan

Das Fasten wird obligatorisch, wenn Kinder die Pubertät erreichen, aber viele beginnen bereits in jüngerem Alter mit teilweisem Fasten. Kinder, ältere Menschen, Reisende, schwangere oder stillende Frauen und Kranke sind vom Fasten befreit.

Während des Ramadan verstärken Muslime auch andere Formen der Gottesanbetung wie das Lesen des Korans, Wohltätigkeit und zusätzliche Gebete (Taraweeh).`,
    albanianContent: `Agjërimi është abstenim gjatë muajit të Ramazanit, muaji i nëntë i kalendarit hënor islamik. Nga agimi deri në perëndim të diellit, muslimanët abstenojnë nga:
- Ushqimi dhe pijet
- Marrëdhëniet martesore
- Sjellja e keqe si gënjeshtra, thashethemet dhe debatet

Agjërimi fillon me syfyr (vakti para agimit) dhe përfundon me iftar (thyerja e agjërimit në perëndim të diellit).

Përfitimet e agjërimit përfshijnë:
- Zhvillimin e vetëkontrollit dhe disiplinës
- Ndërtimin e empatisë për ata që nuk kanë ushqim të mjaftueshëm
- Fokusimin në rritjen shpirtërore mbi dëshirat fizike
- Forcimin e lidhjeve të komunitetit përmes vakteve të përbashkëta të iftarit
- Përjetimin e gëzimit të festës së Fitër Bajramit në fund të Ramazanit

Agjërimi bëhet i detyrueshëm kur fëmijët arrijnë pubertetin, por shumë prej tyre fillojnë të praktikojnë agjërime të pjesshme në një moshë më të re. Fëmijët, të moshuarit, udhëtarët, gratë shtatzëna ose ato që ushqejnë fëmijët me gji, dhe ata që janë të sëmurë janë të përjashtuar nga agjërimi.

Gjatë Ramazanit, muslimanët gjithashtu shtojnë akte të tjera të adhurimit si leximi i Kuranit, dhënia e lëmoshës dhe kryerja e namazeve shtesë (Teravih).`,
    bosnianContent: `Post je suzdržavanje tokom mjeseca Ramazana, devetog mjeseca islamskog lunarnog kalendara. Od zore do zalaska sunca, muslimani se suzdržavaju od:
- Hrane i pića
- Bračnih odnosa
- Lošeg ponašanja poput laganja, ogovaranja i svađanja

Post počinje sa suhurom (obrok prije zore) i završava se iftarom (prekidanje posta pri zalasku sunca).

Koristi posta uključuju:
- Razvijanje samokontrole i discipline
- Izgradnju empatije prema onima koji nemaju dovoljno hrane
- Fokusiranje na duhovni rast umjesto na fizičke želje
- Jačanje veza zajednice kroz zajedničke iftare
- Doživljavanje radosti Ramazanskog bajrama na kraju Ramazana

Post postaje obavezan kada djeca dostignu pubertet, ali mnogi počinju prakticirati djelimične postove u mlađoj dobi. Djeca, stariji ljudi, putnici, trudnice ili dojilje, i oni koji su bolesni su izuzeti od posta.

Tokom Ramazana, muslimani također povećavaju druge oblike ibadeta kao što su učenje Kurana, davanje u dobrotvorne svrhe i obavljanje dodatnih molitvi (teravih namaz).`,
    italianContent: `Il Sawm è il digiuno durante il mese di Ramadan, il nono mese del calendario lunare islamico. Dall'alba al tramonto, i musulmani si astengono da:
- Cibo e bevande
- Relazioni coniugali
- Comportamenti negativi come mentire, criticare alle spalle e litigare

Il digiuno inizia con il suhoor (pasto prima dell'alba) e termina con l'iftar (rottura del digiuno al tramonto).

I benefici del digiuno includono:
- Sviluppare autocontrollo e disciplina
- Costruire empatia per coloro che non hanno cibo a sufficienza
- Concentrarsi sulla crescita spirituale piuttosto che sui desideri fisici
- Rafforzare i legami comunitari attraverso i pasti iftar condivisi
- Sperimentare la gioia della celebrazione dell'Eid al-Fitr alla fine del Ramadan

Il digiuno diventa obbligatorio quando i bambini raggiungono la pubertà, ma molti iniziano a praticare digiuni parziali in età più giovane. Bambini, anziani, viaggiatori, donne in gravidanza o che allattano e persone malate sono esentati dal digiuno.

Durante il Ramadan, i musulmani aumentano anche altri atti di adorazione come la lettura del Corano, la beneficenza e l'esecuzione di preghiere aggiuntive (Taraweeh).`
  },
  {
    id: "hajj",
    title: "Hajj (Pilgrimage)",
    albanianTitle: "Haxhi (Pelegrinazhi)",
    bosnianTitle: "Hadž (hadžiluk)",
    germanTitle: "Hadsch (Pilgerfahrt)",
    italianTitle: "Hajj (Pellegrinaggio)",
    description: "The pilgrimage to Makkah that Muslims must complete once in their lifetime if able.",
    albanianDescription: "Pelegrinazhi në Mekë që muslimanët duhet ta kryejnë një herë në jetën e tyre nëse janë në gjendje.",
    bosnianDescription: "Hodočašće u Meku koje muslimani moraju obaviti jednom u životu ako su u mogućnosti.",
    germanDescription: "Die Pilgerfahrt nach Mekka, die Muslime einmal in ihrem Leben machen müssen, wenn sie dazu in der Lage sind.",
    italianDescription: "Il pellegrinaggio alla Mecca che i musulmani devono completare una volta nella vita se ne sono in grado.",
    imageUrl: "https://static.zawya.com/view/acePublic/alias/contentid/YmVkODY3NWUtMmE2ZS00/1/afp_34wj38p-jpg.webp?f=3%3A2&q=0.75&w=640",
    content: `Hajj is the pilgrimage to Makkah, Saudi Arabia, that every financially and physically able Muslim must perform once in their lifetime. It takes place during the 12th month of the Islamic lunar calendar, Dhul-Hijjah.

The main rituals of Hajj include:
- Entering into ihram (a state of purity and dedication)
- Performing tawaf (circling the Kaaba seven times)
- Sa'i (walking between the hills of Safa and Marwa)
- Standing at the plain of Arafat for prayer and reflection
- Spending the night at Muzdalifah and collecting pebbles
- Stoning the pillars that represent Satan
- Sacrificing an animal to commemorate Prophet Ibrahim's willingness to sacrifice his son
- Performing a final tawaf of the Kaaba

Hajj represents:
- Unity of Muslims from all backgrounds gathering in one place
- Equality, as everyone wears the same simple white garments
- Remembrance of Prophet Ibrahim and his family's submission to Allah
- A spiritual journey symbolizing the human journey to the Divine

After Hajj, Muslims celebrate Eid al-Adha (Festival of Sacrifice). Those who complete Hajj are given the honorific title "Hajji."

For children, learning about Hajj builds excitement about potentially making this sacred journey when they're older. They can learn about the rituals through stories and activities that explain the significance of each step.`,
    germanContent: `Hadsch ist die Pilgerfahrt nach Mekka, Saudi-Arabien, die jeder finanziell und körperlich fähige Muslim einmal in seinem Leben unternehmen muss. Sie findet während des 12. Monats des islamischen Mondkalenders, Dhul-Hiddscha, statt.

Die wichtigsten Rituale des Hadsch umfassen:
- Eintritt in den Ihram (ein Zustand der Reinheit und Hingabe)
- Durchführung des Tawaf (siebenfaches Umkreisen der Kaaba)
- Sa'i (Gehen zwischen den Hügeln von Safa und Marwa)
- Stehen in der Ebene von Arafat für Gebet und Reflexion
- Verbringen der Nacht in Muzdalifah und Sammeln von Kieselsteinen
- Steinigung der Säulen, die Satan darstellen
- Opferung eines Tieres zum Gedenken an die Bereitschaft des Propheten Ibrahim, seinen Sohn zu opfern
- Durchführung eines abschließenden Tawaf der Kaaba

Hadsch steht für:
- Einheit der Muslime aus allen Hintergründen, die sich an einem Ort versammeln
- Gleichheit, da alle die gleichen einfachen weißen Gewänder tragen
- Erinnerung an den Propheten Ibrahim und die Hingabe seiner Familie an Allah
- Eine spirituelle Reise, die die menschliche Reise zum Göttlichen symbolisiert

Nach dem Hadsch feiern die Muslime Eid al-Adha (Opferfest). Diejenigen, die den Hadsch vollenden, erhalten den Ehrentitel "Hadschi".

Für Kinder schafft das Lernen über den Hadsch Vorfreude auf die Möglichkeit, diese heilige Reise zu unternehmen, wenn sie älter sind. Sie können durch Geschichten und Aktivitäten, die die Bedeutung jedes Schrittes erklären, über die Rituale lernen.`,
    albanianContent: `Haxhi është pelegrinazhi në Mekë, Arabinë Saudite, që çdo musliman financiarisht dhe fizikisht i aftë duhet ta kryejë një herë në jetën e tij. Ai mbahet gjatë muajit të 12-të të kalendarit hënor islamik, Dhul-Hixhe.

Ritualet kryesore të Haxhit përfshijnë:
- Hyrja në ihram (një gjendje e pastërtisë dhe përkushtimit)
- Kryerja e tavafit (rrotullimi i Qabesë shtatë herë)
- Saji (ecja midis kodrave të Safasë dhe Mervasë)
- Qëndrimi në fushën e Arafatit për lutje dhe reflektim
- Kalimi i natës në Muzdelife dhe mbledhja e gurëve
- Gjuajtja e shtyllave që përfaqësojnë Shejtanin
- Therja e një kafshe për të përkujtuar gatishmërinë e Profetit Ibrahim për të sakrifikuar djalin e tij
- Kryerja e një tavafi përfundimtar të Qabesë

Haxhi përfaqëson:
- Unitetin e muslimanëve nga të gjitha prejardhjet duke u mbledhur në një vend
- Barazinë, pasi të gjithë veshin të njëjtat veshje të thjeshta të bardha
- Përkujtimin e Profetit Ibrahim dhe nënshtrimin e familjes së tij ndaj Allahut
- Një udhëtim shpirtëror që simbolizon udhëtimin njerëzor drejt Hyjnores

Pas Haxhit, muslimanët festojnë Kurban Bajramin (Festa e Sakrificës). Ata që kryejnë Haxhin marrin titullin nderi "Haxhi."

Për fëmijët, mësimi për Haxhin ndërton entuziazëm për mundësinë e kryerjes së këtij udhëtimi të shenjtë kur të rriten. Ata mund të mësojnë për ritualet përmes tregimeve dhe aktiviteteve që shpjegojnë rëndësinë e çdo hapi.`,
    bosnianContent: `Hadž je hodočašće u Meku, Saudijsku Arabiju, koje svaki finansijski i fizički sposoban musliman mora obaviti jednom u životu. Održava se tokom 12. mjeseca islamskog lunarnog kalendara, Zul-hidždže.

Glavni obredi hadža uključuju:
- Ulazak u ihram (stanje čistoće i posvećenosti)
- Obavljanje tavafa (kruženje oko Kabe sedam puta)
- Sa'j (hodanje između brda Safe i Merve)
- Stajanje na Arefatu za molitvu i razmišljanje
- Provođenje noći na Muzdelifi i sakupljanje kamenčića
- Kamenovanje stubova koji predstavljaju šejtana
- Žrtvovanje životinje u spomen na spremnost Poslanika Ibrahima da žrtvuje svog sina
- Obavljanje završnog tavafa oko Kabe

Hadž predstavlja:
- Jedinstvo muslimana iz svih sredina koji se okupljaju na jednom mjestu
- Jednakost, jer svi nose iste jednostavne bijele odore
- Sjećanje na Poslanika Ibrahima i predanost njegove porodice Allahu
- Duhovno putovanje koje simbolizira ljudski put prema Božanskom

Nakon hadža, muslimani proslavljaju Kurban-bajram (Praznik žrtve). Oni koji obave hadž dobijaju počasnu titulu "hadžija."

Za djecu, učenje o hadžu gradi uzbuđenje oko mogućnosti da obave ovo sveto putovanje kada odrastu. Mogu učiti o obredima kroz priče i aktivnosti koje objašnjavaju značaj svakog koraka.`,
    italianContent: `L'Hajj è il pellegrinaggio alla Mecca, in Arabia Saudita, che ogni musulmano finanziariamente e fisicamente in grado deve compiere una volta nella vita. Si svolge durante il 12° mese del calendario lunare islamico, Dhul-Hijjah.

I principali rituali dell'Hajj includono:
- Entrare in ihram (uno stato di purezza e dedizione)
- Eseguire il tawaf (circondare la Kaaba sette volte)
- Sa'i (camminare tra le colline di Safa e Marwa)
- Stare nella pianura di Arafat per la preghiera e la riflessione
- Trascorrere la notte a Muzdalifah e raccogliere ciottoli
- Lapidare i pilastri che rappresentano Satana
- Sacrificare un animale per commemorare la disponibilità del Profeta Ibrahim a sacrificare suo figlio
- Eseguire un tawaf finale della Kaaba

L'Hajj rappresenta:
- Unità dei musulmani provenienti da tutti i contesti che si riuniscono in un unico luogo
- Uguaglianza, poiché tutti indossano le stesse semplici vesti bianche
- Ricordo del Profeta Ibrahim e della sottomissione della sua famiglia ad Allah
- Un viaggio spirituale che simboleggia il viaggio umano verso il Divino

Dopo l'Hajj, i musulmani celebrano l'Eid al-Adha (Festa del Sacrificio). Coloro che completano l'Hajj ricevono il titolo onorifico di "Hajji".

Per i bambini, imparare a conoscere l'Hajj crea entusiasmo per la possibilità di compiere questo sacro viaggio quando saranno più grandi. Possono imparare i rituali attraverso storie e attività che spiegano il significato di ogni passo.`
  }
];

// Define content for Islamic beliefs
export const islamicBeliefsData: Section[] = [
  {
    id: "allah",
    title: "Belief in Allah",
    albanianTitle: "Besimi në Allahun",
    bosnianTitle: "Vjerovanje u Allaha",
    germanTitle: "Glaube an Allah",
    italianTitle: "Fede in Allah",
    description: "Believing in the Oneness of Allah (Tawhid).",
    albanianDescription: "Besimi në Njëshmërinë e Allahut (Teuhid).",
    bosnianDescription: "Vjerovanje u Jednoću Allaha (Tevhid).",
    germanDescription: "Der Glaube an die Einheit Allahs (Tauhid).",
    italianDescription: "Credere nell'Unicità di Allah (Tawhid).",
    imageUrl: "https://www.mysalahmat.com/cdn/shop/articles/Discount_Promotions_Instagram_Post-20_700x.png?v=1721388774",
    content: `Belief in Allah is the foundation of Islamic faith. Key aspects include:

1. Allah is One (Tawhid) - The most fundamental belief in Islam is that there is only one God, Allah, who has no partners, children, or equals.

2. Allah's Attributes - Allah has 99 beautiful names that describe His attributes, such as The Most Merciful (Ar-Rahman), The All-Knowing (Al-Alim), and The Creator (Al-Khaliq).

3. Allah as Creator - Allah created everything in the universe - every planet, star, animal, plant, and human being.

4. Allah's Sovereignty - Everything happens by Allah's will and permission. He is in control of all affairs.

5. Allah's Mercy and Justice - Allah is both infinitely merciful and perfectly just. He forgives those who sincerely repent and holds accountable those who persist in wrongdoing.

6. Direct Relationship - In Islam, humans have a direct relationship with Allah without intermediaries. We can pray directly to Him for guidance, forgiveness, and blessings.

7. Allah's Nearness - As the Quran states, Allah is closer to us than our jugular vein. He knows our thoughts, intentions, and needs before we express them.

Teaching children about Allah often focuses on His loving and caring attributes, helping them understand that Allah watches over them, loves them when they do good, and is always ready to forgive them when they make mistakes and sincerely regret them.`,
    italianContent: `La fede in Allah è il fondamento della fede islamica. Gli aspetti chiave includono:

1. Allah è Uno (Tawhid) - La credenza più fondamentale nell'Islam è che esiste un solo Dio, Allah, che non ha partner, figli o uguali.

2. Gli attributi di Allah - Allah ha 99 bei nomi che descrivono i Suoi attributi, come il Misericordioso (Ar-Rahman), l'Onnisciente (Al-Alim) e il Creatore (Al-Khaliq).

3. Allah come Creatore - Allah ha creato tutto nell'universo - ogni pianeta, stella, animale, pianta ed essere umano.

4. La sovranità di Allah - Tutto accade per volontà e permesso di Allah. Egli ha il controllo di tutte le questioni.

5. La misericordia e la giustizia di Allah - Allah è allo stesso tempo infinitamente misericordioso e perfettamente giusto. Perdona coloro che si pentono sinceramente e ritiene responsabili coloro che persistono nel fare il male.

6. Relazione diretta - Nell'Islam, gli esseri umani hanno una relazione diretta con Allah senza intermediari. Possiamo pregare direttamente a Lui per ricevere guida, perdono e benedizioni.

7. La vicinanza di Allah - Come afferma il Corano, Allah è più vicino a noi della nostra vena giugulare. Egli conosce i nostri pensieri, intenzioni e bisogni prima che li esprimiamo.

L'insegnamento ai bambini su Allah si concentra spesso sui Suoi attributi amorevoli e premurosi, aiutandoli a capire che Allah veglia su di loro, li ama quando fanno il bene ed è sempre pronto a perdonarli quando commettono errori e se ne pentono sinceramente.`,
    albanianContent: `Besimi në Allahun është themeli i besimit islamik. Aspektet kryesore përfshijnë:

1. Allahu është Një (Teuhid) - Besimi më themelor në Islam është se ekziston vetëm një Zot, Allahu, i cili nuk ka partnerë, fëmijë, apo të barabartë.

2. Cilësitë e Allahut - Allahu ka 99 emra të bukur që përshkruajnë cilësitë e Tij, si Më Mëshiruesi (Err-Rrahman), I Gjithëdijshmi (El-Alim), dhe Krijuesi (El-Khalik).

3. Allahu si Krijues - Allahu krijoi gjithçka në univers - çdo planet, yll, kafshë, bimë dhe qenie njerëzore.

4. Sovraniteti i Allahut - Gjithçka ndodh me vullnetin dhe lejen e Allahut. Ai kontrollon të gjitha çështjet.

5. Mëshira dhe Drejtësia e Allahut - Allahu është njëkohësisht pafundësisht i mëshirshëm dhe plotësisht i drejtë. Ai i fal ata që pendohen sinqerisht dhe i mban përgjegjës ata që vazhdojnë të bëjnë vepra të këqija.

6. Marrëdhënie e Drejtpërdrejtë - Në Islam, njerëzit kanë një marrëdhënie të drejtpërdrejtë me Allahun pa ndërmjetës. Ne mund t'i lutemi drejtpërdrejt Atij për udhëzim, falje dhe bekime.

7. Afërsia e Allahut - Siç thotë Kurani, Allahu është më afër nesh sesa vena jonë e qafës. Ai i njeh mendimet, qëllimet dhe nevojat tona para se t'i shprehim ato.

Mësimi i fëmijëve për Allahun shpesh përqendrohet në cilësitë e Tij të dashura dhe kujdesshme, duke i ndihmuar ata të kuptojnë se Allahu i vëzhgon, i do kur bëjnë mirë, dhe është gjithmonë i gatshëm t'i falë kur bëjnë gabime dhe pendohen sinqerisht.`,
    bosnianContent: `Vjerovanje u Allaha je temelj islamske vjere. Ključni aspekti uključuju:

1. Allah je Jedan (Tevhid) - Najosnovnije vjerovanje u islamu je da postoji samo jedan Bog, Allah, koji nema partnera, djece, niti ravnih Sebi.

2. Allahovi atributi - Allah ima 99 lijepih imena koja opisuju Njegove atribute, poput Svemilosni (Er-Rahman), Sveznajući (El-Alim) i Stvoritelj (El-Halik).

3. Allah kao Stvoritelj - Allah je stvorio sve u svemiru - svaku planetu, zvijezdu, životinju, biljku i ljudsko biće.

4. Allahov suverenitet - Sve se događa po Allahovoj volji i dopuštenju. On kontroliše sva pitanja.

5. Allahova milost i pravda - Allah je istovremeno beskonačno milostiv i savršeno pravedan. On oprašta onima koji se iskreno pokaju i poziva na odgovornost one koji ustraju u zlu.

6. Direktan odnos - U islamu, ljudi imaju direktan odnos s Allahom bez posrednika. Možemo se direktno moliti Njemu za upute, oprost i blagoslove.

7. Allahova blizina - Kao što Kur'an kaže, Allah je bliži čovjeku od njegove vratne žile. On zna naše misli, namjere i potrebe prije nego što ih izrazimo.

Učenje djece o Allahu često se fokusira na Njegove atribute ljubavi i brige, pomažući im da razumiju da Allah bdije nad njima, voli ih kada čine dobro i uvijek im je spreman oprostiti kada pogriješe i iskreno se pokaju.`,
    germanContent: `Der Glaube an Allah ist das Fundament des islamischen Glaubens. Zu den wichtigsten Aspekten gehören:

1. Allah ist Einer (Tauhid) - Der grundlegendste Glaube im Islam ist, dass es nur einen Gott gibt, Allah, der keine Partner, Kinder oder Seinesgleichen hat.

2. Allahs Attribute - Allah hat 99 schöne Namen, die Seine Eigenschaften beschreiben, wie der Allbarmherzige (Ar-Rahman), der Allwissende (Al-Alim) und der Schöpfer (Al-Khaliq).

3. Allah als Schöpfer - Allah hat alles im Universum erschaffen - jeden Planeten, jeden Stern, jedes Tier, jede Pflanze und jeden Menschen.

4. Allahs Souveränität - Alles geschieht durch Allahs Willen und Erlaubnis. Er hat die Kontrolle über alle Angelegenheiten.

5. Allahs Barmherzigkeit und Gerechtigkeit - Allah ist gleichzeitig unendlich barmherzig und vollkommen gerecht. Er vergibt denjenigen, die aufrichtig bereuen, und hält diejenigen zur Rechenschaft, die im Unrecht verharren.

6. Direkte Beziehung - Im Islam haben Menschen eine direkte Beziehung zu Allah ohne Vermittler. Wir können direkt zu Ihm beten und um Führung, Vergebung und Segen bitten.

7. Allahs Nähe - Wie der Koran sagt, ist Allah uns näher als unsere Halsschlagader. Er kennt unsere Gedanken, Absichten und Bedürfnisse, bevor wir sie ausdrücken.

Bei der Vermittlung des Gottesverständnisses an Kinder stehen oft Seine liebevollen und fürsorglichen Eigenschaften im Mittelpunkt. Die Kinder sollen verstehen, dass Allah über sie wacht, sie liebt, wenn sie Gutes tun, und immer bereit ist, ihnen zu vergeben, wenn sie Fehler machen und aufrichtig bereuen.`
  },
  {
    id: "angels",
    title: "Belief in Angels",
    albanianTitle: "Besimi në Engjëjt",
    bosnianTitle: "Vjerovanje u meleke",
    germanTitle: "Glaube an Engel",
    italianTitle: "Fede negli Angeli",
    description: "Believing in Allah's angels who are created from light.",
    albanianDescription: "Besimi në engjëjt e Allahut që janë krijuar nga drita.",
    bosnianDescription: "Vjerovanje u Allahove meleke koji su stvoreni od svjetlosti.",
    germanDescription: "Der Glaube an Allahs Engel, die aus Licht erschaffen wurden.",
    italianDescription: "Credere negli angeli di Allah che sono creati dalla luce.",
    imageUrl: "https://www.islamweb.net/PicStore/Random/1474868140_92748.jpg",
    content: `Angels are created by Allah from light (nur). They are obedient servants who never disobey Allah and carry out specific duties. Some important angels include:

1. Jibreel (Gabriel) - The angel of revelation who delivered Allah's messages to the prophets, including the Quran to Prophet Muhammad ﷺ.

2. Mikael (Michael) - Responsible for delivering provisions like rain and sustenance.

3. Israfil - Will blow the trumpet to signal the Day of Judgment.

4. Izrael (Angel of Death) - Responsible for taking souls at the time of death.

5. Kiraman Katibin - The recording angels who write down our good and bad deeds. Each person has two angels - one recording good deeds on the right shoulder and one recording bad deeds on the left.

6. Munkar and Nakir - The angels who question people in their graves.

7. Malik - The guardian of Hellfire.

8. Ridwan - The guardian of Paradise.

Angels are invisible to the human eye under normal circumstances. They do not eat or drink, are not male or female, and they glorify Allah continuously.

For children, learning about angels helps them understand that they are never truly alone. The recording angels in particular encourage children to be mindful of their actions and words.`,
    albanianContent: `Engjëjt janë krijuar nga Allahu prej drite (nur). Ata janë shërbëtorë të bindur që kurrë nuk e kundërshtojnë Allahun dhe kryejnë detyra specifike. Disa engjëj të rëndësishëm përfshijnë:

1. Xhibrili (Gabrieli) - Engjëlli i shpalljes i cili i dorëzoi mesazhet e Allahut profetëve, përfshirë Kuranin Profetit Muhamed ﷺ.

2. Mikaili (Mihaeli) - Përgjegjës për dërgimin e furnizimeve si shiu dhe ushqimi.

3. Israfili - Do t'i bjerë surit për të sinjalizuar Ditën e Gjykimit.

4. Azraili (Engjëlli i Vdekjes) - Përgjegjës për marrjen e shpirtrave në kohën e vdekjes.

5. Kiramen Katibin - Engjëjt regjistrues që shkruajnë veprat tona të mira dhe të këqija. Çdo person ka dy engjëj - një duke regjistruar veprat e mira në shpatullën e djathtë dhe një duke regjistruar veprat e këqija në të majtën.

6. Munkeri dhe Nekiri - Engjëjt që i pyesin njerëzit në varret e tyre.

7. Maliku - Rojtari i Xhehenemit.

8. Ridvani - Rojtari i Xhenetit.

Engjëjt janë të padukshëm për syrin njerëzor në rrethana normale. Ata nuk hanë apo pinë, nuk janë as meshkuj as femra, dhe ata e lavdërojnë Allahun vazhdimisht.

Për fëmijët, të mësuarit për engjëjt i ndihmon të kuptojnë se ata nuk janë kurrë vërtet vetëm. Engjëjt regjistrues në veçanti i inkurajojnë fëmijët të jenë të vëmendshëm ndaj veprimeve dhe fjalëve të tyre.`,
    bosnianContent: `Meleki su stvoreni od Allaha od svjetlosti (nur). Oni su poslušni sluge koji nikada ne griješe prema Allahu i izvršavaju posebne dužnosti. Neki važni meleki uključuju:

1. Džibrila (Gabrijela) - Melek objave koji je dostavljao Allahove poruke poslanicima, uključujući Kur'an Poslaniku Muhammedu ﷺ.

2. Mikaila (Mihaela) - Odgovoran za dostavljanje opskrbe poput kiše i hrane.

3. Israfila - Koji će puhnuti u rog da označi Dan Sudnji.

4. Azraila (Melek smrti) - Odgovoran za uzimanje duša u trenutku smrti.

5. Kiramen Katibin - Meleki koji zapisuju naša dobra i loša djela. Svaka osoba ima dva meleka - jedan koji zapisuje dobra djela na desnom ramenu i jedan koji zapisuje loša djela na lijevom.

6. Munkir i Nekir - Meleki koji ispituju ljude u njihovim grobovima.

7. Malik - Čuvar Džehennema.

8. Ridvan - Čuvar Dženneta.

Meleki su nevidljivi ljudskom oku u normalnim okolnostima. Oni ne jedu niti piju, nisu ni muško ni žensko, i oni neprestano slave Allaha.

Za djecu, učenje o melekima im pomaže da razumiju da nikada nisu zaista sami. Meleki koji zapisuju naročito potiču djecu da budu svjesna svojih postupaka i riječi.`,
    germanContent: `Engel sind von Allah aus Licht (Nur) erschaffen. Sie sind gehorsame Diener, die Allah niemals ungehorsam sind und spezifische Aufgaben erfüllen. Zu den wichtigen Engeln gehören:

1. Jibril (Gabriel) - Der Engel der Offenbarung, der Allahs Botschaften an die Propheten überbrachte, einschließlich des Korans an den Propheten Muhammad ﷺ.

2. Mikael (Michael) - Verantwortlich für die Lieferung von Versorgungsgütern wie Regen und Nahrung.

3. Israfil - Wird in die Posaune blasen, um den Tag des Jüngsten Gerichts anzukündigen.

4. Izrael (Todesengel) - Verantwortlich für das Nehmen der Seelen im Moment des Todes.

5. Kiraman Katibin - Die aufzeichnenden Engel, die unsere guten und schlechten Taten aufschreiben. Jede Person hat zwei Engel - einer, der gute Taten auf der rechten Schulter aufzeichnet, und einer, der schlechte Taten auf der linken aufzeichnet.

6. Munkar und Nakir - Die Engel, die Menschen in ihren Gräbern befragen.

7. Malik - Der Wächter des Höllenfeuers.

8. Ridwan - Der Wächter des Paradieses.

Engel sind unter normalen Umständen für das menschliche Auge unsichtbar. Sie essen oder trinken nicht, sind weder männlich noch weiblich, und sie preisen Allah ununterbrochen.

Für Kinder hilft das Lernen über Engel ihnen zu verstehen, dass sie niemals wirklich allein sind. Die aufzeichnenden Engel ermutigen Kinder insbesondere, auf ihre Handlungen und Worte zu achten.`,
    italianContent: `Gli angeli sono creati da Allah dalla luce (nur). Sono servi obbedienti che non disobbediscono mai ad Allah e svolgono compiti specifici. Alcuni angeli importanti includono:

1. Jibril (Gabriele) - L'angelo della rivelazione che ha consegnato i messaggi di Allah ai profeti, incluso il Corano al Profeta Muhammad ﷺ.

2. Mikael (Michele) - Responsabile della consegna di provviste come pioggia e sostentamento.

3. Israfil - Suonerà la tromba per segnalare il Giorno del Giudizio.

4. Izrael (Angelo della Morte) - Responsabile di prendere le anime al momento della morte.

5. Kiraman Katibin - Gli angeli registratori che scrivono le nostre buone e cattive azioni. Ogni persona ha due angeli - uno che registra le buone azioni sulla spalla destra e uno che registra le cattive azioni sulla sinistra.

6. Munkar e Nakir - Gli angeli che interrogano le persone nelle loro tombe.

7. Malik - Il guardiano dell'Inferno.

8. Ridwan - Il guardiano del Paradiso.

Gli angeli sono invisibili all'occhio umano in circostanze normali. Non mangiano né bevono, non sono né maschi né femmine, e glorificano Allah continuamente.

Per i bambini, imparare sugli angeli li aiuta a capire che non sono mai veramente soli. Gli angeli registratori in particolare incoraggiano i bambini ad essere consapevoli delle loro azioni e parole.`
  },
  {
    id: "books",
    title: "Belief in Divine Books",
    albanianTitle: "Besimi në Librat e Shenjtë",
    bosnianTitle: "Vjerovanje u Objavljene knjige",
    germanTitle: "Glaube an Göttliche Bücher",
    italianTitle: "Fede nei Libri Divini",
    description: "Believing in the holy books sent by Allah to His messengers.",
    albanianDescription: "Besimi në librat e shenjtë të dërguar nga Allahu tek të dërguarit e Tij.",
    bosnianDescription: "Vjerovanje u svete knjige koje je Allah objavio Svojim poslanicima.",
    germanDescription: "Der Glaube an die heiligen Bücher, die Allah Seinen Gesandten offenbart hat.",
    italianDescription: "Credere nei libri sacri inviati da Allah ai Suoi messaggeri.",
    imageUrl: "https://dzematstariilijas.ba/wp-content/uploads/2019/02/KURAN.jpeg",
    content: `Muslims believe that Allah has revealed divine guidance through holy books to various prophets throughout history. The main revealed books are:

1. The Quran - Revealed to Prophet Muhammad ﷺ (the final and complete revelation, preserved in its original form)

2. The Injil (Gospel) - Revealed to Prophet Isa (Jesus)

3. The Tawrat (Torah) - Revealed to Prophet Musa (Moses)

4. The Zabur (Psalms) - Revealed to Prophet Dawud (David)

5. The Scrolls of Ibrahim (Abraham)

Muslims believe that:
- The original messages of all these books were from Allah and contained the same essential truths about monotheism, morality, and the afterlife
- The earlier books were meant for specific communities and time periods
- Over time, some earlier revelations were altered or parts were lost
- The Quran was sent as the final revelation to all humanity and will be preserved unchanged until the Day of Judgment

The Quran confirms the truth of earlier revelations while correcting any alterations. It serves as the criterion (Furqan) to distinguish truth from falsehood.

For children, learning about divine books helps them understand the continuity of Allah's guidance throughout history and the special importance of the Quran as the preserved final revelation.`,
    albanianContent: `Muslimanët besojnë se Allahu ka zbuluar udhëzim hyjnor përmes librave të shenjtë të ndryshëm profetëve gjatë historisë. Librat kryesorë të shpallur janë:

1. Kurani - I shpallur Profetit Muhamed ﷺ (shpallja e fundit dhe e plotë, e ruajtur në formën e saj origjinale)

2. Inxhili (Ungjilli) - I shpallur Profetit Isa (Jezusit)

3. Teurati (Tora) - I shpallur Profetit Musa (Moisiut)

4. Zeburi (Psalmet) - I shpallur Profetit Davud (Davidit)

5. Fletët e Ibrahimit (Abrahamit)

Muslimanët besojnë se:
- Mesazhet origjinale të të gjithë këtyre librave ishin nga Allahu dhe përmbanin të njëjtat të vërteta thelbësore për monoteizmin, moralin dhe jetën e përtejme
- Librat e mëparshëm ishin të destinuar për komunitete dhe periudha kohore specifike
- Me kalimin e kohës, disa zbulesa të mëparshme u ndryshuan ose pjesë të tyre u humbën
- Kurani u dërgua si shpallja e fundit për gjithë njerëzimin dhe do të ruhet i pandryshuar deri në Ditën e Gjykimit

Kurani konfirmon të vërtetën e shpalljeve të mëparshme ndërsa korrigjon çdo ndryshim. Ai shërben si kriteri (Furkan) për të dalluar të vërtetën nga e pavërteta.

Për fëmijët, të mësuarit rreth librave hyjnorë i ndihmon të kuptojnë vazhdimësinë e udhëzimit të Allahut përgjatë historisë dhe rëndësinë e veçantë të Kuranit si shpallja e fundit e ruajtur.`,
    bosnianContent: `Muslimani vjeruju da je Allah objavio božansko uputstvo kroz svete knjige različitim poslanicima tokom historije. Glavne objavljene knjige su:

1. Kur'an - Objavljen Poslaniku Muhammedu ﷺ (konačna i potpuna objava, sačuvana u svom izvornom obliku)

2. Indžil (Jevanđelje) - Objavljen Poslaniku Isau (Isusu)

3. Tevrat (Tora) - Objavljen Poslaniku Musau (Mojsiju)

4. Zebur (Psalmi) - Objavljen Poslaniku Davudu (Davidu)

5. Suhufi Ibrahima (Abrahama)

Muslimani vjeruju da:
- Izvorne poruke svih ovih knjiga bile su od Allaha i sadržavale su iste temeljne istine o jednoboštvu, moralu i životu nakon smrti
- Ranije knjige bile su namijenjene određenim zajednicama i vremenskim periodima
- S vremenom su neke ranije objave izmijenjene ili su dijelovi izgubljeni
- Kur'an je poslan kao konačna objava cijelom čovječanstvu i bit će sačuvan nepromijenjen do Sudnjeg dana

Kur'an potvrđuje istinu ranijih objava istovremeno ispravljajući sve izmjene. On služi kao kriterij (Furkan) za razlikovanje istine od neistine.

Za djecu, učenje o božanskim knjigama pomaže im da razumiju kontinuitet Allahovog uputstva kroz historiju i posebnu važnost Kur'ana kao sačuvane konačne objave.`,
    germanContent: `Muslime glauben, dass Allah durch heilige Bücher göttliche Führung an verschiedene Propheten im Laufe der Geschichte offenbart hat. Die wichtigsten offenbarten Bücher sind:

1. Der Koran - Offenbart an den Propheten Muhammad ﷺ (die endgültige und vollständige Offenbarung, in ihrer ursprünglichen Form bewahrt)

2. Das Indschil (Evangelium) - Offenbart an den Propheten Isa (Jesus)

3. Die Thora (Tawrat) - Offenbart an den Propheten Musa (Moses)

4. Die Psalmen (Zabur) - Offenbart an den Propheten Dawud (David)

5. Die Schriftrollen von Ibrahim (Abraham)

Muslime glauben, dass:
- Die ursprünglichen Botschaften aller dieser Bücher von Allah stammten und die gleichen wesentlichen Wahrheiten über Monotheismus, Moral und das Leben nach dem Tod enthielten
- Die früheren Bücher für bestimmte Gemeinschaften und Zeitperioden bestimmt waren
- Im Laufe der Zeit wurden einige frühere Offenbarungen verändert oder Teile gingen verloren
- Der Koran wurde als endgültige Offenbarung an die gesamte Menschheit gesandt und wird bis zum Tag des Jüngsten Gerichts unverändert bewahrt bleiben

Der Koran bestätigt die Wahrheit früherer Offenbarungen und korrigiert gleichzeitig alle Veränderungen. Er dient als Kriterium (Furqan), um Wahrheit von Falschheit zu unterscheiden.

Für Kinder hilft das Lernen über göttliche Bücher ihnen, die Kontinuität von Allahs Führung durch die Geschichte und die besondere Bedeutung des Korans als bewahrte endgültige Offenbarung zu verstehen.`,
    italianContent: `I musulmani credono che Allah abbia rivelato la guida divina attraverso libri sacri a vari profeti nel corso della storia. I principali libri rivelati sono:

1. Il Corano - Rivelato al Profeta Muhammad ﷺ (la rivelazione finale e completa, conservata nella sua forma originale)

2. Il Vangelo (Injil) - Rivelato al Profeta Isa (Gesù)

3. La Torah (Tawrat) - Rivelata al Profeta Musa (Mosè)

4. I Salmi (Zabur) - Rivelati al Profeta Dawud (Davide)

5. I Rotoli di Ibrahim (Abramo)

I musulmani credono che:
- I messaggi originali di tutti questi libri provenivano da Allah e contenevano le stesse verità essenziali sul monoteismo, la moralità e la vita dopo la morte
- I libri precedenti erano destinati a comunità e periodi di tempo specifici
- Nel corso del tempo, alcune rivelazioni precedenti sono state modificate o parti sono andate perdute
- Il Corano è stato inviato come rivelazione finale a tutta l'umanità e sarà conservato immutato fino al Giorno del Giudizio

Il Corano conferma la verità delle rivelazioni precedenti correggendo al contempo eventuali alterazioni. Serve come criterio (Furqan) per distinguere la verità dalla falsità.

Per i bambini, imparare sui libri divini li aiuta a comprendere la continuità della guida di Allah attraverso la storia e l'importanza speciale del Corano come rivelazione finale preservata.`
  },
  {
    id: "messengers",
    title: "Belief in God's Messengers",
    albanianTitle: "Besimi në të Dërguarit e Allahut",
    bosnianTitle: "Vjerovanje u Allahove poslanike",
    germanTitle: "Glaube an Allahs Gesandte",
    italianTitle: "Fede nei Messaggeri di Allah",
    description: "Believing in the prophets sent by Allah to guide humanity.",
    albanianDescription: "Besimi në profetët e dërguar nga Allahu për të udhëzuar njerëzimin.",
    bosnianDescription: "Vjerovanje u poslanike koje je Allah poslao da upute čovječanstvo.",
    germanDescription: "Der Glaube an die Propheten, die von Allah gesandt wurden, um die Menschheit zu führen.",
    italianDescription: "Credere nei profeti inviati da Allah per guidare l'umanità.",
    imageUrl: "https://bibladhekurani.com/wp-content/uploads/2017/03/25402-273c02-jesus-good-shepherd-1920x1200-800x500-660x330.jpg",
    content: `Muslims believe that Allah sent numerous messengers throughout history to guide humanity. Key aspects of this belief include:

1. Chain of Prophethood - Allah has sent prophets to every nation and community throughout history, teaching the same core message of monotheism (Tawhid).

2. Number of Prophets - Islamic tradition mentions that there were 124,000 prophets sent to different peoples at different times, though only 25 are mentioned by name in the Quran.

3. Major Prophets - Some of the major prophets include:
   - Adam (the first human and prophet)
   - Nuh (Noah)
   - Ibrahim (Abraham)
   - Musa (Moses)
   - Isa (Jesus)
   - Muhammad ﷺ (the final prophet)

4. Muhammad ﷺ as the Seal of Prophets - Muslims believe that Prophet Muhammad ﷺ is the final messenger, completing and perfecting the divine message.

5. Character of the Prophets - All prophets were chosen by Allah for their excellent character. They were truthful, honest, intelligent, and free from major sins.

6. Miracles - Many prophets were given miracles as signs of their prophethood. For example, Moses parted the sea, Jesus healed the sick, and Muhammad ﷺ received the Quran and made the night journey (Isra and Mi'raj).

7. Human Nature - Despite their special status, all prophets were human beings, not divine. They ate, slept, married, and eventually died like other humans.

For children, learning about the prophets often takes the form of engaging stories that highlight their perseverance, kindness, honesty, and complete trust in Allah. These stories provide excellent role models and teach important moral lessons.`,
    albanianContent: `Muslimanët besojnë se Allahu ka dërguar shumë të dërguar gjatë historisë për të udhëzuar njerëzimin. Aspektet kryesore të këtij besimi përfshijnë:

1. Zinxhiri i Profetësisë - Allahu ka dërguar profetë në çdo komb dhe komunitet gjatë gjithë historisë, duke mësuar të njëjtin mesazh themelor të monoteizmit (Teuhid).

2. Numri i Profetëve - Tradita islame përmend se ka pasur 124,000 profetë të dërguar te popuj të ndryshëm në kohë të ndryshme, megjithëse vetëm 25 prej tyre përmenden me emër në Kuran.

3. Profetët Kryesorë - Disa nga profetët kryesorë përfshijnë:
   - Ademi (njeriu dhe profeti i parë)
   - Nuhu (Noe)
   - Ibrahimi (Abrahami)
   - Musai (Moisiu)
   - Isai (Jezusi)
   - Muhamedi ﷺ (profeti i fundit)

4. Muhamedi ﷺ si Vula e Profetëve - Muslimanët besojnë se Profeti Muhamed ﷺ është i dërguari i fundit, duke plotësuar dhe përsosur mesazhin hyjnor.

5. Karakteri i Profetëve - Të gjithë profetët u zgjodhën nga Allahu për karakterin e tyre të shkëlqyer. Ata ishin të vërtetë, të ndershëm, inteligjentë dhe të lirë nga mëkatet e mëdha.

6. Mrekullitë - Shumë profetëve iu dhanë mrekulli si shenja të profetësisë së tyre. Për shembull, Musai ndau detin, Isai shëroi të sëmurët, dhe Muhamedi ﷺ mori Kuranin dhe bëri udhëtimin e natës (Isra dhe Miraxh).

7. Natyra Njerëzore - Pavarësisht statusit të tyre të veçantë, të gjithë profetët ishin qenie njerëzore, jo hyjnore. Ata hanin, flinin, martoheshin dhe përfundimisht vdisnin si njerëzit e tjerë.

Për fëmijët, të mësuarit rreth profetëve shpesh merr formën e tregimeve tërheqëse që theksojnë këmbënguljen, mirësinë, ndershmërinë dhe besimin e plotë në Allahun. Këto tregime ofrojnë modele të shkëlqyera dhe mësojnë mësime të rëndësishme morale.`,
    bosnianContent: `Muslimani vjeruju da je Allah poslao brojne poslanike tokom historije da upute čovječanstvo. Ključni aspekti ovog vjerovanja uključuju:

1. Lanac poslanstva - Allah je slao poslanike svakom narodu i zajednici tokom historije, učeći istu osnovnu poruku jednoboštva (Tevhid).

2. Broj poslanika - Islamska tradicija navodi da je bilo 124.000 poslanika poslanih različitim narodima u različitim vremenima, iako se samo 25 spominje imenom u Kur'anu.

3. Glavni poslanici - Neki od glavnih poslanika uključuju:
   - Adem (prvi čovjek i poslanik)
   - Nuh (Noa)
   - Ibrahim (Abraham)
   - Musa (Mojsije)
   - Isa (Isus)
   - Muhammed ﷺ (posljednji poslanik)

4. Muhammed ﷺ kao pečat poslanika - Muslimani vjeruju da je Poslanik Muhammed ﷺ posljednji poslanik, upotpunjavajući i usavršavajući božansku poruku.

5. Karakter poslanika - Svi poslanici su izabrani od Allaha zbog njihovog izvrsnog karaktera. Bili su istinoljubivi, pošteni, inteligentni i oslobođeni velikih grijeha.

6. Čuda - Mnogim poslanicima data su čuda kao znakovi njihovog poslanstva. Na primjer, Musa je razdvojio more, Isa je liječio bolesne, a Muhammed ﷺ je primio Kur'an i doživio noćno putovanje (Isra i Miradž).

7. Ljudska priroda - Uprkos njihovom posebnom statusu, svi poslanici su bili ljudska bića, nisu bili božanstva. Jeli su, spavali, ženili se i na kraju umirali kao i drugi ljudi.

Za djecu, učenje o poslanicima često ima oblik zanimljivih priča koje naglašavaju njihovu istrajnost, dobrotu, iskrenost i potpuno povjerenje u Allaha. Ove priče pružaju izvrsne uzore i uče važne moralne lekcije.`,
    germanContent: `Muslime glauben, dass Allah im Laufe der Geschichte zahlreiche Gesandte geschickt hat, um die Menschheit zu führen. Zu den wichtigsten Aspekten dieses Glaubens gehören:

1. Die Kette der Prophetie - Allah hat zu jeder Nation und Gemeinschaft in der Geschichte Propheten gesandt, die die gleiche Grundbotschaft des Monotheismus (Tawhid) lehrten.

2. Anzahl der Propheten - Die islamische Tradition erwähnt, dass es 124.000 Propheten gab, die zu verschiedenen Völkern zu verschiedenen Zeiten gesandt wurden, obwohl nur 25 namentlich im Koran erwähnt werden.

3. Hauptpropheten - Zu den wichtigsten Propheten gehören:
   - Adam (der erste Mensch und Prophet)
   - Nuh (Noah)
   - Ibrahim (Abraham)
   - Musa (Moses)
   - Isa (Jesus)
   - Muhammad ﷺ (der letzte Prophet)

4. Muhammad ﷺ als Siegel der Propheten - Muslime glauben, dass der Prophet Muhammad ﷺ der letzte Gesandte ist, der die göttliche Botschaft vervollständigt und perfektioniert.

5. Charakter der Propheten - Alle Propheten wurden von Allah aufgrund ihres ausgezeichneten Charakters ausgewählt. Sie waren wahrhaftig, ehrlich, intelligent und frei von schweren Sünden.

6. Wunder - Vielen Propheten wurden Wunder als Zeichen ihrer Prophetie gegeben. Beispielsweise teilte Moses das Meer, Jesus heilte die Kranken, und Muhammad ﷺ erhielt den Koran und machte die Nachtreise (Isra und Miraj).

7. Menschliche Natur - Trotz ihres besonderen Status waren alle Propheten menschliche Wesen, nicht göttlich. Sie aßen, schliefen, heirateten und starben schließlich wie andere Menschen.

Für Kinder nimmt das Lernen über die Propheten oft die Form von ansprechenden Geschichten an, die ihre Ausdauer, Freundlichkeit, Ehrlichkeit und ihr vollständiges Vertrauen in Allah hervorheben. Diese Geschichten bieten ausgezeichnete Vorbilder und lehren wichtige moralische Lektionen.`,
    italianContent: `I musulmani credono che Allah abbia inviato numerosi messaggeri nel corso della storia per guidare l'umanità. Gli aspetti chiave di questa credenza includono:

1. La catena della profezia - Allah ha inviato profeti a ogni nazione e comunità nel corso della storia, insegnando lo stesso messaggio fondamentale del monoteismo (Tawhid).

2. Numero di profeti - La tradizione islamica menziona che ci furono 124.000 profeti inviati a popoli diversi in tempi diversi, anche se solo 25 sono menzionati per nome nel Corano.

3. Profeti principali - Alcuni dei principali profeti includono:
   - Adamo (il primo essere umano e profeta)
   - Nuh (Noè)
   - Ibrahim (Abramo)
   - Musa (Mosè)
   - Isa (Gesù)
   - Muhammad ﷺ (l'ultimo profeta)

4. Muhammad ﷺ come sigillo dei profeti - I musulmani credono che il Profeta Muhammad ﷺ sia l'ultimo messaggero, che completa e perfeziona il messaggio divino.

5. Carattere dei profeti - Tutti i profeti furono scelti da Allah per il loro eccellente carattere. Erano veritieri, onesti, intelligenti e liberi da peccati gravi.

6. Miracoli - A molti profeti furono dati miracoli come segni della loro profezia. Ad esempio, Mosè divise il mare, Gesù guariva i malati, e Muhammad ﷺ ricevette il Corano e fece il viaggio notturno (Isra e Miraj).

7. Natura umana - Nonostante il loro status speciale, tutti i profeti erano esseri umani, non divini. Mangiavano, dormivano, si sposavano e alla fine morivano come gli altri esseri umani.

Per i bambini, l'apprendimento sui profeti assume spesso la forma di storie coinvolgenti che evidenziano la loro perseveranza, gentilezza, onestà e completa fiducia in Allah. Queste storie forniscono eccellenti modelli di ruolo e insegnano importanti lezioni morali.`
  },
  {
    id: "judgmentday",
    title: "Belief in the Day of Judgment",
    albanianTitle: "Besimi në Ditën e Gjykimit",
    bosnianTitle: "Vjerovanje u Sudnji dan",
    germanTitle: "Glaube an den Tag des Jüngsten Gerichts",
    italianTitle: "Fede nel Giorno del Giudizio",
    description: "Believing in the Day of Resurrection and final accountability.",
    albanianDescription: "Besimi në Ditën e Ringjalljes dhe përgjegjësisë përfundimtare.",
    bosnianDescription: "Vjerovanje u Dan proživljenja i konačno polaganje računa.",
    germanDescription: "Der Glaube an den Tag der Auferstehung und die endgültige Rechenschaft.",
    italianDescription: "Credere nel Giorno della Resurrezione e della responsabilità finale.",
    imageUrl: "https://kharchoufa.com/en/wp-content/uploads/2024/10/Understanding-Islamic-Teachings-on-the-Day-of-Judgment.jpg",
    content: `Belief in the Day of Judgment (Yawm al-Qiyamah) is a central tenet of Islamic faith that encompasses several important concepts:

1. The End of the World - The current world will come to an end when the angel Israfil blows the trumpet, causing all living beings to die.

2. Resurrection (Ba'th) - All humans will be resurrected physically to stand before Allah for judgment. The body and soul will be reunited.

3. Accountability (Hisab) - Each person will account for their actions in this life. Nothing will be hidden:
   - One's deeds will be presented in a record (book of deeds)
   - Body parts may testify about one's actions
   - The balance (Mizan) will weigh good deeds against bad deeds

4. The Bridge (Sirat) - People will cross a bridge over Hellfire. The righteous will cross quickly and safely, while the sinful may fall into Hellfire.

5. Intercession (Shafa'ah) - The Prophet Muhammad ﷺ and others granted permission by Allah may intercede on behalf of sinners.

6. Paradise (Jannah) and Hellfire (Jahannam) - Based on the judgment, people will enter either:
   - Paradise: a place of eternal bliss, beauty, and happiness
   - Hellfire: a place of punishment for those who rejected faith and committed evil

7. Justice and Mercy - The Day of Judgment embodies Allah's perfect justice and mercy. No one will be wronged in the slightest.

For children, the concept of accountability can be introduced as a natural consequence system - good actions lead to rewards, and harmful actions have negative consequences. The focus is usually placed on Allah's infinite mercy and the beautiful rewards of Paradise rather than the fearful aspects of Judgment Day.`,
    albanianContent: `Besimi në Ditën e Gjykimit (Jevm el-Kijame) është një parim qendror i besimit islam që përfshin disa koncepte të rëndësishme:

1. Fundi i Botës - Bota aktuale do të marrë fund kur engjëlli Israfil i bie surit, duke shkaktuar vdekjen e të gjitha qenieve të gjalla.

2. Ringjallja (Ba'th) - Të gjithë njerëzit do të ringjallen fizikisht për të qëndruar para Allahut për gjykim. Trupi dhe shpirti do të ribashkohen.

3. Përgjegjësia (Hisab) - Çdo person do të japë llogari për veprimet e tij në këtë jetë. Asgjë nuk do të fshihet:
   - Veprat e dikujt do të paraqiten në një regjistër (libri i veprave)
   - Pjesët e trupit mund të dëshmojnë për veprimet e dikujt
   - Peshorja (Mizani) do të peshojë veprat e mira kundrejt veprave të këqija

4. Ura (Sirat) - Njerëzit do të kalojnë një urë mbi Xhehenem. Të drejtët do të kalojnë shpejt dhe sigurt, ndërsa mëkatarët mund të bien në Xhehenem.

5. Ndërmjetësimi (Shefaat) - Profeti Muhamed ﷺ dhe të tjerë të cilëve Allahu u ka dhënë leje mund të ndërmjetësojnë në emër të mëkatarëve.

6. Xheneti dhe Xhehenemi - Bazuar në gjykimin, njerëzit do të hyjnë ose në:
   - Xhenet: një vend i lumturisë së përjetshme, bukurisë dhe gëzimit
   - Xhehenem: një vend ndëshkimi për ata që refuzuan besimin dhe kryen të këqija

7. Drejtësia dhe Mëshira - Dita e Gjykimit mishëron drejtësinë dhe mëshirën e përsosur të Allahut. Askujt nuk do t'i bëhet padrejtësi as edhe më e vogla.

Për fëmijët, koncepti i përgjegjësisë mund të paraqitet si një sistem pasojash natyrale - veprimet e mira çojnë në shpërblime, dhe veprimet e dëmshme kanë pasoja negative. Zakonisht theksi vendoset në mëshirën e pafundme të Allahut dhe shpërblimet e bukura të Xhenetit në vend të aspekteve të frikshme të Ditës së Gjykimit.`,
    bosnianContent: `Vjerovanje u Sudnji dan (Jevmul-Kijamet) je centralni princip islamske vjere koji obuhvata nekoliko važnih koncepata:

1. Kraj svijeta - Sadašnji svijet će završiti kada melek Israfil puhne u rog, uzrokujući smrt svih živih bića.

2. Proživljenje (Ba's) - Svi ljudi će biti fizički proživljeni da stanu pred Allaha radi polaganja računa. Tijelo i duša će biti ponovno spojeni.

3. Polaganje računa (Hisab) - Svaka osoba će odgovarati za svoja djela u ovom životu. Ništa neće biti skriveno:
   - Djela će biti predstavljena u knjizi (knjiga djela)
   - Dijelovi tijela mogu svjedočiti o djelima osobe
   - Vaga (Mizan) će vagati dobra djela naspram loših djela

4. Most (Sirat) - Ljudi će prelaziti most iznad Džehennema. Pravedni će preći brzo i sigurno, dok će grešnici možda pasti u Džehennem.

5. Zagovaranje (Šefaat) - Poslanik Muhammed ﷺ i drugi kojima je Allah dao dozvolu mogu zagovarati u ime grešnika.

6. Džennet i Džehennem - Na osnovu suda, ljudi će ući u:
   - Džennet: mjesto vječnog blaženstva, ljepote i sreće
   - Džehennem: mjesto kazne za one koji su odbacili vjeru i činili zlo

7. Pravda i milost - Sudnji dan utjelovljuje Allahovu savršenu pravdu i milost. Nikome neće biti učinjena ni najmanja nepravda.

Za djecu, koncept odgovornosti može se predstaviti kao sistem prirodnih posljedica - dobra djela vode ka nagradama, a štetna djela imaju negativne posljedice. Fokus se obično stavlja na Allahovu beskonačnu milost i divne nagrade Dženneta umjesto na zastrašujuće aspekte Sudnjeg dana.`,
    germanContent: `Der Glaube an den Tag des Jüngsten Gerichts (Yaum al-Qiyamah) ist ein zentraler Grundsatz des islamischen Glaubens, der mehrere wichtige Konzepte umfasst:

1. Das Ende der Welt - Die gegenwärtige Welt wird enden, wenn der Engel Israfil in die Posaune bläst, was zum Tod aller Lebewesen führt.

2. Auferstehung (Ba'th) - Alle Menschen werden körperlich auferstehen, um vor Allah zum Gericht zu stehen. Körper und Seele werden wieder vereint.

3. Rechenschaft (Hisab) - Jede Person wird für ihre Taten in diesem Leben Rechenschaft ablegen. Nichts wird verborgen bleiben:
   - Die Taten einer Person werden in einem Buch (Buch der Taten) präsentiert
   - Körperteile können über die Handlungen einer Person Zeugnis ablegen
   - Die Waage (Mizan) wird gute Taten gegen schlechte Taten abwägen

4. Die Brücke (Sirat) - Menschen werden eine Brücke über dem Höllenfeuer überqueren. Die Rechtschaffenen werden schnell und sicher überqueren, während die Sünder in das Höllenfeuer fallen könnten.

5. Fürsprache (Shafa'ah) - Der Prophet Muhammad ﷺ und andere, denen Allah die Erlaubnis erteilt hat, können für Sünder Fürsprache einlegen.

6. Paradies (Jannah) und Höllenfeuer (Jahannam) - Basierend auf dem Urteil werden die Menschen entweder in:
   - Das Paradies: ein Ort ewiger Glückseligkeit, Schönheit und Freude
   - Das Höllenfeuer: ein Ort der Bestrafung für diejenigen, die den Glauben abgelehnt und Böses begangen haben

7. Gerechtigkeit und Barmherzigkeit - Der Tag des Jüngsten Gerichts verkörpert Allahs vollkommene Gerechtigkeit und Barmherzigkeit. Niemandem wird auch nur das geringste Unrecht getan.

Für Kinder kann das Konzept der Rechenschaft als ein System natürlicher Konsequenzen eingeführt werden - gute Handlungen führen zu Belohnungen, und schädliche Handlungen haben negative Konsequenzen. Der Schwerpunkt wird in der Regel auf Allahs unendliche Barmherzigkeit und die schönen Belohnungen des Paradieses gelegt und nicht auf die furchterregenden Aspekte des Jüngsten Gerichts.`,
    italianContent: `La fede nel Giorno del Giudizio (Yawm al-Qiyamah) è un principio centrale della fede islamica che comprende diversi concetti importanti:

1. La fine del mondo - Il mondo attuale finirà quando l'angelo Israfil suonerà la tromba, causando la morte di tutti gli esseri viventi.

2. Resurrezione (Ba'th) - Tutti gli esseri umani risorgeranno fisicamente per presentarsi davanti ad Allah per il giudizio. Il corpo e l'anima saranno riuniti.

3. Responsabilità (Hisab) - Ogni persona renderà conto delle proprie azioni in questa vita. Nulla sarà nascosto:
   - Le azioni di una persona saranno presentate in un registro (libro delle azioni)
   - Parti del corpo possono testimoniare sulle azioni di una persona
   - La bilancia (Mizan) peserà le buone azioni contro le cattive azioni

4. Il Ponte (Sirat) - Le persone attraverseranno un ponte sopra l'Inferno. I giusti attraverseranno velocemente e in sicurezza, mentre i peccatori potrebbero cadere nell'Inferno.

5. Intercessione (Shafa'ah) - Il Profeta Muhammad ﷺ e altri a cui Allah ha concesso il permesso possono intercedere per i peccatori.

6. Paradiso (Jannah) e Inferno (Jahannam) - In base al giudizio, le persone entreranno:
   - Nel Paradiso: un luogo di eterna beatitudine, bellezza e felicità
   - Nell'Inferno: un luogo di punizione per coloro che hanno rifiutato la fede e commesso il male

7. Giustizia e Misericordia - Il Giorno del Giudizio incarna la perfetta giustizia e misericordia di Allah. A nessuno sarà fatto il minimo torto.

Per i bambini, il concetto di responsabilità può essere introdotto come un sistema di conseguenze naturali - le buone azioni portano a ricompense, e le azioni dannose hanno conseguenze negative. L'attenzione è solitamente posta sull'infinita misericordia di Allah e sulle bellissime ricompense del Paradiso piuttosto che sugli aspetti spaventosi del Giorno del Giudizio.`
  },
  {
    id: "destiny",
    title: "Belief in God's Destiny",
    albanianTitle: "Besimi në Caktimin e Allahut",
    bosnianTitle: "Vjerovanje u Allahovo određenje",
    germanTitle: "Glaube an die göttliche Bestimmung",
    italianTitle: "Fede nel Destino Divino",
    description: "Believing in divine decree and predestination (Qadar).",
    albanianDescription: "Besimi në caktimin hyjnor dhe paracaktimin (Kader).",
    bosnianDescription: "Vjerovanje u božansku odredbu i sudbinu (Kader).",
    germanDescription: "Der Glaube an göttliche Fügung und Vorherbestimmung (Qadar).",
    italianDescription: "Credere nel decreto divino e nella predestinazione (Qadar).",
    imageUrl: "https://imuslimguide.com/sites/imuslimguide.com/files/book-article/faith34.jpg",
    content: `Belief in Allah's divine decree (Qadar) is one of the six pillars of faith in Islam. This complex concept includes the following key aspects:

1. Allah's Complete Knowledge - Allah knows everything that has happened, is happening, and will happen in the universe. His knowledge is not limited by time or space.

2. Allah's Will and Power - Nothing happens in the universe except by Allah's will and permission. He has complete power over all things.

3. Divine Recording - Allah has recorded everything that will happen until the Day of Judgment in Al-Lawh Al-Mahfuz (The Preserved Tablet).

4. Human Free Will - Despite Allah's foreknowledge, humans have been given free will and the ability to make choices. People are responsible for their intentions and actions.

5. Balancing Predestination and Free Will - Islam teaches a balanced view:
   - Allah knows what choices we will make before we make them
   - We still make real choices for which we are accountable
   - Our choices are made within the framework of Allah's will and knowledge

6. Attitude Toward Destiny - Muslims are encouraged to:
   - Strive to do good and avoid evil (using free will)
   - Trust in Allah's wisdom when facing difficulties (tawakkul)
   - Be content with Allah's decree after making their best effort

7. Practical Applications:
   - When something good happens: Thank Allah
   - When something difficult happens: Be patient and seek wisdom in the trial
   - In all situations: Say "Alhamdulillah" (All praise is due to Allah)

For children, the concept of Qadar can be introduced through simple examples of Allah's knowledge and wisdom. They can learn that Allah has a plan for everything, even when we don't understand it, while still emphasizing their responsibility to make good choices.`,
    albanianContent: `Besimi në caktimin hyjnor të Allahut (Kader) është një nga gjashtë shtyllat e besimit në Islam. Ky koncept kompleks përfshin aspektet kryesore të mëposhtme:

1. Dija e Plotë e Allahut - Allahu di gjithçka që ka ndodhur, po ndodh dhe do të ndodhë në univers. Dija e Tij nuk është e kufizuar nga koha apo hapësira.

2. Vullneti dhe Fuqia e Allahut - Asgjë nuk ndodh në univers përveç me vullnetin dhe lejen e Allahut. Ai ka fuqi të plotë mbi të gjitha gjërat.

3. Regjistrimi Hyjnor - Allahu ka regjistruar gjithçka që do të ndodhë deri në Ditën e Gjykimit në Levha-i Mahfudh (Pllakën e Ruajtur).

4. Vullneti i Lirë i Njeriut - Pavarësisht parazgjedhjes së Allahut, njerëzve u është dhënë vullneti i lirë dhe aftësia për të bërë zgjedhje. Njerëzit janë përgjegjës për qëllimet dhe veprimet e tyre.

5. Balancimi i Paracaktimit dhe Vullnetit të Lirë - Islami mëson një këndvështrim të balancuar:
   - Allahu di se çfarë zgjedhjesh do të bëjmë para se t'i bëjmë ato
   - Ne ende bëjmë zgjedhje të vërteta për të cilat jemi përgjegjës
   - Zgjedhjet tona bëhen brenda kornizës së vullnetit dhe dijes së Allahut

6. Qëndrimi ndaj Fatit - Muslimanët inkurajohen që:
   - Të përpiqen të bëjnë mirë dhe të shmangin të keqen (duke përdorur vullnetin e lirë)
   - Të besojnë në urtësinë e Allahut kur përballen me vështirësi (tevekkul)
   - Të jenë të kënaqur me caktimin e Allahut pasi të kenë bërë përpjekjet e tyre më të mira

7. Aplikime Praktike:
   - Kur ndodh diçka e mirë: Falenderoni Allahun
   - Kur ndodh diçka e vështirë: Jini të durueshëm dhe kërkoni urtësi në sprovë
   - Në të gjitha situatat: Thoni "Elhamdulilah" (Të gjitha lavdet i takojnë Allahut)

Për fëmijët, koncepti i Kaderit mund të prezantohet përmes shembujve të thjeshtë të dijes dhe urtësisë së Allahut. Ata mund të mësojnë se Allahu ka një plan për gjithçka, edhe kur ne nuk e kuptojmë atë, duke theksuar ende përgjegjësinë e tyre për të bërë zgjedhje të mira.`,
    bosnianContent: `Vjerovanje u Allahovo određenje (Kader) jedan je od šest stubova vjere u islamu. Ovaj složeni koncept uključuje sljedeće ključne aspekte:

1. Allahovo potpuno znanje - Allah zna sve što se dogodilo, što se događa i što će se dogoditi u univerzumu. Njegovo znanje nije ograničeno vremenom ili prostorom.

2. Allahova volja i moć - Ništa se ne događa u univerzumu osim po Allahovoj volji i dopuštenju. On ima potpunu moć nad svim stvarima.

3. Božanski zapis - Allah je zapisao sve što će se dogoditi do Sudnjeg dana u Levhi-Mahfuzu (Ploča koja je sačuvana).

4. Ljudska slobodna volja - Uprkos Allahovom predznanju, ljudima je data slobodna volja i sposobnost da prave izbore. Ljudi su odgovorni za svoje namjere i postupke.

5. Ravnoteža između predodređenja i slobodne volje - Islam podučava uravnotežen pogled:
   - Allah zna koje ćemo izbore napraviti prije nego što ih napravimo
   - I dalje donosimo stvarne izbore za koje smo odgovorni
   - Naši izbori se čine unutar okvira Allahove volje i znanja

6. Stav prema sudbini - Muslimani se potiču da:
   - Nastoje činiti dobro i izbjegavati zlo (koristeći slobodnu volju)
   - Vjeruju u Allahovu mudrost kada se suočavaju s poteškoćama (tevekkul)
   - Budu zadovoljni Allahovom odredbom nakon što su dali sve od sebe

7. Praktične primjene:
   - Kada se dogodi nešto dobro: Zahvali Allahu
   - Kada se dogodi nešto teško: Budi strpljiv i traži mudrost u iskušenju
   - U svim situacijama: Reci "Elhamdulillah" (Sva hvala pripada Allahu)

Za djecu, koncept Kadera može se predstaviti kroz jednostavne primjere Allahovog znanja i mudrosti. Oni mogu naučiti da Allah ima plan za sve, čak i kada ga mi ne razumijemo, istovremeno naglašavajući njihovu odgovornost da donose dobre izbore.`,
    germanContent: `Der Glaube an Allahs göttliche Bestimmung (Qadar) ist eine der sechs Säulen des Glaubens im Islam. Dieses komplexe Konzept umfasst die folgenden Schlüsselaspekte:

1. Allahs vollkommenes Wissen - Allah weiß alles, was geschehen ist, was geschieht und was im Universum geschehen wird. Sein Wissen ist nicht durch Zeit oder Raum begrenzt.

2. Allahs Wille und Macht - Nichts geschieht im Universum außer durch Allahs Willen und Erlaubnis. Er hat vollkommene Macht über alle Dinge.

3. Göttliche Aufzeichnung - Allah hat alles, was bis zum Tag des Jüngsten Gerichts geschehen wird, in Al-Lawh Al-Mahfuz (Die Wohlverwahrte Tafel) aufgezeichnet.

4. Menschlicher freier Wille - Trotz Allahs Vorherwissen wurde den Menschen freier Wille und die Fähigkeit, Entscheidungen zu treffen, gegeben. Menschen sind für ihre Absichten und Handlungen verantwortlich.

5. Ausgleich zwischen Vorherbestimmung und freiem Willen - Der Islam lehrt eine ausgewogene Sichtweise:
   - Allah weiß, welche Entscheidungen wir treffen werden, bevor wir sie treffen
   - Wir treffen dennoch echte Entscheidungen, für die wir verantwortlich sind
   - Unsere Entscheidungen werden im Rahmen von Allahs Willen und Wissen getroffen

6. Einstellung zum Schicksal - Muslime werden ermutigt:
   - Sich zu bemühen, Gutes zu tun und Böses zu vermeiden (unter Verwendung des freien Willens)
   - Auf Allahs Weisheit zu vertrauen, wenn sie Schwierigkeiten gegenüberstehen (Tawakkul)
   - Mit Allahs Bestimmung zufrieden zu sein, nachdem sie ihr Bestes gegeben haben

7. Praktische Anwendungen:
   - Wenn etwas Gutes geschieht: Danke Allah
   - Wenn etwas Schwieriges geschieht: Sei geduldig und suche Weisheit in der Prüfung
   - In allen Situationen: Sage "Alhamdulillah" (Alles Lob gebührt Allah)

Für Kinder kann das Konzept des Qadar durch einfache Beispiele von Allahs Wissen und Weisheit eingeführt werden. Sie können lernen, dass Allah einen Plan für alles hat, selbst wenn wir ihn nicht verstehen, während gleichzeitig ihre Verantwortung betont wird, gute Entscheidungen zu treffen.`,
    italianContent: `La fede nel decreto divino di Allah (Qadar) è uno dei sei pilastri della fede nell'Islam. Questo concetto complesso include i seguenti aspetti chiave:

1. La conoscenza completa di Allah - Allah conosce tutto ciò che è accaduto, che sta accadendo e che accadrà nell'universo. La Sua conoscenza non è limitata dal tempo o dallo spazio.

2. La volontà e il potere di Allah - Nulla accade nell'universo se non per volontà e permesso di Allah. Egli ha completo potere su tutte le cose.

3. Registrazione divina - Allah ha registrato tutto ciò che accadrà fino al Giorno del Giudizio in Al-Lawh Al-Mahfuz (La Tavola Preservata).

4. Libero arbitrio umano - Nonostante la prescienza di Allah, agli esseri umani è stato dato il libero arbitrio e la capacità di fare scelte. Le persone sono responsabili delle loro intenzioni e azioni.

5. Equilibrio tra predestinazione e libero arbitrio - L'Islam insegna una visione equilibrata:
   - Allah sa quali scelte faremo prima che le facciamo
   - Continuiamo a fare scelte reali per le quali siamo responsabili
   - Le nostre scelte sono fatte all'interno del quadro della volontà e della conoscenza di Allah

6. Atteggiamento verso il destino - I musulmani sono incoraggiati a:
   - Sforzarsi di fare il bene ed evitare il male (usando il libero arbitrio)
   - Confidare nella saggezza di Allah quando affrontano difficoltà (tawakkul)
   - Essere contenti del decreto di Allah dopo aver fatto del loro meglio

7. Applicazioni pratiche:
   - Quando accade qualcosa di buono: Ringrazia Allah
   - Quando accade qualcosa di difficile: Sii paziente e cerca saggezza nella prova
   - In tutte le situazioni: Di' "Alhamdulillah" (Ogni lode è dovuta ad Allah)

Per i bambini, il concetto di Qadar può essere introdotto attraverso semplici esempi della conoscenza e saggezza di Allah. Possono imparare che Allah ha un piano per tutto, anche quando non lo comprendiamo, sottolineando comunque la loro responsabilità di fare buone scelte.`
  }
];

export default function Ilmihal() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const [, setLocation] = useLocation();
  
  // Navigate to specific sections
  const navigateToPillars = () => {
    setLocation('/pillars');
  };
  
  const navigateToBeliefs = () => {
    setLocation('/beliefs');
  };
  
  const navigateToAblution = () => {
    setLocation('/ablution');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 pb-16">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="mosque" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {currentLanguage === 'en' ? 'Catechism' : 
             currentLanguage === 'de' ? 'Katechismus-Ilmihal' : 
             currentLanguage === 'it' ? 'Catechismo' :
             'Ilmihal'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Five Pillars Card */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={navigateToPillars}
            >
              <CardHeader className="p-4 pb-2">
                <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center rounded-full overflow-hidden">
                  <img 
                    src="/images/five_pillars.png" 
                    alt="Five Pillars of Islam"
                    className="w-full h-full object-contain" 
                  />
                </div>
                <CardTitle className="text-xl font-bold text-center">
                  {currentLanguage === 'en' ? 'Five Pillars of Islam' : 
                   currentLanguage === 'sq' ? 'Pesë shtyllat e Islamit' : 
                   currentLanguage === 'de' ? 'Die fünf Säulen des Islam' :
                   currentLanguage === 'it' ? 'I cinque pilastri dell\'Islam' :
                   'Pet stubova Islama'}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentLanguage === 'en' ? 'Learn about the five fundamental practices in Islam' : 
                   currentLanguage === 'sq' ? 'Mëso për pesë praktikat themelore në Islam' : 
                   currentLanguage === 'de' ? 'Lernen Sie die fünf grundlegenden Praktiken im Islam kennen' :
                   currentLanguage === 'it' ? 'Impara le cinque pratiche fondamentali dell\'Islam' :
                   'Naučite o pet temeljnih praksi u Islamu'}
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Islamic Beliefs Card */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={navigateToBeliefs}
            >
              <CardHeader className="p-4 pb-2">
                <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center rounded-full overflow-hidden">
                  <img 
                    src="/images/islamic_beliefs.png" 
                    alt="Islamic Beliefs"
                    className="w-full h-full object-contain" 
                  />
                </div>
                <CardTitle className="text-xl font-bold text-center">
                  {currentLanguage === 'en' ? 'Islamic Beliefs' : 
                   currentLanguage === 'sq' ? 'Shartet e imanit' : 
                   currentLanguage === 'de' ? 'Islamische Glaubenslehre' :
                   currentLanguage === 'it' ? 'Credenze islamiche' :
                   'Šest Imanskih šarti'}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentLanguage === 'en' ? 'Explore the core beliefs of Islamic faith' : 
                   currentLanguage === 'sq' ? 'Eksploro besimet themelore të besimit islamik' : 
                   currentLanguage === 'de' ? 'Entdecken Sie die grundlegenden Glaubensinhalte des Islam' :
                   currentLanguage === 'it' ? 'Esplora le credenze fondamentali della fede islamica' :
                   'Istražite osnovna vjerovanja islamske vjere'}
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Ablution Guide Card */}
            <Card 
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={navigateToAblution}
            >
              <CardHeader className="p-4 pb-2">
                <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center rounded-full overflow-hidden">
                  <img 
                    src="/images/ablution_guide_icon.png" 
                    alt="Ablution Guide"
                    className="w-full h-full object-contain" 
                  />
                </div>
                <CardTitle className="text-xl font-bold text-center">
                  {currentLanguage === 'en' ? 'Ablution Guide - al Wudu' : 
                   currentLanguage === 'sq' ? 'Si të marrim abdest' : 
                   currentLanguage === 'de' ? 'Anleitung zur rituellen Waschung - al Wudu' :
                   currentLanguage === 'it' ? 'Guida all\'abluzione - al Wudu' :
                   'Kako se uzima abdest'}
                </CardTitle>
                <CardDescription className="text-center">
                  {currentLanguage === 'en' ? 'Learn how to perform ablution correctly' : 
                   currentLanguage === 'sq' ? 'Mëso si të marrësh abdest në mënyrë të saktë' : 
                   currentLanguage === 'de' ? 'Lernen Sie, wie man die rituelle Waschung korrekt durchführt' :
                   currentLanguage === 'it' ? 'Impara come eseguire correttamente l\'abluzione' :
                   'Naučite kako pravilno uzeti abdest'}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
}