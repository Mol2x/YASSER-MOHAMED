import { Game, Genre, Platform, Store, RedeemItem, Message, CrackSite, Announcement } from './types';

export const APP_NAME = "الغلابه";

// --- Admin Configuration ---
export const ADMIN_CONFIG = {
  EMAIL: 'yassermohammedfi@gmail.com',
  ADMIN_USERNAME: 'yasser',
  ADMIN_PASSWORD: 'admin:beta',
  ASSISTANT_USERNAME: 'mustafa',
  ASSISTANT_PASSWORD: 'admin:vv9',
  WHATSAPP: '201029071643'
};

// --- Bad Words Filter ---
export const BAD_WORDS = ['غبي', 'حمار', 'كلب', 'زفت', 'shit', 'fuck', 'stupid', 'idiot', 'ass', 'حقير', 'تافه', 'لعنة'];

// --- Crack Sites Database ---
export const CRACK_SITES: CrackSite[] = [
  { id: '1', name: 'FitGirl Repacks', url: 'https://fitgirl-repacks.site', riskLevel: 'Medium', description: 'Best for compressed games (Low Size).' },
  { id: '2', name: 'DODI Repacks', url: 'https://dodi-repacks.site', riskLevel: 'Medium', description: 'Faster installation than FitGirl.' },
  { id: '3', name: 'SteamRIP', url: 'https://steamrip.com', riskLevel: 'Medium', description: 'Pre-installed games (Direct Play).' },
  { id: '4', name: 'ElAmigos', url: 'https://elamigos-games.com', riskLevel: 'Medium', description: 'Updated games with latest patches.' },
  { id: '5', name: 'IGG Games', url: '#', riskLevel: 'High', description: 'Contains ads & popups. Use with AdBlock.' }
];

// --- Announcements ---
export const ANNOUNCEMENTS: Announcement[] = [
  { id: '1', text: 'GTA VI Release Date Rumored for Q4 2025!', date: '2025-02-28', type: 'news' },
  { id: '2', text: 'Free Fire: New Cobra Update Available Now', date: '2025-02-27', type: 'release' },
  { id: '3', text: 'Steam Spring Sale Starts Tomorrow!', date: '2025-02-28', type: 'offer' },
  { id: '4', text: 'PUBG Mobile: New Royal Pass Season is Live', date: '2025-02-26', type: 'news' }
];

