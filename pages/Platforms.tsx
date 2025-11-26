import React, { useState } from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Platform, Genre, Game } from '../types';
import { Filter, SortAsc, SortDesc, SlidersHorizontal, Monitor } from 'lucide-react';

const Platforms: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'All'>('All');
  const [selectedGenre, setSelectedGenre] = useState<Genre | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'views'>('date');

  const filteredGames = MOCK_GAMES.filter(game => {
    const platformMatch = selectedPlatform === 'All' || game.platform.includes(selectedPlatform as Platform);
    const genreMatch = selectedGenre === 'All' || game.genre === selectedGenre;
    return platformMatch && genreMatch;
  }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'views') return b.views - a.views;
      // Default date sort (newest first)
      return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                 <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-1">المكتبة الشاملة</h1>
                 <p className="text-gray-500 dark:text-gray-400 text-sm">تصفح {MOCK_GAMES.length} لعبة مجانية متاحة الآن</p>
            </div>
            
            {/* Sort Controls */}
             <div className="flex bg-light-surface dark:bg-surface p-1 rounded-xl border border-gray-200 dark:border-white/5 w-fit self-start md:self-auto">
                <button onClick={() => setSortBy('date')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === 'date' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>الأحدث</button>
                <button onClick={() => setSortBy('rating')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === 'rating' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>الأعلى تقييماً</button>
                <button onClick={() => setSortBy('views')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === 'views' ? 'bg-primary text-white' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'}`}>الأكثر شعبية</button>
             </div>
        </div>
        
        {/* Filters Bar */}
        <div className="bg-light-surface dark:bg-surface p-4 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
             <label className="text-xs text-gray-500 font-bold mb-1 block">المنصة</label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as Platform | 'All')}
              className="appearance-none bg-light-bg dark:bg-black/20 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-primary w-full font-semibold"
            >
              <option value="All">الكل</option>
              {Object.values(Platform).map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <Monitor className="absolute left-3 top-9 text-gray-400 h-4 w-4" />
          </div>

          <div className="relative flex-1">
             <label className="text-xs text-gray-500 font-bold mb-1 block">النوع</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value as Genre | 'All')}
              className="appearance-none bg-light-bg dark:bg-black/20 text-gray-900 dark:text-white pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 focus:outline-none focus:border-primary w-full font-semibold"
            >
              <option value="All">الكل</option>
              {Object.values(Genre).map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <SlidersHorizontal className="absolute left-3 top-9 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-light-surface dark:bg-surface rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xl text-gray-500">لا توجد ألعاب تطابق هذه المعايير حالياً.</p>
          <button 
            onClick={() => {setSelectedPlatform('All'); setSelectedGenre('All');}}
            className="mt-4 text-primary hover:underline font-bold"
          >
            إعادة تعيين الفلتر
          </button>
        </div>
      )}
    </div>
  );
};

export default Platforms;