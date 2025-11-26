import { Game, Genre, Platform, Store, RedeemItem, Message, CrackSite, Announcement } from './types';

export const APP_NAME = "الغلابه";

// --- V10 Admin & Assistant Configuration ---
export const ADMIN_CONFIG = {
  EMAIL: 'yassermohammedfi@gmail.com',
  ADMIN_USERNAME: 'yasser',
  ADMIN_PASSWORD: 'admin:beta', // Super Admin Password
  ASSISTANT_USERNAME: 'mustafa',
  ASSISTANT_PASSWORD: 'admin:vv9', // Assistant Password
  WHATSAPP: '201029071643'
};

// --- V9 Bad Words Filter ---
export const BAD_WORDS = ['غبي', 'حمار', 'كلب', 'زفت', 'shit', 'fuck', 'stupid', 'idiot', 'ass', 'حقير', 'تافه', 'لعنة'];

// --- V10 Crack Sites Database ---
export const CRACK_SITES: CrackSite[] = [
  { id: '1', name: 'FitGirl Repacks', url: 'https://fitgirl-repacks.site', riskLevel: 'Medium', description: 'Best for compressed games (Low Size).' },
  { id: '2', name: 'DODI Repacks', url: 'https://dodi-repacks.site', riskLevel: 'Medium', description: 'Faster installation than FitGirl.' },
  { id: '3', name: 'SteamRIP', url: 'https://steamrip.com', riskLevel: 'Medium', description: 'Pre-installed games (Direct Play).' },
  { id: '4', name: 'ElAmigos', url: 'https://elamigos-games.com', riskLevel: 'Medium', description: 'Updated games with latest patches.' },
  { id: '5', name: 'IGG Games', url: '#', riskLevel: 'High', description: 'Contains ads & popups. Use with AdBlock.' }
];

// --- V11 Mock Announcements ---
export const ANNOUNCEMENTS: Announcement[] = [
  { id: '1', text: 'GTA VI Release Date Rumored for Q4 2025!', date: '2025-02-28', type: 'news' },
  { id: '2', text: 'Free Fire: New Cobra Update Available Now', date: '2025-02-27', type: 'release' },
  { id: '3', text: 'Steam Spring Sale Starts Tomorrow!', date: '2025-02-28', type: 'offer' },
  { id: '4', text: 'PUBG Mobile: New Royal Pass Season is Live', date: '2025-02-26', type: 'news' }
];

