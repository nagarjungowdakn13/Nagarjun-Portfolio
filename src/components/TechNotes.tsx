import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronUp,
  ServerCog,
  ShieldCheck,
} from 'lucide-react';

interface TechNotesProps {
  darkMode: boolean;
}

interface Note {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag: string;
  title: string;
  readTime: string;
  summary: string;
  takeaways: string[];
  body: (darkMode: boolean) => React.ReactNode;
}

const NOTES: Note[] = [
  {
    id: 'rag-hallucination',
    icon: Brain,
    tag: 'AI / RAG',
    title: 'Why most "RAG demos" hallucinate in production',
    readTime: '6 min read',
    summary:
      'A retrieval pipeline isn\'t complete just because top-k vector search returns something. The interesting part is what happens when nothing relevant matches — and most demos quietly fail this case.',
    takeaways: [
      'Embed quality matters more than chunk size, but chunk size dominates if you ignore overlap',
      'Always have an "I don\'t know" path — silence beats confident hallucination',
      'Ship answer + sources + confidence, not just answer',
    ],
    body: (darkMode) => (
      <PostBody darkMode={darkMode}>
        <H>The deceptive demo</H>
        <P>
          Every RAG demo looks the same on day one. You feed it twelve documents, ask a question that
          obviously matches one of them, and the LLM cheerfully produces a perfect answer. Ship it.
        </P>
        <P>
          Then you point it at a real corpus, ask something that is <em>not</em> in the corpus, and the
          model still cheerfully produces a perfect-looking answer. Just an entirely fabricated one. The
          retrieval step happily returned the most similar chunks — even though "most similar" was
          cosine similarity 0.21, which is barely better than noise — and the LLM did its job: write
          confident text grounded in the context you gave it. The bug isn't in the LLM. The bug is in
          how the pipeline handled the case where there was no real answer.
        </P>

        <H>What's actually happening</H>
        <P>
          The default RAG flow has no concept of "low confidence." It blindly takes the top-k chunks
          and shoves them into the prompt. If those chunks are irrelevant, the model still tries to
          synthesize an answer from them — and that's exactly when hallucinations get worst, because
          the model has no way to say "I shouldn't be answering this."
        </P>

        <H>The four things to actually fix</H>
        <List>
          <li>
            <B>Score-gate retrieval.</B> Don't pass top-k unconditionally — pass top-k <em>that exceed
            a similarity threshold</em>. Below threshold, return "I don't know."
          </li>
          <li>
            <B>Tune chunk size with overlap.</B> Too small and you lose context boundaries; too large
            and the embedding signal dilutes. Around 300–500 tokens with 10–20% overlap is a reasonable
            starting point — but always benchmark on your own retrieval set.
          </li>
          <li>
            <B>Return sources, always.</B> The response shape should be{' '}
            <code className="font-mono text-[12px]">{'{ answer, sources[], confidence }'}</code>. Sources
            make answers verifiable; confidence makes them honest.
          </li>
          <li>
            <B>Eval the "no answer" case.</B> Half your test questions should have <em>no good answer
            in the corpus</em>. If your system answers them anyway, it's still hallucinating — you just
            haven't measured it yet.
          </li>
        </List>

        <H>The "I don't know" pattern</H>
        <Code>
{`# Pseudocode — the gate that most RAG pipelines skip
SIM_THRESHOLD = 0.45  # tune per corpus

def answer(query: str) -> Response:
    q_emb = embed(query)
    hits = faiss_index.search(q_emb, k=5)

    grounded = [h for h in hits if h.score >= SIM_THRESHOLD]
    if not grounded:
        return Response(
            answer="I don't have enough information to answer that.",
            sources=[],
            confidence=0.0,
        )

    context = assemble_context(grounded)
    answer = llm.complete(prompt(query, context))
    return Response(
        answer=answer,
        sources=[h.doc_id for h in grounded],
        confidence=min(h.score for h in grounded),
    )`}
        </Code>

        <P>
          That ten-line gate is the difference between "neat demo" and "system you'd let touch real
          users." It's a small change. But it changes what your system is willing to be wrong about —
          which is the whole point.
        </P>
      </PostBody>
    ),
  },
  {
    id: 'automation-monday',
    icon: ServerCog,
    tag: 'Automation',
    title: 'Designing automation systems that survive Monday morning',
    readTime: '5 min read',
    summary:
      'Most desktop or workflow automation breaks the first time something is mid-state. The fix isn\'t more retries — it\'s designing for resumability from the start.',
    takeaways: [
      'Tasks as declarative JSON beat imperative scripts every time',
      'Audit logs aren\'t a nice-to-have — they\'re your debugger in production',
      'Idempotency before retry: if a step can run twice safely, retries are free',
    ],
    body: (darkMode) => (
      <PostBody darkMode={darkMode}>
        <H>The crash that taught me this</H>
        <P>
          The first version of my Windows automation framework was a Python script. It worked great
          until the first time something timed out halfway through a multi-step workflow — and
          suddenly I had a half-clicked dialog box, a half-typed form, and no way to figure out which
          step had actually run. I rewrote it. Twice.
        </P>
        <P>
          The lesson wasn't "add retries." The lesson was: <B>retries don't fix systems that don't know
          their own state</B>. If you can't tell whether step 4 ran, retrying step 4 isn't safer —
          it's just non-determinism with extra confidence.
        </P>

        <H>Idempotency before retry</H>
        <P>
          Every step in a workflow should be safe to run twice. That means each step records a
          checkpoint <em>before and after</em> it executes. If the worker crashes between, the next
          run knows exactly where to pick up — and steps that already completed are skipped.
        </P>
        <Code>
{`# Each task step writes a checkpoint
def run_step(task_id: str, step_idx: int, action):
    if checkpoint.exists(task_id, step_idx, status="done"):
        return  # already ran successfully — skip

    checkpoint.write(task_id, step_idx, status="started")
    try:
        result = action()
        checkpoint.write(task_id, step_idx, status="done", result=result)
    except Exception as e:
        checkpoint.write(task_id, step_idx, status="failed", error=str(e))
        raise`}
        </Code>

        <H>Audit logs are your debugger</H>
        <P>
          You can't attach a debugger to a workflow that ran at 3 a.m. on someone else's machine. The
          audit log <em>is</em> the debugger. Every state transition, every input, every output —
          logged with a timestamp and a task ID. If something went wrong, the log tells you exactly
          which step, with what input, in what order. No guessing.
        </P>

        <H>Declarative beats imperative</H>
        <P>
          Workflows defined in code are convenient until you need to change one. Workflows defined as
          declarative JSON are version-controllable, diff-able, and auditable. The runtime stays
          dumb; the data is smart.
        </P>
        <Code>
{`{
  "task_id": "month-end-report-2026-04",
  "steps": [
    { "type": "open_app",   "args": { "app": "excel" } },
    { "type": "load_file",  "args": { "path": "./data/q4.xlsx" } },
    { "type": "run_macro",  "args": { "name": "GenerateReport" } },
    { "type": "save_as",    "args": { "path": "./out/report.pdf" } }
  ]
}`}
        </Code>

        <P>
          Now adding a step is a one-line config edit, not a rebuild. And the system doesn't care
          whether the workflow was hand-written or generated — both look identical to the runtime.
        </P>
      </PostBody>
    ),
  },
  {
    id: 'drift-killer',
    icon: ShieldCheck,
    tag: 'ML / Security',
    title: 'Drift is the silent killer of anomaly-detection models',
    readTime: '7 min read',
    summary:
      'Your Isolation Forest looks great on Friday and produces garbage on Monday because traffic shifted. Drift tracking isn\'t optional — it\'s the difference between a model and a system.',
    takeaways: [
      'Track input distributions, not just predictions',
      'Use rates and ratios as features — raw counts drift constantly',
      'A drift dashboard tells you when to retrain *before* the noise floor moves',
    ],
    body: (darkMode) => (
      <PostBody darkMode={darkMode}>
        <H>How drift presents</H>
        <P>
          The model still loads. The pipeline still runs. The dashboard still has green lights. But
          your false-positive rate has tripled in the last 48 hours, your analysts are ignoring
          alerts, and nobody noticed because the model itself never failed — the <em>world it was
          trained on</em> failed. That's drift.
        </P>
        <P>
          Anomaly detection is especially vulnerable to this because there's no labeled ground truth
          to validate against. The model says "this is anomalous." Is it? You don't know. By the time
          you do, the noise floor has moved and you've been chasing ghosts for a week.
        </P>

        <H>Features that survive shift</H>
        <P>
          The single biggest mistake I made early on: training on raw counts. Packets per minute,
          bytes transferred, login attempts. These drift constantly — traffic doubles when a new
          service launches, halves on weekends, spikes during incidents. The model learns the
          baseline and breaks the moment the baseline moves.
        </P>
        <P>
          The fix is to feed the model <B>rates and ratios</B>, not absolutes. Bytes-per-flow.
          Failed-login rate per user. Anomaly-class proportion vs. total. These quantities are
          dimensionally robust to scaling — if traffic doubles uniformly, the ratios don't move.
          That's exactly what you want.
        </P>

        <H>Building a drift dashboard</H>
        <P>
          The drift signal isn't in your predictions — it's in the <em>distribution of your inputs</em>.
          For each feature, compute its distribution today and compare it to the distribution at
          training time. A simple Kolmogorov-Smirnov test gives you a single number per feature per
          window. Plot it. When it crosses a threshold, the model is operating off-distribution and
          you should retrain.
        </P>
        <Code>
{`from scipy.stats import ks_2samp

def feature_drift(reference: np.ndarray, current: np.ndarray) -> dict:
    """Returns KS statistic + p-value per feature."""
    return {
        i: ks_2samp(reference[:, i], current[:, i])
        for i in range(reference.shape[1])
    }

# In the dashboard, plot ks_stat over time per feature.
# Alert when any feature's stat exceeds 0.15 for 3 consecutive windows.`}
        </Code>

        <H>The bigger lesson</H>
        <P>
          A model is a snapshot. A system is a model + the feedback loop that tells you when the
          snapshot is stale. The drift dashboard is the feedback loop. Without it, you don't have a
          system — you have a deployed liability.
        </P>
      </PostBody>
    ),
  },
];

