import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { SoundProvider } from './context/SoundContext';
import LoadingScreen from './components/LoadingScreen';
import WelcomeDevModal from './components/WelcomeDevModal';
import MainLayout from './components/MainLayout';

// Pages
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import GameDetails from './pages/GameDetails';
import Search from './pages/Search';
import Contact from './pages/Contact';
import FreeNow from './pages/FreeNow';
import Upcoming from './pages/Upcoming';
import MobileGames from './pages/MobileGames';
import SuggestGame from './pages/SuggestGame';
import DailyDeals from './pages/DailyDeals';
import LimitedTime from './pages/LimitedTime';
import Settings from './pages/Settings';
import MyLibrary from './pages/MyLibrary';
import Login from './pages/Login';
import Top10 from './pages/Top10';
import RedeemStore from './pages/RedeemStore';
import AdminPanel from './pages/AdminPanel';
import DeveloperGames from './pages/DeveloperGames';
import AIChat from './pages/AIChat';
import CrackSites from './pages/CrackSites'; 
import BrowserGames from './pages/BrowserGames';

// Scroll to top helper
const ScrollToTop = ({ children }: { children?: React.ReactNode }) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return <>{children}</>;
};

// V10 Route Change Handler for Loading Effect
const RouteHandler = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // Simulate assets loading
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingScreen />}
      {children}
    </>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SoundProvider>
            <Router>
            <ScrollToTop>
                <RouteHandler>
                    <WelcomeDevModal />
                    
                    <Routes>
                      {/* Dashboard Routes (With Taskbar/Navbar) */}
                      <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/mobile" element={<MobileGames />} />
                        <Route path="/dev-games" element={<DeveloperGames />} />
                        <Route path="/redeem" element={<RedeemStore />} />
                        <Route path="/library" element={<MyLibrary />} />
                        <Route path="/platforms" element={<Platforms />} />
                        <Route path="/top10" element={<Top10 />} />
                        <Route path="/free-now" element={<FreeNow />} />
                      </Route>

                      {/* Standalone Pages (No Taskbar, Full Screen) */}
                      <Route path="/game/:id" element={<GameDetails />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/search" element={<Search />} />
                      <Route path="/crack-sites" element={<CrackSites />} />
                      <Route path="/browser-games" element={<BrowserGames />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/daily-deals" element={<DailyDeals />} />
                      <Route path="/limited" element={<LimitedTime />} />
                      <Route path="/upcoming" element={<Upcoming />} />
                      <Route path="/suggest" element={<SuggestGame />} />
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route path="/ai-chat" element={<AIChat />} />
                    </Routes>

                </RouteHandler>
            </ScrollToTop>
            </Router>
        </SoundProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;