// --- V10 Translations (5 Languages) ---
export const TRANSLATIONS = {
  ar: {
    home: 'الرئيسية',
    store: 'المتجر',
    library: 'مكتبتي',
    settings: 'الإعدادات',
    devGames: 'ألعاب المطور',
    mobile: 'موبايل',
    search: 'بحث',
    login: 'دخول',
    guest: 'زائر',
    adminPanel: 'لوحة التحكم',
    language: 'اللغة',
    support: 'الدعم الفني',
    points: 'نقطة',
    download: 'تحميل',
    save: 'حفظ',
    share: 'مشاركة',
    freeNow: 'مجانية الآن',
    top10: 'أفضل 10',
    turbo: 'تيربو',
    lowSpec: 'جهاز ضعيف',
    crackSites: 'مواقع الكراك',
    mobileGiants: 'عمالقة الموبايل',
    welcomeDev: 'أهلاً بالمطور',
    yasser: 'yasser shatta',
    dealOfDay: 'صفقة اليوم',
    googleLogin: 'دخول بحساب جوجل',
    browserGames: 'ألعاب المتصفح'
  },
  en: {
    home: 'Home',
    store: 'Store',
    library: 'Library',
    settings: 'Settings',
    devGames: 'Dev Games',
    mobile: 'Mobile',
    search: 'Search',
    login: 'Login',
    guest: 'Guest',
    adminPanel: 'Admin Panel',
    language: 'Language',
    support: 'Support',
    points: 'Pts',
    download: 'Download',
    save: 'Save',
    share: 'Share',
    freeNow: 'Free Now',
    top10: 'Top 10',
    turbo: 'Turbo',
    lowSpec: 'Low Spec',
    crackSites: 'Crack Sites',
    mobileGiants: 'Mobile Giants',
    welcomeDev: 'Welcome Developer',
    yasser: 'yasser shatta',
    dealOfDay: 'Deal of the Day',
    googleLogin: 'Login with Google',
    browserGames: 'Browser Games'
  },
  fr: {
    home: 'Accueil',
    store: 'Boutique',
    library: 'Bibliothèque',
    settings: 'Paramètres',
    devGames: 'Jeux Dev',
    mobile: 'Mobile',
    search: 'Chercher',
    login: 'Connexion',
    guest: 'Invité',
    adminPanel: 'Admin',
    language: 'Langue',
    support: 'Support',
    points: 'Pts',
    download: 'Télécharger',
    save: 'Sauver',
    share: 'Partager',
    freeNow: 'Gratuit',
    top10: 'Top 10',
    turbo: 'Turbo',
    lowSpec: 'Low Spec',
    crackSites: 'Sites Crack',
    mobileGiants: 'Géants Mobile',
    welcomeDev: 'Bienvenue Développeur',
    yasser: 'yasser shatta',
    dealOfDay: 'Offre du jour',
    googleLogin: 'Connexion Google',
    browserGames: 'Jeux Navigateur'
  },
  tr: {
    home: 'Ana Sayfa',
    store: 'Mağaza',
    library: 'Kütüphane',
    settings: 'Ayarlar',
    devGames: 'Geliştirici',
    mobile: 'Mobil',
    search: 'Ara',
    login: 'Giriş',
    guest: 'Misafir',
    adminPanel: 'Yönetici',
    language: 'Dil',
    support: 'Destek',
    points: 'Puan',
    download: 'İndir',
    save: 'Kaydet',
    share: 'Paylaş',
    freeNow: 'Ücretsiz',
    top10: 'En İyi 10',
    turbo: 'Turbo',
    lowSpec: 'Düşük Sistem',
    crackSites: 'Crack Siteleri',
    mobileGiants: 'Mobil Devleri',
    welcomeDev: 'Hoşgeldin Geliştirici',
    yasser: 'yasser shatta',
    dealOfDay: 'Günün Fırsatı',
    googleLogin: 'Google ile Giriş',
    browserGames: 'Tarayıcı Oyunları'
  },
  es: {
    home: 'Inicio',
    store: 'Tienda',
    library: 'Biblioteca',
    settings: 'Ajustes',
    devGames: 'Juegos Dev',
    mobile: 'Móvil',
    search: 'Buscar',
    login: 'Acceso',
    guest: 'Invitado',
    adminPanel: 'Admin',
    language: 'Idioma',
    support: 'Soporte',
    points: 'Puntos',
    download: 'Descargar',
    save: 'Guardar',
    share: 'Compartir',
    freeNow: 'Gratis',
    top10: 'Top 10',
    turbo: 'Turbo',
    lowSpec: 'Bajos Req.',
    crackSites: 'Sitios Crack',
    mobileGiants: 'Gigantes Móviles',
    welcomeDev: 'Bienvenido Desarrollador',
    yasser: 'yasser shatta',
    dealOfDay: 'Oferta del Día',
    googleLogin: 'Inicio con Google',
    browserGames: 'Juegos de Navegador'
  }
};

// --- Real Image Mapping ---
const GAME_IMAGE_MAP: Record<string, string> = {
  'pubg': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800', // FPS Controller
  'free fire': 'https://images.unsplash.com/photo-1593305841991-05c29736f4de?q=80&w=800', // Battle Royaleish
  'duty': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=800', // Shooter
  'fortnite': 'https://images.unsplash.com/photo-1589241062272-c0a000071964?q=80&w=800', // Controller
  'gta': 'https://images.unsplash.com/photo-1621259182902-88546194487b?q=80&w=800', // Car/City
  'minecraft': 'https://images.unsplash.com/photo-1627856014759-085296e22dc7?q=80&w=800', // Blocky
  'fifa': 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=800', // Soccer
  'pes': 'https://images.unsplash.com/photo-1579952363873-27f3bde9be2b?q=80&w=800', // Soccer
  'racing': 'https://images.unsplash.com/photo-1547754980-3df97fed72a8?q=80&w=800', // Car
  'cyberpunk': 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=800', // Neon
  'elden': 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=800', // Fantasy
  'red dead': 'https://images.unsplash.com/photo-1533230556272-9707e78d2b2c?q=80&w=800', // Western/Dark
  'god of war': 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=800', // Epic scenery
  'spider': 'https://images.unsplash.com/photo-1620553198031-c4f44c4b6389?q=80&w=800', // City
  'assassin': 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?q=80&w=800', // Hooded/Dark
  'default': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800' // Generic Gaming
};

