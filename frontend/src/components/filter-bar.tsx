'use client';

import { useState, useRef, useEffect } from 'react';
import { useCharacterFilters, Status, Gender } from '@/hooks/use-character-filters';
import { SearchInput } from './search-input';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: DropdownOption[];
  placeholder: string;
}

// headless UI veya radix kullanmak yerine basit bir dropdown yazdık
// — proje küçük olduğu için ekstra bağımlılık eklemek istemedik
function Dropdown({ value, onChange, options, placeholder }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // dışarı tıklayınca kapat
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div ref={ref} className="relative w-full sm:w-48">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:focus:border-blue-400 dark:focus:ring-blue-400"
      >
        <span className={value ? 'text-gray-700 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400'}>{selectedLabel}</span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-400 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-800">
          <ul className="py-1">
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 ${
                  !value ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {placeholder}
              </button>
            </li>
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 ${
                    value === option.value ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const statusOptions: DropdownOption[] = [
  { value: Status.ALIVE, label: 'Alive' },
  { value: Status.DEAD, label: 'Dead' },
  { value: Status.UNKNOWN, label: 'Unknown' },
];

const genderOptions: DropdownOption[] = [
  { value: Gender.MALE, label: 'Male' },
  { value: Gender.FEMALE, label: 'Female' },
  { value: Gender.UNKNOWN, label: 'Unknown' },
];

export function FilterBar() {
  const { status, setStatus, gender, setGender, search, setSearch, clearFilters } =
    useCharacterFilters();

  const hasFilters = status || gender || search;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Dropdown
        value={status}
        onChange={(v) => setStatus(v as Status | null)}
        options={statusOptions}
        placeholder="All Statuses"
      />

      <Dropdown
        value={gender}
        onChange={(v) => setGender(v as Gender | null)}
        options={genderOptions}
        placeholder="All Genders"
      />

      <div className="flex-1">
        <SearchInput value={search} onChange={setSearch} />
      </div>

      {hasFilters && (
        <button
          onClick={clearFilters}
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
