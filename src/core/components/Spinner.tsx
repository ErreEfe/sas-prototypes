import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/core/lib/utils';

interface SpinnerProps {
    className?: string;
    variant?: 'default' | 'page' | 'container' | 'overlay';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    text?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
    className,
    variant = 'default',
    size = 'md',
    text
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const spinnerContent = (
        <div className="flex flex-col items-center gap-3">
            <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
            {text && <p className="text-sm text-muted-foreground font-medium animate-pulse">{text}</p>}
        </div>
    );

    if (variant === 'page') {
        return (
            <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
                {spinnerContent}
            </div>
        );
    }

    if (variant === 'overlay') {
        return (
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-background/50 backdrop-blur-[1px] z-10 rounded-inherit">
                {spinnerContent}
            </div>
        );
    }

    if (variant === 'container') {
        return (
            <div className="w-full h-full min-h-[200px] flex items-center justify-center p-8">
                {spinnerContent}
            </div>
        );
    }

    return <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />;
};
