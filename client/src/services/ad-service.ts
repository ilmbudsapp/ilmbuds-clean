// Ad service simplified for WebView - Kodular handles native ads

export const canShowInterstitial = () => false;
export const markInterstitialShown = () => {};
export const canShowRewarded = () => true;
export const markRewardedShown = () => {};
export const canShowBanner = () => false; 
export const markBannerShown = () => {};
export const shouldShowAd = () => false;
export const shouldShowInterstitialOnNavigation = () => false;
export const shouldOfferReward = () => true;
export const shouldShowBanner = () => false;