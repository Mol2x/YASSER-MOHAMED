import React, { useState } from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Platform } from '../types';
import { Crown, Monitor, Smartphone, Gamepad } from 'lucide-react';

const Top10: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'PC' | 'Mobile' | 'Console'>('All');

  const getFilteredGames = () => {
    let games = [...MOCK_GAMES];
    if (filter === 'PC') games = games.filter(g => g.platform.includes(Platform.PC));
    if (filter === 'Mobile') games = games.filter(g => g.platform.some(p => String(p).includes('Android') || String(p).includes('iOS')));
    if (filter === 'Console') games = games.filter(g => g.platform.some(p => String(p).includes('PlayStation') || String(p).includes('Xbox')));
    
    // Sort by votes/views
    return games.sort((a, b) => b.votes - a.votes).slice(0, 10);
  };

  const topGames = getFilteredGames();

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-dark">
      <div className="flex flex-col items-center text-center mb-10">
         <Crown className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)] mb-2 animate-bounce-short" />
         <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Top 10 Games</h1>
         <p className="text-gray-400">أفضل الألعاب المجانية لهذا الشهر حسب تصويت مجتمع الغلابه</p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-10">
         {[
            { id: 'All', icon: Crown, label: 'الكل' },
            { id: 'PC', icon: Monitor, label: 'PC' },
            { id: 'Mobile', icon: Smartphone, label: 'موبايل' },
            { id: 'Console', icon: Gamepad, label: 'كونسول' }
         ].map(tab => {
             const Icon = tab.icon;
             return (
               <button
                 key={tab.id}
                 onClick={() => setFilter(tab.id as any)}
                 className={`flex items-center gap-2 px-5 py-2 rounded-xl font-bold transition-all ${
                   filter === tab.id 
                    ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)] scale-105' 
                    : 'bg-surface border border-white/5 text-gray-500 hover:text-white hover:border-white/20'
                 }`}
               >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
               </button>
             );
         })}
      </div>

      {/* Leaderboard List */}
      <div className="max-w-4xl mx-auto space-y-4">
         {topGames.map((game, index) => (
            <div key={game.id} className="group relative flex items-center gap-4 bg-card border border-white/5 p-4 rounded-2xl hover:border-yellow-500/50 hover:bg-white/5 transition-all duration-300">
               {/* Rank Number */}
               <div className={`text-4xl font-black italic w-12 text-center ${index < 3 ? 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]' : 'text-gray-700'}`}>
                  #{index + 1}
               </div>

               {/* Image */}
               <div className="w-24 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden shrink-0 relative">
                  <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {game.isLowSpec && <div className="absolute bottom-1 right-1 bg-green-500 text-[8px] text-black px-1 font-bold rounded">Low Spec</div>}
               </div>

               {/* Info */}
               <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-yellow-400 transition-colors">{game.title}</h3>
                  <div className="flex gap-2 text-xs text-gray-400 mb-1">
                     <span className="bg-white/5 px-2 py-0.5 rounded">{game.genre}</span>
                     <span className="bg-white/5 px-2 py-0.5 rounded text-primary">{game.platform.slice(0, 2).join(', ')}</span>
                  </div>
                  <p className="text-gray-500 text-xs line-clamp-1">{game.shortDescription}</p>
               </div>

               {/* Stats */}
               <div className="hidden sm:flex flex-col items-end gap-1">
                  <div className="text-yellow-500 font-black text-xl">{game.rating}</div>
                  <div className="text-gray-500 text-xs">{game.votes} صوت</div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Top10;