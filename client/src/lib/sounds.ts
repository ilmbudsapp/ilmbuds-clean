// Sound effects for the application

// Define sound type for type safety
export type SoundType = 'success' | 'error' | 'click' | 'hover' | 'levelUp' | 'celebration' | 'correctAnswer' | 'incorrectAnswer' | 'start' | 'finish';

// Mapping of sound names to their paths
const SOUNDS: Record<SoundType, string> = {
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  click: '/sounds/click.mp3',
  hover: '/sounds/click.mp3', // Using click sound for hover too
  levelUp: '/sounds/level-up.mp3',
  celebration: '/sounds/celebration.mp3',
  correctAnswer: '/sounds/allahu_ekber.mp3', // Islamic sound for correct answers
  incorrectAnswer: '/sounds/subhanallah.mp3', // Islamic sound for incorrect answers
  start: '/sounds/bismillah.mp3',
  finish: '/sounds/celebration.mp3',
};

// Audio context cache
let audioContext: AudioContext | null = null;

/**
 * Play a sound by name
 * @param soundName Name of the sound to play
 * @param volume Volume level (0-1), default 0.5
 */
export function playSound(soundName: SoundType, volume = 0.5) {
  // Only create sounds if the user has interacted with the page
  if (document.readyState !== 'complete') return;
  
  try {
    // Create audio context if it doesn't exist
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create audio element
    const audio = new Audio(SOUNDS[soundName]);
    audio.volume = volume;
    
    // Play the sound
    audio.play().catch(err => {
      console.warn(`Failed to play sound "${soundName}":`, err);
    });
  } catch (error) {
    console.warn(`Error playing sound "${soundName}":`, error);
  }
}

// Preload sounds for better performance
export function preloadSounds() {
  Object.values(SOUNDS).forEach(soundPath => {
    const audio = new Audio();
    audio.src = soundPath;
  });
}

// Initialize the audio on page load after user interaction
export function initAudio() {
  if (typeof window !== 'undefined') {
    const initializeAudio = () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        preloadSounds();
      }
    };

    // Initialize audio on user interaction
    window.addEventListener('click', initializeAudio, { once: true });
    window.addEventListener('touchstart', initializeAudio, { once: true });
    window.addEventListener('keydown', initializeAudio, { once: true });
  }
}

export default {
  playSound,
  preloadSounds,
  initAudio,
};