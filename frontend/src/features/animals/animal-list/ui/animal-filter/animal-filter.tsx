'use client';

import { useState, type FormEvent } from 'react';
import { useI18n } from '@/app/providers/i18n-provider';
import { animalCategory } from '@/entities/animal/model/animal.types';
import { Input } from '@/shared/ui/input/ui/input';
import { Select } from '@/shared/ui/select/ui/select';
import { Button } from '@/shared/ui/button/ui/button';
import {
  ariaBoolean,
  buttonType,
  inputType,
} from '@/shared/constants/html-attributes.constants';
import {
  ALL_CATEGORIES,
  type AnimalSearchParams,
  type CategoryFilter,
} from '../../model/animal-list.constants';
import { animalFilterStyles } from './animal-filter.styles';

interface CategoryTab {
  value: CategoryFilter;
  label: string;
}

interface AnimalFilterProps {
  category: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onSearch: (params: AnimalSearchParams) => void;
}

export function AnimalFilter({
  category,
  onCategoryChange,
  onSearch,
}: AnimalFilterProps) {
  const { t } = useI18n();
  const [term, setTerm] = useState('');
  const [healthEventType, setHealthEventType] = useState('');
  const [healthDateFrom, setHealthDateFrom] = useState('');
  const [healthDateTo, setHealthDateTo] = useState('');

  const ft = t.animals.filter;

  const tabs: CategoryTab[] = [
    { value: ALL_CATEGORIES, label: ft.all },
    { value: animalCategory.TRABAJO, label: t.common.categories.trabajo },
    { value: animalCategory.PRODUCCION, label: t.common.categories.produccion },
    { value: animalCategory.CONSUMO, label: t.common.categories.consumo },
  ];

  const healthTypeOptions = [
    { value: '', label: ft.healthEventType.any },
    { value: 'vacunacion', label: ft.healthEventType.vacunacion },
    { value: 'desparasitacion', label: ft.healthEventType.desparasitacion },
    { value: 'revision', label: ft.healthEventType.revision },
    { value: 'otro', label: ft.healthEventType.otro },
  ];

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch({ search: term.trim(), healthEventType, healthDateFrom, healthDateTo });
  }

  function handleClearHealth() {
    setHealthEventType('');
    setHealthDateFrom('');
    setHealthDateTo('');
    onSearch({ search: term.trim(), healthEventType: '', healthDateFrom: '', healthDateTo: '' });
  }

  return (
    <form className={animalFilterStyles.root} onSubmit={handleSearchSubmit}>
      <div className={animalFilterStyles.topRow}>
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

        <div className={animalFilterStyles.searchRow}>
          <Input
            type={inputType.SEARCH}
            value={term}
            placeholder={ft.searchPlaceholder}
            aria-label={ft.searchLabel}
            className={animalFilterStyles.searchInput}
            onChange={(event) => setTerm(event.target.value)}
          />
          <Button type={buttonType.SUBMIT}>{ft.searchAction}</Button>
        </div>
      </div>

      <div className={animalFilterStyles.healthRow}>
        <div className={animalFilterStyles.healthField}>
          <label className={animalFilterStyles.fieldLabel}>
            {ft.healthEventType.label}
          </label>
          <Select
            value={healthEventType}
            options={healthTypeOptions}
            onChange={(e) => setHealthEventType(e.target.value)}
            className={animalFilterStyles.healthSelect}
          />
        </div>

        <div className={animalFilterStyles.healthField}>
          <label className={animalFilterStyles.fieldLabel}>{ft.dateFrom}</label>
          <Input
            type={inputType.DATE}
            value={healthDateFrom}
            className={animalFilterStyles.dateInput}
            onChange={(e) => setHealthDateFrom(e.target.value)}
          />
        </div>

        <div className={animalFilterStyles.healthField}>
          <label className={animalFilterStyles.fieldLabel}>{ft.dateTo}</label>
          <Input
            type={inputType.DATE}
            value={healthDateTo}
            className={animalFilterStyles.dateInput}
            onChange={(e) => setHealthDateTo(e.target.value)}
          />
        </div>

        <button
          type={buttonType.BUTTON}
          onClick={handleClearHealth}
          className={animalFilterStyles.clearButton}
        >
          {ft.clearFilters}
        </button>
      </div>
    </form>
  );
}
