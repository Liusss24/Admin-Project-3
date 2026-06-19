export const animalFilterStyles = {
  root: 'flex flex-col gap-3',
  topRow: 'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
  tabs: 'flex flex-wrap gap-2',
  tab: 'rounded-full border px-3 py-1 text-sm transition-colors',
  tabActive: 'border-emerald-600 bg-emerald-600 text-white',
  tabInactive:
    'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200',
  searchRow: 'flex gap-2',
  searchInput: 'sm:w-64',
  healthRow: 'flex flex-wrap items-end gap-3',
  healthField: 'flex flex-col gap-1',
  fieldLabel: 'text-xs font-medium text-zinc-500 dark:text-zinc-400',
  healthSelect: 'text-sm',
  dateInput: 'w-36',
  clearButton:
    'rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800',
} as const;
