import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Game, Store } from '../types';
import { Smartphone, Monitor, Gamepad, Zap, Eye, Star, Heart, Globe, BatteryLow, Coins } from 'lucide-react';

interface GameCardProps {
  game: Game;
  compact?: boolean;
  rank?: number;
  turboMode?: boolean; 
}

const GameCard: React.FC<GameCardProps> = ({ game, compact = false, rank, turboMode = false }) => {
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    setIsSaved(savedGames.includes(game.id));
    const handleStorage = () => {
      const currentSaved = JSON.parse(localStorage.getItem('savedGames') || '[]');
      setIsSaved(currentSaved.includes(game.id));
    };
    window.addEventListener('storage', handleStorage);
    window.addEventListener('libraryUpdated', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('libraryUpdated', handleStorage);
    };
  }, [game.id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    let newSaved;
    if (isSaved) {
      newSaved = savedGames.filter((id: string) => id !== game.id);
      setIsSaved(false);
    } else {
      newSaved = [...savedGames, game.id];
      setIsSaved(true);
    }
    localStorage.setItem('savedGames', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('libraryUpdated'));
  };

  const getPlatformIcon = (platforms: string[]) => {
    const pStr = platforms.map(String);
    if (pStr.some(p => p.includes('Browser') || p.includes('Web'))) return <Globe size={12} />;
    if (pStr.some(p => p.includes('Mobile') || p.includes('Android') || p.includes('iOS'))) return <Smartphone size={12} />;
    if (pStr.some(p => p.includes('PC'))) return <Monitor size={12} />;
    return <Gamepad size={12} />;
  };

  return (
    <Link 
      to={`/game/${game.id}`}
      className={`group relative bg-card rounded-xl overflow-hidden block transition-all duration-300 ${!turboMode && 'hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:-translate-y-1 hover:border-primary/50'} border border-white/5 ${compact ? 'min-w-[150px] w-[150px] md:min-w-[200px] md:w-[200px]' : 'w-full'}`}
    >
      {/* Rank Badge */}
      {rank && (
        <div className="absolute top-0 left-0 bg-gradient-to-br from-yellow-500 to-orange-600 text-white font-black text-sm md:text-lg w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-br-2xl z-20 shadow-lg">
          {rank}
        </div>
      )}

      {/* Save Button */}
      <button 
        onClick={toggleSave}
        className="absolute top-2 left-2 z-30 p-2 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10 hover:border-primary/50 transition-all"
      >
        <Heart 
          size={16} 
          className={`transition-all duration-300 ${isSaved ? 'fill-primary text-primary' : 'text-gray-400 hover:text-white'}`} 
        />
      </button>

      {/* Image */}
      <div className={`${compact ? 'h-28 md:h-36' : 'h-40 md:h-52'} relative overflow-hidden`}>
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">
          {game.pointsReward && (
              <span className="bg-yellow-500/90 text-black text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                  <Coins size={10} fill="black" /> +{game.pointsReward}
              </span>
          )}
          {game.isLowSpec && (
             <span className="bg-green-500/90 text-black text-[9px] md:text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.4)]">
               <BatteryLow size={10} fill="black" /> 
               <span className="hidden md:inline">Low Spec</span>
             </span>
          )}
        </div>

        {/* Store Label */}
        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black via-black/80 to-transparent flex justify-end">
             <span className="text-[9px] md:text-[10px] font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded border border-white/5 backdrop-blur-sm">
               {game.store}
             </span>
        </div>
      </div>
      
      {/* Content Body */}
      <div className="p-3 relative">
        <h3 className={`font-bold text-gray-100 mb-1 leading-tight ${compact ? 'text-xs md:text-sm line-clamp-1' : 'text-sm md:text-base line-clamp-1'}`}>
          {game.title}
        </h3>
        
        <div className="flex items-center justify-between text-gray-400 text-xs mb-2">
            <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded">
                {getPlatformIcon(game.platform.map(String))}
                <span className="truncate max-w-[70px] text-[10px] font-medium">{game.genre}</span>
            </div>
            {!compact && (
                <div className="flex items-center gap-1 text-secondary">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">{game.rating}</span>
                </div>
            )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
