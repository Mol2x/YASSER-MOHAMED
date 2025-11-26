import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, MoreVertical } from 'lucide-react';
import { useSound } from '../context/SoundContext';

interface PageHeaderProps {
  title: string;
  onShare?: () => void;
  showShare?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onShare, showShare = false }) => {
  const navigate = useNavigate();
  const { playSound } = useSound();

  const handleBack = () => {
    playSound('click');
    navigate(-1);
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-dark/90 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-4 shadow-lg">
      <button 
        onClick={handleBack} 
        className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 active:scale-95 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <h1 className="text-lg font-black text-white truncate max-w-[200px]">{title}</h1>

      <div className="flex items-center gap-2">
        {showShare && (
          <button 
            onClick={onShare} 
            className="p-2 rounded-full bg-white/5 text-primary hover:bg-white/10 active:scale-95 transition-all"
          >
            <Share2 size={20} />
          </button>
        )}
        <div className="w-8"></div> {/* Spacer for balance if needed */}
      </div>
    </div>
  );
};

export default PageHeader;