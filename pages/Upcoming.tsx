import React from 'react';
import { MOCK_GAMES } from '../constants';
import { CalendarClock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Upcoming: React.FC = () => {
  const upcomingGames = MOCK_GAMES.filter(g => g.isComingSoon);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 bg-black">
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-yellow-500/10 mb-3">
          <CalendarClock className="text-yellow-500 w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">قادمة مجاناً</h1>
        <p className="text-gray-400 text-sm mt-2">استعد لهذه العروض قبل نزولها!</p>
      </div>

      {upcomingGames.length > 0 ? (
        <div className="space-y-4">
          {upcomingGames.map(game => (
            <div key={game.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="h-40 md:w-1/3 md:h-auto relative">
                <img src={game.thumbnail} alt={game.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-black/60 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-xl font-bold">
                        {game.availableDate}
                    </span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-white">{game.title}</h2>
                    <span className="text-xs bg-surface border border-white/10 px-2 py-1 rounded text-gray-400">{game.store}</span>
                </div>
                <p className="text-gray-400 text-sm mb-4">{game.description}</p>
                <div className="mt-auto">
                    <button disabled className="w-full bg-white/5 text-gray-400 py-3 rounded-lg font-bold text-sm cursor-not-allowed">
                        سيتاح قريباً
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-surface rounded-2xl border border-dashed border-gray-800">
          <p className="text-gray-400">لا توجد عروض معلنة حالياً. عد لاحقاً!</p>
          <Link to="/" className="text-primary mt-4 inline-block text-sm">العودة للرئيسية</Link>
        </div>
      )}
    </div>
  );
};

export default Upcoming;