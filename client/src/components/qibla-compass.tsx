import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';

export function QiblaCompass() {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<number | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [permission, setPermission] = useState<PermissionState | null>(null);

  // Calculate Qibla direction
  useEffect(() => {
    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat1 = position.coords.latitude * Math.PI / 180;
          const lon1 = position.coords.longitude * Math.PI / 180;
          
          // Coordinates of the Kaaba in Mecca
          const lat2 = 21.4225 * Math.PI / 180;
          const lon2 = 39.8262 * Math.PI / 180;
          
          // Calculate Qibla direction
          const y = Math.sin(lon2 - lon1);
          const x = Math.cos(lat1) * Math.tan(lat2) - Math.sin(lat1) * Math.cos(lon2 - lon1);
          let qibla = Math.atan2(y, x) * 180 / Math.PI;
          
          // Normalize to 0-360
          qibla = (qibla + 360) % 360;
          
          setDirection(qibla);
          
          // Check and request permission for device orientation
          if (typeof DeviceOrientationEvent !== 'undefined' && 
              typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            setPermission('prompt');
          } else {
            setPermission('granted');
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  // Handle device orientation
  useEffect(() => {
    if (permission === 'granted') {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        if (event.alpha !== null) {
          setHeading(event.alpha);
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);

      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    }
  }, [permission]);

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        setPermission(permissionState);
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
      }
    } else {
      setPermission('granted');
    }
  };

  // Calculate compass rotation
  const compassRotation = heading !== null ? 360 - heading : 0;
  
  // Calculate Qibla needle rotation
  const qiblaRotation = direction !== null && heading !== null 
    ? direction - heading 
    : direction !== null 
      ? direction 
      : 0;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
        <CardTitle className="flex items-center text-green-800">
          <Icon name="mosque" className="mr-2" />
          {t('common', 'qiblaCompass')}
        </CardTitle>
        <CardDescription className="text-green-700">
          {t('common', 'qiblaDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 flex flex-col items-center bg-gradient-to-b from-white to-green-50/30">
        {permission === 'prompt' && (
          <button 
            onClick={requestPermission}
            className="bg-green-600 text-white rounded-md px-4 py-2 mb-4 hover:bg-green-700 transition-colors"
          >
            {t('common', 'enableCompass')}
          </button>
        )}
        
        {permission === 'granted' && (
          <div className="relative w-64 h-64">
            {/* Compass background */}
            <div 
              className="absolute inset-0 rounded-full border-4 border-gray-300 bg-white shadow-inner"
              style={{ transform: `rotate(${compassRotation}deg)` }}
            >
              {/* North indicator */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-red-600 font-bold">N</div>
              {/* East indicator */}
              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600 font-bold">E</div>
              {/* South indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-600 font-bold">S</div>
              {/* West indicator */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-600 font-bold">W</div>
              
              {/* Direction lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0.5 h-full bg-gray-300"></div>
                <div className="absolute w-full h-0.5 bg-gray-300"></div>
              </div>
            </div>
            
            {/* Qibla indicator */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-32 bg-green-600 origin-bottom rounded-t-full -mt-32"
              style={{ transform: `translateX(-50%) rotate(${qiblaRotation}deg)` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-contain bg-center bg-no-repeat"
                   style={{ backgroundImage: `url('/images/kaaba-vector.png')` }}>
              </div>
            </div>
            
            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
        
        {direction === null && (
          <div className="text-center text-gray-600 my-4">
            {t('common', 'findingQibla')}
          </div>
        )}
        
        {direction !== null && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">{t('common', 'qiblaDirection')}: {Math.round(direction)}°</p>
            {heading !== null && (
              <p className="text-gray-700">{t('common', 'yourHeading')}: {Math.round(heading)}°</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}