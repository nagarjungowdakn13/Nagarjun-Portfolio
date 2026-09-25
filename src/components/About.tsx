import { Atom, Brain, Code2, GraduationCap, MapPin, ServerCog, ShieldCheck } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
}

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: 'AI / ML Research',
    body: 'RAG pipelines, LLM evaluation, energy-aware inference, and multi-agent systems. I treat ML as a research problem as much as an engineering one — pipelines, eval harnesses, statistical validation, not just notebooks.',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity & Autonomous Defense',
    body: 'Real-time intrusion detection, autonomous threat response, and explainable fraud detection that has to survive contact with attackers actively trying to fool it.',
  },
  {
    icon: Atom,
    title: 'Quantum Computing & PQC',
    body: 'Quantum risk assessment, cryptographic agility, and empirical benchmarking of post-quantum algorithms (ML-KEM, ML-DSA, SLH-DSA) against classical schemes — quantifying claims instead of assuming them.',
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
            A researcher at the intersection of AI, cybersecurity, and quantum computing.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Photo + meta */}
          <div className="lg:col-span-2">
            <div className="group w-56 sm:w-64 mx-auto lg:mx-0">
              <div
                className={`aspect-[4/5] rounded-lg overflow-hidden border transition-all duration-300 ${
                  darkMode
                    ? 'border-hairline-dark bg-charcoal-soft shadow-card-dark group-hover:shadow-card-dark-hover group-hover:border-brass/40'
                    : 'border-hairline bg-paper-soft shadow-card group-hover:shadow-card-hover group-hover:border-gold/40'
                }`}
              >
                <img
                  src="/Nagarjun Photo.jpg"
                  alt="Nagarjun Gowda K N"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[15%] origin-top scale-125 transition-transform duration-500 group-hover:scale-[1.3]"
                  style={{ objectPosition: '50% 0%' }}
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
                I'm a Computer Science engineer and researcher who fell for this work the hard way — chasing a
                bug, a proof, or an experiment that wouldn't quite converge until far too late at night, and
                realizing I didn't want to stop. That pull now runs across three areas I'm genuinely passionate
                about — <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>AI/ML,
                cybersecurity, and quantum computing</span> — which I've turned into a growing body of
                published and under-review research, not just side projects.
              </p>
              <p>
                In <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>AI/ML</span>, I care
                about the gap between a demo and a system worth trusting: RAG pipelines that know when to say
                "I don't know," LLM evaluation harnesses that catch regressions before users do, energy-aware
                inference that doesn't trade accuracy for efficiency blindly, and multi-agent systems whose
                decisions are explainable rather than merely plausible.
              </p>
              <p>
                In <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>cybersecurity</span>,
                I'm drawn to the adversarial edge — real-time intrusion detection, autonomous threat response,
                and fraud detection that has to survive contact with attackers actively trying to fool it. Here,
                explainability isn't a nice-to-have: a fraud flag or an intrusion alert is worthless in a
                dispute or an audit if nobody can say why the model raised it.
              </p>
              <p>
                <span className={`font-medium ${darkMode ? 'text-cream' : 'text-ink'}`}>Quantum computing</span>{' '}
                is where I go looking for what's next — assessing how exposed today's cryptography is to
                tomorrow's quantum attacks and benchmarking post-quantum algorithms against classical ones,
                treating "quantum risk" as something to measure, not market. It's also the clearest reason I'm
                applying to graduate study: I want to go past what a side project can prove, with the same
                statistical rigor and honesty about limitations I'd want from any published result.
              </p>
            </div>

            {/* Focus areas */}
            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {FOCUS_AREAS.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className={`group p-5 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? 'border-hairline-dark hover:border-brass/40 shadow-card-dark hover:shadow-card-dark-hover'
                      : 'border-hairline hover:border-gold/40 shadow-card hover:shadow-card-hover'
                  }`}
                >
                  <Icon
                    size={18}
                    className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${
                      darkMode ? 'text-brass' : 'text-gold'
                    }`}
                  />
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
