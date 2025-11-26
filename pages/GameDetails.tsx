import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Download, Tag, Star, ArrowRight, Share2, Heart, Check, Coins } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';

const GameDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const game = MOCK_GAMES.find(g => g.id === id);
  const [isSaved, setIsSaved] = useState(false);
  const { addPoints } = useAuth();
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (game) {
       const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
       setIsSaved(savedGames.includes(game.id));
    }
  }, [game]);

  const handleSave = () => {
    if (!game) return;
    const savedGames = JSON.parse(localStorage.getItem('savedGames') || '[]');
    let newSaved;
    if (isSaved) {
       newSaved = savedGames.filter((gId: string) => gId !== game.id);
       setIsSaved(false);
    } else {
       newSaved = [...savedGames, game.id];
       setIsSaved(true);
    }
    localStorage.setItem('savedGames', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('libraryUpdated'));
  };

  const handleDownload = () => {
      if (!downloaded && game?.pointsReward) {
          addPoints(game.pointsReward);
          setDownloaded(true);
      }
      // window.open(game.downloadUrl, '_blank'); 
  };

  const handleShare = async () => {
      if (navigator.share) {
          try {
              await navigator.share({
                  title: game?.title,
                  text: `Check out ${game?.title} on El Ghalaba!`,
                  url: window.location.href
              });
          } catch (err) {
              console.error(err);
          }
      } else {
          // Fallback
          alert("Link copied to clipboard!");
      }
  };

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center px-4 bg-dark">
        <h2 className="text-3xl font-bold text-white">Game Not Found</h2>
        <Link to="/" className="text-primary hover:text-blue-700 flex items-center gap-2">
          <ArrowRight size={20} />
          Return Home
        </Link>
      </div>
    );
  }

  const similarGames = MOCK_GAMES
    .filter(g => g.genre === game.genre && g.id !== game.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark transition-colors duration-300">
      
      {/* V12 Standalone Header */}
      <PageHeader title={game.title} showShare onShare={handleShare} />

      {/* Banner Image */}
      <div className="relative h-72 md:h-96 w-full pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-light-bg dark:from-dark to-transparent z-10"></div>
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover blur-sm opacity-50"
        />
        
        <div className="absolute bottom-0 right-0 left-0 p-4 md:p-10 z-20 max-w-7xl mx-auto flex items-end gap-6">
           <img 
            src={game.thumbnail} 
            alt={game.title} 
            className="w-32 h-32 md:w-48 md:h-48 rounded-2xl shadow-2xl border-4 border-light-bg dark:border-dark hidden sm:block object-cover"
          />
          <div className="mb-2 w-full">
            <div className="flex gap-2 mb-2 flex-wrap">
              {game.platform.map(p => (
                <span key={p} className="bg-white/20 backdrop-blur-md text-gray-900 dark:text-white px-2 py-0.5 rounded text-xs font-bold border border-white/10">
                  {p}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-2 leading-tight drop-shadow-md">{game.title}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{game.publisher}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
          <div className="bg-light-surface dark:bg-card rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About Game</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {game.description}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="bg-light-surface dark:bg-card p-4 rounded-2xl border border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-2 text-accent mb-1">
                <Tag size={16} />
                <span className="text-sm font-bold">Genre</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">{game.genre}</p>
            </div>
             <div className="bg-light-surface dark:bg-card p-4 rounded-2xl border border-gray-200 dark:border-white/5">
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <Star size={16} />
                <span className="text-sm font-bold">Rating</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">{game.rating}/5</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="bg-light-surface dark:bg-card rounded-3xl p-6 border border-gray-200 dark:border-white/5 sticky top-24 shadow-lg">
            
            {/* Download Button with Points */}
            <button 
                onClick={handleDownload}
                disabled={downloaded}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-lg mb-4 active:scale-95 group relative overflow-hidden ${downloaded ? 'bg-green-600 text-white cursor-default' : 'bg-primary hover:bg-blue-700 text-white'}`}
            >
              {!downloaded && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-black px-2 py-1 rounded-bl-lg animate-pulse">
                      +{game.pointsReward || 5} Pts
                  </div>
              )}
              {downloaded ? (
                  <><Check size={24} /> Downloaded (+Points)</>
              ) : (
                  <><Download size={24} /> Download Now</>
              )}
            </button>
            
            <p className="text-center text-gray-400 text-xs mb-6">
              Official Store: {game.store}
            </p>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
               <button onClick={handleSave} className={`py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all border ${isSaved ? 'bg-red-500/10 border-red-500/50 text-red-500' : 'bg-gray-100 dark:bg-white/5 border-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}>
                  {isSaved ? <><Check size={18} /> Saved</> : <><Heart size={18} /> Save</>}
               </button>
               <button onClick={handleShare} className="py-3 rounded-xl flex items-center justify-center gap-2 font-bold bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                  <Share2 size={18} /> Share
               </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Games Section */}
      {similarGames.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-r-4 border-primary pr-3">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarGames.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;