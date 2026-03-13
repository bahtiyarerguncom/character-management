'use client';

import { FilterBar } from '@/components/filter-bar';
import { CharacterList } from '@/components/character-list';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Character Management</h1>
        <ThemeToggle />
      </div>
      <div className="mb-8">
        <FilterBar />
      </div>
      <CharacterList />
    </main>
  );
}
