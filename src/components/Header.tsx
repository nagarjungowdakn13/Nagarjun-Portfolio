import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { PUBLICATIONS } from '../data/publications';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ALL_NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'notes', label: 'Notes' },
] as const;

const NAV_ITEMS = ALL_NAV_ITEMS.filter((item) => item.id !== 'publications' || PUBLICATIONS.length > 0);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 backdrop-blur-md border-b ${
        darkMode ? 'bg-charcoal/90 border-hairline-dark' : 'bg-paper/90 border-hairline'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Wordmark */}
          <button
            onClick={() => scrollToSection('home')}
            className={`font-serif text-lg sm:text-xl tracking-tight ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Nagarjun Gowda K N
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map(({ id, label }) => {
              const active = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`relative py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    active
                      ? darkMode ? 'text-cream' : 'text-ink'
                      : darkMode
                      ? 'text-cream-soft hover:text-cream'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-[1px] left-0 right-0 h-[1.5px] transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-0'
                    } ${darkMode ? 'bg-brass' : 'bg-gold'}`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Theme + mobile menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
              className={`p-2 rounded-md border transition-colors duration-200 ${
                darkMode
                  ? 'border-hairline-dark text-brass hover:bg-white/5'
                  : 'border-hairline text-gold hover:bg-paper-soft'
              }`}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-md border transition-colors duration-200 ${
                darkMode
                  ? 'border-hairline-dark text-cream-soft hover:bg-white/5'
                  : 'border-hairline text-ink-soft hover:bg-paper-soft'
              }`}
            >
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isMenuOpen && (
          <div className={`md:hidden pb-4 border-t ${darkMode ? 'border-hairline-dark' : 'border-hairline'}`}>
            <nav className="flex flex-col pt-2">
              {NAV_ITEMS.map(({ id, label }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`text-left px-1 py-3 text-sm font-medium border-b last:border-b-0 transition-colors ${
                      darkMode ? 'border-hairline-dark' : 'border-hairline'
                    } ${
                      active
                        ? darkMode ? 'text-brass' : 'text-gold'
                        : darkMode
                        ? 'text-cream-soft'
                        : 'text-ink-soft'
                    }`}
                  >
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
