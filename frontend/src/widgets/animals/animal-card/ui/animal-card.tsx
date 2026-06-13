import Link from 'next/link';
import type { Animal } from '@/entities/animal/model/animal.types';
import { CategoryBadge } from '@/shared/ui/category-badge/ui/category-badge';
import { route } from '@/app/routes/routes';
import { animalCardStyles } from './animal-card.styles';

interface AnimalCardProps {
  animal: Animal;
  identifierLabel: string;
  speciesLabel: string;
}

export function AnimalCard({
  animal,
  identifierLabel,
  speciesLabel,
}: AnimalCardProps) {
  return (
    <Link href={route.animalDetail(animal.id)} className="block">
    <article className={animalCardStyles.root}>
      <div className={animalCardStyles.header}>
        <h3 className={animalCardStyles.name}>{animal.name}</h3>
        <CategoryBadge category={animal.category} label={animal.categoryDisplay} />
      </div>
      <dl className={animalCardStyles.meta}>
        <div className={animalCardStyles.metaItem}>
          <dt className={animalCardStyles.metaLabel}>{identifierLabel}</dt>
          <dd className={animalCardStyles.metaValue}>{animal.identifier}</dd>
        </div>
        <div className={animalCardStyles.metaItem}>
          <dt className={animalCardStyles.metaLabel}>{speciesLabel}</dt>
          <dd className={animalCardStyles.metaValue}>{animal.species}</dd>
        </div>
      </dl>
    </article>
    </Link>
  );
}
