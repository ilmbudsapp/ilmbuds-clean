// Translations for ILMBUDS Islamic Quiz Kids application
// English to Albanian translations

export type Language = 'en' | 'sq' | 'bs' | 'de' | 'it'; // English, Albanian (sq), Bosnian (bs), German (de), Italian (it)

export type TranslationKeys = 
  | 'general'  // General translations used throughout the app
  | 'auth'     // Authentication related translations
  | 'home'     // Home page translations
  | 'quiz'     // Quiz related translations
  | 'profile'  // Profile related translations
  | 'parent'   // Parent dashboard translations
  | 'badges'   // Badge related translations
  | 'topics'   // Topics/Categories related translations
  | 'common'   // Common UI elements
  | 'ui'       // User interface elements
  | 'settings' // Settings page translations
  | 'quran'    // Quran section translations
  | 'cartoons' // Cartoons section translations

// Using a more flexible structure to support backward compatibility
export type TranslationEntry = {
  [lang: string]: string;
};

export type Translations = {
  [key in TranslationKeys]: {
    [subKey: string]: TranslationEntry
  }
};

// Main translations object
export const translations: Translations = {
  topics: {
    selectCategory: {
      en: 'Select Category',
      bs: 'Odaberi Kategoriju',
      sq: 'Zgjidhni Kategorinë',
      de: 'Kategorie auswählen',
      it: 'Seleziona categoria'},
    tapToStart: {
      en: 'Tap to start the quiz',
      bs: 'Dodirnite za početak kviza',
      sq: 'Prekni për të filluar kuizin',
      de: 'Tippen um Quiz zu starten',
      it: 'Tocca per iniziare il quiz'},
    difficultyLevel: {
      en: 'Difficulty Level',
      bs: 'Nivo težine',
      sq: 'Niveli i vështirësisë',
      de: 'Schwierigkeitsgrad',
      it: 'Livello di difficoltà'}
  },
  quran: {
    // Quran section titles and general labels
    title: {
      en: 'Quran for Children',
      bs: 'Kuran za djecu',
      sq: 'Kurani për fëmijë',
      de: 'Koran für Kinder',
      it: 'Corano per bambini'},
    subtitle: {
      en: 'Listen to beautiful short surahs',
      bs: 'Slušaj prekrasne kratke sure',
      sq: 'Dëgjoni suret e shkurtra të bukura',
      de: 'Höre schöne kurze Suren',
      it: 'Ascolta le belle sure brevi'},
    verses: {
      en: 'verses',
      bs: 'ajeti',
      sq: 'ajete',
      de: 'Verse',
      it: 'versetti'},
    listen: {
      en: 'Listen',
      bs: 'Slušaj',
      sq: 'Dëgjo',
      de: 'Hören',
      it: 'Ascolta'},
    pause: {
      en: 'Pause',
      bs: 'Pauza',
      sq: 'Pauza',
      de: 'Pause',
      it: 'Pausa'
    },
    instruction: {
      en: 'Click on any surah to listen to its beautiful recitation',
      bs: 'Kliknite na bilo koju suru da slušate prekrasno čitanje',
      sq: 'Klikoni në çdo sure për të dëgjuar recitimin e bukur',
      de: 'Klicken Sie auf eine Sure, um die schöne Rezitation zu hören',
      it: 'Clicca su qualsiasi sura per ascoltare la sua bellissima recitazione'
    },
    suraFolder: {
      en: 'Quran for Children',
      bs: 'Kuran za djecu',
      sq: 'Kurani për fëmijë',
      de: 'Koran für Kinder',
      it: 'Corano per bambini'
    },
    availableSurahs: {
      en: 'Available Surahs',
      bs: 'Dostupne sure',
      sq: 'Suret e disponueshme',
      de: 'Verfügbare Suren',
      it: 'Sure disponibili'
    },
    verse: {
      en: 'Verse',
      bs: 'Ajet',
      sq: 'Ajet',
      de: 'Vers',
      it: 'Versetto'
    },
    previousVerse: {
      en: 'Previous',
      bs: 'Prethodni',
      sq: 'I mëparshëm',
      de: 'Vorherige',
      it: 'Precedente'
    },
    nextVerse: {
      en: 'Next',
      bs: 'Sljedeći',
      sq: 'Tjetër',
      de: 'Nächste',
      it: 'Successivo'
    },
    playRecitation: {
      en: 'Play Recitation',
      bs: 'Pusti učenje',
      sq: 'Luaj leximin',
      de: 'Rezitation abspielen',
      it: 'Riproduci recitazione'
    },
    pauseRecitation: {
      en: 'Pause Recitation',
      bs: 'Pauziraj učenje',
      sq: 'Ndalo leximin',
      de: 'Rezitation pausieren',
      it: 'Pausa recitazione'
    },
    read: {
      en: 'Read',
      bs: 'Čitaj',
      sq: 'Lexo',
      de: 'Lesen',
      it: 'Leggi'
    },
    translation: {
      en: 'Translation',
      bs: 'Prevod',
      sq: 'Përkthimi',
      de: 'Übersetzung',
      it: 'Traduzione'
    },
    transliteration: {
      en: 'Transliteration',
      bs: 'Transliteracija',
      sq: 'Transliterim',
      de: 'Transliteration',
      it: 'Traslitterazione'
    },
    memorize: {
      en: 'Memorize',
      bs: 'Memoriši',
      sq: 'Memorizoni',
      de: 'Auswendig lernen',
      it: 'Memorizza'
    },
    explanation: {
      en: 'Explanation',
      bs: 'Objašnjenje',
      sq: 'Shpjegimi',
      de: 'Erklärung',
      it: 'Spiegazione'
    },
    decreaseLevel: {
      en: 'Decrease Level',
      bs: 'Umanji nivo',
      sq: 'Zvogëlo nivelin',
      de: 'Stufe verringern',
      it: 'Diminuisci livello'
    },
    increaseLevel: {
      en: 'Increase Level',
      bs: 'Povećaj nivo',
      sq: 'Rrit nivelin',
      de: 'Stufe erhöhen',
      it: 'Aumenta livello'
    },
    memorizationTips: {
      en: 'Memorization Tips',
      bs: 'Savjeti za memorisanje',
      sq: 'Këshilla për memorizim',
      de: 'Tipps zum Auswendiglernen',
      it: 'Suggerimenti per la memorizzazione'
    },
    tipRepetition: {
      en: 'Repeat the verse multiple times while looking at it',
      bs: 'Ponavljaj ajet više puta dok ga gledaš',
      sq: 'Përsërit ajetin disa herë duke e parë atë',
      de: 'Wiederhole den Vers mehrmals, während du ihn ansiehst',
      it: 'Ripeti il versetto più volte mentre lo guardi'
    },
    tipUnderstand: {
      en: 'Understand the meaning to make memorization easier',
      bs: 'Razumijevanje značenja olakšava memorisanje',
      sq: 'Kuptoni kuptimin për të bërë memorizimin më të lehtë',
      de: 'Verstehe die Bedeutung, um das Auswendiglernen zu erleichtern',
      it: 'Comprendi il significato per facilitare la memorizzazione'
    },
    tipChunks: {
      en: 'Learn in small chunks rather than all at once',
      bs: 'Uči u malim dijelovima, a ne sve odjednom',
      sq: 'Mëso në copa të vogla në vend të gjithçkaje njëherësh',
      de: 'Lerne in kleinen Abschnitten statt alles auf einmal',
      it: 'Impara in piccoli pezzi anziché tutto in una volta'
    },
    tipReview: {
      en: 'Regularly review what you\'ve already learned',
      bs: 'Redovno obnavljaj ono što si već naučio/la',
      sq: 'Rishiko rregullisht atë që ke mësuar tashmë',
      de: 'Wiederhole regelmäßig, was du bereits gelernt hast',
      it: 'Rivedi regolarmente ciò che hai già imparato'
    },
    
    // Memorization levels
    notStarted: {
      en: 'Not Started',
      bs: 'Nije započeto',
      sq: 'Pa filluar',
      de: 'Nicht begonnen',
      it: 'Non iniziato'
    },
    familiar: {
      en: 'Familiar',
      bs: 'Upoznat/a',
      sq: 'I njohur',
      de: 'Vertraut',
      it: 'Familiare'
    },
    partiallyMemorized: {
      en: 'Partially Memorized',
      bs: 'Djelimično memorirano',
      sq: 'Pjesërisht i memorizuar',
      de: 'Teilweise gelernt',
      it: 'Parzialmente memorizzato'
    },
    mostlyMemorized: {
      en: 'Mostly Memorized',
      bs: 'Većinom memorirano',
      sq: 'Kryesisht i memorizuar',
      de: 'Größtenteils gelernt',
      it: 'Per lo più memorizzato'
    },
    fullyMemorized: {
      en: 'Fully Memorized',
      bs: 'Potpuno memorirano',
      sq: 'Plotësisht i memorizuar',
      de: 'Vollständig gelernt',
      it: 'Completamente memorizzato'
    },
    mastered: {
      en: 'Mastered',
      bs: 'Savladano',
      sq: 'I Zotëruar',
      de: 'Gemeistert',
      it: 'Padroneggiato'
    },
    
    // Error messages
    noVersesAvailable: {
      en: 'No verses available for this surah yet',
      bs: 'Još nema dostupnih ajeta za ovu suru',
      sq: 'Ende nuk ka ajete të disponueshme për këtë sure',
      de: 'Noch keine Verse für diese Sure verfügbar',
      it: 'Nessun versetto disponibile per questa sura ancora'
    },
    translationNotAvailable: {
      en: 'Translation not available in this language',
      bs: 'Prevod nije dostupan na ovom jeziku',
      sq: 'Përkthimi nuk është i disponueshëm në këtë gjuhë',
      de: 'Übersetzung in dieser Sprache nicht verfügbar',
      it: 'Traduzione non disponibile in questa lingua'
    },
    
    // Surah information
    surahInfo: {
      en: 'About this Surah',
      bs: 'O ovoj suri',
      sq: 'Rreth kësaj sure',
      de: 'Über diese Sure',
      it: 'Informazioni sulla sura'
    },
    
    // Achievements
    verseMemorized: {
      en: 'Verse memorized!',
      bs: 'Ajet memoriran!',
      sq: 'Ajeti u memorizua!',
      de: 'Vers auswendig gelernt!',
      it: 'Versetto memorizzato!'
    },
    surahCompleted: {
      en: 'Surah completed!',
      bs: 'Sura završena!',
      sq: 'Sureja u kompletua!',
      de: 'Sure abgeschlossen!',
      it: 'Sura completata!'
    },
    
    // Additional translations for the quran section
  
    pageTitle: {
      en: 'Quran for Children',
      sq: 'Kurani për fëmijët',
      bs: 'Kuran za djecu',
      de: 'Koran für Kinder',
      it: 'Corano per bambini'
    },
    learningMode: {
      en: 'Learning Mode',
      sq: 'Mënyra e të Mësuarit',
      bs: 'Način učenja',
      de: 'Lernmodus',
      it: 'Modalità di apprendimento'
    },
    memorizationMode: {
      en: 'Memorization Mode',
      sq: 'Mënyra e Memorizimit',
      bs: 'Način memorizacije',
      de: 'Memorisierungsmodus',
      it: 'Modalità di memorizzazione'
    },
    listenMode: {
      en: 'Listen Mode',
      sq: 'Mënyra e Dëgjimit',
      bs: 'Način slušanja',
      de: 'Hörmodus',
      it: 'Modalità ascolto'
    },
    playAudio: {
      en: 'Play Audio',
      sq: 'Luaj Audio',
      bs: 'Pusti Audio',
      de: 'Audio abspielen',
      it: 'Riproduci audio'
    },
    pauseAudio: {
      en: 'Pause Audio',
      sq: 'Ndalo Audio',
      bs: 'Pauziraj Audio',
      de: 'Audio pausieren',
      it: 'Pausa audio'
    },
    repeatVerse: {
      en: 'Repeat Verse',
      sq: 'Përsërit Ajetin',
      bs: 'Ponovi Ajet',
      de: 'Vers wiederholen',
      it: 'Ripeti versetto'
    },
    nextVerseButton: {
      en: 'Next Verse',
      sq: 'Ajeti Tjetër',
      bs: 'Sljedeći ajet',
      de: 'Nächster Vers',
      it: 'Prossimo versetto'
    },
    previousVerseButton: {
      en: 'Previous Verse',
      sq: 'Ajeti i Mëparshëm',
      bs: 'Prethodni ajet',
      de: 'Vorheriger Vers',
      it: 'Versetto precedente'
    },
    markLearned: {
      en: 'Mark as Learned',
      sq: 'Shëno si të Mësuar',
      bs: 'Označi kao naučeno',
      de: 'Als gelernt markieren',
      it: 'Segna come imparato'
    },
    markMemorized: {
      en: 'Mark as Memorized',
      sq: 'Shëno si të Memorizuar',
      bs: 'Označi kao memorizirano',
      de: 'Als auswendig gelernt markieren',
      it: 'Segna come memorizzato'
    },
    surahList: {
      en: 'Surah List',
      sq: 'Lista e Surave',
      bs: 'Lista sura',
      de: 'Suren-Liste',
      it: 'Lista delle sure'
    },
    surahDetails: {
      en: 'Surah Details',
      sq: 'Detajet e Sures',
      bs: 'Detalji Sure',
      de: 'Sure Details',
      it: 'Dettagli della Sura'
    },
    totalVerses: {
      en: 'Total Verses',
      sq: 'Ajetet Gjithsej',
      bs: 'Ukupno Ajeta',
      de: 'Gesamtverse',
      it: 'Versetti totali'
    },
    versesCount: {
      en: 'Verses',
      sq: 'Ajete',
      bs: 'Ajeta',
      de: 'Verse',
      it: 'Versetti'
    },
    revelationPlace: {
      en: 'Revelation Place',
      sq: 'Vendi i Zbritjes',
      bs: 'Mjesto Objave',
      de: 'Offenbarungsort',
      it: 'Luogo di rivelazione'
    },
    mecca: {
      en: 'Mecca',
      sq: 'Mekë',
      bs: 'Meka',
      de: 'Mekka',
      it: 'La Mecca'
    },
    medina: {
      en: 'Medina',
      sq: 'Medinë',
      bs: 'Medina',
      de: 'Medina',
      it: 'Medina'
    },
    difficulty: {
      en: 'Difficulty',
      sq: 'Vështirësia',
      bs: 'Težina',
      de: 'Schwierigkeit',
      it: 'Difficoltà'
    },
    difficultyLevel: {
      en: 'Difficulty Level',
      sq: 'Niveli i Vështirësisë',
      bs: 'Nivo težine',
      de: 'Schwierigkeitsgrad',
      it: 'Livello di difficoltà'
    },
    beginner: {
      en: 'Beginner',
      sq: 'Fillestar',
      bs: 'Početni',
      de: 'Anfänger',
      it: 'Principiante'
    },
    intermediate: {
      en: 'Intermediate',
      sq: 'Mesatar',
      bs: 'Srednji',
      de: 'Mittelstufe',
      it: 'Intermedio'
    },
    advanced: {
      en: 'Advanced',
      sq: 'Avancuar',
      bs: 'Napredni',
      de: 'Fortgeschritten',
      it: 'Avanzato'
    },
    memorizationProgress: {
      en: 'Memorization Progress',
      sq: 'Progresi i Memorizimit',
      bs: 'Napredak Memorizacije',
      de: 'Memorisierungsfortschritt',
      it: 'Progresso della memorizzazione'
    },
    memorizationLevel: {
      en: 'Memorization Level',
      sq: 'Niveli i Memorizimit',
      bs: 'Nivo memorizacije',
      de: 'Auswendiglern-Niveau',
      it: 'Livello di memorizzazione'
    },
    memLevelNotStarted: {
      en: 'Not Started',
      sq: 'Pa Filluar',
      bs: 'Nije Započeto',
      de: 'Nicht begonnen',
      it: 'Non iniziato'
    },
    memLevelFamiliar: {
      en: 'Familiar',
      sq: 'I Njohur',
      bs: 'Upoznat',
      de: 'Bekannt',
      it: 'Familiare'
    },
    memLevelPartiallyMemorized: {
      en: 'Partially Memorized',
      sq: 'Pjesërisht i Memorizuar',
      bs: 'Djelimično Memorizirano',
      de: 'Teilweise auswendig gelernt',
      it: 'Parzialmente memorizzato'
    },
    memLevelMostlyMemorized: {
      en: 'Mostly Memorized',
      sq: 'Kryesisht i Memorizuar',
      bs: 'Većinom Memorizirano',
      de: 'Größtenteils auswendig gelernt',
      it: 'Per lo più memorizzato'
    },
    memLevelFullyMemorized: {
      en: 'Fully Memorized',
      sq: 'Plotësisht i Memorizuar',
      bs: 'Potpuno Memorizirano',
      de: 'Vollständig auswendig gelernt',
      it: 'Completamente memorizzato'
    },
    memLevelMastered: {
      en: 'Mastered',
      sq: 'Zotëruar',
      bs: 'Savladano',
      de: 'Gemeistert',
      it: 'Padroneggiato'
    },
    lastPracticed: {
      en: 'Last Practiced',
      sq: 'Praktikuar për herë të fundit',
      bs: 'Posljednja vježba',
      de: 'Zuletzt geübt',
      it: 'Ultima pratica'
    },
    updateProgress: {
      en: 'Update Progress',
      sq: 'Përditëso Progresin',
      bs: 'Ažuriraj napredak',
      de: 'Fortschritt aktualisieren',
      it: 'Aggiorna progresso'
    },
    progressUpdated: {
      en: 'Progress Updated',
      sq: 'Progresi u Përditësua',
      bs: 'Napredak ažuriran',
      de: 'Fortschritt aktualisiert',
      it: 'Progresso aggiornato'
    },
    showTranslation: {
      en: 'Show Translation',
      sq: 'Shfaq Përkthimin',
      bs: 'Prikaži prijevod',
      de: 'Übersetzung anzeigen',
      it: 'Mostra traduzione'
    },
    hideTranslation: {
      en: 'Hide Translation',
      sq: 'Fsheh Përkthimin',
      bs: 'Sakrij prijevod',
      de: 'Übersetzung ausblenden',
      it: 'Nascondi traduzione'
    },
    showTransliteration: {
      en: 'Show Transliteration',
      sq: 'Shfaq Transliterimin',
      bs: 'Prikaži transliteraciju',
      de: 'Transliteration anzeigen',
      it: 'Mostra traslitterazione'
    },
    hideTransliteration: {
      en: 'Hide Transliteration',
      sq: 'Fsheh Transliterimin',
      bs: 'Sakrij transliteraciju',
      de: 'Transliteration ausblenden',
      it: 'Nascondi traslitterazione'
    }
  },
  settings: {
    pageTitle: {
      en: 'Settings',
      sq: 'Cilësimet',
      bs: 'Postavke',
      de: 'Einstellungen',
      it: 'Impostazioni'},
    title: {
      en: 'App Settings',
      sq: 'Cilësimet e Aplikacionit',
      bs: 'Postavke Aplikacije',
      de: 'App-Einstellungen',
      it: 'Impostazioni App'
    },
    description: {
      en: 'Customize your experience',
      sq: 'Përshtatni përvojën tuaj',
      bs: 'Prilagodite svoje iskustvo',
      de: 'Passen Sie Ihre Erfahrung an',
      it: 'Personalizza la tua esperienza'
    },
    saveSettings: {
      en: 'Save Settings',
      sq: 'Ruaj Cilësimet',
      bs: 'Sačuvaj Postavke',
      de: 'Einstellungen speichern',
      it: 'Salva Impostazioni'
    },
    settingsSaved: {
      en: 'Settings Saved',
      sq: 'Cilësimet u Ruajtën',
      bs: 'Postavke Sačuvane',
      de: 'Einstellungen gespeichert',
      it: 'Impostazioni Salvate'
    },
    settingsSavedDescription: {
      en: 'Your settings have been saved successfully',
      sq: 'Cilësimet tuaja janë ruajtur me sukses',
      bs: 'Vaše postavke su uspješno sačuvane',
      de: 'Ihre Einstellungen wurden erfolgreich gespeichert',
      it: 'Le tue impostazioni sono state salvate con successo'
    },
    language: {
      en: 'Language',
      sq: 'Gjuha',
      bs: 'Jezik',
      de: 'Sprache',
      it: 'Lingua'
    },
    selectLanguage: {
      en: 'Select Language',
      sq: 'Zgjidh Gjuhën',
      bs: 'Odaberite Jezik',
      de: 'Sprache auswählen',
      it: 'Seleziona lingua'
    },
    sound: {
      en: 'Sound',
      sq: 'Zëri',
      bs: 'Zvuk',
      de: 'Ton',
      it: 'Suono'
    },
    volume: {
      en: 'Volume',
      sq: 'Volumi',
      bs: 'Glasnoća',
      de: 'Lautstärke',
      it: 'Volume'
    },
    notifications: {
      en: 'Notifications',
      sq: 'Njoftimet',
      bs: 'Obavještenja',
      de: 'Benachrichtigungen',
      it: 'Notifiche'
    },
    notificationsDescription: {
      en: 'Get reminders about your progress',
      sq: 'Merrni përkujtime për progresin tuaj',
      bs: 'Dobijte podsjetnike o vašem napretku',
      de: 'Erhalten Sie Erinnerungen zu Ihrem Fortschritt',
      it: 'Ricevi promemoria sui tuoi progressi'
    },
    display: {
      en: 'Display',
      sq: 'Shfaqja',
      bs: 'Prikaz',
      de: 'Anzeige',
      it: 'Display'
    },
    darkMode: {
      en: 'Dark Mode',
      sq: 'Modaliteti i Errët',
      bs: 'Tamni Način',
      de: 'Dunkelmodus',
      it: 'Modalità scura'
    },
    animations: {
      en: 'Animations',
      sq: 'Animacionet',
      bs: 'Animacije',
      de: 'Animationen',
      it: 'Animazioni'
    },
    fontSize: {
      en: 'Font Size',
      sq: 'Madhësia e Shkronjave',
      bs: 'Veličina Fonta',
      de: 'Schriftgröße',
      it: 'Dimensione del carattere'
    },
    account: {
      en: 'Account',
      sq: 'Llogaria',
      bs: 'Račun',
      de: 'Konto',
      it: 'Account'
    },
    loggedInAs: {
      en: 'Logged in as',
      sq: 'I kyçur si',
      bs: 'Prijavljeni kao',
      de: 'Angemeldet als',
      it: 'Accesso come'
    },
    logout: {
      en: 'Logout',
      sq: 'Dilni',
      bs: 'Odjava',
      de: 'Abmelden'
    }
  },
  general: {
    partners: {
      en: 'Partners',
      sq: 'Partnerët',
      bs: 'Partneri',
      de: 'Partner',
      it: 'Partner'},
    contentComingSoon: {
      en: 'Content will be added soon.',
      sq: 'Përmbajtja do të shtohet së shpejti.',
      bs: 'Sadržaj će biti dodan uskoro.',
      de: 'Inhalte werden in Kürze hinzugefügt.',
      it: 'I contenuti saranno aggiunti presto.'
    },
    stayTuned: {
      en: 'Stay tuned for new content updates!',
      sq: 'Qëndro i sintonizuar për përditësime të reja!',
      bs: 'Ostanite s nama za nove sadržaje!',
      de: 'Bleiben Sie dran für neue Inhalte!',
      it: 'Resta sintonizzato per nuovi aggiornamenti di contenuti!'
    },
    donate: {
      en: 'Donate',
      sq: 'Dhuro',
      bs: 'Doniraj',
      de: 'Spenden',
      it: 'Dona'
    },
    appName: {
      en: 'ILMBUDS',
      sq: 'ILMBUDS',
      bs: 'ILMBUDS',
      de: 'ILMBUDS'
    },
    loading: {
      en: 'Loading...',
      sq: 'Duke ngarkuar...',
      bs: 'Učitavanje...',
      de: 'Wird geladen...',
      it: 'Caricamento...'},
    error: {
      en: 'An error occurred.',
      sq: 'Ndodhi një gabim.',
      bs: 'Došlo je do greške.',
      de: 'Ein Fehler ist aufgetreten.'
    },
    success: {
      en: 'Success!',
      sq: 'Sukses!',
      bs: 'Uspjeh!',
      de: 'Erfolg!'
    },
    retry: {
      en: 'Try again',
      sq: 'Provo përsëri',
      bs: 'Pokušaj ponovo',
      de: 'Erneut versuchen'
    },
    next: {
      en: 'Next',
      sq: 'Tjetër',
      bs: 'Sljedeće',
      de: 'Weiter'
    },
    previous: {
      en: 'Previous',
      sq: 'I mëparshëm',
      bs: 'Prethodno',
      de: 'Zurück'
    },
    back: {
      en: 'Back',
      sq: 'Kthehu',
      bs: 'Nazad',
      de: 'Zurück'
    },
    save: {
      en: 'Save',
      sq: 'Ruaj',
      bs: 'Sačuvaj',
      de: 'Speichern'
    },
    cancel: {
      en: 'Cancel',
      sq: 'Anulo',
      bs: 'Otkaži',
      de: 'Abbrechen'
    },
    submit: {
      en: 'Submit',
      sq: 'Dërgo',
      bs: 'Potvrdi',
      de: 'Absenden'
    },
    continue: {
      en: 'Continue',
      sq: 'Vazhdo',
      bs: 'Nastavi',
      de: 'Fortfahren',
      it: 'Continua'
    },
    start: {
      en: 'Start',
      sq: 'Fillo',
      bs: 'Počni',
      de: 'Starten'
    },
    finish: {
      en: 'Finish',
      sq: 'Përfundo',
      bs: 'Završi',
      de: 'Beenden'
    },
    points: {
      en: 'points',
      sq: 'pikë',
      bs: 'bodovi',
      de: 'Punkte'
    }
  },
  auth: {
    login: {
      en: 'Login',
      sq: 'Hyrje',
      bs: 'Prijava',
      de: 'Anmelden'
    },
    pleaseLogIn: {
      en: 'Please log in to see your progress',
      sq: 'Ju lutemi hyni për të parë progresin tuaj',
      bs: 'Molimo prijavite se da biste vidjeli svoj napredak',
      de: 'Bitte melden Sie sich an, um Ihren Fortschritt zu sehen'
    },
    register: {
      en: 'Register',
      sq: 'Regjistrohu',
      bs: 'Registracija',
      de: 'Registrieren'
    },
    username: {
      en: 'Username',
      sq: 'Emri i përdoruesit',
      bs: 'Korisničko ime',
      de: 'Benutzername'
    },
    password: {
      en: 'Password',
      sq: 'Fjalëkalimi',
      bs: 'Lozinka',
      de: 'Passwort'
    },
    confirmPassword: {
      en: 'Confirm Password',
      sq: 'Konfirmo fjalëkalimin',
      bs: 'Potvrdi lozinku',
      de: 'Passwort bestätigen'
    },
    role: {
      en: 'Role',
      sq: 'Roli',
      bs: 'Uloga',
      de: 'Rolle'
    },
    child: {
      en: 'Child',
      sq: 'Fëmijë',
      bs: 'Dijete',
      de: 'Kind'
    },
    parent: {
      en: 'Parent',
      sq: 'Prind',
      bs: 'Roditelj',
      de: 'Elternteil'
    },
    createAccount: {
      en: 'Create Account',
      sq: 'Krijo Llogarinë',
      bs: 'Kreiraj račun',
      de: 'Konto erstellen'
    },
    alreadyHaveAccount: {
      en: 'Already have an account?',
      sq: 'Keni tashmë një llogari?',
      bs: 'Već imate račun?',
      de: 'Haben Sie bereits ein Konto?'
    },
    dontHaveAccount: {
      en: 'Don\'t have an account?',
      sq: 'Nuk keni një llogari?',
      bs: 'Nemate račun?',
      de: 'Haben Sie kein Konto?'
    },
    loginSuccess: {
      en: 'Login successful!',
      sq: 'Hyrje e suksesshme!',
      bs: 'Prijava uspješna!',
      de: 'Anmeldung erfolgreich!'
    },
    registerSuccess: {
      en: 'Registration successful!',
      sq: 'Regjistrimi i suksesshëm!',
      bs: 'Registracija uspješna!',
      de: 'Registrierung erfolgreich!'
    },
    logout: {
      en: 'Logout',
      sq: 'Dilni',
      bs: 'Odjava',
      de: 'Abmelden'
    }
  },
  home: {
    welcome: {
      en: 'Welcome to ILMBUDS',
      sq: 'Mirësevini në ILMBUDS',
      bs: 'Dobrodošli u ILMBUDS',
      de: 'Willkommen bei ILMBUDS',
      it: 'Benvenuti in ILMBUDS'
    },
    cartoons: {
      en: 'Islamic Cartoons',
      sq: 'Filma vizatimorë islamikë',
      bs: 'Islamski crtani filmovi',
      de: 'Islamische Zeichentrickfilme',
      it: 'Cartoni animati islamici'
    },
    cartoonsSectionDescription: {
      en: 'Watch entertaining and educational Islamic cartoons for children',
      sq: 'Shiko filma vizatimorë islamikë argëtues dhe edukativë për fëmijë',
      bs: 'Gledajte zabavne i edukativne islamske crtane filmove za djecu',
      de: 'Schauen Sie unterhaltsame und lehrreiche islamische Zeichentrickfilme für Kinder',
      it: 'Guarda cartoni animati islamici divertenti ed educativi per bambini'
    },
    findQiblaDescription: {
      en: 'Find the direction of the Kaaba from anywhere in the world',
      sq: 'Gjeni drejtimin e Qabes nga çdo vend në botë',
      bs: 'Pronađite pravac Kabe sa bilo koje lokacije na svijetu',
      de: 'Finden Sie die Richtung der Kaaba von überall auf der Welt',
      it: 'Trova la direzione della Kaaba da qualsiasi parte del mondo'
    },
    subtitle: {
      en: 'Learn and play with Islamic knowledge',
      sq: 'Mëso dhe luaj me dituri Islame',
      bs: 'Učite i igrajte se s islamskim znanjem',
      de: 'Lerne und spiele mit islamischem Wissen',
      it: 'Impara e gioca con la conoscenza islamica'
    },
    tagline: {
      en: 'Let your child learn Islam',
      sq: 'Lejo fëmijën tënd të mësojë Islamin',
      bs: 'Dopustite da vaše dijete uči o islamu',
      de: 'Lassen Sie Ihr Kind den Islam lernen',
      it: 'Lascia che il tuo bambino impari l\'Islam'
    },
    islamicStories: {
      en: 'Stories for Children',
      sq: 'Tregime për Fëmijë',
      bs: 'Priče za Djecu',
      de: 'Geschichten für Kinder',
      it: 'Storie per Bambini'
    },
    quizzes: {
      en: 'Quiz',
      sq: 'Kuiz',
      bs: 'Kviz',
      de: 'Quiz',
      it: 'Quiz'
    },
    quiz: {
      en: 'Islamic Quiz',
      sq: 'Kuizi islam',
      bs: 'Islamski kviz',
      de: 'Islamisches Quiz',
      it: 'Quiz islamico'
    },
    quizDescription: {
      en: 'Test your Islamic knowledge and learn new things with fun quizzes',
      sq: 'Testoni njohuritë tuaja islame dhe mësoni gjëra të reja me kuize argëtuese',
      bs: 'Testiraj svoje islamsko znanje i uči nove stvari kroz zabavne kvizove',
      de: 'Teste dein islamisches Wissen und lerne neue Dinge mit lustigen Quizzes',
      it: 'Metti alla prova la tua conoscenza islamica e impara cose nuove con quiz divertenti'
    },
    quranSectionDescription: {
      en: 'Learn Quranic verses with beautiful recitations and explanations',
      sq: 'Mëso vargjet Kuranore me recitime dhe shpjegime të bukura',
      bs: 'Naučite kuranske ajete s lijepim recitacijama i objašnjenjima',
      de: 'Lernen Sie Koranverse mit schönen Rezitationen und Erklärungen',
      it: 'Impara i versetti del Corano con bellissime recitazioni e spiegazioni'
    },
    storiesSectionDescription: {
      en: 'Read inspiring stories about prophets and companions',
      sq: 'Lexo tregime frymëzuese për profetët dhe shokët e tyre',
      bs: 'Čitajte inspirativne priče o poslanicima i ashabima',
      de: 'Lesen Sie inspirierende Geschichten über Propheten und Gefährten',
      it: 'Leggi storie ispiratrici sui profeti e compagni'
    },
    catechismDescription: {
      en: 'Learn about Islamic beliefs, practices and how to perform ablution',
      sq: 'Mëso rreth besimeve Islame, praktikave dhe si të kryesh abdesin',
      bs: 'Saznajte o islamskim vjerovanjima, praksama i kako obaviti abdest',
      de: 'Lernen Sie über islamische Glaubensinhalte, Praktiken und wie man die Waschung durchführt',
      it: 'Impara sulle credenze islamiche, pratiche e come eseguire l\'abluzione'
    },

    quizSectionDescription: {
      en: 'Test your Islamic knowledge and learn new things with fun quizzes',
      sq: 'Testo njohuritë tuaja islame dhe mëso gjëra të reja me kuize argëtuese',
      bs: 'Testirajte svoje islamsko znanje i naučite nove stvari uz zabavne kvizove',
      de: 'Testen Sie Ihr islamisches Wissen und lernen Sie mit Spaß-Quizzen Neues',
      it: 'Metti alla prova la tua conoscenza islamica e impara cose nuove con quiz divertenti'
    },
    islamicQuiz: {
      en: 'Islamic Quiz',
      sq: 'Kuiz Islamik',
      bs: 'Islamski Kviz',
      de: 'Islamisches Quiz',
      it: 'Quiz Islamico'
    },
    getStarted: {
      en: 'Get Started',
      sq: 'Filloni',
      bs: 'Započnite',
      de: 'Jetzt starten'
    },
    exploreTopics: {
      en: 'Explore Topics',
      sq: 'Eksploroni Temat',
      bs: 'Istražite teme',
      de: 'Themen entdecken'
    },
    viewProfile: {
      en: 'View Profile',
      sq: 'Shiko Profilin',
      bs: 'Pogledaj profil',
      de: 'Profil anzeigen'
    },
    recentQuizzes: {
      en: 'Recent Quizzes',
      sq: 'Kuizet e Fundit',
      bs: 'Nedavni kvizovi',
      de: 'Neueste Quizze'
    },
    yourProgress: {
      en: 'Your Progress',
      sq: 'Progresi Juaj',
      bs: 'Vaš napredak',
      de: 'Dein Fortschritt'
    },
    totalPoints: {
      en: 'Total Points',
      sq: 'Pikët Totale',
      bs: 'Ukupni bodovi',
      de: 'Gesamtpunkte'
    },
    completedQuizzes: {
      en: 'Completed Quizzes',
      sq: 'Kuizet e Përfunduara',
      bs: 'Završeni kvizovi',
      de: 'Abgeschlossene Quizze'
    },
    featuredCategory: {
      en: 'Featured Category',
      sq: 'Kategoria e Veçantë',
      bs: 'Izdvojena kategorija',
      de: 'Ausgewählte Kategorie'
    }
  },
  quiz: {
    startQuiz: {
      en: 'Start Quiz',
      sq: 'Fillo Kuizin',
      bs: 'Započni kviz',
      de: 'Quiz starten'
    },
    noQuestions: {
      en: 'No questions available',
      sq: 'Nuk ka pyetje në dispozicion',
      bs: 'Nema dostupnih pitanja',
      de: 'Keine Fragen verfügbar'
    },
    questionIllustration: {
      en: 'Question illustration',
      sq: 'Ilustrim i pyetjes',
      bs: 'Ilustracija pitanja',
      de: 'Fragendarstellung'
    },
    playAudio: {
      en: 'Play audio',
      sq: 'Luaj audio',
      bs: 'Pusti zvuk',
      de: 'Audio abspielen'
    },
    finishQuiz: {
      en: 'Finish Quiz',
      sq: 'Përfundo Kuizin',
      bs: 'Završi kviz',
      de: 'Quiz beenden'
    },
    question: {
      en: 'Question',
      sq: 'Pyetje',
      bs: 'Pitanje',
      de: 'Frage'
    },
    questionOf: {
      en: 'Question {current} of {total}',
      sq: 'Pyetja {current} nga {total}',
      bs: 'Pitanje {current} od {total}',
      de: 'Frage {current} von {total}'
    },
    correctAnswer: {
      en: 'Correct answer!',
      sq: 'Përgjigje e saktë!',
      bs: 'Tačan odgovor!',
      de: 'Richtige Antwort!'
    },
    incorrectAnswer: {
      en: 'Sorry, try again!',
      sq: 'Na vjen keq, provoni përsëri!',
      bs: 'Žao nam je, pokušajte ponovo!',
      de: 'Leider falsch, versuche es noch einmal!'
    },
    explanation: {
      en: 'Explanation',
      sq: 'Shpjegimi',
      bs: 'Objašnjenje',
      de: 'Erklärung'
    },
    quizComplete: {
      en: 'Quiz Complete!',
      sq: 'Kuizi Përfundoi!',
      bs: 'Kviz završen!',
      de: 'Quiz abgeschlossen!'
    },
    yourScore: {
      en: 'Your Score',
      sq: 'Rezultati Juaj',
      bs: 'Vaš rezultat',
      de: 'Dein Ergebnis'
    },
    correctAnswers: {
      en: 'Correct Answers',
      sq: 'Përgjigje të Sakta',
      bs: 'Tačni odgovori',
      de: 'Richtige Antworten'
    },
    earnedPoints: {
      en: 'Earned Points',
      sq: 'Pikët e Fituara',
      bs: 'Osvojeni bodovi',
      de: 'Verdiente Punkte'
    },
    tryAgain: {
      en: 'Try Again',
      sq: 'Provo Përsëri',
      bs: 'Pokušaj ponovo',
      de: 'Nochmal versuchen'
    },
    reviewAnswers: {
      en: 'Review Answers',
      sq: 'Rishiko Përgjigjet',
      bs: 'Pregledaj odgovore',
      de: 'Antworten überprüfen',
      it: 'Rivedi risposte'
    },
    newQuiz: {
      en: 'New Quiz',
      sq: 'Kuiz i Ri',
      bs: 'Novi kviz',
      de: 'Neues Quiz',
      it: 'Nuovo Quiz'
    },
    quizCompleted: {
      en: 'You\'ve completed this quiz!',
      sq: 'Ju e keni përfunduar këtë kuiz!',
      bs: 'Završili ste ovaj kviz!',
      de: 'Du hast dieses Quiz abgeschlossen!',
      it: 'Hai completato questo quiz!'
    },
    excellent: {
      en: 'Excellent!',
      sq: 'Shkëlqyeshëm!',
      bs: 'Odlično!',
      de: 'Ausgezeichnet!',
      it: 'Eccellente!'
    },
    goodJob: {
      en: 'Good job!',
      sq: 'Punë e mirë!',
      bs: 'Dobar posao!',
      de: 'Gut gemacht!',
      it: 'Ben fatto!'
    },
    keepPracticing: {
      en: 'Keep practicing!',
      sq: 'Vazhdo të ushtrojesh!',
      bs: 'Nastavite vježbati!',
      de: 'Übe weiter!',
      it: 'Continua a esercitarti!'
    },
    watchAdForPoints: {
      en: 'Watch Ad to Earn Extra Points',
      sq: 'Shiko reklamën për të fituar pikë shtesë',
      bs: 'Pogledaj reklamu za dodatne bodove',
      de: 'Werbung ansehen für Extra-Punkte',
      it: 'Guarda la pubblicità per guadagnare punti extra'
    },
    completeAdForBonus: {
      en: 'Complete a short ad to earn bonus points',
      sq: 'Përfundo një reklamë të shkurtër për të fituar pikë bonus',
      bs: 'Završi kratku reklamu za bonus bodove',
      de: 'Schließe eine kurze Werbung ab, um Bonuspunkte zu erhalten',
      it: 'Completa un breve annuncio per guadagnare punti bonus'
    },
    adCompleted: {
      en: 'Ad completed!',
      sq: 'Reklama përfundoi!',
      bs: 'Reklama završena!',
      de: 'Werbung abgeschlossen!',
      it: 'Pubblicità completata!'
    },
    pointsEarned: {
      en: 'You earned {points} points!',
      sq: 'Ju fituat {points} pikë!',
      bs: 'Zaradili ste {points} bodova!',
      de: 'Du hast {points} Punkte verdient!',
      it: 'Hai guadagnato {points} punti!'
    },
    badgeEarned: {
      en: 'Badge earned!',
      sq: 'Medalje e fituar!',
      bs: 'Bedž osvojen!',
      de: 'Abzeichen verdient!',
      it: 'Badge guadagnato!'
    },
    bonusPoints: {
      en: 'bonus points',
      sq: 'pikë bonus',
      bs: 'bonus bodova',
      de: 'Bonuspunkte',
      it: 'punti bonus'
    },
    bonusEarned: {
      en: 'Bonus points earned!',
      sq: 'Pikë bonus fituar!',
      bs: 'Bonus bodovi osvojeni!',
      de: 'Bonuspunkte verdient!',
      it: 'Punti bonus guadagnati!'
    }
  },
  profile: {
    profile: {
      en: 'Profile',
      sq: 'Profili',
      bs: 'Profil',
      de: 'Profil'
    },
    editProfile: {
      en: 'Edit Profile',
      sq: 'Ndrysho Profilin',
      bs: 'Uredi profil',
      de: 'Profil bearbeiten'
    },
    username: {
      en: 'Username',
      sq: 'Emri i përdoruesit',
      bs: 'Korisničko ime',
      de: 'Benutzername'
    },
    displayName: {
      en: 'Display Name',
      sq: 'Emri që shfaqet',
      bs: 'Prikazano ime',
      de: 'Anzeigename'
    },
    email: {
      en: 'Email',
      sq: 'Email',
      bs: 'Email',
      de: 'E-mail'
    },
    role: {
      en: 'Role',
      sq: 'Roli',
      bs: 'Uloga',
      de: 'Rolle'
    },
    achievements: {
      en: 'Achievements',
      sq: 'Arritjet',
      bs: 'Dostignuća',
      de: 'Erfolge'
    },
    yourAchievements: {
      en: 'Your Achievements',
      sq: 'Arritjet tuaja',
      bs: 'Vaša dostignuća',
      de: 'Deine Erfolge'
    },
    noAchievements: {
      en: 'No achievements yet. Complete quizzes to earn achievements!',
      sq: 'Ende nuk ka arritje. Plotësoni kuize për të fituar arritje!',
      bs: 'Još nema dostignuća. Završite kvizove da biste zaradili dostignuća!',
      de: 'Noch keine Erfolge. Schließe Quizze ab, um Erfolge zu erzielen!'
    },
    totalPoints: {
      en: 'Total Points',
      sq: 'Pikët Totale',
      bs: 'Ukupno bodova',
      de: 'Gesamtpunkte'
    },
    completedQuizzes: {
      en: 'Completed Quizzes',
      sq: 'Kuizet e Përfunduara',
      bs: 'Završeni kvizovi',
      de: 'Abgeschlossene Quizze'
    },
    updateProfile: {
      en: 'Update Profile',
      sq: 'Përditëso Profilin',
      bs: 'Ažuriraj profil',
      de: 'Profil aktualisieren'
    },
    profileUpdated: {
      en: 'Profile updated successfully!',
      sq: 'Profili u përditësua me sukses!',
      bs: 'Profil uspješno ažuriran!',
      de: 'Profil erfolgreich aktualisiert!'
    }
  },
  parent: {
    parentDashboard: {
      en: 'Parent Dashboard',
      sq: 'Paneli i Prindit',
      bs: 'Roditeljska kontrolna tabla',
      de: 'Eltern-Dashboard'
    },
    yourChildren: {
      en: 'Your Children',
      sq: 'Fëmijët tuaj',
      bs: 'Vaša djeca',
      de: 'Deine Kinder'
    },
    addChild: {
      en: 'Add Child',
      sq: 'Shto Fëmijë',
      bs: 'Dodaj dijete',
      de: 'Kind hinzufügen'
    },
    viewProgress: {
      en: 'View Progress',
      sq: 'Shiko Progresin',
      bs: 'Pogledaj napredak',
      de: 'Fortschritt anzeigen'
    },
    childProgress: {
      en: 'Child Progress',
      sq: 'Progresi i Fëmijës',
      bs: 'Napredak djeteta',
      de: 'Fortschritt des Kindes'
    },
    overallProgress: {
      en: 'Overall Progress',
      sq: 'Progresi i Përgjithshëm',
      bs: 'Ukupni napredak',
      de: 'Gesamtfortschritt'
    },
    recentActivity: {
      en: 'Recent Activity',
      sq: 'Aktiviteti i Fundit',
      bs: 'Nedavna aktivnost',
      de: 'Letzte Aktivitäten'
    },
    completedQuizzes: {
      en: 'Completed Quizzes',
      sq: 'Kuizet e Përfunduara',
      bs: 'Završeni kvizovi',
      de: 'Abgeschlossene Quizze'
    },
    averageScore: {
      en: 'Average Score',
      sq: 'Rezultati Mesatar',
      bs: 'Prosječni rezultat',
      de: 'Durchschnittliche Punktzahl'
    },
    totalPoints: {
      en: 'Total Points',
      sq: 'Pikët Totale',
      bs: 'Ukupni bodovi',
      de: 'Gesamtpunkte'
    },
    noChildrenYet: {
      en: 'No children linked to your account yet.',
      sq: 'Ende nuk ka fëmijë të lidhur me llogarinë tuaj.',
      bs: 'Još uvijek nema djece povezane s vašim računom.',
      de: 'Noch keine Kinder mit Ihrem Konto verknüpft.'
    },
    addChildInstructions: {
      en: 'To add a child, enter their username below:',
      sq: 'Për të shtuar një fëmijë, vendosni emrin e tyre të përdoruesit më poshtë:',
      bs: 'Da biste dodali dijete, unesite njihovo korisničko ime ispod:',
      de: 'Um ein Kind hinzuzufügen, geben Sie unten den Benutzernamen ein:'
    },
    childUsername: {
      en: 'Child\'s Username',
      sq: 'Emri i përdoruesit të fëmijës',
      bs: 'Korisničko ime djeteta',
      de: 'Benutzername des Kindes'
    },
    link: {
      en: 'Link',
      sq: 'Lidh',
      bs: 'Poveži',
      de: 'Verknüpfen'
    },
    unlink: {
      en: 'Unlink',
      sq: 'Çlidh',
      bs: 'Odveži',
      de: 'Verknüpfung aufheben'
    },
    childLinked: {
      en: 'Child linked successfully!',
      sq: 'Fëmija u lidh me sukses!',
      bs: 'Dijete uspješno povezano!',
      de: 'Kind erfolgreich verknüpft!'
    },
    childUnlinked: {
      en: 'Child unlinked successfully!',
      sq: 'Fëmija u çlidh me sukses!',
      bs: 'Dijete uspješno odvezano!',
      de: 'Verknüpfung zum Kind erfolgreich aufgehoben!'
    },
    noRecentActivity: {
      en: 'No recent activity.',
      sq: 'Nuk ka aktivitet të fundit.',
      bs: 'Nema nedavne aktivnosti.',
      de: 'Keine kürzlichen Aktivitäten.'
    }
  },
  badges: {
    allBadges: {
      en: 'All Badges',
      sq: 'Të gjitha Medaljet'
    },
    yourBadges: {
      en: 'Your Badges',
      sq: 'Medaljet Tuaja'
    },
    viewBadges: {
      en: 'View Badges',
      sq: 'Shiko Medaljet'
    },
    badgesEarned: {
      en: 'Badges Earned',
      sq: 'Medaljet e Fituara'
    },
    badgesToEarn: {
      en: 'Badges to Earn',
      sq: 'Medaljet për të Fituar'
    },
    noBadges: {
      en: 'No badges yet. Complete quizzes to earn badges!',
      sq: 'Ende nuk ka medalje. Plotësoni kuize për të fituar medalje!'
    },
    beginnerBadge: {
      en: 'Beginner',
      sq: 'Fillestar'
    },
    intermediateBadge: {
      en: 'Intermediate',
      sq: 'I ndërmjetëm'
    },
    advancedBadge: {
      en: 'Advanced',
      sq: 'I Avancuar'
    },
    scholarBadge: {
      en: 'Scholar',
      sq: 'Dijetar'
    },
    perfectScore: {
      en: 'Perfect Score',
      sq: 'Rezultat Perfekt'
    },
    quickLearner: {
      en: 'Quick Learner',
      sq: 'Mësues i Shpejtë'
    },
    dedicated: {
      en: 'Dedicated',
      sq: 'I Përkushtuar'
    }
  },
  /* Original topics section already defined above */
  common: {
    cartoons: {
      en: 'Cartoons',
      sq: 'Filma vizatimorë',
      bs: 'Crtani filmovi',
      de: 'Zeichentrickfilme',
      it: 'Cartoni animati'
    },
    english: {
      en: 'English',
      sq: 'Anglisht',
      bs: 'Engleski',
      de: 'Englisch',
      it: 'Inglese'
    },
    albanian: {
      en: 'Albanian',
      sq: 'Shqip',
      bs: 'Albanski',
      de: 'Albanisch',
      it: 'Albanese'
    },
    bosnian: {
      en: 'Bosnian',
      sq: 'Boshnjake',
      bs: 'Bosanski',
      de: 'Bosnisch',
      it: 'Bosniaco'
    },
    german: {
      en: 'German',
      sq: 'Gjermanisht',
      bs: 'Njemački',
      de: 'Deutsch',
      it: 'Tedesco'
    },
    italian: {
      en: 'Italian',
      sq: 'Italisht',
      bs: 'Italijanski',
      de: 'Italienisch',
      it: 'Italiano'
    },
    categories: {
      en: 'Categories',
      sq: 'Kategoritë',
      bs: 'Kategorije',
      de: 'Kategorien',
      it: 'Categorie'
    },
    exploreTopics: {
      en: 'Explore Topics',
      sq: 'Eksploroni Temat',
      bs: 'Istražite teme',
      de: 'Themen erkunden',
      it: 'Esplora Argomenti'
    },
    quizFolder: {
      en: 'QUIZ',
      sq: 'KUIZ',
      bs: 'KVIZ',
      de: 'QUIZ',
      it: 'QUIZ'
    },
    suraFolder: {
      en: 'THE QURAN FOR CHILDREN',
      sq: 'KURANI PËR FËMIJËT',
      bs: 'KURAN ZA DJECU',
      de: 'DER KORAN FÜR KINDER',
      it: 'IL CORANO PER BAMBINI'
    },
    storiesFolder: {
      en: 'STORIES FOR CHILDREN',
      sq: 'TREGIME PËR FËMIJËT',
      bs: 'PRIČE ZA DJECU',
      de: 'GESCHICHTEN FÜR KINDER',
      it: 'STORIE PER BAMBINI'
    },
    ilmihalFolder: {
      en: 'CATECHISM',
      sq: 'ILMIHAL',
      bs: 'ILMIHAL',
      de: 'KATECHISMUS',
      it: 'CATECHISMO'
    },
    quizzes: {
      en: 'Quizzes',
      sq: 'Kuizet',
      bs: 'Kvizovi',
      de: 'Quizze',
      it: 'Quiz'
    },
    quizzesAvailable: {
      en: 'Quizzes Available',
      sq: 'Kuizet në Dispozicion',
      bs: 'Dostupni kvizovi',
      de: 'Verfügbare Quizze',
      it: 'Quiz Disponibili'
    },
    selectQuiz: {
      en: 'Select a Quiz',
      sq: 'Zgjidhni një Kuiz',
      bs: 'Odaberite kviz',
      de: 'Wähle ein Quiz',
      it: 'Seleziona un Quiz'
    },
    difficulty: {
      en: 'Difficulty',
      sq: 'Vështirësia',
      bs: 'Težina',
      de: 'Schwierigkeitsgrad',
      it: 'Difficoltà'
    },
    beginner: {
      en: 'Beginner',
      sq: 'Fillestar',
      bs: 'Početnik',
      de: 'Anfänger',
      it: 'Principiante'
    },
    intermediate: {
      en: 'Intermediate',
      sq: 'I ndërmjetëm',
      bs: 'Srednji nivo',
      de: 'Mittelstufe',
      it: 'Intermedio'
    },
    advanced: {
      en: 'Advanced',
      sq: 'I Avancuar',
      bs: 'Napredni',
      de: 'Fortgeschritten',
      it: 'Avanzato'
    },
    noQuizzes: {
      en: 'No quizzes available for this category yet.',
      sq: 'Ende nuk ka kuize të disponueshme për këtë kategori.',
      bs: 'Još nema dostupnih kvizova za ovu kategoriju.',
      de: 'Für diese Kategorie sind noch keine Quizze verfügbar.',
      it: 'Non ci sono ancora quiz disponibili per questa categoria.'
    },
    questions: {
      en: 'Questions',
      sq: 'Pyetjet',
      bs: 'Pitanja',
      de: 'Fragen',
      it: 'Domande'
    }
  },
  /* User interface elements */
  ui: {
    menu: {
      en: 'Menu',
      sq: 'Menyja',
      bs: 'Meni',
      de: 'Menü',
      it: 'Menu'
    },
    play: {
      en: 'Play',
      sq: 'Luaj',
      bs: 'Igraj',
      de: 'Spielen',
      it: 'Gioca'
    },
    learn: {
      en: 'Learn',
      sq: 'Mëso',
      bs: 'Uči',
      de: 'Lernen',
      it: 'Impara'
    },
    discover: {
      en: 'Discover',
      sq: 'Zbulo',
      bs: 'Otkrij',
      de: 'Entdecken',
      it: 'Scopri'
    },
    explore: {
      en: 'Explore',
      sq: 'Eksploro',
      bs: 'Istraži',
      de: 'Entdecken',
      it: 'Esplora'
    },
    search: {
      en: 'Search',
      sq: 'Kërko',
      bs: 'Pretraga',
      de: 'Suchen',
      it: 'Cerca'
    },
    home: {
      en: 'Home',
      sq: 'Kryefaqja',
      bs: 'Početna',
      de: 'Startseite',
      it: 'Home'
    },
    topics: {
      en: 'Topics',
      sq: 'Temat',
      bs: 'Teme',
      de: 'Themen',
      it: 'Argomenti'
    },
    quizzes: {
      en: 'Quizzes',
      sq: 'Kuizet',
      bs: 'Kvizovi',
      de: 'Quizze',
      it: 'Quiz'
    },
    quiz: {
      en: 'Quiz',
      sq: 'Kuiz',
      bs: 'Kviz',
      de: 'Quiz',
      it: 'Quiz'
    },
    quran: {
      en: 'Quran',
      sq: 'Kurani',
      bs: 'Kuran',
      de: 'Koran',
      it: 'Corano'
    },
    stories: {
      en: 'Stories',
      sq: 'Tregime',
      bs: 'Priče',
      de: 'Geschichten',
      it: 'Storie'
    },
    catechism: {
      en: 'Catechism',
      sq: 'Ilmihal',
      bs: 'Katekizam',
      de: 'Katechismus-Ilmihal',
      it: 'Catechismo'
    },
    profile: {
      en: 'Profile',
      sq: 'Profili',
      bs: 'Profil',
      de: 'Profil',
      it: 'Profilo'
    },
    donate: {
      en: 'Donate',
      sq: 'Dhuro',
      bs: 'Doniraj',
      de: 'Spenden',
      it: 'Dona'
    },
    dashboard: {
      en: 'Dashboard',
      sq: 'Paneli',
      bs: 'Kontrolna tabla',
      de: 'Dashboard',
      it: 'Pannello di controllo'
    },
    settings: {
      en: 'Settings',
      sq: 'Cilësimet',
      bs: 'Postavke',
      de: 'Einstellungen',
      it: 'Impostazioni'
    },
    about: {
      en: 'About',
      sq: 'Rreth Nesh',
      bs: 'O nama',
      de: 'Über uns',
      it: 'Chi siamo'
    },
    language: {
      en: 'Language',
      sq: 'Gjuha',
      bs: 'Jezik',
      de: 'Sprache',
      it: 'Lingua'
    },
    english: {
      en: 'English',
      sq: 'Anglisht',
      bs: 'Engleski',
      de: 'Englisch',
      it: 'Inglese'
    },
    albanian: {
      en: 'Albanian',
      sq: 'Shqip',
      bs: 'Albanski',
      de: 'Albanisch',
      it: 'Albanese'
    },
    bosnian: {
      en: 'Bosnian',
      sq: 'Boshnjake',
      bs: 'Bosanski',
      de: 'Bosnisch',
      it: 'Bosniaco'
    },
    german: {
      en: 'German',
      sq: 'Gjermanisht',
      bs: 'Njemački',
      de: 'Deutsch',
      it: 'Tedesco'
    },
    italian: {
      en: 'Italian',
      sq: 'Italisht',
      bs: 'Italijanski',
      de: 'Italienisch',
      it: 'Italiano'
    },
    qiblaCompass: {
      en: 'Qibla Compass',
      sq: 'Kompasi i Kiblës',
      bs: 'Kibla Kompas',
      de: 'Qibla-Kompass',
      it: 'Bussola della Qibla'
    },
    qiblaDescription: {
      en: 'Find the direction to the Holy Kaaba in Mecca',
      sq: 'Gjeni drejtimin drejt Qabes së Shenjtë në Mekë',
      bs: 'Pronađite smjer prema Svetoj Kabi u Meki',
      de: 'Finden Sie die Richtung zur Heiligen Kaaba in Mekka',
      it: 'Trova la direzione verso la Santa Kaaba a La Mecca'
    },
    enableCompass: {
      en: 'Enable Compass',
      sq: 'Aktivizo Kompasin',
      bs: 'Omogući Kompas',
      de: 'Kompass aktivieren',
      it: 'Attiva bussola'
    },
    findingQibla: {
      en: 'Finding Qibla direction...',
      sq: 'Duke gjetur drejtimin e Kiblës...',
      bs: 'Pronalaženje smjera Kible...',
      de: 'Qibla-Richtung wird ermittelt...',
      it: 'Ricerca della direzione della Qibla...'
    },
    qiblaDirection: {
      en: 'Qibla direction',
      sq: 'Drejtimi i Kiblës',
      bs: 'Smjer Kible',
      de: 'Qibla-Richtung',
      it: 'Direzione della Qibla'
    },
    yourHeading: {
      en: 'Your heading',
      sq: 'Koka juaj',
      bs: 'Vaš smjer',
      de: 'Ihre Ausrichtung',
      it: 'La tua direzione'
    },
    watch: {
      en: 'Watch',
      sq: 'Shiko',
      bs: 'Gledaj',
      de: 'Ansehen',
      it: 'Guarda'
    }
  },
  cartoons: {
    title: {
      en: 'Islamic Cartoons for Kids',
      bs: 'Islamski Crtani Filmovi za Djecu',
      sq: 'Filma Vizatimorë Islamikë për Fëmijët',
      de: 'Islamische Zeichentrickfilme für Kinder',
      it: 'Cartoni Animati Islamici per Bambini'
    },
    back: {
      en: 'Back',
      bs: 'Nazad',
      sq: 'Kthehu',
      de: 'Zurück',
      it: 'Indietro'
    },
    years: {
      en: 'years',
      bs: 'godina',
      sq: 'vjeç',
      de: 'Jahre',
      it: 'anni'
    },
    comingSoon: {
      en: 'New cartoons will be added regularly. Check back soon!',
      bs: 'Novi crtani filmovi će biti dodavani redovno. Provjerite uskoro!',
      sq: 'Filma të rinj vizatimorë do të shtohen rregullisht. Kontrolloni së shpejti!',
      de: 'Neue Zeichentrickfilme werden regelmäßig hinzugefügt. Schauen Sie bald wieder vorbei!',
      it: 'Nuovi cartoni animati verranno aggiunti regolarmente. Controlla presto!'
    },
    // Cartoon titles
    alhamdulillahTitle: {
      en: 'Alhamdulillah, Bismillah, InshaAllah | Islamic Series & Songs For Kids | Omar & Hana English',
      bs: 'Elhamdulillah, Bismillah, InšaAllah | Islamska serija i pjesme za djecu | Omar i Hana',
      sq: 'Alhamdulillah, Bismillah, InshaAllah | Seri dhe këngë islamike për fëmijë | Omar dhe Hana',
      de: 'Alhamdulillah, Bismillah, InshaAllah | Islamische Serie und Lieder für Kinder | Omar und Hana',
      it: 'Alhamdulillah, Bismillah, InshaAllah | Serie e canzoni islamiche per bambini | Omar e Hana'
    },
    alhamdulillahDescription: {
      en: 'Learn important Islamic phrases with fun animations and songs designed for children.',
      bs: 'Naučite važne islamske fraze kroz zabavne animacije i pjesme namijenjene djeci.',
      sq: 'Mësoni fraza të rëndësishme islamike me animacione dhe këngë argëtuese për fëmijë.',
      de: 'Lerne wichtige islamische Phrasen mit lustigen Animationen und Liedern für Kinder.',
      it: 'Impara frasi islamiche importanti con animazioni divertenti e canzoni per bambini.'
    },
    bacaanSurahTitle: {
      en: 'Bacaan Surah Pendek, Al-Fatihah & 4Qul | Omar & Hana',
      bs: 'Čitanje kratkih sura, Al-Fatiha i 4 Kul | Omar i Hana',
      sq: 'Leximi i sureve të shkurtra, Al-Fatihah dhe 4 Kul | Omar dhe Hana',
      de: 'Rezitation kurzer Suren, Al-Fatihah und 4 Kul | Omar und Hana',
      it: 'Recitazione di sure brevi, Al-Fatihah e 4 Kul | Omar e Hana'
    },
    bacaanSurahDescription: {
      en: 'Listen to beautiful recitations of short Surahs including Al-Fatihah and the four Quls.',
      bs: 'Slušajte prekrasne recitacije kratkih sura uključujući Al-Fatihu i četiri Kula.',
      sq: 'Dëgjoni recitacione të bukura të sureve të shkurtra duke përfshirë Al-Fatihah dhe katër Kul.',
      de: 'Hören Sie schöne Rezitationen kurzer Suren einschließlich Al-Fatihah und der vier Kul.',
      it: 'Ascolta bellissime recitazioni di sure brevi incluse Al-Fatihah e le quattro Kul.'
    },
    azanTitle: {
      en: 'Azan for kids | Beautiful call to prayer | YouQaria Adhan',
      bs: 'Ezan za djecu | Prekrasan poziv na molitvu | YouQaria Ezan',
      sq: 'Ezani për fëmijë | Thirrje e bukur për namaz | YouQaria Ezani',
      de: 'Azan für Kinder | Schöner Gebetsruf | YouQaria Adhan',
      it: 'Azan per bambini | Bella chiamata alla preghiera | YouQaria Adhan'
    },
    azanDescription: {
      en: 'A beautiful Adhan (call to prayer) animation that helps children learn about prayer times.',
      bs: 'Prekrasna animacija ezana (poziv na molitvu) koja pomaže djeci da nauče o vremenima molitve.',
      sq: 'Një animacion i bukur i ezanit (thirrje për namaz) që ndihmon fëmijët të mësojnë për kohët e namazit.',
      de: 'Eine schöne Adhan (Gebetsruf) Animation, die Kindern hilft, die Gebetszeiten zu lernen.',
      it: 'Una bellissima animazione di Adhan (chiamata alla preghiera) che aiuta i bambini a imparare gli orari di preghiera.'
    },
    namesOfAllahTitle: {
      en: '99 Name of Allah | Asma - UL- Husna | Islamic video',
      bs: '99 imena Allaha | Esma-ul-Husna | Islamski video',
      sq: '99 emra të Allahut | Esma-ul-Husna | Video islamik',
      de: '99 Namen Allahs | Asma-ul-Husna | Islamisches Video',
      it: '99 nomi di Allah | Asma-ul-Husna | Video islamico'
    },
    namesOfAllahDescription: {
      en: 'Learn the beautiful 99 names of Allah through this engaging animated video for children.',
      bs: 'Naučite prekrasnih 99 imena Allaha kroz ovaj zanimljiv animirani video za djecu.',
      sq: 'Mësoni 99 emrat e bukur të Allahut përmes këtij videoje tërheqës animuar për fëmijë.',
      de: 'Lerne die schönen 99 Namen Allahs durch dieses fesselnde animierte Video für Kinder.',
      it: 'Impara i bellissimi 99 nomi di Allah attraverso questo coinvolgente video animato per bambini.'
    },
    ayatulKursiTitle: {
      en: 'Let\'s Learn Ayatul Kursi with Laith & Layla!',
      bs: 'Naučimo Ayatul Kursi sa Laithom i Laylom!',
      sq: 'Le të Mësojmë Ayatul Kursi me Laith dhe Layla!',
      de: 'Lernen wir Ayatul Kursi mit Laith und Layla!',
      it: 'Impariamo Ayatul Kursi con Laith e Layla!'
    },
    ayatulKursiDescription: {
      en: 'Join Laith and Layla as they learn Ayatul Kursi in this fun and educational cartoon.',
      bs: 'Pridružite se Laithu i Layli dok uče Ayatul Kursi u ovom zabavnom i edukativnom crtanom filmu.',
      sq: 'Bashkohuni me Laith dhe Layla ndërsa mësojnë Ayatul Kursi në këtë film të animuar argëtues dhe edukativ.',
      de: 'Begleite Laith und Layla beim Lernen von Ayatul Kursi in diesem lustigen und lehrreichen Cartoon.',
      it: 'Unisciti a Laith e Layla mentre imparano Ayatul Kursi in questo cartone divertente ed educativo.'
    },
    howToPrayTitle: {
      en: 'How to pray 2 Rakat (units) - Step by Step Guide | From Time to Pray with Zaky',
      bs: 'Kako klanjati 2 rekata (jedinice) - Vodič korak po korak | Od vremena za molitvu sa Zakyjem',
      sq: 'Si të falesh 2 rekate (njësi) - Udhëzues hap pas hapi | Nga koha për të falur me Zaky',
      de: 'Wie man 2 Rakat (Einheiten) betet - Schritt-für-Schritt-Anleitung | Von der Zeit zum Beten mit Zaky',
      it: 'Come pregare 2 Rakat (unità) - Guida passo dopo passo | Dal tempo di pregare con Zaky'
    },
    howToPrayDescription: {
      en: 'A detailed step-by-step guide showing children how to perform 2 Rakat of prayer correctly.',
      bs: 'Detaljan vodič korak po korak koji pokazuje djeci kako ispravno obaviti 2 rekata molitve.',
      sq: 'Një udhëzues i detajuar hap pas hapi që u tregon fëmijëve si të kryejnë 2 rekate namazi në mënyrë të saktë.',
      de: 'Eine detaillierte Schritt-für-Schritt-Anleitung, die Kindern zeigt, wie man 2 Rakat korrekt betet.',
      it: 'Una guida dettagliata passo dopo passo che mostra ai bambini come eseguire correttamente 2 Rakat di preghiera.'
    }
  }
};

