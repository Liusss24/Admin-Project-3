export const locationPageStyles = {
  main: 'mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8',
  header: 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between',
  heading: 'flex flex-col gap-1',
  title: 'text-2xl font-semibold text-zinc-900 dark:text-zinc-50',
  subtitle: 'text-sm text-zinc-600 dark:text-zinc-300',
  success: 'mt-4',
  panel:
    'mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
  panelTitle: 'mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50',
  list: 'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
  state: 'mt-6 py-12 text-center',
  card: 'rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800',
  cardName: 'text-base font-semibold text-zinc-900 dark:text-zinc-50',
  cardDescription: 'mt-1 text-sm text-zinc-500 dark:text-zinc-400',
  cardCount: 'mt-3 flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300',
  cardCountNumber: 'text-zinc-900 dark:text-zinc-50',
} as const;
