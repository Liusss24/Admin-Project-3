export const animalsPageStyles = {
  main: 'mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8',
  header: 'flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between',
  heading: 'flex flex-col gap-1',
  title: 'text-2xl font-semibold text-zinc-900 dark:text-zinc-50',
  subtitle: 'text-sm text-zinc-600 dark:text-zinc-300',
  success: 'mt-4',
  panel:
    'mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900',
  panelTitle: 'mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50',
  toolbar: 'mt-6',
  list: 'mt-6',
} as const;
