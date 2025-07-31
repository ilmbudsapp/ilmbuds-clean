import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ilmbuds.app',
  appName: 'ILMBUDS',
  webDir: 'dist/public',

  server: {
    url: undefined, // Koristi lokalne fajlove umesto Replit URL
    cleartext: true
  },

  android: {
    allowMixedContent: true
  },
  // Global capacitor plugin configurations
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 1000,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      showSpinner: true,
      spinnerColor: "#2196F3"
    },
    // AdMob plugin configuration
    AdMob: {
      appIdAndroid: "ca-app-pub-9746293142643974~5047751469",
      bannerAdUnitId: "ca-app-pub-9746293142643974/3548505956",
      interstitialAdUnitId: "ca-app-pub-9746293142643974/7649626393",
      rewardedAdUnitId: "ca-app-pub-9746293142643974/2411518252",
      isTesting: false,
      npa: true,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
      maxAdContentRating: "G"
    },
    CapacitorHttp: {
      enabled: true
    },
    AppUrlOpen: {
      enabled: true
    }
  }
};

export default config;
