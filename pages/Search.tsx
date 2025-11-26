import React, { useState } from 'react';
import { MOCK_GAMES } from '../constants';
import GameCard from '../components/GameCard';
import { Search as SearchIcon, Bot, Loader2, X } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const { t } = useLanguage();

  const filteredGames = query 
    ? MOCK_GAMES.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.description.toLowerCase().includes(query.toLowerCase()) ||
        game.genre.includes(query)
      )
    : [];

  const handleAskAI = async () => {
    if (!query) return;
    setIsAiLoading(true);
    setAiResponse(null);
    const response = await getAIRecommendation(query);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark">
      <PageHeader title={t('search')} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-24">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن اسم لعبة، نوع، منصة..."
              className="w-full bg-light-surface dark:bg-surface text-gray-900 dark:text-white pl-4 pr-12 py-4 rounded-2xl border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-xl transition-all placeholder:text-gray-400"
              autoFocus
            />
            {query ? (
              <button onClick={() => setQuery('')} className="absolute right-4 top-4 text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            ) : (
              <SearchIcon className="absolute right-4 top-4 text-gray-400" size={24} />
            )}
          </div>

          <div className="flex gap-2 justify-center mt-4 flex-wrap">
            {['Action', 'RPG', 'Steam', 'Free', 'Shooter'].map(tag => (
                <button key={tag} onClick={() => setQuery(tag)} className="text-xs bg-light-card dark:bg-surface border border-gray-200 dark:border-white/10 px-3 py-1 rounded-full text-gray-500 hover:border-primary hover:text-primary transition-colors">
                  {tag}
                </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
              <button
                  onClick={handleAskAI}
                  disabled={!query || isAiLoading}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <Bot size={18} />
                  {isAiLoading ? 'جاري التفكير...' : `اقتراح ذكي لـ "${query || '...'}"`}
              </button>
          </div>
        </div>

        {aiResponse && (
            <div className="max-w-3xl mx-auto mb-10 p-6 bg-gradient-to-r from-surface to-slate-900 rounded-xl border border-primary/30 shadow-lg shadow-primary/5">
                <div className="flex items-center gap-2 mb-3 text-primary">
                    <Bot size={20} />
                    <h3 className="font-bold">المساعد الذكي</h3>
                </div>
                <p className="text-gray-200 leading-relaxed whitespace-pre-line">{aiResponse}</p>
            </div>
        )}

        {query && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">النتائج ({filteredGames.length})</h2>
            </div>
            
            {filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-light-surface dark:bg-surface/30 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-bold">لم نجد ألعاباً تطابق بحثك.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;