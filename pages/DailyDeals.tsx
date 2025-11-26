import React from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Trophy, Info } from 'lucide-react';

const DailyDeals: React.FC = () => {
  // Logic: Get high rated games + games added recently
  const deals = MOCK_GAMES.filter(g => g.rating > 4.5 || new Date(g.addedDate).getFullYear() >= 2023);

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="bg-primary/20 p-4 rounded-full mb-4">
            <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">عروض اليوم المميزة</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg">تم اختيار هذه القائمة بعناية. ألعاب ذات تقييم عالي ومجانية بالكامل لفترة غير محدودة.</p>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
         <Info className="text-yellow-600 shrink-0 mt-0.5" size={20} />
         <p className="text-sm text-yellow-700 dark:text-yellow-500">
            يتم تحديث هذه القائمة يومياً بناءً على تقييمات اللاعبين وتوافر العروض في المتاجر الرسمية.
         </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {deals.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default DailyDeals;