import React from 'react';

interface HandshakeIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HandshakeIcon: React.FC<HandshakeIconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '' 
}) => {
  return (
    <img 
      src="/images/handshake-icon.png"
      alt="Handshake"
      width={size + 8} 
      height={size + 8} 
      className={className}
      style={{ 
        objectFit: 'contain',
        opacity: 0.8
      }}
    />
  );
};