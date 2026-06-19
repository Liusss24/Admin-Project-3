'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { AuthGuard } from '@/features/auth/guard';
import { Navbar } from '@/widgets/navigation/navbar';
import { AnimalDetail } from '@/widgets/animals/animal-detail';
import { AnimalEditForm } from '@/features/animals/animal-edit';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { Button, buttonVariant } from '@/shared/ui/button/ui/button';
import { fetchAnimal, deleteAnimal } from '@/entities/animal/model/animal.repository';
import { useFarmList } from '@/entities/location';
import type { Animal } from '@/entities/animal/model/animal.types';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { ariaBoolean, buttonType } from '@/shared/constants/html-attributes.constants';
import { route } from '@/app/routes/routes';
import { animalDetailPageStyles } from '@/app/styles/animal-detail-page.styles';

type PageMode = 'view' | 'edit';

interface AnimalDetailScreenProps {
  animalId: number;
}

function AnimalDetailScreen({ animalId }: AnimalDetailScreenProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [mode, setMode] = useState<PageMode>('view');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { farms } = useFarmList();

  useEffect(() => {
    let cancelled = false;
    fetchAnimal(animalId)
      .then((data) => {
        if (!cancelled) {
          setAnimal(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [animalId]);

  function handleEditSuccess(updated: Animal) {
    setAnimal(updated);
    setMode('view');
  }

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await deleteAnimal(animalId);
      router.push(route.animals);
    } catch {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  }

  const canInteract = !isLoading && !hasError && animal !== null;

  return (
    <>
      <Navbar />
      <main className={animalDetailPageStyles.main}>
        <div className={animalDetailPageStyles.header}>
          <Link href={route.animals} className={animalDetailPageStyles.back}>
            <ArrowLeft size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.animals.detail.back}
          </Link>

          {canInteract && mode === 'view' ? (
            <div className={animalDetailPageStyles.actions}>
              <Button
                type={buttonType.BUTTON}
                variant={buttonVariant.SECONDARY}
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMode('edit');
                }}
              >
                <Pencil size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
                {t.animals.actions.edit}
              </Button>
              <Button
                type={buttonType.BUTTON}
                variant={buttonVariant.SECONDARY}
                onClick={() => setShowDeleteConfirm((v) => !v)}
              >
                <Trash2 size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
                {t.animals.actions.delete}
              </Button>
            </div>
          ) : null}
        </div>

        {showDeleteConfirm ? (
          <div className={animalDetailPageStyles.deleteConfirm}>
            <StatusMessage variant={statusMessageVariant.ERROR}>
              {t.animals.deleteConfirm.message}
            </StatusMessage>
            <div className={animalDetailPageStyles.deleteActions}>
              <Button
                type={buttonType.BUTTON}
                onClick={() => void handleDelete()}
                disabled={isDeleting}
              >
                {isDeleting
                  ? t.animals.actions.deleting
                  : t.animals.actions.confirmDelete}
              </Button>
              <Button
                type={buttonType.BUTTON}
                variant={buttonVariant.SECONDARY}
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                {t.animals.actions.cancel}
              </Button>
            </div>
          </div>
        ) : null}

        {isLoading ? (
          <div className={animalDetailPageStyles.state}>
            <StatusMessage variant={statusMessageVariant.INFO}>
              {t.animals.detail.loading}
            </StatusMessage>
          </div>
        ) : hasError || !animal ? (
          <div className={animalDetailPageStyles.state}>
            <StatusMessage variant={statusMessageVariant.ERROR}>
              {t.animals.detail.error}
            </StatusMessage>
          </div>
        ) : mode === 'edit' ? (
          <div className={animalDetailPageStyles.editPanel}>
            <h2 className={animalDetailPageStyles.editTitle}>
              {t.animals.editForm.title}
            </h2>
            <AnimalEditForm
              animal={animal}
              onSuccess={handleEditSuccess}
              onCancel={() => setMode('view')}
            />
          </div>
        ) : (
          <AnimalDetail animal={animal} farms={farms} />
        )}
      </main>
    </>
  );
}

export function AnimalDetailPage({ animalId }: AnimalDetailScreenProps) {
  return (
    <AuthGuard>
      <AnimalDetailScreen animalId={animalId} />
    </AuthGuard>
  );
}
