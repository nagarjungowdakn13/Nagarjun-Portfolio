import { Atom, Brain, Cloud, Code2, Database, GitBranch, ServerCog, ShieldCheck } from 'lucide-react';

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
    description: 'Anomaly detection, threat scoring, autonomous response, and live monitoring.',
    skills: [
      { name: 'Network Anomaly Detection', strong: true },
      { name: 'Autonomous Threat Detection & Response' },
      { name: 'Graph / Temporal Correlation' },
      { name: 'Multi-modal threat scoring' },
      { name: 'Drift monitoring' },
    ],
  },
  {
    category: 'Quantum & Cryptography',
    icon: Atom,
    description: 'Applied post-quantum cryptography and quantum risk assessment.',
    skills: [
      { name: 'Post-Quantum Cryptography (ML-KEM / ML-DSA)', strong: true },
      { name: 'Qiskit / Quantum Simulation' },
      { name: 'Cryptographic Agility' },
      { name: 'SHAP / Explainable AI' },
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
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal border-hairline-dark' : 'bg-paper border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Skills</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            What I work with
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
            Grouped by what I actually use them for. A marked dot means it's where I'm strongest.
          </p>
        </div>

        {/* Skill groups */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-px mb-20 border rounded-lg overflow-hidden ${
            darkMode ? 'border-hairline-dark' : 'border-hairline'
          }`}
          style={{ backgroundColor: darkMode ? 'rgba(255,255,255,0.06)' : '#E3DFD3' }}
        >
          {SKILL_GROUPS.map(({ category, icon: Icon, description, skills }) => (
            <div
              key={category}
              className={`p-6 ${darkMode ? 'bg-charcoal' : 'bg-paper'}`}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <Icon size={17} className={darkMode ? 'text-brass' : 'text-gold'} />
                <h3 className={`text-[15px] font-semibold ${darkMode ? 'text-cream' : 'text-ink'}`}>
                  {category}
                </h3>
              </div>
              <p className={`text-sm mb-4 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                {description}
              </p>
              <ul className="space-y-1.5">
                {skills.map(({ name, strong }) => (
                  <li
                    key={name}
                    className={`flex items-center gap-2 text-[13px] ${
                      darkMode ? 'text-cream-soft' : 'text-ink-soft'
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full flex-shrink-0 ${
                        strong ? (darkMode ? 'bg-brass' : 'bg-gold') : darkMode ? 'bg-white/20' : 'bg-ink/20'
                      }`}
                    />
                    <span className={strong ? (darkMode ? 'text-cream font-medium' : 'text-ink font-medium') : ''}>
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Engineering practices */}
        <div className="mb-10 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>How I work</p>
          <h3
            className={`font-serif text-2xl sm:text-3xl font-medium tracking-tight ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Engineering practices
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {ENGINEERING_PRACTICES.map(({ icon: Icon, title, points }) => (
            <div
              key={title}
              className={`p-6 rounded-lg border ${
                darkMode ? 'border-hairline-dark' : 'border-hairline'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <Icon size={17} className={darkMode ? 'text-brass' : 'text-gold'} />
                <h4 className={`font-semibold text-sm ${darkMode ? 'text-cream' : 'text-ink'}`}>{title}</h4>
              </div>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                {points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <span className={darkMode ? 'text-brass' : 'text-gold'}>›</span>
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
