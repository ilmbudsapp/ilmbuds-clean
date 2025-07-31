import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export class CapacitorAdMobService {
  private static isInitialized = false;
  
  static async initialize() {
    if (this.isInitialized || !Capacitor.isNativePlatform()) {
      return;
    }
    
    try {
      await AdMob.initialize({
        testingDevices: ['EMULATOR'],
        initializeForTesting: false,
      });
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  }
  
  static async showBanner(adUnitId: string) {
    if (!Capacitor.isNativePlatform()) {
      console.log('Banner ad - Web environment detected');
      return;
    }
    
    try {
      await this.initialize();
      
      const options: BannerAdOptions = {
        adId: adUnitId,
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 56, // 14 * 4 = 56px margin for navigation bar
        isTesting: false
      };
      
      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }
  
  static async showInterstitial(adUnitId: string) {
    if (!Capacitor.isNativePlatform()) {
      console.log('Interstitial ad - Web environment detected');
      return;
    }
    
    try {
      await this.initialize();
      
      const options = {
        adId: adUnitId,
        isTesting: false
      };
      
      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  }
  
  static async showRewarded(adUnitId: string) {
    if (!Capacitor.isNativePlatform()) {
      console.log('Rewarded ad - Web environment detected');
      return;
    }
    
    try {
      await this.initialize();
      
      const options = {
        adId: adUnitId,
        isTesting: false
      };
      
      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
      console.log('Rewarded ad shown');
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
    }
  }
  
  static async hideBanner() {
    if (!Capacitor.isNativePlatform()) {
      return;
    }
    
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }
}

export default CapacitorAdMobService;