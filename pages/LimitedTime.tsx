import React from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Clock, AlertTriangle } from 'lucide-react';

const LimitedTime: React.FC = () => {
  const limitedGames = MOCK_GAMES.filter(g => g.isFreeTimeLimited);

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Clock className="text-red-500 w-6 h-6 animate-pulse" />
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">فرصة أخيرة</h1>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">ألعاب ستصبح مدفوعة قريباً. أضفها لمكتبتك الآن وامتلكها للأبد.</p>
          </div>
          
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg shadow-red-500/20">
             {limitedGames.length} عروض تنتهي قريباً
          </div>
      </div>

      {limitedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {limitedGames.map(game => (
            <div key={game.id} className="relative group">
               <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-red-500 flex items-center gap-2">
                  <Clock size={12} className="text-red-500" />
                  ينتهي: {game.endDate}
               </div>
               <GameCard game={game} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-light-surface dark:bg-surface rounded-2xl border border-white/5">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">لا توجد عروض محدودة الوقت حالياً. تفقد الصفحة غداً!</p>
        </div>
      )}
    </div>
  );
};

export default LimitedTime;