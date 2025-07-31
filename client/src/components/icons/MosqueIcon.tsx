import React from 'react';

interface MosqueIconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const MosqueIcon: React.FC<MosqueIconProps> = ({ 
  size = 24, 
  color = 'currentColor',
  className = '' 
}) => {
  return (
    <img 
      src="/images/mosque-icon.png"
      alt="Mosque"
      width={size + 10} 
      height={size + 10} 
      className={className}
      style={{ 
        objectFit: 'contain',
        opacity: 0.8,
        marginTop: '5px',
        filter: color !== 'currentColor' ? 
          `brightness(0) saturate(100%) invert(42%) sepia(7%) saturate(1166%) hue-rotate(202deg) brightness(99%) contrast(85%)` : 
          'brightness(0) saturate(100%) invert(42%) sepia(7%) saturate(1166%) hue-rotate(202deg) brightness(99%) contrast(85%)'
      }}
    />
  );
};