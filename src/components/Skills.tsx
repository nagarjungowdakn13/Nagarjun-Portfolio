import { Brain, Cloud, Code2, Database, GitBranch, ServerCog, ShieldCheck, Star } from 'lucide-react';

interface SkillsProps {
  darkMode: boolean;
}

interface SkillGroup {
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  skills: { name: string; strong?: boolean }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'AI / ML',
    icon: Brain,
    description: 'Where I spend most of my time. Pipelines, eval, grounding.',
    skills: [
      { name: 'RAG / Vector Search', strong: true },
      { name: 'LLM Evaluation', strong: true },
      { name: 'Embeddings (HF / sentence-transformers)' },
      { name: 'FAISS' },
      { name: 'TensorFlow' },
      { name: 'scikit-learn', strong: true },
      { name: 'Isolation Forest / Autoencoders' },
      { name: 'Prompt Engineering' },
    ],
  },
  {
    category: 'Backend',
    icon: ServerCog,
    description: 'API design, async workers, clean service boundaries.',
    skills: [
      { name: 'Python', strong: true },
      { name: 'FastAPI', strong: true },
      { name: 'Flask' },
      { name: 'Node.js / Express' },
      { name: 'REST API Design' },
      { name: 'WebSockets' },
      { name: 'Java' },
    ],
  },
  {
    category: 'Data',
    icon: Database,
    description: 'Wrangling, indexing, and getting clean signal out of messy data.',
    skills: [
      { name: 'pandas', strong: true },
      { name: 'NumPy', strong: true },
      { name: 'SQL', strong: true },
      { name: 'MongoDB' },
      { name: 'FAISS / Vector stores' },
      { name: 'Matplotlib / Seaborn' },
    ],
  },
  {
    category: 'Security & Networking',
    icon: ShieldCheck,
    description: 'Anomaly detection, threat scoring, and live monitoring.',
    skills: [
      { name: 'Network Anomaly Detection', strong: true },
      { name: 'Sensitive-data classification' },
      { name: 'Multi-modal threat scoring' },
      { name: 'Drift monitoring' },
    ],
  },
  {
    category: 'Frontend',
    icon: Code2,
    description: 'Enough React to ship full-stack systems end-to-end.',
    skills: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
      { name: 'Streamlit', strong: true },
      { name: 'Vite' },
    ],
  },
  {
    category: 'DevOps & Tooling',
    icon: Cloud,
    description: 'How code gets out of my laptop reliably.',
    skills: [
      { name: 'Docker', strong: true },
      { name: 'Git / GitHub', strong: true },
      { name: 'Linux / Shell' },
      { name: 'AWS (basics)' },
      { name: 'CI workflows' },
    ],
  },
];

const ENGINEERING_PRACTICES = [
  {
    icon: GitBranch,
    title: 'Code Quality',
    points: [
      'Type hints + small modules — every project has clean boundaries',
      'README + docstrings on anything I expect someone else to read',
      'Linting + formatting (ruff / eslint) wired in from day one',
    ],
  },
  {
    icon: ServerCog,
    title: 'Performance',
    points: [
      'Profile before optimizing — vectorized pandas / NumPy operations',
      'FAISS sub-100ms vector search at index sizes I work with',
      'Async I/O in FastAPI services to avoid blocking on slow LLM calls',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Testing & Deployment',
    points: [
      'Pytest for unit + integration where it actually catches bugs',
      'Docker for reproducible local + deploy environments',
      'Eval suites treated as code — runnable on every model swap',
    ],
  },
];

export default function Skills({ darkMode }: SkillsProps) {
  return (
    <section
      id="skills"
      className={`py-24 ${
        darkMode ? 'bg-gradient-to-b from-slate-900 to-slate-950' : 'bg-gradient-to-b from-slate-50 to-white'
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
            // tech stack
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            What I work with
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Grouped by what I actually use them for. Items marked{' '}
            <span className={`inline-flex items-center gap-1 font-medium ${darkMode ? 'text-amber-300' : 'text-amber-600'}`}>
              <Star size={14} className="fill-current" /> star
            </span>{' '}
            are where I'm strongest.
          </p>
        </div>

        {/* Skill groups */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SKILL_GROUPS.map(({ category, icon: Icon, description, skills }) => (
            <div
              key={category}
              className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 ${
                darkMode
                  ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  : 'bg-white border-slate-200 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-orange-50 text-orange-500'
                  }`}
                >
                  <Icon size={20} />
                </div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {category}
                </h3>
              </div>
              <p className={`text-sm mb-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.map(({ name, strong }) => (
                  <span
                    key={name}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${
                      strong
                        ? darkMode
                          ? 'bg-amber-400/10 border-amber-400/30 text-amber-200'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                        : darkMode
                        ? 'bg-white/5 border-white/10 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {strong && <Star size={10} className="fill-current" />}
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering practices */}
        <div className="text-center mb-10">
          <p
            className={`text-sm font-mono uppercase tracking-widest mb-3 ${
              darkMode ? 'text-purple-400' : 'text-orange-500'
            }`}
          >
            // how I work
          </p>
          <h3
            className={`text-2xl sm:text-3xl font-semibold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Engineering practices
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {ENGINEERING_PRACTICES.map(({ icon: Icon, title, points }) => (
            <div
              key={title}
              className={`rounded-2xl p-6 border ${
                darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-orange-50 text-orange-500'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
              </div>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                {points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
