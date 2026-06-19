'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n } from '@/app/providers/i18n-provider';
import { useSession } from '@/shared/hooks/use-session';
import { Container } from '@/shared/ui/container/ui/container';
import { LoginForm } from '@/features/auth/login';
import { route } from '@/app/routes/routes';
import { loginPageStyles } from '@/app/styles/login-page.styles';

export function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const { isAuthenticated, isHydrated } = useSession();

  // Skip the login screen when there is already an active session.
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(route.animals);
    }
  }, [isHydrated, isAuthenticated, router]);

  return (
    <Container className={loginPageStyles.container}>
      <div className={loginPageStyles.card}>
        <h1 className={loginPageStyles.title}>{t.auth.login.title}</h1>
        <p className={loginPageStyles.subtitle}>{t.auth.login.subtitle}</p>
        <LoginForm onSuccess={() => router.replace(route.animals)} />
      </div>

      <div className={loginPageStyles.hint}>
        <p className={loginPageStyles.hintTitle}>Credenciales de demo</p>
        <div className={loginPageStyles.hintRow}>
          <span className={loginPageStyles.hintLabel}>Usuario</span>
          <span className={loginPageStyles.hintValue}>admin</span>
        </div>
        <div className={loginPageStyles.hintRow}>
          <span className={loginPageStyles.hintLabel}>Contraseña</span>
          <span className={loginPageStyles.hintValue}>pgat2026</span>
        </div>
      </div>
    </Container>
  );
}
