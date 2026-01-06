import React from 'react';
import type { Meta } from '@storybook/react';
import {
    EmailOutlinedIcon, LockOutlinedIcon, VisibilityIcon, VisibilityOffIcon,
    ErrorIcon, UserIcon, VerificationCodeIcon, CheckCircleIcon, MenuIcon,
    HomeOutlinedIcon, AssignmentOutlinedIcon, RequestQuoteOutlinedIcon,
    LogoutIcon, BookOpenIcon, ClockIcon, EventIcon, EventBusyIcon,
    CancelIcon, EditIcon, EditCalendarIcon, FileUploadIcon, NoteAddIcon,
    StethoscopeArrowIcon, ViewIcon, CloseIcon, ChevronLeftIcon,
    ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, SpinnerIcon,
    FileDownloadIcon, WarningIcon, InfoIcon, TokenIcon, ClipboardIcon,
    CheckIcon, SearchIcon, WheelchairIcon
} from '@/core/components/icons';
import { MousePointerClick, Calendar, User, Settings, ArrowRight, Trash2 } from 'lucide-react';

const meta: Meta = {
    title: '0-Tokens/Icons',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;

export const Gallery = () => {
    const customIcons = {
        EmailOutlinedIcon, LockOutlinedIcon, VisibilityIcon, VisibilityOffIcon,
        ErrorIcon, UserIcon, VerificationCodeIcon, CheckCircleIcon, MenuIcon,
        HomeOutlinedIcon, AssignmentOutlinedIcon, RequestQuoteOutlinedIcon,
        LogoutIcon, BookOpenIcon, ClockIcon, EventIcon, EventBusyIcon,
        CancelIcon, EditIcon, EditCalendarIcon, FileUploadIcon, NoteAddIcon,
        StethoscopeArrowIcon, ViewIcon, CloseIcon, ChevronLeftIcon,
        ChevronRightIcon, ChevronUpIcon, ChevronDownIcon, SpinnerIcon,
        FileDownloadIcon, WarningIcon, InfoIcon, TokenIcon, ClipboardIcon,
        CheckIcon, SearchIcon, WheelchairIcon
    };

    const lucideIcons = {
        MousePointerClick, Calendar, User, Settings, ArrowRight, Trash2
    };

    const IconGrid = ({ icons, title }: { icons: Record<string, React.FC<{ className?: string }>>, title: string }) => (
        <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-primary">{title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(icons).map(([name, Icon]) => (
                    <div key={name} className="flex flex-col items-center justify-center p-4 border rounded-lg hover:border-primary hover:bg-slate-50 transition group">
                        <Icon className="w-8 h-8 mb-3 text-slate-600 group-hover:text-primary transition-colors" />
                        <span className="text-xs text-slate-500 text-center break-all">{name}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8 border-b pb-4">
                <h2 className="text-3xl font-bold text-slate-900">Iconography</h2>
                <p className="text-slate-600 mt-2">
                    Colección de iconos utilizados en la aplicación. Incluye iconos personalizados (Custom SVG) y una selección de iconos de Lucide React.
                </p>
            </div>

            <IconGrid icons={customIcons} title="Custom Icons (src/core/components/icons.tsx)" />

            <div className="bg-blue-50 p-6 rounded-lg mb-10">
                <h3 className="text-lg font-bold text-blue-800 mb-2">Uso recomendado</h3>
                <p className="text-blue-700 text-sm mb-4">
                    Para nuevos iconos, preferimos usar la librería <code>lucide-react</code> por su consistencia y variedad.
                    Solo crear iconos custom si no existe una alternativa adecuada.
                </p>
                <pre className="bg-white p-3 rounded border border-blue-200 text-xs overflow-x-auto">
                    <code>{`import { Home } from 'lucide-react';\n\n<Home className="w-5 h-5" />`}</code>
                </pre>
            </div>

            <IconGrid icons={lucideIcons} title="Common Lucide Icons" />
        </div>
    );
};
