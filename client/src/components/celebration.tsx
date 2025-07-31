import React, { useEffect, useRef } from 'react';

type CelebrationProps = {
  isVisible: boolean;
  onComplete?: () => void;
};

export function Celebration({ isVisible, onComplete }: CelebrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;
    
    const container = containerRef.current;
    const confetti = container.querySelectorAll('.confetti');
    const candies = container.querySelectorAll('.candy');
    
    // Animate confetti
    confetti.forEach((c, i) => {
      const elem = c as HTMLElement;
      
      // Random position
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      // Animation
      elem.style.left = `${x}px`;
      elem.style.top = `${y}px`;
      elem.style.opacity = '1';
      elem.style.transform = `rotate(${Math.random() * 360}deg)`;
      elem.style.transition = 'transform 1s ease-out, top 1s ease-out, opacity 0.5s ease-in 1s';
      
      // Fall effect
      setTimeout(() => {
        elem.style.top = `${y + 100}px`;
        elem.style.opacity = '0';
      }, i * 100);
    });
    
    // Animate candy (falling from top to bottom)
    candies.forEach((c, i) => {
      const elem = c as HTMLElement;
      
      // Random x position, start from top
      const x = Math.random() * window.innerWidth;
      
      // Animation
      elem.style.left = `${x}px`;
      elem.style.top = '-50px';
      elem.style.opacity = '1';
      elem.style.transform = `rotate(${Math.random() * 360}deg)`;
      elem.style.transition = 'transform 1.5s ease-out, top 1.5s ease-out, opacity 0.5s ease-in 1.5s';
      
      // Fall effect with different speeds
      setTimeout(() => {
        const finalY = window.innerHeight + 50;
        elem.style.top = `${finalY}px`;
        elem.style.opacity = '0';
      }, i * 150);
    });
    
    // Hide after animation completes
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isVisible, onComplete]);
  
  if (!isVisible) return null;
  
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-indigo-500'];
  const candyColors = ['bg-pink-400', 'bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-purple-400'];
  
  return (
    <div ref={containerRef} className="celebration fixed inset-0 pointer-events-none z-50">
      {/* Regular confetti */}
      {colors.map((color, i) => (
        <div key={`confetti-${i}`} className={`confetti ${color} rounded-sm`} style={{ width: '15px', height: '15px', position: 'absolute', opacity: 0 }} />
      ))}
      
      {/* Candy - for Islamic children's content */}
      {candyColors.map((color, i) => (
        <div 
          key={`candy-${i}`} 
          className={`candy ${color} rounded-full`} 
          style={{ 
            width: '20px', 
            height: '20px', 
            position: 'absolute', 
            opacity: 0,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }} 
        />
      ))}
    </div>
  );
}
