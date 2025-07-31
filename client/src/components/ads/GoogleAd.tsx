// Google Ad removed - handled by Kodular native integration

interface GoogleAdProps {
  slot: string;
  style?: React.CSSProperties;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

const GoogleAd: React.FC<GoogleAdProps> = () => {
  return null; // No Google ads needed in WebView
};

export default GoogleAd;