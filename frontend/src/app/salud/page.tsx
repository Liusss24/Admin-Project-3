import { redirect } from 'next/navigation';
import { route } from '@/app/routes/routes';

export default function SaludPage() {
  redirect(route.animals);
}
