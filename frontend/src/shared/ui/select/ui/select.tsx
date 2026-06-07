import { forwardRef, type SelectHTMLAttributes } from 'react';
import { selectStyles } from './select.styles';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { options, placeholder, hasError = false, className, ...rest },
  ref,
) {
  return (
    <select
      ref={ref}
      className={`${selectStyles.base} ${hasError ? selectStyles.error : ''} ${className ?? ''}`}
      {...rest}
    >
      {placeholder ? (
        <option value="" disabled>
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';