// Quiz content translations
export const quizContentTranslations = {
  // Islamic History quiz
  islamicHistory: {
    title: {
      en: 'History of Islam',
      sq: 'Historia e Islamit', 
      bs: 'Historija Islama',
      de: 'Geschichte des Islam',
      it: "Storia dell'Islam"
    },
    questions: [
      {
        text: {
          en: 'What special journey did Prophet Muhammad (PBUH) make from Makkah to Madinah?',
          sq: 'Çfarë udhëtimi të veçantë bëri Profeti Muhamed (a.s.) nga Meka në Medinë?',
          bs: 'Koje posebno putovanje je Poslanik Muhammed (s.a.w.s.) napravio iz Mekke u Medinu?',
          de: 'Welche besondere Reise unternahm Prophet Muhammad (s.a.w.) von Mekka nach Medina?',
          it: 'Quale viaggio speciale fece il Profeta Muhammad (PBUH) da Mecca a Medina?'
        },
        options: [
          {
            en: 'The Hajj',
            sq: 'Haxhi',
            bs: 'Hadždž',
            de: 'Die Hadsch',
            it: 'Hajj'
          },
          {
            en: 'The Hijra',
            sq: 'Hixhret',
            bs: 'Hidžret',
            de: 'Die Hidschra',
            it: 'Hijra'
          },
          {
            en: 'The Umrah',
            sq: 'Umre',
            bs: 'Umre',
            de: 'Die Umrah',
            it: 'Umrah'
          },
          {
            en: 'The Isra',
            sq: 'Isra',
            bs: 'Isra',
            de: 'Die Isra',
            it: 'Isra'
          }
        ],
        correctOption: 1,
        explanation: {
          en: 'The Hijra was when Prophet Muhammad (PBUH) and his friends moved from Makkah to Madinah. This special journey marked the beginning of the Islamic calendar!',
          sq: 'Hixhreti ishte kur Profeti Muhamed (a.s.) dhe shokët e tij u shpërngulën nga Meka në Medinë. Ky udhëtim i veçantë shënoi fillimin e kalendarit islam!',
          bs: 'Hidžret je bio kada se Poslanik Muhammed (s.a.w.s.) i njegovi prijatelji preselili iz Mekke u Medinu. Ovo posebno putovanje označilo je početak islamskog kalendara!',
          de: 'Die Hidschra war, als Prophet Muhammad (s.a.w.) und seine Freunde von Mekka nach Medina zogen. Diese besondere Reise markierte den Beginn des islamischen Kalenders!',
          it: 'La Hijra fu quando il Profeta Muhammad (PBUH) e i suoi amici si trasferirono da Mecca a Medina. Questo viaggio speciale segnò l\'inizio del calendario islamico!'
        }
      },
      {
        text: {
          en: 'Who was Prophet Muhammad\'s (PBUH) closest friend who became the first leader after him?',
          sq: 'Kush ishte miku më i afërt i Profetit Muhamed (a.s.) që u bë lideri i parë pas tij?',
          bs: 'Ko je bio najbolji prijatelj Poslanika Muhammeda (s.a.w.s.) koji je postao prvi vođa nakon njega?',
          de: 'Wer war der engste Freund des Propheten Muhammad (s.a.w.), der nach ihm der erste Anführer wurde?',
          it: 'Chi era il più caro amico del Profeta Muhammad (PBUH) che divenne il primo leader dopo di lui?'
        },
        options: [
          {
            en: 'Abu Bakr (RA)',
            sq: 'Ebu Bekr (r.a.)',
            bs: 'Ebu Bekr (r.a.)',
            de: 'Abu Bakr (r.a.)',
            it: 'Abu Bakr (RA)'
          },
          {
            en: 'Umar (RA)',
            sq: 'Umer (r.a.)',
            bs: 'Umer (r.a.)',
            de: 'Umar (r.a.)',
            it: 'Umar (RA)'
          },
          {
            en: 'Uthman (RA)',
            sq: 'Osman (r.a.)',
            bs: 'Osman (r.a.)',
            de: 'Uthman (r.a.)',
            it: 'Uthman (RA)'
          },
          {
            en: 'Ali (RA)',
            sq: 'Ali (r.a.)',
            bs: 'Ali (r.a.)',
            de: 'Ali (r.a.)',
            it: 'Ali (RA)'
          }
        ],
        correctOption: 0,
        explanation: {
          en: 'Abu Bakr (RA) was Prophet Muhammad\'s (PBUH) closest friend and became the first caliph (leader) after him. He was known for being very kind and truthful.',
          sq: 'Ebu Bekr (r.a.) ishte miku më i afërt i Profetit Muhamed (a.s.) dhe u bë halifja i parë (udhëheqësi) pas tij. Ai ishte i njohur si shumë i mirë dhe i vërtetë.',
          bs: 'Ebu Bekr (r.a.) je bio najbolji prijatelj Poslanika Muhammeda (s.a.w.s.) i postao je prvi halifa (vođa) nakon njega. Bio je poznat po tome što je bio vrlo ljubazan i istinoljubiv.',
          de: 'Abu Bakr (r.a.) war Prophet Muhammads (s.a.w.) engster Freund und wurde der erste Kalif (Anführer) nach ihm. Er war bekannt dafür, sehr freundlich und wahrhaftig zu sein.',
          it: 'Abu Bakr (RA) era il più caro amico del Profeta Muhammad (PBUH) e divenne il primo califfo (leader) dopo di lui. Era conosciuto per essere molto gentile e veritiero.'
        }
      },
      {
        text: {
          en: 'What is the name of the special book Muslims read?',
          sq: 'Si quhet libri i veçantë që lexojnë muslimanët?',
          bs: 'Kako se zove posebna knjiga koju čitaju muslimani?',
          de: 'Wie heißt das besondere Buch, das Muslime lesen?',
          it: 'Qual è il nome del libro speciale che leggono i musulmani?'
        },
        options: [
          {
            en: 'Hadith',
            sq: 'Hadith',
            bs: 'Hadis',
            de: 'Hadith',
            it: 'Hadith'
          },
          {
            en: 'Quran',
            sq: 'Kur\'an',
            bs: 'Kur\'an',
            de: 'Koran',
            it: 'Corano'
          },
          {
            en: 'Sunnah',
            sq: 'Sunnet',
            bs: 'Sunnet',
            de: 'Sunna',
            it: 'Sunnah'
          },
          {
            en: 'Fiqh',
            sq: 'Fikh',
            bs: 'Fikh',
            de: 'Fiqh',
            it: 'Fiqh'
          }
        ],
        correctOption: 1,
        explanation: {
          en: 'The Quran is the special book that Muslims read. It contains Allah\'s words and was revealed to Prophet Muhammad (PBUH) by Angel Jibreel (Gabriel).',
          sq: 'Kur\'ani është libri i veçantë që lexojnë muslimanët. Ai përmban fjalët e Allahut dhe iu shpall Profetit Muhamed (a.s.) nga Engjëlli Xhibreel (Gabrieli).',
          bs: 'Kur\'an je posebna knjiga koju čitaju muslimani. Sadrži Allahove riječi i objavljen je Poslaniku Muhamedu (s.a.w.s.) preko anđela Džibrila (Gabriela).',
          de: 'Der Koran ist das besondere Buch, das Muslime lesen. Es enthält Allahs Worte und wurde dem Propheten Muhammad (s.a.w.) durch den Engel Dschibril (Gabriel) offenbart.',
          it: 'Il Corano è il libro speciale che leggono i musulmani. Contiene le parole di Allah e fu rivelato al Profeta Muhammad (PBUH) dall\'Angelo Jibreel (Gabriele).'
        }
      },
      {
        text: {
          en: 'Which building in Makkah do Muslims pray towards?',
          sq: 'Ndaj cilit ndërtim në Mekë falen muslimanët?',
          bs: 'Prema kojoj građevini u Mekki se okre​će muslimani kada se mole?',
          de: 'Zu welchem Gebäude in Mekka beten Muslime?',
          it: 'Verso quale edificio a Mecca pregano i musulmani?'
        },
        options: [
          {
            en: 'The Kaaba',
            sq: 'Qaba',
            bs: 'Kaba',
            de: 'Die Kaaba',
            it: 'Kaaba'
          },
          {
            en: 'Masjid Al-Nabawi',
            sq: 'Mesxhidi en-Nebevi',
            bs: 'Medžid en-Nebevi',
            de: 'Masjid Al-Nabawi',
            it: 'Masjid Al-Nabawi'
          },
          {
            en: 'Dome of the Rock',
            sq: 'Kubeja e Shkëmbit',
            bs: 'Kupola na Stijeni',
            de: 'Felsendom',
            it: 'Cupola della Roccia'
          },
          {
            en: 'Masjid Al-Aqsa',
            sq: 'Mesxhidi el-Aksa',
            bs: 'Medžid el-Aksa',
            de: 'Masjid Al-Aqsa',
            it: 'Masjid Al-Aqsa'
          }
        ],
        correctOption: 0,
        explanation: {
          en: 'The Kaaba is the special cube-shaped building in Makkah that Muslims around the world face when they pray. It was built by Prophet Ibrahim (AS) and his son Ismail (AS).',
          sq: 'Qaba është ndërtimi i veçantë në formë kubi në Mekë që muslimanët në mbarë botën e përballojnë kur falen. Ajo u ndërtua nga Profeti Ibrahim (a.s.) dhe djali i tij Ismail (a.s.).',
          bs: 'Kaba je posebna građevina u obliku kocke u Mekki prema kojoj se okreću muslimani širom svijeta kada se mole. Sagradili su je prorok Ibrahim (a.s.) i njegov sin Ismail (a.s.).',
          de: 'Die Kaaba ist das besondere würfelförmige Gebäude in Mekka, zu dem sich Muslime auf der ganzen Welt beim Gebet wenden. Sie wurde von Prophet Ibrahim (a.s.) und seinem Sohn Ismail (a.s.) erbaut.',
          it: 'La Kaaba è l\'edificio speciale a forma di cubo a Mecca verso cui si rivolgono i musulmani di tutto il mondo quando pregano. Fu costruita dal Profeta Ibrahim (AS) e suo figlio Ismail (AS).'
        }
      },
      {
        text: {
          en: 'What do Muslims say before they start to pray?',
          sq: 'Çfarë thonë muslimanët para se të fillojnë të falen?',
          bs: 'Šta kažu muslimani prije nego što počnu da se mole?',
          de: 'Was sagen Muslime, bevor sie mit dem Gebet beginnen?',
          it: 'Cosa dicono i musulmani prima di iniziare a pregare?'
        },
        options: [
          {
            en: 'SubhanAllah',
            sq: 'Subhanallah',
            bs: 'Subhanallah',
            de: 'Subhanallah',
            it: 'SubhanAllah'
          },
          {
            en: 'Alhamdulillah',
            sq: 'Elhamdulillah',
            bs: 'Elhamdulillah',
            de: 'Alhamdulillah',
            it: 'Alhamdulillah'
          },
          {
            en: 'Allahu Akbar',
            sq: 'Allahu Ekber',
            bs: 'Allahu Ekber',
            de: 'Allahu Akbar',
            it: 'Allahu Akbar'
          },
          {
            en: 'Astaghfirullah',
            sq: 'Estağfirullah',
            bs: 'Estağfirullah',
            de: 'Astaghfirullah',
            it: 'Astaghfirullah'
          }
        ],
        correctOption: 2,
        explanation: {
          en: 'Muslims say \'Allahu Akbar\' (Allah is the Greatest) when they start to pray. This reminds them that Allah is greater than anything else in their lives.',
          sq: 'Muslimanët thonë \'Allahu Ekber\' (Allahu është më i Madhi) kur fillojnë të falen. Kjo u kujton se Allahu është më i madh se çdo gjë tjetër në jetën e tyre.',
          bs: 'Muslimani kažu \'Allahu Ekber\' (Allah je najveći) kada počnu da se mole. To ih podsjeća da je Allah veći od bilo čega drugog u njihovom životu.',
          de: 'Muslime sagen \'Allahu Akbar\' (Allah ist der Größte), wenn sie mit dem Gebet beginnen. Das erinnert sie daran, dass Allah größer ist als alles andere in ihrem Leben.',
          it: 'I musulmani dicono \'Allahu Akbar\' (Allah è il più Grande) quando iniziano a pregare. Questo ricorda loro che Allah è più grande di qualsiasi altra cosa nella loro vita.'
        }
      },
      {
        text: {
          en: 'What do we call the month when Muslims fast during daylight hours?',
          sq: 'Si e quajmë muajin kur muslimanët agjërojnë gjatë orëve të ditës?',
          bs: 'Kako se zove mjesec kada muslimani poste tokom dana?',
          de: 'Wie nennen wir den Monat, in dem Muslime während der Tagesstunden fasten?',
          it: 'Come chiamiamo il mese in cui i musulmani digiunano durante le ore diurne?'
        },
        options: [
          {
            en: 'Muharram',
            sq: 'Muharrem',
            bs: 'Muharrem',
            de: 'Muharram',
            it: 'Muharram'
          },
          {
            en: 'Rajab',
            sq: 'Rexheb',
            bs: 'Redžeb',
            de: 'Rajab',
            it: 'Rajab'
          },
          {
            en: 'Shaban',
            sq: 'Shaban',
            bs: 'Šaban',
            de: 'Schaban',
            it: 'Shaban'
          },
          {
            en: 'Ramadan',
            sq: 'Ramazan',
            bs: 'Ramazan',
            de: 'Ramadan',
            it: 'Ramadan'
          }
        ],
        correctOption: 3,
        explanation: {
          en: 'Ramadan is the blessed month when Muslims fast from dawn until sunset. It\'s a time for extra prayers, reading Quran, and being kind to others.',
          sq: 'Ramazani është muaji i bekuar kur muslimanët agjërojnë nga agimi deri në perëndim. Është koha për namaze shtesë, lexim Kur\'ani dhe të qenit të mirë me të tjerët.',
          bs: 'Ramazan je blagosloveni mjesec kada muslimani poste od zore do zalaska sunca. To je vrijeme za dodatne molitve, čitanje Kur\'ana i pokazivanje dobrote prema drugima.',
          de: 'Ramadan ist der gesegnete Monat, in dem Muslime von der Morgendämmerung bis zum Sonnenuntergang fasten. Es ist eine Zeit für zusätzliche Gebete, das Lesen des Korans und freundlich zu anderen zu sein.',
          it: 'Ramadan è il mese benedetto in cui i musulmani digiunano dall\'alba al tramonto. È un momento per preghiere extra, lettura del Corano ed essere gentili con gli altri.'
        }
      },
      {
        text: {
          en: 'What special celebration comes after Ramadan?',
          sq: 'Cila festë e veçantë vjen pas Ramazanit?',
          bs: 'Koja posebna proslava dolazi nakon Ramazana?',
          de: 'Welche besondere Feier kommt nach dem Ramadan?',
          it: 'Quale celebrazione speciale viene dopo il Ramadan?'
        },
        options: [
          {
            en: 'Eid al-Fitr',
            sq: 'Bajrami i Fitër Bajramit',
            bs: 'Bajram',
            de: 'Eid al-Fitr',
            it: 'Eid al-Fitr'
          },
          {
            en: 'Eid al-Adha',
            sq: 'Bajrami i Kurban Bajramit',
            bs: 'Kurban Bajram',
            de: 'Eid al-Adha',
            it: 'Eid al-Adha'
          },
          {
            en: 'Mawlid',
            sq: 'Mevlud',
            bs: 'Mevlud',
            de: 'Mawlid',
            it: 'Mawlid'
          },
          {
            en: 'Laylat al-Qadr',
            sq: 'Lejletu\'l-Kadr',
            bs: 'Lejletu\'l-Kadr',
            de: 'Laylat al-Qadr',
            it: 'Laylat al-Qadr'
          }
        ],
        correctOption: 0,
        explanation: {
          en: 'Eid al-Fitr is the happy celebration that comes after Ramadan. Muslims wear nice clothes, eat special food, give gifts, and spend time with family and friends.',
          sq: 'Bajrami i Fitër Bajramit është festa e gëzuar që vjen pas Ramazanit. Muslimanët vesh rroba të bukura, hanë ushqim të veçantë, japin dhurata dhe kalojnë kohë me familjen dhe miqtë.',
          bs: 'Bajram je sretna proslava koja dolazi nakon Ramazana. Muslimani oblače lijepu odjeću, jedu posebnu hranu, dijele poklone i provode vrijeme s obitelji i prijateljima.',
          de: 'Eid al-Fitr ist die fröhliche Feier, die nach dem Ramadan kommt. Muslime ziehen schöne Kleider an, essen besonderes Essen, geben Geschenke und verbringen Zeit mit Familie und Freunden.',
          it: 'Eid al-Fitr è la celebrazione gioiosa che arriva dopo il Ramadan. I musulmani indossano bei vestiti, mangiano cibi speciali, fanno regali e trascorrono tempo con famiglia e amici.'
        }
      }
    ]
  }
};

