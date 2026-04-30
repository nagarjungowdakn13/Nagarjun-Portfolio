import { Code2, Github } from 'lucide-react';

interface GitHubStatsProps {
  darkMode: boolean;
}

const USERNAME = 'nagarjungowdakn13';
const LEETCODE_USERNAME = 'nagarjunkn';

export default function GitHubStats({ darkMode }: GitHubStatsProps) {
  const common = darkMode
    ? 'hide_border=true&bg_color=0f172a&title_color=c4b5fd&text_color=cbd5e1&icon_color=ec4899'
    : 'hide_border=true&bg_color=ffffff&title_color=ea580c&text_color=475569&icon_color=f43f5e';

  const statsUrl = `https://github-readme-stats.vercel.app/api?username=${USERNAME}&show_icons=true&include_all_commits=true&count_private=true&${common}`;
  const langsUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&langs_count=8&${common}`;
  const leetcodeUrl = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=${
    darkMode ? 'dark' : 'light'
  }&font=Inter&ext=heatmap`;

  return (
    <section
      id="github"
      className={`py-24 ${
        darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-white to-slate-50'
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className={`text-sm font-mono uppercase tracking-widest mb-3 ${
              darkMode ? 'text-purple-400' : 'text-orange-500'
            }`}
          >
            // github
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Code I've been writing
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Live activity from{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline decoration-dotted underline-offset-4 ${
                darkMode ? 'text-white hover:text-purple-300' : 'text-slate-900 hover:text-orange-600'
              }`}
            >
              github/@{USERNAME}
            </a>{' '}
            and{' '}
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline decoration-dotted underline-offset-4 ${
                darkMode ? 'text-white hover:text-purple-300' : 'text-slate-900 hover:text-orange-600'
              }`}
            >
              leetcode/@{LEETCODE_USERNAME}
            </a>
            . Stats refresh whenever I push or solve.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card darkMode={darkMode} title="Profile stats">
            <img
              src={statsUrl}
              alt={`${USERNAME} GitHub stats`}
              loading="lazy"
              className="w-full h-auto"
            />
          </Card>

          <Card darkMode={darkMode} title="Top languages">
            <img
              src={langsUrl}
              alt={`${USERNAME} top languages`}
              loading="lazy"
              className="w-full h-auto"
            />
          </Card>
        </div>

        <Card darkMode={darkMode} title="LeetCode — problem solving practice">
          <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
            <div className="flex justify-center">
              <img
                src={leetcodeUrl}
                alt={`${LEETCODE_USERNAME} LeetCode stats`}
                loading="lazy"
                className="w-full max-w-md h-auto"
              />
            </div>

            <div className="space-y-5">
              <p
                className={`text-[15px] leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                I treat LeetCode as a <span className="font-semibold">deliberate practice</span>{' '}
                routine, not a grind. The goal isn't to maximize the count — it's to recognize
                patterns fast, articulate tradeoffs cleanly, and write code that I'd be comfortable
                explaining in an interview.
              </p>

              <div>
                <p
                  className={`text-[11px] font-mono uppercase tracking-widest mb-3 ${
                    darkMode ? 'text-purple-400' : 'text-orange-500'
                  }`}
                >
                  // focus areas
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Arrays & Hashing',
                    'Two Pointers',
                    'Sliding Window',
                    'Binary Search',
                    'Trees & BFS/DFS',
                    'Graphs',
                    'Dynamic Programming',
                    'Backtracking',
                    'Heap / Priority Queue',
                    'Bit Manipulation',
                  ].map((topic) => (
                    <span
                      key={topic}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                        darkMode
                          ? 'bg-white/5 border-white/10 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className={`text-[11px] font-mono uppercase tracking-widest mb-3 ${
                    darkMode ? 'text-purple-400' : 'text-orange-500'
                  }`}
                >
                  // how I practice
                </p>
                <ul
                  className={`space-y-2 text-sm ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                    <span>
                      <span className="font-medium">Pattern over count.</span> One problem deeply
                      understood beats five rushed.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                    <span>
                      <span className="font-medium">Always state complexity.</span> Time + space, in
                      Big-O, before I write the code.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                    <span>
                      <span className="font-medium">Brute force first.</span> Get a baseline, then
                      optimize — interviews reward the path, not just the destination.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                    <span>
                      <span className="font-medium">Re-solve, don't re-read.</span> If I can't write
                      a solution from scratch a week later, I didn't actually learn it.
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-medium underline decoration-dotted underline-offset-4 transition-colors ${
                  darkMode ? 'text-purple-300 hover:text-purple-200' : 'text-orange-600 hover:text-orange-700'
                }`}
              >
                <Code2 size={14} />
                See full LeetCode profile →
              </a>
            </div>
          </div>
        </Card>

        <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-white/15 text-slate-200 hover:bg-white/5'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Github size={16} />
            GitHub profile
          </a>
          <a
            href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-white/15 text-slate-200 hover:bg-white/5'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Code2 size={16} />
            LeetCode profile
          </a>
        </div>
      </div>
    </section>
  );
}

function Card({
  darkMode,
  title,
  children,
}: {
  darkMode: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div
        className={`px-5 py-3 border-b flex items-center justify-between ${
          darkMode ? 'border-white/10' : 'border-slate-200'
        }`}
      >
        <p
          className={`text-[11px] font-mono uppercase tracking-widest ${
            darkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          // {title}
        </p>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white/15' : 'bg-slate-300'}`} />
          <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white/15' : 'bg-slate-300'}`} />
          <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-white/15' : 'bg-slate-300'}`} />
        </div>
      </div>
      <div className="p-5 flex items-center justify-center min-h-[180px]">{children}</div>
    </div>
  );
}
