export const animalCardStyles = {
  root: 'flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
  header: 'flex items-start justify-between gap-2',
  name: 'text-base font-semibold text-zinc-900 dark:text-zinc-50',
  meta: 'grid grid-cols-2 gap-2 text-sm',
  metaItem: 'flex flex-col',
  metaLabel: 'text-xs uppercase tracking-wide text-zinc-400',
  metaValue: 'text-zinc-700 dark:text-zinc-200',
} as const;
