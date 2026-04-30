import { Brain, Code2, GraduationCap, MapPin, ServerCog, ShieldCheck } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: 'Applied AI / ML',
    body: 'RAG pipelines, LLM evaluation, embeddings, and grounding strategies. I treat ML systems as engineering problems — pipelines, eval harnesses, observability — not just notebooks.',
  },
  {
    icon: ServerCog,
    title: 'Backend & Systems',
    body: 'FastAPI / Flask services, REST APIs, async workers, vector stores, Docker deployments. I care about clean boundaries, idempotent jobs, and getting failure modes right.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Anomaly Detection',
    body: 'Real-time network monitoring, sensitive-data classification, and ML-based anomaly detection (Isolation Forest, autoencoders). Building tools that ship signal, not noise.',
  },
];

export default function About({ darkMode }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-24 ${darkMode ? 'bg-slate-950' : 'bg-white'} transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <p
            className={`text-sm font-mono uppercase tracking-widest mb-3 ${
              darkMode ? 'text-purple-400' : 'text-orange-500'
            }`}
          >
            // about
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Engineering, not just shipping features.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo + meta */}
          <div className="lg:col-span-2">
            <div className="relative w-72 h-72 mx-auto group">
              <div
                className={`absolute -inset-3 rounded-3xl blur-2xl opacity-50 ${
                  darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-orange-300 to-rose-300'
                }`}
              />
              <img
                src="/Nagarjun Photo.jpg"
                alt="Nagarjun Gowda K N"
                loading="lazy"
                className={`relative z-10 w-full h-full object-cover rounded-3xl border-2 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02] ${
                  darkMode ? 'border-white/20' : 'border-white/80'
                }`}
              />
            </div>

            <div className="mt-8 space-y-3 max-w-xs mx-auto">
              {[
                { icon: MapPin, label: 'Bengaluru, Karnataka, India' },
                { icon: GraduationCap, label: 'B.E. Computer Science Engineering' },
                { icon: Code2, label: 'Python • Java • TypeScript • SQL' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 text-sm ${
                    darkMode ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  <Icon size={16} className={darkMode ? 'text-purple-400' : 'text-orange-500'} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Story + focus */}
          <div className="lg:col-span-3 space-y-8">
            <div
              className={`text-lg leading-relaxed space-y-5 ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <p>
                I'm a Computer Science engineer who got into building things the hard way — by debugging
                production-shaped problems on side projects long before anyone asked me to. I started with
                automation scripts, drifted into ML when I realized real systems live or die by their data
                pipeline, and now spend most of my time at the intersection of <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>AI, backend, and security</span>.
              </p>
              <p>
                The problems I gravitate toward have a common shape: <span className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>messy real-world data, an
                ambiguous decision boundary, and a feedback loop that has to run reliably</span>. Whether
                that's grounding an LLM against a private corpus, scoring transactions for fraud, or flagging
                anomalous packets in a live network — the engineering challenge is the same: make the system
                reproducible, evaluable, and honest about what it doesn't know.
              </p>
              <p>
                I care about code quality the way I care about kitchen hygiene — quietly, constantly, and
                because everything downstream depends on it. I'd rather ship a smaller system that I understand
                end-to-end than a large one that nobody can debug at 2 a.m.
              </p>
            </div>

            {/* Focus areas */}
            <div className="grid sm:grid-cols-3 gap-4 pt-2">
              {FOCUS_AREAS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 hover:bg-white/[0.07]'
                      : 'bg-white border-slate-200 hover:shadow-lg'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                      darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-orange-50 text-orange-500'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className={`font-semibold mb-1.5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