// Categories translations
export const categoryTranslations = {
  // Category names
  0: {
    en: 'History of Islam',
    sq: 'Historia e Islamit',
    bs: 'Historija Islama',
    de: 'Geschichte des Islam',
    it: 'Storia dell\'Islam'
  },
  categories: [
    {
      en: "History of Islam",
      sq: "Historia e Islamit",
      bs: "Historija Islama",
      de: "Geschichte des Islam",
      it: "Storia dell'Islam"
    },
    {
      en: "Five Pillars",
      sq: "Pesë Shtyllat",
      bs: "Pet stubova",
      de: "Fünf Säulen",
      it: "Cinque Pilastri"
    },
    {
      en: "Prophets",
      sq: "Profetët",
      bs: "Poslanici",
      de: "Propheten",
      it: "Profeti"
    },
    {
      en: "Quran",
      sq: "Kurani",
      bs: "Kuran",
      de: "Koran",
      it: "Corano"
    }
  ]
};

// Helper function to get a translation
export function getTranslation(
  section: TranslationKeys,
  key: string,
  language: Language = 'en'
): string {
  // Special handling for Bosnian - currently uses English as base
  if (language === 'bs' || (typeof window !== 'undefined' && (window as any).isBosanski)) {
    // First, check if there's a specific Bosnian translation
    try {
      const bsTranslation = translations[section][key]['bs'];
      if (bsTranslation) return bsTranslation;
    } catch (error) {
      // No specific Bosnian translation, will fall back to English
    }
    
    // If no specific Bosnian translation, use English
    try {
      return translations[section][key]['en'];
    } catch (error) {
      return key;
    }
  }
  
  // Normal case for other languages
  try {
    return translations[section][key][language] || translations[section][key]['en'];
  } catch (error) {
    console.error(`Translation not found for ${section}.${key} in ${language}`);
    // Fallback to English if translation not found
    return translations[section][key]['en'] || key;
  }
}

