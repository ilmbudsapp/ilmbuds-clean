import React from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';

export default function Donate() {
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
        <h1 className="text-lg font-bold">Podrška ILMBUDS</h1>
        <div></div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Donation Options */}
          <Card className="mb-6 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Podržite Islamsku Edukaciju
              </h2>
              <p className="text-white/80 mb-6">
                ILMBUDS je besplatna aplikacija za islamsko obrazovanje dece. 
                Vaša podrška pomaže nam da nastavimo sa razvojem kvalitetnog sadržaja.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="bg-green-600 border-green-500">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-white font-bold mb-2">PayPal Donacija</h3>
                    <p className="text-white/80 text-sm mb-3">
                      Jednokratna donacija
                    </p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded font-bold">
                      Doniraj $5
                    </button>
                  </CardContent>
                </Card>
                
                <Card className="bg-blue-600 border-blue-500">
                  <CardContent className="p-4 text-center">
                    <h3 className="text-white font-bold mb-2">Premium Verzija</h3>
                    <p className="text-white/80 text-sm mb-3">
                      Dodatni sadržaj bez reklama
                    </p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded font-bold">
                      $2.99/mesec
                    </button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">Kako se koriste sredstva:</h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Razvoj novih lekcija i kvizova</li>
                  <li>• Poboljšanje aplikacije i dodavanje funkcija</li>
                  <li>• Održavanje servera i infrastrukture</li>
                  <li>• Prevođenje na više jezika</li>
                </ul>
              </div>
              
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}