import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Search, Settings as SettingsIcon, Shield, Coins, Menu, Globe, Volume2, VolumeX } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useSound } from '../context/SoundContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const { playSound, isMuted, toggleMute } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* V10 Logo with Palestinian Flag */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => playSound('click')}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover:opacity-60 transition-opacity rounded-full duration-500"></div>
              <div className="relative bg-white/5 p-2.5 rounded-2xl border border-white/10 group-hover:border-primary/50 transition-all">
                 <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter leading-none group-hover:text-primary transition-colors flex items-center gap-2">
                 {APP_NAME}
                 {/* Palestinian Flag V11 */}
                 <span className="text-xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" title="Palestine">🇵🇸</span>
              </span>
              <span className="text-[9px] text-gray-400 font-bold tracking-[0.3em] uppercase group-hover:text-white transition-colors">V12 OFFICIAL</span>
            </div>
          </Link>

          {/* V10 Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Admin Badge */}
            {(user?.role === UserRole.Admin || user?.role === UserRole.Assistant) && (
                 <Link to="/admin" className="hidden md:flex items-center gap-1 bg-red-600/10 border border-red-600/50 rounded-lg px-3 py-1.5 text-xs text-red-500 font-bold hover:bg-red-600 hover:text-white transition-all">
                    <Shield size={12} /> {user.role === UserRole.Admin ? 'Super Admin' : 'Assistant'}
                 </Link>
            )}

            {/* Sound Toggle */}
            <button onClick={toggleMute} className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-all">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Language */}
            <button onClick={() => { toggleLanguage(); playSound('click'); }} className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10">
               <div className="flex items-center gap-1">
                 <Globe size={18} />
                 <span className="text-xs font-bold uppercase hidden md:inline">{language}</span>
               </div>
            </button>

            {/* Points (Economy V10) */}
            {user && user.role !== 'guest' && (
                <Link to="/redeem" onClick={() => playSound('click')} className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-xl px-4 py-2 hover:border-yellow-500/50 transition-all group">
                    <Coins size={16} className="text-yellow-500 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-black text-white">{user.points}</span>
                </Link>
            )}

            <Link 
              to="/search" 
              onClick={() => playSound('click')}
              className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
            >
              <Search size={20} />
            </Link>

            {/* Settings V10 (Top Right) */}
            <Link 
              to="/settings"
              onClick={() => playSound('click')}
              className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border border-primary/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
               <SettingsIcon size={20} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;