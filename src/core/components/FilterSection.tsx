import React, { ReactNode } from 'react';
import { Button } from './ui/button';
import { cn } from '@/core/lib/utils';

interface FilterSectionProps {
    children: ReactNode;
    onSearch?: () => void;
    onClear?: () => void;
    searchLabel?: string;
    clearLabel?: string;
    className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    children,
    onSearch,
    onClear,
    searchLabel = 'Buscar',
    clearLabel = 'Limpiar filtros',
    className,
}) => {
    return (
        <div
            className={cn(
                "bg-card text-card-foreground border border-border p-6 rounded-lg shadow-md mb-6 animate-in slide-in-from-top-2 fade-in duration-500",
                className
            )}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {children}
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClear}
                    className="h-9 rounded-full px-6"
                >
                    {clearLabel}
                </Button>
                <Button
                    size="sm"
                    onClick={onSearch} // Assuming standard button is primary
                    className="h-9 rounded-full px-8"
                >
                    {searchLabel}
                </Button>
            </div>
        </div>
    );
};

export default FilterSection;
