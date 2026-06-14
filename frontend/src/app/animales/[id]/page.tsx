import { AnimalDetailPage } from '@/app/ui/animal-detail-page';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <AnimalDetailPage animalId={Number(id)} />;
}
