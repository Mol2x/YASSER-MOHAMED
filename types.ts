export enum Platform {
  PC = 'PC',
  PlayStation = 'PlayStation',
  Xbox = 'Xbox',
  Nintendo = 'Nintendo',
  Android = 'Android',
  iOS = 'iOS',
  Web = 'Web',
  Browser = 'Browser'
}

export enum Store {
  Steam = 'Steam',
  Epic = 'Epic Games',
  PlayStation = 'PS Store',
  Xbox = 'Xbox Store',
  GOG = 'GOG',
  Itchio = 'Itch.io',
  GooglePlay = 'Google Play',
  AppStore = 'App Store',
  Other = 'Other',
  Crack = 'Crack/Repack'
}

export enum Genre {
  Action = 'أكشن',
  RPG = 'RPG',
  Strategy = 'استراتيجية',
  Sports = 'رياضة',
  Racing = 'سباق',
  Shooter = 'تصويب',
  Puzzle = 'ألغاز',
  Adventure = 'مغامرات',
  BattleRoyale = 'باتل رويال',
  Indie = 'إندي',
  Simulation = 'محاكاة',
  Horror = 'رعب',
  OpenWorld = 'عالم مفتوح'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  platform: Platform[];
  store: Store;
  genre: Genre;
  releaseDate: string;
  addedDate: string; 
  views: number; 
  votes: number; 
  publisher: string;
  downloadUrl: string;
  rating: number; 
  isFreeTimeLimited?: boolean; 
  endDate?: string; 
  isComingSoon?: boolean; 
  availableDate?: string; 
  isOffline?: boolean; 
  isLowSpec?: boolean;
  pointsReward?: number; 
}

export enum UserRole {
  Guest = 'guest',
  User = 'user',
  Admin = 'admin', // Super Admin (Yasser)
  Assistant = 'assistant' // Assistant (Mustafa)
}

export interface BanInfo {
  isBanned: boolean;
  bannedUntil: number | null; // Timestamp
  reason?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  points: number;
  avatar?: string;
  redeemedItems: string[];
  banInfo?: BanInfo;
  lastAdWatchTime?: number; 
}

export interface RedeemItem {
  id: string;
  title: string;
  thumbnail: string;
  pointsCost: number;
  platform: Platform;
  description: string;
}

export interface Message {
  id: string;
  userEmail: string;
  content: string;
  date: string;
  status: 'open' | 'closed';
}

export interface CrackSite {
  id: string;
  name: string;
  url: string;
  riskLevel: 'Medium' | 'High';
  description: string;
}

export interface Announcement {
  id: string;
  text: string;
  date: string;
  type: 'release' | 'offer' | 'news';
}

export type Language = 'ar' | 'en' | 'fr' | 'tr' | 'es';