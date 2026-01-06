import React, { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { Button } from './ui/button';

interface EmptyStateProps {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
    children?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No se encontraron resultados',
    description = 'Intenta ajustar los filtros o buscar con otros términos.',
    icon,
    action,
    className,
    children,
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center justify-center p-8 text-center min-h-[300px] border-2 border-dashed border-border/50 rounded-lg bg-card/50",
            className
        )}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                {icon || <Search className="h-10 w-10 text-muted-foreground" />}
            </div>

            <h3 className="text-xl font-semibold tracking-tight text-foreground mb-2">
                {title}
            </h3>

            <p className="text-muted-foreground max-w-sm mb-6">
                {description}
            </p>

            {children}

            {action && (
                <Button onClick={action.onClick} className="mt-2">
                    {action.label}
                </Button>
            )}
        </div>
    );
};
