import React from 'react';
import { Alert as UIAlert, AlertTitle, AlertDescription } from './ui/alert';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/core/lib/utils';

interface AlertProps {
    message?: string;
    title?: string;
    variant?: 'default' | 'destructive' | 'success' | 'warning';
    icon?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const Alert: React.FC<AlertProps> = ({ message, title, variant = 'default', icon, children, className }) => {
    // Determine which icon to show
    const getIcon = () => {
        if (icon) return icon;

        const iconClass = "h-4 w-4";
        switch (variant) {
            case 'destructive':
                return <AlertTriangle className={iconClass} />;
            case 'success':
                return <CheckCircle className={iconClass} />;
            case 'warning':
                return <AlertTriangle className={iconClass} />;
            default:
                return <Info className={iconClass} />;
        }
    };

    return (
        <UIAlert variant={variant} className={cn("relative", className)}>
            {getIcon()}
            {title && <AlertTitle>{title}</AlertTitle>}
            {message ? (
                <AlertDescription>{message}</AlertDescription>
            ) : (
                children
            )}
        </UIAlert>
    );
};

export { Alert, AlertTitle, AlertDescription };
export default Alert;