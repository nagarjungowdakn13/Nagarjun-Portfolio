import { ArrowUpRight } from 'lucide-react';
import { PUBLICATIONS, type PublicationStatus } from '../data/publications';

interface PublicationsProps {
  darkMode: boolean;
}

const STATUS_ORDER: PublicationStatus[] = ['Published', 'Accepted', 'Under Review', 'Submitted', 'Preprint'];

export default function Publications({ darkMode }: PublicationsProps) {
  if (PUBLICATIONS.length === 0) return null;

  const sorted = [...PUBLICATIONS].sort((a, b) => {
    const byYear = b.year.localeCompare(a.year);
    if (byYear !== 0) return byYear;
    return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
  });

  return (
    <section
      id="publications"
      className={`py-24 border-t ${
        darkMode ? 'bg-charcoal-soft border-hairline-dark' : 'bg-paper-soft border-hairline'
      } transition-colors duration-300`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <p className={`kicker mb-3 ${darkMode ? 'text-brass' : 'text-gold'}`}>Research</p>
          <h2
            className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight mb-4 ${
              darkMode ? 'text-cream' : 'text-ink'
            }`}
          >
            Publications
          </h2>
          <p className={`text-base leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
            Papers published, accepted, and under review. Click a title to read the paper.
          </p>
        </div>

        {/* List */}
        <div>
          {sorted.map((pub, idx) => (
            <PublicationRow key={pub.title} pub={pub} index={idx + 1} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </section>
  );
}

function statusStyle(status: PublicationStatus, darkMode: boolean) {
  if (status === 'Published' || status === 'Accepted') {
    return darkMode ? 'text-brass' : 'text-gold';
  }
  return darkMode ? 'text-cream-soft' : 'text-ink-soft';
}

function PublicationRow({
  pub,
  index,
  darkMode,
}: {
  pub: (typeof PUBLICATIONS)[number];
  index: number;
  darkMode: boolean;
}) {
  const TitleTag = pub.url ? 'a' : 'div';

  return (
    <div
      className={`flex gap-4 sm:gap-6 py-7 px-4 -mx-4 rounded-lg border-b last:border-b-0 transition-colors duration-200 ${
        darkMode ? 'border-hairline-dark hover:bg-white/[0.03]' : 'border-hairline hover:bg-paper'
      }`}
    >
      <span
        className={`hidden sm:block flex-shrink-0 w-7 pt-1 text-sm font-mono tabular-nums ${
          darkMode ? 'text-cream-soft/60' : 'text-ink-soft/60'
        }`}
      >
        {String(index).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2">
          <span className={`kicker ${statusStyle(pub.status, darkMode)}`}>{pub.status}</span>
          {(pub.venue || pub.year) && (
            <span className={`text-xs ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
              {[pub.venue, pub.year].filter(Boolean).join(' · ')}
            </span>
          )}
        </div>

        <TitleTag
          {...(pub.url ? { href: pub.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={`group inline-flex items-start gap-1.5 font-serif text-lg sm:text-xl font-medium leading-snug ${
            pub.url
              ? darkMode
                ? 'text-cream hover:text-brass transition-colors'
                : 'text-ink hover:text-gold transition-colors'
              : darkMode
              ? 'text-cream'
              : 'text-ink'
          }`}
        >
          <span className={pub.url ? 'underline decoration-transparent group-hover:decoration-current underline-offset-4' : ''}>
            {pub.title}
          </span>
          {pub.url && (
            <ArrowUpRight
              size={16}
              className="flex-shrink-0 mt-1.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          )}
        </TitleTag>

        <p className={`text-sm mt-1.5 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>{pub.authors}</p>

        {pub.summary && (
          <p className={`text-sm leading-relaxed mt-2.5 max-w-2xl ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
            {pub.summary}
          </p>
        )}

        {!pub.url && (
          <p className={`text-xs mt-2.5 italic ${darkMode ? 'text-cream-soft/70' : 'text-ink-soft/70'}`}>
            Link coming soon
          </p>
        )}
      </div>
    </div>
  );
}
