declare module 'react-google-adsense' {
  import React from 'react';
  
  export interface AdSenseProps {
    client: string;
    slot: string;
    style?: React.CSSProperties;
    format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    responsive?: boolean;
    layoutKey?: string;
    layout?: string;
    className?: string;
  }
  
  export class AdSense extends React.Component<AdSenseProps> {}
  
  export class GoogleAdSense {
    static Initialize(options: { nonce?: string }): void;
  }
  
  const Initialize: typeof GoogleAdSense.Initialize;
  
  export { Initialize };
  
  export default AdSense;
}