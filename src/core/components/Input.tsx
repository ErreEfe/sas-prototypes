import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  helpText?: string;
  error?: string;
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ 
  id, 
  label, 
  helpText, 
  error, 
  icon,
  endAdornment, 
  className,
  ...props 
}) => {
  const hasIcon = !!icon;
  const hasEndAdornment = !!endAdornment;
  const hasError = !!error;

  const baseClasses = `flex h-10 w-full bg-background text-foreground ${hasIcon ? 'pl-10' : 'pl-3'} ${hasEndAdornment ? 'pr-10' : 'pr-3'} py-2 border rounded-md ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`;

  const stateClasses = hasError
    ? 'border-destructive'
    : 'border-input';

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-text-primary mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {hasIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-text-secondary">
            {icon}
          </div>
        )}
        <input 
          id={id} 
          {...props} 
          className={`${baseClasses} ${stateClasses} ${className || ''}`} 
        />
        {hasEndAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {endAdornment}
          </div>
        )}
      </div>
      {helpText && !hasError && (
        <p className="mt-2 text-sm text-text-secondary">
          {helpText}
        </p>
      )}
      {hasError && (
        <p className="mt-2 text-sm text-status-error-text">
          {error}
        </p>
      )}
    </div>
  );
};

export { Input };
export default Input;
