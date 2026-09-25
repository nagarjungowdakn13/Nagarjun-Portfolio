import { ArrowUpRight } from 'lucide-react';
import { PUBLICATIONS, type Publication, type PublicationStatus } from '../data/publications';

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Papers published, accepted, and under review. Click a card to read the paper.
          </p>
        </div>

        {/* Grid — 4 per row on desktop, wraps cleanly at every breakpoint */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {sorted.map((pub, idx) => (
            <PublicationCard key={pub.title} pub={pub} index={idx + 1} darkMode={darkMode} />
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

function PublicationCard({
  pub,
  index,
  darkMode,
}: {
  pub: Publication;
  index: number;
  darkMode: boolean;
}) {
  const isLink = Boolean(pub.url);
  const Tag = isLink ? 'a' : 'div';

  return (
    <Tag
      {...(isLink ? { href: pub.url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group flex flex-col h-full p-5 rounded-lg border transition-all duration-300 ${
        isLink ? 'hover:-translate-y-1 cursor-pointer' : ''
      } ${
        darkMode
          ? `bg-charcoal border-hairline-dark ${
              isLink ? 'hover:border-brass/40 shadow-card-dark hover:shadow-card-dark-hover' : ''
            }`
          : `bg-paper border-hairline ${
              isLink ? 'hover:border-gold/40 shadow-card hover:shadow-card-hover' : ''
            }`
      }`}
    >
      {/* Top row: index + external-link affordance */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span
          className={`font-mono text-xs tabular-nums ${
            darkMode ? 'text-cream-soft/50' : 'text-ink-soft/50'
          }`}
        >
          {String(index).padStart(2, '0')}
        </span>
        {isLink && (
          <ArrowUpRight
            size={15}
            className={`flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
              darkMode ? 'text-brass' : 'text-gold'
            }`}
          />
        )}
      </div>

      <span className={`kicker mb-2 ${statusStyle(pub.status, darkMode)}`}>{pub.status}</span>

      <h3
        className={`font-serif text-[15px] font-medium leading-snug mb-2 transition-colors duration-200 ${
          darkMode
            ? `text-cream ${isLink ? 'group-hover:text-brass' : ''}`
            : `text-ink ${isLink ? 'group-hover:text-gold' : ''}`
        }`}
      >
        {pub.title}
      </h3>

      <p className={`text-xs leading-relaxed ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
        {pub.authors}
      </p>

      {pub.summary && (
        <p className={`text-xs leading-relaxed mt-2.5 ${darkMode ? 'text-cream-soft' : 'text-ink-soft'}`}>
          {pub.summary}
        </p>
      )}

      {/* Footer pinned to bottom so cards in the same row line up */}
      <div className="mt-auto pt-4">
        {(pub.venue || pub.year) && (
          <p className={`text-[11px] leading-snug ${darkMode ? 'text-cream-soft/70' : 'text-ink-soft/70'}`}>
            {[pub.venue, pub.year].filter(Boolean).join(' · ')}
          </p>
        )}
        {!isLink && (
          <p className={`text-[11px] italic mt-1 ${darkMode ? 'text-cream-soft/60' : 'text-ink-soft/60'}`}>
            Link coming soon
          </p>
        )}
      </div>
    </Tag>
  );
}
