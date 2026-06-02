import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonType } from '@/shared/constants/html-attributes.constants';
import { buttonStyles } from './button.styles';

export const buttonVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

type ButtonVariant = (typeof buttonVariant)[keyof typeof buttonVariant];

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

export function Button({
  type = buttonType.BUTTON,
  variant = buttonVariant.PRIMARY,
  className,
  children,
  ...rest
}: ButtonProps) {
  const variantClass =
    variant === buttonVariant.PRIMARY
      ? buttonStyles.primary
      : buttonStyles.secondary;

  return (
    <button
      type={type}
      className={`${buttonStyles.base} ${variantClass} ${className ?? ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}
