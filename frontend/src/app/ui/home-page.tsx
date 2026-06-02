'use client';

import Link from 'next/link';
import { Sprout } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { route } from '@/app/routes/routes';
import { Container } from '@/shared/ui/container/ui/container';
import { buttonStyles } from '@/shared/ui/button/ui/button.styles';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import { ariaBoolean } from '@/shared/constants/html-attributes.constants';
import { homePageStyles } from '@/app/styles/home-page.styles';

export function HomePage() {
  const { t } = useI18n();

  return (
    <Container className={homePageStyles.container}>
      <main className={homePageStyles.main}>
        <span className={homePageStyles.badge}>
          <Sprout size={iconSize.LG} aria-hidden={ariaBoolean.TRUE} />
        </span>
        <h1 className={homePageStyles.title}>{t.common.home.title}</h1>
        <p className={homePageStyles.subtitle}>{t.common.home.subtitle}</p>
        <div className={homePageStyles.actions}>
          <Link
            href={route.animals}
            className={`${buttonStyles.base} ${buttonStyles.primary}`}
          >
            {t.common.home.primaryAction}
          </Link>
          <Link
            href={route.animals}
            className={`${buttonStyles.base} ${buttonStyles.secondary}`}
          >
            {t.common.home.secondaryAction}
          </Link>
        </div>
      </main>
    </Container>
  );
}
