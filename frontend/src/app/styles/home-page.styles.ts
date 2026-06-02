export const homePageStyles = {
  container: 'flex flex-1 items-center justify-center py-16',
  main: 'flex max-w-2xl flex-col items-center gap-5 text-center',
  badge:
    'flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  title:
    'text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl',
  subtitle: 'text-base text-zinc-600 dark:text-zinc-300',
  actions: 'mt-2 flex flex-col gap-3 sm:flex-row',
} as const;
