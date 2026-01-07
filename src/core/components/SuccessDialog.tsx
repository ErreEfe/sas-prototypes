import React from 'react';
import { CheckCircleIcon } from './icons';

interface SuccessDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  isOpen,
  onConfirm,
  title = "¡Cuenta activada exitosamente!",
  description = "Ahora puedes iniciar sesión con tu nueva contraseña.",
  buttonText = "Iniciar Sesión"
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-surface rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-200">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="w-16 h-16 text-status-success-icon" />
        </div>
        <h2 className="text-2xl font-bold text-primary-dark mb-2">
          {title}
        </h2>
        <p className="text-text-secondary mb-6">
          {description}
        </p>
        <button
          onClick={onConfirm}
          className="w-full bg-primary text-text-on-primary font-medium py-3 px-4 rounded-full hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-focus-ring transition duration-300 ease-in-out shadow-lg shadow-primary/20"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessDialog;
