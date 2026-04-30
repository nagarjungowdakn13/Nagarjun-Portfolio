import { useEffect, useState } from 'react';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GitHubStats from './components/GitHubStats';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Reveal from './components/Reveal';
import ScrollProgress from './components/ScrollProgress';
import Skills from './components/Skills';
import TechNotes from './components/TechNotes';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    } else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', JSON.stringify(next));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
        }`}
      >
        <ScrollProgress darkMode={darkMode} />
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero darkMode={darkMode} />
          <Reveal>
            <About darkMode={darkMode} />
          </Reveal>
          <Reveal>
            <Projects darkMode={darkMode} />
          </Reveal>
          <Reveal>
            <Skills darkMode={darkMode} />
          </Reveal>
          <Reveal>
            <GitHubStats darkMode={darkMode} />
          </Reveal>
          <Reveal>
            <TechNotes darkMode={darkMode} />
          </Reveal>
          <Reveal>
            <Contact darkMode={darkMode} />
          </Reveal>
        </main>
        <Footer darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;
