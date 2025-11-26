import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_GAMES } from '../constants';
import { Platform } from '../types';
import GameCard from '../components/GameCard';
import CategoryBar from '../components/CategoryBar';
import AnnouncementBar from '../components/AnnouncementBar';
import { ArrowLeft, Zap, TrendingUp, Gauge, Coins, Crown, PlayCircle, Skull, Smartphone, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SectionHeader = ({ title, icon: Icon, to, color = "text-white" }: any) => (
  <div className="flex items-center justify-between px-4 mb-4">
    <div className="flex items-center gap-2">
      <div className={`p-1.5 rounded-lg bg-white/5 ${color.replace('text-', 'text-')}`}>
         {Icon && <Icon className={`w-5 h-5`} />}
      </div>
      <h2 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">{title}</h2>
    </div>
    {to && (
      <Link to={to} className="text-primary text-xs font-bold flex items-center hover:underline bg-primary/10 px-3 py-1 rounded-full transition-colors hover:bg-primary hover:text-white">
        View All <ArrowLeft size={12} className="ml-1" />
      </Link>
    )}
  </div>
);

const HorizontalScroll = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory scroll-pl-4">
    {children}
  </div>
);

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [turboMode, setTurboMode] = useState(false);
  const { t } = useLanguage();

  const getCategoryGames = () => {
    let base = MOCK_GAMES;
    if (activeCategory === 'low-spec') return base.filter(g => g.isLowSpec);
    if (activeCategory === 'mobile') {
        return base.filter(g => g.platform.some(p => String(p).includes('Android') || String(p).includes('iOS')));
    }
    if (activeCategory === 'pc') {
         return base.filter(g => g.platform.includes(Platform.PC) || g.platform.includes(Platform.PlayStation) || g.platform.includes(Platform.Xbox));
    }
    if (activeCategory === 'browser') {
        return base.filter(g => g.platform.includes(Platform.Browser));
    }
    return base;
  };

  const displayGames = getCategoryGames().filter(g => !g.platform.includes(Platform.Browser)).slice(0, 8);
  const browserGames = MOCK_GAMES.filter(g => g.platform.includes(Platform.Browser)).slice(0, 6);
  
  const dealOfTheDay = MOCK_GAMES.find(g => g.isFreeTimeLimited) || MOCK_GAMES[0];
  const topDownloaded = [...MOCK_GAMES].sort((a, b) => b.views - a.views).slice(0, 6);
  const topRated = [...MOCK_GAMES].sort((a, b) => b.votes - a.votes).slice(0, 5);
  // V10 Specific Filters
  const mobileGiants = MOCK_GAMES.filter(g => ['pubg_mobile', 'free_fire', 'cod_mobile'].includes(g.id));

  return (
    <div className={`space-y-8 min-h-screen bg-transparent transition-colors duration-300 pt-20`}>
      
      {/* V11 Announcement Bar */}
      <AnnouncementBar />

      {/* V9 Hero Banner */}
      <div className="mx-4 relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 p-[1px] shadow-[0_10px_30px_rgba(234,179,8,0.1)]">
          <div className="bg-black/80 backdrop-blur-xl rounded-[23px] p-5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none"></div>
              <div className="text-white z-10">
                  <h3 className="font-black text-xl flex items-center gap-2 mb-1 drop-shadow-md italic">
                      <Coins size={24} className="text-yellow-400 fill-yellow-500 animate-pulse" /> 
                      FREE POINTS
                  </h3>
                  <p className="text-xs text-gray-300 font-medium">Watch Ads & Download games to earn.</p>
              </div>
              <Link to="/redeem" className="bg-white text-black px-6 py-3 rounded-xl text-xs font-black hover:scale-105 transition-transform flex items-center gap-2 shadow-lg z-10">
                  <PlayCircle size={16} /> GO STORE
              </Link>
          </div>
      </div>

      <CategoryBar selected={activeCategory} onSelect={setActiveCategory} />

      {/* Main Grid */}
      <section className="px-4 animate-slide-up">
        <SectionHeader title="Recently Added" icon={Zap} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayGames.map(game => <GameCard key={game.id} game={game} turboMode={turboMode} />)}
        </div>
      </section>

      {activeCategory === 'all' && (
        <>
            {/* V10 Mobile Giants */}
            <section className="bg-gradient-to-r from-black via-blue-900/10 to-black py-8 border-y border-white/5">
                <SectionHeader title={t('mobileGiants')} icon={Smartphone} color="text-blue-400" to="/mobile" />
                <HorizontalScroll>
                    {mobileGiants.map((game) => (
                        <div key={game.id} className="snap-start min-w-[160px]">
                            <GameCard game={game} compact turboMode={turboMode} />
                        </div>
                    ))}
                </HorizontalScroll>
            </section>
            
            {/* V11 Browser Games Row */}
            <section className="px-4">
                <SectionHeader title={t('browserGames')} icon={Globe} color="text-green-400" to="/browser-games" />
                <HorizontalScroll>
                    {browserGames.map((game) => (
                        <div key={game.id} className="snap-start min-w-[160px]">
                            <GameCard game={game} compact turboMode={turboMode} />
                        </div>
                    ))}
                </HorizontalScroll>
            </section>

            {/* Crack Sites Link */}
            <section className="px-4">
                <Link to="/crack-sites" className="block relative overflow-hidden rounded-2xl group border border-red-900/30">
                    <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/20 transition-colors"></div>
                    <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                             <div className="p-3 bg-red-500/10 rounded-full text-red-500">
                                 <Skull size={24} />
                             </div>
                             <div>
                                 <h3 className="text-lg font-black text-white">{t('crackSites')}</h3>
                                 <p className="text-xs text-gray-400">FitGirl, DODI, SteamRIP</p>
                             </div>
                        </div>
                        <ArrowLeft className="text-red-500" />
                    </div>
                </Link>
            </section>

            {/* Top 10 */}
            <section className="px-4">
                <SectionHeader title={t('top10')} icon={Crown} color="text-yellow-400" to="/top10" />
                <HorizontalScroll>
                    {topRated.map((game, index) => (
                        <div key={game.id} className="snap-start min-w-[150px]">
                            <GameCard game={game} compact rank={index + 1} turboMode={turboMode} />
                        </div>
                    ))}
                </HorizontalScroll>
            </section>

            {/* Deal of Day */}
            <section className="px-4">
                <SectionHeader title={t('dealOfDay')} icon={Zap} color="text-cyan-400" />
                <div className={`relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer`}>
                    <img src={dealOfTheDay.thumbnail} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" alt="Deal" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded w-fit mb-2 uppercase tracking-wide neon-glow">FREE NOW</span>
                        <h2 className="text-3xl font-black text-white mb-1 leading-none drop-shadow-lg">{dealOfTheDay.title}</h2>
                        <div className="flex gap-3 text-xs text-gray-300 mb-5 font-bold">
                            <span className="bg-black/50 px-2 py-1 rounded backdrop-blur">{dealOfTheDay.genre}</span> 
                            <span className="bg-black/50 px-2 py-1 rounded backdrop-blur">{dealOfTheDay.store}</span>
                        </div>
                        <Link to={`/game/${dealOfTheDay.id}`} className="w-full bg-white text-black font-black py-3.5 rounded-xl text-center text-sm hover:bg-gray-200 transition-colors shadow-lg">
                            {t('download')}
                        </Link>
                    </div>
                </div>
            </section>
        </>
      )}
    </div>
  );
};

export default Home;