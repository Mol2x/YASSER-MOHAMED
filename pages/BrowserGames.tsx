import React from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Platform } from '../types';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';

const BrowserGames: React.FC = () => {
  const { t } = useLanguage();
  const browserGames = MOCK_GAMES.filter(g => g.platform.includes(Platform.Browser));

  return (
    <div className="min-h-screen bg-dark">
      <PageHeader title={t('browserGames')} />
      
      <div className="pt-24 pb-10 px-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
              <Globe className="text-blue-500 w-8 h-8" />
          </div>
          <div>
              <h1 className="text-2xl font-black text-white">{t('browserGames')}</h1>
              <p className="text-gray-400 text-sm">Play instantly without downloading.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {browserGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowserGames;