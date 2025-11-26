import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Settings, Mail } from 'lucide-react';
import { ADMIN_CONFIG } from '../constants';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-light-bg dark:bg-black transition-colors duration-300">
      <div className="text-center max-w-sm">
         <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4 text-primary animate-pulse">
            <Settings size={32} />
         </div>
         <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Support Moved</h1>
         <p className="text-gray-500 text-sm mb-6">
           Support is now available in the Settings menu or via email.
         </p>
         
         <div className="flex flex-col gap-3">
             <Link 
              to="/settings" 
              className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
             >
               <Settings size={18} />
               Go to Settings
             </Link>
             
             <a 
              href={`mailto:${ADMIN_CONFIG.EMAIL}`}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
             >
               <Mail size={18} />
               Email Support
             </a>
         </div>
      </div>
    </div>
  );
};

export default Contact;