// --- Translations ---
export const TRANSLATIONS = {
  ar: {
    home: 'الرئيسية', store: 'المتجر', library: 'مكتبتي', settings: 'الإعدادات', devGames: 'ألعاب المطور',
    mobile: 'موبايل', search: 'بحث', login: 'دخول', guest: 'زائر', adminPanel: 'لوحة التحكم',
    language: 'اللغة', support: 'الدعم الفني', points: 'نقطة', download: 'تحميل', save: 'حفظ',
    share: 'مشاركة', freeNow: 'مجانية الآن', top10: 'أفضل 10', turbo: 'تيربو', lowSpec: 'جهاز ضعيف',
    crackSites: 'مواقع الكراك', mobileGiants: 'عمالقة الموبايل', welcomeDev: 'أهلاً بالمطور',
    yasser: 'yasser shatta', dealOfDay: 'صفقة اليوم', googleLogin: 'دخول بحساب جوجل', browserGames: 'ألعاب المتصفح'
  },
  en: {
    home: 'Home', store: 'Store', library: 'Library', settings: 'Settings', devGames: 'Dev Games',
    mobile: 'Mobile', search: 'Search', login: 'Login', guest: 'Guest', adminPanel: 'Admin Panel',
    language: 'Language', support: 'Support', points: 'Pts', download: 'Download', save: 'Save',
    share: 'Share', freeNow: 'Free Now', top10: 'Top 10', turbo: 'Turbo', lowSpec: 'Low Spec',
    crackSites: 'Crack Sites', mobileGiants: 'Mobile Giants', welcomeDev: 'Welcome Developer',
    yasser: 'yasser shatta', dealOfDay: 'Deal of the Day', googleLogin: 'Login with Google', browserGames: 'Browser Games'
  },
  fr: { home: 'Accueil', store: 'Boutique', library: 'Bibliothèque', settings: 'Paramètres', devGames: 'Jeux Dev', mobile: 'Mobile', search: 'Chercher', login: 'Connexion', guest: 'Invité', adminPanel: 'Admin', language: 'Langue', support: 'Support', points: 'Pts', download: 'Télécharger', save: 'Sauver', share: 'Partager', freeNow: 'Gratuit', top10: 'Top 10', turbo: 'Turbo', lowSpec: 'Low Spec', crackSites: 'Sites Crack', mobileGiants: 'Géants Mobile', welcomeDev: 'Bienvenue Développeur', yasser: 'yasser shatta', dealOfDay: 'Offre du jour', googleLogin: 'Connexion Google', browserGames: 'Jeux Navigateur' },
  tr: { home: 'Ana Sayfa', store: 'Mağaza', library: 'Kütüphane', settings: 'Ayarlar', devGames: 'Geliştirici', mobile: 'Mobil', search: 'Ara', login: 'Giriş', guest: 'Misafir', adminPanel: 'Yönetici', language: 'Dil', support: 'Destek', points: 'Puan', download: 'İndir', save: 'Kaydet', share: 'Paylaş', freeNow: 'Ücretsiz', top10: 'En İyi 10', turbo: 'Turbo', lowSpec: 'Düşük Sistem', crackSites: 'Crack Siteleri', mobileGiants: 'Mobil Devleri', welcomeDev: 'Hoşgeldin Geliştirici', yasser: 'yasser shatta', dealOfDay: 'Günün Fırsatı', googleLogin: 'Google ile Giriş', browserGames: 'Tarayıcı Oyunları' },
  es: { home: 'Inicio', store: 'Tienda', library: 'Biblioteca', settings: 'Ajustes', devGames: 'Juegos Dev', mobile: 'Móvil', search: 'Buscar', login: 'Acceso', guest: 'Invitado', adminPanel: 'Admin', language: 'Idioma', support: 'Soporte', points: 'Puntos', download: 'Descargar', save: 'Guardar', share: 'Compartir', freeNow: 'Gratis', top10: 'Top 10', turbo: 'Turbo', lowSpec: 'Bajos Req.', crackSites: 'Sitios Crack', mobileGiants: 'Gigantes Móviles', welcomeDev: 'Bienvenido Desarrollador', yasser: 'yasser shatta', dealOfDay: 'Oferta del Día', googleLogin: 'Inicio con Google', browserGames: 'Juegos de Navegador' }
};

// --- Real Image Logic (Lightweight Mapper) ---
const GAME_IMAGE_MAP: Record<string, string> = {
  'pubg': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400',
  'free fire': 'https://images.unsplash.com/photo-1593305841991-05c29736f4de?q=80&w=400',
  'call of duty': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=400',
  'fortnite': 'https://images.unsplash.com/photo-1589241062272-c0a000071964?q=80&w=400',
  'gta': 'https://images.unsplash.com/photo-1621259182902-88546194487b?q=80&w=400',
  'minecraft': 'https://images.unsplash.com/photo-1627856014759-085296e22dc7?q=80&w=400',
  'fifa': 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=400',
  'racing': 'https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=400',
  'cyberpunk': 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=400',
  'elden': 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=400',
  'red dead': 'https://images.unsplash.com/photo-1533230556272-9707e78d2b2c?q=80&w=400',
  'god of war': 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=400',
  'assassin': 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=400',
  'default': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400'
};

const getRealImage = (title: string, genre: Genre): string => {
  const t = title.toLowerCase();
  if (t.includes('pubg')) return GAME_IMAGE_MAP['pubg'];
  if (t.includes('free fire')) return GAME_IMAGE_MAP['free fire'];
  if (t.includes('duty')) return GAME_IMAGE_MAP['call of duty'];
  if (t.includes('fortnite')) return GAME_IMAGE_MAP['fortnite'];
  if (t.includes('gta') || t.includes('grand')) return GAME_IMAGE_MAP['gta'];
  if (t.includes('mine')) return GAME_IMAGE_MAP['minecraft'];
  if (t.includes('fifa') || t.includes('fc')) return GAME_IMAGE_MAP['fifa'];
  if (t.includes('cyber')) return GAME_IMAGE_MAP['cyberpunk'];
  if (t.includes('red dead')) return GAME_IMAGE_MAP['red dead'];
  return GAME_IMAGE_MAP['default'];
};

