import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken, setAccessToken } from './firebase';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Team from './pages/Team';
import Services from './pages/Services';
import News from './pages/News';
import Gallery from './pages/Gallery';
import Portal from './pages/Portal';
import Farewell2022 from './pages/Farewell2022';
import Farewell2023 from './pages/Farewell2023';
import Themes from './pages/Themes';
import ThemeDetail from './pages/ThemeDetail';
import Collaboration from './pages/Collaboration';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedThemeId, setSelectedThemeId] = useState<string>(() => {
    return localStorage.getItem('selectedThemeId') || 'theme-1';
  });
  const [user, setUser] = useState<User | null>(null);
  const [driveToken, setDriveToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setDriveToken(token);
        setLoginError(null);
      },
      () => {
        setUser(null);
        setDriveToken(null);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setDriveToken(result.accessToken);
        // Direct members straight to their secure workspace dashboard!
        setActivePage('portal');
      }
    } catch (err: any) {
      console.error('Portal sign-in failed:', err);
      setLoginError(err?.message || String(err));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleDemoLogin = () => {
    const mockUser = {
      uid: 'demo-user-123',
      displayName: 'Md. Abid Hassan (Demo)',
      email: 'abid.hassan.demo@ru.ac.bd',
      photoURL: null,
      emailVerified: true,
    } as User;
    setUser(mockUser);
    setDriveToken('demo-token-abc-123'); // Custom mock token to enable mock Drive
    setLoginError(null);
    setActivePage('portal');
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setDriveToken(null);
      setAccessToken(null);
      setLoginError(null);
      setActivePage('home');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleConnectDrive = async () => {
    // Reuses Google sign-in to securely refresh tokens & fetch images scopes
    await handleLogin();
  };

  // Render active page
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} setSelectedThemeId={setSelectedThemeId} />;
      case 'themes':
        return <Themes setActivePage={setActivePage} setSelectedThemeId={setSelectedThemeId} />;
      case 'theme-detail':
        return (
          <ThemeDetail 
            setActivePage={setActivePage} 
            selectedThemeId={selectedThemeId} 
            setSelectedThemeId={setSelectedThemeId} 
          />
        );
      case 'about':
        return <About />;
      case 'research':
        return <Research setActivePage={setActivePage} />;
      case 'team':
        return <Team />;
      case 'services':
        return <Services />;
      case 'news':
        return <News />;
      case 'gallery':
        return (
          <Gallery
            driveToken={driveToken}
            onConnectDrive={handleConnectDrive}
            isConnectingDrive={isLoggingIn}
            onDemoConnect={handleDemoLogin}
            onSelectPage={setActivePage}
          />
        );
      case 'farewell-2022':
        return <Farewell2022 onBack={() => setActivePage('gallery')} />;
      case 'farewell-2023':
        return <Farewell2023 onBack={() => setActivePage('gallery')} />;
      case 'portal':
        return (
          <Portal
            user={user}
            onLogin={handleLogin}
            isLoggingIn={isLoggingIn}
            onDemoLogin={handleDemoLogin}
            loginError={loginError}
            setLoginError={setLoginError}
            onCustomLogin={(customUser: any) => setUser(customUser)}
            onLogout={handleLogout}
          />
        );
      case 'collaboration':
        return <Collaboration onBack={() => setActivePage('home')} />;
      default:
        return <Home setActivePage={setActivePage} setSelectedThemeId={setSelectedThemeId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-bg text-ink selection:bg-teal-pale selection:text-teal-deep print:bg-white" id="mhsl-applet-root">
      <div className="space-y-4 print:space-y-0">
        {/* Navigation bar */}
        <div className="print:hidden">
          <Header
            activePage={activePage}
            setActivePage={setActivePage}
            user={user}
            onLogout={handleLogout}
          />
        </div>

        {/* Dynamic page area */}
        <main className="focus:outline-none">
          {renderPage()}
        </main>
      </div>

      {/* University branded footer */}
      <div className="print:hidden">
        <Footer setActivePage={setActivePage} />
      </div>
    </div>
  );
}
