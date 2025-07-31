const fs = require('fs');
const https = require('https');
const path = require('path');

// Arabic alphabet with correct pronunciation
const arabicAlphabet = [
  { name: 'alif', arabic: 'أ', pronunciation: 'alif' },
  { name: 'ba', arabic: 'ب', pronunciation: 'ba' },
  { name: 'ta', arabic: 'ت', pronunciation: 'ta' },
  { name: 'tha', arabic: 'ث', pronunciation: 'tha' },
  { name: 'jim', arabic: 'ج', pronunciation: 'jim' },
  { name: 'hha', arabic: 'ح', pronunciation: 'hha' },
  { name: 'kha', arabic: 'خ', pronunciation: 'kha' },
  { name: 'dal', arabic: 'د', pronunciation: 'dal' },
  { name: 'dhal', arabic: 'ذ', pronunciation: 'dhal' },
  { name: 'ra', arabic: 'ر', pronunciation: 'ra' },
  { name: 'zay', arabic: 'ز', pronunciation: 'zay' },
  { name: 'sin', arabic: 'س', pronunciation: 'sin' },
  { name: 'shin', arabic: 'ش', pronunciation: 'shin' },
  { name: 'sad', arabic: 'ص', pronunciation: 'sad' },
  { name: 'dad', arabic: 'ض', pronunciation: 'dad' },
  { name: 'tah', arabic: 'ط', pronunciation: 'tah' },
  { name: 'zah', arabic: 'ظ', pronunciation: 'zah' },
  { name: 'ayn', arabic: 'ع', pronunciation: 'ayn' },
  { name: 'ghayn', arabic: 'غ', pronunciation: 'ghayn' },
  { name: 'fa', arabic: 'ف', pronunciation: 'fa' },
  { name: 'qaf', arabic: 'ق', pronunciation: 'qaf' },
  { name: 'kaf', arabic: 'ك', pronunciation: 'kaf' },
  { name: 'lam', arabic: 'ل', pronunciation: 'lam' },
  { name: 'mim', arabic: 'م', pronunciation: 'mim' },
  { name: 'nun', arabic: 'ن', pronunciation: 'nun' },
  { name: 'ha', arabic: 'ه', pronunciation: 'ha' },
  { name: 'waw', arabic: 'و', pronunciation: 'waw' },
  { name: 'ya', arabic: 'ي', pronunciation: 'ya' }
];

// Function to generate audio for each letter using Google TTS
async function generateAudio() {
  const audioDir = path.join(__dirname, '../public/audio/arabic');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
  }
  
  console.log('Starting audio generation for Arabic alphabet...');
  
  for (const letter of arabicAlphabet) {
    const filename = `${letter.name}.mp3`;
    const filepath = path.join(audioDir, filename);
    
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`Audio for ${letter.name} already exists, skipping...`);
      continue;
    }
    
    try {
      // Use Google Translate TTS API for Arabic pronunciation
      const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(letter.arabic)}&tl=ar&client=tw-ob`;
      
      console.log(`Generating audio for ${letter.name} (${letter.arabic})...`);
      
      // Download audio
      const file = fs.createWriteStream(filepath);
      
      await new Promise((resolve, reject) => {
        https.get(ttsUrl, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Failed to download audio for ${letter.name}: ${response.statusCode}`));
            return;
          }
          
          response.pipe(file);
          
          file.on('finish', () => {
            file.close();
            console.log(`✓ Audio generated for ${letter.name}`);
            resolve();
          });
          
          file.on('error', (err) => {
            fs.unlink(filepath, () => {}); // Delete partial file
            reject(err);
          });
        }).on('error', (err) => {
          reject(err);
        });
      });
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Failed to generate audio for ${letter.name}:`, error.message);
    }
  }
  
  console.log('Audio generation complete!');
}

// Run the audio generation
generateAudio().catch(console.error);