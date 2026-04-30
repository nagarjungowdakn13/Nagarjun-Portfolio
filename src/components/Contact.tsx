import { Code2, Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactProps {
  darkMode: boolean;
}

const SOCIAL = {
  github: 'https://github.com/nagarjungowdakn13',
  linkedin: 'https://www.linkedin.com/in/nagarjun-gowda-k-n-743830397/',
  leetcode: 'https://leetcode.com/u/nagarjunkn/',
  email: 'nagarjungowdakn2005@gmail.com',
  phone: '+919448142679',
  phoneDisplay: '+91 94481 42679',
  location: 'Bengaluru, Karnataka, India',
};

export default function Contact({ darkMode }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const subject = `Portfolio contact from ${formData.name}`;
    const body = `Hi Nagarjun,\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`;
    const mailtoUrl = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 400);
  };

  return (
    <section
      id="contact"
      className={`py-24 ${
        darkMode ? 'bg-gradient-to-b from-slate-950 to-slate-900' : 'bg-gradient-to-b from-slate-50 to-white'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className={`text-sm font-mono uppercase tracking-widest mb-3 ${
              darkMode ? 'text-purple-400' : 'text-orange-500'
            }`}
          >
            // contact
          </p>
          <h2
            className={`text-4xl sm:text-5xl font-semibold tracking-tight mb-4 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Let's build something
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            I'm currently <span className={`font-medium ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>open to internships and full-time SWE / ML roles</span>.
            Best way to reach me is email — I usually reply within a day.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-5">
              <ContactRow
                darkMode={darkMode}
                icon={Mail}
                label="Email"
                value={SOCIAL.email}
                href={`mailto:${SOCIAL.email}`}
              />
              <ContactRow
                darkMode={darkMode}
                icon={Phone}
                label="Phone"
                value={SOCIAL.phoneDisplay}
                href={`tel:${SOCIAL.phone}`}
              />
              <ContactRow
                darkMode={darkMode}
                icon={MapPin}
                label="Location"
                value={SOCIAL.location}
              />
            </div>

            <div className="pt-4">
              <p
                className={`text-xs font-mono uppercase tracking-widest mb-3 ${
                  darkMode ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                // elsewhere
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Github size={20} />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={SOCIAL.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className={`p-3 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Code2 size={20} />
                </a>
              </div>
            </div>

            <div
              className={`rounded-2xl p-5 border ${
                darkMode
                  ? 'bg-emerald-500/5 border-emerald-400/20'
                  : 'bg-emerald-50 border-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <p
                  className={`text-sm font-semibold ${
                    darkMode ? 'text-emerald-300' : 'text-emerald-700'
                  }`}
                >
                  Open to opportunities
                </p>
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  darkMode ? 'text-emerald-200/80' : 'text-emerald-800/80'
                }`}
              >
                Looking for SWE / ML / Backend roles where I can build real systems and learn from senior engineers.
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-3 rounded-2xl p-7 sm:p-9 border ${
              darkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-lg'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  darkMode={darkMode}
                  label="Name"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                />
                <Field
                  darkMode={darkMode}
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-xs font-mono uppercase tracking-widest mb-2 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="What are you working on, and how can I help?"
                  className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:ring-2 focus:outline-none resize-none ${
                    darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-purple-500/40 focus:border-purple-400/40'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-orange-500/30 focus:border-orange-400'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-base text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500'
                    : 'bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
                }`}
              >
                <Send size={18} />
                {status === 'sending'
                  ? 'Opening your mail app...'
                  : status === 'success'
                  ? 'Mail app opened — hit send there'
                  : status === 'error'
                  ? 'Failed — email me directly'
                  : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  darkMode,
  icon: Icon,
  label,
  value,
  href,
}: {
  darkMode: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
          darkMode ? 'bg-purple-500/15 text-purple-300' : 'bg-orange-50 text-orange-500'
        }`}
      >
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p
          className={`text-[11px] font-mono uppercase tracking-widest mb-0.5 ${
            darkMode ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {label}
        </p>
        <p className={`text-sm font-medium truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center gap-4 p-3 -mx-3 rounded-xl transition-colors ${
          darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50'
        }`}
      >
        {content}
      </a>
    );
  }
  return <div className="flex items-center gap-4 p-3 -mx-3">{content}</div>;
}

function Field({
  darkMode,
  label,
  ...props
}: {
  darkMode: boolean;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className={`block text-xs font-mono uppercase tracking-widest mb-2 ${
          darkMode ? 'text-slate-400' : 'text-slate-500'
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        required
        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 focus:ring-2 focus:outline-none ${
          darkMode
            ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:ring-purple-500/40 focus:border-purple-400/40'
            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-orange-500/30 focus:border-orange-400'
        }`}
      />
    </div>
  );
}
