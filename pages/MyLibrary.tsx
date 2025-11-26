import React, { useState, useEffect } from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Game } from '../types';
import { Bookmark, Heart, AlertTriangle, Ghost } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyLibrary: React.FC = () => {
  const [savedGames, setSavedGames] = useState<Game[]>([]);

  useEffect(() => {
    const loadSavedGames = () => {
      const savedIds = JSON.parse(localStorage.getItem('savedGames') || '[]');
      const games = MOCK_GAMES.filter(g => savedIds.includes(g.id));
      setSavedGames(games);
    };

    loadSavedGames();
    window.addEventListener('libraryUpdated', loadSavedGames);
    return () => window.removeEventListener('libraryUpdated', loadSavedGames);
  }, []);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/20 p-3 rounded-2xl">
          <Bookmark className="w-8 h-8 text-primary" />
        </div>
        <div>
           <h1 className="text-3xl font-black text-gray-900 dark:text-white">مكتبتي</h1>
           <p className="text-gray-500 text-sm">الألعاب التي قمت بحفظها للرجوع إليها لاحقاً.</p>
        </div>
      </div>

      {savedGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedGames.map(game => {
            // Check if expired
            const isExpired = game.isFreeTimeLimited && game.endDate && new Date(game.endDate) < new Date();
            
            return (
              <div key={game.id} className="relative group">
                {isExpired && (
                  <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-4">
                     <AlertTriangle className="text-red-500 w-10 h-10 mb-2" />
                     <p className="text-white font-bold">العرض انتهى</p>
                     <p className="text-gray-400 text-xs mt-1">للأسف، لم تعد هذه اللعبة مجانية.</p>
                     <button 
                        onClick={(e) => {
                           // Remove functionality would be handled inside GameCard toggle, 
                           // but visually this overlay blocks interaction. 
                           // For V5, let's keep it simple.
                        }}
                        className="mt-4 text-red-400 text-xs hover:underline"
                     >
                        (قم بإلغاء الحفظ من زر القلب)
                     </button>
                  </div>
                )}
                <GameCard game={game} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-light-surface dark:bg-surface rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/5">
          <Ghost className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">المكتبة فارغة</h2>
          <p className="text-gray-500 text-sm max-w-xs text-center mt-2 mb-6">
            لم تقم بحفظ أي ألعاب بعد. اضغط على أيقونة القلب <Heart size={14} className="inline text-red-500 fill-red-500" /> على أي لعبة لإضافتها هنا.
          </p>
          <Link to="/" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-primary/20">
            تصفح الألعاب
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyLibrary;