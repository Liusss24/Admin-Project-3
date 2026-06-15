export const locationHistoryListStyles = {
  state: 'py-4',
  currentCard:
    'rounded-lg border border-zinc-300 bg-zinc-100 p-4 dark:border-zinc-600 dark:bg-zinc-700/50',
  currentLabel:
    'text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2',
  list: 'flex flex-col gap-3 mt-4',
  historyLabel:
    'text-xs font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500 mb-2',
  card: 'rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800',
  cardRow: 'flex items-center justify-between gap-2',
  cardFarm: 'text-sm font-medium text-zinc-900 dark:text-zinc-50',
  cardLot: 'text-sm text-zinc-600 dark:text-zinc-300',
  cardDate: 'text-xs text-zinc-500 dark:text-zinc-400',
} as const;
