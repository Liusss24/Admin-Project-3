'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { animalCategory } from '@/entities/animal/model/animal.types';
import { Input } from '@/shared/ui/input/ui/input';
import { Button } from '@/shared/ui/button/ui/button';
import {
  ariaBoolean,
  buttonType,
  inputType,
} from '@/shared/constants/html-attributes.constants';
import { ALL_CATEGORIES, type CategoryFilter } from '../../model/animal-list.constants';
import { animalFilterStyles } from './animal-filter.styles';

interface CategoryTab {
  value: CategoryFilter;
  label: string;
}

interface AnimalFilterProps {
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onSearch: (search: string) => void;
}

export function AnimalFilter({
  category,
  onCategoryChange,
  onSearch,
}: AnimalFilterProps) {
  const { t } = useI18n();
  const [term, setTerm] = useState('');

  const tabs: CategoryTab[] = [
    { value: ALL_CATEGORIES, label: t.animals.filter.all },
    { value: animalCategory.TRABAJO, label: t.common.categories.trabajo },
    { value: animalCategory.PRODUCCION, label: t.common.categories.produccion },
    { value: animalCategory.CONSUMO, label: t.common.categories.consumo },
  ];

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(term.trim());
  }

  return (
    <div className={animalFilterStyles.root}>
      <div className={animalFilterStyles.tabs}>
        {tabs.map((tab) => {
          const isActive = tab.value === category;
          return (
            <button
              key={tab.value}
              type={buttonType.BUTTON}
              aria-pressed={isActive ? ariaBoolean.TRUE : ariaBoolean.FALSE}
              onClick={() => onCategoryChange(tab.value)}
              className={`${animalFilterStyles.tab} ${
                isActive
                  ? animalFilterStyles.tabActive
                  : animalFilterStyles.tabInactive
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <form className={animalFilterStyles.searchForm} onSubmit={handleSearchSubmit}>
        <Input
          type={inputType.SEARCH}
          value={term}
          placeholder={t.animals.filter.searchPlaceholder}
          aria-label={t.animals.filter.searchLabel}
          className={animalFilterStyles.searchInput}
          onChange={(event) => setTerm(event.target.value)}
        />
        <Button type={buttonType.SUBMIT}>{t.animals.filter.searchAction}</Button>
      </form>
    </div>
  );
}
