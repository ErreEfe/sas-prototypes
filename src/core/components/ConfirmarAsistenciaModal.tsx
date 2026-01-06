import React, { useState, useEffect } from 'react';
import { SpinnerIcon } from './icons';
import Input from './Input';
import Alert from './Alert';
import type { PrestacionData } from '../utils/prestaciones-helpers';

interface ConfirmarAsistenciaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
  prestacion: PrestacionData | null;
  isConfirming: boolean;
}

const ConfirmarAsistenciaModal: React.FC<ConfirmarAsistenciaModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  prestacion,
  isConfirming,
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen || !prestacion) return null;

  const handleConfirmClick = () => {
    if (!code.trim()) {
      setError('Debe ingresar el código de confirmación del paciente.');
      return;
    }
    setError('');
    onConfirm(code);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="bg-surface rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2
          id="confirm-modal-title"
          className="text-2xl font-bold text-primary-dark mb-2"
        >
          Confirmar Asistencia
        </h2>
        <p className="text-text-secondary mb-6">
          Por favor, ingrese el código proporcionado por el paciente para
          confirmar el turno.
        </p>

        <div className="p-4 bg-background-alt rounded-lg border mb-6 text-sm">
          <p className="font-medium text-text-secondary">Afiliado</p>
          <p className="font-semibold text-text-primary">
            {prestacion.afiliado.nombre}
          </p>
          <p className="text-text-secondary mt-2">Prestación</p>
          <p className="font-semibold text-text-primary">
            {prestacion.prestacion}
          </p>
        </div>

        {error && (
          <div className="mb-4">
            <Alert message={error} />
          </div>
        )}

        <div>
          <label
            htmlFor="confirmation-code"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Código de Confirmación
          </label>
          <Input
            id="confirmation-code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Ingrese el código aquí"
            required
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={isConfirming}
            className="px-6 py-2 w-36 justify-center flex items-center bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition disabled:bg-text-tertiary disabled:cursor-not-allowed"
          >
            {isConfirming ? <SpinnerIcon className="w-5 h-5" /> : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarAsistenciaModal;
