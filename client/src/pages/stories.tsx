import React, { useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { useUserContext } from '@/context/user-context';
import { useLanguage } from '@/context/language-context';
import { ProfileBadge } from '@/components/profile-badge';
import { Navbar } from '@/components/navbar';
import { useTranslation } from '@/hooks/use-translation';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Define story types
type Story = {
  id: number;
  title: string;
  category: 'prophets' | 'companions' | 'lessons' | 'values';
  age: 'young' | 'older';
  shortDescription: string;
  fullText: string;
  imageUrl: string;
  moralLesson: string;
  // Add translations
  albanianTitle?: string;
  albanianShortDescription?: string;
  albanianFullText?: string;
  albanianMoralLesson?: string;
  // Add Bosnian translations
  bosnianTitle?: string;
  bosnianShortDescription?: string;
  bosnianFullText?: string;
  bosnianMoralLesson?: string;
  // Add German translations
  germanTitle?: string;
  germanShortDescription?: string; 
  germanFullText?: string;
  germanMoralLesson?: string;
  // Add Italian translations
  italianTitle?: string;
  italianShortDescription?: string; 
  italianFullText?: string;
  italianMoralLesson?: string;
};

// Stories data
const stories: Story[] = [
  {
    id: 1,
    title: "Prophet Yunus and the Whale",
    category: "prophets",
    age: "young",
    shortDescription: "The story of Prophet Yunus who was swallowed by a whale and his journey of faith.",
    fullText: `
      Prophet Yunus (peace be upon him) was sent to the people of Nineveh to guide them to the right path. After trying for many years, most people still wouldn't listen to his message.

      Feeling frustrated, Prophet Yunus left the city without Allah's permission. He boarded a ship, but soon a terrible storm arose. The sailors believed someone on board had angered God, so they drew lots to decide who to throw overboard. Prophet Yunus's name was drawn, and he was cast into the stormy sea.

      Allah sent a large whale that swallowed Prophet Yunus whole! Inside the dark belly of the whale, Prophet Yunus realized his mistake. He turned to Allah in sincere repentance, calling out: "There is no god but You. Glory be to You! I have indeed been among the wrongdoers."

      Allah heard his prayer and commanded the whale to release Prophet Yunus onto the shore. His skin was damaged by the whale's stomach acids, but Allah caused a plant to grow over him, providing shade and healing.

      After recovering, Prophet Yunus returned to Nineveh, finding that the people had finally accepted his message and turned to Allah in his absence.

      This story teaches us to be patient, to never give up our responsibilities, and to turn to Allah when we make mistakes.
    `,
    imageUrl: "https://iqna.ir/files/en/news/2023/12/25/152173_342.jpg",
    moralLesson: "Never despair of Allah's mercy and always have patience in fulfilling your duties.",
    albanianTitle: "Profeti Junus dhe Balena",
    albanianShortDescription: "Historia e Profetit Junus i cili u gëlltit nga një balenë dhe udhëtimi i tij i besimit.",
    albanianFullText: `
      Profeti Junus (paqja qoftë mbi të) u dërgua tek njerëzit e Ninivës për t'i udhëzuar në rrugën e drejtë. Pas shumë vitesh përpjekjesh, shumica e njerëzve ende nuk dëgjonin mesazhin e tij.

      Duke u ndier i zhgënjyer, Profeti Junus e la qytetin pa lejen e Allahut. Ai hipi në një anije, por së shpejti shpërtheu një stuhi e tmerrshme. Detarët besonin se dikush në bord e kishte zemëruar Zotin, kështu që hodhën short për të vendosur se kë ta hidhnin në det. U zgjodh emri i Profetit Junus dhe ai u hodh në detin e stuhishëm.

      Allahu dërgoi një balenë të madhe që e gëlltiti Profetin Junus të tërin! Brenda barkut të errët të balenës, Profeti Junus kuptoi gabimin e tij. Ai iu drejtua Allahut me pendim të sinqertë, duke thirrur: "Nuk ka zot tjetër përveç Teje. Lavdi qoftë për Ty! Unë me të vërtetë kam qenë ndër keqbërësit."

      Allahu e dëgjoi lutjen e tij dhe i urdhëroi balenës ta lëshonte Profetin Junus në breg. Lëkura e tij ishte dëmtuar nga acidet e stomakut të balenës, por Allahu bëri që një bimë të rritej mbi të, duke i siguruar hije dhe shërim.

      Pas shërimit, Profeti Junus u kthye në Ninivë, duke zbuluar se njerëzit më në fund e kishin pranuar mesazhin e tij dhe ishin kthyer tek Allahu gjatë mungesës së tij.

      Kjo histori na mëson të jemi të durueshëm, të mos heqim dorë kurrë nga përgjegjësitë tona dhe t'i drejtohemi Allahut kur bëjmë gabime.
    `,
    albanianMoralLesson: "Kurrë mos humb shpresën në mëshirën e Allahut dhe gjithmonë ki durim në përmbushjen e detyrave tua.",
    bosnianTitle: "Poslanik Junus i kit",
    bosnianShortDescription: "Priča o Poslaniku Junusu kojeg je progutao kit i njegovom putovanju vjere.",
    bosnianFullText: `
      Poslanik Junus (mir s njim) je poslan narodu Ninive da ih uputi na pravi put. Nakon mnogo godina pokušaja, većina ljudi i dalje nije htjela slušati njegovu poruku.

      Osjećajući se frustrirano, Poslanik Junus je napustio grad bez Allahovog dopuštenja. Ukrcao se na brod, ali uskoro se podigla strašna oluja. Mornari su vjerovali da je neko na brodu naljutio Boga, pa su bacili kocku da odluče koga će baciti u more. Izvučeno je ime Poslanika Junusa, i on je bačen u olujno more.

      Allah je poslao velikog kita koji je progutao Poslanika Junusa cijelog! Unutar tamnog stomaka kita, Poslanik Junus je shvatio svoju grešku. Okrenuo se Allahu s iskrenim pokajanjem, uzvikujući: "Nema boga osim Tebe. Slava Tebi! Ja sam zaista bio među nepravednicima."

      Allah je čuo njegovu molitvu i naredio kitu da oslobodi Poslanika Junusa na obalu. Njegova koža je bila oštećena od kiselina kitovog želuca, ali Allah je učinio da biljka izraste iznad njega, pružajući hlad i iscjeljenje.

      Nakon oporavka, Poslanik Junus se vratio u Ninivu, otkrivši da su ljudi konačno prihvatili njegovu poruku i okrenuli se Allahu za vrijeme njegovog odsustva.

      Ova priča nas uči da budemo strpljivi, da nikada ne odustajemo od svojih odgovornosti i da se okrenemo Allahu kada pogriješimo.
    `,
    bosnianMoralLesson: "Nikada ne očajavaj u Allahovoj milosti i uvijek imaj strpljenja u ispunjavanju svojih dužnosti.",
    // Add German translations
    germanTitle: "Prophet Yunus und der Wal",
    germanShortDescription: "Die Geschichte des Propheten Yunus, der von einem Wal verschluckt wurde, und seine Glaubensreise.",
    germanFullText: `
      Prophet Yunus (Friede sei mit ihm) wurde zum Volk von Ninive gesandt, um sie auf den rechten Weg zu führen. Nach vielen Jahren des Versuchens wollten die meisten Menschen immer noch nicht auf seine Botschaft hören.

      Frustriert verließ Prophet Yunus die Stadt ohne Allahs Erlaubnis. Er bestieg ein Schiff, aber bald brach ein schrecklicher Sturm aus. Die Seeleute glaubten, dass jemand an Bord Gott erzürnt hatte, also zogen sie Lose, um zu entscheiden, wen sie über Bord werfen sollten. Der Name von Prophet Yunus wurde gezogen, und er wurde ins stürmische Meer geworfen.

      Allah schickte einen großen Wal, der Prophet Yunus ganz verschluckte! Im dunklen Bauch des Wals erkannte Prophet Yunus seinen Fehler. Er wandte sich in aufrichtiger Reue an Allah und rief: "Es gibt keinen Gott außer Dir. Gepriesen seist Du! Ich war wahrlich unter den Ungerechten."

      Allah hörte sein Gebet und befahl dem Wal, Prophet Yunus am Ufer freizulassen. Seine Haut war durch die Magensäure des Wals beschädigt, aber Allah ließ eine Pflanze über ihm wachsen, die ihm Schatten und Heilung bot.

      Nach seiner Genesung kehrte Prophet Yunus nach Ninive zurück und fand heraus, dass die Menschen endlich seine Botschaft angenommen hatten und sich während seiner Abwesenheit Allah zugewandt hatten.

      Diese Geschichte lehrt uns, geduldig zu sein, niemals unsere Verantwortung aufzugeben und uns an Allah zu wenden, wenn wir Fehler machen.
    `,
    germanMoralLesson: "Verzweifle niemals an Allahs Barmherzigkeit und habe immer Geduld bei der Erfüllung deiner Pflichten.",
    // Add Italian translations
    italianTitle: "Il Profeta Giona e la Balena",
    italianShortDescription: "La storia del Profeta Giona che fu inghiottito da una balena e il suo viaggio di fede.",
    italianFullText: `
      Il Profeta Giona (pace su di lui) fu inviato al popolo di Ninive per guidarli sulla retta via. Dopo aver tentato per molti anni, la maggior parte delle persone ancora non voleva ascoltare il suo messaggio.

      Sentendosi frustrato, il Profeta Giona lasciò la città senza il permesso di Allah. Si imbarcò su una nave, ma presto si scatenò una terribile tempesta. I marinai credevano che qualcuno a bordo avesse fatto arrabbiare Dio, quindi tirarono a sorte per decidere chi gettare in mare. Fu estratto il nome del Profeta Giona, e fu gettato nel mare in tempesta.

      Allah mandò una grande balena che inghiottì il Profeta Giona intero! All'interno della scura pancia della balena, il Profeta Giona si rese conto del suo errore. Si rivolse ad Allah con sincero pentimento, esclamando: "Non c'è dio all'infuori di Te. Gloria a Te! Io sono stato davvero tra gli ingiusti."

      Allah ascoltò la sua preghiera e ordinò alla balena di rilasciare il Profeta Giona sulla riva. La sua pelle era danneggiata dagli acidi dello stomaco della balena, ma Allah fece crescere una pianta sopra di lui, fornendogli ombra e guarigione.

      Dopo essersi ripreso, il Profeta Giona tornò a Ninive, scoprendo che le persone avevano finalmente accettato il suo messaggio e si erano rivolte ad Allah durante la sua assenza.

      Questa storia ci insegna ad essere pazienti, a non rinunciare mai alle nostre responsabilità e a rivolgerci ad Allah quando commettiamo errori.
    `,
    italianMoralLesson: "Non disperare mai della misericordia di Allah e abbi sempre pazienza nell'adempiere ai tuoi doveri."
  },
  {
    id: 2,
    title: "Prophet Ibrahim and the Idols",
    category: "prophets",
    age: "young",
    shortDescription: "How Prophet Ibrahim challenged idol worship and stood up for truth.",
    fullText: `
      Prophet Ibrahim (peace be upon him) lived among people who worshipped idols made of stone. Ibrahim couldn't understand why people would pray to statues that couldn't hear, see, or help anyone.

      One day, when everyone went out of town for a festival, Ibrahim decided to teach them a lesson. He took an ax and broke all the idols in the temple except the largest one. He then hung the ax around the neck of the remaining idol.

      When the people returned and saw their broken idols, they were furious! They asked Ibrahim if he had done this. Ibrahim replied, "Ask the big idol! If idols can speak, maybe it can tell you what happened."

      The people knew their idols couldn't speak, and Ibrahim's clever response made them think about how powerless their idols truly were. Still, they were angry and decided to punish Ibrahim by throwing him into a huge fire.

      But Allah protected Ibrahim. He commanded the fire, "O fire! Be cool and safe for Ibrahim!" Miraculously, the fire didn't burn Ibrahim at all.

      This amazing miracle showed the people the power of the true God that Ibrahim worshipped. Some people began to question their beliefs after witnessing this amazing event.

      Ibrahim's courage in standing up for the truth and his unwavering faith in Allah, even when facing great danger, makes him one of the most respected prophets in Islam.
    `,
    imageUrl: "/stories/prophet-ibrahim.jpg",
    moralLesson: "Stand firm for the truth, even when you're standing alone.",
    albanianTitle: "Profeti Ibrahim dhe Idhujt",
    albanianShortDescription: "Si Profeti Ibrahim sfidoi adhurimin e idhujve dhe qëndroi për të vërtetën.",
    albanianFullText: `
      Profeti Ibrahim (paqja qoftë mbi të) jetonte mes njerëzve që adhuronin idhuj prej guri. Ibrahimi nuk mund të kuptonte pse njerëzit do t'i luteshin statujave që nuk mund të dëgjonin, shihnin apo ndihmonin askënd.

      Një ditë, kur të gjithë kishin dalë nga qyteti për një festë, Ibrahimi vendosi t'u japë atyre një mësim. Ai mori një sëpatë dhe theu të gjithë idhujt në tempull, përveç më të madhit. Pastaj, ai e vari sëpatën rreth qafës së idhullit të mbetur.

      Kur njerëzit u kthyen dhe panë idhujt e tyre të thyer, ata ishin të tërbuar! E pyetën Ibrahimin nëse e kishte bërë ai këtë. Ibrahimi u përgjigj: "Pyeteni idhullin e madh! Nëse idhujt mund të flasin, ndoshta ai mund t'ju tregojë çfarë ndodhi."

      Njerëzit e dinin se idhujt e tyre nuk mund të flisnin, dhe përgjigja e mençur e Ibrahimit i bëri të mendojnë se sa të pafuqishëm ishin në të vërtetë idhujt e tyre. Megjithatë, ata ishin të zemëruar dhe vendosën ta ndëshkonin Ibrahimin duke e hedhur në një zjarr të madh.

      Por Allahu e mbrojti Ibrahimin. Ai i urdhëroi zjarrit: "O zjarr! Bëhu i freskët dhe i sigurt për Ibrahimin!" Në mënyrë të mrekullueshme, zjarri nuk e dogji Ibrahimin fare.

      Ky mrekulli e mahnitshme u tregoi njerëzve fuqinë e Zotit të vërtetë që Ibrahimi adhuronte. Disa njerëz filluan të vinin në dyshim bindjet e tyre pas dëshmimit të këtij eventi të mrekullueshëm.

      Guximi i Ibrahimit për të qëndruar për të vërtetën dhe besimi i tij i palëkundur në Allahun, edhe kur përballej me rrezik të madh, e bën atë një nga profetët më të respektuar në Islam.
    `,
    albanianMoralLesson: "Qëndro i palëkundur për të vërtetën, edhe kur je i vetëm.",
    bosnianTitle: "Poslanik Ibrahim i kipovi",
    bosnianShortDescription: "Kako je poslanik Ibrahim izazvao obožavanje kipova i zauzeo se za istinu.",
    bosnianFullText: `
      Poslanik Ibrahim (mir s njim) živio je među ljudima koji su obožavali kipove od kamena. Ibrahim nije mogao razumjeti zašto bi se ljudi molili kipovima koji ne mogu čuti, vidjeti ili pomoći ikome.

      Jednog dana, kada su svi otišli iz grada na festival, Ibrahim je odlučio da ih pouči lekciji. Uzeo je sjekiru i razbio sve kipove u hramu osim najvećeg. Zatim je objesio sjekiru oko vrata preostalim kipovima.

      Kada su se ljudi vratili i vidjeli svoje razbijene kipove, bili su bijesni! Pitali su Ibrahima da li je on to učinio. Ibrahim je odgovorio: "Pitajte veliki kip! Ako kipovi mogu govoriti, možda vam on može reći šta se dogodilo."

      Ljudi su znali da njihovi kipovi ne mogu govoriti, a Ibrahimov pametni odgovor natjerao ih je da razmisle koliko su njihovi kipovi zapravo bespomoćni. Ipak, bili su ljuti i odlučili su kazniti Ibrahima bacivši ga u ogromnu vatru.

      Ali Allah je zaštitio Ibrahima. Naredio je vatri: "O vatro! Budi hladna i sigurna za Ibrahima!" Čudesno, vatra uopće nije opekla Ibrahima.

      Ovo nevjerovatno čudo pokazalo je ljudima moć pravog Boga kojeg je Ibrahim obožavao. Neki ljudi su počeli preispitivati svoja uvjerenja nakon što su svjedočili ovom nevjerovatnom događaju.

      Ibrahimova hrabrost da se zauzme za istinu i njegova nepokolebljiva vjera u Allaha, čak i kada se suočavao s velikim opasnostima, čini ga jednim od najpoštovanijih poslanika u islamu.
    `,
    bosnianMoralLesson: "Budi čvrst u istini, čak i kada stojiš sam.",
    // Add German translations
    germanTitle: "Prophet Ibrahim und die Götzen",
    germanShortDescription: "Wie Prophet Ibrahim den Götzendienst herausforderte und für die Wahrheit eintrat.",
    germanFullText: `
      Prophet Ibrahim (Friede sei mit ihm) lebte unter Menschen, die Götzen aus Stein anbeteten. Ibrahim konnte nicht verstehen, warum Menschen zu Statuen beten würden, die nicht hören, sehen oder jemandem helfen konnten.

      Eines Tages, als alle für ein Fest aus der Stadt gegangen waren, beschloss Ibrahim, ihnen eine Lektion zu erteilen. Er nahm eine Axt und zerschlug alle Götzen im Tempel außer dem größten. Dann hängte er die Axt um den Hals des verbliebenen Götzen.

      Als die Menschen zurückkehrten und ihre zerbrochenen Götzen sahen, waren sie wütend! Sie fragten Ibrahim, ob er dies getan hätte. Ibrahim antwortete: "Fragt den großen Götzen! Wenn Götzen sprechen können, kann er euch vielleicht sagen, was passiert ist."

      Die Menschen wussten, dass ihre Götzen nicht sprechen konnten, und Ibrahims kluge Antwort brachte sie zum Nachdenken, wie machtlos ihre Götzen wirklich waren. Dennoch waren sie wütend und beschlossen, Ibrahim zu bestrafen, indem sie ihn in ein riesiges Feuer warfen.

      Aber Allah beschützte Ibrahim. Er befahl dem Feuer: "O Feuer! Sei kühl und sicher für Ibrahim!" Wundersamerweise verbrannte das Feuer Ibrahim überhaupt nicht.

      Dieses erstaunliche Wunder zeigte den Menschen die Macht des wahren Gottes, den Ibrahim anbetete. Einige Menschen begannen, ihre Überzeugungen zu hinterfragen, nachdem sie dieses erstaunliche Ereignis miterlebt hatten.

      Ibrahims Mut, für die Wahrheit einzustehen, und sein unerschütterlicher Glaube an Allah, selbst wenn er großer Gefahr gegenüberstand, machen ihn zu einem der angesehensten Propheten im Islam.
    `,
    germanMoralLesson: "Stehe fest für die Wahrheit, selbst wenn du alleine stehst.",
    // Add Italian translations
    italianTitle: "Il Profeta Abramo e gli Idoli",
    italianShortDescription: "Come il Profeta Abramo sfidò l'adorazione degli idoli e difese la verità.",
    italianFullText: `
      Il Profeta Abramo (pace su di lui) viveva tra persone che adoravano idoli fatti di pietra. Abramo non riusciva a capire perché le persone pregassero statue che non potevano sentire, vedere o aiutare nessuno.

      Un giorno, quando tutti erano fuori città per un festival, Abramo decise di dar loro una lezione. Prese un'ascia e ruppe tutti gli idoli nel tempio tranne il più grande. Poi appese l'ascia al collo dell'idolo rimanente.

      Quando le persone tornarono e videro i loro idoli spezzati, erano furiosi! Chiesero ad Abramo se fosse stato lui a farlo. Abramo rispose: "Chiedete all'idolo grande! Se gli idoli possono parlare, forse può dirvi cosa è successo."

      Le persone sapevano che i loro idoli non potevano parlare, e la risposta intelligente di Abramo li fece riflettere su quanto fossero davvero impotenti i loro idoli. Tuttavia, erano arrabbiati e decisero di punire Abramo gettandolo in un enorme fuoco.

      Ma Allah protesse Abramo. Comandò al fuoco: "O fuoco! Sii fresco e sicuro per Abramo!" Miracolosamente, il fuoco non bruciò affatto Abramo.

      Questo straordinario miracolo mostrò alla gente il potere del vero Dio che Abramo adorava. Alcune persone iniziarono a mettere in discussione le loro credenze dopo aver assistito a questo incredibile evento.

      Il coraggio di Abramo nel difendere la verità e la sua fede incrollabile in Allah, anche quando affrontava un grande pericolo, lo rende uno dei profeti più rispettati nell'Islam.
    `,
    italianMoralLesson: "Mantieniti saldo per la verità, anche quando sei solo."
  },
  {
    id: 3,
    title: "The Patient Man: Prophet Ayub",
    category: "prophets",
    age: "older",
    shortDescription: "The incredible story of Prophet Ayub's patience through immense trials.",
    fullText: `
      Prophet Ayub (Job) was blessed by Allah with wealth, many children, and good health. He was always grateful to Allah and generous with his blessings.
      
      Allah tested Prophet Ayub with a series of calamities. First, he lost all his wealth and possessions. Then, his children passed away in a tragic accident. Finally, he was afflicted with a severe illness that lasted for many years.
      
      Through all these trials, Prophet Ayub never complained or lost faith in Allah. His wife stood by him, though she struggled to see him suffer. When she suggested he pray to be relieved of his suffering, Ayub reminded her of all the years of blessings they had enjoyed before.
      
      He would say, "I lived in prosperity for seventy years; it is not too much to endure hardship for a similar time."
      
      After many years of patience, Ayub finally prayed to Allah saying: "Indeed adversity has touched me, and You are the Most Merciful of the merciful."
      
      Allah responded to his prayer and instructed him to strike the ground with his foot. When he did, a spring of cool water gushed forth. Allah commanded him to wash with the water and drink from it. Miraculously, his illness was cured, and his health was restored.
      
      Allah then returned to him his family and wealth, and even doubled his blessings. Prophet Ayub's story is remembered as the ultimate example of patience through trials and trust in Allah's wisdom.
    `,
    imageUrl: "https://islam4u.pro/blog/wp-content/uploads/2020/08/ayyub_in_the_quran-jpg.webp",
    moralLesson: "Patience during hardship will be rewarded. Allah tests those He loves.",
    albanianTitle: "Njeriu i Duruar: Profeti Ejub",
    albanianShortDescription: "Historia e mahnitshme e durimit të Profetit Ejub përmes sprovave të mëdha.",
    albanianFullText: `
      Profeti Ejub (Jobi) u bekua nga Allahu me pasuri, shumë fëmijë dhe shëndet të mirë. Ai ishte gjithmonë mirënjohës ndaj Allahut dhe bujar me bekimet e tij.

      Allahu e testoi Profetin Ejub me një seri fatkeqësish. Së pari, ai humbi të gjithë pasurinë dhe zotërimet e tij. Më pas, fëmijët e tij vdiqën në një aksident tragjik. Në fund, ai u goditi nga një sëmundje e rëndë që zgjati për shumë vite.

      Në të gjitha këto sprova, Profeti Ejub nuk u ankua kurrë dhe nuk humbi besimin tek Allahu. Gruaja e tij qëndroi pranë tij, megjithëse ajo vuante duke e parë atë të vuante. Kur ajo sugjeroi që ai të lutej për lehtësimin e vuajtjeve të tij, Ejubi i kujtoi asaj të gjitha vitet e bekimeve që kishin gëzuar më parë.

      Ai thoshte: "Unë jetova në begati për shtatëdhjetë vjet; nuk është shumë të duroj vështirësi për një kohë të ngjashme."

      Pas shumë vitesh durim, Ejubi më në fund iu lut Allahut duke thënë: "Vërtet më ka prekur fatkeqësia, dhe Ti je më Mëshiruesi i mëshiruesve."

      Allahu iu përgjigj lutjes së tij dhe e udhëzoi të godiste tokën me këmbën e tij. Kur ai e bëri këtë, një burim uji të freskët shpërtheu. Allahu e urdhëroi të lahej me ujin dhe të pinte prej tij. Në mënyrë të mrekullueshme, sëmundja e tij u shërua dhe shëndeti i tij u rikthye.

      Allahu më pas i ktheu familjen dhe pasurinë e tij, dhe madje i dyfishoi bekimet e tij. Historia e Profetit Ejub kujtohet si shembulli përfundimtar i durimit gjatë sprovave dhe besimit në urtësinë e Allahut.
    `,
    albanianMoralLesson: "Durimi gjatë vështirësive do të shpërblehet. Allahu i teston ata që i do.",
    bosnianTitle: "Strpljivi čovjek: Poslanik Ejub",
    bosnianShortDescription: "Nevjerovatna priča o strpljenju poslanika Ejuba kroz ogromna iskušenja.",
    bosnianFullText: `
      Poslanik Ejub (Jov) bio je blagoslovljen od Allaha bogatstvom, mnogobrojnom djecom i dobrim zdravljem. Uvijek je bio zahvalan Allahu i darežljiv sa svojim blagoslovima.
      
      Allah je iskušao poslanika Ejuba nizom nedaća. Prvo je izgubio sve svoje bogatstvo i imovinu. Zatim su mu djeca poginula u tragičnoj nesreći. Konačno, zadesila ga je teška bolest koja je trajala mnogo godina.
      
      Kroz sva ova iskušenja, poslanik Ejub se nikada nije žalio niti je izgubio vjeru u Allaha. Njegova žena je stajala uz njega, iako joj je bilo teško gledati kako pati. Kada mu je predložila da se moli za olakšanje patnje, Ejub ju je podsjetio na sve godine blagoslova koje su prije uživali.
      
      Govorio bi: "Živio sam u blagostanju sedamdeset godina; nije previše izdržati poteškoće slično toliko vremena."
      
      Nakon mnogo godina strpljenja, Ejub se konačno pomolio Allahu rekavši: "Zaista me je zadesila nevolja, a Ti si najmilostiviji od milostivih."
      
      Allah je odgovorio na njegovu molitvu i uputio ga da udari nogom o zemlju. Kada je to učinio, izvor hladne vode je potekao. Allah mu je naredio da se opere tom vodom i da pije iz nje. Čudesno, njegova bolest je izliječena, a zdravlje mu je vraćeno.
      
      Allah mu je zatim vratio porodicu i bogatstvo, i čak udvostručio njegove blagoslove. Priča o poslaniku Ejubu pamti se kao vrhunski primjer strpljenja kroz iskušenja i povjerenja u Allahovu mudrost.
    `,
    bosnianMoralLesson: "Strpljenje tokom poteškoća bit će nagrađeno. Allah iskušava one koje voli.",
    // Add German translations
    germanTitle: "Der geduldige Mann: Prophet Ayub",
    germanShortDescription: "Die unglaubliche Geschichte der Geduld des Propheten Ayub durch immense Prüfungen.",
    germanFullText: `
      Prophet Ayub (Hiob) wurde von Allah mit Reichtum, vielen Kindern und guter Gesundheit gesegnet. Er war Allah stets dankbar und großzügig mit seinen Segnungen.
      
      Allah prüfte Prophet Ayub mit einer Reihe von Unglücken. Zuerst verlor er all seinen Reichtum und Besitz. Dann starben seine Kinder bei einem tragischen Unfall. Schließlich wurde er von einer schweren Krankheit befallen, die viele Jahre anhielt.
      
      Durch all diese Prüfungen beschwerte sich Prophet Ayub nie und verlor nie den Glauben an Allah. Seine Frau stand ihm bei, obwohl es ihr schwerfiel, ihn leiden zu sehen. Als sie vorschlug, er solle beten, um von seinem Leiden erlöst zu werden, erinnerte Ayub sie an all die Jahre des Segens, die sie zuvor genossen hatten.
      
      Er sagte: "Ich lebte siebzig Jahre im Wohlstand; es ist nicht zu viel, für eine ähnliche Zeit Härten zu ertragen."
      
      Nach vielen Jahren der Geduld betete Ayub schließlich zu Allah und sagte: "Wahrlich, Unheil hat mich getroffen, und Du bist der Barmherzigste der Barmherzigen."
      
      Allah erhörte sein Gebet und wies ihn an, mit seinem Fuß auf den Boden zu stampfen. Als er dies tat, sprudelte eine Quelle kühlen Wassers hervor. Allah befahl ihm, sich mit dem Wasser zu waschen und davon zu trinken. Wundersamerweise wurde seine Krankheit geheilt und seine Gesundheit wiederhergestellt.
      
      Allah gab ihm dann seine Familie und seinen Reichtum zurück und verdoppelte sogar seine Segnungen. Die Geschichte von Prophet Ayub wird als das ultimative Beispiel für Geduld in Prüfungen und Vertrauen in Allahs Weisheit in Erinnerung behalten.
    `,
    germanMoralLesson: "Geduld während Härten wird belohnt. Allah prüft diejenigen, die Er liebt.",
    // Add Italian translations
    italianTitle: "L'Uomo Paziente: Il Profeta Giobbe",
    italianShortDescription: "L'incredibile storia della pazienza del Profeta Giobbe attraverso immense prove.",
    italianFullText: `
      Il Profeta Giobbe (Ayub) fu benedetto da Allah con ricchezza, molti figli e buona salute. Era sempre grato ad Allah e generoso con le sue benedizioni.
      
      Allah mise alla prova il Profeta Giobbe con una serie di calamità. Prima, perse tutta la sua ricchezza e i suoi possedimenti. Poi, i suoi figli morirono in un tragico incidente. Infine, fu colpito da una grave malattia che durò per molti anni.
      
      Attraverso tutte queste prove, il Profeta Giobbe non si lamentò mai né perse la fede in Allah. Sua moglie gli stette accanto, sebbene soffrisse nel vederlo soffrire. Quando lei gli suggerì di pregare per essere sollevato dalla sua sofferenza, Giobbe le ricordò tutti gli anni di benedizioni che avevano goduto prima.
      
      Diceva: "Ho vissuto nella prosperità per settant'anni; non è troppo sopportare difficoltà per un tempo simile."
      
      Dopo molti anni di pazienza, Giobbe finalmente pregò Allah dicendo: "In verità l'avversità mi ha toccato, e Tu sei il Più Misericordioso dei misericordiosi."
      
      Allah rispose alla sua preghiera e gli ordinò di battere il piede a terra. Quando lo fece, una sorgente di acqua fresca sgorgò. Allah gli comandò di lavarsi con l'acqua e di berla. Miracolosamente, la sua malattia fu guarita e la sua salute fu ripristinata.
      
      Allah poi gli restituì la famiglia e la ricchezza, e addirittura raddoppiò le sue benedizioni. La storia del Profeta Giobbe è ricordata come l'esempio supremo di pazienza attraverso le prove e di fiducia nella saggezza di Allah.
    `,
    italianMoralLesson: "La pazienza durante le difficoltà sarà ricompensata. Allah mette alla prova quelli che ama."
  },
  {
    id: 4,
    title: "Bilal: The First Muezzin",
    category: "companions",
    age: "older",
    shortDescription: "The inspiring story of Bilal ibn Rabah, from slave to the Prophet's beloved companion.",
    fullText: `
      Bilal ibn Rabah was born into slavery in Mecca. He was of Ethiopian descent and worked for a cruel master named Umayyah ibn Khalaf.
      
      When Bilal heard about Islam from the Prophet Muhammad ﷺ, he secretly embraced the faith. When his master discovered that Bilal had become a Muslim, he was furious. Umayyah subjected Bilal to severe torture, taking him out to the hot desert at the hottest part of the day, placing a heavy rock on his chest, and leaving him there.
      
      Despite this unbearable torture, Bilal refused to renounce his faith. He would simply repeat "Ahad, Ahad" (One, One), affirming his belief in the Oneness of Allah.
      
      Abu Bakr, the Prophet's closest companion, was deeply moved when he saw Bilal's suffering. He bought Bilal from Umayyah and immediately set him free.
      
      As a free man, Bilal became one of the closest companions of the Prophet ﷺ. The Prophet recognized Bilal's beautiful voice and deep faith, and appointed him as the first muezzin (caller to prayer) in Islam.
      
      After the Muslims conquered Mecca, the Prophet ﷺ asked Bilal to climb on top of the Kaaba and make the call to prayer. This was a powerful moment – a once-enslaved Black man standing on the most sacred structure in the city that had persecuted him, calling people to worship the One God.
      
      Bilal's story reminds us that in Islam, a person's worth is not determined by their race, social status, or wealth, but by their faith and character.
    `,
    imageUrl: "/stories/bilal-muezzin.jpg",
    moralLesson: "Human worth is measured by faith and character, not by race or social status.",
    albanianTitle: "Bilali: Muezini i Parë",
    albanianShortDescription: "Historia frymëzuese e Bilal ibn Rabah, nga skllav në shoqëruesin e dashur të Profetit.",
    albanianFullText: `
      Bilal ibn Rabah u lind në skllavëri në Mekë. Ai ishte me prejardhje etiopiane dhe punonte për një zotëri mizor të quajtur Umejje ibn Halef.

      Kur Bilali dëgjoi për Islamin nga Profeti Muhamed ﷺ, ai e përqafoi besimin në fshehtësi. Kur zotëria i tij zbuloi se Bilali ishte bërë mysliman, ai u tërbua. Umejje e nënshtroi Bilalin në tortura të rënda, duke e nxjerrë në shkretëtirën e nxehtë në pjesën më të nxehtë të ditës, duke vendosur një gur të rëndë mbi gjoksin e tij dhe duke e lënë atje.

      Pavarësisht kësaj torture të padurueshme, Bilali refuzoi të hiqte dorë nga besimi i tij. Ai thjesht përsëriste "Ehad, Ehad" (Një, Një), duke pohuar besimin e tij në Njëshmërinë e Allahut.

      Ebu Bekri, shoku më i ngushtë i Profetit, u prek thellësisht kur pa vuajtjet e Bilalit. Ai e bleu Bilalin nga Umejje dhe menjëherë e liroi.

      Si një njeri i lirë, Bilali u bë një nga shoqëruesit më të afërt të Profetit ﷺ. Profeti njohu zërin e bukur të Bilalit dhe besimin e tij të thellë, dhe e caktoi atë si muezinin e parë (thirrësin për lutje) në Islam.

      Pasi myslimanët pushtuan Mekën, Profeti ﷺ i kërkoi Bilalit të ngjitej mbi Qabe dhe të bënte thirrjen për lutje. Ky ishte një moment i fuqishëm – një burrë me ngjyrë që dikur ishte skllav, tani qëndronte mbi strukturën më të shenjtë në qytetin që e kishte persekutuar, duke i thirrur njerëzit të adhuronin Zotin e Vetëm.

      Historia e Bilalit na kujton se në Islam, vlera e një personi nuk përcaktohet nga raca, statusi shoqëror apo pasuria e tij, por nga besimi dhe karakteri i tij.
    `,
    albanianMoralLesson: "Vlera njerëzore matet me besim dhe karakter, jo me racë apo status shoqëror.",
    bosnianTitle: "Bilal: Prvi mujezin",
    bosnianShortDescription: "Inspirativna priča o Bilalu ibn Rabahu, od roba do voljenog Poslanikova druga.",
    bosnianFullText: `
      Bilal ibn Rabah rođen je u ropstvu u Mekki. Bio je etiopskog porijekla i radio je za okrutnog gospodara po imenu Umejja ibn Halef.
      
      Kada je Bilal čuo za islam od Poslanika Muhammeda ﷺ, tajno je prihvatio vjeru. Kada je njegov gospodar otkrio da je Bilal postao musliman, bio je bijesan. Umejja je podvrgnuo Bilala teškom mučenju, odvodeći ga u vrelu pustinju u najtoplijem dijelu dana, stavljajući mu težak kamen na prsa i ostavljajući ga tamo.
      
      Uprkos ovom nepodnošljivom mučenju, Bilal je odbio odreći se svoje vjere. Jednostavno bi ponavljao "Ehad, Ehad" (Jedan, Jedan), potvrđujući svoju vjeru u Allahovo jedinstvo.
      
      Ebu Bekr, najbliži Poslanikov drug, bio je duboko dirnut kada je vidio Bilalovu patnju. Kupio je Bilala od Umejje i odmah ga oslobodio.
      
      Kao slobodan čovjek, Bilal je postao jedan od najbližih Poslanikovih drugova. Poslanik je prepoznao Bilalov lijep glas i duboku vjeru te ga imenovao prvim mujezinom (pozivateljem na molitvu) u islamu.
      
      Nakon što su muslimani osvojili Mekku, Poslanik ﷺ je zatražio od Bilala da se popne na vrh Kabe i pozove na molitvu. Bio je to moćan trenutak – nekadašnji rob crne boje kože sada stoji na najsvetijem objektu u gradu koji ga je progonio, pozivajući ljude da obožavaju Jednog Boga.
      
      Bilalova priča nas podsjeća da u islamu vrijednost osobe nije određena njenom rasom, društvenim statusom ili bogatstvom, već njenom vjerom i karakterom.
    `,
    bosnianMoralLesson: "Ljudska vrijednost mjeri se vjerom i karakterom, a ne rasom ili društvenim statusom.",
    // Add German translations
    germanTitle: "Bilal: Der erste Muezzin",
    germanShortDescription: "Die inspirierende Geschichte von Bilal ibn Rabah, vom Sklaven zum geliebten Gefährten des Propheten.",
    germanFullText: `
      Bilal ibn Rabah wurde in Sklaverei in Mekka geboren. Er war äthiopischer Abstammung und arbeitete für einen grausamen Herrn namens Umayyah ibn Khalaf.
      
      Als Bilal vom Propheten Muhammad ﷺ über den Islam hörte, nahm er den Glauben heimlich an. Als sein Herr entdeckte, dass Bilal Muslim geworden war, war er wütend. Umayyah unterwarf Bilal schwerer Folter, indem er ihn zur heißesten Tageszeit in die heiße Wüste brachte, einen schweren Stein auf seine Brust legte und ihn dort ließ.
      
      Trotz dieser unerträglichen Folter weigerte sich Bilal, seinem Glauben abzuschwören. Er wiederholte einfach "Ahad, Ahad" (Einer, Einer) und bekräftigte damit seinen Glauben an die Einheit Allahs.
      
      Abu Bakr, der engste Gefährte des Propheten, war tief bewegt, als er Bilals Leiden sah. Er kaufte Bilal von Umayyah und ließ ihn sofort frei.
      
      Als freier Mann wurde Bilal einer der engsten Gefährten des Propheten ﷺ. Der Prophet erkannte Bilals schöne Stimme und tiefen Glauben und ernannte ihn zum ersten Muezzin (Gebetsrufer) im Islam.
      
      Nachdem die Muslime Mekka erobert hatten, bat der Prophet ﷺ Bilal, auf die Kaaba zu steigen und zum Gebet zu rufen. Dies war ein kraftvoller Moment – ein einst versklavter schwarzer Mann stand auf dem heiligsten Bauwerk in der Stadt, die ihn verfolgt hatte, und rief die Menschen auf, den Einen Gott anzubeten.
      
      Bilals Geschichte erinnert uns daran, dass im Islam der Wert eines Menschen nicht durch seine Rasse, seinen sozialen Status oder seinen Reichtum bestimmt wird, sondern durch seinen Glauben und seinen Charakter.
    `,
    germanMoralLesson: "Menschlicher Wert wird durch Glaube und Charakter gemessen, nicht durch Rasse oder sozialen Status.",
    // Add Italian translations
    italianTitle: "Bilal: Il Primo Muezzin",
    italianShortDescription: "La storia ispiratrice di Bilal ibn Rabah, da schiavo a amato compagno del Profeta.",
    italianFullText: `
      Bilal ibn Rabah nacque schiavo a Mecca. Era di discendenza etiope e lavorava per un padrone crudele di nome Umayyah ibn Khalaf.
      
      Quando Bilal sentì parlare dell'Islam dal Profeta Muhammad ﷺ, abbracciò segretamente la fede. Quando il suo padrone scoprì che Bilal era diventato musulmano, si infuriò. Umayyah sottopose Bilal a severe torture, portandolo nel deserto caldo nella parte più calda della giornata, mettendogli una pesante pietra sul petto e lasciandolo lì.
      
      Nonostante questa tortura insopportabile, Bilal si rifiutò di rinunciare alla sua fede. Ripeteva semplicemente "Ahad, Ahad" (Uno, Uno), affermando la sua credenza nell'unicità di Allah.
      
      Abu Bakr, il più stretto compagno del Profeta, fu profondamente commosso quando vide la sofferenza di Bilal. Comprò Bilal da Umayyah e lo liberò immediatamente.
      
      Da uomo libero, Bilal divenne uno dei più stretti compagni del Profeta ﷺ. Il Profeta riconobbe la bella voce di Bilal e la sua profonda fede, e lo nominò primo muezzin (chiamante alla preghiera) nell'Islam.
      
      Dopo che i musulmani conquistarono Mecca, il Profeta ﷺ chiese a Bilal di salire in cima alla Kaaba e fare la chiamata alla preghiera. Fu un momento potente – un uomo nero una volta schiavo, ora in piedi sulla struttura più sacra nella città che lo aveva perseguitato, che chiamava le persone ad adorare l'Unico Dio.
      
      La storia di Bilal ci ricorda che nell'Islam, il valore di una persona non è determinato dalla razza, dallo stato sociale o dalla ricchezza, ma dalla loro fede e dal loro carattere.
    `,
    italianMoralLesson: "Il valore umano si misura con la fede e il carattere, non con la razza o lo status sociale."
  },
  {
    id: 5,
    title: "Asma and the Two Belts",
    category: "companions",
    age: "young",
    shortDescription: "How Asma bint Abu Bakr helped the Prophet during his migration to Medina.",
    fullText: `
      When the Prophet Muhammad ﷺ and Abu Bakr were preparing to migrate from Mecca to Medina to escape persecution, they needed help to keep their journey secret.

      Asma bint Abu Bakr, the daughter of Abu Bakr, played a crucial role in this important event. She was just a young woman, but she showed incredible courage.

      The Prophet ﷺ and Abu Bakr hid in the Cave of Thawr, south of Mecca, for three days before continuing their journey. During this time, Asma would secretly bring them food and news about what was happening in Mecca.

      One day, when Asma was preparing food to take to the cave, she realized she didn't have anything to tie the packages with. Thinking quickly, she tore her belt in two, using one piece to tie the food packages and the other to secure her dress.

      For this clever solution, the Prophet ﷺ gave her the title "Dhat an-Nitaqayn" (The One with the Two Belts).

      Asma faced great danger bringing supplies to the cave. The Quraysh had offered a reward for capturing the Prophet ﷺ, and patrols were searching everywhere. Once, when returning from the cave, she was confronted by one of the searchers who suspected she knew something. Despite the threat, Asma remained calm and didn't reveal anything.

      Asma's bravery and quick thinking helped make the Prophet's migration successful, which was a turning point in Islamic history.
    `,
    imageUrl: "https://islamichistory.org/wp-content/uploads/2021/01/iho05.jpg",
    moralLesson: "Even young people can show great courage and make significant contributions when helping others.",
    albanianTitle: "Asma dhe Dy Rripat",
    albanianShortDescription: "Si Asma bint Ebu Bekr ndihmoi Profetin gjatë migrimit të tij në Medinë.",
    albanianFullText: `
      Kur Profeti Muhamed ﷺ dhe Ebu Bekri po përgatiteshin për të migruar nga Meka në Medinë për t'i shpëtuar persekutimit, atyre u nevojitej ndihmë për ta mbajtur udhëtimin e tyre të fshehtë.

      Asma bint Ebu Bekr, e bija e Ebu Bekrit, luajti një rol vendimtar në këtë ngjarje të rëndësishme. Ajo ishte thjesht një grua e re, por tregoi guxim të pabesueshëm.

      Profeti ﷺ dhe Ebu Bekri u fshehën në Shpellën e Thaurit, në jug të Mekës, për tre ditë përpara se të vazhdonin udhëtimin e tyre. Gjatë kësaj kohe, Asma do t'u sillte fshehtësisht ushqim dhe lajme për atë që po ndodhte në Mekë.

      Një ditë, kur Asma po përgatiste ushqim për ta çuar në shpellë, ajo e kuptoi se nuk kishte asgjë për t'i lidhur paketat. Duke menduar shpejt, ajo e grisi rripin e saj në dy pjesë, duke përdorur një pjesë për të lidhur paketat e ushqimit dhe pjesën tjetër për të siguruar fustanin e saj.

      Për këtë zgjidhje të zgjuar, Profeti ﷺ i dha asaj titullin "Dhat an-Nitaqayn" (Ajo me Dy Rripat).

      Asma përballoi rrezik të madh duke sjellë furnizime në shpellë. Kurejshët kishin ofruar një shpërblim për kapjen e Profetit ﷺ, dhe patrullat po kërkonin kudo. Një herë, kur po kthehej nga shpella, ajo u përball me një nga kërkuesit që dyshonte se ajo dinte diçka. Pavarësisht kërcënimit, Asma mbeti e qetë dhe nuk zbuloi asgjë.

      Trimëria dhe mendimi i shpejtë i Asmës ndihmuan që migrimi i Profetit të ketë sukses, që ishte një pikë kthese në historinë islamike.
    `,
    albanianMoralLesson: "Edhe të rinjtë mund të tregojnë guxim të madh dhe të japin kontribute të rëndësishme kur ndihmojnë të tjerët.",
    bosnianTitle: "Asma i dva pojasa",
    bosnianShortDescription: "Kako je Asma bint Ebu Bekr pomogla Poslaniku tokom njegove hidžre u Medinu.",
    bosnianFullText: `
      Kada su se Poslanik Muhammed ﷺ i Ebu Bekr pripremali za hidžru (preseljenje) iz Mekke u Medinu kako bi izbjegli progon, trebala im je pomoć da njihovo putovanje ostane tajno.

      Asma bint Ebu Bekr, kćerka Ebu Bekra, imala je ključnu ulogu u ovom važnom događaju. Bila je samo mlada žena, ali je pokazala nevjerovatnu hrabrost.

      Poslanik ﷺ i Ebu Bekr su se skrivali u pećini Sevr, južno od Mekke, tri dana prije nego što su nastavili putovanje. Tokom tog vremena, Asma im je tajno donosila hranu i vijesti o tome šta se dešavalo u Mekki.

      Jednog dana, dok je Asma pripremala hranu za odnijeti do pećine, shvatila je da nema čime povezati pakete. Brzo razmislivši, poderala je svoj pojas na dva dijela, koristeći jedan dio za povezivanje paketa s hranom, a drugi za pričvršćivanje svoje odjeće.

      Za ovo pametno rješenje, Poslanik ﷺ joj je dao titulu "Zatu'n-Nitakayn" (Ona s dva pojasa).

      Asma se suočila s velikom opasnošću donoseći potrepštine do pećine. Kurejšije su ponudile nagradu za hvatanje Poslanika ﷺ, a patrole su pretraživale svuda. Jednom, vraćajući se iz pećine, suočila se s jednim od tragača koji je sumnjao da ona nešto zna. Uprkos prijetnji, Asma je ostala smirena i nije ništa otkrila.

      Asmina hrabrost i brzo razmišljanje pomogli su da Poslanikova hidžra bude uspješna, što je bila prekretnica u islamskoj historiji.
    `,
    bosnianMoralLesson: "Čak i mladi ljudi mogu pokazati veliku hrabrost i dati značajan doprinos kada pomažu drugima.",
    // Add German translations
    germanTitle: "Asma und die zwei Gürtel",
    germanShortDescription: "Wie Asma bint Abu Bakr dem Propheten während seiner Auswanderung nach Medina half.",
    germanFullText: `
      Als der Prophet Muhammad ﷺ und Abu Bakr sich darauf vorbereiteten, von Mekka nach Medina auszuwandern, um der Verfolgung zu entgehen, brauchten sie Hilfe, um ihre Reise geheim zu halten.

      Asma bint Abu Bakr, die Tochter von Abu Bakr, spielte bei diesem wichtigen Ereignis eine entscheidende Rolle. Sie war eine junge Frau, zeigte aber unglaublichen Mut.

      Der Prophet ﷺ und Abu Bakr versteckten sich drei Tage lang in der Höhle von Thawr, südlich von Mekka, bevor sie ihre Reise fortsetzten. Während dieser Zeit brachte Asma ihnen heimlich Nahrung und Nachrichten darüber, was in Mekka geschah.

      Eines Tages, als Asma Essen vorbereitete, um es zur Höhle zu bringen, bemerkte sie, dass sie nichts hatte, um die Pakete zu binden. Schnell entschlossen, riss sie ihren Gürtel in zwei Teile, verwendete einen Teil, um die Essenspakete zu binden und den anderen, um ihr Kleid zu sichern.

      Für diese kluge Lösung gab ihr der Prophet ﷺ den Titel "Dhat an-Nitaqayn" (Die mit den zwei Gürteln).

      Asma setzte sich großer Gefahr aus, als sie Vorräte zur Höhle brachte. Die Quraisch hatten eine Belohnung für die Gefangennahme des Propheten ﷺ ausgesetzt, und Patrouillen suchten überall. Einmal, als sie von der Höhle zurückkehrte, wurde sie von einem der Sucher konfrontiert, der vermutete, dass sie etwas wusste. Trotz der Bedrohung blieb Asma ruhig und verriet nichts.

      Asmas Tapferkeit und schnelles Denken trugen dazu bei, dass die Auswanderung des Propheten erfolgreich war, was ein Wendepunkt in der islamischen Geschichte darstellte.
    `,
    germanMoralLesson: "Auch junge Menschen können großen Mut zeigen und bedeutende Beiträge leisten, wenn sie anderen helfen.",
    // Add Italian translations
    italianTitle: "Asma e le Due Cinture",
    italianShortDescription: "Come Asma bint Abu Bakr aiutò il Profeta durante la sua migrazione a Medina.",
    italianFullText: `
      Quando il Profeta Muhammad ﷺ e Abu Bakr si preparavano a migrare da Mecca a Medina per sfuggire alle persecuzioni, avevano bisogno di aiuto per mantenere segreto il loro viaggio.

      Asma bint Abu Bakr, la figlia di Abu Bakr, ebbe un ruolo cruciale in questo importante evento. Era solo una giovane donna, ma mostrò un incredibile coraggio.

      Il Profeta ﷺ e Abu Bakr si nascosero nella Grotta di Thawr, a sud di Mecca, per tre giorni prima di continuare il loro viaggio. Durante questo periodo, Asma portava loro segretamente cibo e notizie su ciò che stava accadendo a Mecca.

      Un giorno, mentre Asma stava preparando del cibo da portare alla grotta, si rese conto di non avere nulla con cui legare i pacchetti. Pensando rapidamente, strappò la sua cintura in due, usando un pezzo per legare i pacchetti di cibo e l'altro per assicurare il suo vestito.

      Per questa soluzione ingegnosa, il Profeta ﷺ le diede il titolo di "Dhat an-Nitaqayn" (Colei con le Due Cinture).

      Asma affrontò un grande pericolo portando rifornimenti alla grotta. I Quraysh avevano offerto una ricompensa per la cattura del Profeta ﷺ, e pattuglie stavano cercando ovunque. Una volta, tornando dalla grotta, fu affrontata da uno dei cercatori che sospettava che lei sapesse qualcosa. Nonostante la minaccia, Asma rimase calma e non rivelò nulla.

      Il coraggio e la prontezza di spirito di Asma contribuirono al successo della migrazione del Profeta, che fu un punto di svolta nella storia islamica.
    `,
    italianMoralLesson: "Anche i giovani possono mostrare grande coraggio e dare contributi significativi quando aiutano gli altri."
  },
  {
    id: 6,
    title: "The Honesty of Ka'b ibn Malik",
    category: "companions",
    age: "older",
    shortDescription: "A companion who chose honesty when it was hardest, and how Allah rewarded his truthfulness.",
    fullText: `
      Ka'b ibn Malik was a well-respected companion of the Prophet Muhammad ﷺ and had participated in many battles alongside him. However, when the time came for the Battle of Tabuk, Ka'b failed to join the Muslim army without a valid excuse.
      
      When the Prophet ﷺ returned from the expedition, those who had stayed behind came with various excuses. Ka'b, however, decided to tell the truth.
      
      He said to the Prophet ﷺ: "By Allah, I had no excuse. I was never stronger or wealthier than I was when I stayed behind." The Prophet ﷺ responded: "As for this man, he has spoken the truth."
      
      As a consequence of his failure, but also as a test of his faith, the Prophet ﷺ ordered the Muslims not to speak to Ka'b and two others who had also admitted the truth. This social boycott lasted for fifty days.
      
      Ka'b described this period as extremely difficult. He continued to attend prayers at the mosque, but people avoided him. Even his closest friends would not return his greetings. His wife suggested he seek an exemption from the Prophet ﷺ, but Ka'b refused to seek any special treatment.
      
      On the fiftieth day, just as Ka'b was at his lowest point, a messenger came with news that Allah had accepted his repentance. The Qur'an revealed verses about this incident, highlighting the importance of truthfulness:
      
      "Allah has certainly turned in mercy to the Prophet and the emigrants and the helpers who followed him in the hour of difficulty... And to the three who were left behind..." (Quran 9:117-118)
      
      Ka'b later said that his commitment to the truth was the greatest blessing after accepting Islam, as it saved him from destruction.
    `,
    imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJVA7LmmdAxIN-ZewpphTCNuP4NjxnR2eoKY2ZxScdN6ni4XkUqr-Pc2scNWUQuNCPI0N4A11celu44IpFQ-p76FWD7vXIi6hU_E9QUDcdMN9ZhqYrhhiQDDNsbWZvOD7hyphenhyphen9Jcoht63cgC/s1600/Sahabeler112.jpg",
    moralLesson: "Always tell the truth, even when it's difficult. Allah values truthfulness above all.",
    albanianTitle: "Ndershmëria e Ka'b ibn Malik",
    albanianShortDescription: "Një sahabe që zgjodhi ndershmërinë kur ishte më e vështira, dhe si Allahu e shpërbleu sinqeritetin e tij.",
    albanianFullText: `
      Ka'b ibn Malik ishte një sahabe i respektuar i Profetit Muhamed ﷺ dhe kishte marrë pjesë në shumë beteja së bashku me të. Megjithatë, kur erdhi koha për Betejën e Tabukut, Ka'b nuk arriti të bashkohej me ushtrinë myslimane pa një arsye të vlefshme.

      Kur Profeti ﷺ u kthye nga ekspedita, ata që kishin mbetur prapa erdhën me arsye të ndryshme. Ka'b, megjithatë, vendosi të tregonte të vërtetën.

      Ai i tha Profetit ﷺ: "Për Allah, nuk kisha asnjë arsye. Nuk kam qenë kurrë më i fortë ose më i pasur se sa isha kur mbeta prapa." Profeti ﷺ u përgjigj: "Sa i përket këtij njeriu, ai ka thënë të vërtetën."

      Si pasojë e dështimit të tij, por edhe si një test i besimit të tij, Profeti ﷺ urdhëroi myslimanët të mos flisnin me Ka'b dhe dy të tjerë të cilët gjithashtu e pranonin të vërtetën. Ky bojkot shoqëror zgjati për pesëdhjetë ditë.

      Ka'b e përshkroi këtë periudhë si jashtëzakonisht të vështirë. Ai vazhdoi të merrte pjesë në lutjet në xhami, por njerëzit e shmangnin atë. Edhe miqtë e tij më të afërt nuk i kthenin përshëndetjet. Gruaja e tij i sugjeroi të kërkonte një përjashtim nga Profeti ﷺ, por Ka'b refuzoi të kërkonte ndonjë trajtim të veçantë.

      Në ditën e pesëdhjetë, pikërisht kur Ka'b ishte në pikën e tij më të ulët, një lajmëtar erdhi me lajmin se Allahu e kishte pranuar pendimin e tij. Kur'ani zbuloi vargje për këtë incident, duke theksuar rëndësinë e sinqeritetit:

      "Allahu me të vërtetë është kthyer me mëshirë ndaj Profetit dhe emigrantëve dhe ndihmuesve që e ndoqën atë në orën e vështirësisë... Dhe ndaj të treve që u lanë pas..." (Kurani 9:117-118)

      Ka'b më vonë tha se angazhimi i tij ndaj të vërtetës ishte bekimi më i madh pas pranimit të Islamit, pasi e shpëtoi nga shkatërrimi.
    `,
    albanianMoralLesson: "Gjithmonë tregoni të vërtetën, edhe kur është e vështirë. Allahu e vlerëson sinqeritetin mbi të gjitha.",
    bosnianTitle: "Iskrenost Ka'b ibn Malika",
    bosnianShortDescription: "Ashab koji je izabrao iskrenost kada je bilo najteže, i kako je Allah nagradio njegovu istinitost.",
    bosnianFullText: `
      Ka'b ibn Malik bio je visoko poštovan Poslanikov drug koji je učestvovao u mnogim bitkama zajedno s njim. Međutim, kada je došlo vrijeme za bitku na Tebuku, Ka'b se nije pridružio muslimanskoj vojsci bez valjanog razloga.
      
      Kada se Poslanik ﷺ vratio iz pohoda, oni koji su ostali iza dolazili su s raznim izgovorima. Ka'b je, međutim, odlučio reći istinu.
      
      Rekao je Poslaniku ﷺ: "Tako mi Allaha, nisam imao opravdanja. Nikada nisam bio jači ili bogatiji nego kada sam ostao iza." Poslanik ﷺ je odgovorio: "Što se tiče ovog čovjeka, on je rekao istinu."
      
      Kao posljedica njegovog propusta, ali i kao test njegove vjere, Poslanik ﷺ je naredio muslimanima da ne razgovaraju s Ka'bom i još dvojicom koji su također priznali istinu. Ovaj društveni bojkot trajao je pedeset dana.
      
      Ka'b je opisao ovaj period kao izuzetno težak. Nastavio je dolaziti na molitve u džamiju, ali ljudi su ga izbjegavali. Čak mu ni njegovi najbliži prijatelji nisu uzvraćali pozdrave. Njegova žena mu je predložila da zatraži izuzeće od Poslanika ﷺ, ali Ka'b je odbio tražiti bilo kakav poseban tretman.
      
      Pedesetog dana, upravo kada je Ka'b bio na najnižoj tački, došao je glasnik s viješću da je Allah prihvatio njegovo pokajanje. Kur'an je objavio ajete o ovom događaju, naglašavajući važnost iskrenosti:
      
      "Allah je oprostio Vjerovjesniku, i muhadžirima i ensarijama, koji su ga u teškom času slijedili... I onoj trojici koja su bila izostala..." (Kur'an 9:117-118)
      
      Ka'b je kasnije rekao da je njegova posvećenost istini bila najveći blagoslov nakon prihvatanja islama, jer ga je spasila od propasti.
    `,
    bosnianMoralLesson: "Uvijek govori istinu, čak i kada je teško. Allah cijeni iskrenost iznad svega.",
    // Add German translations
    germanTitle: "Die Ehrlichkeit von Ka'b ibn Malik",
    germanShortDescription: "Ein Gefährte, der die Ehrlichkeit wählte, als es am schwersten war, und wie Allah seine Wahrhaftigkeit belohnte.",
    germanFullText: `
      Ka'b ibn Malik war ein hoch angesehener Gefährte des Propheten Muhammad ﷺ und hatte an vielen Schlachten an seiner Seite teilgenommen. Als jedoch die Zeit für die Schlacht von Tabuk kam, gelang es Ka'b nicht, sich ohne triftigen Grund der muslimischen Armee anzuschließen.
      
      Als der Prophet ﷺ von der Expedition zurückkehrte, kamen diejenigen, die zurückgeblieben waren, mit verschiedenen Entschuldigungen. Ka'b entschied sich jedoch, die Wahrheit zu sagen.
      
      Er sagte zum Propheten ﷺ: "Bei Allah, ich hatte keine Entschuldigung. Ich war nie stärker oder wohlhabender als zu der Zeit, als ich zurückblieb." Der Prophet ﷺ antwortete: "Was diesen Mann betrifft, er hat die Wahrheit gesprochen."
      
      Als Folge seines Versäumnisses, aber auch als Prüfung seines Glaubens, befahl der Prophet ﷺ den Muslimen, nicht mit Ka'b und zwei anderen zu sprechen, die ebenfalls die Wahrheit zugegeben hatten. Dieser soziale Boykott dauerte fünfzig Tage.
      
      Ka'b beschrieb diese Zeit als äußerst schwierig. Er besuchte weiterhin die Gebete in der Moschee, aber die Menschen mieden ihn. Selbst seine engsten Freunde erwiderten seine Grüße nicht. Seine Frau schlug vor, er solle eine Ausnahmeregelung vom Propheten ﷺ erbitten, aber Ka'b lehnte es ab, eine Sonderbehandlung zu suchen.
      
      Am fünfzigsten Tag, als Ka'b am Tiefpunkt war, kam ein Bote mit der Nachricht, dass Allah seine Reue angenommen hatte. Der Koran offenbarte Verse über diesen Vorfall und betonte die Wichtigkeit der Wahrhaftigkeit:
      
      "Allah hat sich in Barmherzigkeit dem Propheten und den Auswanderern und den Helfern zugewandt, die ihm in der Stunde der Not folgten... Und den dreien, die zurückgelassen wurden..." (Koran 9:117-118)
      
      Ka'b sagte später, sein Festhalten an der Wahrheit sei nach der Annahme des Islam der größte Segen gewesen, da es ihn vor dem Verderben bewahrt habe.
    `,
    germanMoralLesson: "Sage immer die Wahrheit, auch wenn es schwierig ist. Allah schätzt Wahrhaftigkeit über alles.",
    // Add Italian translations
    italianTitle: "L'Onestà di Ka'b ibn Malik",
    italianShortDescription: "Un compagno che scelse l'onestà quando era più difficile, e come Allah premiò la sua sincerità.",
    italianFullText: `
      Ka'b ibn Malik era un compagno molto rispettato del Profeta Muhammad ﷺ e aveva partecipato a molte battaglie al suo fianco. Tuttavia, quando giunse il momento della Battaglia di Tabuk, Ka'b non riuscì a unirsi all'esercito musulmano senza una valida scusa.
      
      Quando il Profeta ﷺ tornò dalla spedizione, coloro che erano rimasti indietro vennero con varie scuse. Ka'b, invece, decise di dire la verità.
      
      Disse al Profeta ﷺ: "Per Allah, non avevo scuse. Non sono mai stato più forte o più ricco di quando sono rimasto indietro." Il Profeta ﷺ rispose: "Quanto a quest'uomo, ha detto la verità."
      
      Come conseguenza del suo fallimento, ma anche come prova della sua fede, il Profeta ﷺ ordinò ai musulmani di non parlare con Ka'b e con altri due che avevano anche loro ammesso la verità. Questo boicottaggio sociale durò cinquanta giorni.
      
      Ka'b descrisse questo periodo come estremamente difficile. Continuava a partecipare alle preghiere nella moschea, ma le persone lo evitavano. Anche i suoi amici più stretti non ricambiavano i suoi saluti. Sua moglie gli suggerì di chiedere un'esenzione al Profeta ﷺ, ma Ka'b rifiutò di cercare qualsiasi trattamento speciale.
      
      Al cinquantesimo giorno, proprio quando Ka'b era al suo punto più basso, arrivò un messaggero con la notizia che Allah aveva accettato il suo pentimento. Il Corano rivelò versi su questo incidente, sottolineando l'importanza della sincerità:
      
      "Allah si è certamente rivolto con misericordia al Profeta e agli emigranti e ai soccorritori che lo seguirono nell'ora della difficoltà... E ai tre che furono lasciati indietro..." (Corano 9:117-118)
      
      Ka'b in seguito disse che il suo impegno per la verità era stata la più grande benedizione dopo aver accettato l'Islam, poiché lo salvò dalla distruzione.
    `,
    italianMoralLesson: "Dì sempre la verità, anche quando è difficile. Allah apprezza la sincerità sopra ogni cosa."
  },
  {
    id: 7,
    title: "The Cat Lover: Abu Hurairah",
    category: "companions",
    age: "young",
    shortDescription: "How Abu Hurairah got his name and became one of the most important narrators of hadith.",
    fullText: `
      Abu Hurairah was not his real name. He was actually called Abd al-Rahman ibn Sakhr, but he received the nickname "Abu Hurairah" which means "Father of the Kitten" because he loved cats so much!

      Before accepting Islam, Abu Hurairah lived in poverty. He would often carry a small cat in his sleeve, caring for it and playing with it. This kindness toward animals was part of his character that continued after he became Muslim.

      Abu Hurairah met the Prophet Muhammad ﷺ in the 7th year after Hijrah (migration to Medina) and immediately embraced Islam. Although he only spent about three years with the Prophet ﷺ, he dedicated that time entirely to learning.

      While other companions had to work and take care of family matters, Abu Hurairah devoted himself completely to following the Prophet ﷺ and memorizing his sayings and actions. He once complained to the Prophet ﷺ about forgetting some things he had learned. The Prophet ﷺ told him to spread out his garment. The Prophet ﷺ then made a gesture as if throwing something into the garment and told Abu Hurairah to draw it to himself. After this, Abu Hurairah said he never forgot anything.

      Because of his amazing memory and constant companionship with the Prophet ﷺ, Abu Hurairah became the companion who narrated the most hadith – over 5,300! Without his dedication, we would have lost many of the Prophet's teachings.

      Abu Hurairah's story teaches us that even someone who starts with very little can make an enormous contribution if they dedicate themselves to knowledge and learning.
    `,
    imageUrl: "https://www.freemalaysiatoday.com/_next/image/?url=https%3A%2F%2Fmedia.freemalaysiatoday.com%2Fwp-content%2Fuploads%2F2025%2F02%2F923e5ebc-lifestyle-labun-emel-pic-220225.webp&w=1080&q=75",
    moralLesson: "Knowledge is a treasure that can be carried without weight, and kindness to animals is a sign of a good heart.",
    albanianTitle: "Dashuria për Macet: Ebu Hurejra",
    albanianShortDescription: "Si e mori Ebu Hurejra emrin e tij dhe u bë një nga treguesit më të rëndësishëm të haditheve.",
    albanianFullText: `
      Ebu Hurejra nuk ishte emri i tij i vërtetë. Ai në të vërtetë quhej Abd al-Rahman ibn Sakhr, por mori nofkën "Ebu Hurejra" që do të thotë "Babai i Koteles" sepse ai i donte macet aq shumë!

      Para se të pranonte Islamin, Ebu Hurejra jetonte në varfëri. Ai shpesh mbante një mace të vogël në mëngën e tij, duke u kujdesur për të dhe duke luajtur me të. Kjo mirësi ndaj kafshëve ishte pjesë e karakterit të tij që vazhdoi pasi ai u bë mysliman.

      Ebu Hurejra takoi Profetin Muhamed ﷺ në vitin e 7-të pas Hixhretit (emigrimit në Medinë) dhe menjëherë e përqafoi Islamin. Megjithëse ai kaloi vetëm rreth tre vjet me Profetin ﷺ, ai e kushtoi atë kohë tërësisht për të mësuar.

      Ndërsa shokët e tjerë duhej të punonin dhe të kujdeseshin për çështjet familjare, Ebu Hurejra iu përkushtua plotësisht ndjekjes së Profetit ﷺ dhe memorizimit të thënieve dhe veprimeve të tij. Një herë ai u ankua tek Profeti ﷺ për harresën e disa gjërave që kishte mësuar. Profeti ﷺ i tha të shtrinte rrobën e tij. Profeti ﷺ pastaj bëri një gjest sikur hidhte diçka në rrobë dhe i tha Ebu Hurejrës ta tërhiqte atë drejt vetes. Pas kësaj, Ebu Hurejra tha se nuk harroi më asnjëherë.

      Për shkak të kujtesës së tij të mahnitshme dhe shoqërimit të vazhdueshëm me Profetin ﷺ, Ebu Hurejra u bë sahabi që tregoi më shumë hadithe - mbi 5,300! Pa përkushtimin e tij, do të kishim humbur shumë nga mësimet e Profetit.

      Historia e Ebu Hurejrës na mëson se edhe dikush që fillon me shumë pak mund të japë një kontribut të jashtëzakonshëm nëse i përkushtohet dijes dhe mësimit.
    `,
    albanianMoralLesson: "Dija është një thesar që mund të mbahet pa peshë, dhe mirësia ndaj kafshëve është shenjë e një zemre të mirë.",
    bosnianTitle: "Ljubitelj mačaka: Ebu Hurejra",
    bosnianShortDescription: "Kako je Ebu Hurejra dobio ime i postao jedan od najvažnijih prenosilaca hadisa.",
    bosnianFullText: `
      Ebu Hurejra nije bilo njegovo pravo ime. Zapravo se zvao Abd al-Rahman ibn Sakhr, ali je dobio nadimak "Ebu Hurejra" što znači "Otac mačića" jer je toliko volio mačke!

      Prije prihvatanja islama, Ebu Hurejra je živio u siromaštvu. Često je nosio malu mačku u svom rukavu, brinući se o njoj i igrajući se s njom. Ova ljubaznost prema životinjama bila je dio njegovog karaktera koji se nastavio i nakon što je postao musliman.

      Ebu Hurejra je sreo Poslanika Muhammeda ﷺ u 7. godini nakon Hidžre (preseljenja u Medinu) i odmah je prihvatio islam. Iako je proveo samo oko tri godine s Poslanikom ﷺ, to vrijeme je u potpunosti posvetio učenju.

      Dok su drugi ashabi morali raditi i brinuti o porodičnim stvarima, Ebu Hurejra se potpuno posvetio praćenju Poslanika ﷺ i pamćenju njegovih izreka i postupaka. Jednom se požalio Poslaniku ﷺ da zaboravlja neke stvari koje je naučio. Poslanik ﷺ mu je rekao da raširi svoju odjeću. Poslanik ﷺ je zatim napravio gestu kao da baca nešto u odjeću i rekao Ebu Hurejri da je privuče sebi. Nakon toga, Ebu Hurejra je rekao da više nikada ništa nije zaboravio.

      Zbog svog nevjerovatnog pamćenja i stalnog društva s Poslanikom ﷺ, Ebu Hurejra je postao ashab koji je prenio najviše hadisa – preko 5.300! Bez njegove posvećenosti, izgubili bismo mnoga Poslanikova učenja.

      Priča o Ebu Hurejri nas uči da čak i neko ko počinje s vrlo malo može dati ogroman doprinos ako se posveti znanju i učenju.
    `,
    bosnianMoralLesson: "Znanje je blago koje se može nositi bez težine, a ljubaznost prema životinjama je znak dobrog srca.",
    // Add German translations
    germanTitle: "Der Katzenliebhaber: Abu Hurairah",
    germanShortDescription: "Wie Abu Hurairah seinen Namen erhielt und einer der wichtigsten Überlieferer von Hadith wurde.",
    germanFullText: `
      Abu Hurairah war nicht sein richtiger Name. Er hieß eigentlich Abd al-Rahman ibn Sakhr, erhielt aber den Spitznamen "Abu Hurairah", was "Vater des Kätzchens" bedeutet, weil er Katzen so sehr liebte!

      Vor seiner Annahme des Islam lebte Abu Hurairah in Armut. Er trug oft eine kleine Katze in seinem Ärmel, kümmerte sich um sie und spielte mit ihr. Diese Freundlichkeit gegenüber Tieren war Teil seines Charakters, der auch nach seiner Konversion zum Islam fortbestand.

      Abu Hurairah traf den Propheten Muhammad ﷺ im 7. Jahr nach der Hidschra (Auswanderung nach Medina) und nahm sofort den Islam an. Obwohl er nur etwa drei Jahre mit dem Propheten ﷺ verbrachte, widmete er diese Zeit vollständig dem Lernen.

      Während andere Gefährten arbeiten und sich um Familienangelegenheiten kümmern mussten, widmete sich Abu Hurairah vollständig dem Folgen des Propheten ﷺ und dem Auswendiglernen seiner Aussprüche und Handlungen. Einmal beklagte er sich beim Propheten ﷺ, dass er einige Dinge vergesse, die er gelernt hatte. Der Prophet ﷺ forderte ihn auf, sein Gewand auszubreiten. Der Prophet ﷺ machte dann eine Geste, als würde er etwas in das Gewand werfen, und forderte Abu Hurairah auf, es an sich zu ziehen. Danach sagte Abu Hurairah, er hätte nie wieder etwas vergessen.

      Wegen seines erstaunlichen Gedächtnisses und der ständigen Begleitung des Propheten ﷺ wurde Abu Hurairah zum Gefährten, der die meisten Hadithe überlieferte – über 5.300! Ohne seine Hingabe hätten wir viele Lehren des Propheten verloren.

      Die Geschichte von Abu Hurairah lehrt uns, dass selbst jemand, der mit sehr wenig beginnt, einen enormen Beitrag leisten kann, wenn er sich dem Wissen und dem Lernen widmet.
    `,
    germanMoralLesson: "Wissen ist ein Schatz, der ohne Gewicht getragen werden kann, und Freundlichkeit gegenüber Tieren ist ein Zeichen eines guten Herzens.",
    // Add Italian translations
    italianTitle: "L'Amante dei Gatti: Abu Hurairah",
    italianShortDescription: "Come Abu Hurairah ottenne il suo nome e divenne uno dei più importanti narratori di hadith.",
    italianFullText: `
      Abu Hurairah non era il suo vero nome. In realtà si chiamava Abd al-Rahman ibn Sakhr, ma ricevette il soprannome "Abu Hurairah" che significa "Padre del Gattino" perché amava così tanto i gatti!

      Prima di accettare l'Islam, Abu Hurairah viveva in povertà. Spesso portava un piccolo gatto nella sua manica, prendendosene cura e giocando con esso. Questa gentilezza verso gli animali era parte del suo carattere che continuò anche dopo essere diventato musulmano.

      Abu Hurairah incontrò il Profeta Muhammad ﷺ nel 7° anno dopo l'Egira (migrazione a Medina) e abbracciò immediatamente l'Islam. Sebbene trascorse solo circa tre anni con il Profeta ﷺ, dedicò quel tempo interamente all'apprendimento.

      Mentre altri compagni dovevano lavorare e occuparsi di questioni familiari, Abu Hurairah si dedicò completamente a seguire il Profeta ﷺ e a memorizzare i suoi detti e le sue azioni. Una volta si lamentò con il Profeta ﷺ per aver dimenticato alcune cose che aveva imparato. Il Profeta ﷺ gli disse di stendere il suo indumento. Il Profeta ﷺ poi fece un gesto come se stesse gettando qualcosa nell'indumento e disse ad Abu Hurairah di portarlo a sé. Dopo questo, Abu Hurairah disse che non dimenticò mai più nulla.

      Grazie alla sua straordinaria memoria e alla costante compagnia con il Profeta ﷺ, Abu Hurairah divenne il compagno che narrò più hadith – oltre 5.300! Senza la sua dedizione, avremmo perso molti degli insegnamenti del Profeta.

      La storia di Abu Hurairah ci insegna che anche qualcuno che inizia con molto poco può dare un enorme contributo se si dedica alla conoscenza e all'apprendimento.
    `,
    italianMoralLesson: "La conoscenza è un tesoro che può essere portato senza peso, e la gentilezza verso gli animali è segno di un buon cuore."
  },
  {
    id: 8,
    title: "The Boy and the Baker",
    category: "values",
    age: "young",
    shortDescription: "A tale about honesty and trust from Islamic tradition.",
    fullText: `
      In a small village, there lived a poor widow with her young son named Ahmed. The mother worked hard doing laundry for people, but she earned very little money. Ahmed wanted to help his mother, so he found work as an assistant to the village baker.

      The baker was known for his delicious bread, but also for his strict and sometimes unfair nature. Every morning, Ahmed would arrive early to help prepare the dough and clean the bakery. The baker paid him a small amount and also allowed him to take home one loaf of bread each day.

      One morning, while the baker was away getting ingredients from the market, a wealthy merchant came to the shop and asked for the finest loaf of bread. Ahmed sold him the bread and carefully put the money in the cash box.

      When the baker returned, he noticed that a special loaf was missing but didn't see any new money in the cash box. He immediately accused Ahmed of stealing. "Boy, where is the special loaf that was here? Did you take it or give it to someone without payment?"

      Ahmed explained what had happened, but the baker didn't believe him. Just as the baker was about to punish Ahmed, the merchant returned to the shop.

      "I came back to tell you that your bread was excellent," the merchant said. "I was in such a hurry earlier that I forgot to receive my change from this honest young boy. He insisted on putting all my money in your cash box."

      The baker checked a different compartment of the cash box and found the money exactly where Ahmed had placed it. He was ashamed of his accusation.

      "Ahmed, I misjudged you," the baker admitted. "Your honesty is worth more than all the bread in my shop."

      From that day forward, the baker treated Ahmed with respect and even increased his wages. Ahmed continued to work hard and honestly, and eventually, the baker taught him all his special recipes.

      Years later, when the baker grew too old to work, he gave the bakery to Ahmed, knowing it would be in honest and capable hands.
    `,
    imageUrl: "https://static-stil.kurir.rs/api/v3/images/960/1920/118027?ts=2025-02-22T01:11:49",
    moralLesson: "Honesty may be tested, but it is always rewarded in the end.",
    albanianTitle: "Djali dhe Bukëpjekësi",
    albanianShortDescription: "Një tregim për ndershmërinë dhe besimin nga tradita islame.",
    albanianFullText: `
      Në një fshat të vogël, jetonte një vejushë e varfër me djalin e saj të vogël të quajtur Ahmed. Nëna punonte shumë duke larë rroba për njerëzit, por fitonte shumë pak para. Ahmedi donte të ndihmonte nënën e tij, kështu që gjeti punë si ndihmës i bukëpjekësit të fshatit.

      Bukëpjekësi ishte i njohur për bukën e tij të shijshme, por edhe për natyrën e tij të rreptë dhe ndonjëherë të padrejtë. Çdo mëngjes, Ahmedi do të vinte herët për të ndihmuar në përgatitjen e brumit dhe pastrimin e bukëpjekjes. Bukëpjekësi e paguante atë me një sasi të vogël dhe gjithashtu i lejonte të merrte në shtëpi një copë bukë çdo ditë.

      Një mëngjes, ndërsa bukëpjekësi ishte larguar për të marrë përbërësit nga tregu, një tregtar i pasur erdhi në dyqan dhe kërkoi copën më të mirë të bukës. Ahmedi i shiti bukën dhe me kujdes vendosi paratë në arkën e parave.

      Kur bukëpjekësi u kthye, ai vuri re se një copë e veçantë buke mungonte por nuk pa para të reja në arkat e parave. Ai menjëherë e akuzoi Ahmedin për vjedhje. "Djalosh, ku është copa e veçantë e bukës që ishte këtu? E more ti apo ia dhe dikujt pa pagesë?"

      Ahmedi shpjegoi çfarë kishte ndodhur, por bukëpjekësi nuk e besoi. Pikërisht kur bukëpjekësi po përgatitej ta ndëshkonte Ahmedin, tregtari u kthye në dyqan.

      "Erdha për t'ju thënë se buka juaj ishte e shkëlqyer," tha tregtari. "Isha me kaq nxitim më herët sa harrova të merrja kusurin nga ky djalë i ndershëm. Ai këmbënguli që t'i vendoste të gjitha paratë e mia në arkën tuaj të parave."

      Bukëpjekësi kontrolloi një ndarje tjetër të arkës së parave dhe gjeti paratë pikërisht aty ku i kishte vendosur Ahmedi. Ai u turpërua nga akuza e tij.

      "Ahmed, të gjykova keq," pranoi bukëpjekësi. "Ndershmëria jote vlen më shumë se e gjithë buka në dyqanin tim."

      Nga ajo ditë e tutje, bukëpjekësi e trajtoi Ahmedin me respekt dhe madje i rriti pagën. Ahmedi vazhdoi të punonte fort dhe me ndershmëri, dhe më në fund, bukëpjekësi i mësoi të gjitha recetat e tij të veçanta.

      Vite më vonë, kur bukëpjekësi u bë shumë i vjetër për të punuar, ai ia dha furrën Ahmedit, duke e ditur se do të ishte në duar të ndershme dhe të afta.
    `,
    albanianMoralLesson: "Ndershmëria mund të vihet në provë, por gjithmonë shpërblehet në fund.",
    bosnianTitle: "Dječak i pekar",
    bosnianShortDescription: "Priča o iskrenosti i povjerenju iz islamske tradicije.",
    bosnianFullText: `
      U malom selu živjela je siromašna udovica sa svojim mladim sinom po imenu Ahmed. Majka je naporno radila perući veš za ljude, ali je zarađivala vrlo malo novca. Ahmed je želio pomoći svojoj majci, pa je našao posao kao pomoćnik seoskog pekara.

      Pekar je bio poznat po svom ukusnom hlebu, ali i po svojoj strogoj i ponekad nepravednoj prirodi. Svako jutro Ahmed bi dolazio rano da pomogne u pripremi tijesta i čišćenju pekare. Pekar ga je plaćao malo, ali mu je također dopuštao da svaki dan kući ponese jedan hljeb.

      Jednog jutra, dok je pekar bio odsutan nabavljajući sastojke s tržnice, u radnju je došao bogati trgovac i zatražio najfiniji hljeb. Ahmed mu je prodao hljeb i pažljivo stavio novac u kasu.

      Kada se pekar vratio, primijetio je da nedostaje poseban hljeb, ali nije vidio novi novac u kasi. Odmah je optužio Ahmeda za krađu. "Dječače, gdje je poseban hljeb koji je bio ovdje? Jesi li ga uzeo ili dao nekome bez plaćanja?"

      Ahmed je objasnio šta se dogodilo, ali mu pekar nije vjerovao. Upravo kada je pekar htio kazniti Ahmeda, trgovac se vratio u radnju.

      "Vratio sam se da vam kažem da je vaš hljeb bio odličan", rekao je trgovac. "Bio sam u takvoj žurbi ranije da sam zaboravio uzeti kusur od ovog poštenog mladog dječaka. On je insistirao da sav moj novac stavi u vašu kasu."

      Pekar je pogledao u drugi odjeljak kase i našao novac točno tamo gdje ga je Ahmed stavio. Posramio se zbog svoje optužbe.

      "Ahmed, pogrešno sam te prosudio", priznao je pekar. "Tvoja iskrenost vrijedi više od sveg hljeba u mojoj radnji."

      Od tog dana nadalje, pekar je tretirao Ahmeda s poštovanjem i čak mu povećao plaću. Ahmed je nastavio naporno i pošteno raditi, a na kraju ga je pekar naučio sve svoje posebne recepte.

      Godinama kasnije, kada je pekar postao prestar za rad, dao je pekaru Ahmedu, znajući da će biti u poštenim i sposobnim rukama.
    `,
    bosnianMoralLesson: "Iskrenost može biti iskušana, ali na kraju uvijek biva nagrađena.",
    // Add German translations
    germanTitle: "Der Junge und der Bäcker",
    germanShortDescription: "Eine Geschichte über Ehrlichkeit und Vertrauen aus der islamischen Tradition.",
    germanFullText: `
      In einem kleinen Dorf lebte eine arme Witwe mit ihrem jungen Sohn namens Ahmed. Die Mutter arbeitete hart und wusch Wäsche für Leute, verdiente aber sehr wenig Geld. Ahmed wollte seiner Mutter helfen, also fand er Arbeit als Gehilfe beim Dorfbäcker.

      Der Bäcker war bekannt für sein köstliches Brot, aber auch für seine strenge und manchmal unfaire Art. Jeden Morgen kam Ahmed früh, um bei der Vorbereitung des Teigs zu helfen und die Bäckerei zu reinigen. Der Bäcker zahlte ihm wenig, erlaubte ihm aber auch, jeden Tag einen Laib Brot mit nach Hause zu nehmen.

      Eines Morgens, während der Bäcker abwesend war, um Zutaten vom Markt zu holen, kam ein reicher Kaufmann in den Laden und fragte nach dem feinsten Brot. Ahmed verkaufte ihm das Brot und legte das Geld sorgfältig in die Kasse.

      Als der Bäcker zurückkam, bemerkte er, dass ein besonderer Laib fehlte, sah aber kein neues Geld in der Kasse. Er beschuldigte Ahmed sofort des Diebstahls. "Junge, wo ist das besondere Brot, das hier war? Hast du es genommen oder jemandem ohne Bezahlung gegeben?"

      Ahmed erklärte, was passiert war, aber der Bäcker glaubte ihm nicht. Gerade als der Bäcker Ahmed bestrafen wollte, kehrte der Kaufmann in den Laden zurück.

      "Ich bin zurückgekommen, um Ihnen zu sagen, dass Ihr Brot ausgezeichnet war", sagte der Kaufmann. "Ich war vorhin so in Eile, dass ich vergessen habe, mein Wechselgeld von diesem ehrlichen jungen Burschen zu erhalten. Er bestand darauf, mein ganzes Geld in Ihre Kasse zu legen."

      Der Bäcker schaute in ein anderes Fach der Kasse und fand das Geld genau dort, wo Ahmed es hingelegt hatte. Er schämte sich für seine Anschuldigung.

      "Ahmed, ich habe dich falsch beurteilt", gab der Bäcker zu. "Deine Ehrlichkeit ist mehr wert als alles Brot in meinem Laden."

      Von diesem Tag an behandelte der Bäcker Ahmed mit Respekt und erhöhte sogar seinen Lohn. Ahmed arbeitete weiterhin hart und ehrlich, und schließlich lehrte ihn der Bäcker all seine besonderen Rezepte.

      Jahre später, als der Bäcker zu alt zum Arbeiten wurde, übergab er die Bäckerei an Ahmed, wohl wissend, dass sie in ehrlichen und fähigen Händen sein würde.
    `,
    germanMoralLesson: "Ehrlichkeit mag auf die Probe gestellt werden, wird aber am Ende immer belohnt.",
    // Add Italian translations
    italianTitle: "Il Ragazzo e il Fornaio",
    italianShortDescription: "Una storia sull'onestà e la fiducia dalla tradizione islamica.",
    italianFullText: `
      In un piccolo villaggio, viveva una povera vedova con il suo giovane figlio di nome Ahmed. La madre lavorava duramente lavando i panni per le persone, ma guadagnava molto poco. Ahmed voleva aiutare sua madre, così trovò lavoro come assistente del fornaio del villaggio.

      Il fornaio era conosciuto per il suo delizioso pane, ma anche per la sua natura severa e talvolta ingiusta. Ogni mattina, Ahmed arrivava presto per aiutare a preparare l'impasto e pulire il forno. Il fornaio lo pagava poco e gli permetteva anche di portare a casa una pagnotta di pane ogni giorno.

      Una mattina, mentre il fornaio era via a prendere ingredienti dal mercato, un ricco mercante venne al negozio e chiese la pagnotta di pane più fine. Ahmed gli vendette il pane e mise attentamente i soldi nella cassa.

      Quando il fornaio tornò, notò che mancava una pagnotta speciale ma non vide nuovi soldi nella cassa. Accusò immediatamente Ahmed di furto. "Ragazzo, dov'è la pagnotta speciale che era qui? L'hai presa o l'hai data a qualcuno senza pagamento?"

      Ahmed spiegò cosa era successo, ma il fornaio non gli credette. Proprio mentre il fornaio stava per punire Ahmed, il mercante tornò al negozio.

      "Sono tornato per dirvi che il vostro pane era eccellente," disse il mercante. "Ero così di fretta prima che ho dimenticato di ricevere il resto da questo onesto giovane ragazzo. Lui ha insistito nel mettere tutti i miei soldi nella vostra cassa."

      Il fornaio controllò uno scomparto diverso della cassa e trovò i soldi esattamente dove Ahmed li aveva messi. Si vergognò della sua accusa.

      "Ahmed, ti ho giudicato male," ammise il fornaio. "La tua onestà vale più di tutto il pane nel mio negozio."

      Da quel giorno in poi, il fornaio trattò Ahmed con rispetto e aumentò persino il suo salario. Ahmed continuò a lavorare sodo e onestamente, e alla fine, il fornaio gli insegnò tutte le sue ricette speciali.

      Anni dopo, quando il fornaio divenne troppo vecchio per lavorare, diede il forno ad Ahmed, sapendo che sarebbe stato in mani oneste e capaci.
    `,
    italianMoralLesson: "L'onestà può essere messa alla prova, ma alla fine viene sempre premiata."
  },
  {
    id: 9,
    title: "The Power of Dua: Prophet Zakaria and Maryam",
    category: "prophets",
    age: "older",
    shortDescription: "How Prophet Zakaria's faith in Allah's power to grant the impossible was rewarded.",
    fullText: `
      Prophet Zakaria (peace be upon him) was an elderly prophet who had served Allah faithfully for many years. He and his wife had no children, and they had reached an age where it seemed impossible for them to have a child.
      
      Zakaria was entrusted with caring for Maryam (Mary), the mother of Prophet Isa (Jesus). Whenever Zakaria would visit Maryam in her prayer chamber, he would find fresh fruits that were out of season. He asked her where these came from, and she replied, "This is from Allah. Indeed, Allah provides for whom He wills without account."
      
      Seeing how Allah provided miraculously for Maryam inspired Zakaria. If Allah could provide out-of-season fruits, perhaps He could also grant Zakaria a child despite his old age.
      
      So Zakaria turned to Allah in private prayer, saying: "My Lord, indeed my bones have weakened, and my head has filled with white hair, and never have I been in my supplication to You, my Lord, unhappy. And indeed, I fear the successors after me, and my wife has been barren, so give me from Yourself an heir who will inherit from me and inherit from the family of Jacob. And make him, my Lord, pleasing [to You]." (Quran 19:4-6)
      
      Allah responded to his sincere prayer and announced the good news: "O Zakaria, indeed We give you good tidings of a boy whose name will be Yahya. We have not assigned to any before [this] name." (Quran 19:7)
      
      Zakaria was amazed and asked how this could be possible given his age and his wife's barrenness. Allah replied: "Thus [it will be]; your Lord says, 'It is easy for Me, for I created you before, when you were nothing.'" (Quran 19:9)
      
      As promised, Allah blessed Zakaria and his wife with a son, Yahya (John the Baptist), who grew up to become a great prophet known for his wisdom, compassion, and devotion to Allah.
    `,
    imageUrl: "https://iqna.ir/files/en/news/2023/4/25/133560_358.jpg",
    moralLesson: "Never lose hope in Allah's mercy and power to answer prayers, even when something seems impossible.",
    albanianTitle: "Fuqia e Lutjes: Profeti Zekerija dhe Merjemja",
    albanianShortDescription: "Si u shpërblye besimi i Profetit Zekerija në fuqinë e Allahut për të dhënë të pamundurën.",
    albanianFullText: `
      Profeti Zekerija (paqja qoftë mbi të) ishte një profet i moshuar që i kishte shërbyer Allahut me besnikëri për shumë vite. Ai dhe gruaja e tij nuk kishin fëmijë dhe kishin arritur në një moshë ku dukej e pamundur për ta të kishin një fëmijë.

      Zekerija ishte i ngarkuar me kujdesin për Merjemen (Marinë), nënën e Profetit Isa (Jezusit). Sa herë që Zekerija vizitonte Merjemen në dhomën e saj të lutjes, ai gjente fruta të freskëta që ishin jashtë stinës. Ai e pyeti atë se nga vinin këto, dhe ajo u përgjigj: "Kjo është nga Allahu. Vërtet, Allahu siguron për kë dëshiron pa llogari."

      Duke parë se si Allahu siguronte në mënyrë të mrekullueshme për Merjemen, Zekerija u frymëzua. Nëse Allahu mund të siguronte fruta jashtë stinës, ndoshta Ai gjithashtu mund t'i jepte Zekerijës një fëmijë pavarësisht moshës së tij të vjetër.

      Kështu Zekerija iu drejtua Allahut në lutje private, duke thënë: "Zoti im, me të vërtetë eshtrat e mi janë dobësuar dhe koka ime është mbushur me flokë të bardhë, dhe kurrë nuk kam qenë në lutjen time ndaj Teje, Zoti im, i pakënaqur. Dhe me të vërtetë, unë kam frikë pasardhësit pas meje, dhe gruaja ime ka qenë shterpe, prandaj më jep nga Ti një trashëgimtar i cili do të trashëgojë nga unë dhe do të trashëgojë nga familja e Jakubit. Dhe bëje atë, Zoti im, të këndshëm [ndaj Teje]." (Kurani 19:4-6)

      Allahu iu përgjigj lutjes së tij të sinqertë dhe i dha lajmin e mirë: "O Zekerija, vërtet Ne të japim lajmin e mirë të një djali, emri i të cilit do të jetë Jahja. Ne nuk i kemi caktuar askujt më parë këtë emër." (Kurani 19:7)

      Zekerija u habit dhe pyeti se si mund të ishte e mundur kjo duke pasur parasysh moshën e tij dhe shterpësinë e gruas së tij. Allahu u përgjigj: "Kështu [do të jetë]; Zoti yt thotë, 'Është e lehtë për Mua, sepse Unë të krijova ty më parë, kur ti nuk ishe asgjë.'" (Kurani 19:9)

      Siç ishte premtuar, Allahu i bekoi Zekerijën dhe gruan e tij me një djalë, Jahja (Gjon Pagëzori), i cili u rrit dhe u bë një profet i madh i njohur për urtësinë, dhembshurinë dhe përkushtimin e tij ndaj Allahut.
    `,
    albanianMoralLesson: "Kurrë mos e humb shpresën në mëshirën dhe fuqinë e Allahut për t'iu përgjigjur lutjeve, edhe kur diçka duket e pamundur.",
    bosnianTitle: "Moć dove: Poslanik Zekerija i Merjema",
    bosnianShortDescription: "Kako je nagrađena vjera poslanika Zekerije u Allahovu moć da podari nemoguće.",
    bosnianFullText: `
      Poslanik Zekerija (mir s njim) bio je stariji poslanik koji je vjerno služio Allahu mnogo godina. On i njegova supruga nisu imali djece, i došli su do dobi kada se činilo nemogućim da bi mogli imati dijete.
      
      Zekeriji je povjerena briga o Merjemi (Mariji), majci poslanika Isaa (Isusa). Kad god bi Zekerija posjetio Merjemu u njenoj odaji za molitvu, pronašao bi svježe voće koje nije bilo sezonsko. Pitao ju je odakle to dolazi, a ona je odgovorila: "Ovo je od Allaha. Zaista, Allah opskrbljuje koga On želi bez računa."
      
      Vidjevši kako Allah čudesno opskrbljuje Merjemu, Zekerija se nadahnuo. Ako Allah može osigurati voće izvan sezone, možda bi mogao podariti Zekeriji dijete usprkos njegovoj starosti.
      
      Tako se Zekerija obratio Allahu u privatnoj molitvi, govoreći: "Gospodaru moj, kosti su mi već oronule, a glava mi sjedi osjedom zabijelila, a nikada Gospodaru moj, nisam bio nesretan kada sam Ti se molio. I ja se bojim srodnika poslije mene, a žena mi je nerotkinja, pa mi podari od Sebe nasljednika, koji će naslijediti mene i porodicu Jakubovu, i učini ga, Gospodaru moj, od Tebe prihvaćenim!" (Kur'an 19:4-6)
      
      Allah je odgovorio na njegovu iskrenu molitvu i objavio radosnu vijest: "O Zekerija, Mi te obveseljavamo dječakom čije je ime Jahja. Nikome prije njega nismo tako ime dali." (Kur'an 19:7)
      
      Zekerija se čudio i pitao kako je to moguće s obzirom na njegovu dob i sterilnost njegove supruge. Allah je odgovorio: "Tako će biti, kaže Gospodar tvoj: 'To je Meni lako; i tebe sam stvorio prije, a nisi ništa bio.'" (Kur'an 19:9)
      
      Kako je obećano, Allah je blagoslovio Zekeriju i njegovu suprugu sa sinom, Jahjom (Ivanom Krstiteljem), koji je odrastao i postao veliki poslanik poznat po svojoj mudrosti, samilosti i odanosti Allahu.
    `,
    bosnianMoralLesson: "Nikada ne gubi nadu u Allahovu milost i moć da odgovori na molitve, čak i kada se nešto čini nemogućim.",
    // Add German translations
    germanTitle: "Die Kraft des Bittgebets: Prophet Zakaria und Maryam",
    germanShortDescription: "Wie Prophet Zakarias Glaube an Allahs Macht, das Unmögliche zu gewähren, belohnt wurde.",
    germanFullText: `
      Prophet Zakaria (Friede sei mit ihm) war ein älterer Prophet, der Allah viele Jahre lang treu gedient hatte. Er und seine Frau hatten keine Kinder und hatten ein Alter erreicht, in dem es unmöglich schien, ein Kind zu bekommen.
      
      Zakaria wurde mit der Fürsorge für Maryam (Maria), die Mutter des Propheten Isa (Jesus), betraut. Wann immer Zakaria Maryam in ihrer Gebetskammer besuchte, fand er frische Früchte, die nicht in der Saison waren. Er fragte sie, woher diese kämen, und sie antwortete: "Dies ist von Allah. Wahrlich, Allah versorgt, wen Er will, ohne zu rechnen."
      
      Als Zakaria sah, wie Allah Maryam auf wundersame Weise versorgte, wurde er inspiriert. Wenn Allah außerhalb der Saison Früchte bereitstellen könnte, könnte Er vielleicht auch Zakaria trotz seines hohen Alters ein Kind schenken.
      
      So wandte sich Zakaria im privaten Gebet an Allah und sagte: "Mein Herr, wahrlich, meine Knochen sind schwach geworden, und mein Haupt schimmert grau, und nie war ich in meinem Bittgebet an Dich, mein Herr, unglücklich. Und wahrlich, ich fürchte die Verwandten nach mir, und meine Frau ist unfruchtbar, so schenke mir von Dir einen Erben, der mich beerbt und die Familie Jakobs beerbt. Und mache ihn, mein Herr, (Dir) wohlgefällig." (Koran 19:4-6)
      
      Allah antwortete auf sein aufrichtiges Gebet und verkündete die frohe Botschaft: "O Zakaria, Wir verkünden dir einen Sohn, dessen Name Yahya sein wird. Wir haben zuvor niemandem diesen Namen gegeben." (Koran 19:7)
      
      Zakaria war erstaunt und fragte, wie dies angesichts seines Alters und der Unfruchtbarkeit seiner Frau möglich sein könne. Allah antwortete: "So wird es sein; dein Herr spricht: 'Das ist Mir ein Leichtes; habe Ich dich doch zuvor erschaffen, als du nichts warst.'" (Koran 19:9)
      
      Wie versprochen, segnete Allah Zakaria und seine Frau mit einem Sohn, Yahya (Johannes der Täufer), der zu einem großen Propheten heranwuchs, bekannt für seine Weisheit, sein Mitgefühl und seine Hingabe an Allah.
    `,
    germanMoralLesson: "Verliere niemals die Hoffnung auf Allahs Barmherzigkeit und Macht, Gebete zu erhören, selbst wenn etwas unmöglich erscheint.",
    // Add Italian translations
    italianTitle: "Il Potere della Dua: Il Profeta Zaccaria e Maria",
    italianShortDescription: "Come la fede del Profeta Zaccaria nel potere di Allah di concedere l'impossibile fu premiata.",
    italianFullText: `
      Il Profeta Zaccaria (pace su di lui) era un anziano profeta che aveva servito Allah fedelmente per molti anni. Lui e sua moglie non avevano figli e avevano raggiunto un'età in cui sembrava impossibile avere un bambino.
      
      A Zaccaria fu affidato il compito di prendersi cura di Maria, la madre del Profeta Gesù. Ogni volta che Zaccaria visitava Maria nella sua camera di preghiera, trovava frutti freschi fuori stagione. Le chiese da dove venissero, e lei rispose: "Questo viene da Allah. In verità, Allah provvede a chi vuole senza limiti."
      
      Vedendo come Allah provvedesse miracolosamente a Maria, Zaccaria si sentì ispirato. Se Allah poteva fornire frutti fuori stagione, forse poteva anche concedere a Zaccaria un figlio nonostante la sua età avanzata.
      
      Così Zaccaria si rivolse ad Allah in preghiera privata, dicendo: "Mio Signore, in verità le mie ossa si sono indebolite, e il mio capo si è riempito di capelli bianchi, e mai sono stato infelice nella mia supplica a Te, mio Signore. E in verità, temo i successori dopo di me, e mia moglie è sterile, quindi dammi da Te stesso un erede che erediterà da me e dalla famiglia di Giacobbe. E rendilo, mio Signore, gradito [a Te]." (Corano 19:4-6)
      
      Allah rispose alla sua sincera preghiera e annunciò la buona notizia: "O Zaccaria, in verità ti diamo il lieto annuncio di un ragazzo il cui nome sarà Giovanni (Yahya). Non abbiamo mai dato questo nome a nessuno prima." (Corano 19:7)
      
      Zaccaria rimase stupito e chiese come potesse essere possibile data la sua età e la sterilità di sua moglie. Allah rispose: "Così [sarà]; il tuo Signore dice: 'È facile per Me, poiché ti ho creato prima, quando non eri nulla.'" (Corano 19:9)
      
      Come promesso, Allah benedisse Zaccaria e sua moglie con un figlio, Giovanni (Yahya), che crebbe diventando un grande profeta noto per la sua saggezza, compassione e devozione ad Allah.
    `,
    italianMoralLesson: "Non perdere mai la speranza nella misericordia e nel potere di Allah di rispondere alle preghiere, anche quando qualcosa sembra impossibile."
  },
  {
    id: 10,
    title: "The Importance of Good Friends",
    category: "values",
    age: "young",
    shortDescription: "A story about choosing friends wisely and their influence on our character.",
    fullText: `
      In a bustling town lived two friends, Tariq and Faisal. They were the same age and grew up in the same neighborhood, but as they entered their teenage years, they began to spend time with different groups of friends.

      Tariq started hanging out with a group known for their good manners, studiousness, and helpfulness in the community. Every day after school, they would help each other with homework, volunteer at the local mosque, or play sports in the park.

      Faisal, however, began spending time with boys who often skipped school, spoke rudely to their elders, and played pranks on neighbors. At first, Faisal just watched without participating, but gradually, he started joining in their behaviors.

      One day, Tariq was helping an elderly neighbor carry groceries when he saw Faisal and his friends throwing rocks at trees in the elderly man's garden, knocking down fruit. When the old man called out to them, they ran away laughing.

      Later, Tariq approached Faisal and asked why he was behaving this way.

      "It's just for fun," Faisal shrugged. "Besides, everyone in my group does it."

      "But that doesn't make it right," Tariq replied. "Remember what the Prophet Muhammad ﷺ taught us: 'A person is upon the religion of his close friend, so let each of you look at whom he befriends.'"

      Faisal thought about this but continued with his new friends. Over time, his grades dropped, and he developed a reputation in the community for being disrespectful.

      Meanwhile, Tariq excelled in school and was loved by everyone for his helpful nature. The town's best craftsman even offered to teach him his trade after seeing Tariq's excellent character.

      One day, Faisal got into serious trouble when his friends damaged a neighbor's property and ran away, leaving him to face the consequences alone. When his parents arrived, they were deeply disappointed.

      This incident was a wake-up call for Faisal. He realized that his friends had influenced him to become someone he didn't want to be. He apologized to the neighbor, made amends for the damage, and started spending time with Tariq and his positive friends instead.

      Gradually, Faisal's behavior improved, his grades got better, and he rebuilt his reputation in the community. He learned the valuable lesson that we become like the people we spend time with, so it's important to choose friends who bring out the best in us.
    `,
    imageUrl: "/stories/good-friends.jpg",
    moralLesson: "Choose your friends wisely, for they shape who you become.",
    albanianTitle: "Rëndësia e Miqve të Mirë",
    albanianShortDescription: "Një tregim për zgjedhjen e miqve me mençuri dhe ndikimin e tyre në karakterin tonë.",
    albanianFullText: `
      Në një qytet të zhurmshëm jetonin dy miq, Tariku dhe Faisali. Ata ishin të së njëjtës moshë dhe u rritën në të njëjtën lagje, por kur hynë në vitet e tyre adoleshente, filluan të kalonin kohë me grupe të ndryshme miqsh.

      Tariku filloi të shoqërohej me një grup të njohur për sjelljen e tyre të mirë, studiozitetin dhe ndihmën në komunitet. Çdo ditë pas shkollës, ata do të ndihmonin njëri-tjetrin me detyrat e shtëpisë, do të bënin vullnetarizëm në xhaminë lokale, ose do të luanin sporte në park.

      Faisali, megjithatë, filloi të kalonte kohë me djem që shpesh nuk shkonin në shkollë, flisnin ashpër me të moshuarit e tyre dhe u bënin ngacmime fqinjëve. Në fillim, Faisali vetëm shikonte pa marrë pjesë, por gradualisht, ai filloi të bashkohej në sjelljet e tyre.

      Një ditë, Tariku po ndihmonte një fqinj të moshuar të mbante ushqimet kur pa Faisalin dhe miqtë e tij duke hedhur gurë në pemët në kopshtin e të moshuarit, duke rrëzuar frutat. Kur i moshuari u thirri atyre, ata ikën duke qeshur.

      Më vonë, Tariku iu afrua Faisalit dhe e pyeti pse po sillej në këtë mënyrë.

      "Është thjesht për argëtim," mblodhi supet Faisali. "Për më tepër, të gjithë në grupin tim e bëjnë këtë."

      "Por kjo nuk e bën të drejtë," u përgjigj Tariku. "Mbaj mend çfarë na mësoi Profeti Muhamed ﷺ: 'Një person është sipas fesë së mikut të tij të ngushtë, kështu që secili prej jush të shikojë se me kë shoqërohet.'"

      Faisali mendoi për këtë, por vazhdoi me miqtë e tij të rinj. Me kalimin e kohës, notat e tij ranë dhe ai fitoi një reputacion në komunitet për mungesë respekti.

      Ndërkohë, Tariku shkëlqeu në shkollë dhe u dashurua nga të gjithë për natyrën e tij ndihmëtare. Artizani më i mirë i qytetit madje i ofroi t'i mësonte zanatin e tij pasi pa karakterin e shkëlqyer të Tarikut.

      Një ditë, Faisali u fut në telashe serioze kur miqtë e tij dëmtuan pronën e një fqinji dhe ikën, duke e lënë atë të përballej me pasojat i vetëm. Kur erdhën prindërit e tij, ata ishin thellësisht të zhgënjyer.

      Ky incident ishte një thirrje zgjimi për Faisalin. Ai e kuptoi se miqtë e tij e kishin ndikuar atë të bëhej dikush që ai nuk donte të ishte. Ai kërkoi falje nga fqinji, bëri ndreqje për dëmin dhe filloi të kalonte kohë me Tarikun dhe miqtë e tij pozitivë në vend të tyre.

      Gradualisht, sjellja e Faisalit u përmirësua, notat e tij u bënë më të mira dhe ai rindërtoi reputacionin e tij në komunitet. Ai mësoi mësimin e çmuar se ne bëhemi si njerëzit me të cilët kalojmë kohën, kështu që është e rëndësishme të zgjedhim miq që nxjerrin më të mirën nga ne.
    `,
    albanianMoralLesson: "Zgjidhni miqtë tuaj me mençuri, sepse ata formojnë atë që ju bëheni.",
    bosnianTitle: "Važnost dobrih prijatelja",
    bosnianShortDescription: "Priča o mudrom biranju prijatelja i njihovom uticaju na naš karakter.",
    bosnianFullText: `
      U užurbanom gradu živjela su dva prijatelja, Tarik i Faisal. Bili su istih godina i odrasli u istom komšiluku, ali kako su ušli u tinejdžerske godine, počeli su provoditi vrijeme s različitim grupama prijatelja.

      Tarik je počeo družiti se s grupom poznatom po dobrom ponašanju, predanosti učenju i spremnosti da pomognu u zajednici. Svaki dan nakon škole, pomagali bi jedni drugima s domaćim zadacima, volontirali u lokalnoj džamiji ili igrali sport u parku.

      Faisal je, međutim, počeo provoditi vrijeme s dječacima koji su često izostajali iz škole, nepristojno govorili starijima i izvodili nepodopštine komšijama. U početku, Faisal je samo gledao bez učestvovanja, ali postepeno je počeo pridruživati se njihovom ponašanju.

      Jednog dana, Tarik je pomagao starijem komšiji nositi namirnice kada je vidio Faisala i njegove prijatelje kako bacaju kamenje na drveće u bašti starijeg čovjeka, obarajući voće. Kada ih je stari čovjek pozvao, pobjegli su smijući se.

      Kasnije, Tarik je prišao Faisalu i pitao ga zašto se tako ponaša.

      "To je samo zabava", slegnu ramenima Faisal. "Osim toga, svi u mojoj grupi to rade."

      "Ali to ne znači da je ispravno", odgovorio je Tarik. "Sjeti se šta nas je Poslanik Muhammed ﷺ učio: 'Čovjek je na vjeri svog bliskog prijatelja, pa neka svako od vas pazi s kim se druži.'"

      Faisal je razmislio o tome, ali je nastavio sa svojim novim prijateljima. S vremenom, njegove ocjene su pale, a u zajednici je stekao reputaciju nepoštovanja.

      U međuvremenu, Tarik je izvrsno napredovao u školi i svi su ga voljeli zbog njegove spremnosti da pomogne. Najbolji zanatlija u gradu čak mu je ponudio da ga nauči svom zanatu nakon što je vidio Tarikov izvrstan karakter.

      Jednog dana, Faisal je upao u ozbiljne probleme kada su njegovi prijatelji oštetili imovinu komšije i pobjegli, ostavljajući ga da se sam suoči s posljedicama. Kada su mu roditelji došli, bili su duboko razočarani.

      Ovaj incident bio je buđenje za Faisala. Shvatio je da su ga prijatelji utjecali da postane neko ko nije želio biti. Izvinio se komšiji, nadoknadio štetu i počeo provoditi vrijeme s Tarikom i njegovim pozitivnim prijateljima.

      Postepeno, Faisalovo ponašanje se poboljšalo, ocjene su mu postale bolje i obnovio je svoju reputaciju u zajednici. Naučio je vrijednu lekciju da postajemo poput ljudi s kojima provodimo vrijeme, pa je važno izabrati prijatelje koji izvlače najbolje iz nas.
    `,
    bosnianMoralLesson: "Biraj prijatelje mudro, jer oni oblikuju ono što postaješ.",
    // Add German translations
    germanTitle: "Die Bedeutung guter Freunde",
    germanShortDescription: "Eine Geschichte über die kluge Wahl von Freunden und ihren Einfluss auf unseren Charakter.",
    germanFullText: `
      In einer geschäftigen Stadt lebten zwei Freunde, Tariq und Faisal. Sie waren im gleichen Alter und wuchsen in der gleichen Nachbarschaft auf, aber als sie ins Teenageralter kamen, begannen sie, Zeit mit verschiedenen Freundesgruppen zu verbringen.

      Tariq begann, mit einer Gruppe abzuhängen, die für ihre guten Manieren, ihren Lernfleiß und ihre Hilfsbereitschaft in der Gemeinschaft bekannt war. Jeden Tag nach der Schule halfen sie einander bei den Hausaufgaben, engagierten sich ehrenamtlich in der lokalen Moschee oder spielten Sport im Park.

      Faisal hingegen begann, Zeit mit Jungen zu verbringen, die oft die Schule schwänzten, unhöflich zu Älteren sprachen und den Nachbarn Streiche spielten. Anfangs schaute Faisal nur zu, ohne sich zu beteiligen, aber nach und nach begann er, sich an ihrem Verhalten zu beteiligen.

      Eines Tages half Tariq einem älteren Nachbarn beim Tragen von Lebensmitteln, als er sah, wie Faisal und seine Freunde Steine auf Bäume im Garten des älteren Mannes warfen und Früchte herunterwarfen. Als der alte Mann sie anrief, liefen sie lachend davon.

      Später ging Tariq auf Faisal zu und fragte ihn, warum er sich so verhalte.

      "Es ist nur zum Spaß", zuckte Faisal mit den Schultern. "Außerdem machen alle in meiner Gruppe das."

      "Aber das macht es nicht richtig", antwortete Tariq. "Erinnere dich, was der Prophet Muhammad ﷺ uns gelehrt hat: 'Ein Mensch folgt der Religion seines engen Freundes, also soll jeder von euch darauf achten, mit wem er sich anfreundet.'"

      Faisal dachte darüber nach, blieb aber bei seinen neuen Freunden. Mit der Zeit sanken seine Noten, und er erlangte in der Gemeinschaft einen Ruf für respektloses Verhalten.

      In der Zwischenzeit glänzte Tariq in der Schule und wurde von allen für seine hilfsbereite Art geliebt. Der beste Handwerker der Stadt bot ihm sogar an, ihm sein Handwerk beizubringen, nachdem er Tariqs ausgezeichneten Charakter gesehen hatte.

      Eines Tages geriet Faisal in ernsthafte Schwierigkeiten, als seine Freunde das Eigentum eines Nachbarn beschädigten und wegrannten, wobei sie ihn allein mit den Konsequenzen zurückließen. Als seine Eltern eintrafen, waren sie zutiefst enttäuscht.

      Dieser Vorfall war ein Weckruf für Faisal. Er erkannte, dass seine Freunde ihn beeinflusst hatten, jemand zu werden, der er nicht sein wollte. Er entschuldigte sich beim Nachbarn, machte den Schaden wieder gut und begann stattdessen, Zeit mit Tariq und seinen positiven Freunden zu verbringen.

      Nach und nach verbesserte sich Faisals Verhalten, seine Noten wurden besser, und er baute seinen Ruf in der Gemeinschaft wieder auf. Er lernte die wertvolle Lektion, dass wir wie die Menschen werden, mit denen wir Zeit verbringen, daher ist es wichtig, Freunde zu wählen, die das Beste in uns hervorbringen.
    `,
    germanMoralLesson: "Wähle deine Freunde weise, denn sie formen, wer du wirst.",
    // Add Italian translations
    italianTitle: "L'Importanza dei Buoni Amici",
    italianShortDescription: "Una storia sulla scelta saggia degli amici e la loro influenza sul nostro carattere.",
    italianFullText: `
      In una città vivace vivevano due amici, Tariq e Faisal. Avevano la stessa età ed erano cresciuti nello stesso quartiere, ma entrando nell'adolescenza, iniziarono a trascorrere tempo con gruppi di amici diversi.

      Tariq iniziò a frequentare un gruppo noto per le buone maniere, la dedizione allo studio e l'utilità nella comunità. Ogni giorno dopo la scuola, si aiutavano a vicenda con i compiti, facevano volontariato nella moschea locale o giocavano a sport nel parco.

      Faisal, invece, iniziò a trascorrere tempo con ragazzi che spesso saltavano la scuola, parlavano in modo sgarbato agli anziani e facevano scherzi ai vicini. All'inizio, Faisal guardava soltanto senza partecipare, ma gradualmente, iniziò a unirsi ai loro comportamenti.

      Un giorno, Tariq stava aiutando un anziano vicino a portare la spesa quando vide Faisal e i suoi amici lanciare pietre agli alberi nel giardino dell'anziano, facendo cadere la frutta. Quando il vecchio li chiamò, scapparono via ridendo.

      Più tardi, Tariq si avvicinò a Faisal e gli chiese perché si comportasse in quel modo.

      "È solo per divertimento", scrollò le spalle Faisal. "Inoltre, tutti nel mio gruppo lo fanno."

      "Ma questo non lo rende giusto", rispose Tariq. "Ricorda ciò che il Profeta Muhammad ﷺ ci ha insegnato: 'Una persona segue la religione del suo amico intimo, quindi ciascuno di voi faccia attenzione a chi frequenta.'"

      Faisal ci pensò ma continuò con i suoi nuovi amici. Col tempo, i suoi voti calarono, e sviluppò una reputazione nella comunità per essere irrispettoso.

      Nel frattempo, Tariq eccelleva a scuola ed era amato da tutti per la sua natura disponibile. Il miglior artigiano della città gli offrì persino di insegnargli il suo mestiere dopo aver visto l'eccellente carattere di Tariq.

      Un giorno, Faisal si cacciò in seri guai quando i suoi amici danneggiarono la proprietà di un vicino e scapparono, lasciandolo ad affrontare le conseguenze da solo. Quando arrivarono i suoi genitori, erano profondamente delusi.

      Questo incidente fu un campanello d'allarme per Faisal. Si rese conto che i suoi amici lo avevano influenzato a diventare qualcuno che non voleva essere. Si scusò con il vicino, riparò il danno e iniziò a trascorrere tempo con Tariq e i suoi amici positivi invece.

      Gradualmente, il comportamento di Faisal migliorò, i suoi voti aumentarono, e ricostruì la sua reputazione nella comunità. Imparò la preziosa lezione che diventiamo come le persone con cui trascorriamo il tempo, quindi è importante scegliere amici che tirino fuori il meglio di noi.
    `,
    italianMoralLesson: "Scegli i tuoi amici con saggezza, perché formano chi diventerai."
  }
];

// Story Card Component
const StoryCard: React.FC<{ story: Story, onReadMore: (id: number) => void }> = ({ story, onReadMore }) => {
  const { language } = useLanguage();
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={story.imageUrl} 
          alt={story.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={story.age === 'young' ? 'default' : 'secondary'}>
            {story.age === 'young' 
              ? (language === 'sq' ? 'Mosha 5-8' : 
                 language === 'bs' ? 'Uzrast 5-8' : 
                 language === 'de' ? 'Alter 5-8' : 
                 language === 'it' ? 'Età 5-8' : 
                 'Ages 5-8')
              : (language === 'sq' ? 'Mosha 9+' : 
                 language === 'bs' ? 'Uzrast 9+' : 
                 language === 'de' ? 'Alter 9+' : 
                 language === 'it' ? 'Età 9+' : 
                 'Ages 9+')}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">
          {language === 'sq' && story.albanianTitle 
            ? story.albanianTitle 
            : language === 'bs' && story.bosnianTitle
            ? story.bosnianTitle
            : language === 'de' && story.germanTitle
            ? story.germanTitle
            : language === 'it' && story.italianTitle
            ? story.italianTitle
            : story.title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {language === 'sq' && story.albanianShortDescription 
            ? story.albanianShortDescription 
            : language === 'bs' && story.bosnianShortDescription
            ? story.bosnianShortDescription
            : language === 'de' && story.germanShortDescription
            ? story.germanShortDescription
            : language === 'it' && story.italianShortDescription
            ? story.italianShortDescription
            : story.shortDescription}
        </CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full" 
          onClick={() => onReadMore(story.id)}
        >
          {language === 'sq' ? 'Lexo Tregimin' : 
            language === 'bs' ? 'Pročitaj priču' : 
            language === 'de' ? 'Geschichte lesen' : 
            language === 'it' ? 'Leggi la storia' : 
            'Read Story'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Stories() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Handle clicking on a story to view
  const handleReadMore = (id: number) => {
    const story = stories.find(s => s.id === id);
    if (story) {
      setSelectedStory(story);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Handle back button click
  const handleBack = () => {
    setSelectedStory(null);
  };
  
  // Filter stories based on active tab
  const filteredStories = activeTab === "all" 
    ? stories 
    : stories.filter(story => story.category === activeTab);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-sky-50">
      <header className="bg-gradient-to-r from-blue-600 to-sky-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="auto_stories" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">
            {language === 'sq' ? 'Tregime Islame' : 
             language === 'bs' ? 'Islamske priče' : 
             language === 'de' ? 'Islamische Geschichten' : 
             language === 'it' ? 'Storie Islamiche' : 
             'Islamic Stories'}
          </h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          {selectedStory ? (
            // Story detail view
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button 
                onClick={handleBack}
                className="flex items-center p-4 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Icon name="arrow_back" className="mr-2" />
                {language === 'sq' ? 'Kthehu te Tregimet' : 
                 language === 'bs' ? 'Nazad na Priče' : 
                 language === 'de' ? 'Zurück zu Geschichten' : 
                 language === 'it' ? 'Torna alle Storie' : 
                 'Back to Stories'}
              </button>
              
              <div className="overflow-hidden">
                <img 
                  src={selectedStory.imageUrl} 
                  alt={selectedStory.title} 
                  className="w-full mx-auto"
                  style={{ maxHeight: "500px", objectFit: "contain" }}
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {language === 'sq' && selectedStory.albanianTitle 
                    ? selectedStory.albanianTitle 
                    : language === 'bs' && selectedStory.bosnianTitle
                    ? selectedStory.bosnianTitle
                    : language === 'de' && selectedStory.germanTitle
                    ? selectedStory.germanTitle
                    : language === 'it' && selectedStory.italianTitle
                    ? selectedStory.italianTitle
                    : selectedStory.title}
                </h2>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline">
                    {selectedStory.category === 'prophets' 
                      ? (language === 'sq' ? 'Profetët' : 
                         language === 'bs' ? 'Poslanici' : 
                         language === 'de' ? 'Propheten' : 
                         language === 'it' ? 'Profeti' : 
                         'Prophets')
                      : selectedStory.category === 'companions' 
                      ? (language === 'sq' ? 'Sahabët' : 
                         language === 'bs' ? 'Ashabi' : 
                         language === 'de' ? 'Gefährten' : 
                         language === 'it' ? 'Compagni' : 
                         'Companions')
                      : selectedStory.category === 'lessons' 
                      ? (language === 'sq' ? 'Mësimet' : 
                         language === 'bs' ? 'Lekcije' : 
                         language === 'de' ? 'Lektionen' : 
                         language === 'it' ? 'Lezioni' : 
                         'Lessons')
                      : (language === 'sq' ? 'Vlerat' : 
                         language === 'bs' ? 'Vrijednosti' : 
                         language === 'de' ? 'Werte' : 
                         language === 'it' ? 'Valori' : 
                         'Values')}
                  </Badge>
                  <Badge variant={selectedStory.age === 'young' ? 'default' : 'secondary'}>
                    {selectedStory.age === 'young' 
                      ? (language === 'sq' ? 'Mosha 5-8' : 
                         language === 'bs' ? 'Uzrast 5-8' : 
                         language === 'de' ? 'Alter 5-8' : 
                         language === 'it' ? 'Età 5-8' : 
                         'Ages 5-8')
                      : (language === 'sq' ? 'Mosha 9+' : 
                         language === 'bs' ? 'Uzrast 9+' : 
                         language === 'de' ? 'Alter 9+' : 
                         language === 'it' ? 'Età 9+' : 
                         'Ages 9+')}
                  </Badge>
                </div>
                
                <div className="prose max-w-none">
                  {language === 'sq' && selectedStory.albanianFullText 
                    ? selectedStory.albanianFullText.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-4 ${paragraph.trim() === '' ? 'hidden' : ''}`}>
                          {paragraph.trim()}
                        </p>
                      ))
                    : language === 'bs' && selectedStory.bosnianFullText
                    ? selectedStory.bosnianFullText.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-4 ${paragraph.trim() === '' ? 'hidden' : ''}`}>
                          {paragraph.trim()}
                        </p>
                      ))
                    : language === 'de' && selectedStory.germanFullText
                    ? selectedStory.germanFullText.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-4 ${paragraph.trim() === '' ? 'hidden' : ''}`}>
                          {paragraph.trim()}
                        </p>
                      ))
                    : language === 'it' && selectedStory.italianFullText
                    ? selectedStory.italianFullText.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-4 ${paragraph.trim() === '' ? 'hidden' : ''}`}>
                          {paragraph.trim()}
                        </p>
                      ))
                    : selectedStory.fullText.split('\n').map((paragraph, idx) => (
                        <p key={idx} className={`mb-4 ${paragraph.trim() === '' ? 'hidden' : ''}`}>
                          {paragraph.trim()}
                        </p>
                      ))}
                </div>
                
                <Separator className="my-6" />
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    {language === 'sq' ? 'Morali i Tregimit' : 
                     language === 'bs' ? 'Pouka priče' : 
                     language === 'de' ? 'Moral der Geschichte' : 
                     language === 'it' ? 'Morale della Storia' : 
                     'Moral of the Story'}
                  </h3>
                  <p className="text-blue-700">
                    {language === 'sq' && selectedStory.albanianMoralLesson 
                      ? selectedStory.albanianMoralLesson 
                      : language === 'bs' && selectedStory.bosnianMoralLesson
                      ? selectedStory.bosnianMoralLesson
                      : language === 'de' && selectedStory.germanMoralLesson
                      ? selectedStory.germanMoralLesson
                      : language === 'it' && selectedStory.italianMoralLesson
                      ? selectedStory.italianMoralLesson
                      : selectedStory.moralLesson}
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">
                    {language === 'sq' ? 'Pyetje për Diskutim' : 
                     language === 'bs' ? 'Pitanja za diskusiju' : 
                     language === 'de' ? 'Diskussionsfragen' : 
                     language === 'it' ? 'Domande di discussione' : 
                     'Discussion Questions'}
                  </h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        {language === 'sq' ? 'Cila është mësimi kryesor nga ky tregim?' : 
                         language === 'bs' ? 'Koja je glavna pouka ove priče?' : 
                         language === 'de' ? 'Was ist die wichtigste Lektion aus dieser Geschichte?' : 
                         language === 'it' ? 'Qual è la lezione principale di questa storia?' : 
                         'What is the main lesson from this story?'}
                      </AccordionTrigger>
                      <AccordionContent>
                        {language === 'sq' 
                          ? 'Mendoni për mënyrën se si personazhet morën vendime dhe pasojat që patën këto vendime. Çfarë na mëson tregimi për karakterin e mirë?'
                          : language === 'bs'
                          ? 'Razmislite o tome kako su likovi donosili odluke i kakve su posljedice te odluke imale. Što nas priča uči o dobrom karakteru?'
                          : language === 'it'
                          ? 'Pensa a come i personaggi hanno preso decisioni e quali conseguenze hanno avuto queste decisioni. Cosa ci insegna la storia sul buon carattere?'
                          : 'Think about how the characters made decisions and what consequences those decisions had. What does the story teach us about good character?'
                        }
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        {language === 'sq' ? 'Si mund ta zbatojmë këtë mësim në jetën e përditshme?' : 
                         language === 'bs' ? 'Kako možemo primijeniti ovu lekciju u svakodnevnom životu?' : 
                         language === 'de' ? 'Wie können wir diese Lektion in unserem Alltag anwenden?' : 
                         language === 'it' ? 'Come possiamo applicare questa lezione nella vita quotidiana?' : 
                         'How can we apply this lesson in our daily life?'}
                      </AccordionTrigger>
                      <AccordionContent>
                        {language === 'sq'
                          ? 'Mendoni për situata në shtëpi, shkollë, ose me miqtë ku mund të praktikoni vlerat e treguara në këtë tregim.'
                          : language === 'bs'
                          ? 'Razmislite o situacijama kod kuće, u školi ili s prijateljima gdje možete prakticirati vrijednosti prikazane u ovoj priči.'
                          : language === 'it'
                          ? 'Considera situazioni a casa, a scuola o con gli amici dove puoi mettere in pratica i valori mostrati in questa storia.'
                          : 'Consider situations at home, school, or with friends where you can practice the values shown in this story.'
                        }
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        {language === 'sq' ? 'Cilat vlera kuranore demonstrohen në këtë tregim?' : 
                         language === 'bs' ? 'Koje kuranke vrijednosti su prikazane u ovoj priči?' : 
                         language === 'de' ? 'Welche Koranwerte werden in dieser Geschichte demonstriert?' : 
                         language === 'it' ? 'Quali valori coranici sono dimostrati in questa storia?' : 
                         'What Quranic values are demonstrated in this story?'}
                      </AccordionTrigger>
                      <AccordionContent>
                        {language === 'sq'
                          ? 'Kurani na mëson shumë vlera si ndershmëria, durimi, mirësia dhe falënderimi. Cilat nga këto vlera shihni në këtë tregim?'
                          : language === 'bs'
                          ? 'Kuran nas uči mnoge vrijednosti poput iskrenosti, strpljenja, ljubaznosti i zahvalnosti. Koje od ovih vrijednosti vidite u ovoj priči?'
                          : language === 'it'
                          ? 'Il Corano ci insegna molti valori come onestà, pazienza, gentilezza e gratitudine. Quali di questi valori vedi in questa storia?'
                          : 'The Quran teaches us many values like honesty, patience, kindness, and gratitude. Which of these values do you see in this story?'
                        }
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            // Stories list view
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {language === 'sq' ? 'Tregime Islame për Fëmijë' : 
                   language === 'bs' ? 'Islamske priče za djecu' : 
                   language === 'de' ? 'Islamische Geschichten für Kinder' : 
                   language === 'it' ? 'Storie Islamiche per Bambini' : 
                   'Islamic Stories for Children'}
                </h2>
                <p className="text-gray-600">
                  {language === 'sq' 
                    ? 'Hulumtoni këto tregime të bukura që mësojnë mësime të vlefshme islame në një mënyrë tërheqëse. Perfekte për t\'i lexuar së bashku me fëmijët tuaj.'
                    : language === 'bs'
                    ? 'Istražite ove predivne priče koje podučavaju vrijedne islamske lekcije na zanimljiv način. Savršene za čitanje zajedno s vašom djecom.'
                    : language === 'de'
                    ? 'Entdecken Sie diese schönen Geschichten, die wertvolle islamische Lektionen auf ansprechende Weise vermitteln. Perfekt zum gemeinsamen Lesen mit Ihren Kindern.'
                    : language === 'it'
                    ? 'Esplora queste bellissime storie che insegnano preziose lezioni islamiche in modo coinvolgente. Perfette da leggere insieme ai tuoi bambini.'
                    : 'Explore these beautiful stories that teach valuable Islamic lessons in an engaging way. Perfect for reading together with your children.'
                  }
                </p>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid grid-cols-4 w-full sm:w-auto sm:inline-flex">
                  <TabsTrigger value="all">
                    {language === 'sq' ? 'Të Gjitha Tregimet' : 
                     language === 'bs' ? 'Sve priče' : 
                     language === 'de' ? 'Alle Geschichten' : 
                     language === 'it' ? 'Tutte le storie' : 
                     'All Stories'}
                  </TabsTrigger>
                  <TabsTrigger value="prophets">
                    {language === 'sq' ? 'Profetët' : 
                     language === 'bs' ? 'Poslanici' : 
                     language === 'de' ? 'Propheten' : 
                     language === 'it' ? 'Profeti' : 
                     'Prophets'}
                  </TabsTrigger>
                  <TabsTrigger value="companions">
                    {language === 'sq' ? 'Sahabët' : 
                     language === 'bs' ? 'Ashabi' : 
                     language === 'de' ? 'Gefährten' : 
                     language === 'it' ? 'Compagni' : 
                     'Companions'}
                  </TabsTrigger>
                  <TabsTrigger value="values">
                    {language === 'sq' ? 'Vlerat' : 
                     language === 'bs' ? 'Vrijednosti' : 
                     language === 'de' ? 'Werte' : 
                     language === 'it' ? 'Valori' : 
                     'Values'}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map(story => (
                  <StoryCard 
                    key={story.id} 
                    story={story} 
                    onReadMore={handleReadMore} 
                  />
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-white rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'sq' ? 'Përfitimet e Tregimeve Islame' : 
                   language === 'bs' ? 'Koristi islamskih priča' : 
                   language === 'de' ? 'Vorteile islamischer Geschichten' : 
                   language === 'it' ? 'Benefici delle storie islamiche' : 
                   'Benefits of Islamic Stories'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Icon name="check_circle" className="text-green-500 mr-2 mt-1" />
                    <span>
                      {language === 'sq' 
                        ? 'Mëson vlerat dhe karakterin islam në një mënyrë të paharrueshme' 
                        : language === 'bs'
                        ? 'Podučava islamske vrijednosti i karakter na nezaboravan način'
                        : language === 'de'
                        ? 'Vermittelt islamische Werte und Charakter auf einprägsame Weise'
                        : language === 'it'
                        ? 'Insegna valori e carattere islamici in modo memorabile'
                        : 'Teaches Islamic values and character in a memorable way'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check_circle" className="text-green-500 mr-2 mt-1" />
                    <span>
                      {language === 'sq' 
                        ? 'Lidh fëmijët me historinë dhe traditat islame' 
                        : language === 'bs'
                        ? 'Povezuje djecu s islamskom historijom i tradicijama'
                        : language === 'de'
                        ? 'Verbindet Kinder mit islamischer Geschichte und Traditionen'
                        : language === 'it'
                        ? 'Collega i bambini alla storia e alle tradizioni islamiche'
                        : 'Connects children with Islamic history and traditions'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check_circle" className="text-green-500 mr-2 mt-1" />
                    <span>
                      {language === 'sq' 
                        ? 'Ofron modele për fëmijët për të aspiruar' 
                        : language === 'bs'
                        ? 'Pruža uzore kojima djeca mogu težiti'
                        : language === 'de'
                        ? 'Bietet Vorbilder, zu denen Kinder aufschauen können'
                        : language === 'it'
                        ? 'Fornisce modelli di ruolo a cui i bambini possono aspirare'
                        : 'Provides role models for children to aspire to'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="check_circle" className="text-green-500 mr-2 mt-1" />
                    <span>
                      {language === 'sq' 
                        ? 'Krijon kohë lidhjeje familjare përmes leximit të përbashkët' 
                        : language === 'bs'
                        ? 'Stvara vrijeme za porodično povezivanje kroz zajedničko čitanje'
                        : language === 'de'
                        ? 'Schafft Zeit für familiäre Bindung durch gemeinsames Lesen'
                        : language === 'it'
                        ? 'Crea momenti di legame familiare attraverso la lettura condivisa'
                        : 'Creates family bonding time through shared reading'}
                    </span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>

      <Navbar />
    </div>
  );
}