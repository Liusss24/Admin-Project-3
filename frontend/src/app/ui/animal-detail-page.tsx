'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { AuthGuard } from '@/features/auth/guard';
import { Navbar } from '@/widgets/navigation/navbar';
import { AnimalDetail } from '@/widgets/animals/animal-detail';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { fetchAnimal } from '@/entities/animal/model/animal.repository';
import type { Animal } from '@/entities/animal/model/animal.types';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { ariaBoolean } from '@/shared/constants/html-attributes.constants';
import { route } from '@/app/routes/routes';
import { animalDetailPageStyles } from '@/app/styles/animal-detail-page.styles';

interface AnimalDetailScreenProps {
  animalId: number;
}

function AnimalDetailScreen({ animalId }: AnimalDetailScreenProps) {
  const { t } = useI18n();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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

  return (
    <>
      <Navbar />
      <main className={animalDetailPageStyles.main}>
        <Link href={route.animals} className={animalDetailPageStyles.back}>
          <ArrowLeft size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
          {t.animals.detail.back}
        </Link>

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
        ) : (
          <AnimalDetail animal={animal} />
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
