import React, { useState, useEffect, useCallback } from 'react';
import Drawer from './Drawer';
import DatePicker from './DatePicker';
import Alert from './Alert';
import { SpinnerIcon } from './icons';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { PrestacionData } from '../utils/prestaciones-helpers';

interface EditarTurnoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
}

const EditarTurnoDrawer: React.FC<EditarTurnoDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
}) => {
  const { handleSaveTurno } = usePrestaciones();
  const [turno, setTurno] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const isReprogramming = !!prestacion?.turno;
  const title = isReprogramming ? 'Reprogramar Turno' : 'Asignar Turno';

  const resetForm = useCallback(() => {
    setTurno(null);
    setError('');
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isOpen && prestacion) {
      if (prestacion.turno) {
        setTurno(new Date(prestacion.turno));
      } else {
        setTurno(null);
      }
      setError('');
      setIsSaving(false);
    }
  }, [isOpen, prestacion]);

  const handleClose = useCallback(() => {
    if (isSaving) return;
    onClose();
  }, [onClose, isSaving]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
    if (isOpen && prestacion) {
      if (prestacion.turno) {
        setTurno(new Date(prestacion.turno));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, prestacion]);

  const handleSave = async () => {
    if (!turno) {
      setError('Debe seleccionar una fecha para el turno.');
      return;
    }
    if (prestacion) {
      setIsSaving(true);
      try {
        await handleSaveTurno(prestacion.id, turno);
        onClose();
      } catch (e) {
        setError('Ocurrió un error al guardar el turno.');
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
        {isSaving ? <SpinnerIcon className="w-5 h-5" /> : 'Guardar Turno'}
      </button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title={title}
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
            htmlFor="editar-turno-datepicker"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha de Turno <span className="text-red-600">*</span>
          </label>
          <DatePicker
            value={turno}
            onChange={setTurno}
            placeholder="dd/mm/aaaa"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default EditarTurnoDrawer;
