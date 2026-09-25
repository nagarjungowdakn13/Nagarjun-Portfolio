import { Atom, Brain, Code2, GraduationCap, MapPin, ServerCog, ShieldCheck } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: 'Applied AI / ML',
    body: 'RAG pipelines, LLM evaluation, embeddings, and grounding strategies. I treat ML systems as research problems as much as engineering ones — pipelines, eval harnesses, statistical validation, not just notebooks.',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Autonomous Defense',
    body: 'Real-time network monitoring, ML-based anomaly detection, and autonomous threat detection systems that fuse graph, temporal, and behavioral signals into explainable, policy-gated decisions.',
  },
  {
    icon: Atom,
    title: 'Post-Quantum Cryptography',
    body: 'Quantum risk assessment, cryptographic agility, and empirical benchmarking of PQC algorithms (ML-KEM, ML-DSA, SLH-DSA) against classical schemes — quantifying claims instead of assuming them.',
  },
  {
    icon: ServerCog,
    title: 'Backend & Systems',
    body: 'FastAPI / Flask services, REST APIs, async workers, vector stores, Docker deployments. I care about clean boundaries, idempotent jobs, and getting failure modes right.',
  },
];

export default function About({ darkMode }: AboutProps) {
  return (
    <section
      id="about"
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal border-hairline-dark' : 'bg-paper border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>About</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Engineering, not just shipping features.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo + meta */}
          <div className="lg:col-span-2">
            <div className="w-56 sm:w-64 mx-auto lg:mx-0">
              <div
                className={`aspect-[4/5] rounded-lg overflow-hidden border ${
                  darkMode ? 'border-hairline-dark bg-charcoal-soft' : 'border-hairline bg-paper-soft'
                }`}
              >
                <img
                  src="/Nagarjun Photo.jpg"
                  alt="Nagarjun Gowda K N"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[15%] origin-top"
                  style={{ objectPosition: '50% 0%', transform: 'scale(1.25)' }}
                />
              </div>
            </div>

            <div className="mt-8 space-y-3 max-w-xs mx-auto lg:mx-0">
              {[
                { icon: MapPin, label: 'Bengaluru, Karnataka, India' },
                { icon: GraduationCap, label: 'B.E. Computer Science Engineering' },
                { icon: GraduationCap, label: 'Applying — MS in Computer Science, Fall 2027' },
                { icon: Code2, label: 'Python • Java • TypeScript • SQL' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 text-sm ${
                    darkMode ? 'text-cream-soft' : 'text-ink-soft'
                  }`}
                >
                  <Icon size={15} className={darkMode ? 'text-brass' : 'text-gold'} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Story + focus */}
          <div className="lg:col-span-3 space-y-8">
            <div
              className={`text-[17px] leading-relaxed space-y-5 ${
                darkMode ? 'text-cream-soft' : 'text-ink-soft'
              }`}
            >
              <p>
                I'm a Computer Science engineer who got into building things the hard way — by debugging
                production-shaped problems on side projects long before anyone asked me to. I started with
                automation scripts, drifted into ML when I realized real systems live or die by their data
                pipeline, and now spend most of my time at the intersection of <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>AI, security, and applied
                cryptography</span>. I'm applying to MS in Computer Science programs to push that work further
                than a side project can take it.
              </p>
              <p>
                The problems I gravitate toward have a common shape: <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>messy real-world data, an
                ambiguous decision boundary, and a feedback loop that has to run reliably</span>. Whether
                that's grounding an LLM against a private corpus, scoring quantum risk across a cryptographic
                asset inventory, or fusing signals into an autonomous threat-response system — the challenge is
                the same: make the system reproducible, evaluable, and honest about what it doesn't know.
              </p>
              <p>
                What pulls me toward graduate study is wanting to go past shipping — to formalize the parts of
                these systems I've so far only approached empirically: validating model claims with proper
                statistical tests instead of eyeballed accuracy, building autonomous systems that can explain
                their own decisions, and treating evaluation itself as a first-class research problem rather
                than an afterthought.
              </p>
              <p>
                I care about code quality the way I care about kitchen hygiene — quietly, constantly, and
                because everything downstream depends on it. I'd rather build a smaller system that I understand
                end-to-end than a large one that nobody can debug at 2 a.m.
              </p>
            </div>

            {/* Focus areas */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {FOCUS_AREAS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className={`p-5 rounded-lg border transition-colors duration-200 ${
                    darkMode
                      ? 'border-hairline-dark hover:border-white/20'
                      : 'border-hairline hover:border-ink/20'
                  }`}
                >
                  <Icon size={18} className={`mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`} />
                  <h3 className={`font-semibold mb-1.5 text-sm ${darkMode ? 'text-cream' : 'text-ink'}`}>
                    {title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
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
