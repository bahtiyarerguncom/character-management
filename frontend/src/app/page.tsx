'use client';

import { FilterBar } from '@/components/filter-bar';
import { CharacterList } from '@/components/character-list';

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Character Management</h1>
      <div className="mb-8">
        <FilterBar />
      </div>
      <CharacterList />
    </main>
  );
}
