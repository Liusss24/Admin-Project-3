export const navbarStyles = {
  root: 'border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900',
  inner:
    'mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8',
  brand: 'flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-50',
  links: 'flex items-center gap-1',
  link: 'rounded-md px-3 py-1.5 text-sm transition-colors',
  linkActive:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
  linkInactive:
    'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
  logout:
    'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800',
} as const;
