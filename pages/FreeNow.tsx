import React from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Store } from '../types';
import { CheckCircle2 } from 'lucide-react';

const FreeNow: React.FC = () => {
  const games = MOCK_GAMES.filter(g => !g.isComingSoon && !g.platform.some(p => String(p).includes('Mobile')));

  // Group by store for visual variety (Optional, here we just list them grid style)
  
  return (
    <div className="min-h-screen pb-24 px-4 pt-4 bg-black">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="text-primary" />
        <h1 className="text-2xl font-black text-white">الألعاب المجانية الآن</h1>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {[Store.Steam, Store.Epic, Store.PlayStation, Store.Xbox].map(store => (
          <button key={store} className="whitespace-nowrap bg-surface border border-white/10 px-4 py-2 rounded-full text-sm text-gray-300 hover:text-white hover:border-primary transition-colors">
            {store}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default FreeNow;