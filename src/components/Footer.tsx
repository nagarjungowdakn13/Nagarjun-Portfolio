import { Code2, Github, Heart, Linkedin, Mail } from 'lucide-react';

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
      className={`py-12 border-t ${
        darkMode ? 'bg-slate-950 border-white/10' : 'bg-white border-slate-200'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <p
              className={`text-sm font-medium ${
                darkMode ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              Nagarjun Gowda K N
            </p>
            <p
              className={`text-xs mt-0.5 flex items-center justify-center sm:justify-start gap-1 ${
                darkMode ? 'text-slate-500' : 'text-slate-500'
              }`}
            >
              Built with React, TypeScript &amp; Tailwind
              <Heart size={12} className={darkMode ? 'text-pink-400' : 'text-rose-500'} />
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Linkedin size={18} />
            </a>
            <a
              href={SOCIAL.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Code2 size={18} />
            </a>
            <a
              href={SOCIAL.email}
              aria-label="Email"
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 border-t text-center text-xs ${
            darkMode ? 'border-white/10 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          © {year} Nagarjun Gowda K N. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
