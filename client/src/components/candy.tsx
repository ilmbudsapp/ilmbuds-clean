import React, { useEffect, useState } from 'react';
import audioService from '../services/audio-service';

interface FireworkProps {
  active: boolean;
}

// Komponent za jedan vatromet
const Firework: React.FC<{
  delay: number;
  size: number;
  color: string;
  position: { x: number; y: number };
  duration: number;
}> = ({ delay, size, color, position, duration }) => {
  return (
    <div
      className="absolute transform-gpu"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: size,
        height: size,
        opacity: 1,
        animation: `firework ${duration}s ease-out ${delay}s forwards`,
        transform: 'scale(0)',
      }}
    >
      {/* Sjenka vatrometa */}
      <div 
        className="absolute inset-0 rounded-full blur-xl opacity-50"
        style={{ 
          backgroundColor: color,
          transform: 'scale(1.3)',
          animation: `fireworkFade ${duration}s ease-out ${delay}s forwards`
        }}
      />
      
      {/* Centralni dio vatrometa */}
      <div 
        className="absolute inset-0 rounded-full"
        style={{ 
          backgroundColor: color,
          animation: `fireworkFade ${duration}s ease-out ${delay}s forwards`
        }}
      />
      
      {/* Zrake - kreiramo 12 zraka vatrometa */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          className="absolute origin-center"
          style={{
            width: '4px',
            height: `${size * 0.8}px`,
            left: '50%',
            top: '50%',
            marginLeft: '-2px',
            marginTop: `-${size * 0.4}px`,
            backgroundColor: color,
            transform: `rotate(${i * 30}deg)`,
            animation: `ray ${duration}s ease-out ${delay}s forwards`,
            opacity: 0.7,
            '--rotation': `${i * 30}deg`,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Iskre - mnogo malih iskri */}
      {[...Array(20)].map((_, i) => {
        const angle = Math.random() * 360;
        const sparkDistance = size * (0.8 + Math.random() * 0.7);
        const sparkSize = 2 + Math.random() * 4;
        const sparkDelay = delay + Math.random() * 0.3;
        const translateX = Math.cos(angle * Math.PI / 180) * sparkDistance;
        const translateY = Math.sin(angle * Math.PI / 180) * sparkDistance;
        
        return (
          <div 
            key={`spark-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${sparkSize}px`,
              height: `${sparkSize}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${sparkSize / 2}px`,
              marginTop: `-${sparkSize / 2}px`,
              backgroundColor: color,
              opacity: 0.9,
              animation: `spark ${duration * 1.2}s ease-out ${sparkDelay}s forwards`,
              transform: `translate(${translateX}px, ${translateY}px) scale(0)`,
              '--translate-x': `${translateX}px`,
              '--translate-y': `${translateY}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

// Veliki centralni vatromet
const CentralFirework: React.FC<{
  delay: number;
  color: string;
}> = ({ delay, color }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Firework 
        delay={delay} 
        size={200}
        color={color}
        position={{ x: 50, y: 50 }}
        duration={2.5}
      />
      
      {/* Dodajemo dodatne iskre oko centralnog vatrometa */}
      {[...Array(40)].map((_, i) => {
        const angle = Math.random() * 360;
        const distance = 100 + Math.random() * 150;
        const sparkSize = 4 + Math.random() * 6;
        const sparkDelay = delay + 0.1 + Math.random() * 0.4;
        const translateX = Math.cos(angle * Math.PI / 180) * distance;
        const translateY = Math.sin(angle * Math.PI / 180) * distance;
        
        return (
          <div 
            key={`central-spark-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${sparkSize}px`,
              height: `${sparkSize}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${sparkSize / 2}px`,
              marginTop: `-${sparkSize / 2}px`,
              backgroundColor: Math.random() > 0.5 ? color : `hsl(${Math.random() * 360}, 100%, 60%)`,
              opacity: 0.9,
              animation: `centralSpark 1.8s ease-out ${sparkDelay}s forwards`,
              transform: `translate(${translateX}px, ${translateY}px) scale(0)`,
              '--translate-x': `${translateX}px`,
              '--translate-y': `${translateY}px`,
              boxShadow: `0 0 ${sparkSize}px ${sparkSize / 2}px ${Math.random() > 0.5 ? color : `hsl(${Math.random() * 360}, 100%, 70%)`}`
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

export const CandyConfetti: React.FC<FireworkProps> = ({ active }) => {
  const [fireworks, setFireworks] = useState<React.ReactNode[]>([]);
  const [localActive, setLocalActive] = useState(false);

  console.log("Fireworks rendered with active:", active);

  // Koristimo useEffect za praćenje "active" statusa
  useEffect(() => {
    if (active) {
      setLocalActive(true);
    }
  }, [active]);

  useEffect(() => {
    console.log("Fireworks effect running with localActive:", localActive);
    // Generišemo vatromete samo kada je komponenta aktivna
    if (localActive) {
      console.log("Generating fireworks...");
      const newFireworks: React.ReactNode[] = [];
      
      const colors = [
        '#FF3131', // crvena
        '#39FF14', // zelena
        '#5DADEC', // plava
        '#FFDE33', // žuta
        '#FF3399', // roza
        '#9D00FF', // ljubičasta
        '#FF8300', // narandžasta
        '#FFFC00', // svijetlo žuta
        '#00FFFF', // tirkizna
        '#FF007F'  // pink
      ];
      
      // Centralni veliki vatromet
      newFireworks.push(
        <CentralFirework 
          key="central" 
          delay={0.1} 
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
      );
      
      // Dodatni vatrometi na random pozicijama
      for (let i = 0; i < 8; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 40 + Math.floor(Math.random() * 80); // različite veličine
        const x = 10 + Math.random() * 80; // pozicija x (10-90%)
        const y = 10 + Math.random() * 70; // pozicija y (10-80%)
        const delay = 0.2 + Math.random() * 1; // različita kašnjenja
        
        newFireworks.push(
          <Firework
            key={`firework-${i}`}
            delay={delay}
            size={size}
            color={color}
            position={{ x, y }}
            duration={1.5 + Math.random() * 1}
          />
        );
      }
      
      console.log("Generated", newFireworks.length, "fireworks");
      setFireworks(newFireworks);
      
      // Dobijamo trajanje zvuka i usklađujemo trajanje animacije
      const audioDuration = audioService.getAllahuEkberDuration();
      console.log(`Using audio duration for fireworks: ${audioDuration}ms`);
      
      // Čistimo vatromete nakon što se zvuk završi (dodajemo 500ms za bolji efekat)
      const timer = setTimeout(() => {
        console.log("Cleaning up fireworks after timeout");
        setFireworks([]);
        setLocalActive(false);
      }, audioDuration + 500);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [localActive]);
  
  if (!localActive && fireworks.length === 0) return null;
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50" style={{ minHeight: '100vh' }}>
      {fireworks}
    </div>
  );
};