export default function TechNotes({ darkMode }: TechNotesProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section
      id="notes"
      className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className={`text-sm font-mono uppercase tracking-widest mb-3 ${
              darkMode ? 'text-purple-400' : 'text-orange-500'
            }`}
          >
            // tech notes
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Things I've learned the hard way
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Long-form notes on RAG, automation design, and ML in production — the stuff you only
            learn by shipping it and debugging it on a Sunday night.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {NOTES.map(({ id, icon: Icon, tag, title, readTime, summary, takeaways, body }) => {
            const isOpen = open === id;
            return (
              <article
                key={id}
                className={`rounded-2xl border transition-all duration-300 ${
                  darkMode
                    ? 'bg-white/[0.03] border-white/10 hover:border-white/20'
                    : 'bg-white border-slate-200 hover:shadow-lg'
                } ${isOpen ? 'md:col-span-3' : 'hover:-translate-y-1'}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[11px] font-mono ${
                        darkMode ? 'bg-purple-500/10 text-purple-300' : 'bg-orange-50 text-orange-700'
                      }`}
                    >
                      <Icon size={12} />
                      {tag}
                    </div>
                    <span className={`text-[11px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {readTime}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-3 leading-snug ${
                      darkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      darkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {summary}
                  </p>

                  {!isOpen && (
                    <div className={`pt-4 border-t mb-4 ${darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                      <p
                        className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${
                          darkMode ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      >
                        // takeaways
                      </p>
                      <ul className={`space-y-1.5 text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {takeaways.map((t, i) => (
                          <li key={i} className="flex gap-2">
                            <span className={darkMode ? 'text-purple-400' : 'text-orange-500'}>›</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border transition-all ${
                      darkMode
                        ? 'border-white/10 text-slate-300 hover:bg-white/5'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? 'Close' : 'Read full post'}
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>

                {isOpen && (
                  <div
                    className={`px-6 pb-8 pt-2 border-t animate-fade-in ${
                      darkMode ? 'border-white/10' : 'border-slate-200'
                    }`}
                  >
                    {body(darkMode)}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div
          className={`mt-12 text-center text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}
        >
          <BookOpen size={14} className="inline mr-2" />
          More posts as I ship more systems. The code is always the canonical source.
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline post primitives
// ─────────────────────────────────────────────────────────────────────────────

function PostBody({ children, darkMode }: { children: React.ReactNode; darkMode: boolean }) {
  return (
    <div
      className={`mt-6 max-w-3xl mx-auto space-y-5 text-[15px] leading-relaxed ${
        darkMode ? 'text-slate-300' : 'text-slate-700'
      }`}
    >
      {children}
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-lg font-semibold pt-2 text-current">
      {children}
    </h4>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold">{children}</strong>;
}

function List({ children }: { children: React.ReactNode }) {
  return <ul className="space-y-2 list-disc pl-5">{children}</ul>;
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="font-mono text-[12.5px] leading-relaxed bg-slate-900/80 text-slate-100 rounded-xl p-4 overflow-x-auto border border-white/10">
      <code>{children}</code>
    </pre>
  );
}
