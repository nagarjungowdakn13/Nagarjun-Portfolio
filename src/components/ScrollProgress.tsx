import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  darkMode: boolean;
}

export default function ScrollProgress({ darkMode }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (scrolled / max) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 pointer-events-none"
      aria-hidden="true"
    >
      <div
        className={`h-full transition-[width] duration-100 ease-out ${
          darkMode
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500'
            : 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
