import { useEffect, useRef, useState } from 'react';
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
}

const USERNAME = 'nagarjungowdakn13';
const LEETCODE_USERNAME = 'nagarjunkn';

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
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          fork: boolean;
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
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Activity</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Code I've been writing
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
            Live activity from{' '}
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 ${darkMode ? 'text-cream hover:text-brass' : 'text-ink hover:text-gold'}`}
            >
              github/@{USERNAME}
            </a>{' '}
            and{' '}
            <a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={`underline underline-offset-4 ${darkMode ? 'text-cream hover:text-brass' : 'text-ink hover:text-gold'}`}
            >
              leetcode/@{LEETCODE_USERNAME}
            </a>
            . Stats refresh whenever I push or solve.
          </p>
        </div>

        {/* GitHub profile card */}
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative block rounded-lg border overflow-hidden transition-all duration-300 hover:-translate-y-1 mb-6 ${
            darkMode
              ? 'bg-charcoal border-hairline-dark hover:border-brass/40 shadow-card-dark hover:shadow-card-dark-hover'
              : 'bg-paper border-hairline hover:border-gold/40 shadow-card hover:shadow-card-hover'
          }`}
          aria-label="Visit my GitHub profile"
        >
          <div
            className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              darkMode ? 'text-cream-soft' : 'text-ink-soft'
            }`}
            aria-hidden
          >
            <ArrowUpRight size={16} />
          </div>

          <div className="px-6 sm:px-12 py-10 sm:py-12">
            <div className="flex flex-col items-center text-center">
              {stats ? (
                <img
                  src={stats.avatarUrl}
                  alt={stats.name}
                  loading="lazy"
                  className={`w-24 h-24 rounded-full border transition-transform duration-500 group-hover:scale-105 ${
                    darkMode ? 'border-hairline-dark' : 'border-hairline'
                  }`}
                />
              ) : (
                <div
                  className={`w-24 h-24 rounded-full animate-pulse ${darkMode ? 'bg-white/5' : 'bg-paper-soft'}`}
                />
              )}

              <h3 className={`mt-5 font-serif text-2xl font-medium tracking-tight ${darkMode ? 'text-cream' : 'text-ink'}`}>
                {stats?.name ?? 'Nagarjun Gowda K N'}
              </h3>

              <p className={`mt-1 text-sm font-mono ${darkMode ? 'text-brass' : 'text-gold'}`}>
                @{USERNAME}
              </p>

              <p className={`mt-4 text-[15px] leading-relaxed max-w-xl ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                {stats?.bio ||
                  'Every push, issue, and commit lives on my GitHub. Drop in to see what I\'m working on right now.'}
              </p>
            </div>

            {/* Stats row */}
            <div
              className={`mt-9 max-w-2xl mx-auto rounded-lg border overflow-hidden ${
                darkMode ? 'border-hairline-dark' : 'border-hairline'
              }`}
            >
              <div className={`grid grid-cols-2 sm:grid-cols-4 divide-x ${darkMode ? 'divide-hairline-dark' : 'divide-hairline'}`}>
                {[
                  { icon: FolderGit2, label: 'Repositories', value: stats?.publicRepos },
                  { icon: Star, label: 'Stars earned', value: stats?.totalStars },
                  { icon: Users, label: 'Followers', value: stats?.followers },
                  { icon: UserPlus, label: 'Following', value: stats?.following },
                ].map(({ icon: Icon, label, value }, idx) => (
                  <div
                    key={label}
                    className={`flex flex-col items-center justify-center py-5 px-3 ${
                      idx >= 2 ? `border-t sm:border-t-0 ${darkMode ? 'border-hairline-dark' : 'border-hairline'}` : ''
                    }`}
                  >
                    <Icon size={15} className={`mb-2 ${darkMode ? 'text-brass' : 'text-gold'}`} />
                    <span className={`text-2xl font-serif font-medium tabular-nums leading-none ${darkMode ? 'text-cream' : 'text-ink'}`}>
                      {value !== undefined ? <CountUp value={value} /> : '—'}
                    </span>
                    <span className={`text-[11px] mt-1.5 uppercase tracking-wider ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            {stats?.topLanguages && stats.topLanguages.length > 0 && (
              <div className="mt-8 text-center">
                <p className={`kicker mb-3 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>Languages I write in</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {stats.topLanguages.map(({ name }) => (
                    <span
                      key={name}
                      className={`px-3 py-1 rounded-md text-sm font-medium border ${
                        darkMode ? 'border-hairline-dark text-cream-soft' : 'border-hairline text-ink-soft'
                      }`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-9 flex justify-center">
              <span
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm transition-colors duration-200 ${
                  darkMode ? 'bg-brass text-charcoal group-hover:bg-brass/90' : 'bg-gold text-paper group-hover:bg-gold/90'
                }`}
              >
                <Github size={16} />
                Visit my full GitHub profile
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
              <p className={`text-[15px] leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                I treat LeetCode as a <span className="font-semibold">deliberate practice</span>{' '}
                routine, not a grind. The goal isn't to maximize the count — it's to recognize
                patterns fast, articulate tradeoffs cleanly, and write code that I'd be comfortable
                explaining in an interview.
              </p>

              <div>
                <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Focus areas</p>
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
                      className={`px-2.5 py-1 rounded text-xs font-medium border ${
                        darkMode ? 'border-hairline-dark text-cream-soft' : 'border-hairline text-ink-soft'
                      }`}
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>How I practice</p>
                <ul className={`space-y-2 text-sm ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-brass' : 'text-gold'}>›</span>
                    <span>
                      <span className="font-medium">Pattern over count.</span> One problem deeply
                      understood beats five rushed.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-brass' : 'text-gold'}>›</span>
                    <span>
                      <span className="font-medium">Always state complexity.</span> Time + space, in
                      Big-O, before I write the code.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-brass' : 'text-gold'}>›</span>
                    <span>
                      <span className="font-medium">Brute force first.</span> Get a baseline, then
                      optimize — interviews reward the path, not just the destination.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className={darkMode ? 'text-brass' : 'text-gold'}>›</span>
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
                className={`inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 transition-colors ${
                  darkMode ? 'text-brass hover:text-brass/80' : 'text-gold hover:text-gold/80'
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

function CountUp({ value, duration = 900 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const animated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
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
      className={`rounded-lg border overflow-hidden ${
        darkMode ? 'bg-charcoal border-hairline-dark' : 'bg-paper border-hairline'
      }`}
    >
      <div className={`px-5 py-3 border-b ${darkMode ? 'border-hairline-dark' : 'border-hairline'}`}>
        <p className={`kicker ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>{title}</p>
      </div>
      <div className="p-5 flex items-center justify-center min-h-[180px]">{children}</div>
    </div>
  );
}
