import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, AlertTriangle } from 'lucide-react';
import { getAIRecommendation } from '../services/geminiService';
import { BAD_WORDS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AIChat: React.FC = () => {
  const { banUser, checkBan } = useAuth();
  const [messages, setMessages] = useState<{role: 'user'|'bot', text: string}[]>([
      { role: 'bot', text: 'Hello! I am Yasser AI. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBanned = checkBan();

  useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isBanned) {
      return (
          <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-black px-4 text-center">
              <AlertTriangle size={64} className="text-red-500 animate-pulse" />
              <h1 className="text-3xl font-black text-white">YOU ARE BANNED</h1>
              <p className="text-gray-400">Your account has been suspended for 24 hours due to violation of our terms (profanity).</p>
              <Link to="/" className="text-primary underline">Return Home</Link>
          </div>
      );
  }

  const handleSend = async () => {
      if (!input.trim()) return;
      
      const userMsg = input;
      
      // V7 Profanity Filter
      const hasBadWords = BAD_WORDS.some(word => userMsg.toLowerCase().includes(word.toLowerCase()));
      if (hasBadWords) {
          banUser(24, 'Profanity in AI Chat');
          return;
      }

      setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
      setInput('');
      setLoading(true);

      const aiReply = await getAIRecommendation(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: aiReply }]);
      setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] md:h-screen pt-16 pb-20 bg-black">
        <div className="px-4 py-2 border-b border-white/10 bg-surface/50 backdrop-blur flex items-center gap-2">
            <Bot className="text-primary" />
            <h1 className="text-white font-bold">Yasser AI Support</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user' 
                        ? 'bg-primary text-white rounded-br-none' 
                        : 'bg-card border border-white/10 text-gray-200 rounded-bl-none'
                    }`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                    <div className="bg-card border border-white/10 rounded-2xl rounded-bl-none px-4 py-3">
                         <div className="flex gap-1">
                             <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                             <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                             <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                         </div>
                    </div>
                </div>
            )}
            <div ref={scrollRef}></div>
        </div>

        <div className="p-4 bg-surface border-t border-white/10">
            <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 bg-black border border-white/10 rounded-full px-4 py-3 text-white focus:outline-none focus:border-primary"
                />
                <button 
                   onClick={handleSend}
                   disabled={loading || !input.trim()}
                   className="bg-primary p-3 rounded-full text-white disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    </div>
  );
};

export default AIChat;
