export const healthEventListStyles = {
  list: 'flex flex-col gap-3',
  state: 'py-4',
  card: 'rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800',
  cardHeader: 'flex items-center justify-between gap-2 mb-2',
  cardType: 'text-sm font-medium text-zinc-900 dark:text-zinc-50',
  cardActions: 'flex items-center gap-2',
  cardDate: 'text-xs text-zinc-500 dark:text-zinc-400',
  cardDescription: 'text-sm text-zinc-600 dark:text-zinc-300',
  deleteButton: 'text-zinc-400 transition-colors hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400',
  confirmButton: 'text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
  cancelButton: 'text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200',
} as const;