// Helper function to get quiz content translation
export function getQuizContentTranslation(
  quizKey: keyof typeof quizContentTranslations,
  questionIndex: number,
  field: 'text' | 'explanation',
  language: Language = 'en'
): string {
  // Special handling for Bosnian - currently uses English as base
  if (language === 'bs' || (typeof window !== 'undefined' && window.isBosanski)) {
    // First, check if there's a specific Bosnian translation
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex][field] && quizData.questions[questionIndex][field]['bs']) {
        return quizData.questions[questionIndex][field]['bs'];
      }
    } catch (error) {
      // No specific Bosnian translation, will fall back to English
    }
    
    // Fall back to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex][field] && quizData.questions[questionIndex][field]['en']) {
        return quizData.questions[questionIndex][field]['en'];
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  
  // Normal case for other languages
  try {
    const quizData = quizContentTranslations[quizKey];
    if (!quizData || !quizData.questions || !quizData.questions[questionIndex] || 
        !quizData.questions[questionIndex][field]) {
      return '';
    }
    
    if (quizData.questions[questionIndex][field][language]) {
      return quizData.questions[questionIndex][field][language];
    } else if (quizData.questions[questionIndex][field]['en']) {
      return quizData.questions[questionIndex][field]['en'];
    }
    return '';
  } catch (error) {
    console.error(`Quiz translation not found for ${quizKey}, question ${questionIndex}, field ${field} in ${language}`);
    // Fallback to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex][field] && quizData.questions[questionIndex][field]['en']) {
        return quizData.questions[questionIndex][field]['en'];
      }
      return '';
    } catch (e) {
      return '';
    }
  }
}

