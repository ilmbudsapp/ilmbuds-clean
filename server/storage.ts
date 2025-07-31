import { 
  users, type User, type InsertUser,
  categories, type Category, type InsertCategory,
  quizzes, type Quiz, type InsertQuiz,
  questions, type Question, type InsertQuestion,
  userProgress, type UserProgress, type InsertUserProgress,
  parentChildRelationships, type ParentChildRelationship, type InsertParentChildRelationship,
  quranSurahs, type QuranSurah, type InsertQuranSurah,
  quranVerses, type QuranVerse, type InsertQuranVerse,
  quranTranslations, type QuranTranslation, type InsertQuranTranslation,
  userSurahProgress, type UserSurahProgress, type InsertUserSurahProgress,
  UserRole, Difficulty, MemorizationLevel
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsersByRole(role: UserRole): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(userId: number, points: number): Promise<User | undefined>;
  addUserBadge(userId: number, badge: string): Promise<User | undefined>;
  updateUserProfile(userId: number, userData: Partial<User>): Promise<User | undefined>;
  
  // Parent-Child relationship operations
  getChildrenByParentId(parentId: number): Promise<User[]>;
  getParentsByChildId(childId: number): Promise<User[]>;
  linkParentToChild(parentId: number, childId: number): Promise<ParentChildRelationship>;
  unlinkParentFromChild(parentId: number, childId: number): Promise<boolean>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Quiz operations
  getQuizzes(): Promise<Quiz[]>;
  getQuizzesByCategoryId(categoryId: number): Promise<Quiz[]>;
  getQuizById(id: number): Promise<Quiz | undefined>;
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  
  // Question operations
  getQuestionsByQuizId(quizId: number): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | undefined>;
  createQuestion(question: InsertQuestion): Promise<Question>;
  
  // User Progress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByQuizId(userId: number, quizId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress | undefined>;
  getChildrenProgressSummary(childrenIds: number[]): Promise<Record<number, {
    totalQuizzes: number;
    completedQuizzes: number;
    averageScore: number;
    totalPoints: number;
    recentActivity: UserProgress[];
  }>>;
  
  // Quran operations
  getQuranSurahs(): Promise<QuranSurah[]>;
  getQuranSurahById(id: number): Promise<QuranSurah | undefined>;
  createQuranSurah(surah: InsertQuranSurah): Promise<QuranSurah>;
  
  getQuranVersesBySurahId(surahId: number): Promise<QuranVerse[]>;
  getQuranVerseById(id: number): Promise<QuranVerse | undefined>;
  createQuranVerse(verse: InsertQuranVerse): Promise<QuranVerse>;
  
  getQuranTranslationsByVerseId(verseId: number, language?: string): Promise<QuranTranslation[]>; 
  getQuranTranslationById(id: number): Promise<QuranTranslation | undefined>;
  createQuranTranslation(translation: InsertQuranTranslation): Promise<QuranTranslation>;
  
  getUserSurahProgress(userId: number): Promise<UserSurahProgress[]>;
  getUserSurahProgressBySurahId(userId: number, surahId: number): Promise<UserSurahProgress | undefined>;
  createUserSurahProgress(progress: InsertUserSurahProgress): Promise<UserSurahProgress>;
  updateUserSurahProgress(id: number, progress: Partial<UserSurahProgress>): Promise<UserSurahProgress | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private quizzes: Map<number, Quiz>;
  private questions: Map<number, Question>;
  private userProgress: Map<number, UserProgress>;
  private parentChildRelationships: Map<number, ParentChildRelationship>;
  
  // Quran related storage
  private quranSurahs: Map<number, QuranSurah>;
  private quranVerses: Map<number, QuranVerse>;
  private quranTranslations: Map<number, QuranTranslation>;
  private userSurahProgress: Map<number, UserSurahProgress>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentQuizId: number;
  private currentQuestionId: number;
  private currentProgressId: number;
  private currentRelationshipId: number;
  private currentSurahId: number;
  private currentVerseId: number;
  private currentTranslationId: number;
  private currentSurahProgressId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.quizzes = new Map();
    this.questions = new Map();
    this.userProgress = new Map();
    this.parentChildRelationships = new Map();
    
    // Initialize Quran related maps
    this.quranSurahs = new Map();
    this.quranVerses = new Map();
    this.quranTranslations = new Map();
    this.userSurahProgress = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentQuizId = 1;
    this.currentQuestionId = 1;
    this.currentProgressId = 1;
    this.currentRelationshipId = 1;
    this.currentSurahId = 1;
    this.currentVerseId = 1;
    this.currentTranslationId = 1;
    this.currentSurahProgressId = 1;
    
    // Initialize with default categories and quizzes
    this.initializeData().catch((err: Error) => {
      console.error('Failed to initialize data:', err);
    });
  }
  
  // Helper methods for translations
  private getEnglishTranslation(verseNumber: number, surahNumber: number): string {
    // Al-Fatiha (surah 1) translations
    if (surahNumber === 1) {
      switch (verseNumber) {
        case 1: return "In the name of Allah, the Most Compassionate, the Most Merciful.";
        case 2: return "All praise is for Allah, Lord of all worlds,";
        case 3: return "the Most Compassionate, the Most Merciful,";
        case 4: return "Master of the Day of Judgment.";
        case 5: return "You alone we worship and You alone we ask for help.";
        case 6: return "Guide us along the Straight Path,";
        case 7: return "the Path of those You have blessed, not those You are displeased with, or those who are astray.";
        default: return "";
      }
    }
    // Al-Ikhlas (surah 112) translations
    else if (surahNumber === 112) {
      switch (verseNumber) {
        case 1: return "Say, O Prophet, He is Allah, One and Indivisible.";
        case 2: return "Allah, the Sustainer needed by all.";
        case 3: return "He has never had offspring, nor was He born.";
        case 4: return "And there is none comparable to Him.";
        default: return "";
      }
    }
    // Al-Falaq (surah 113) translations
    else if (surahNumber === 113) {
      switch (verseNumber) {
        case 1: return "Say, O Prophet, I seek refuge in the Lord of the daybreak";
        case 2: return "from the evil of what He has created,";
        case 3: return "and from the evil of the night when it grows dark,";
        case 4: return "and from the evil of those who practice witchcraft when they blow into knots,";
        case 5: return "and from the evil of the envier when they envy.";
        default: return "";
      }
    }
    
    return "";
  }
  
  private getBosnianTranslation(verseNumber: number, surahNumber: number): string {
    // Al-Fatiha (surah 1) translations
    if (surahNumber === 1) {
      switch (verseNumber) {
        case 1: return "U ime Allaha, Milostivog, Samilosnog!";
        case 2: return "Tebe, Allaha, Gospodara svjetova, hvalimo,";
        case 3: return "Milostivog, Samilosnog,";
        case 4: return "Vladara Dana sudnjeg,";
        case 5: return "Tebi se klanjamo i od Tebe pomoć tražimo!";
        case 6: return "Uputi nas na Pravi put,";
        case 7: return "na Put onih kojima si milost Svoju darovao, a ne onih koji su protiv sebe srdžbu izazvali, niti onih koji su zalutali!";
        default: return "";
      }
    }
    // Al-Ikhlas (surah 112) translations
    else if (surahNumber === 112) {
      switch (verseNumber) {
        case 1: return "Reci: \"On je Allah – Jedan!";
        case 2: return "Allah je Utočište svakom!";
        case 3: return "Nije rodio i rođen nije,";
        case 4: return "i niko Mu ravan nije!\"";
        default: return "";
      }
    }
    // Al-Falaq (surah 113) translations
    else if (surahNumber === 113) {
      switch (verseNumber) {
        case 1: return "Reci: \"Utječem se Gospodaru svitanja";
        case 2: return "od zla onoga što On stvara,";
        case 3: return "i od zla mrkle noći kada razastre tmine,";
        case 4: return "i od zla onih koji u čvorove pušu,";
        case 5: return "i od zla zavidljivca kad zavist ne krije!\"";
        default: return "";
      }
    }
    
    return "";
  }
  
  private getEnglishExplanation(verseNumber: number, surahNumber: number): string {
    // Al-Fatiha (surah 1) explanations for children
    if (surahNumber === 1) {
      switch (verseNumber) {
        case 1: return "We start everything by saying Allah's name and remembering that He is kind and loving.";
        case 2: return "Allah takes care of everyone and everything in all the worlds.";
        case 3: return "Allah is always kind and merciful to all His creation.";
        case 4: return "Allah will judge everyone fairly on the Last Day.";
        case 5: return "We only worship Allah and ask Him when we need help.";
        case 6: return "We ask Allah to show us the right way to live.";
        case 7: return "We want to be like the good people who Allah loves, not like the bad people or those who don't know what's right.";
        default: return "";
      }
    }
    
    return "";
  }

  private async initializeData() {
    // Create only History of Islam category
    const categories = [
      {
        name: "History of Islam",
        icon: "menu_book",
        iconColor: "hsl(240 85% 59%)",
        backgroundColor: "hsl(240 85% 97%)",
        difficulty: Difficulty.Beginner,
        totalQuizzes: 1,
        folder: "QUIZ"
      }
    ];
    
    categories.forEach(cat => {
      this.createCategory({
        name: cat.name,
        icon: cat.icon,
        iconColor: cat.iconColor,
        backgroundColor: cat.backgroundColor,
        difficulty: cat.difficulty,
        folder: cat.folder
      });
    });
    
    // Create sample quizzes - only History of Islam
    this.createQuiz({ title: "History of Islam", categoryId: 1, difficulty: 1 });
    
    // No other quiz questions needed - only History of Islam
    
    // Add sample questions to the History of Islam quiz - kid-friendly version
    const historyOfIslamQuestions = [
      {
        text: "What special journey did Prophet Muhammad (PBUH) make from Makkah to Madinah?",
        imageUrl: "/images/quiz/HIJRA.jpg",
        options: ["The Hajj", "The Hijra", "The Umrah", "The Isra"],
        correctOption: 1,
        explanation: "The Hijra was when Prophet Muhammad (PBUH) and his friends moved from Makkah to Madinah. This special journey marked the beginning of the Islamic calendar!"
      },
      {
        text: "Who was Prophet Muhammad's (PBUH) closest friend who became the first leader after him?",
        imageUrl: "/images/quiz/ABU BAKR.jpg",
        options: ["Abu Bakr (RA)", "Umar (RA)", "Uthman (RA)", "Ali (RA)"],
        correctOption: 0,
        explanation: "Abu Bakr (RA) was Prophet Muhammad's (PBUH) closest friend and became the first caliph (leader) after him. He was known for being very kind and truthful."
      },
      {
        text: "What is the name of the special book Muslims read?",
        imageUrl: "/images/quiz/QURAN.jpg",
        options: ["Hadith", "Quran", "Sunnah", "Fiqh"],
        correctOption: 1,
        explanation: "The Quran is the special book that Muslims read. It contains Allah's words and was revealed to Prophet Muhammad (PBUH) by Angel Jibreel (Gabriel)."
      },
      {
        text: "Which building in Makkah do Muslims pray towards?",
        imageUrl: "/images/quiz/THE KABBA.jpg",
        options: ["The Kaaba", "Masjid Al-Nabawi", "Dome of the Rock", "Masjid Al-Aqsa"],
        correctOption: 0,
        explanation: "The Kaaba is the special cube-shaped building in Makkah that Muslims around the world face when they pray. It was built by Prophet Ibrahim (AS) and his son Ismail (AS)."
      },
      {
        text: "What do Muslims say before they start to pray?",
        imageUrl: "/images/quiz/ALLAHU EKBER.png",
        options: ["SubhanAllah", "Alhamdulillah", "Allahu Akbar", "Astaghfirullah"],
        correctOption: 2,
        explanation: "Muslims say 'Allahu Akbar' (Allah is the Greatest) when they start to pray. This reminds them that Allah is greater than anything else in their lives."
      },
      {
        text: "What do we call the month when Muslims fast during daylight hours?",
        imageUrl: "/images/quiz/RAMADAN.jpg",
        options: ["Muharram", "Rajab", "Shaban", "Ramadan"],
        correctOption: 3,
        explanation: "Ramadan is the blessed month when Muslims fast from dawn until sunset. It's a time for extra prayers, reading Quran, and being kind to others."
      },
      {
        text: "What special celebration comes after Ramadan?",
        imageUrl: "/images/quiz/EID-AL FITR.jpg",
        options: ["Eid al-Fitr", "Eid al-Adha", "Mawlid", "Laylat al-Qadr"],
        correctOption: 0,
        explanation: "Eid al-Fitr is the happy celebration that comes after Ramadan. Muslims wear nice clothes, eat special food, give gifts, and spend time with family and friends."
      }
    ];
    
    // Add History of Islam questions to the quiz
    historyOfIslamQuestions.forEach(q => {
      // Ensure image paths use direct file reference
      let imageUrl = q.imageUrl;
      if (imageUrl && imageUrl.includes('images/quiz/')) {
        // Extract just the filename
        const filename = imageUrl.split('/').pop() || '';
        imageUrl = `/images/quiz/${filename}`;
      }
      
      this.createQuestion({
        quizId: 1,
        text: q.text,
        imageUrl: imageUrl,
        audioUrl: undefined,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation
      });
    });
    
    // No other quiz questions to create
    
    // Update quizzes with total questions
    const historyOfIslamQuiz = this.quizzes.get(1);
    if (historyOfIslamQuiz) {
      this.quizzes.set(1, { ...historyOfIslamQuiz, totalQuestions: historyOfIslamQuestions.length });
    }
    
    // Update category with total quizzes
    const category = this.categories.get(1);
    if (category) {
      // Set actual quiz count: History of Islam has 1 quiz with 7 questions
      this.categories.set(1, { 
        ...category, 
        totalQuizzes: 1,
        folder: category.folder
      });
    }
    
    // Initialize sample Quran surahs for children
    const sampleSurahs = [
      {
        number: 1,
        nameArabic: "الفاتحة",
        nameTransliteration: "Al-Fatiha",
        totalVerses: 7,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 1,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/001.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/ad/fc/d8/adfcd8ef294c4caacad15d1bf6cfd6be.jpg"
      },
      {
        number: 112,
        nameArabic: "الإخلاص",
        nameTransliteration: "Al-Ikhlas",
        totalVerses: 4,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 2,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/112.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/87/99/a7/8799a7c8ac24dcdb27d49c7d05a8459e.jpg"
      },
      {
        number: 113,
        nameArabic: "الفلق",
        nameTransliteration: "Al-Falaq",
        totalVerses: 5,
        revelationPlace: "Mecca", // corrected to Mecca
        difficulty: Difficulty.Beginner,
        memorizationRank: 3,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/113.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/98/f2/4d/98f24dd1ac0a153ba2fdcc4c8a9e0bf3.jpg"
      },
      {
        number: 114,
        nameArabic: "الناس",
        nameTransliteration: "An-Nas",
        totalVerses: 6,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 4,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/114.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/68/5b/7e/685b7e8a904a0a92c87e0574c5de70a3.jpg"
      },
      {
        number: 108,
        nameArabic: "الكوثر",
        nameTransliteration: "Al-Kawthar",
        totalVerses: 3,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 5,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/108.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/4a/ce/a7/4acea7cf55e0eed2c7a3e31b6560ae90.jpg"
      },
      {
        number: 103,
        nameArabic: "العصر",
        nameTransliteration: "Al-Asr",
        totalVerses: 3,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 6,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/103.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/64/69/4e/64694e7b6d4b4e03b9f5cfd8d0decf88.jpg"
      },
      {
        number: 105,
        nameArabic: "الفيل",
        nameTransliteration: "Al-Fil",
        totalVerses: 5,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 7,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/105.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/a6/45/a4/a645a4aa6b9fc8ef8dbd81d11e8e4e23.jpg"
      },
      {
        number: 106,
        nameArabic: "قريش",
        nameTransliteration: "Quraysh",
        totalVerses: 4,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 8,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/106.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/8d/42/20/8d4220ae48b0f0dcf49afd39e9f201b3.jpg"
      },
      {
        number: 109,
        nameArabic: "الكافرون",
        nameTransliteration: "Al-Kafirun",
        totalVerses: 6,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 9,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/109.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/13/1e/c1/131ec14ae9caf2c9eee8fce7fa55c669.jpg"
      },
      {
        number: 110,
        nameArabic: "النصر",
        nameTransliteration: "An-Nasr",
        totalVerses: 3,
        revelationPlace: "Medina",
        difficulty: Difficulty.Beginner,
        memorizationRank: 10,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/110.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/41/a6/75/41a6759d8af56f61168101cd8628d8bf.jpg"
      },
      {
        number: 111,
        nameArabic: "المسد",
        nameTransliteration: "Al-Masad",
        totalVerses: 5,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 11,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/111.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/a0/f9/81/a0f981d13ae19be4f8afd65c27a7424f.jpg"
      },
      {
        number: 107,
        nameArabic: "الماعون",
        nameTransliteration: "Al-Ma'un",
        totalVerses: 7,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 12,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/107.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/fc/ed/88/fced88b86f4fcd01abe927f25b822ef6.jpg"
      },
      {
        number: 102,
        nameArabic: "التكاثر",
        nameTransliteration: "At-Takathur",
        totalVerses: 8,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Beginner,
        memorizationRank: 13,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/102.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/c5/fd/dd/c5fddd2fad0fc7ad9acebf8b2352a4fb.jpg"
      },
      {
        number: 101,
        nameArabic: "القارعة",
        nameTransliteration: "Al-Qari'ah",
        totalVerses: 11,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Intermediate,
        memorizationRank: 14,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/101.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/24/8a/42/248a42906ab1b371db4f4a8f9a0dd24a.jpg"
      },
      {
        number: 93,
        nameArabic: "الضحى",
        nameTransliteration: "Ad-Duha",
        totalVerses: 11,
        revelationPlace: "Mecca",
        difficulty: Difficulty.Intermediate,
        memorizationRank: 15,
        audioUrl: "https://www.islamcan.com/audio/quran/al-juhani/093.mp3",
        thumbnailUrl: "https://i.pinimg.com/564x/f7/10/f0/f710f0dc16c3344a4bb9cdd0197ab1d2.jpg"
      }
    ];
    
    // Create sample surahs
    const createdSurahs: QuranSurah[] = [];
    for (const surah of sampleSurahs) {
      const createdSurah = await this.createQuranSurah({
        number: surah.number,
        nameArabic: surah.nameArabic,
        nameTransliteration: surah.nameTransliteration,
        totalVerses: surah.totalVerses,
        revelationPlace: surah.revelationPlace,
        difficulty: surah.difficulty,
        memorizationRank: surah.memorizationRank,
        audioUrl: surah.audioUrl,
        thumbnailUrl: surah.thumbnailUrl
      });
      createdSurahs.push(createdSurah);
    }
    
    // Add verses for all surahs
    if (createdSurahs.length > 0) {
      // 1. Add Al-Fatiha (surah index 0)
      const alFatiha = createdSurahs[0];
      
      const alFatihaVerses = [
        {
          surahId: alFatiha.id,
          verseNumber: 1,
          arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          transliteration: "Bismillāhi r-raḥmāni r-raḥīm",
          orderInSurah: 1,
          audioUrl: "https://verse.audio/al-fatiha/1.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 2,
          arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          transliteration: "Al-ḥamdu lillāhi rabbi l-ʿālamīn",
          orderInSurah: 2,
          audioUrl: "https://verse.audio/al-fatiha/2.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 3,
          arabicText: "الرَّحْمَٰنِ الرَّحِيمِ",
          transliteration: "Ar-raḥmāni r-raḥīm",
          orderInSurah: 3,
          audioUrl: "https://verse.audio/al-fatiha/3.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 4,
          arabicText: "مَالِكِ يَوْمِ الدِّينِ",
          transliteration: "Māliki yawmi d-dīn",
          orderInSurah: 4,
          audioUrl: "https://verse.audio/al-fatiha/4.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 5,
          arabicText: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
          orderInSurah: 5,
          audioUrl: "https://verse.audio/al-fatiha/5.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 6,
          arabicText: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          transliteration: "Ihdinā ṣ-ṣirāṭa l-mustaqīm",
          orderInSurah: 6,
          audioUrl: "https://verse.audio/al-fatiha/6.mp3"
        },
        {
          surahId: alFatiha.id,
          verseNumber: 7,
          arabicText: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          transliteration: "Ṣirāṭa llaḏīna anʿamta ʿalayhim ġayri l-maġḍūbi ʿalayhim wa-lā ḍ-ḍāllīn",
          orderInSurah: 7,
          audioUrl: "https://verse.audio/al-fatiha/7.mp3"
        }
      ];
      
      // Add verses for Al-Fatiha
      for (const verse of alFatihaVerses) {
        const createdVerse = await this.createQuranVerse(verse);
        
        // Add translations for each verse
        await this.createQuranTranslation({
          verseId: createdVerse.id,
          language: 'en',
          translation: this.getEnglishTranslation(verse.verseNumber, 1),
          explanation: this.getEnglishExplanation(verse.verseNumber, 1)
        });
        
        await this.createQuranTranslation({
          verseId: createdVerse.id,
          language: 'bs',
          translation: this.getBosnianTranslation(verse.verseNumber, 1),
          explanation: null
        });
      }
      
      // 2. Al-Ikhlas (surah index 1)
      if (createdSurahs.length > 1) {
        const alIkhlas = createdSurahs[1];
        
        const alIkhlasVerses = [
          {
            surahId: alIkhlas.id,
            verseNumber: 1,
            arabicText: "قُلْ هُوَ اللَّهُ أَحَدٌ",
            transliteration: "Qul huwa llāhu ʾaḥad",
            orderInSurah: 1,
            audioUrl: "https://verse.audio/al-ikhlas/1.mp3"
          },
          {
            surahId: alIkhlas.id,
            verseNumber: 2,
            arabicText: "اللَّهُ الصَّمَدُ",
            transliteration: "Allāhu ṣ-ṣamad",
            orderInSurah: 2,
            audioUrl: "https://verse.audio/al-ikhlas/2.mp3"
          },
          {
            surahId: alIkhlas.id,
            verseNumber: 3,
            arabicText: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
            transliteration: "Lam yalid wa-lam yūlad",
            orderInSurah: 3,
            audioUrl: "https://verse.audio/al-ikhlas/3.mp3"
          },
          {
            surahId: alIkhlas.id,
            verseNumber: 4,
            arabicText: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
            transliteration: "Wa-lam yakun lahū kufuwan ʾaḥad",
            orderInSurah: 4,
            audioUrl: "https://verse.audio/al-ikhlas/4.mp3"
          }
        ];
        
        // Add verses for Al-Ikhlas
        for (const verse of alIkhlasVerses) {
          const createdVerse = await this.createQuranVerse(verse);
          
          // Add translations for each verse
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'en',
            translation: this.getEnglishTranslation(verse.verseNumber, 112),
            explanation: this.getEnglishExplanation(verse.verseNumber, 112)
          });
          
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'bs',
            translation: this.getBosnianTranslation(verse.verseNumber, 112),
            explanation: null
          });
        }
      }
      
      // 3. Al-Falaq (surah index 2)
      if (createdSurahs.length > 2) {
        const alFalaq = createdSurahs[2];
        
        const alFalaqVerses = [
          {
            surahId: alFalaq.id,
            verseNumber: 1,
            arabicText: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
            transliteration: "Qul ʾaʿūḏu bi-rabbi l-falaq",
            orderInSurah: 1,
            audioUrl: "https://verse.audio/al-falaq/1.mp3"
          },
          {
            surahId: alFalaq.id,
            verseNumber: 2,
            arabicText: "مِن شَرِّ مَا خَلَقَ",
            transliteration: "Min šarri mā ḫalaq",
            orderInSurah: 2,
            audioUrl: "https://verse.audio/al-falaq/2.mp3"
          },
          {
            surahId: alFalaq.id,
            verseNumber: 3,
            arabicText: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
            transliteration: "Wa-min šarri ḡāsiqin ʾiḏā waqab",
            orderInSurah: 3,
            audioUrl: "https://verse.audio/al-falaq/3.mp3"
          },
          {
            surahId: alFalaq.id,
            verseNumber: 4,
            arabicText: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
            transliteration: "Wa-min šarri n-naffāṯāti fi l-ʿuqad",
            orderInSurah: 4,
            audioUrl: "https://verse.audio/al-falaq/4.mp3"
          },
          {
            surahId: alFalaq.id,
            verseNumber: 5,
            arabicText: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
            transliteration: "Wa-min šarri ḥāsidin ʾiḏā ḥasad",
            orderInSurah: 5,
            audioUrl: "https://verse.audio/al-falaq/5.mp3"
          }
        ];
        
        // Add verses for Al-Falaq
        for (const verse of alFalaqVerses) {
          const createdVerse = await this.createQuranVerse(verse);
          
          // Add translations for each verse
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'en',
            translation: this.getEnglishTranslation(verse.verseNumber, 113),
            explanation: this.getEnglishExplanation(verse.verseNumber, 113)
          });
          
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'bs',
            translation: this.getBosnianTranslation(verse.verseNumber, 113),
            explanation: null
          });
        }
      }
      
      // 4. An-Nas (surah index 3)
      if (createdSurahs.length > 3) {
        const anNas = createdSurahs[3];
        
        const anNasVerses = [
          {
            surahId: anNas.id,
            verseNumber: 1,
            arabicText: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
            transliteration: "Qul ʾaʿūḏu bi-rabbi n-nās",
            orderInSurah: 1,
            audioUrl: "https://verse.audio/an-nas/1.mp3"
          },
          {
            surahId: anNas.id,
            verseNumber: 2,
            arabicText: "مَلِكِ النَّاسِ",
            transliteration: "Maliki n-nās",
            orderInSurah: 2,
            audioUrl: "https://verse.audio/an-nas/2.mp3"
          },
          {
            surahId: anNas.id,
            verseNumber: 3,
            arabicText: "إِلَٰهِ النَّاسِ",
            transliteration: "ʾIlāhi n-nās",
            orderInSurah: 3,
            audioUrl: "https://verse.audio/an-nas/3.mp3"
          },
          {
            surahId: anNas.id,
            verseNumber: 4,
            arabicText: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
            transliteration: "Min šarri l-waswāsi l-ḫannās",
            orderInSurah: 4,
            audioUrl: "https://verse.audio/an-nas/4.mp3"
          },
          {
            surahId: anNas.id,
            verseNumber: 5,
            arabicText: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
            transliteration: "Allaḏī yuwaswisu fī ṣudūri n-nās",
            orderInSurah: 5,
            audioUrl: "https://verse.audio/an-nas/5.mp3"
          },
          {
            surahId: anNas.id,
            verseNumber: 6,
            arabicText: "مِنَ الْجِنَّةِ وَالنَّاسِ",
            transliteration: "Mina l-jinnati wa-n-nās",
            orderInSurah: 6,
            audioUrl: "https://verse.audio/an-nas/6.mp3"
          }
        ];
        
        // Add verses for An-Nas
        for (const verse of anNasVerses) {
          const createdVerse = await this.createQuranVerse(verse);
          
          // Add translations for each verse
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'en',
            translation: verse.verseNumber === 1 ? "Say, I seek refuge in the Lord of mankind," : 
                        verse.verseNumber === 2 ? "The Sovereign of mankind," :
                        verse.verseNumber === 3 ? "The God of mankind," :
                        verse.verseNumber === 4 ? "From the evil of the retreating whisperer," :
                        verse.verseNumber === 5 ? "Who whispers [evil] into the breasts of mankind," :
                        verse.verseNumber === 6 ? "From among the jinn and mankind." : "",
            explanation: null
          });
          
          await this.createQuranTranslation({
            verseId: createdVerse.id,
            language: 'bs',
            translation: verse.verseNumber === 1 ? "Reci: 'Utječem se Gospodaru ljudi," : 
                        verse.verseNumber === 2 ? "Vladaru ljudi," :
                        verse.verseNumber === 3 ? "Bogu ljudi," :
                        verse.verseNumber === 4 ? "od zla šejtana koji nanosi zle misli pa se skrije," :
                        verse.verseNumber === 5 ? "koji zle misli unosi u srca ljudi," :
                        verse.verseNumber === 6 ? "od džina i od ljudi!'" : "",
            explanation: null
          });
        }
      }
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || UserRole.Child,
      points: 0,
      badgesEarned: [],
      quizzesCompleted: 0,
      displayName: insertUser.displayName || null,
      email: insertUser.email || null,
      profileImageUrl: insertUser.profileImageUrl || null
    };
    this.users.set(id, user);
    return user;
  }
  
  async getUsersByRole(role: UserRole): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(user => user.role === role);
  }
  
  async updateUserProfile(userId: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      ...userData,
      // Don't allow overriding these
      id: user.id,
      points: user.points,
      badgesEarned: user.badgesEarned,
      quizzesCompleted: user.quizzesCompleted
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async updateUserPoints(userId: number, points: number): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      points: user.points + points
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  async addUserBadge(userId: number, badge: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const badgesEarned = user.badgesEarned ? [...user.badgesEarned] : [];
    if (!badgesEarned.includes(badge)) {
      badgesEarned.push(badge);
    }
    
    const updatedUser = {
      ...user,
      badgesEarned
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
  
  // Parent-Child Relationship Operations
  async getChildrenByParentId(parentId: number): Promise<User[]> {
    const relationships = Array.from(this.parentChildRelationships.values())
      .filter(rel => rel.parentId === parentId);
    
    const childrenIds = relationships.map(rel => rel.childId);
    return Array.from(this.users.values())
      .filter(user => childrenIds.includes(user.id) && user.role === UserRole.Child);
  }
  
  async getParentsByChildId(childId: number): Promise<User[]> {
    const relationships = Array.from(this.parentChildRelationships.values())
      .filter(rel => rel.childId === childId);
    
    const parentIds = relationships.map(rel => rel.parentId);
    return Array.from(this.users.values())
      .filter(user => parentIds.includes(user.id) && user.role === UserRole.Parent);
  }
  
  async linkParentToChild(parentId: number, childId: number): Promise<ParentChildRelationship> {
    // Check if relationship already exists
    const existingRelationship = Array.from(this.parentChildRelationships.values())
      .find(rel => rel.parentId === parentId && rel.childId === childId);
    
    if (existingRelationship) {
      return existingRelationship;
    }
    
    // Check if parent and child exist and have the correct roles
    const parent = await this.getUser(parentId);
    const child = await this.getUser(childId);
    
    if (!parent || parent.role !== UserRole.Parent) {
      throw new Error("Parent not found or user is not a parent");
    }
    
    if (!child || child.role !== UserRole.Child) {
      throw new Error("Child not found or user is not a child");
    }
    
    // Create new relationship
    const id = this.currentRelationshipId++;
    const relationship: ParentChildRelationship = {
      id,
      parentId,
      childId
    };
    
    this.parentChildRelationships.set(id, relationship);
    return relationship;
  }
  
  async unlinkParentFromChild(parentId: number, childId: number): Promise<boolean> {
    const relationship = Array.from(this.parentChildRelationships.values())
      .find(rel => rel.parentId === parentId && rel.childId === childId);
    
    if (!relationship) {
      return false;
    }
    
    this.parentChildRelationships.delete(relationship.id);
    return true;
  }
  
  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = {
      ...insertCategory,
      id,
      totalQuizzes: 0,
      folder: insertCategory.folder || "QUIZ", // Default to QUIZ if no folder is specified
      difficulty: insertCategory.difficulty || Difficulty.Beginner // Default to Beginner difficulty
    };
    this.categories.set(id, category);
    return category;
  }
  
  // Quiz operations
  async getQuizzes(): Promise<Quiz[]> {
    return Array.from(this.quizzes.values());
  }
  
  async getQuizzesByCategoryId(categoryId: number): Promise<Quiz[]> {
    return Array.from(this.quizzes.values())
      .filter(quiz => quiz.categoryId === categoryId);
  }
  
  async getQuizById(id: number): Promise<Quiz | undefined> {
    return this.quizzes.get(id);
  }
  
  async createQuiz(insertQuiz: InsertQuiz): Promise<Quiz> {
    const id = this.currentQuizId++;
    const quiz: Quiz = {
      ...insertQuiz,
      id,
      totalQuestions: 0,
      difficulty: insertQuiz.difficulty || Difficulty.Beginner
    };
    this.quizzes.set(id, quiz);
    
    // Update category total quizzes
    const category = this.categories.get(insertQuiz.categoryId);
    if (category) {
      this.categories.set(insertQuiz.categoryId, {
        ...category,
        totalQuizzes: category.totalQuizzes + 1
      });
    }
    
    return quiz;
  }
  
  // Question operations
  async getQuestionsByQuizId(quizId: number): Promise<Question[]> {
    // Limit to only first 7 questions per user request
    return Array.from(this.questions.values())
      .filter(question => question.quizId === quizId)
      .slice(0, 7);
  }
  
  async getQuestionById(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }
  
  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    
    // Ensure options is a string array
    let optionsArray: string[] = [];
    if (Array.isArray(insertQuestion.options)) {
      optionsArray = [...insertQuestion.options];
    }
    
    const question: Question = {
      ...insertQuestion,
      id,
      imageUrl: insertQuestion.imageUrl || null,
      audioUrl: insertQuestion.audioUrl || null,
      options: optionsArray
    };
    
    this.questions.set(id, question);
    
    // Update quiz total questions
    const quiz = this.quizzes.get(insertQuestion.quizId);
    if (quiz) {
      this.quizzes.set(insertQuestion.quizId, {
        ...quiz,
        totalQuestions: quiz.totalQuestions + 1
      });
    }
    
    return question;
  }
  
  // User Progress operations
  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }
  
  async getUserProgressByQuizId(userId: number, quizId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values())
      .find(progress => progress.userId === userId && progress.quizId === quizId);
  }
  
  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentProgressId++;
    const progress: UserProgress = {
      ...insertProgress,
      id,
      score: insertProgress.score || 0,
      completed: insertProgress.completed || false,
      correctAnswers: insertProgress.correctAnswers || 0,
      incorrectAnswers: insertProgress.incorrectAnswers || 0,
      lastCompleted: insertProgress.lastCompleted || null
    };
    this.userProgress.set(id, progress);
    
    // Update user quizzes completed if this progress is completed
    if (progress.completed) {
      const user = this.users.get(progress.userId);
      if (user) {
        this.users.set(progress.userId, {
          ...user,
          quizzesCompleted: user.quizzesCompleted + 1
        });
      }
    }
    
    return progress;
  }
  
  async updateUserProgress(id: number, progress: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const currentProgress = this.userProgress.get(id);
    if (!currentProgress) return undefined;
    
    const wasCompleted = currentProgress.completed;
    
    const updatedProgress = {
      ...currentProgress,
      ...progress
    };
    
    this.userProgress.set(id, updatedProgress);
    
    // Check if quiz was newly completed
    if (!wasCompleted && updatedProgress.completed) {
      const user = this.users.get(updatedProgress.userId);
      if (user) {
        this.users.set(updatedProgress.userId, {
          ...user,
          quizzesCompleted: user.quizzesCompleted + 1
        });
      }
    }
    
    return updatedProgress;
  }
  
  async getChildrenProgressSummary(childrenIds: number[]): Promise<Record<number, {
    totalQuizzes: number;
    completedQuizzes: number;
    averageScore: number;
    totalPoints: number;
    recentActivity: UserProgress[];
  }>> {
    const result: Record<number, {
      totalQuizzes: number;
      completedQuizzes: number;
      averageScore: number;
      totalPoints: number;
      recentActivity: UserProgress[];
    }> = {};
    
    // Get total number of quizzes
    const totalQuizzes = Array.from(this.quizzes.values()).length;
    
    // Process each child
    for (const childId of childrenIds) {
      const child = await this.getUser(childId);
      if (!child || child.role !== UserRole.Child) continue;
      
      // Get all progress for this child
      const childProgress = await this.getUserProgress(childId);
      
      // Get completed quizzes
      const completedQuizzes = childProgress.filter(p => p.completed).length;
      
      // Calculate average score for completed quizzes
      const completedScores = childProgress
        .filter(p => p.completed)
        .map(p => p.score);
      
      const averageScore = completedScores.length > 0
        ? completedScores.reduce((sum, score) => sum + score, 0) / completedScores.length
        : 0;
      
      // Get recent activity (last 10 progress items, sorted by most recent)
      const recentActivity = [...childProgress]
        .sort((a, b) => {
          const aDate = a.lastCompleted ? new Date(a.lastCompleted).getTime() : 0;
          const bDate = b.lastCompleted ? new Date(b.lastCompleted).getTime() : 0;
          return bDate - aDate;
        })
        .slice(0, 10);
      
      // Store summary for this child
      result[childId] = {
        totalQuizzes,
        completedQuizzes,
        averageScore,
        totalPoints: child.points,
        recentActivity
      };
    }
    
    return result;
  }

  // Quran operations
  async getQuranSurahs(): Promise<QuranSurah[]> {
    return Array.from(this.quranSurahs.values());
  }
  
  async getQuranSurahById(id: number): Promise<QuranSurah | undefined> {
    return this.quranSurahs.get(id);
  }
  
  async createQuranSurah(surah: InsertQuranSurah): Promise<QuranSurah> {
    const id = this.currentSurahId++;
    const newSurah: QuranSurah = {
      ...surah,
      id,
      difficulty: surah.difficulty || Difficulty.Beginner,
      audioUrl: surah.audioUrl || null,
      memorizationRank: surah.memorizationRank || 1,
      thumbnailUrl: surah.thumbnailUrl || null
    };
    this.quranSurahs.set(id, newSurah);
    return newSurah;
  }
  
  async getQuranVersesBySurahId(surahId: number): Promise<QuranVerse[]> {
    return Array.from(this.quranVerses.values())
      .filter(verse => verse.surahId === surahId)
      .sort((a, b) => a.orderInSurah - b.orderInSurah);
  }
  
  async getQuranVerseById(id: number): Promise<QuranVerse | undefined> {
    return this.quranVerses.get(id);
  }
  
  async createQuranVerse(verse: InsertQuranVerse): Promise<QuranVerse> {
    const id = this.currentVerseId++;
    const newVerse: QuranVerse = {
      ...verse,
      id,
      audioUrl: verse.audioUrl || null
    };
    this.quranVerses.set(id, newVerse);
    return newVerse;
  }
  
  async getQuranTranslationsByVerseId(verseId: number, language?: string): Promise<QuranTranslation[]> {
    let translations = Array.from(this.quranTranslations.values())
      .filter(translation => translation.verseId === verseId);
    
    if (language) {
      translations = translations.filter(translation => translation.language === language);
    }
    
    return translations;
  }
  
  async getQuranTranslationById(id: number): Promise<QuranTranslation | undefined> {
    return this.quranTranslations.get(id);
  }
  
  async createQuranTranslation(translation: InsertQuranTranslation): Promise<QuranTranslation> {
    const id = this.currentTranslationId++;
    const newTranslation: QuranTranslation = {
      ...translation,
      id,
      explanation: translation.explanation || null
    };
    this.quranTranslations.set(id, newTranslation);
    return newTranslation;
  }
  
  async getUserSurahProgress(userId: number): Promise<UserSurahProgress[]> {
    return Array.from(this.userSurahProgress.values())
      .filter(progress => progress.userId === userId);
  }
  
  async getUserSurahProgressBySurahId(userId: number, surahId: number): Promise<UserSurahProgress | undefined> {
    return Array.from(this.userSurahProgress.values())
      .find(progress => progress.userId === userId && progress.surahId === surahId);
  }
  
  async createUserSurahProgress(progress: InsertUserSurahProgress): Promise<UserSurahProgress> {
    const id = this.currentSurahProgressId++;
    const newProgress: UserSurahProgress = {
      ...progress,
      id,
      completedVerses: progress.completedVerses || 0,
      memorizationLevel: progress.memorizationLevel || MemorizationLevel.NotStarted,
      lastPracticed: progress.lastPracticed || null,
      verseProgress: progress.verseProgress || null,
    };
    this.userSurahProgress.set(id, newProgress);
    return newProgress;
  }
  
  async updateUserSurahProgress(id: number, progress: Partial<UserSurahProgress>): Promise<UserSurahProgress | undefined> {
    const existingProgress = this.userSurahProgress.get(id);
    if (!existingProgress) return undefined;
    
    const updatedProgress: UserSurahProgress = {
      ...existingProgress,
      ...progress,
      id: existingProgress.id,
      userId: existingProgress.userId,
      surahId: existingProgress.surahId,
    };
    
    this.userSurahProgress.set(id, updatedProgress);
    return updatedProgress;
  }
}

export const storage = new MemStorage();
