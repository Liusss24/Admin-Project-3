import type { ReactNode } from 'react';
import { ariaBoolean } from '@/shared/constants/html-attributes.constants';
import {
  buildFieldErrorId,
  buildFieldHintId,
} from '@/shared/lib/forms/form-field-aria';
import { formFieldStyles } from './form-field.styles';

interface FormFieldProps {
  htmlFor: string;
  label: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  required?: boolean;
}

export function FormField({
  htmlFor,
  label,
  children,
  error,
  hint,
  required = false,
}: FormFieldProps) {
  return (
    <div className={formFieldStyles.root}>
      <label htmlFor={htmlFor} className={formFieldStyles.label}>
        {label}
        {required ? (
          <span
            className={formFieldStyles.required}
            aria-hidden={ariaBoolean.TRUE}
          >
            {' *'}
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={buildFieldHintId(htmlFor)} className={formFieldStyles.hint}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={buildFieldErrorId(htmlFor)} className={formFieldStyles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
