import { useEffect, useState } from 'react';
import { BookOpen, Briefcase, Code, Home, Mail, Menu, Moon, Sun, User, X } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'notes', label: 'Notes', icon: BookOpen },
  { id: 'contact', label: 'Contact', icon: Mail },
] as const;

export default function Header({ darkMode, toggleDarkMode }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const current = NAV_ITEMS.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b ${
        darkMode ? 'bg-slate-950/75 border-white/10' : 'bg-white/80 border-slate-200/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className={`text-lg sm:text-xl font-semibold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span
              className={`bg-gradient-to-r ${
                darkMode ? 'from-purple-400 to-pink-400' : 'from-orange-500 to-rose-500'
              } bg-clip-text text-transparent`}
            >
              nagarjun
            </span>
            <span className={darkMode ? 'text-slate-500' : 'text-slate-400'}>.dev</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? darkMode
                        ? 'bg-white/10 text-white'
                        : 'bg-slate-900 text-white'
                      : darkMode
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Theme + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`p-2.5 rounded-full border transition-colors duration-200 ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-amber-300 hover:bg-white/10'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2.5 rounded-full border transition-colors duration-200 ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className={`md:hidden pb-4 border-t ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <nav className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? darkMode
                          ? 'bg-white/10 text-white'
                          : 'bg-slate-900 text-white'
                        : darkMode
                        ? 'text-slate-300 hover:bg-white/5'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
