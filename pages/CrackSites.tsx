import React from 'react';
import { CRACK_SITES, CRACK_POPULAR_GAMES } from '../constants';
import { AlertTriangle, ExternalLink, Skull } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useLanguage } from '../context/LanguageContext';

const CrackSites: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-dark">
      <PageHeader title={t('crackSites')} />
      
      <div className="pt-24 pb-10 px-4 max-w-4xl mx-auto">
         
         <div className="text-center mb-10">
             <div className="inline-block p-4 rounded-full bg-red-600/10 mb-4 border border-red-600/30">
                 <Skull className="w-12 h-12 text-red-600" />
             </div>
             <h1 className="text-3xl font-black text-white mb-2">CRACK & REPACK SITES</h1>
             <p className="text-gray-400">Trusted sources for offline game installation.</p>
         </div>

         <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex gap-3 items-start mb-8">
             <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
             <div>
                 <h4 className="text-yellow-500 font-bold text-sm uppercase mb-1">Warning: Use at your own risk</h4>
                 <p className="text-gray-400 text-xs">
                     We are not responsible for any malware or issues. Use AdBlock.
                 </p>
             </div>
         </div>

         <div className="space-y-6">
             {CRACK_SITES.map(site => (
                 <div key={site.id} className="bg-card border border-white/5 p-6 rounded-2xl group hover:border-white/20 transition-all">
                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                         <div className="text-center sm:text-left">
                             <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{site.name}</h3>
                             <p className="text-gray-500 text-sm mb-2">{site.description}</p>
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${site.riskLevel === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' : 'bg-red-500/10 text-red-500 border-red-500/30'}`}>
                                 Risk: {site.riskLevel}
                             </span>
                         </div>
                         <a 
                            href={site.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all border border-white/10"
                         >
                             Visit Site <ExternalLink size={16} />
                         </a>
                     </div>

                     <div className="border-t border-white/5 pt-4">
                         <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Popular Downloads</h4>
                         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                             {CRACK_POPULAR_GAMES.map((game, idx) => (
                                 <div key={idx} className="min-w-[120px] w-[120px] group/game cursor-pointer">
                                     <div className="h-32 rounded-lg overflow-hidden relative mb-2">
                                         <img src={game.img} alt={game.title} className="w-full h-full object-cover opacity-70 group-hover/game:opacity-100 transition-opacity" />
                                         <div className="absolute bottom-1 right-1 bg-black/70 text-[10px] text-white px-1 rounded">
                                             {game.size}
                                         </div>
                                     </div>
                                     <p className="text-xs text-gray-300 font-bold line-clamp-1">{game.title}</p>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </div>
             ))}
         </div>

      </div>
    </div>
  );
};

export default CrackSites;