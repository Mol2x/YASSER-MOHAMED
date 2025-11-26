import React from 'react';
import { APP_NAME } from '../constants';
import { Heart, Code2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark/90 border-t border-white/5 py-10 mt-auto backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        
        <div className="flex items-center gap-2">
           <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50"></div>
           <p className="text-gray-500 text-sm">
             &copy; {new Date().getFullYear()} {APP_NAME}. جميع الحقوق محفوظة.
           </p>
           <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50"></div>
        </div>

        {/* Developer Signature - RGB Glow */}
        <div className="relative group cursor-default">
           <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-rgb-flow"></div>
           <div className="relative bg-black px-6 py-3 rounded-lg border border-white/5 flex items-center gap-2">
              <Code2 size={16} className="text-gray-500" />
              <span className="text-sm font-bold text-gray-400">Developed By</span>
              <span className="text-sm font-black tracking-widest uppercase rgb-text">yasser shatta</span>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;