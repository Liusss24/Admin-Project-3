'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, Sprout } from 'lucide-react';
import { useI18n } from '@/app/providers/i18n-provider';
import { clearSession } from '@/shared/lib/session/session-store';
import { route } from '@/app/routes/routes';
import { appInfo } from '@/shared/constants/app.constants';
import { iconSize } from '@/shared/constants/icon-sizes.constants';
import {
  ariaBoolean,
  buttonType,
} from '@/shared/constants/html-attributes.constants';
import { navbarStyles } from './navbar.styles';

interface NavItem {
  href: string;
  label: string;
}

export function Navbar() {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const items: NavItem[] = [
    { href: route.home, label: t.common.nav.dashboard },
    { href: route.animals, label: t.common.nav.animals },
    { href: route.location, label: t.common.nav.location },
  ];

  function handleLogout() {
    clearSession();
    router.replace(route.login);
  }

  return (
    <header className={navbarStyles.root}>
      <nav className={navbarStyles.inner}>
        <Link href={route.home} className={navbarStyles.brand}>
          <Sprout size={iconSize.LG} aria-hidden={ariaBoolean.TRUE} />
          {appInfo.NAME}
        </Link>

        <div className={navbarStyles.links}>
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={`${navbarStyles.link} ${
                  isActive ? navbarStyles.linkActive : navbarStyles.linkInactive
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type={buttonType.BUTTON}
            onClick={handleLogout}
            className={navbarStyles.logout}
          >
            <LogOut size={iconSize.SM} aria-hidden={ariaBoolean.TRUE} />
            {t.auth.logout}
          </button>
        </div>
      </nav>
    </header>
  );
}
