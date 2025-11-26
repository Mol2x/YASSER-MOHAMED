import React from 'react';
import { ANNOUNCEMENTS } from '../constants';
import { Bell, Calendar } from 'lucide-react';

const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-primary/10 border-y border-primary/20 overflow-hidden relative h-10 flex items-center">
      <div className="absolute left-0 top-0 bottom-0 bg-primary px-3 flex items-center gap-2 z-20 shadow-xl">
        <Bell size={16} className="text-white animate-pulse" />
        <span className="text-xs font-black text-white uppercase tracking-wider">News</span>
      </div>
      
      <div className="animate-scroll whitespace-nowrap flex items-center gap-10 px-4">
        {ANNOUNCEMENTS.map(ann => (
           <div key={ann.id} className="flex items-center gap-2 inline-flex">
               <span className={`w-2 h-2 rounded-full ${ann.type === 'offer' ? 'bg-yellow-500' : 'bg-white'}`}></span>
               <span className="text-sm font-bold text-gray-200">{ann.text}</span>
               <div className="flex items-center gap-1 text-xs text-primary bg-black/30 px-2 py-0.5 rounded">
                   <Calendar size={10} /> {ann.date}
               </div>
           </div>
        ))}
        {/* Duplicate for infinite scroll loop visual */}
        {ANNOUNCEMENTS.map(ann => (
           <div key={`dup-${ann.id}`} className="flex items-center gap-2 inline-flex">
               <span className={`w-2 h-2 rounded-full ${ann.type === 'offer' ? 'bg-yellow-500' : 'bg-white'}`}></span>
               <span className="text-sm font-bold text-gray-200">{ann.text}</span>
               <div className="flex items-center gap-1 text-xs text-primary bg-black/30 px-2 py-0.5 rounded">
                   <Calendar size={10} /> {ann.date}
               </div>
           </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;