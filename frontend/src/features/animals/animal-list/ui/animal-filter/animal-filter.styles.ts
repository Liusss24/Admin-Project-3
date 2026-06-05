export const animalFilterStyles = {
  root: 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
  tabs: 'flex flex-wrap gap-2',
  tab: 'rounded-full border px-3 py-1 text-sm transition-colors',
  tabActive: 'border-emerald-600 bg-emerald-600 text-white',
  tabInactive:
    'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200',
  searchForm: 'flex gap-2',
  searchInput: 'sm:w-64',
} as const;
