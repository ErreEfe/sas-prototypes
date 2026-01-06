import React, { useState, useEffect, useCallback } from 'react';
import Drawer from './Drawer';
import Alert from './Alert';
import { SpinnerIcon } from './icons';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { PrestacionData } from '../utils/prestaciones-helpers';

interface CancelarPrestacionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
}

const CancelarPrestacionDrawer: React.FC<CancelarPrestacionDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
}) => {
  const { handleCancelarPrestacion } = usePrestaciones();
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMotivo('');
      setError('');
      setIsSaving(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isSaving) return;
    onClose();
  }, [onClose, isSaving]);

  const handleSave = async () => {
    setError('');
    if (!motivo.trim()) {
      setError('Debe ingresar un motivo para la cancelación.');
      return;
    }
    if (prestacion) {
      setIsSaving(true);
      try {
        await handleCancelarPrestacion(prestacion.id, motivo);
        onClose();
      } catch (e) {
        setError('Ocurrió un error al cancelar la prestación.');
        setIsSaving(false);
      }
    }
  };

  if (!prestacion) return null;

  const footer = (
    <>
      <button
        onClick={handleClose}
        disabled={isSaving}
        className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition disabled:bg-background-alt disabled:cursor-not-allowed"
      >
        Volver
      </button>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-6 py-2 justify-center flex items-center bg-status-error-text text-text-on-primary font-medium rounded-full hover:brightness-90 transition disabled:bg-text-tertiary disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <SpinnerIcon className="w-5 h-5" />
        ) : (
          'Confirmar Cancelación'
        )}
      </button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title="Cancelar Prestación"
      footerContent={footer}
    >
      <div className="px-6 pb-6 space-y-6 pt-0">
        {error && <Alert message={error} />}

        <div className="p-4 bg-background-alt rounded-lg border space-y-3">
          <div>
            <p className="text-sm font-medium text-text-secondary">Afiliado</p>
            <p className="font-semibold text-text-primary">
              {prestacion.afiliado.nombre} (DNI: {prestacion.afiliado.dni})
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">
              Nro. Denuncia
            </p>
            <p className="font-mono text-sm text-text-primary">
              {prestacion.denuncia}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-text-secondary">
              Prestación
            </p>
            <p className="text-text-primary">{prestacion.prestacion}</p>
          </div>
        </div>

        <div>
          <label
            htmlFor="cancelar-motivo"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Motivo de Cancelación <span className="text-red-600">*</span>
          </label>
          <textarea
            id="cancelar-motivo"
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            placeholder="Ej: A pedido del paciente, error de carga..."
            rows={4}
            className="w-full bg-surface text-text-primary pl-4 pr-4 py-3 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus-ring focus:border-transparent transition placeholder:text-text-placeholder"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default CancelarPrestacionDrawer;
