import type { ReactNode } from 'react';
import { containerStyles } from './container.styles';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`${containerStyles.base} ${className ?? ''}`}>
      {children}
    </div>
  );
}
