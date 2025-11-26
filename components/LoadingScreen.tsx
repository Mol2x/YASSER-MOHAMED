import React from 'react';
import { Gamepad2, Loader2 } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-dark flex flex-col items-center justify-center">
      <div className="relative">
         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-slow"></div>
         <Gamepad2 size={64} className="text-primary relative z-10 animate-bounce-short" />
      </div>
      <h2 className="mt-6 text-2xl font-black text-white tracking-widest uppercase animate-pulse">
        الغلابه <span className="text-primary">V10</span>
      </h2>
      <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm font-mono">
         <Loader2 size={16} className="animate-spin" />
         LOADING ASSETS...
      </div>
      
      {/* Fake Progress Bar */}
      <div className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden">
         <div className="h-full bg-gradient-to-r from-primary to-secondary w-full animate-[slideRight_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;