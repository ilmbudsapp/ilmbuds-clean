// AdMob types for Capacitor Community AdMob plugin
export interface AdMobPlugin {
  initialize(options: AdMobInitializationOptions): Promise<void>;
  
  // Banner ads
  showBanner(options: BannerAdOptions): Promise<void>;
  hideBanner(): Promise<void>;
  resumeBanner(): Promise<void>;
  removeBanner(): Promise<void>;
  
  // Interstitial ads
  prepareInterstitial(options: InterstitialAdOptions): Promise<void>;
  showInterstitial(): Promise<void>;
  
  // Rewarded ads
  prepareRewardedAd(options: RewardedAdOptions): Promise<void>;
  showRewardedAd(): Promise<void>;
  
  // Event listeners
  addListener(eventName: string, listenerFunc: (event: any) => void): void;
  removeAllListeners(): void;
}

export interface AdMobInitializationOptions {
  appId?: string;
  isTesting?: boolean;
  tagForChildDirectedTreatment?: boolean;
  tagForUnderAgeOfConsent?: boolean;
  maxAdContentRating?: 'G' | 'PG' | 'T' | 'MA';
  testingDevices?: string[];
  npa?: boolean;
}

export interface BannerAdOptions {
  adId: string;
  adSize?: 'BANNER' | 'FULL_BANNER' | 'LARGE_BANNER' | 'MEDIUM_RECTANGLE' | 'SMART_BANNER';
  position?: 'TOP_CENTER' | 'CENTER' | 'BOTTOM_CENTER';
  margin?: number;
  isTesting?: boolean;
}

export interface InterstitialAdOptions {
  adId: string;
  isTesting?: boolean;
}

export interface RewardedAdOptions {
  adId: string;
  isTesting?: boolean;
}

export interface RewardedAdReward {
  type: string;
  amount: number;
}

// Extend the global Window interface
declare global {
  interface Window {
    AdMob?: AdMobPlugin;
  }
}