// --- Seed Data (Reduced to minimal needed) ---
const SEEDS = [
  { id: 'pubg_m', t: 'PUBG Mobile', p: [Platform.Android, Platform.iOS], g: Genre.BattleRoyale, s: Store.GooglePlay },
  { id: 'ff_m', t: 'Free Fire', p: [Platform.Android, Platform.iOS], g: Genre.BattleRoyale, s: Store.GooglePlay, low: true },
  { id: 'cod_m', t: 'Call of Duty: Mobile', p: [Platform.Android, Platform.iOS], g: Genre.Shooter, s: Store.GooglePlay },
  { id: 'mc_p', t: 'Minecraft', p: [Platform.PC, Platform.Android], g: Genre.Adventure, s: Store.Other },
  { id: 'gta_v', t: 'Grand Theft Auto V', p: [Platform.PC, Platform.PlayStation], g: Genre.OpenWorld, s: Store.Steam },
  { id: 'fifa_24', t: 'EA FC 24', p: [Platform.PlayStation, Platform.Xbox], g: Genre.Sports, s: Store.PlayStation },
];

const TITLES = ['Cyber', 'Neon', 'Shadow', 'Dragon', 'Pixel', 'Space', 'Zombie', 'Racer', 'Ninja', 'Tank'];

// --- Algorithmic Generator (Lightweight) ---
const hydrateGames = (): Game[] => {
  // Start with hand-picked seeds
  const games: Game[] = SEEDS.map(s => ({
    id: s.id, title: s.t, description: `Play ${s.t} now!`, shortDescription: 'Popular Game',
    thumbnail: getRealImage(s.t, s.g), platform: s.p, store: s.s, genre: s.g,
    releaseDate: '2023', addedDate: new Date().toISOString(), views: 50000 + Math.random()*50000,
    votes: 1000 + Math.random()*5000, rating: 4.5, isLowSpec: s.low, pointsReward: 10, downloadUrl: '#', publisher: 'Official'
  }));

  // Generate remaining 1000 procedurally
  const platforms = Object.values(Platform);
  const genres = Object.values(Genre);
  
  for(let i=0; i<1000; i++) {
    const t1 = TITLES[i % TITLES.length];
    const t2 = TITLES[(i+3) % TITLES.length];
    const title = `${t1} ${t2} ${i}`;
    const plat = platforms[i % platforms.length];
    const gen = genres[i % genres.length];
    
    games.push({
      id: `gen_${i}`,
      title: title,
      description: 'Generated game description for optimization.',
      shortDescription: 'Free Game',
      thumbnail: getRealImage('default', gen),
      platform: [plat],
      store: Store.Steam,
      genre: gen,
      releaseDate: '2024',
      addedDate: new Date(Date.now() - i * 10000000).toISOString(),
      views: Math.floor(Math.random() * 10000),
      votes: Math.floor(Math.random() * 500),
      rating: 3 + Math.random() * 2,
      isLowSpec: i % 3 === 0,
      pointsReward: 5,
      downloadUrl: '#',
      publisher: 'Indie Dev'
    });
  }
  return games;
};

export const MOCK_GAMES: Game[] = hydrateGames();

// --- Crack Popular List ---
export const CRACK_POPULAR_GAMES = [
    { title: 'Cyberpunk 2077', size: '70 GB', img: GAME_IMAGE_MAP['cyberpunk'] },
    { title: 'Red Dead Redemption 2', size: '120 GB', img: GAME_IMAGE_MAP['red dead'] },
    { title: 'GTA V', size: '100 GB', img: GAME_IMAGE_MAP['gta'] },
];

// --- Paid Store Generator ---
const STORE_SEEDS = [
  { t: 'GTA VI Key', p: 15000, img: GAME_IMAGE_MAP['gta'] },
  { t: 'Elden Ring', p: 8000, img: GAME_IMAGE_MAP['elden'] },
  { t: 'FC 24', p: 6000, img: GAME_IMAGE_MAP['fifa'] }
];

export const REDEEM_ITEMS: RedeemItem[] = Array.from({ length: 100 }).map((_, i) => {
  const seed = STORE_SEEDS[i % STORE_SEEDS.length];
  return {
    id: `store_${i}`, title: `${seed.t} #${i+1}`, thumbnail: seed.img,
    pointsCost: seed.p + i, platform: Platform.PC, description: 'Digital Key'
  };
});

export const MOCK_MESSAGES: Message[] = [
  { id: '1', userEmail: 'ahmed@test.com', content: 'Support request example.', date: '2023-10-20', status: 'open' }
];
