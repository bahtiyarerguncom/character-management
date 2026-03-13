'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  // ilk yüklemede: localStorage varsa onu kullan, yoksa OS tercihine bak
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative h-9 w-16 shrink-0 overflow-hidden rounded-full bg-gray-200 transition-colors duration-300 dark:bg-slate-700"
      aria-label="Toggle dark mode"
    >
      <span
        className={`absolute top-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 dark:bg-slate-800 ${
          dark ? 'left-8' : 'left-1'
        }`}
      >
        {/* Sun */}
        <svg
          className={`absolute h-4 w-4 text-amber-500 transition-all duration-300 ${
            dark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        {/* Moon */}
        <svg
          className={`absolute h-4 w-4 text-blue-300 transition-all duration-300 ${
            dark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
