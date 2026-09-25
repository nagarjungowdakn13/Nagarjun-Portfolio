import { ArrowRight, Code2, Github, Linkedin, Mail } from 'lucide-react';

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
      className={`min-h-screen flex items-center relative overflow-hidden pt-28 pb-20 ${
        darkMode ? 'bg-charcoal' : 'bg-paper'
      }`}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: darkMode
            ? 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(217,180,94,0.09), transparent 70%)'
            : 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(150,104,28,0.06), transparent 70%)',
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="animate-gentle-rise">
          {/* Status line */}
          <div className="flex justify-center mb-10">
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide ${
                darkMode
                  ? 'border-hairline-dark text-cream-soft'
                  : 'border-hairline text-ink-soft'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-brass' : 'bg-gold'}`} />
              Applying to MS in Computer Science programs — Fall 2027
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`font-serif text-center text-4xl sm:text-5xl lg:text-6xl font-medium mb-6 leading-[1.15] tracking-tight ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Nagarjun Gowda K N
          </h1>

          <p
            className={`kicker text-center mb-8 ${darkMode ? 'text-brass' : 'text-gold'}`}
          >
            AI / ML · Security · Applied Cryptography
          </p>

          {/* Sub-headline */}
          <p
            className={`text-center text-lg sm:text-xl font-normal mb-6 max-w-3xl mx-auto leading-snug ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            I build and research AI/ML systems, security tooling, and applied cryptography — with
            the rigor of a lab, not a demo.
          </p>

          {/* Value prop */}
          <p
            className={`text-center text-base mb-12 max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-cream-soft' : 'text-ink-soft'
            }`}
          >
            CS engineering student based in Bengaluru, applying to MS programs in Computer Science
            in the US. My work spans production-grade RAG pipelines, LLM evaluation, post-quantum
            cryptographic risk assessment, autonomous threat detection, and real-time anomaly
            detection — each one built with empirical validation, not just a working demo.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-14">
            <button
              onClick={() => scrollTo('projects')}
              className={`group inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                darkMode
                  ? 'bg-brass text-charcoal hover:bg-brass/90 shadow-[0_8px_24px_-8px_rgba(217,180,94,0.5)]'
                  : 'bg-gold text-paper hover:bg-gold/90 shadow-[0_8px_24px_-8px_rgba(150,104,28,0.4)]'
              }`}
            >
              View Projects
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <a
              href={SOCIAL.email}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm border transition-all duration-200 hover:-translate-y-0.5 ${
                darkMode
                  ? 'border-hairline-dark text-cream hover:bg-white/5 hover:border-brass/40'
                  : 'border-hairline text-ink hover:bg-paper-soft hover:border-gold/40'
              }`}
            >
              <Mail size={15} />
              Contact
            </a>

            <a
              href="/Nagarjun_Gowda_K_N_Master_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium underline decoration-hairline underline-offset-4 transition-colors duration-200 ${
                darkMode ? 'text-cream-soft hover:text-cream' : 'text-ink-soft hover:text-ink'
              }`}
            >
              Resume →
            </a>
          </div>

          {/* Social row */}
          <div className="flex justify-center gap-2">
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
                className={`p-2.5 rounded-md border transition-all duration-200 hover:-translate-y-0.5 ${
                  darkMode
                    ? 'border-hairline-dark text-cream-soft hover:text-brass hover:border-brass/40 hover:bg-white/5'
                    : 'border-hairline text-ink-soft hover:text-gold hover:border-gold/40 hover:bg-paper-soft'
                }`}
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
