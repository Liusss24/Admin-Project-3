'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Animal } from '@/entities/animal/model/animal.types';
import {
  ALL_CATEGORIES,
  listStatus,
  loadOutcome,
  type CategoryFilter,
  type ListStatus,
} from '../model/animal-list.constants';
import { loadAnimals } from '../model/animal-list-load';

export function useAnimalList() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [status, setStatus] = useState<ListStatus>(listStatus.LOADING);
  const [category, setCategory] = useState<CategoryFilter>(ALL_CATEGORIES);
  const [search, setSearch] = useState('');

  const reload = useCallback(async () => {
    setStatus(listStatus.LOADING);
    const result = await loadAnimals({
      category: category === ALL_CATEGORIES ? undefined : category,
      search: search.trim() || undefined,
    });
    if (result.kind === loadOutcome.SUCCESS) {
      setAnimals(result.animals);
      setStatus(listStatus.READY);
    } else {
      setStatus(listStatus.ERROR);
    }
  }, [category, search]);

  // Data fetch on mount and whenever the filters change. `reload` sets a
  // loading state synchronously, which is the intended use here.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);

  return { animals, status, category, setCategory, search, setSearch, reload };
}
