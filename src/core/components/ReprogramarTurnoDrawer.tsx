import React, { useState, useEffect, useCallback } from 'react';
import Drawer from './Drawer';
import DatePicker from './DatePicker';
import Alert from './Alert';
import { SpinnerIcon } from './icons';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { PrestacionData } from '../utils/prestaciones-helpers';

interface ReprogramarTurnoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
}

const ReprogramarTurnoDrawer: React.FC<ReprogramarTurnoDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
}) => {
  const { handleReprogramarTurno } = usePrestaciones();
  const [turno, setTurno] = useState<Date | null>(null);
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && prestacion) {
      setTurno(prestacion.turno ? new Date(prestacion.turno) : null);
      setMotivo('');
      setError('');
      setIsSaving(false);
    }
  }, [isOpen, prestacion]);

  const handleClose = useCallback(() => {
    if (isSaving) return;
    onClose();
  }, [onClose, isSaving]);

  const handleSave = async () => {
    setError('');
    if (!turno) {
      setError('Debe seleccionar una nueva fecha para el turno.');
      return;
    }
    if (!motivo.trim()) {
      setError('Debe ingresar un motivo para la reprogramación.');
      return;
    }
    if (prestacion) {
      setIsSaving(true);
      try {
        await handleReprogramarTurno(prestacion.id, turno, motivo);
        onClose();
      } catch (e) {
        setError('Ocurrió un error al reprogramar el turno.');
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
        Cancelar
      </button>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-6 py-2 justify-center flex items-center bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition disabled:bg-text-tertiary disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <SpinnerIcon className="w-5 h-5" />
        ) : (
          'Confirmar Reprogramación'
        )}
      </button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title="Reprogramar Turno"
      footerContent={footer}
    >
      <div className="px-6 pb-6 space-y-6 pt-0">
        {error && <Alert message={error} />}

        <div className="p-4 bg-background-alt rounded-lg border">
          <p className="text-sm font-medium text-text-secondary">Afiliado</p>
          <p className="font-semibold text-text-primary">
            {prestacion.afiliado.nombre}
          </p>
          <p className="text-sm text-text-secondary">
            DNI: {prestacion.afiliado.dni}
          </p>
          <p className="text-sm font-medium text-text-secondary mt-2">
            Prestación
          </p>
          <p className="text-text-primary">{prestacion.prestacion}</p>
        </div>

        <div>
          <label
            htmlFor="reprogramar-turno-datepicker"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Nueva Fecha de Turno <span className="text-red-600">*</span>
          </label>
          <DatePicker
            value={turno}
            onChange={setTurno}
            placeholder="dd/mm/aaaa"
          />
        </div>
        <div>
          <label
            htmlFor="reprogramar-motivo"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Motivo de Reprogramación <span className="text-red-600">*</span>
          </label>
          <textarea
            id="reprogramar-motivo"
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            placeholder="Ej: A pedido del paciente, conflicto de agenda..."
            rows={4}
            className="w-full bg-surface text-text-primary pl-4 pr-4 py-3 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus-ring focus:border-transparent transition placeholder:text-text-placeholder"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ReprogramarTurnoDrawer;
