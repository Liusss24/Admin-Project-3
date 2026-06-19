'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { AuthGuard } from '@/features/auth/guard';
import { Navbar } from '@/widgets/navigation/navbar';
import { Button } from '@/shared/ui/button/ui/button';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { ariaBoolean, buttonType } from '@/shared/constants/html-attributes.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { FarmForm } from '@/features/location/farm-registration';
import { useFarmList } from '@/entities/location';
import type { Farm } from '@/entities/location/model/location.types';
import { locationPageStyles } from '@/app/styles/location-page.styles';

function FarmCard({ farm }: { farm: Farm }) {
  const { t } = useI18n();
  return (
    <div className={locationPageStyles.card}>
      <p className={locationPageStyles.cardName}>{farm.name}</p>
      {farm.description ? (
        <p className={locationPageStyles.cardDescription}>{farm.description}</p>
      ) : null}
      <p className={locationPageStyles.cardCount}>
        <span className={locationPageStyles.cardCountNumber}>{farm.animalCount}</span>
        &nbsp;{t.location.farm.animalCount}
      </p>
    </div>
  );
}

function LocationScreen() {
  const { t } = useI18n();
  const { farms, status, reload } = useFarmList();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  function handleAddClick() {
    setShowSuccess(false);
    setIsPanelOpen((open) => !open);
  }

  function handleFarmCreated() {
    setIsPanelOpen(false);
    setShowSuccess(true);
    void reload();
  }

  return (
    <>
      <Navbar />
      <main className={locationPageStyles.main}>
        <header className={locationPageStyles.header}>
          <div className={locationPageStyles.heading}>
            <h1 className={locationPageStyles.title}>{t.location.page.title}</h1>
            <p className={locationPageStyles.subtitle}>{t.location.page.subtitle}</p>
          </div>
          <Button type={buttonType.BUTTON} onClick={handleAddClick}>
            <Plus size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.location.actions.addFarm}
          </Button>
        </header>

        {showSuccess ? (
          <div className={locationPageStyles.success}>
            <StatusMessage variant={statusMessageVariant.SUCCESS}>
              {t.location.farm.success}
            </StatusMessage>
          </div>
        ) : null}

        {isPanelOpen ? (
          <section className={locationPageStyles.panel}>
            <h2 className={locationPageStyles.panelTitle}>
              {t.location.actions.addFarm}
            </h2>
            <FarmForm
              onSuccess={handleFarmCreated}
              onCancel={() => setIsPanelOpen(false)}
            />
          </section>
        ) : null}

        {status === 'loading' ? (
          <div className={locationPageStyles.state}>
            <StatusMessage variant={statusMessageVariant.INFO}>
              {t.messages.state.loading}
            </StatusMessage>
          </div>
        ) : status === 'error' ? (
          <div className={locationPageStyles.state}>
            <StatusMessage variant={statusMessageVariant.ERROR}>
              {t.location.page.error}
            </StatusMessage>
            <Button type={buttonType.BUTTON} onClick={() => void reload()}>
              {t.location.actions.retry}
            </Button>
          </div>
        ) : farms.length === 0 ? (
          <div className={locationPageStyles.state}>
            <StatusMessage variant={statusMessageVariant.INFO}>
              {t.location.page.empty}
            </StatusMessage>
          </div>
        ) : (
          <ul className={locationPageStyles.list}>
            {farms.map((farm) => (
              <li key={farm.id}>
                <FarmCard farm={farm} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

export function LocationPage() {
  return (
    <AuthGuard>
      <LocationScreen />
    </AuthGuard>
  );
}
