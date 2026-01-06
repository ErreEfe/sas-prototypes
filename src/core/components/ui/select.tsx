import * as React from 'react';
import { cn } from '@/core/lib/utils';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, options, placeholder, error, className, containerClassName, ...props }, ref) => {
    const base = 'flex h-10 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-10 py-2 text-base text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';
    const state = error ? 'border-destructive' : 'border-input';

    return (
      <div className={cn('relative', containerClassName)}>
        <select id={id} ref={ref} className={cn(base, state, className)} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.1 1.02l-4.25 4.5a.75.75 0 0 1-1.1 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </div>
    );
  }
);
Select.displayName = 'Select';

export default Select;