// Helper function to get quiz option translation
export function getQuizOptionTranslation(
  quizKey: keyof typeof quizContentTranslations,
  questionIndex: number,
  optionIndex: number,
  language: Language = 'en'
): string {
  // Special handling for Bosnian - currently uses English as base
  if (language === 'bs' || (typeof window !== 'undefined' && window.isBosanski)) {
    // First, check if there's a specific Bosnian translation
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex].options && quizData.questions[questionIndex].options[optionIndex] &&
          quizData.questions[questionIndex].options[optionIndex]['bs']) {
        return quizData.questions[questionIndex].options[optionIndex]['bs'];
      }
    } catch (error) {
      // No specific Bosnian translation, will fall back to English
    }
    
    // Fall back to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex].options && quizData.questions[questionIndex].options[optionIndex] &&
          quizData.questions[questionIndex].options[optionIndex]['en']) {
        return quizData.questions[questionIndex].options[optionIndex]['en'];
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  
  // Normal case for other languages
  try {
    const quizData = quizContentTranslations[quizKey];
    if (!quizData || !quizData.questions || !quizData.questions[questionIndex] || 
        !quizData.questions[questionIndex].options || !quizData.questions[questionIndex].options[optionIndex]) {
      return '';
    }
    
    const optionData = quizData.questions[questionIndex].options[optionIndex];
    if (optionData[language]) {
      return optionData[language];
    } else if (optionData['en']) {
      return optionData['en'];
    }
    return '';
  } catch (error) {
    console.error(`Quiz option translation not found for ${quizKey}, question ${questionIndex}, option ${optionIndex} in ${language}`);
    // Fallback to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.questions && quizData.questions[questionIndex] && 
          quizData.questions[questionIndex].options && quizData.questions[questionIndex].options[optionIndex] &&
          quizData.questions[questionIndex].options[optionIndex]['en']) {
        return quizData.questions[questionIndex].options[optionIndex]['en'];
      }
      return '';
    } catch (e) {
      return '';
    }
  }
}

