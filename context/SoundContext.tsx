import React, { createContext, useContext, useState } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'error';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);

  // Using standard short beep sounds (simulated URLs or base64 would be ideal, here we use generic browser behavior logic placeholder)
  // In a real app, these would be local assets like /sounds/click.mp3
  
  const playSound = (type: SoundType) => {
    if (isMuted) return;

    // Simulate sound playback logic
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.volume = 0.5;
    // audio.play().catch(e => console.log('Audio autoplay blocked', e));
    
    // For V11 demo without assets, we'll just log
    // console.log(`[Audio] Playing ${type} sound`);
  };

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <SoundContext.Provider value={{ playSound, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) throw new Error("useSound must be used within SoundProvider");
  return context;
};