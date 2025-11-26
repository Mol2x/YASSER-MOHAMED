import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Gamepad2, Lock, Chrome, User, Shield } from 'lucide-react';
import { APP_NAME } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    setTimeout(async () => {
        const success = await login(email, pass);
        setLoading(false);
        if (success) {
            navigate('/');
        } else {
            setError('بيانات الدخول غير صحيحة. (للمطور: yasser / shattavv9)');
        }
    }, 1000);
  };

  const handleGoogleLogin = async () => {
      setLoading(true);
      const success = await googleLogin();
      setLoading(false);
      if (success) navigate('/');
      else setError('فشل الاتصال بـ Google. تأكد من إعدادات Firebase.');
  };

  const handleGuest = async () => {
      navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[100px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
           <div className="inline-block p-4 rounded-2xl bg-black border border-primary/30 shadow-[0_0_30px_rgba(139,92,246,0.2)] mb-4">
              <Gamepad2 className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{t('login')}</h1>
           <p className="text-gray-400">V12 OFFICIAL RELEASE</p>
        </div>

        <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-white/5">
           <form onSubmit={handleLogin} className="space-y-4">
              
              {error && <div className="text-red-500 text-xs text-center font-bold bg-red-500/10 p-2 rounded flex items-center justify-center gap-2"><Shield size={12}/> {error}</div>}

              <div className="space-y-2">
                 <label className="text-xs text-gray-500 font-bold uppercase ml-1">Username / Email</label>
                 <div className="relative group">
                    <User className="absolute right-3 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="text" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all placeholder:text-gray-600"
                      placeholder="Username"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs text-gray-500 font-bold uppercase ml-1">Password</label>
                 <div className="relative group">
                    <Lock className="absolute right-3 top-3.5 text-gray-500 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password"
                      value={pass}
                      onChange={e => setPass(e.target.value)}
                      required
                      className="w-full bg-black/50 border border-white/10 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all placeholder:text-gray-600"
                      placeholder="********"
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary hover:bg-purple-600 text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
              >
                {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : t('login')}
              </button>
           </form>

           <button 
             onClick={handleGoogleLogin} 
             disabled={loading}
             className="w-full mt-4 bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
           >
              <Chrome size={18} />
              {t('googleLogin')}
           </button>

           <div className="my-6 flex items-center gap-3">
              <div className="h-px bg-white/10 flex-1"></div>
              <span className="text-gray-500 text-xs font-bold">OR</span>
              <div className="h-px bg-white/10 flex-1"></div>
           </div>

           <button onClick={handleGuest} className="w-full py-2 text-xs font-bold text-gray-500 uppercase transition-all hover:text-white hover:underline">
               {t('guest')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default Login;