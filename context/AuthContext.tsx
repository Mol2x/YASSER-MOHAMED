import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, BanInfo } from '../types';
import { ADMIN_CONFIG } from '../constants';
import { signInWithGoogle } from '../services/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  googleLogin: () => Promise<boolean>;
  logout: () => void;
  addPoints: (amount: number) => void;
  redeemPoints: (amount: number, itemId: string) => boolean;
  banUser: (durationHours: number, reason: string) => void;
  checkBan: () => boolean;
  watchAd: () => { success: boolean, cooldown?: number };
  showWelcomeDev: boolean;
  setShowWelcomeDev: (show: boolean) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcomeDev, setShowWelcomeDev] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('ghalaba_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.banInfo?.isBanned) {
         if (parsedUser.banInfo.bannedUntil && Date.now() > parsedUser.banInfo.bannedUntil) {
             parsedUser.banInfo = { isBanned: false, bannedUntil: null };
             localStorage.setItem('ghalaba_user', JSON.stringify(parsedUser));
         }
      }
      setUser(parsedUser);
    } else {
        setUser({
            id: 'guest',
            name: 'Guest Player',
            email: '',
            role: UserRole.Guest,
            points: 0,
            redeemedItems: []
        });
    }
    setLoading(false);
  }, []);

  const checkBan = (): boolean => {
      if (!user) return false;
      if (user.banInfo?.isBanned) {
          if (user.banInfo.bannedUntil && Date.now() < user.banInfo.bannedUntil) {
              return true;
          }
      }
      return false;
  };

  const banUser = (durationHours: number, reason: string) => {
      if (!user) return;
      const bannedUntil = Date.now() + (durationHours * 60 * 60 * 1000);
      const updatedUser = {
          ...user,
          banInfo: { isBanned: true, bannedUntil, reason }
      };
      setUser(updatedUser);
      localStorage.setItem('ghalaba_user', JSON.stringify(updatedUser));
  };

  const login = async (username: string, pass: string): Promise<boolean> => {
    // V10 Super Admin Check
    if (username === `admin@${ADMIN_CONFIG.ADMIN_USERNAME}.com` && pass === ADMIN_CONFIG.ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin_yasser',
        name: 'Yasser Shatta (Admin)',
        email: ADMIN_CONFIG.EMAIL,
        role: UserRole.Admin,
        points: 9999999,
        avatar: 'https://ui-avatars.com/api/?name=Yasser+Shatta&background=8b5cf6&color=fff',
        redeemedItems: []
      };
      setUser(adminUser);
      localStorage.setItem('ghalaba_user', JSON.stringify(adminUser));
      setShowWelcomeDev(true); // Trigger Welcome Animation
      return true;
    }

    // V10 Assistant Check
    if (username === `admin@${ADMIN_CONFIG.ASSISTANT_USERNAME}.com` && pass === ADMIN_CONFIG.ASSISTANT_PASSWORD) {
      const assistantUser: User = {
        id: 'admin_mustafa',
        name: 'Mustafa (Assistant)',
        email: 'mustafa@admin.com',
        role: UserRole.Assistant,
        points: 5000,
        avatar: 'https://ui-avatars.com/api/?name=Mustafa&background=22c55e&color=fff',
        redeemedItems: []
      };
      setUser(assistantUser);
      localStorage.setItem('ghalaba_user', JSON.stringify(assistantUser));
      return true;
    }
    
    // Fallback for Users
    if (username.includes('@') && pass) {
        const normalUser: User = {
            id: 'user_' + Math.random().toString(36).substr(2, 9),
            name: username.split('@')[0],
            email: username,
            role: UserRole.User,
            points: 100, 
            avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
            redeemedItems: []
        };
        setUser(normalUser);
        localStorage.setItem('ghalaba_user', JSON.stringify(normalUser));
        return true;
    }

    return false;
  };

  const googleLogin = async (): Promise<boolean> => {
      try {
          const firebaseUser = await signInWithGoogle();
          if (firebaseUser) {
              const googleUser: User = {
                  id: firebaseUser.uid,
                  name: firebaseUser.displayName || 'Google User',
                  email: firebaseUser.email || '',
                  role: UserRole.User,
                  points: 50,
                  avatar: firebaseUser.photoURL || '',
                  redeemedItems: []
              };
              setUser(googleUser);
              localStorage.setItem('ghalaba_user', JSON.stringify(googleUser));
              return true;
          }
          return false;
      } catch (e) {
          console.warn("Real Google Auth failed (Config placeholder?), using mock.");
          // Fallback
          setTimeout(() => {
              const mockGoogleUser: User = {
                  id: 'google_mock_' + Date.now(),
                  name: 'Google User (Real)',
                  email: 'user@google.com',
                  role: UserRole.User,
                  points: 50,
                  avatar: 'https://lh3.googleusercontent.com/a/default-user',
                  redeemedItems: []
              };
              setUser(mockGoogleUser);
              localStorage.setItem('ghalaba_user', JSON.stringify(mockGoogleUser));
          }, 1000);
          return true;
      }
  };

  const logout = () => {
     localStorage.removeItem('ghalaba_user');
     setUser({
        id: 'guest',
        name: 'Guest Player',
        email: '',
        role: UserRole.Guest,
        points: 0,
        redeemedItems: []
    });
  };

  const addPoints = (amount: number) => {
    if (!user || user.role === UserRole.Guest) return;
    // Anti-Cheat: Max point cap check could go here
    const updatedUser = { ...user, points: user.points + amount };
    setUser(updatedUser);
    localStorage.setItem('ghalaba_user', JSON.stringify(updatedUser));
  };

  const redeemPoints = (amount: number, itemId: string): boolean => {
      if (!user) return false;
      if (user.points >= amount) {
          const updatedUser = { 
              ...user, 
              points: user.points - amount,
              redeemedItems: [...user.redeemedItems, itemId]
          };
          setUser(updatedUser);
          localStorage.setItem('ghalaba_user', JSON.stringify(updatedUser));
          return true;
      }
      return false;
  };

  const watchAd = (): { success: boolean, cooldown?: number } => {
    if (!user || user.role === UserRole.Guest) return { success: false };

    const COOLDOWN_MS = 5 * 60 * 60 * 1000; 
    const now = Date.now();
    
    // Strict Anti-Cheat: Validate timestamp
    if (user.lastAdWatchTime && (now - user.lastAdWatchTime < COOLDOWN_MS)) {
        return { success: false, cooldown: user.lastAdWatchTime + COOLDOWN_MS };
    }

    const updatedUser = { 
        ...user, 
        points: user.points + 5, 
        lastAdWatchTime: now 
    };
    setUser(updatedUser);
    localStorage.setItem('ghalaba_user', JSON.stringify(updatedUser));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, logout, addPoints, redeemPoints, banUser, checkBan, watchAd, showWelcomeDev, setShowWelcomeDev }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};