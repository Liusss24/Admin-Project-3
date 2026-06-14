import { forwardRef, type InputHTMLAttributes } from 'react';
import { inputType } from '@/shared/constants/html-attributes.constants';
import { inputStyles } from './input.styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { type = inputType.TEXT, hasError = false, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={`${inputStyles.base} ${hasError ? inputStyles.error : ''} ${className ?? ''}`}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