const getRealImage = (title: string, genre: Genre): string => {
  const lowerTitle = title.toLowerCase();
  for (const key in GAME_IMAGE_MAP) {
    if (lowerTitle.includes(key)) return GAME_IMAGE_MAP[key];
  }
  // Fallback by genre
  if (genre === Genre.Racing) return GAME_IMAGE_MAP['racing'];
  if (genre === Genre.Sports) return GAME_IMAGE_MAP['fifa'];
  if (genre === Genre.Shooter) return GAME_IMAGE_MAP['duty'];
  return GAME_IMAGE_MAP['default'];
};

// --- Base Mock Games (Seed) ---
const BASE_MOCK_GAMES: Game[] = [
  {
    id: 'pubg_mobile',
    title: 'PUBG Mobile',
    shortDescription: 'The original Battle Royale on Mobile.',
    description: 'Parachute onto a remote island and fight to remain the last player standing.',
    thumbnail: GAME_IMAGE_MAP['pubg'],
    platform: [Platform.Android, Platform.iOS],
    store: Store.GooglePlay,
    genre: Genre.BattleRoyale,
    releaseDate: '2018',
    addedDate: '2023-11-01',
    views: 95000,
    votes: 45000,
    publisher: 'Tencent',
    downloadUrl: '#',
    rating: 4.5,
    isLowSpec: false,
    pointsReward: 10
  },
  {
    id: 'free_fire',
    title: 'Free Fire',
    shortDescription: 'Best survival shooter for low-end devices.',
    description: '10-minute survival shooter game available on mobile.',
    thumbnail: GAME_IMAGE_MAP['free fire'],
    platform: [Platform.Android, Platform.iOS],
    store: Store.GooglePlay,
    genre: Genre.BattleRoyale,
    releaseDate: '2017',
    addedDate: '2023-11-01',
    views: 120000,
    votes: 60000,
    publisher: 'Garena',
    downloadUrl: '#',
    rating: 4.3,
    isLowSpec: true,
    pointsReward: 10
  },
  {
    id: 'cod_mobile',
    title: 'Call of Duty: Mobile',
    shortDescription: 'Full COD experience on your phone.',
    description: 'Classic maps and modes from across the Call of Duty franchise.',
    thumbnail: GAME_IMAGE_MAP['duty'],
    platform: [Platform.Android, Platform.iOS],
    store: Store.GooglePlay,
    genre: Genre.Shooter,
    releaseDate: '2019',
    addedDate: '2023-11-01',
    views: 80000,
    votes: 35000,
    publisher: 'Activision',
    downloadUrl: '#',
    rating: 4.8,
    isLowSpec: false,
    pointsReward: 15
  },
  {
    id: 'fortnite',
    title: 'Fortnite',
    shortDescription: 'Build & Battle.',
    description: 'The Battle Royale phenomenon.',
    thumbnail: GAME_IMAGE_MAP['fortnite'],
    platform: [Platform.PC, Platform.PlayStation, Platform.Xbox, Platform.Android],
    store: Store.Epic,
    genre: Genre.BattleRoyale,
    releaseDate: '2017',
    addedDate: '2023-01-01',
    views: 50000,
    votes: 20000,
    publisher: 'Epic Games',
    downloadUrl: '#',
    rating: 4.7,
    isLowSpec: false,
    pointsReward: 10
  }
];

// --- V11 Hydration Engine: 1200+ Games ---
const GAME_TITLES_POOL = [
  'Cyber Shadow', 'Neon Drifter', 'Desert Storm', 'Galaxy Raider', 'Pixel Quest',
  'Ancient Legends', 'Speed Demon', 'Zombie Outbreak', 'Farm Life', 'City Builder',
  'Space Odyssey', 'Ninja Strike', 'Dragon Slayer', 'Football Pro', 'Tennis Master',
  'Chess Grandmaster', 'Sudoku King', 'Word Puzzle', 'Tank Battle', 'Sky Fighter',
  'Grand Theft Auto', 'Red Dead Legacy', 'Assassin Spirit', 'God of Thunder'
];

