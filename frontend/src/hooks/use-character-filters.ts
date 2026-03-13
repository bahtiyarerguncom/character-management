'use client';

// nuqs ile filtre state'i URL query parametrelerine bağlı tutuluyor
// (örn. ?status=ALIVE&gender=MALE) — böylece filtreli sayfa paylaşılabiliyor
import { useQueryState, parseAsStringEnum } from 'nuqs';

export enum Status {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

export function useCharacterFilters() {
  const [status, setStatus] = useQueryState(
    'status',
    parseAsStringEnum<Status>(Object.values(Status)),
  );

  const [gender, setGender] = useQueryState(
    'gender',
    parseAsStringEnum<Gender>(Object.values(Gender)),
  );

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    parse: (value) => value || '',
    serialize: (value) => value,
  });

  const clearFilters = () => {
    setStatus(null);
    setGender(null);
    setSearch('');
  };

  return {
    status,
    setStatus,
    gender,
    setGender,
    search,
    setSearch,
    clearFilters,
  };
}
