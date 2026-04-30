import { useMemo, useState } from 'react';
import RAGDiagram from './RAGDiagram';
import {
  Activity,
  AlertTriangle,
  Brain,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Gauge,
  Github,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

type Category = 'AI/ML' | 'Backend' | 'Security' | 'Full Stack';

interface Project {
  id: string;
  title: string;
  tagline: string;
  categories: Category[];
  featured?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradient: { light: string; dark: string };
  image?: string;
  problem: string;
  approach: string[];
  architecture: string[];
  stack: string[];
  challenges: string[];
  impact: string[];
  github: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'rag-qa',
    title: 'RAG-based AI Question Answering System',
    tagline: 'Production-grade retrieval pipeline with FastAPI, FAISS, and HuggingFace embeddings.',
    categories: ['AI/ML', 'Backend'],
    featured: true,
    icon: Brain,
    gradient: {
      light: 'from-violet-500 via-fuchsia-500 to-pink-500',
      dark: 'from-violet-600 via-fuchsia-600 to-pink-600',
    },
    image:
      'https://raw.githubusercontent.com/nagarjungowdakn13/RAG-based-AI-Question-Answering-System/main/docs/images/dashboard-overview.png',
    problem:
      'Out-of-the-box LLMs hallucinate confidently on private or domain-specific knowledge. Teams need answers grounded in their own documents — with citations, not vibes.',
    approach: [
      'Chunked source documents with overlap to preserve context across boundaries.',
      'Generated dense embeddings via HuggingFace sentence-transformers and indexed them in FAISS for sub-100ms vector search.',
      'Wrapped retrieval + answer synthesis behind a FastAPI service with typed request/response schemas.',
      'Added a hallucination guardrail: answers cite the chunks they were grounded in, and questions with no high-similarity matches return "I don\'t know" instead of inventing.',
    ],
    architecture: [
      'Client → FastAPI /ask endpoint',
      'Embed query (sentence-transformers) → FAISS top-k retrieval',
      'Re-rank + assemble context window → LLM completion',
      'Response = { answer, sources[], confidence } returned to client',
    ],
    stack: ['Python', 'FastAPI', 'FAISS', 'HuggingFace', 'sentence-transformers', 'Docker'],
    challenges: [
      'Tuning chunk size + overlap — too small loses context, too large dilutes the embedding signal.',
      'Building a guardrail that distinguishes "low-confidence answer" from "no answer", instead of letting the model fill the gap.',
      'Keeping the index reproducible: deterministic chunking, versioned embeddings, and rebuild scripts.',
    ],
    impact: [
      'Source-grounded answers traceable to original document chunks.',
      'Modular pipeline — embedding model, vector store, and LLM are swappable.',
      'Containerized for reproducible deployment.',
    ],
    github: 'https://github.com/nagarjungowdakn13/RAG-based-AI-Question-Answering-System',
  },
  {
    id: 'llm-eval',
    title: 'LLM Evaluation & Prompt Optimization Framework',
    tagline: 'Automated harness that scores LLM outputs across correctness, consistency, and hallucination.',
    categories: ['AI/ML'],
    featured: true,
    icon: Gauge,
    gradient: {
      light: 'from-sky-500 via-cyan-500 to-teal-500',
      dark: 'from-sky-600 via-cyan-600 to-teal-600',
    },
    problem:
      'Prompt engineering is usually vibes-based. Two prompts feel similar but one quietly hallucinates 15% of the time. Without a harness, you ship the bad one.',
    approach: [
      'Defined a multi-axis scoring schema: correctness (against gold answers), consistency (across temperature samples), and hallucination (claims unsupported by reference).',
      'Built a prompt-variant runner that sweeps templates, system messages, and parameters across a fixed eval set.',
      'Aggregated per-prompt scores into a leaderboard so you can see which template actually moves the needle.',
      'Treated eval as code — versioned, runnable in CI, reproducible.',
    ],
    architecture: [
      'Prompt set + eval set (YAML) → Runner spawns N samples per variant',
      'Scorer module: correctness / consistency / hallucination metrics',
      'Aggregator → ranked leaderboard + per-question breakdown',
    ],
    stack: ['Python', 'OpenAI / HuggingFace APIs', 'pandas', 'pytest'],
    challenges: [
      'Hallucination is the hardest metric to score automatically — built a reference-grounded check that flags claims with no support in the source.',
      'Sample-size tradeoff: more samples = better signal, but cost scales linearly. Tuned defaults to find a usable signal-to-cost ratio.',
    ],
    impact: [
      'Turns prompt selection from "feels better" into a measurable decision.',
      'Catches regressions when swapping models or templates.',
      'Reusable across any LLM-backed feature.',
    ],
    github: 'https://github.com/nagarjungowdakn13/LLM-Evaluation-and-Prompt-Optimization-Framework',
  },
  {
    id: 'cybershieldnet',
    title: 'CyberShieldNet — Multi-modal Threat Intelligence',
    tagline: 'Fuses graph, temporal, and behavioral signals into a unified risk score.',
    categories: ['Security', 'AI/ML'],
    featured: true,
    icon: Shield,
    gradient: {
      light: 'from-rose-500 via-red-500 to-orange-500',
      dark: 'from-rose-600 via-red-600 to-orange-600',
    },
    problem:
      'Threat detection systems usually look at one signal in isolation — IP reputation, login patterns, or graph connectivity. Real attackers light up multiple signals weakly. A single-modality system either misses them or floods analysts with false positives.',
    approach: [
      'Built three independent feature extractors: graph (entity relationships), temporal (sequence patterns), behavioral (per-user baselines).',
      'Fused them through a weighted scoring model that produces a single calibrated risk score per entity.',
      'Surfaced the top contributors per score so an analyst can see *why* an entity got flagged, not just that it did.',
    ],
    architecture: [
      'Raw events → 3 parallel feature pipelines (graph / temporal / behavioral)',
      'Per-modality risk scores → fusion layer → unified score',
      'Explainability layer surfaces top contributing features',
    ],
    stack: ['Python', 'NetworkX', 'pandas', 'scikit-learn', 'NumPy'],
    challenges: [
      'Calibrating modalities so a strong single signal doesn\'t drown out a weak-but-correlated multi-signal pattern.',
      'Defining "behavior" rigorously: per-user baselines drift over time, so the baseline itself has to be updated without forgetting recent attacks.',
    ],
    impact: [
      'Reduces analyst alert fatigue by surfacing fused, prioritized risks.',
      'Explainable scores — every flag comes with its top contributors.',
      'Modular: each modality can be swapped or extended independently.',
    ],
    github: 'https://github.com/nagarjungowdakn13/CyberShieldNet',
  },
  {
    id: 'network-anomaly',
    title: 'Network Anomaly Detection Workbench',
    tagline: 'Streamlit + Isolation Forest pipeline for real-time monitoring with drift tracking.',
    categories: ['Security', 'AI/ML'],
    featured: true,
    icon: Activity,
    gradient: {
      light: 'from-emerald-500 via-teal-500 to-cyan-500',
      dark: 'from-emerald-600 via-teal-600 to-cyan-600',
    },
    image:
      'https://raw.githubusercontent.com/nagarjungowdakn13/Network-Anamoly-Detection/main/docs/screenshots/overview.png',
    problem:
      'Rule-based network monitoring breaks the moment traffic patterns shift. Pure ML breaks the moment it\'s shipped without a way to track when the model itself starts drifting.',
    approach: [
      'Trained an Isolation Forest on baseline traffic features — packet rates, flow durations, byte counts.',
      'Streamed live traffic into the same feature pipeline and scored each window for anomaly.',
      'Added a drift dashboard: tracks input feature distributions vs. training distribution, so we know when the model is operating off-distribution.',
      'Packaged with Docker for reproducible deployment.',
    ],
    architecture: [
      'Live capture → feature extraction (windowed)',
      'Isolation Forest scoring → anomaly stream',
      'Streamlit dashboard: live alerts + drift metrics + manual triage',
    ],
    stack: ['Python', 'scikit-learn', 'Streamlit', 'pandas', 'Docker'],
    challenges: [
      'Choosing features that survive distribution shift — raw packet counts drift constantly; ratios and rates are more stable.',
      'Setting the contamination parameter without ground truth — landed on a cross-validated approach against labeled attack samples.',
    ],
    impact: [
      'Real-time anomaly visibility on streaming traffic.',
      'Drift tracking flags model staleness *before* it produces silent garbage.',
      'Containerized — runs identically on dev and deployment.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Network-Anamoly-Detection',
  },
  {
    id: 'windows-automation',
    title: 'Windows Desktop Automation Framework',
    tagline: 'FastAPI-driven task pipeline with CLI, audit logs, and a live dashboard.',
    categories: ['Backend'],
    icon: Terminal,
    gradient: {
      light: 'from-slate-700 via-slate-800 to-slate-900',
      dark: 'from-slate-700 via-slate-800 to-slate-900',
    },
    image:
      'https://raw.githubusercontent.com/nagarjungowdakn13/Windows-Desktop-Automation-Framework/main/docs/images/dashboard-home.png',
    problem:
      'Most desktop automation scripts are one-off, opaque, and impossible to operate at scale. We needed something with a real API, real logs, and a queue.',
    approach: [
      'Designed a JSON task schema so workflows are declarative and version-controllable.',
      'Built a FastAPI control plane that accepts tasks, queues them, and exposes status.',
      'Added a CLI for operators and a dashboard for live status.',
      'Every action writes to an audit log — replayable, debuggable, accountable.',
    ],
    architecture: [
      'CLI / API client → FastAPI control plane',
      'Task queue → executor workers',
      'Every step → audit log + dashboard event stream',
    ],
    stack: ['Python', 'FastAPI', 'pyautogui', 'WebSockets', 'SQLite'],
    challenges: [
      'Idempotency — desktop actions are not naturally idempotent, so each task records a checkpoint to allow safe retries.',
      'Crash recovery: tasks resume from their last checkpoint instead of restarting from scratch.',
    ],
    impact: [
      'Repeatable, audit-friendly desktop automation.',
      'Live dashboard makes operations debuggable.',
      'Declarative task format = easy to extend.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Windows-Desktop-Automation-Framework',
  },
  {
    id: 'fraud-detection',
    title: 'Fraud Detection & Recommender',
    tagline: 'TensorFlow autoencoder + Flask dashboard for per-user transaction analysis.',
    categories: ['AI/ML', 'Backend'],
    icon: AlertTriangle,
    gradient: {
      light: 'from-amber-500 via-orange-500 to-red-500',
      dark: 'from-amber-600 via-orange-600 to-red-600',
    },
    problem:
      'Supervised fraud models break when fraud patterns shift faster than you can label them. We needed an unsupervised baseline that flags transactions that simply don\'t look like a user.',
    approach: [
      'Trained a per-user (or cohort-level) autoencoder that learns the shape of normal transaction patterns.',
      'Scored new transactions by reconstruction error — anything reconstructed badly is anomalous.',
      'Flask dashboard surfaces flagged transactions with explainability.',
    ],
    architecture: [
      'Transactions → user-level features → Autoencoder',
      'Reconstruction error > threshold → flag',
      'Flask dashboard for analyst review',
    ],
    stack: ['Python', 'TensorFlow', 'Flask', 'pandas', 'scikit-learn'],
    challenges: [
      'Cold-start users — handled by falling back to cohort baselines until enough history accumulates.',
      'Threshold calibration — used per-user reconstruction error percentiles instead of a global threshold.',
    ],
    impact: [
      'Unsupervised baseline that adapts as user behavior evolves.',
      'Per-user thresholds reduce false positives vs. global cutoffs.',
    ],
    github: 'https://github.com/nagarjungowdakn13/fraud_detection_recommender',
  },
  {
    id: 'attendance',
    title: 'Attendance Management System',
    tagline: 'Full-stack MERN app with role-based access and REST APIs.',
    categories: ['Full Stack', 'Backend'],
    icon: Calendar,
    gradient: {
      light: 'from-indigo-500 via-blue-500 to-sky-500',
      dark: 'from-indigo-600 via-blue-600 to-sky-600',
    },
    problem:
      'Existing attendance solutions are either spreadsheet-grade or enterprise-grade — nothing in the middle for small institutions.',
    approach: [
      'React frontend with role-based views for students, faculty, and admins.',
      'Express + Node REST API backed by MongoDB.',
      'JWT-based auth with role guards on every protected endpoint.',
    ],
    architecture: [
      'React SPA → REST API (Express) → MongoDB',
      'JWT auth middleware + role-based route guards',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
    challenges: [
      'Designing a role model that\'s strict enough to be safe and flexible enough to be usable.',
      'Indexing MongoDB collections for date-range queries on attendance records.',
    ],
    impact: [
      'Clean separation between frontend, API, and data layers.',
      'Role-based access works correctly across all three views.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Attendance-Management-System',
  },
];

const FILTERS: ('All' | Category)[] = ['All', 'AI/ML', 'Backend', 'Security', 'Full Stack'];

export default function Projects({ darkMode }: ProjectsProps) {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(filter));
  }, [filter]);

  return (
    <section
      id="projects"
      className={`py-24 ${
        darkMode ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-white to-slate-50'
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
            // case studies
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Selected Projects
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Each project below ships with the engineering decisions behind it — why I built it, how it's
            structured, and what I'd do differently next time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  active
                    ? darkMode
                      ? 'bg-purple-500/20 border-purple-400/50 text-purple-200'
                      : 'bg-orange-500 border-orange-500 text-white'
                    : darkMode
                    ? 'border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {visible.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <article
                key={p.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-white border-slate-200 hover:shadow-xl hover:border-slate-300'
                } ${isOpen ? 'md:col-span-2' : ''}`}
              >
                <ProjectPreview project={p} darkMode={darkMode} />
                <div className="p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {p.featured && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${
                            darkMode
                              ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30'
                              : 'bg-amber-100 text-amber-700 border border-amber-200'
                          }`}
                        >
                          <Sparkles size={10} />
                          Featured
                        </span>
                      )}
                      {p.categories.map((c) => (
                        <span
                          key={c}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            darkMode ? 'bg-white/10 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-2 leading-snug ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {p.tagline}
                  </p>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className={`px-2 py-1 rounded-md text-[11px] font-mono ${
                          darkMode
                            ? 'bg-purple-500/10 text-purple-300 border border-purple-500/20'
                            : 'bg-orange-50 text-orange-700 border border-orange-100'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <Github size={16} />
                        Code
                      </a>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                            darkMode ? 'text-purple-300 hover:text-purple-200' : 'text-orange-600 hover:text-orange-700'
                          }`}
                        >
                          <ExternalLink size={16} />
                          Live demo
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all ${
                        darkMode
                          ? 'border-white/10 text-slate-300 hover:bg-white/5'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? 'Hide details' : 'Read case study'}
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

                {/* Expanded case study */}
                {isOpen && (
                  <div
                    className={`px-7 pb-7 pt-2 border-t animate-fade-in ${
                      darkMode ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    {p.id === 'rag-qa' && (
                      <div
                        className={`mt-5 mb-2 rounded-xl border p-4 sm:p-6 ${
                          darkMode ? 'bg-slate-900/40 border-white/10' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <p
                          className={`text-[11px] font-mono uppercase tracking-widest mb-3 ${
                            darkMode ? 'text-purple-400' : 'text-orange-500'
                          }`}
                        >
                          // architecture diagram
                        </p>
                        <RAGDiagram darkMode={darkMode} />
                      </div>
                    )}
                    <div className="grid md:grid-cols-2 gap-6 pt-5">
                      <CaseSection darkMode={darkMode} label="Problem" body={[p.problem]} />
                      <CaseSection darkMode={darkMode} label="Approach" body={p.approach} />
                      <CaseSection darkMode={darkMode} label="Architecture / Data Flow" body={p.architecture} mono />
                      <CaseSection darkMode={darkMode} label="Key Challenges" body={p.challenges} />
                      <CaseSection darkMode={darkMode} label="Impact / Outcome" body={p.impact} />
                      <CaseSection darkMode={darkMode} label="Full Stack" body={[p.stack.join(' · ')]} mono />
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* See more on GitHub */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/nagarjungowdakn13?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              darkMode
                ? 'border-white/15 text-slate-200 hover:bg-white/5'
                : 'border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Github size={18} />
            See all repositories on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ project, darkMode }: { project: Project; darkMode: boolean }) {
  const Icon = project.icon;
  const gradient = darkMode ? project.gradient.dark : project.gradient.light;

  if (project.image) {
    return (
      <div className="relative h-44 overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className={`absolute inset-0 ${
            darkMode
              ? 'bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent'
              : 'bg-gradient-to-t from-white/40 via-transparent to-transparent'
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative h-44 overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center`}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Soft blob */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-white/15 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 w-44 h-44 rounded-full bg-black/15 blur-3xl" />

      {/* Top bar — terminal-style */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
      </div>
      <div className="absolute top-3 right-3 font-mono text-[10px] text-white/70 tracking-wider">
        {project.id}.app
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-xl">
          <Icon size={26} className="text-white" />
        </div>
        <div className="font-mono text-[11px] tracking-widest text-white/85 uppercase">
          {project.categories.join(' · ')}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 overflow-hidden">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/20 text-white/90 border border-white/15 whitespace-nowrap"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function CaseSection({
  darkMode,
  label,
  body,
  mono = false,
}: {
  darkMode: boolean;
  label: string;
  body: string[];
  mono?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-[11px] font-mono uppercase tracking-widest mb-2 ${
          darkMode ? 'text-purple-400' : 'text-orange-500'
        }`}
      >
        // {label.toLowerCase()}
      </p>
      {body.length === 1 ? (
        <p
          className={`text-sm leading-relaxed ${mono ? 'font-mono text-[12.5px]' : ''} ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {body[0]}
        </p>
      ) : (
        <ul
          className={`space-y-1.5 text-sm leading-relaxed ${mono ? 'font-mono text-[12.5px]' : ''} ${
            darkMode ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          {body.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>{mono ? '›' : '•'}</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
