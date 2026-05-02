import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Code2,
  FolderGit2,
  Github,
  Star,
  UserPlus,
  Users,
} from 'lucide-react';

interface GitHubStatsProps {
  darkMode: boolean;
}

interface FeaturedRepo {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

interface ProfileStats {
  avatarUrl: string;
  name: string;
  bio: string | null;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; count: number; pct: number }[];
  featured: FeaturedRepo[];
}

const USERNAME = 'nagarjungowdakn13';
const LEETCODE_USERNAME = 'nagarjunkn';

const LANG_COLORS: Record<string, string> = {
  Python: '#3776ab',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  C: '#555555',
  'C++': '#f34b7d',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
};

const langColor = (name: string | null, darkMode: boolean) =>
  (name && LANG_COLORS[name]) || (darkMode ? '#a78bfa' : '#f97316');

export default function GitHubStats({ darkMode }: GitHubStatsProps) {
  const [stats, setStats] = useState<ProfileStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !reposRes.ok) return;
        const user = await userRes.json();
        const repos: Array<{
          name: string;
          description: string | null;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          fork: boolean;
          pushed_at: string;
        }> = await reposRes.json();
        if (cancelled) return;

        const ownRepos = repos.filter((r) => !r.fork);
        const totalStars = ownRepos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
        const totalForks = ownRepos.reduce((s, r) => s + (r.forks_count || 0), 0);

        const langCounts: Record<string, number> = {};
        ownRepos.forEach((r) => {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        });
        const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
        const topLanguages = Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }));

        const featured = [...ownRepos]
          .sort((a, b) => {
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
          })
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            description: r.description,
            htmlUrl: r.html_url,
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            language: r.language,
            pushedAt: r.pushed_at,
          }));

        setStats({
          avatarUrl: user.avatar_url,
          name: user.name || USERNAME,
          bio: user.bio,
          htmlUrl: user.html_url,
          publicRepos: user.public_repos,
          followers: user.followers,
          following: user.following,
          totalStars,
          totalForks,
          topLanguages,
          featured,
        });
      } catch {
        /* skeleton stays visible */
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const leetcodeUrl = `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}?theme=${
    darkMode ? 'dark' : 'light'
  }&font=Inter&ext=contest`;

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

        {/* GitHub invite card — one beautiful, clickable surface */}
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block rounded-3xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 mb-12 ${
            darkMode
              ? 'bg-slate-900/60 border-white/10 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.4)]'
              : 'bg-white border-slate-200 shadow-sm hover:shadow-2xl hover:border-slate-300'
          }`}
          aria-label="Visit my GitHub profile"
        >
          {/* ambient gradient backdrop */}
          <div
            aria-hidden
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 ${
              darkMode
                ? 'opacity-80 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10'
                : 'opacity-70 bg-gradient-to-br from-orange-100/60 via-transparent to-rose-100/60'
            }`}
          />
          <div
            aria-hidden
            className={`absolute -top-40 left-1/2 -translate-x-1/2 w-[140%] h-72 rounded-full blur-3xl pointer-events-none ${
              darkMode ? 'bg-purple-600/20' : 'bg-orange-200/60'
            }`}
          />

          {/* corner external-link affordance */}
          <div
            className={`absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-[8deg] ${
              darkMode
                ? 'bg-white/5 text-slate-300 group-hover:bg-white/10 group-hover:text-white'
                : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900'
            }`}
            aria-hidden
          >
            <ArrowUpRight size={16} />
          </div>

          <div className="relative px-6 sm:px-12 py-10 sm:py-14">
            {/* Avatar + identity */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div
                  aria-hidden
                  className={`absolute -inset-2 rounded-full blur-xl opacity-60 transition-opacity duration-500 group-hover:opacity-90 ${
                    darkMode
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                      : 'bg-gradient-to-br from-orange-300 to-rose-300'
                  }`}
                />
                {stats ? (
                  <img
                    src={stats.avatarUrl}
                    alt={stats.name}
                    loading="lazy"
                    className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03] ${
                      darkMode ? 'ring-slate-900' : 'ring-white'
                    }`}
                  />
                ) : (
                  <div
                    className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full animate-pulse ${
                      darkMode ? 'bg-white/5' : 'bg-slate-100'
                    }`}
                  />
                )}
                {/* "active" pulse */}
                <span
                  className={`absolute bottom-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${
                    darkMode ? 'ring-slate-900' : 'ring-white'
                  }`}
                  aria-hidden
                >
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </div>

              <h3
                className={`mt-6 text-2xl sm:text-3xl font-semibold tracking-tight ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {stats?.name ?? 'Nagarjun Gowda K N'}
              </h3>

              <p
                className={`mt-1.5 text-sm font-mono ${
                  darkMode ? 'text-purple-300' : 'text-orange-600'
                }`}
              >
                @{USERNAME}
              </p>

              <p
                className={`mt-5 text-[15px] sm:text-base leading-relaxed max-w-xl ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                {stats?.bio ||
                  'I build, break, and ship — every push, issue, and commit lives on my GitHub. Drop in to see what I\'m working on right now.'}
              </p>
            </div>

            {/* Stats — unified row */}
            <div
              className={`relative mt-10 max-w-2xl mx-auto rounded-2xl border overflow-hidden ${
                darkMode ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div
                className={`grid grid-cols-2 sm:grid-cols-4 divide-x ${
                  darkMode ? 'divide-white/10' : 'divide-slate-200'
                }`}
              >
                {[
                  { icon: FolderGit2, label: 'Repositories', value: stats?.publicRepos },
                  { icon: Star, label: 'Stars earned', value: stats?.totalStars },
                  { icon: Users, label: 'Followers', value: stats?.followers },
                  { icon: UserPlus, label: 'Following', value: stats?.following },
                ].map(({ icon: Icon, label, value }, idx) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center justify-center py-5 px-3 ${
                      idx === 2 ? 'border-t sm:border-t-0' : ''
                    } ${idx === 3 ? 'border-t sm:border-t-0' : ''} ${
                      darkMode ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`mb-2 ${darkMode ? 'text-purple-300' : 'text-orange-500'}`}
                    />
                    <span
                      className={`text-2xl sm:text-3xl font-semibold tabular-nums leading-none ${
                        darkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {value ?? '—'}
                    </span>
                    <span
                      className={`text-[11px] mt-1.5 uppercase tracking-wider ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages I write in */}
            {stats?.topLanguages && stats.topLanguages.length > 0 && (
              <div className="mt-8 text-center">
                <p
                  className={`text-[11px] font-mono uppercase tracking-widest mb-3 ${
                    darkMode ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  // languages I write in
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {stats.topLanguages.map(({ name }) => (
                    <span
                      key={name}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur ${
                        darkMode
                          ? 'bg-white/5 border-white/10 text-slate-200'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: langColor(name, darkMode) }}
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <span
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-white shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-[1.03] ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500'
                }`}
              >
                <Github size={18} />
                Visit my full GitHub profile
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </div>
        </a>

        <Card darkMode={darkMode} title="LeetCode — problem solving practice">
          <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
            <div className="flex justify-center">
              <img
                src={leetcodeUrl}
                alt={`${LEETCODE_USERNAME} LeetCode stats and contest rating`}
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

