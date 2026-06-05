import type { ReactNode } from 'react';
import { ariaLive, ariaRole } from '@/shared/constants/html-attributes.constants';
import { statusMessageStyles } from './status-message.styles';
import {
  statusMessageVariant,
  type StatusMessageVariant,
} from './status-message.constants';

interface StatusMessageProps {
  variant: StatusMessageVariant;
  children: ReactNode;
}

const toneStyles: Record<StatusMessageVariant, string> = {
  [statusMessageVariant.INFO]: statusMessageStyles.info,
  [statusMessageVariant.SUCCESS]: statusMessageStyles.success,
  [statusMessageVariant.ERROR]: statusMessageStyles.error,
};

export function StatusMessage({ variant, children }: StatusMessageProps) {
  const isError = variant === statusMessageVariant.ERROR;
  return (
    <p
      role={isError ? ariaRole.ALERT : ariaRole.STATUS}
      aria-live={isError ? ariaLive.ASSERTIVE : ariaLive.POLITE}
      className={`${statusMessageStyles.base} ${toneStyles[variant]}`}
    >
      {children}
    </p>
  );
}
