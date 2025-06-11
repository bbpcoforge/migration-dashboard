import React, { useEffect, useState } from 'react';
import { SiSitecore } from 'react-icons/si';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header: React.FC = () => {
  const [dark, setDark] = useState(false);

  // Sync dark mode with system and localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else if (saved === 'light') {
      setDark(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <header
      className="w-full sticky top-0 z-50 b backdrop-blur-md bg-[rgba(60,16,16,0.85)] dark:bg-[rgba(30,8,8,0.85)] border-b border-[rgba(255,255,255,0.08)] shadow-lg transition-colors duration-300"
      style={{
        fontFamily: "'Segoe UI', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        fontSize: '2.15rem',
        letterSpacing: '0.01em',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 min-h-[80px]">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-white/10 hadow-md" style={{padding: '1rem', marginTop: '0.5rem'}}>
            <SiSitecore className="w-10 h-10 text-[var(--color-card)]" />
          </span>
          <span className="text-3xl font-extrabold tracking-tight mx-24 text-[var(--color-card)] drop-shadow-sm">Migration Dashboard</span>
        </div>
        
        {/* Right: Dark mode toggle */}
        <button
          aria-label="Toggle dark mode"
          onClick={() => setDark((d) => !d)}
          className="ml-3 p-3 rounded-full border border-[var(--color-primary)] bg-[var(--color-card)] shadow flex items-center justify-center gap-2 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          style={{
            color: 'var(--color-primary)',
            fontFamily: "'Segoe UI', 'Inter', sans-serif",
            fontSize: '2rem',
            marginRight: '1rem',
          }}
        >
          {dark ? (
            <>
              <FiSun className="w-3 h-3 text-[var(--color-accent)]" style={{marginRight: 0}} />
              <span className="hidden sm:inline font-semibold text-[var(--color-accent)]">Light</span>
            </>
          ) : (
            <>
              <FiMoon className="w-3 h-3 text-[var(--color-secondary)]" style={{marginRight: 0}} />
              <span className="hidden sm:inline font-semibold text-[var(--color-secondary)]">Dark</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
