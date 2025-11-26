import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Gamepad2, Coins, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DeveloperGames: React.FC = () => {
  const { addPoints } = useAuth();
  const { t } = useLanguage();
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
      setClicks(prev => prev + 1);
      const points = 1 * multiplier;
      setScore(prev => prev + points);
      
      // Simple click visual effect logic could go here
      if (clicks % 10 === 0) {
          addPoints(1); // Real points every 10 clicks
      }
  };

  const buyUpgrade = () => {
      if (score >= 50) {
          setScore(prev => prev - 50);
          setMultiplier(prev => prev + 1);
      }
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 bg-black flex flex-col items-center">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white flex items-center justify-center gap-2">
                <Gamepad2 className="text-primary" /> {t('devGames')}
            </h1>
            <p className="text-gray-400">Play "Cyber Clicker" to earn real points!</p>
        </div>

        <div className="bg-card border border-primary/30 p-8 rounded-3xl w-full max-w-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary animate-pulse"></div>
            
            <div className="flex justify-between items-center mb-6 bg-black/40 p-3 rounded-xl">
                 <div className="text-left">
                     <p className="text-xs text-gray-500 font-bold uppercase">Game Score</p>
                     <p className="text-2xl font-black text-white">{score}</p>
                 </div>
                 <div className="text-right">
                     <p className="text-xs text-gray-500 font-bold uppercase">Multiplier</p>
                     <p className="text-xl font-black text-yellow-400">x{multiplier}</p>
                 </div>
            </div>

            <button 
               onClick={handleClick}
               className="w-40 h-40 bg-gradient-to-br from-primary to-purple-800 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.4)] flex flex-col items-center justify-center transition-transform active:scale-90 mx-auto border-4 border-white/10 group hover:border-white/30"
            >
                <Zap size={40} className="text-white fill-white group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white mt-2">CLICK!</span>
            </button>

            <p className="text-xs text-gray-500 mt-6">Every 10 clicks = 1 App Point</p>

            <button 
              onClick={buyUpgrade}
              disabled={score < 50}
              className={`mt-4 w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${score >= 50 ? 'bg-green-600 text-white' : 'bg-white/5 text-gray-500'}`}
            >
                Upgrade (50 Score)
            </button>
        </div>
    </div>
  );
};

export default DeveloperGames;
