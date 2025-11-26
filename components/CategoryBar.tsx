import React from 'react';
import { Monitor, Smartphone, Globe, Gamepad2, Grid, BatteryLow } from 'lucide-react';

interface CategoryBarProps {
  selected: string;
  onSelect: (id: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selected, onSelect }) => {
  const categories = [
    { id: 'all', name: 'الكل', icon: Grid },
    { id: 'low-spec', name: 'جهاز ضعيف', icon: BatteryLow },
    { id: 'pc', name: 'PC', icon: Monitor },
    { id: 'mobile', name: 'موبايل', icon: Smartphone },
    { id: 'console', name: 'كونسول', icon: Gamepad2 },
    { id: 'browser', name: 'متصفح', icon: Globe },
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 px-4 py-3 sticky top-16 z-40 bg-dark/95 backdrop-blur-md border-b border-white/5 transition-colors duration-300">
      {categories.map((cat) => {
        const Icon = cat.icon;
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-bold transition-all border ${
              isActive
                ? 'bg-primary/20 border-primary text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                : 'bg-card border-white/5 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Icon size={16} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBar;