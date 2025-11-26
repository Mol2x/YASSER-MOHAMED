import React, { useState, useEffect } from 'react';
import { X, Play, Loader2, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: () => void; // Legacy prop, functionality moved to context logic
}

const AdModal: React.FC<AdModalProps> = ({ isOpen, onClose }) => {
  const { watchAd } = useAuth();
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState(5);
  const [canClose, setCanClose] = useState(false);
  const [adState, setAdState] = useState<'loading' | 'playing' | 'finished' | 'cooldown'>('loading');
  const [cooldownTime, setCooldownTime] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAdState('loading');
      
      // Attempt to watch ad via context (checks cooldown)
      setTimeout(() => {
         const result = watchAd();
         if (result.success) {
             setAdState('playing');
         } else {
             setCooldownTime(result.cooldown || Date.now() + 10000);
             setAdState('cooldown');
         }
      }, 1000);

    } else {
        setTimeLeft(5);
        setCanClose(false);
        setCooldownTime(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (adState === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && adState === 'playing') {
      setCanClose(true);
      setAdState('finished');
    }
  }, [adState, timeLeft]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 backdrop-blur-sm">
       <button 
         onClick={onClose} 
         className={`absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all ${(!canClose && adState === 'playing') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
       >
         <X size={24} />
       </button>

       {/* Countdown */}
       {adState === 'playing' && !canClose && (
           <div className="absolute top-4 left-4 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full border border-white/20">
              Reward in {timeLeft}s
           </div>
       )}

       <div className="w-full max-w-sm aspect-[9/16] bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-white/10 relative overflow-hidden shadow-2xl">
           
           {adState === 'loading' && (
               <div className="flex flex-col items-center gap-2">
                   <Loader2 className="animate-spin text-white" size={32} />
                   <p className="text-gray-300 text-sm">Connecting to Ad Network...</p>
               </div>
           )}

           {adState === 'playing' && (
               <>
                 <div className="animate-bounce mb-4">
                    <Play size={48} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                 </div>
                 <h2 className="text-2xl font-black text-white mb-2">EPIC GAME AD</h2>
                 <p className="text-white/80">Support El Ghalaba & Earn Points!</p>
                 <div className="absolute bottom-0 left-0 h-2 bg-yellow-400 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 5) * 100}%` }}></div>
               </>
           )}

           {adState === 'finished' && (
               <div className="flex flex-col items-center gap-4 animate-fade-in-up">
                   <div className="bg-green-500 p-4 rounded-full text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                       <Play size={32} />
                   </div>
                   <h2 className="text-xl font-bold text-white">Reward Earned!</h2>
                   <p className="text-gray-300 text-sm">+5 Points added to your balance.</p>
                   <button onClick={onClose} className="mt-4 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                       Close
                   </button>
               </div>
           )}

           {adState === 'cooldown' && (
               <div className="flex flex-col items-center gap-4 animate-fade-in-up">
                   <div className="bg-red-500/20 p-4 rounded-full text-red-500 border border-red-500/50">
                       <Clock size={32} />
                   </div>
                   <h2 className="text-xl font-bold text-white">Cooldown Active</h2>
                   <p className="text-gray-300 text-sm max-w-[200px]">You can watch another ad in 5 hours.</p>
                   <p className="text-xs text-gray-500 mt-2">Next ad available at: {cooldownTime ? new Date(cooldownTime).toLocaleTimeString() : '...'}</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default AdModal;