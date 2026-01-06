import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react';
import Input from './Input';
import { SearchIcon } from './icons';

interface AutocompleteProps<T> {
  id: string;
  label: string;
  placeholder: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  value: T | null;
  onChange: (value: T | null) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
  disabled?: boolean;
}

const Autocomplete = <T extends object>({
  id,
  label,
  placeholder,
  options,
  getOptionLabel,
  getOptionValue,
  value,
  onChange,
  inputValue,
  onInputChange,
  disabled = false,
}: AutocompleteProps<T>) => {
  const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  const filterOptions = useCallback(
    (term: string) => {
      if (term.trim() === '') {
        setFilteredOptions([]);
        setIsOpen(false);
      } else {
        const lowercasedTerm = term.toLowerCase();
        const filtered = options.filter(option =>
          getOptionLabel(option).toLowerCase().includes(lowercasedTerm),
        );
        setFilteredOptions(filtered);
        setIsOpen(true);
        setHighlightedIndex(-1); // Reset highlight when options change
      }
    },
    [options, getOptionLabel],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (value) {
          onInputChange(getOptionLabel(value));
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, getOptionLabel, onInputChange]);

  useEffect(() => {
    if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [highlightedIndex, filteredOptions.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    onInputChange(newInputValue);
    if (value) {
      onChange(null);
    }
    filterOptions(newInputValue);
  };

  const handleOptionClick = (option: T) => {
    onChange(option);
    onInputChange(getOptionLabel(option));
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prevIndex =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prevIndex =>
          prevIndex > 0 ? prevIndex - 1 : 0,
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const renderOption = (option: T) => {
    const label = getOptionLabel(option);
    const matchIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
    if (matchIndex === -1 || !inputValue) {
      return label;
    }
    const before = label.slice(0, matchIndex);
    const match = label.slice(matchIndex, matchIndex + inputValue.length);
    const after = label.slice(matchIndex + inputValue.length);
    return (
      <span>
        {before}
        <span className="font-bold">{match}</span>
        {after}
      </span>
    );
  };

  return (
    <div ref={wrapperRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-primary mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            filterOptions(inputValue);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          endAdornment={
            <div className="pointer-events-none">
              <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          }
          required
          autoComplete="off"
          disabled={disabled}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-20 w-full bg-popover text-foreground border border-border rounded-md mt-1 max-h-48 overflow-y-auto shadow-lg">
            {filteredOptions.map((option, index) => (
              <li
                key={getOptionValue(option)}
                ref={el => { optionRefs.current[index] = el; }}
                className={`px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground ${index === highlightedIndex ? 'bg-accent text-accent-foreground' : ''
                  }`}
                onMouseDown={() => handleOptionClick(option)}
              >
                <div className="text-sm">
                  {renderOption(option)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
