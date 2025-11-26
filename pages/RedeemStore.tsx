import React, { useState } from 'react';
import { REDEEM_ITEMS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Lock, Unlock, AlertCircle, PlayCircle } from 'lucide-react';
import AdModal from '../components/AdModal';
import { UserRole } from '../types';

const RedeemStore: React.FC = () => {
  const { user, redeemPoints, addPoints } = useAuth();
  const [showAd, setShowAd] = useState(false);
  const [msg, setMsg] = useState<{type: 'success'|'error', text: string} | null>(null);

  const handleRedeem = (item: typeof REDEEM_ITEMS[0]) => {
     if (!user || user.role === UserRole.Guest) {
         setMsg({ type: 'error', text: 'يجب تسجيل الدخول لاستبدال النقاط.' });
         return;
     }

     const success = redeemPoints(item.pointsCost, item.id);
     if (success) {
         setMsg({ type: 'success', text: `تم شراء ${item.title} بنجاح! راجع لوحة التحكم لاستلام الكود.` });
     } else {
         setMsg({ type: 'error', text: 'لا يوجد رصيد كافي من النقاط.' });
     }
  };

  const handleAdReward = () => {
      addPoints(50);
  };

  return (
    <div className="min-h-screen pt-4 pb-24 px-4 bg-dark">
      <AdModal isOpen={showAd} onClose={() => setShowAd(false)} onReward={handleAdReward} />

      <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">متجر النقاط</h1>
          <p className="text-gray-400 text-sm">استبدل نقاطك بألعاب مدفوعة حقيقية</p>
          
          <div className="mt-6 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                  <p className="text-gray-400 text-xs">رصيدك الحالي</p>
                  <p className="text-2xl font-black text-yellow-400">{user?.points || 0} <span className="text-sm text-gray-400">نقطة</span></p>
              </div>
              <button 
                onClick={() => setShowAd(true)}
                className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
              >
                  <PlayCircle size={16} />
                  شاهد إعلان (+50)
              </button>
          </div>
      </div>

      {msg && (
          <div className={`p-3 rounded-xl mb-4 text-sm font-bold flex items-center gap-2 ${msg.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              <AlertCircle size={16} />
              {msg.text}
          </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
         {REDEEM_ITEMS.map(item => {
             const canAfford = (user?.points || 0) >= item.pointsCost;
             const isRedeemed = user?.redeemedItems.includes(item.id);

             return (
                 <div key={item.id} className="bg-card border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all">
                     <div className="h-40 relative">
                         <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                         <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded text-xs font-bold text-yellow-400 border border-yellow-500/30">
                             {item.pointsCost} نقطة
                         </div>
                     </div>
                     <div className="p-4">
                         <h3 className="text-white font-bold text-lg">{item.title}</h3>
                         <p className="text-gray-500 text-xs mb-4">{item.description}</p>
                         
                         <button 
                            onClick={() => !isRedeemed && handleRedeem(item)}
                            disabled={!canAfford && !isRedeemed}
                            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                isRedeemed 
                                ? 'bg-green-600 text-white cursor-default'
                                : canAfford 
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                            }`}
                         >
                             {isRedeemed ? (
                                 <><Unlock size={18} /> تم الشراء</>
                             ) : (
                                 <><Lock size={18} /> {canAfford ? 'شراء الآن' : 'نقاط غير كافية'}</>
                             )}
                         </button>
                     </div>
                 </div>
             )
         })}
      </div>
    </div>
  );
};

export default RedeemStore;
