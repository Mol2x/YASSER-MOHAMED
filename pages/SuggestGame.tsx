import React, { useState } from 'react';
import { Send, CheckCircle, PlusCircle } from 'lucide-react';

const SuggestGame: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-black pb-20">
        <div className="bg-card p-8 rounded-2xl text-center max-w-md w-full border border-green-500/30">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">شكراً لمساهمتك!</h2>
          <p className="text-gray-400 mb-6">سنراجع اقتراحك ونضيف اللعبة إذا كانت مجانية ومناسبة.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-primary hover:text-white underline"
          >
            اقتراح لعبة أخرى
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-screen bg-black pb-24">
      <div className="text-center mb-8">
        <PlusCircle className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">اقترح لعبة مجانية</h1>
        <p className="text-gray-400 text-sm">ساعدنا نكبر مكتبة "الغلابه". لو تعرف لعبة مجانية مش موجودة، ابعتهالنا.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl border border-white/5 space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">اسم اللعبة</label>
          <input required type="text" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" placeholder="مثال: Rocket League" />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">رابط اللعبة (المتجر)</label>
          <input required type="url" className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary" placeholder="https://..." />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">المنصة</label>
          <select className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary">
            <option>Steam</option>
            <option>Epic Games</option>
            <option>PlayStation</option>
            <option>Xbox</option>
            <option>Mobile (Android/iOS)</option>
            <option>Other</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4">
          <Send size={18} />
          إرسال الاقتراح
        </button>
      </form>
    </div>
  );
};

export default SuggestGame;