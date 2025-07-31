import React, { useState } from 'react';
import { Icon } from '@/components/ui/icons';
import { useUserContext } from '@/context/user-context';
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
};

// Define content for ablution (wudu)
const ablutionSteps: Step[] = [
  {
    id: 1,
    title: "Intention (Niyyah)",
    description: "Begin with the intention to perform wudu for prayer.",
    imageUrl: "https://i.pinimg.com/564x/d6/c9/8e/d6c98e30ea9f2ede3d20a4a15a8d9b4a.jpg"
  },
  {
    id: 2,
    title: "Saying 'Bismillah'",
    description: "Say 'Bismillah' (In the name of Allah) before starting.",
    imageUrl: "https://i.pinimg.com/564x/a5/1e/38/a51e38d6e4bd53a32e8f6d3d04d9b9af.jpg"
  },
  {
    id: 3,
    title: "Washing Hands",
    description: "Wash both hands up to the wrists three times, making sure water reaches between the fingers.",
    imageUrl: "https://i.pinimg.com/564x/95/87/80/958780b02e9508fc5a6ab4fed21e7dbf.jpg"
  },
  {
    id: 4,
    title: "Rinsing the Mouth",
    description: "Take water into the mouth and rinse it thoroughly three times.",
    imageUrl: "https://i.pinimg.com/564x/dd/bc/ac/ddbcac75fa06a3c2a9da04c880a9e515.jpg"
  },
  {
    id: 5,
    title: "Sniffing Water into the Nose",
    description: "Sniff water into the nostrils and blow it out three times.",
    imageUrl: "https://i.pinimg.com/564x/6d/8e/40/6d8e4031ad816df8bd72b8f5ecfb7f2f.jpg"
  },
  {
    id: 6,
    title: "Washing the Face",
    description: "Wash the entire face from forehead to chin and ear to ear three times.",
    imageUrl: "https://i.pinimg.com/564x/2b/ba/72/2bba7285e85d7df2762e9c12baf7d9d3.jpg"
  },
  {
    id: 7,
    title: "Washing the Arms",
    description: "Wash both arms from the wrists to the elbows three times, starting with the right arm.",
    imageUrl: "https://i.pinimg.com/564x/b6/77/f5/b677f51e18150ae72c9e8cea6a84d9d2.jpg"
  },
  {
    id: 8,
    title: "Wiping the Head",
    description: "Wet the hands and wipe over the head from front to back once.",
    imageUrl: "https://i.pinimg.com/564x/a1/9f/c0/a19fc0196c1a57c8e7edd49c1e3e7ab5.jpg"
  },
  {
    id: 9,
    title: "Wiping the Ears",
    description: "Using the same water, wipe both ears inside and outside once.",
    imageUrl: "https://i.pinimg.com/564x/d9/c3/3d/d9c33d8e536ee65faf48e7f7d2290ba6.jpg"
  },
  {
    id: 10,
    title: "Washing the Feet",
    description: "Wash both feet up to the ankles three times, starting with the right foot.",
    imageUrl: "https://i.pinimg.com/564x/b7/30/ea/b730ea0a1bbf5bed6fe0ba6f427e20c0.jpg"
  }
];

// Define content for the five pillars of Islam
const fivePillarsData: Section[] = [
  {
    id: "shahada",
    title: "Shahada (Faith)",
    description: "The declaration of faith and the most important pillar of Islam.",
    imageUrl: "https://i.pinimg.com/564x/f5/c5/08/f5c508a4f1a4f5b0cb0fd6c4f44bad25.jpg",
    content: `The Shahada is the Muslim declaration of faith: "La ilaha illa Allah, Muhammad rasul Allah" (There is no god but Allah, and Muhammad is the messenger of Allah).

When a person recites this with conviction, they become a Muslim. This declaration confirms the belief in the oneness of Allah (Tawhid) and acknowledges Prophet Muhammad ﷺ as His final messenger.

The Shahada is also the first thing whispered into a newborn baby's ear and ideally the last words a Muslim says before death. It is repeated in every prayer and in the call to prayer (adhan).

For children learning about Islam, understanding the Shahada means recognizing:
- Allah is the only One worthy of worship
- Prophet Muhammad ﷺ is our guide who shows us how to live according to Allah's guidance
- This simple declaration connects all Muslims around the world as one community`
  },
  {
    id: "salah",
    title: "Salah (Prayer)",
    description: "The five daily prayers that connect Muslims with Allah.",
    imageUrl: "https://i.pinimg.com/564x/e3/90/16/e39016216e98abfa5c23d81489dc53e3.jpg",
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

Children typically begin learning prayers around age seven, practicing the movements and short surahs, gradually building their knowledge and understanding.`
  },
  {
    id: "zakat",
    title: "Zakat (Charity)",
    description: "Giving a portion of one's wealth to those in need.",
    imageUrl: "https://i.pinimg.com/564x/91/a5/f1/91a5f1f0b1a626f6eb5da3ecfaa07e0a.jpg",
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

Children can learn about Zakat by participating in charity activities, donating from their allowance or gifts, and understanding that sharing wealth is an act of worship that pleases Allah.`
  },
  {
    id: "sawm",
    title: "Sawm (Fasting)",
    description: "Fasting during the month of Ramadan.",
    imageUrl: "https://i.pinimg.com/564x/64/d3/cb/64d3cb3d1bf7afca4d5f0f1c1b3c56b5.jpg",
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

During Ramadan, Muslims also increase other acts of worship such as reading the Quran, giving charity, and performing extra prayers (Taraweeh).`
  },
  {
    id: "hajj",
    title: "Hajj (Pilgrimage)",
    description: "The pilgrimage to Makkah that Muslims must complete once in their lifetime if able.",
    imageUrl: "https://i.pinimg.com/564x/c9/37/bf/c937bf95cd4b3acb6252ada69899f0c8.jpg",
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

For children, learning about Hajj builds excitement about potentially making this sacred journey when they're older. They can learn about the rituals through stories and activities that explain the significance of each step.`
  }
];

