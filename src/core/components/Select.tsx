import React from 'react';
import { ChevronDownIcon } from './icons';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  options: { value: string | number; label: string }[];
  placeholder?: string;
  error?: boolean;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  placeholder,
  error,
  ...props
}) => {
  const baseClasses = `w-full appearance-none pl-4 pr-12 py-3 rounded-md border bg-background text-foreground placeholder:text-muted-foreground border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition disabled:cursor-not-allowed disabled:opacity-50`;

  const stateClasses = error
    ? 'border-destructive'
    : 'border-input';

  return (
    <div className="relative">
      <select id={id} {...props} className={`${baseClasses} ${stateClasses}`}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
      </div>
    </div>
  );
};

export default Select;
