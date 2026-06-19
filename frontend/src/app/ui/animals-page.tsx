'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { AuthGuard } from '@/features/auth/guard';
import { Navbar } from '@/widgets/navigation/navbar';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import {
  ariaBoolean,
  buttonType,
} from '@/shared/constants/html-attributes.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { AnimalForm } from '@/features/animals/animal-registration';
import {
  AnimalFilter,
  AnimalList,
  useAnimalList,
} from '@/features/animals/animal-list';
import { animalsPageStyles } from '@/app/styles/animals-page.styles';

function AnimalsScreen() {
  const { t } = useI18n();
  const { animals, status, category, setCategory, setSearchParams, reload } =
    useAnimalList();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleRegisterClick() {
    setShowSuccess(false);
    setIsPanelOpen((open) => !open);
  }

  function handleCreated() {
    setIsPanelOpen(false);
    setShowSuccess(true);
    void reload();
  }

  return (
    <>
      <Navbar />
      <main className={animalsPageStyles.main}>
        <header className={animalsPageStyles.header}>
          <div className={animalsPageStyles.heading}>
            <h1 className={animalsPageStyles.title}>{t.animals.page.title}</h1>
            <p className={animalsPageStyles.subtitle}>
              {t.animals.page.subtitle}
            </p>
          </div>
          <Button type={buttonType.BUTTON} onClick={handleRegisterClick}>
            <Plus size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.animals.actions.register}
          </Button>
        </header>

        {showSuccess ? (
          <div className={animalsPageStyles.success}>
            <StatusMessage variant={statusMessageVariant.SUCCESS}>
              {t.animals.form.success}
            </StatusMessage>
          </div>
        ) : null}

        {isPanelOpen ? (
          <section className={animalsPageStyles.panel}>
            <h2 className={animalsPageStyles.panelTitle}>
              {t.animals.form.title}
            </h2>
            <AnimalForm
              onSuccess={handleCreated}
              onCancel={() => setIsPanelOpen(false)}
            />
          </section>
        ) : null}

        <div className={animalsPageStyles.toolbar}>
          <AnimalFilter
            category={category}
            onCategoryChange={setCategory}
            onSearch={setSearchParams}
          />
        </div>

        <div className={animalsPageStyles.list}>
          <AnimalList animals={animals} status={status} onRetry={reload} />
        </div>
      </main>
    </>
  );
}

export function AnimalsPage() {
  return (
    <AuthGuard>
      <AnimalsScreen />
    </AuthGuard>
  );
}