const hydrateGames = (): Game[] => {
  const generated: Game[] = [...BASE_MOCK_GAMES];
  const platforms = [Platform.PC, Platform.PlayStation, Platform.Xbox, Platform.Android, Platform.iOS, Platform.Browser];
  const genres = Object.values(Genre);
  
  // Create 1200 games distributed across platforms
  platforms.forEach((plat, platIdx) => {
    for (let i = 0; i < 200; i++) {
       const seedTitle = GAME_TITLES_POOL[i % GAME_TITLES_POOL.length];
       const isBrowser = plat === Platform.Browser;
       const fullTitle = `${seedTitle} ${i + 1}`;
       const genre = genres[(i + platIdx) % genres.length];
       
       generated.push({
         id: `v11_${plat}_${i}_${Math.random().toString(36).substr(2, 5)}`,
         title: fullTitle,
         shortDescription: isBrowser ? 'Instant Play Browser Game' : 'Full Game Experience',
         description: `Experience the thrill of ${seedTitle} on ${plat}. Features stunning graphics and immersive gameplay.`,
         platform: [plat],
         genre: genre,
         views: Math.floor(Math.random() * 50000),
         votes: Math.floor(Math.random() * 10000),
         rating: parseFloat((3 + Math.random() * 2).toFixed(1)),
         isLowSpec: Math.random() > 0.4, 
         store: isBrowser ? Store.Other : Store.Steam,
         pointsReward: 5 + Math.floor(Math.random() * 10),
         thumbnail: getRealImage(fullTitle, genre), 
         releaseDate: (2020 + Math.floor(Math.random() * 5)).toString(),
         addedDate: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
         publisher: 'Indie Studio',
         downloadUrl: '#'
       });
    }
  });
  return generated;
};

export const MOCK_GAMES: Game[] = hydrateGames();

// --- V11 Crack Popular Games with Real Cover Logic ---
export const CRACK_POPULAR_GAMES = [
    { title: 'Cyberpunk 2077', size: '70 GB', img: GAME_IMAGE_MAP['cyberpunk'] },
    { title: 'Red Dead Redemption 2', size: '120 GB', img: GAME_IMAGE_MAP['red dead'] },
    { title: 'GTA V', size: '100 GB', img: GAME_IMAGE_MAP['gta'] },
    { title: 'Elden Ring', size: '50 GB', img: GAME_IMAGE_MAP['elden'] },
    { title: 'Baldur\'s Gate 3', size: '150 GB', img: GAME_IMAGE_MAP['default'] },
];

// --- V10 Paid Store (100 Items) ---
const PAID_SEEDS = [
  { t: 'GTA VI Pre-Order', p: 15000, plat: Platform.PC, desc: 'Ultimate Key', img: GAME_IMAGE_MAP['gta'] },
  { t: 'Elden Ring', p: 8000, plat: Platform.PC, desc: 'GOTY Edition', img: GAME_IMAGE_MAP['elden'] },
  { t: 'Minecraft', p: 3000, plat: Platform.PC, desc: 'Java & Bedrock', img: GAME_IMAGE_MAP['minecraft'] },
  { t: 'FC 24', p: 6000, plat: Platform.PlayStation, desc: 'Standard Edition', img: GAME_IMAGE_MAP['fifa'] },
  { t: 'Cyberpunk 2077', p: 7000, plat: Platform.PC, desc: 'Ultimate Edition', img: GAME_IMAGE_MAP['cyberpunk'] },
  { t: 'Call of Duty: MW3', p: 9000, plat: Platform.Xbox, desc: 'Cross-Gen Bundle', img: GAME_IMAGE_MAP['duty'] },
  { t: 'Red Dead Redemption 2', p: 5500, plat: Platform.PC, desc: 'Epic Story', img: GAME_IMAGE_MAP['red dead'] },
  { t: 'God of War Ragnarok', p: 7500, plat: Platform.PlayStation, desc: 'Exclusive', img: GAME_IMAGE_MAP['god of war'] },
];

const hydrateStore = (): RedeemItem[] => {
  const items: RedeemItem[] = [];
  for(let i=0; i<100; i++) {
    const seed = PAID_SEEDS[i % PAID_SEEDS.length];
    items.push({
      id: `store_v10_${i}`,
      title: `${seed.t} #${i+1}`,
      thumbnail: seed.img, 
      pointsCost: seed.p + (i * 10),
      platform: seed.plat,
      description: seed.desc
    });
  }
  return items;
};

export const REDEEM_ITEMS: RedeemItem[] = hydrateStore();

export const MOCK_MESSAGES: Message[] = [
  { id: '1', userEmail: 'ahmed@gmail.com', content: 'الرابط الخاص بلعبة فورتنايت لا يعمل.', date: '2023-10-20', status: 'open' },
  { id: '2', userEmail: 'sara@test.com', content: 'شكراً لكم على الموقع الرائع!', date: '2023-10-19', status: 'closed' },
  { id: '3', userEmail: 'gamer@yt.com', content: 'أريد إضافة لعبة من تطويري، كيف؟', date: '2023-10-18', status: 'open' }
];