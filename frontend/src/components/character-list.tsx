'use client';

import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GetCharactersDocument } from '@/gql/graphql';
import { useCharacterFilters } from '@/hooks/use-character-filters';
import { CharacterCard } from './character-card';

// filter objesi queryKey'e dahil — filtre değişince otomatik refetch yapılıyor
function useCharacters(filter: Record<string, string> | undefined) {
  return useQuery({
    queryKey: ['characters', filter],
    queryFn: () => graphqlClient.request(GetCharactersDocument, { filter }),
  });
}

function CharacterListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          <div className="h-48 bg-gray-200 dark:bg-slate-700" />
          <div className="p-4 space-y-3">
            <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function CharacterList() {
  const { status, gender, search } = useCharacterFilters();

  // sadece dolu olan filtreleri gönder, boş obje yerine undefined ver
  // ki backend gereksiz WHERE clause oluşturmasın
  const filter = {
    ...(status && { status }),
    ...(gender && { gender }),
    ...(search && { search }),
  };

  const { data, isLoading, error } = useCharacters(
    Object.keys(filter).length > 0 ? filter : undefined,
  );

  if (isLoading) {
    return <CharacterListSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/30 dark:bg-red-500/10">
        <p className="text-red-600 dark:text-red-400">Failed to load characters. Please try again later.</p>
      </div>
    );
  }

  const characters = data?.characters ?? [];

  if (characters.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-slate-700 dark:bg-slate-800">
        <p className="text-gray-500 dark:text-gray-400">No characters found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}