// Helper function to get quiz title translation
export function getQuizTitleTranslation(
  quizKey: keyof typeof quizContentTranslations,
  language: Language = 'en'
): string {
  // Special handling for Bosnian - currently uses English as base
  if (language === 'bs' || (typeof window !== 'undefined' && window.isBosanski)) {
    // First, check if there's a specific Bosnian translation
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.title && quizData.title['bs']) {
        return quizData.title['bs'];
      }
    } catch (error) {
      // No specific Bosnian translation, will fall back to English
    }
    
    // Fall back to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.title && quizData.title['en']) {
        return quizData.title['en'];
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  
  // Normal case for other languages
  try {
    const quizData = quizContentTranslations[quizKey];
    if (!quizData || !quizData.title) {
      return '';
    }
    
    if (quizData.title[language]) {
      return quizData.title[language];
    } else if (quizData.title['en']) {
      return quizData.title['en'];
    }
    return '';
  } catch (error) {
    console.error(`Quiz title translation not found for ${quizKey} in ${language}`);
    // Fallback to English
    try {
      const quizData = quizContentTranslations[quizKey];
      if (quizData && quizData.title && quizData.title['en']) {
        return quizData.title['en'];
      }
      return '';
    } catch (e) {
      return '';
    }
  }
}

// Helper function to get category translation
export function getCategoryTranslation(
  index: number,
  language: Language = 'en'
): string {
  // Special handling for Bosnian - currently uses English as base
  if (language === 'bs' || (typeof window !== 'undefined' && window.isBosanski)) {
    // First, check if there's a specific Bosnian translation
    try {
      if (categoryTranslations && categoryTranslations.categories && 
          categoryTranslations.categories[index] && categoryTranslations.categories[index]['bs']) {
        return categoryTranslations.categories[index]['bs'];
      }
    } catch (error) {
      // No specific Bosnian translation, will fall back to English
    }
    
    // Fall back to English
    try {
      if (categoryTranslations && categoryTranslations.categories && 
          categoryTranslations.categories[index] && categoryTranslations.categories[index]['en']) {
        return categoryTranslations.categories[index]['en'];
      }
      return '';
    } catch (error) {
      return '';
    }
  }
  
  // Normal case for other languages
  try {
    if (!categoryTranslations || !categoryTranslations.categories || 
        !categoryTranslations.categories[index]) {
      return '';
    }
    
    const categoryData = categoryTranslations.categories[index];
    if (categoryData[language]) {
      return categoryData[language];
    } else if (categoryData['en']) {
      return categoryData['en'];
    }
    return '';
  } catch (error) {
    console.error(`Category translation not found for index ${index} in ${language}`);
    // Fallback to English
    try {
      if (categoryTranslations && categoryTranslations.categories && 
          categoryTranslations.categories[index] && categoryTranslations.categories[index]['en']) {
        return categoryTranslations.categories[index]['en'];
      }
      return '';
    } catch (e) {
      return '';
    }
  }
}