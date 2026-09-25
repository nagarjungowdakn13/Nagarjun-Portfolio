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
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Contact</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Let's talk
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
            I'm currently <span className={`font-medium ${darkMode ? 'text-brass' : 'text-gold'}`}>applying to MS in Computer Science programs in the US</span>, focused on
            AI/ML and security research. Best way to reach me is email — I usually reply within a day.
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
              <p className={`kicker mb-3 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>Elsewhere</p>
              <div className="flex gap-2">
                <a
                  href={SOCIAL.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className={`p-2.5 rounded-md border transition-colors duration-200 ${
                    darkMode
                      ? 'border-hairline-dark text-cream-soft hover:text-cream hover:bg-white/5'
                      : 'border-hairline text-ink-soft hover:text-ink hover:bg-paper'
                  }`}
                >
                  <Github size={18} />
                </a>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`p-2.5 rounded-md border transition-colors duration-200 ${
                    darkMode
                      ? 'border-hairline-dark text-cream-soft hover:text-cream hover:bg-white/5'
                      : 'border-hairline text-ink-soft hover:text-ink hover:bg-paper'
                  }`}
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href={SOCIAL.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LeetCode"
                  className={`p-2.5 rounded-md border transition-colors duration-200 ${
                    darkMode
                      ? 'border-hairline-dark text-cream-soft hover:text-cream hover:bg-white/5'
                      : 'border-hairline text-ink-soft hover:text-ink hover:bg-paper'
                  }`}
                >
                  <Code2 size={18} />
                </a>
              </div>
            </div>

            <div
              className={`rounded-lg p-5 border ${
                darkMode ? 'border-hairline-dark' : 'border-hairline'
              }`}
            >
              <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-brass' : 'text-gold'}`}>
                Applying to MS programs — Fall 2027
              </p>
              <p className={`text-xs leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
                Happy to connect with faculty, labs, and admissions committees interested in AI/ML, security, or
                applied cryptography research.
              </p>
            </div>
          </div>

          {/* Form */}
          <div
            className={`lg:col-span-3 rounded-lg p-7 sm:p-9 border ${
              darkMode ? 'border-hairline-dark' : 'border-hairline bg-paper'
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
                  className={`block text-xs font-medium uppercase tracking-widest mb-2 ${
                    darkMode ? 'text-cream-soft' : 'text-ink-soft'
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
                  className={`w-full px-4 py-3 rounded-md border text-sm transition-colors duration-200 focus:ring-1 focus:outline-none resize-none ${
                    darkMode
                      ? 'bg-charcoal border-hairline-dark text-cream placeholder-cream-soft/60 focus:ring-brass focus:border-brass'
                      : 'bg-paper border-hairline text-ink placeholder-ink-soft/60 focus:ring-gold focus:border-gold'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                  darkMode
                    ? 'bg-brass text-charcoal hover:bg-brass/90'
                    : 'bg-gold text-paper hover:bg-gold/90'
                }`}
              >
                <Send size={16} />
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
        className={`w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0 border ${
          darkMode ? 'border-hairline-dark text-brass' : 'border-hairline text-gold'
        }`}
      >
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className={`text-[11px] uppercase tracking-widest mb-0.5 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
          {label}
        </p>
        <p className={`text-sm font-medium truncate ${darkMode ? 'text-cream' : 'text-ink'}`}>
          {value}
        </p>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`flex items-center gap-4 p-3 -mx-3 rounded-md transition-colors ${
          darkMode ? 'hover:bg-white/5' : 'hover:bg-paper'
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
        className={`block text-xs font-medium uppercase tracking-widest mb-2 ${
          darkMode ? 'text-cream-soft' : 'text-ink-soft'
        }`}
      >
        {label}
      </label>
      <input
        {...props}
        required
        className={`w-full px-4 py-3 rounded-md border text-sm transition-colors duration-200 focus:ring-1 focus:outline-none ${
          darkMode
            ? 'bg-charcoal border-hairline-dark text-cream placeholder-cream-soft/60 focus:ring-brass focus:border-brass'
            : 'bg-paper border-hairline text-ink placeholder-ink-soft/60 focus:ring-gold focus:border-gold'
        }`}
      />
    </div>
  );
}
