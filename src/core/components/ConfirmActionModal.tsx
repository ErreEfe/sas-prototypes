import React from 'react';
import { WarningIcon } from './icons';
import { Button } from './ui/button';

interface ConfirmActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
}

const ConfirmActionModal: React.FC<ConfirmActionModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Continuar',
    cancelText = 'Cancelar',
    variant = 'default'
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className={`p-4 rounded-full flex-shrink-0 ${variant === 'destructive' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            <WarningIcon className="h-10 w-10" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                            <p className="text-gray-500 leading-relaxed">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-center gap-3 border-t">
                    <Button variant="outline" onClick={onClose} className="rounded-full px-8 py-6 h-auto text-base order-2 sm:order-1">
                        {cancelText}
                    </Button>
                    <Button
                        variant={variant === 'destructive' ? 'destructive' : 'default'}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="rounded-full px-8 py-6 h-auto text-base order-1 sm:order-2 shadow-lg shadow-primary/20"
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;
