import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon, MessageCircle, 
  ChevronLeft, Shield, Globe, Code, Bot, LogOut, User, Mail, Smartphone, Bell, Eye, Volume2, HardDrive, Paperclip
} from 'lucide-react';
import { ADMIN_CONFIG } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole, Language } from '../types';
import PageHeader from '../components/PageHeader';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { t, setLanguage, language } = useLanguage();
  const [supportMsg, setSupportMsg] = useState('');
  const [fileAttached, setFileAttached] = useState(false);

  const handleSupportSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      window.open(`mailto:${ADMIN_CONFIG.EMAIL}?subject=Support Request&body=${encodeURIComponent(supportMsg)}`);
  };

  const LANGS: { code: Language, label: string, flag: string }[] = [
      { code: 'ar', label: 'العربية', flag: '🇪🇬' },
      { code: 'en', label: 'English', flag: '🇺🇸' },
      { code: 'fr', label: 'Français', flag: '🇫🇷' },
      { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
      { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <PageHeader title={t('settings')} />
      
      <div className="pt-20 pb-10 px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Profile & General */}
              <div className="space-y-6">
                  {/* Profile Card */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative z-10 flex items-center gap-4">
                          {user && user.role !== 'guest' ? (
                              <>
                                <img src={user.avatar} className="w-16 h-16 rounded-full border-4 border-dark shadow-xl" alt="Avatar" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded font-bold border border-yellow-500/30">{user.points} {t('points')}</span>
                                        {user.role === UserRole.Admin && <span className="text-xs bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-bold">SUPER ADMIN</span>}
                                    </div>
                                </div>
                                <button onClick={logout} className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all">
                                    <LogOut size={20} />
                                </button>
                              </>
                          ) : (
                              <>
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-4 border-dark">
                                    <User size={32} className="text-gray-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white">{t('guest')}</h3>
                                    <p className="text-sm text-gray-500">Sign in to sync progress</p>
                                </div>
                                <Link to="/login" className="px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                    {t('login')}
                                </Link>
                              </>
                          )}
                      </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 gap-3">
                      <div className="bg-surface p-4 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <Bell className="text-blue-500" size={20} />
                              <span className="text-white font-bold text-sm">Notifications</span>
                          </div>
                          <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                      </div>
                      <div className="bg-surface p-4 rounded-xl border border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <Volume2 className="text-green-500" size={20} />
                              <span className="text-white font-bold text-sm">Sound FX</span>
                          </div>
                          <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
                      </div>
                  </div>

                  {/* Language Selector */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6">
                      <h3 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                          <Globe size={14} /> {t('language')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                          {LANGS.map(l => (
                              <button 
                                key={l.code}
                                onClick={() => setLanguage(l.code)}
                                className={`flex-1 min-w-[80px] py-3 rounded-xl border font-bold text-sm transition-all ${language === l.code ? 'bg-white text-black border-white' : 'bg-surface border-white/5 text-gray-500 hover:text-white'}`}
                              >
                                  <span className="mr-2">{l.flag}</span> {l.label}
                              </button>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Right Column: Support */}
              <div className="space-y-6">
                  {/* Direct Email Form */}
                  <div className="bg-card border border-white/5 rounded-3xl p-6">
                      <h3 className="text-gray-500 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                          <Mail size={14} /> Direct Support
                      </h3>
                      <form onSubmit={handleSupportSubmit} className="space-y-4">
                          <div className="relative">
                              <textarea 
                                value={supportMsg}
                                onChange={e => setSupportMsg(e.target.value)}
                                placeholder="Describe your issue..."
                                className="w-full bg-surface border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-primary h-32 resize-none"
                              />
                          </div>
                          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                              Send to {ADMIN_CONFIG.EMAIL}
                          </button>
                      </form>
                  </div>

                  {/* Quick Links */}
                  <div className="grid grid-cols-2 gap-4">
                      <a href={`https://wa.me/${ADMIN_CONFIG.WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="bg-[#25D366]/10 border border-[#25D366]/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-all cursor-pointer group">
                          <MessageCircle size={32} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                          <span className="text-[#25D366] font-bold text-sm">WhatsApp</span>
                      </a>
                      <Link to="/ai-chat" className="bg-purple-600/10 border border-purple-600/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-purple-600/20 transition-all cursor-pointer group">
                          <Bot size={32} className="text-purple-500 group-hover:scale-110 transition-transform" />
                          <span className="text-purple-500 font-bold text-sm">AI Helper</span>
                      </Link>
                  </div>
              </div>
          </div>
          
          <div className="text-center mt-12 mb-8">
              <p className="text-gray-600 text-xs font-mono">Developed By <span className="text-gray-400 font-bold">yasser shatta</span> • V12 Ultimate</p>
          </div>
      </div>
    </div>
  );
};

export default Settings;