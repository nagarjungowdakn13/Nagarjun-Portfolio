import { useMemo, useState } from 'react';
import RAGDiagram from './RAGDiagram';
import {
  Activity,
  AlertTriangle,
  Atom,
  Brain,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FlaskConical,
  Gauge,
  Github,
  Network,
  Radar,
  Shield,
  Sparkles,
  Terminal,
} from 'lucide-react';

interface ProjectsProps {
  darkMode: boolean;
}

type Category = 'AI/ML' | 'Backend' | 'Security' | 'Full Stack' | 'Quantum';

interface Project {
  id: string;
  title: string;
  tagline: string;
  categories: Category[];
  featured?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  image?: string;
  images?: { src: string; caption: string }[];
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
    id: 'quantum-shield',
    title: 'QuantumShield — Post-Quantum Cryptographic Migration Platform',
    tagline: 'AI-driven crypto asset discovery, quantum risk scoring, and PQC migration planning with empirical validation.',
    categories: ['Quantum', 'Security', 'AI/ML'],
    featured: true,
    icon: Atom,
    problem:
      'Organizations run extensive public-key cryptography (TLS, certificates, signatures) with no visibility into where it lives or how exposed it is to future quantum attacks. Most "quantum readiness" claims are marketing, not measurement.',
    approach: [
      'Built a structured pipeline: discover crypto assets → classify algorithms → assess quantum risk → recommend post-quantum (PQC) strategies → benchmark alternatives → simulate migration.',
      'Enforced a hard rule across the whole project: nothing is allowed to be fabricated. Every metric is either REAL (from executed code), SYNTHETIC, or QUANTUM SIMULATION — labeled explicitly, never blended.',
      'Ran dual-path risk assessment: a deterministic rule baseline alongside trained AI models (logistic regression, random forest, XGBoost) with SHAP explainability, then validated the AI model\'s edge with statistical significance testing.',
      'Designed a CryptoProvider interface so algorithm swaps (RSA/ECDSA → ML-KEM/ML-DSA → SLH-DSA) require zero business-logic changes — cryptographic agility as an architectural property, not a promise.',
    ],
    architecture: [
      'Discovery layer → scans a synthetic lab environment (8 services, 42 assets)',
      'AlgorithmRegistry classification → quantum threat modeling',
      'Dual risk assessment: rule baseline + AI models (SHAP-explained)',
      'Recommendation engine → benchmark-aware PQC strategy',
      'FastAPI + JWT/RBAC audit-logged API → React/TypeScript live dashboard',
    ],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'Qiskit', 'scikit-learn', 'XGBoost', 'SHAP', 'React', 'TypeScript', 'Docker'],
    challenges: [
      'Measuring real performance deltas instead of projecting them — validated AI models with paired bootstrap and permutation tests, not eyeballed accuracy.',
      'Hard-capped quantum simulation at 16 qubits to avoid overstating cryptographic relevance; demonstrated noise sensitivity directly (ideal vs. noisy Grover: 96.14% vs. 43.87% success probability).',
      'Discovered real data-integrity gaps through testing — PostgreSQL enforced VARCHAR limits that SQLite had silently ignored.',
      'Reported unexpected results honestly: XGBoost\'s apparent edge over simpler models turned out to be statistically indistinguishable from noise.',
    ],
    impact: [
      'Measured ML-KEM-512 key generation at ~2,000x faster than RSA-2048, with signature size trade-offs quantified (SLH-DSA-SHA2-128F: 17KB vs. ECDSA-P256: 70 bytes).',
      'Logistic regression significantly outperformed the rule baseline (0.7897 vs. 0.7232 macro-F1, p=0.0005).',
      'Cryptographic agility proven in practice — three algorithm swaps, zero business-logic rewrites.',
      '76 passing backend tests and a research audit documenting exactly which claims are verified vs. unverified.',
    ],
    github: 'https://github.com/nagarjungowdakn13/AI-Driven-Post-Quantum-Cryptographic-Migration-Quantum-Risk-Intelligence-Platform',
  },
  {
    id: 'cartograph',
    title: 'CARTOGRAPH — Autonomous Cyber Threat Detection & Response',
    tagline: 'Fuses ML detection, graph/temporal correlation, and an LLM investigator into policy-gated autonomous defense.',
    categories: ['Security', 'AI/ML'],
    featured: true,
    icon: Radar,
    problem:
      'The research question driving this project: can heterogeneous, temporally distributed security telemetry be turned into reliable, explainable, risk-aware autonomous defense decisions — while minimizing false positives and unnecessary interventions?',
    approach: [
      'Built a detection layer spanning rules, random forests, XGBoost, isolation forests, neural networks, and hybrid ensembles — then compared them empirically instead of assuming the fanciest model wins.',
      'Combined temporal and graph-based correlation to fuse fragmented alerts into coherent incidents.',
      'Added an LLM-grounded investigation step (with a deterministic templated fallback when no API key is supplied) so decisions come with human-readable reasoning.',
      'Gated every automated response behind policy checks and verification — autonomy with a leash, not autonomy by default.',
    ],
    architecture: [
      'Ingestion → feature extraction → ML detection (rules / RF / XGBoost / isolation forest / NN / hybrid)',
      'Temporal + graph correlation → explainable risk scoring',
      'LLM investigation (grounded, with templated fallback) → policy engine',
      'Policy-gated response + verification → cyber-range validation → API/dashboard',
    ],
    stack: ['Python', 'FastAPI', 'Neo4j', 'Kafka', 'PostgreSQL', 'React', 'TypeScript', 'Prometheus', 'Grafana'],
    challenges: [
      'Early statistical claims lacked rigor — rebuilt experiments with bootstrap confidence intervals and repeated trials before trusting any comparison.',
      'Hybrid and random-forest models were statistically indistinguishable on cyber-range data but diverged on public benchmarks — a reminder that benchmark performance doesn\'t always transfer.',
      'Graph-only correlation over-merged unrelated alerts; temporal reasoning turned out to be independently necessary, not redundant.',
      'Found and closed a real security gap: startup validation now blocks running in full mode with insecure default JWT secrets.',
    ],
    impact: [
      'Hybrid model reached F1 0.802 on the NSL-KDD benchmark, best of five models tested.',
      'Temporal correlation delivered an 11.9x ± 9.7 alert reduction; graph correlation alone reached 120.6x ± 45.7 but over-merged distinct incidents.',
      '8 of 11 planned experiments executed end-to-end with statistical validation, not estimates.',
      'Explicitly scoped as a research platform, not production-ready — a limitation stated up front rather than discovered later.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Autonomous-AI-System-for-Real-Time-Cyber-Threat-Detection-Investigation-and-Response',
  },
  {
    id: 'researchmind-q',
    title: 'ResearchMind-Q — Evidence-Grounded AI Research Assistant',
    tagline: 'Human-gated AI agents that run the scientific workflow — hypothesis to statistics to conclusion — across AI, quantum computing, and cybersecurity.',
    categories: ['AI/ML', 'Quantum', 'Security'],
    featured: true,
    icon: FlaskConical,
    problem:
      'The research question: can AI agents meaningfully support the scientific workflow — literature → hypothesis → experiment → statistics → critique → conclusion — while preserving reproducibility, evidence grounding, and human oversight? Deliberately not a paper-summarization chatbot, not a generic RAG demo, and not an automated paper writer.',
    approach: [
      'Tagged every claim with explicit evidence provenance: REPORTED_IN_LITERATURE, AI_INFERRED, HYPOTHESIZED, SIMULATED, EXPERIMENTALLY_OBSERVED, or HUMAN_VERIFIED — no claim is allowed to hide its own confidence.',
      'Isolated experiment execution behind a two-tier sandbox: Docker for arbitrary code, a restricted process tier for pre-reviewed templates, with explicit configuration gates.',
      'Required two independently-checked, audit-logged human approvals before any experiment executes — autonomy that still keeps a human in the loop.',
      'Kept statistics LLM-free by design: every metric is computed by numpy/scipy over real data, never asked of or phrased by a language model.',
    ],
    architecture: [
      'FastAPI + SQLAlchemy backend — agents for hypothesis drafting, critique, gap analysis, synthesis',
      'Sandboxed experiment executor (Docker / restricted process tier)',
      'Research Knowledge Graph (schema-as-data ontology) → SQLite (dev) / PostgreSQL + Neo4j (prod)',
      'React/TypeScript frontend — dashboard, experiment approval, quantum lab, audit log',
    ],
    stack: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Neo4j', 'Docker', 'React', 'TypeScript', 'NumPy', 'SciPy'],
    challenges: [
      'Prevented LLM hallucination at the source by excluding LLM calls from the statistics module entirely — no metric is ever "phrased" by a model.',
      'Enforced reproducibility without fabrication: every output traces back to a research/ or reproducibility/ directory with a full audit trail.',
      'Documented a real production-verification gap honestly — a disk-space incident during development blocked Docker validation of the full Postgres + Neo4j topology, recorded in ADRs rather than hidden.',
      'Built per-agent guardrails: fixed-vocabulary rejection, add-only critique, evidence-derived confidence scoring, and numeric consistency checks.',
    ],
    impact: [
      '87 passing tests with no external service dependencies for core functionality.',
      'Six reproducible experiments (demos, AI model comparison, IDS comparison, ablation studies) with real output artifacts.',
      'Every subsystem status is documented as VERIFIED, IMPLEMENTED, or NOT_IMPLEMENTED in a public research audit — honesty as a design constraint, not an afterthought.',
      'ADR-driven architecture decisions published openly; includes an evidence package specifically assembled for graduate-admissions validation.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Autonomous-AI-Research-Experimentation-Platform-for-AI-Quantum-Computing-and-Cybersecurity',
  },
  {
    id: 'rag-qa',
    title: 'RAG-based AI Question Answering System',
    tagline: 'Production-grade retrieval pipeline with FastAPI, FAISS, and HuggingFace embeddings.',
    categories: ['AI/ML', 'Backend'],
    featured: true,
    icon: Brain,
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
  {
    id: 'network-monitoring',
    title: 'Network Monitoring and Automation Tool',
    tagline: 'Live device telemetry, alerting, and automated remediation across a multi-host network.',
    categories: ['Backend', 'Security'],
    icon: Network,
    image:
      'https://raw.githubusercontent.com/nagarjungowdakn13/Network-Monitoring-and-Automation-Tool/main/docs/images/dashboard-overview.png',
    images: [
      {
        src: 'https://raw.githubusercontent.com/nagarjungowdakn13/Network-Monitoring-and-Automation-Tool/main/docs/images/dashboard-overview.png',
        caption: 'Dashboard overview — KPIs and live device health',
      },
      {
        src: 'https://raw.githubusercontent.com/nagarjungowdakn13/Network-Monitoring-and-Automation-Tool/main/docs/images/dashboard-trends.png',
        caption: 'Trends — bandwidth and connection history',
      },
      {
        src: 'https://raw.githubusercontent.com/nagarjungowdakn13/Network-Monitoring-and-Automation-Tool/main/docs/images/dashboard-operations.png',
        caption: 'Operations — diagnostics and remediation actions',
      },
    ],
    problem:
      'Network operators spend hours stitching together ping checks, SNMP polls, and ad-hoc scripts to know whether the fleet is healthy. When something breaks, remediation is manual and slow.',
    approach: [
      'Polled devices on a fixed cadence to collect reachability, latency, and resource metrics.',
      'Stored time-series samples so trends and outages are visible, not just current state.',
      'Wired alerting to threshold breaches with deduplication so a flapping link does not page repeatedly.',
      'Added an automation layer that runs predefined remediation scripts when specific alert signatures fire.',
    ],
    architecture: [
      'Scheduler → per-device probes (ping / SNMP / SSH)',
      'Metrics store → threshold evaluator → alert stream',
      'Alert → automation runner → device remediation action',
      'Dashboard surfaces live status, history, and triggered actions',
    ],
    stack: ['Python', 'Paramiko', 'SNMP', 'Flask', 'SQLite'],
    challenges: [
      'Avoiding alert storms — added per-device cooldowns and signature-based deduplication.',
      'Safe automation — every remediation runs against a whitelist of allowed actions per device class to prevent a misfire from taking down infrastructure.',
    ],
    impact: [
      'Live visibility into device health across the fleet.',
      'Mean-time-to-recovery drops for known failure modes via auto-remediation.',
      'Auditable: every alert and every automated action is logged.',
    ],
    github: 'https://github.com/nagarjungowdakn13/Network-Monitoring-and-Automation-Tool',
  },
];

const FILTERS: ('All' | Category)[] = ['All', 'AI/ML', 'Security', 'Quantum', 'Backend', 'Full Stack'];

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
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Research & Projects</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Selected work
          </h2>
          <p
            className={`text-base leading-relaxed ${
              darkMode ? 'text-cream-soft' : 'text-ink-soft'
            }`}
          >
            Each project below ships with the reasoning behind it — the problem, the approach, what was
            measured, and what I'd do differently next time.
          </p>
        </div>

        {/* Filters */}
        <div className={`flex flex-wrap gap-2 mb-12 pb-6 border-b ${darkMode ? 'border-hairline-dark' : 'border-hairline'}`}>
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium border transition-colors duration-200 ${
                  active
                    ? darkMode
                      ? 'bg-cream text-charcoal border-cream'
                      : 'bg-ink text-paper border-ink'
                    : darkMode
                    ? 'border-hairline-dark text-cream-soft hover:text-cream hover:border-white/25'
                    : 'border-hairline text-ink-soft hover:text-ink hover:border-ink/25'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {visible.map((p) => {
            const isOpen = expanded === p.id;
            return (
              <article
                key={p.id}
                className={`rounded-lg border overflow-hidden transition-colors duration-300 ${
                  darkMode
                    ? 'bg-charcoal border-hairline-dark hover:border-white/25'
                    : 'bg-paper border-hairline hover:border-ink/25'
                } ${isOpen ? 'md:col-span-2' : ''}`}
              >
                <ProjectPreview project={p} darkMode={darkMode} />
                <div className="p-6 sm:p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      {p.featured && (
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide ${
                            darkMode ? 'text-brass' : 'text-gold'
                          }`}
                        >
                          <Sparkles size={11} />
                          Featured
                        </span>
                      )}
                      {p.categories.map((c) => (
                        <span
                          key={c}
                          className={`px-2 py-0.5 rounded border text-[10px] font-medium ${
                            darkMode ? 'border-hairline-dark text-cream-soft' : 'border-hairline text-ink-soft'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3
                    className={`font-serif text-xl font-medium mb-2 leading-snug ${
                      darkMode ? 'text-cream' : 'text-ink'
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-5 ${
                      darkMode ? 'text-cream-soft' : 'text-ink-soft'
                    }`}
                  >
                    {p.tagline}
                  </p>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.slice(0, 6).map((s) => (
                      <span
                        key={s}
                        className={`px-2 py-1 rounded text-[11px] font-mono border ${
                          darkMode
                            ? 'border-hairline-dark text-cream-soft'
                            : 'border-hairline text-ink-soft'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div
                    className={`flex items-center justify-between gap-3 flex-wrap pt-5 border-t ${
                      darkMode ? 'border-hairline-dark' : 'border-hairline'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                          darkMode ? 'text-cream-soft hover:text-cream' : 'text-ink-soft hover:text-ink'
                        }`}
                      >
                        <Github size={15} />
                        Code
                      </a>
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                            darkMode ? 'text-brass hover:text-brass/80' : 'text-gold hover:text-gold/80'
                          }`}
                        >
                          <ExternalLink size={15} />
                          Live demo
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => setExpanded(isOpen ? null : p.id)}
                      className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md border transition-colors ${
                        darkMode
                          ? 'border-hairline-dark text-cream-soft hover:bg-white/5'
                          : 'border-hairline text-ink-soft hover:bg-paper-soft'
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
                    className={`px-6 sm:px-7 pb-7 pt-2 border-t animate-fade-in ${
                      darkMode ? 'border-hairline-dark' : 'border-hairline'
                    }`}
                  >
                    {p.id === 'rag-qa' && (
                      <div
                        className={`mt-5 mb-2 rounded-lg border p-4 sm:p-6 ${
                          darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
                        }`}
                      >
                        <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>
                          Architecture diagram
                        </p>
                        <RAGDiagram darkMode={darkMode} />
                      </div>
                    )}
                    {p.images && p.images.length > 0 && (
                      <ProjectGallery images={p.images} darkMode={darkMode} />
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
        <div className="mt-12">
          <a
            href="https://github.com/nagarjungowdakn13?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md border text-sm font-medium transition-colors duration-200 ${
              darkMode
                ? 'border-hairline-dark text-cream-soft hover:text-cream hover:bg-white/5'
                : 'border-hairline text-ink-soft hover:text-ink hover:bg-paper-soft'
            }`}
          >
            <Github size={16} />
            See all repositories on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectPreview({ project, darkMode }: { project: Project; darkMode: boolean }) {
  const Icon = project.icon;

  if (project.image) {
    return (
      <div
        className={`relative h-40 overflow-hidden border-b ${
          darkMode ? 'border-hairline-dark' : 'border-hairline'
        }`}
      >
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className={`w-full h-full object-cover ${darkMode ? '' : 'grayscale-[10%]'}`}
        />
        <div
          className={`absolute inset-0 ${
            darkMode
              ? 'bg-gradient-to-t from-charcoal/60 via-transparent to-transparent'
              : 'bg-gradient-to-t from-ink/10 via-transparent to-transparent'
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative h-40 flex flex-col items-center justify-center gap-2.5 border-b ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      }`}
    >
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center border ${
          darkMode ? 'border-hairline-dark text-brass' : 'border-hairline text-gold'
        }`}
      >
        <Icon size={20} />
      </div>
      <div
        className={`font-mono text-[10px] tracking-widest uppercase ${
          darkMode ? 'text-cream-soft' : 'text-ink-soft'
        }`}
      >
        {project.categories.join(' · ')}
      </div>
    </div>
  );
}

function ProjectGallery({
  images,
  darkMode,
}: {
  images: { src: string; caption: string }[];
  darkMode: boolean;
}) {
  return (
    <div
      className={`mt-5 mb-2 rounded-lg border p-4 sm:p-6 ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      }`}
    >
      <p className={`kicker mb-4 ${darkMode ? 'text-brass' : 'text-gold'}`}>Screenshots</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <figure
            key={img.src}
            className={`rounded-md overflow-hidden border ${
              darkMode ? 'border-hairline-dark bg-charcoal' : 'border-hairline bg-paper'
            }`}
          >
            <a href={img.src} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
            </a>
            <figcaption
              className={`px-3 py-2 text-[12px] leading-snug ${
                darkMode ? 'text-cream-soft' : 'text-ink-soft'
              }`}
            >
              {img.caption}
            </figcaption>
          </figure>
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
      <p className={`kicker mb-2 ${darkMode ? 'text-brass' : 'text-gold'}`}>{label}</p>
      {body.length === 1 ? (
        <p
          className={`text-sm leading-relaxed ${mono ? 'font-mono text-[12.5px]' : ''} ${
            darkMode ? 'text-cream-soft' : 'text-ink-soft'
          }`}
        >
          {body[0]}
        </p>
      ) : (
        <ul
          className={`space-y-1.5 text-sm leading-relaxed ${mono ? 'font-mono text-[12.5px]' : ''} ${
            darkMode ? 'text-cream-soft' : 'text-ink-soft'
          }`}
        >
          {body.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className={darkMode ? 'text-brass' : 'text-gold'}>{mono ? '›' : '•'}</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
