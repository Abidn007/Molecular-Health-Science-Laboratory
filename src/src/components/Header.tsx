import { useState } from 'react';
import { Menu, X, User as UserIcon, LogOut, CheckCircle, Database } from 'lucide-react';
import { User } from 'firebase/auth';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Header({ activePage, setActivePage, user, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research' },
    { id: 'team', label: 'Team' },
    { id: 'services', label: 'Services' },
    { id: 'news', label: 'News Feed' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 rounded-lg py-1"
            id="brand-logo"
            aria-label="Molecular Health Science Laboratory Home"
          >
            <img 
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgoPslN9e0c8siqMB7TJxGAph_EZ8b6QwYx4vEJsaWDfA1Nz_v_ZCNqsjOksHPSRpm-4LXujp2nMBxE6_eAzeVEgzFzAXHJtCF9hmlvy2y4-1_MVePOHezmLH-rDtd3E-lcH6oDP0ppeB8kiJVOmzYqvOg0oRgz1ww4YEO8k7vvA-EdP2ww_zVLYjFCr_I/s320/Lab%20Logo.jpeg"
              alt="Molecular Health Science Laboratory Logo"
              className="h-11 w-auto object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-xs sm:text-sm text-teal-deep leading-tight tracking-tight">
                Molecular Health Science Laboratory
              </span>
              <span className="text-[9px] uppercase tracking-wider text-gold font-sans font-semibold leading-none mt-0.5">
                Department of GEB &middot; RU
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id || (item.id === 'gallery' && activePage === 'farewell-2022');
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-teal-pale text-teal-deep font-semibold'
                      : 'text-ink-soft hover:bg-teal-pale/50 hover:text-teal-deep'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  id={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Sign-In Info / Action Button */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePage('portal')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    activePage === 'portal'
                      ? 'bg-teal text-white border-teal'
                      : 'bg-paper text-teal border-teal/20 hover:bg-teal-pale'
                  }`}
                  id="nav-portal"
                  title="Member Portal"
                >
                  <Database className="w-3.5 h-3.5" />
                  Portal
                </button>
                <div className="flex items-center gap-1 text-xs text-ink-soft border border-line bg-bg-alt px-2.5 py-1.5 rounded-lg font-mono">
                  <CheckCircle className="w-3 h-3 text-teal" />
                  <span className="max-w-[100px] truncate">{user.displayName || 'Lab Member'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-ink-soft hover:bg-red-50 hover:text-red-600 border border-line cursor-pointer"
                  title="Log Out"
                  id="btn-logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActivePage('portal')}
                className="flex items-center gap-2 bg-gradient-to-r from-teal to-teal-deep text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-95 hover:shadow-md transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
                id="btn-nav-contact"
              >
                <UserIcon className="w-4 h-4" />
                Member Login
              </button>
            )}
            <button
              onClick={() => setActivePage('contact')}
              className="bg-gradient-to-r from-gold to-[#9a3412] text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-95 hover:shadow-md transition-all cursor-pointer shadow-sm hover:-translate-y-0.5"
              id="btn-nav-contact"
            >
              Contact Us
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            {user && (
              <button
                onClick={() => setActivePage('portal')}
                className="flex items-center gap-1 bg-teal-pale text-teal-deep border border-teal/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                id="mobile-portal-shortcut"
              >
                <Database className="w-3.5 h-3.5" />
                Portal
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-ink hover:text-teal hover:bg-teal-pale border border-line cursor-pointer"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              id="mobile-menu-btn"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-line bg-paper shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = activePage === item.id || (item.id === 'gallery' && activePage === 'farewell-2022');
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-pale text-teal-deep font-semibold'
                      : 'text-ink-soft hover:bg-teal-pale/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                setActivePage('portal');
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                activePage === 'portal'
                  ? 'bg-teal-pale text-teal-deep font-semibold'
                  : 'text-ink-soft hover:bg-teal-pale/50'
              }`}
              id="mobile-nav-portal-btn"
            >
              Secure Member Portal
            </button>
            <button
              onClick={() => {
                setActivePage('contact');
                setIsOpen(false);
              }}
              className="block w-full text-center bg-gold text-white mt-4 py-2.5 rounded-lg font-semibold hover:bg-amber-800"
              id="mobile-nav-contact-btn"
            >
              Contact Us
            </button>
            {user && (
              <button
                onClick={() => {
                  onLogout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full text-center bg-red-50 text-red-600 mt-2 py-2.5 rounded-lg font-semibold border border-red-100"
                id="mobile-nav-logout-btn"
              >
                <LogOut className="w-4 h-4" />
                Sign Out ({user.displayName || 'Lab Member'})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
