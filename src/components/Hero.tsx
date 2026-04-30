import { ArrowRight, Code2, Github, Linkedin, Mail, Terminal } from 'lucide-react';

interface HeroProps {
  darkMode: boolean;
}

const SOCIAL = {
  github: 'https://github.com/nagarjungowdakn13',
  linkedin: 'https://www.linkedin.com/in/nagarjun-gowda-k-n-743830397/',
  leetcode: 'https://leetcode.com/u/nagarjunkn/',
  email: 'mailto:nagarjungowdakn2005@gmail.com',
};

export default function Hero({ darkMode }: HeroProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16 ${
        darkMode
          ? 'bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50'
      }`}
    >
      {/* Subtle grid */}
      <div
        className={`absolute inset-0 ${darkMode ? 'grid-pattern-dark' : 'grid-pattern-light'} opacity-60 pointer-events-none`}
      />

      {/* Soft floating accents — slower, less distracting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-10 right-0 w-[28rem] h-[28rem] rounded-full opacity-25 blur-3xl ${
            darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-orange-300 to-rose-300'
          } animate-float`}
        />
        <div
          className={`absolute bottom-10 left-0 w-[24rem] h-[24rem] rounded-full opacity-20 blur-3xl ${
            darkMode ? 'bg-gradient-to-tr from-blue-600 to-cyan-500' : 'bg-gradient-to-tr from-amber-300 to-yellow-300'
          } animate-float-delayed`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-gentle-rise">
          {/* Status pill */}
          <div className="flex justify-center mb-8">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border backdrop-blur-md ${
                darkMode
                  ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open to opportunities — internships & full-time SWE/ML roles
            </div>
          </div>

          {/* Terminal-style identifier */}
          <div className="flex justify-center mb-6">
            <div
              className={`flex items-center gap-2 font-mono text-xs sm:text-sm ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <Terminal size={14} />
              <span>~/nagarjun</span>
              <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>$</span>
              <span>whoami</span>
              <span className="animate-blink">▊</span>
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`text-center text-4xl sm:text-5xl lg:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            <span className="block">Hi, I'm</span>
            <span
              className={`block mt-2 bg-gradient-to-r ${
                darkMode ? 'from-purple-400 via-pink-400 to-orange-400' : 'from-orange-500 via-rose-500 to-pink-500'
              } bg-clip-text text-transparent`}
            >
              Nagarjun Gowda K N
            </span>
          </h1>

          {/* Sub-headline: who + what */}
          <p
            className={`text-center text-xl sm:text-2xl lg:text-3xl font-light mb-6 max-w-4xl mx-auto leading-snug ${
              darkMode ? 'text-slate-200' : 'text-slate-700'
            }`}
          >
            I build <span className="font-medium">AI/ML systems</span>, <span className="font-medium">security tooling</span>, and <span className="font-medium">backend platforms</span> that ship.
          </p>

          {/* Value prop */}
          <p
            className={`text-center text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            CS engineering student based in Bengaluru. I focus on production-grade RAG pipelines, LLM evaluation,
            real-time anomaly detection, and end-to-end automation — projects with real architecture, not just demos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollTo('projects')}
              className={`group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-base text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                darkMode
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                  : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
              }`}
            >
              View Projects
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-base border backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
                darkMode
                  ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                  : 'border-slate-300 bg-white/70 text-slate-800 hover:bg-white'
              }`}
            >
              <Mail size={18} />
              Contact Me
            </button>

            <a
              href="/Nagarjun ATS Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Resume →
            </a>
          </div>

          {/* Social row */}
          <div className="flex justify-center gap-3">
            {[
              { href: SOCIAL.github, icon: Github, label: 'GitHub' },
              { href: SOCIAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: SOCIAL.leetcode, icon: Code2, label: 'LeetCode' },
              { href: SOCIAL.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className={`p-3 rounded-xl border backdrop-blur transition-all duration-300 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                    : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
