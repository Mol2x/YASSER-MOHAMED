import React, { useState } from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Smartphone, WifiOff, Apple } from 'lucide-react';

const MobileGames: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Android' | 'iOS' | 'Offline'>('All');

  const games = MOCK_GAMES.filter(g => {
    const isMobile = g.platform.some(p => String(p).includes('Android') || String(p).includes('iOS'));
    if (!isMobile) return false;
    
    if (filter === 'Offline') return g.isOffline;
    if (filter === 'Android') return g.platform.some(p => String(p) === 'Android');
    if (filter === 'iOS') return g.platform.some(p => String(p) === 'iOS');
    return true;
  });

  return (
    <div className="min-h-screen pb-24 px-4 pt-4 bg-black">
      <h1 className="text-2xl font-black text-white mb-6">ألعاب الموبايل</h1>
      
      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        <button 
          onClick={() => setFilter('All')}
          className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${filter === 'All' ? 'bg-primary border-primary text-white' : 'bg-surface border-white/5 text-gray-400'}`}
        >
          <Smartphone size={20} />
          <span className="text-xs font-bold">الكل</span>
        </button>
        <button 
           onClick={() => setFilter('Android')}
           className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${filter === 'Android' ? 'bg-green-700 border-green-600 text-white' : 'bg-surface border-white/5 text-gray-400'}`}
        >
          <Smartphone size={20} />
          <span className="text-xs font-bold">Android</span>
        </button>
        <button 
           onClick={() => setFilter('iOS')}
           className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${filter === 'iOS' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-surface border-white/5 text-gray-400'}`}
        >
          <Apple size={20} />
          <span className="text-xs font-bold">iOS</span>
        </button>
        <button 
           onClick={() => setFilter('Offline')}
           className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${filter === 'Offline' ? 'bg-purple-700 border-purple-600 text-white' : 'bg-surface border-white/5 text-gray-400'}`}
        >
          <WifiOff size={20} />
          <span className="text-xs font-bold">Offline</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default MobileGames;