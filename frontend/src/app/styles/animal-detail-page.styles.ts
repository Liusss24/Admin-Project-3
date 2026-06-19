export const animalDetailPageStyles = {
  main: 'mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8',
  header: 'mb-6 flex items-center justify-between gap-4',
  back: 'flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors',
  actions: 'flex items-center gap-2 shrink-0',
  deleteConfirm: 'mb-6 flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30',
  deleteActions: 'flex gap-3',
  state: 'py-12 text-center',
  editPanel: 'rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50',
  editTitle: 'text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-4',
} as const;
