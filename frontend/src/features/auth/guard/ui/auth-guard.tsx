'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/shared/hooks/use-session';
import { useI18n } from '@/app/providers/i18n-provider';
import { route } from '@/app/routes/routes';
import { Container } from '@/shared/ui/container/ui/container';
import { StatusMessage } from '@/shared/ui/status-message/ui/status-message';
import { statusMessageVariant } from '@/shared/ui/status-message/ui/status-message.constants';
import { authGuardStyles } from './auth-guard.styles';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { t } = useI18n();
  const { isAuthenticated, isHydrated } = useSession();

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.replace(route.login);
    }
  }, [isHydrated, isAuthenticated, router]);

  if (!isHydrated || !isAuthenticated) {
    return (
      <Container className={authGuardStyles.loader}>
        <StatusMessage variant={statusMessageVariant.INFO}>
          {t.messages.state.loading}
        </StatusMessage>
      </Container>
    );
  }

  return <>{children}</>;
}
