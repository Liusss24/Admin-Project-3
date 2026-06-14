import {
  animalCategory,
  type AnimalCategory,
} from '@/entities/animal/model/animal.types';
import { categoryBadgeStyles } from './category-badge.styles';

interface CategoryBadgeProps {
  category: AnimalCategory;
  label: string;
}

const toneByCategory: Record<AnimalCategory, string> = {
  [animalCategory.TRABAJO]: categoryBadgeStyles.work,
  [animalCategory.PRODUCCION]: categoryBadgeStyles.production,
  [animalCategory.CONSUMO]: categoryBadgeStyles.consumption,
};

export function CategoryBadge({ category, label }: CategoryBadgeProps) {
  return (
    <span className={`${categoryBadgeStyles.base} ${toneByCategory[category]}`}>
      {label}
    </span>
  );
}
