/**
 * Jednostavna audio usluga za reprodukciju zvukova u aplikaciji
 */

// Audio omogućen status (može se uključiti/isključiti u postavkama)
let audioEnabled = true;

/**
 * Postavite audio enabled/disabled status
 */
export const setAudioEnabled = (enabled: boolean) => {
  audioEnabled = enabled;
  console.log(`Audio ${enabled ? 'enabled' : 'disabled'}`);
};

/**
 * Dohvati status audio omogućavanja
 */
export const isAudioEnabled = () => {
  return audioEnabled;
};

/**
 * Reproduciraj Bismillah zvuk (korišten pri ulasku u kartice/sekcije)
 */
export const playBismillah = () => {
  if (!audioEnabled) return;
  
  try {
    console.log('Playing Bismillah sound directly...');
    
    // Najjednostavniji pristup - direktno reprodukovanje zvuka
    const audio = new Audio('/sounds/bismillah.mp3');
    audio.volume = 1.0;
    
    audio.play().catch(error => {
      console.error('Failed to play Bismillah sound:', error);
      
      // Alternativna putanja kao rezerva
      try {
        const backupAudio = new Audio('/assets/BISMILLAH.mp3');
        backupAudio.volume = 1.0;
        backupAudio.play().catch(e => {
          console.error('Failed to play backup audio:', e);
        });
      } catch (e) {
        console.error('Failed to create backup audio:', e);
      }
    });
  } catch (error) {
    console.error('Error in playBismillah function:', error);
  }
};

// Globalna varijabla za trajanje audio fajla
let audioDuration = 8000; // Default 8 sekundi ako ne uspemo dobiti stvarno trajanje

// Unapred učitavamo audio datoteku da bismo dobili pravu dužinu
(() => {
  try {
    const preloadAudio = new Audio('/sounds/allahu_ekber.mp3');
    preloadAudio.addEventListener('loadedmetadata', () => {
      if (preloadAudio.duration && !isNaN(preloadAudio.duration)) {
        audioDuration = Math.ceil(preloadAudio.duration * 1000);
        console.log(`Preloaded Allahu Ekber sound duration: ${audioDuration}ms`);
      }
    });
    preloadAudio.load(); // Samo učitavamo, ne puštamo
  } catch (e) {
    console.error('Failed to preload audio:', e);
    try {
      const backupPreload = new Audio('/assets/ALLAHU EKBER.mp3');
      backupPreload.addEventListener('loadedmetadata', () => {
        if (backupPreload.duration && !isNaN(backupPreload.duration)) {
          audioDuration = Math.ceil(backupPreload.duration * 1000);
          console.log(`Preloaded backup Allahu Ekber sound duration: ${audioDuration}ms`);
        }
      });
      backupPreload.load(); // Samo učitavamo, ne puštamo
    } catch (e) {
      console.error('Failed to preload backup audio:', e);
    }
  }
})();

/**
 * Funkcija koja vraća trajanje Allahu Ekber zvuka u milisekundama
 */
export const getAllahuEkberDuration = (): number => {
  return audioDuration;
};

/**
 * Reproduciraj Allahu Ekber zvuk (korišten za točne odgovore)
 */
export const playAllahuEkber = () => {
  if (!audioEnabled) return;
  
  try {
    console.log('Playing Allahu Ekber sound directly...');
    
    // Najjednostavniji pristup - direktno reprodukovanje zvuka
    const audio = new Audio('/sounds/allahu_ekber.mp3');
    audio.volume = 1.0;
    
    // Čekamo da se metadata učita kako bismo dobili trajanje
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration && !isNaN(audio.duration)) {
        audioDuration = Math.ceil(audio.duration * 1000);
        console.log(`Allahu Ekber sound duration: ${audioDuration}ms`);
      }
    });
    
    audio.play().catch(error => {
      console.error('Failed to play Allahu Ekber sound:', error);
      
      // Alternativna putanja kao rezerva
      try {
        const backupAudio = new Audio('/assets/ALLAHU EKBER.mp3');
        backupAudio.volume = 1.0;
        
        // Čekamo da se metadata učita kako bismo dobili trajanje
        backupAudio.addEventListener('loadedmetadata', () => {
          if (backupAudio.duration && !isNaN(backupAudio.duration)) {
            audioDuration = Math.ceil(backupAudio.duration * 1000);
            console.log(`Backup Allahu Ekber sound duration: ${audioDuration}ms`);
          }
        });
        
        backupAudio.play().catch(e => {
          console.error('Failed to play backup audio:', e);
        });
      } catch (e) {
        console.error('Failed to create backup audio:', e);
      }
    });
  } catch (error) {
    console.error('Error in playAllahuEkber function:', error);
  }
};

/**
 * Reproduciraj Subhanallah zvuk (korišten za netočne odgovore)
 */
export const playSubhanallah = () => {
  if (!audioEnabled) return;
  
  try {
    console.log('Playing Subhanallah sound directly...');
    
    // Najjednostavniji pristup - direktno reprodukovanje zvuka
    const audio = new Audio('/sounds/subhanallah.mp3');
    audio.volume = 1.0;
    
    audio.play().catch(error => {
      console.error('Failed to play Subhanallah sound:', error);
      
      // Alternativna putanja kao rezerva
      try {
        const backupAudio = new Audio('/assets/SUBHANALLAH.mp3');
        backupAudio.volume = 1.0;
        backupAudio.play().catch(e => {
          console.error('Failed to play backup audio:', e);
        });
      } catch (e) {
        console.error('Failed to create backup audio:', e);
      }
    });
  } catch (error) {
    console.error('Error in playSubhanallah function:', error);
  }
};

export default {
  playBismillah,
  playAllahuEkber,
  playSubhanallah,
  setAudioEnabled,
  isAudioEnabled,
  getAllahuEkberDuration
};