// Define content for Islamic beliefs
const islamicBeliefsData: Section[] = [
  {
    id: "allah",
    title: "Belief in Allah",
    description: "Believing in the Oneness of Allah (Tawhid).",
    imageUrl: "https://i.pinimg.com/564x/5e/17/e4/5e17e474c9cd77e4b41e6a689bc24c95.jpg",
    content: `Belief in Allah is the foundation of Islamic faith. Key aspects include:

1. Allah is One (Tawhid) - The most fundamental belief in Islam is that there is only one God, Allah, who has no partners, children, or equals.

2. Allah's Attributes - Allah has 99 beautiful names that describe His attributes, such as The Most Merciful (Ar-Rahman), The All-Knowing (Al-Alim), and The Creator (Al-Khaliq).

3. Allah as Creator - Allah created everything in the universe - every planet, star, animal, plant, and human being.

4. Allah's Sovereignty - Everything happens by Allah's will and permission. He is in control of all affairs.

5. Allah's Mercy and Justice - Allah is both infinitely merciful and perfectly just. He forgives those who sincerely repent and holds accountable those who persist in wrongdoing.

6. Direct Relationship - In Islam, humans have a direct relationship with Allah without intermediaries. We can pray directly to Him for guidance, forgiveness, and blessings.

7. Allah's Nearness - As the Quran states, Allah is closer to us than our jugular vein. He knows our thoughts, intentions, and needs before we express them.

Teaching children about Allah often focuses on His loving and caring attributes, helping them understand that Allah watches over them, loves them when they do good, and is always ready to forgive them when they make mistakes and sincerely regret them.`
  },
  {
    id: "angels",
    title: "Belief in Angels",
    description: "Believing in Allah's angels who are created from light.",
    imageUrl: "https://i.pinimg.com/564x/42/dc/87/42dc874e31a7ef7c56a736a39e10b8bd.jpg",
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

For children, learning about angels helps them understand that they are never truly alone. The recording angels in particular encourage children to be mindful of their actions and words.`
  },
  {
    id: "books",
    title: "Belief in Divine Books",
    description: "Believing in the holy books sent by Allah to His messengers.",
    imageUrl: "https://i.pinimg.com/564x/1a/22/44/1a2244f15b4c1bb7812b73c13d4ae61f.jpg",
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

For children, learning about divine books helps them understand the continuity of Allah's guidance throughout history and the special importance of the Quran as the preserved final revelation.`
  },
  {
    id: "prophets",
    title: "Belief in Prophets",
    description: "Believing in all the prophets sent by Allah to guide humanity.",
    imageUrl: "https://i.pinimg.com/564x/4a/d8/3c/4ad83c4d53afa800bb73a09ae67ae8ce.jpg",
    content: `Muslims believe that Allah sent thousands of prophets throughout history to guide humanity. Each prophet brought the same essential message: to worship Allah alone and live according to His guidance.

Some of the major prophets mentioned in the Quran include:

1. Adam - The first human and prophet
2. Nuh (Noah) - Called people to worship Allah for 950 years; built the ark during the flood
3. Ibrahim (Abraham) - Known as the "Friend of Allah" and father of many prophets
4. Lut (Lot) - Preached against immoral practices
5. Ismail (Ishmael) - Son of Ibrahim who helped rebuild the Kaaba
6. Ishaq (Isaac) - Son of Ibrahim and ancestor of many prophets
7. Yaqub (Jacob) - Son of Ishaq and father of Yusuf
8. Yusuf (Joseph) - Known for his patience and forgiving nature
9. Musa (Moses) - Received the Torah and led the Israelites out of Egypt
10. Dawud (David) - Received the Zabur (Psalms) and was a just king
11. Sulaiman (Solomon) - Known for his wisdom and ability to communicate with animals
12. Ayyub (Job) - Known for his patience during trials
13. Yunus (Jonah) - Was swallowed by a whale and then saved by Allah's mercy
14. Zakariyya (Zechariah) - Father of Yahya
15. Yahya (John the Baptist) - Contemporary of Isa who prepared the way for his message
16. Isa (Jesus) - Born miraculously to Maryam (Mary), performed miracles, and will return before the Day of Judgment
17. Muhammad ﷺ - The final prophet and mercy to all worlds

Muslims must believe in all prophets without distinction, though Muhammad ﷺ holds a special position as the final messenger whose guidance is for all humanity until the end of time.

Prophets were the best of humanity, chosen for their excellent character. They led by example and faced great challenges with patience and faith. They were protected from committing major sins but were still human beings, not divine.

For children, learning about the prophets provides them with ideal role models who demonstrated courage, honesty, patience, and submission to Allah in different circumstances.`
  },
  {
    id: "day-judgment",
    title: "Belief in the Day of Judgment",
    description: "Believing in the Day of Judgment when all will be held accountable.",
    imageUrl: "https://i.pinimg.com/564x/bf/67/b4/bf67b4b3e642f1f1b2eb1c8a74f05d0f.jpg",
    content: `The Day of Judgment (Yawm al-Qiyamah) is when all people will be resurrected and held accountable for their actions in this life. Key aspects include:

1. The End of the World - The Day of Judgment will begin with the blowing of the trumpet by the angel Israfil, causing all creatures to die. When the trumpet is blown a second time, all humans will be resurrected.

2. Resurrection - Allah will resurrect all human beings who ever lived, giving them new bodies. People will rise from their graves to stand before Allah for judgment.

3. The Judgment - Each person will be given their book of deeds. Those who receive their book in their right hand will be successful, while those who receive it in their left hand will face consequences for their wrongdoing.

4. The Scale (Mizan) - Allah will weigh everyone's good and bad deeds on a scale of absolute justice.

5. The Bridge (Sirat) - Everyone must cross a bridge over Hellfire. The righteous will cross quickly and safely, while the sinful will struggle or fall based on their deeds.

6. Paradise and Hellfire - The final destinations based on one's faith and deeds. Paradise (Jannah) is a place of eternal bliss and reward for the believers, while Hellfire (Jahannam) is a place of punishment for disbelievers and serious sinners (though many sinful believers may eventually enter Paradise after purification).

The belief in the Day of Judgment encourages:
- Accountability for one's actions
- Striving to do good and avoid evil
- Hope in Allah's mercy and justice
- Recognition that this world is temporary
- Patience during hardship, knowing that ultimate justice will be established

For children, this belief is often taught with emphasis on Allah's mercy and forgiveness, and the beautiful rewards of Paradise for those who try their best to be good.`
  },
  {
    id: "qadar",
    title: "Belief in Divine Decree",
    description: "Believing in Allah's complete knowledge and control over all things (Qadar).",
    imageUrl: "https://i.pinimg.com/564x/66/f2/0f/66f20f36c82e1f7cf6cee5da8bb64929.jpg",
    content: `Belief in Qadar (Divine Decree) means accepting that Allah has complete knowledge and control over all things. This includes:

1. Allah's Complete Knowledge - Allah knows everything that has happened, is happening, and will happen in the universe. Nothing is hidden from His knowledge.

2. Pre-Recording - All events that will happen until the Day of Judgment are already recorded in the "Preserved Tablet" (Al-Lawh Al-Mahfuz).

3. Allah's Will - Nothing happens except by Allah's permission. If Allah wills something to happen, it will happen; if He does not will it, it cannot happen.

4. Creation - Allah is the Creator of everything, including human actions. However, humans make real choices that have consequences.

5. Human Free Will - Despite Allah's foreknowledge, humans have free will and genuinely choose their actions. Allah knows what we will choose before we choose it, but does not force us to make those choices.

Belief in Qadar helps Muslims:
- Trust in Allah's wisdom and plan, even during difficult times
- Reduce anxiety about the future, knowing Allah is in control
- Take responsibility for their choices while recognizing their limitations
- Avoid both fatalism (giving up responsibility) and arrogance (thinking they control everything)
- Balance effort with reliance on Allah (making a genuine effort while trusting in Allah's decree)

The Prophet Muhammad ﷺ explained this balance by telling a man who asked whether he should tie his camel or trust in Allah: "Tie your camel and then trust in Allah."

For children, Qadar is often explained through simple stories that show how Allah has a plan for everyone, knows what is best, and is always in control even when things seem difficult.`
  }
];

