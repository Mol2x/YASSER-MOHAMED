import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Code2 } from 'lucide-react';

const WelcomeDevModal: React.FC = () => {
  const { showWelcomeDev, setShowWelcomeDev } = useAuth();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (showWelcomeDev) {
        setStage(1);
        setTimeout(() => setStage(2), 500); // Slide up
        setTimeout(() => setStage(3), 1000); // Text Glow
        setTimeout(() => {
            setStage(0);
            setShowWelcomeDev(false);
        }, 3500);
    }
  }, [showWelcomeDev]);

  if (!showWelcomeDev) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden">
       {/* Background Beams */}
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black animate-pulse"></div>
       
       <div className={`transition-all duration-700 transform ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
           <div className="p-6 rounded-full bg-primary/20 border-2 border-primary shadow-[0_0_50px_rgba(139,92,246,0.6)] mb-6 mx-auto w-fit">
               <ShieldCheck size={80} className="text-white" />
           </div>
           
           <h1 className={`text-5xl md:text-7xl font-black text-center text-white uppercase tracking-tighter mb-4 transition-all duration-500 ${stage >= 3 ? 'text-shadow-neon' : ''}`}>
               Welcome <br/> <span className="text-primary">Developer</span>
           </h1>
           
           <div className="flex items-center justify-center gap-2 text-gray-400 font-mono">
               <Code2 size={20} />
               <span>SYSTEM ACCESS GRANTED</span>
           </div>
       </div>

       <style>{`
         .text-shadow-neon {
            text-shadow: 0 0 10px #fff, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;
         }
       `}</style>
    </div>
  );
};

export default WelcomeDevModal;