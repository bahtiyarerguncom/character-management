import Image from 'next/image';
import type { Character } from '@/gql/graphql';

// status ve gender için renk/label eşlemeleri — yeni değer eklenirse buraya
const statusConfig: Record<string, { label: string; dot: string }> = {
  ALIVE: { label: 'Alive', dot: 'bg-green-400' },
  DEAD: { label: 'Dead', dot: 'bg-red-400' },
  UNKNOWN: { label: 'Unknown', dot: 'bg-gray-400' },
};

// ikon kütüphanesi eklemek istemedik, inline SVG ile çözdük
// Mars (♂), Venus (♀) ve soru işareti sembolleri
const GenderIcon = ({ type }: { type: string }) => {
  if (type === 'MALE')
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <circle cx={10} cy={14} r={5} />
        <path d="M19 5l-5.4 5.4M19 5h-5M19 5v5" />
      </svg>
    );
  if (type === 'FEMALE')
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
        <circle cx={12} cy={9} r={5} />
        <path d="M12 14v7M9 18h6" />
      </svg>
    );
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
      <circle cx={12} cy={12} r={10} />
      <path d="M12 16v.01M12 8a2 2 0 011.71 3.04L12 13" />
    </svg>
  );
};

const genderConfig: Record<string, { label: string; badge: string; backBadge: string }> = {
  MALE: { label: 'Male', badge: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-400/30', backBadge: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
  FEMALE: { label: 'Female', badge: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-400/30', backBadge: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
  UNKNOWN: { label: 'Unknown', badge: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-400/30', backBadge: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
};

interface CharacterCardProps {
  character: Pick<Character, 'id' | 'image' | 'name' | 'status' | 'gender' | 'description'>;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const status = statusConfig[character.status];
  const gender = genderConfig[character.gender];

  // CSS 3D flip card: perspective container > transform wrapper > ön/arka yüzler.
  // group-hover ile parent'a hover verince iç div Y ekseninde 180° dönüyor,
  // backface-visibility:hidden sayesinde sadece bakan yüz görünüyor
  return (
    <div className="group h-80 [perspective:1000px]">
      <div className="relative h-full w-full transition-transform duration-400 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* Front */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-sm [backface-visibility:hidden]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800" />
          <div className="absolute inset-x-0 top-3 z-10 flex items-center justify-between px-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{character.name}</h3>
            <span className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${gender.badge}`}>
              <GenderIcon type={character.gender} />
              {gender.label}
            </span>
          </div>
          <div className="absolute inset-0 z-0 flex items-center justify-center opacity-90 dark:opacity-70">
            <Image
              src={character.image}
              alt={character.name}
              width={140}
              height={140}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/30 bg-white/40 px-4 py-3 backdrop-blur-md dark:border-white/5 dark:bg-black/40">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-200">
              <span className={`h-2 w-2 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-blue-100 to-purple-100 dark:from-slate-800 dark:via-blue-900/40 dark:to-purple-900/40" />
          <div className="relative z-10 flex h-full flex-col justify-between p-5">
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">{character.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-white/10 dark:text-gray-200">
                  <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
                <span className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold ${gender.badge}`}>
                  <GenderIcon type={character.gender} />
                  {gender.label}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{character.description}</p>
            <div className="flex items-center gap-3">
              <Image
                src={character.image}
                alt={character.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="h-px flex-1 bg-gray-300 dark:bg-white/20" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Character Profile</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
