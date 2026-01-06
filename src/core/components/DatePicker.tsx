import React, { useState, useEffect, useRef } from 'react';
import {
  EventIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from './icons';

interface DatePickerProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const datePickerRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];
  const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ];

  useEffect(() => {
    if (value) {
      setViewDate(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(newDate);
    setIsOpen(false);
  };

  const changeMonth = (offset: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + offset);
      return newDate;
    });
  };

  const changeYear = (offset: number) => {
    setViewDate(prev => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + offset);
      return newDate;
    });
  };

  const handleToday = () => {
    const today = new Date();
    setViewDate(today);
    onChange(today);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange(null);
    setIsOpen(false);
  };

  const renderCalendarGrid = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for Monday start: (0 is Sunday, so we shift it to 6)
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const grid: (number | null)[] = Array(startOffset).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(i);
    }

    const today = new Date();
    const isCurrentMonth =
      today.getFullYear() === year && today.getMonth() === month;

    return grid.map((day, index) => {
      if (day === null) {
        return <div key={`empty-${index}`} className="w-10 h-10"></div>;
      }

      const isSelected =
        value &&
        value.getDate() === day &&
        value.getMonth() === month &&
        value.getFullYear() === year;
      const isToday = isCurrentMonth && today.getDate() === day;

      return (
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors
                        ${isSelected ? 'bg-text-primary text-text-on-primary font-bold' : 'text-text-primary'}
                        ${!isSelected && isToday ? 'border-2 border-primary' : ''}
                        ${!isSelected ? 'hover:bg-background-alt' : ''}
                    `}
        >
          {day}
        </button>
      );
    });
  };

  const formattedDate = value
    ? value.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '';

  return (
    <div className="relative" ref={datePickerRef}>
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          readOnly
          value={formattedDate}
          placeholder={placeholder}
          className="w-full bg-surface text-text-primary pl-4 pr-12 py-3 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus-ring focus:border-transparent transition placeholder:text-text-placeholder cursor-pointer"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <EventIcon className="h-5 w-5 text-text-tertiary" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-1 rounded-full text-text-secondary hover:bg-background-alt"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 text-text-primary">
              <span className="font-semibold capitalize">
                {monthNames[viewDate.getMonth()]}
              </span>
              <span className="font-semibold">de {viewDate.getFullYear()}</span>
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="p-1 rounded-full text-text-secondary hover:bg-background-alt"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <button
                onClick={() => changeYear(-1)}
                className="p-1 rounded-full text-text-secondary hover:bg-background-alt"
              >
                <ChevronDownIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => changeYear(1)}
                className="p-1 rounded-full text-text-secondary hover:bg-background-alt"
              >
                <ChevronUpIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-text-secondary mb-2">
            {daysOfWeek.map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">{renderCalendarGrid()}</div>
          <div className="flex justify-between mt-4 pt-2 border-t">
            <button
              onClick={handleClear}
              className="text-sm font-medium text-primary hover:underline"
            >
              Borrar
            </button>
            <button
              onClick={handleToday}
              className="text-sm font-medium text-primary hover:underline"
            >
              Hoy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
