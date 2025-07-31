import React from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';

export default function Download() {
  const [_, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col"
         style={{ 
           background: 'linear-gradient(135deg, #4a90e2 0%, #357abd 100%)',
           minHeight: '100vh'
         }}>
      
      <header className="bg-gradient-to-r from-indigo-700/80 to-blue-700/80 backdrop-blur-sm text-white p-4 flex justify-between items-center shadow-md">
        <button onClick={() => setLocation('/')} className="text-white">
          ← Nazad
        </button>
        <h1 className="text-lg font-bold">Download ILMBUDS APK</h1>
        <div></div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* APK Download Options */}
          <Card className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                ILMBUDS Android APK
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Native AdMob Version */}
                <Card className="bg-green-600 border-green-500">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white font-bold text-xl mb-3">
                      Capacitor APK (Preporučeno)
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      Native Android sa AdMob reklamama
                      <br />
                      Najbolje performanse
                    </p>
                    <div className="bg-white/20 p-3 rounded mb-4">
                      <div className="text-white text-xs">
                        ✓ Native AdMob SDK
                        <br />
                        ✓ ca-pub-9746293142643974
                        <br />
                        ✓ Banner + Interstitial reklame
                      </div>
                    </div>
                    <button 
                      className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold w-full"
                      onClick={() => window.open('/android/app/build/outputs/apk/debug/app-debug.apk', '_blank')}
                    >
                      Download APK (8MB)
                    </button>
                  </CardContent>
                </Card>
                
                {/* PWA Version */}
                <Card className="bg-blue-600 border-blue-500">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-white font-bold text-xl mb-3">
                      PWA Verzija
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      Instaliraj kroz browser
                      <br />
                      Bez download-a
                    </p>
                    <div className="bg-white/20 p-3 rounded mb-4">
                      <div className="text-white text-xs">
                        ✓ Instant instalacija
                        <br />
                        ✓ Automatska ažuriranja
                        <br />
                        ✓ Manje prostora
                      </div>
                    </div>
                    <button 
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold w-full"
                      onClick={() => {
                        if ('serviceWorker' in navigator) {
                          window.location.href = '/';
                        }
                      }}
                    >
                      Instaliraj PWA
                    </button>
                  </CardContent>
                </Card>
                
              </div>
              
              {/* Installation Instructions */}
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-3">Instrukcije za instalaciju:</h4>
                <div className="text-white/80 text-sm space-y-2">
                  <div className="mb-3">
                    <strong className="text-white">APK verzija:</strong>
                    <ol className="list-decimal list-inside ml-4 mt-1">
                      <li>Download APK fajl</li>
                      <li>Omogući "Unknown sources" u Android Settings</li>
                      <li>Instaliraj APK</li>
                      <li>AdMob reklame će se prikazivati automatski</li>
                    </ol>
                  </div>
                  <div>
                    <strong className="text-white">PWA verzija:</strong>
                    <ol className="list-decimal list-inside ml-4 mt-1">
                      <li>Otvori app u Chrome browser-u</li>
                      <li>Klikni "Install" kada se pojavi notifikacija</li>
                      <li>App će biti dostupan kao native aplikacija</li>
                    </ol>
                  </div>
                </div>
              </div>
              
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}