export default function Ilmihal() {
  const { user } = useUserContext();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("wudu");
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-sky-50">
      <header className="bg-gradient-to-r from-green-600 to-teal-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Icon name="school" className="text-3xl mr-2" />
          <h1 className="text-lg font-bold">ILMIHAL</h1>
        </div>
        {user && <ProfileBadge points={user.points} />}
      </header>

      <main className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="wudu" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid grid-cols-2 w-full mb-4">
              <TabsTrigger value="wudu">Ablution Guide</TabsTrigger>
              <TabsTrigger value="pillars">Islamic Teachings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="wudu" className="space-y-6">
              <div className="rounded-xl bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-2">How to Perform Wudu (Ablution)</h2>
                <p className="text-gray-600 mb-6">
                  Wudu is the Islamic procedure for cleansing parts of the body before prayer. Follow these simple steps to learn how to perform wudu correctly.
                </p>
                
                <Carousel className="w-full">
                  <CarouselContent>
                    {ablutionSteps.map((step) => (
                      <CarouselItem key={step.id} className="md:basis-1/2 lg:basis-1/3">
                        <Card className="h-full">
                          <div className="h-48 overflow-hidden rounded-t-lg">
                            <img 
                              src={step.imageUrl} 
                              alt={step.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-lg font-bold flex items-center">
                              <Badge className="mr-2 bg-green-600">{step.id}</Badge>
                              {step.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-gray-600">{step.description}</p>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="hidden sm:flex">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
                
                <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-semibold text-green-800 mb-2">Important notes about Wudu:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="check_circle" className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Wudu is required before each prayer, unless you have maintained your state of purity since the last wudu.</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="check_circle" className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Wudu is broken by natural bodily functions, sleeping, or losing consciousness.</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="check_circle" className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>After completing wudu, it's recommended to recite the shahada: "Ash-hadu an la ilaha illa Allah, wa ash-hadu anna Muhammadan rasulullah."</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="check_circle" className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Wudu should be performed with clean water and in a clean place.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Dry Ablution (Tayammum)</CardTitle>
                  <CardDescription>
                    When water is not available or its use might cause harm (like during illness), 
                    tayammum (dry ablution) can be performed instead.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Steps of Tayammum:</h4>
                      <ol className="list-decimal pl-5 space-y-2">
                        <li>Make the intention for tayammum.</li>
                        <li>Say "Bismillah" (In the name of Allah).</li>
                        <li>Strike both hands on clean earth, dust, or sand.</li>
                        <li>Blow off excess dust.</li>
                        <li>Wipe the face with the palms.</li>
                        <li>Wipe the right arm with the left hand and the left arm with the right hand up to the elbows.</li>
                      </ol>
                    </div>
                    <div className="flex justify-center items-center">
                      <img 
                        src="https://i.pinimg.com/564x/09/ab/79/09ab795fd1b0be176504965b9ab70c86.jpg" 
                        alt="Tayammum procedure" 
                        className="max-h-48 rounded-lg"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pillars" className="space-y-6">
              <div className="mb-6">
                <Tabs defaultValue="pillars" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="pillars">Five Pillars</TabsTrigger>
                    <TabsTrigger value="beliefs">Six Beliefs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pillars" className="mt-4">
                    <div className="space-y-6">
                      {fivePillarsData.map((pillar) => (
                        <Card key={pillar.id} className="overflow-hidden">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="h-full overflow-hidden">
                              <img 
                                src={pillar.imageUrl} 
                                alt={pillar.title} 
                                className="w-full h-full object-cover md:h-64"
                              />
                            </div>
                            <div className="p-6 md:col-span-2">
                              <h3 className="text-xl font-bold text-green-800 mb-2">{pillar.title}</h3>
                              <p className="text-gray-600 mb-3">{pillar.description}</p>
                              <div className="prose max-w-none text-gray-700">
                                {pillar.content?.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx} className="mb-3">{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="beliefs" className="mt-4">
                    <div className="space-y-6">
                      {islamicBeliefsData.map((belief) => (
                        <Card key={belief.id} className="overflow-hidden">
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="h-full overflow-hidden">
                              <img 
                                src={belief.imageUrl} 
                                alt={belief.title} 
                                className="w-full h-full object-cover md:h-64"
                              />
                            </div>
                            <div className="p-6 md:col-span-2">
                              <h3 className="text-xl font-bold text-green-800 mb-2">{belief.title}</h3>
                              <p className="text-gray-600 mb-3">{belief.description}</p>
                              <div className="prose max-w-none text-gray-700">
                                {belief.content?.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx} className="mb-3">{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Navbar />
    </div>
  );
}