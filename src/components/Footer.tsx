import { Code2, Github, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  darkMode: boolean;
}

const SOCIAL = {
  github: 'https://github.com/nagarjungowdakn13',
  linkedin: 'https://www.linkedin.com/in/nagarjun-gowda-k-n-743830397/',
  leetcode: 'https://leetcode.com/u/nagarjunkn/',
  email: 'mailto:nagarjungowdakn2005@gmail.com',
};

export default function Footer({ darkMode }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`py-10 border-t ${
        darkMode ? 'bg-charcoal border-hairline-dark' : 'bg-paper border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p className={`font-serif text-sm ${darkMode ? 'text-cream' : 'text-ink'}`}>
              Nagarjun Gowda K N
            </p>
            <p className={`text-xs mt-0.5 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
              Built with React, TypeScript &amp; Tailwind
            </p>
          </div>

          <div className="flex items-center gap-1">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-2 rounded-md transition-colors ${
                darkMode ? 'text-cream-soft hover:text-cream hover:bg-white/5' : 'text-ink-soft hover:text-ink hover:bg-paper-soft'
              }`}
            >
              <Github size={17} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2 rounded-md transition-colors ${
                darkMode ? 'text-cream-soft hover:text-cream hover:bg-white/5' : 'text-ink-soft hover:text-ink hover:bg-paper-soft'
              }`}
            >
              <Linkedin size={17} />
            </a>
            <a
              href={SOCIAL.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className={`p-2 rounded-md transition-colors ${
                darkMode ? 'text-cream-soft hover:text-cream hover:bg-white/5' : 'text-ink-soft hover:text-ink hover:bg-paper-soft'
              }`}
            >
              <Code2 size={17} />
            </a>
            <a
              href={SOCIAL.email}
              aria-label="Email"
              className={`p-2 rounded-md transition-colors ${
                darkMode ? 'text-cream-soft hover:text-cream hover:bg-white/5' : 'text-ink-soft hover:text-ink hover:bg-paper-soft'
              }`}
            >
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 border-t text-center text-xs ${
            darkMode ? 'border-hairline-dark text-cream-soft' : 'border-hairline text-ink-soft'
          }`}
        >
          © {year} Nagarjun Gowda K N. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
