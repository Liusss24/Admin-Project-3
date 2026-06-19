export const loginPageStyles = {
  container: 'flex flex-1 flex-col items-center justify-center gap-4 py-16',
  card: 'w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
  title: 'text-2xl font-semibold text-zinc-900 dark:text-zinc-50',
  subtitle: 'mt-1 mb-6 text-sm text-zinc-600 dark:text-zinc-300',
  hint: 'w-full max-w-sm rounded-xl border border-zinc-200 bg-zinc-50 px-5 py-4 dark:border-zinc-700 dark:bg-zinc-800/60',
  hintTitle: 'mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400',
  hintRow: 'flex items-center justify-between gap-4 text-sm',
  hintLabel: 'text-zinc-500 dark:text-zinc-400',
  hintValue: 'font-mono font-medium text-zinc-900 dark:text-zinc-100',
} as const;
