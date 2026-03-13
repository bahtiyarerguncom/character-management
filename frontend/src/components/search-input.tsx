'use client';

import { useEffect, useState } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  // local state ile debounce: kullanıcı yazarken anında input güncellenir
  // ama parent'a (ve dolayısıyla API'ye) 300ms sonra yansır
  const [local, setLocal] = useState(value);

  // dışarıdan value değişirse (örn. "Clear Filters") local'i senkronla
  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (local !== value) {
        onChange(local);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [local, value, onChange]);

  return (
    <input
      type="text"
      placeholder="Search by name or description..."
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-base sm:text-sm text-gray-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
    />
  );
}
