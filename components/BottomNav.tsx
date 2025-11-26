import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Smartphone, Bookmark, Gamepad2, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const { playSound } = useSound();

  // V9: Settings removed from here, moved to Header. Added focus on Games/Store.
  const navItems = [
    { name: t('home'), path: '/', icon: <Home size={22} /> },
    { name: t('mobile'), path: '/mobile', icon: <Smartphone size={22} /> },
    { name: t('devGames'), path: '/dev-games', icon: <Gamepad2 size={22} /> }, 
    { name: t('store'), path: '/redeem', icon: <ShoppingBag size={22} /> },
    { name: t('library'), path: '/library', icon: <Bookmark size={22} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 rounded-3xl pb-safe z-50 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => playSound('click')}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full rounded-2xl transition-all duration-300 relative ${
                isActive ? 'text-white' : 'text-gray-600'
              }`}
            >
              <div className={`transition-all duration-300 ${isActive ? 'bg-primary/20 p-2 rounded-xl text-primary -translate-y-3 shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-primary/30' : ''}`}>
                {item.icon}
              </div>
              {isActive && (
                   <span className="text-[9px] font-bold absolute bottom-2">{item.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;