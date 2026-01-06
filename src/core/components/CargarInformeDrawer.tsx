import React, { useState, useEffect, useCallback, useRef } from 'react';
import Drawer from './Drawer';
import { NoteAddIcon, SpinnerIcon } from './icons';
import Alert from './Alert';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { PrestacionData } from '../utils/prestaciones-helpers';

interface CargarInformeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
}

const CargarInformeDrawer: React.FC<CargarInformeDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
}) => {
  const { handleSaveInforme } = usePrestaciones();
  const [informe, setInforme] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = useCallback(() => {
    setInforme(null);
    setError('');
    setIsSaving(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleClose = useCallback(() => {
    if (isSaving) return;
    onClose();
  }, [onClose, isSaving]);

  const handleSave = async () => {
    if (!informe) {
      setError('Debe seleccionar un archivo PDF para cargar.');
      return;
    }
    if (prestacion) {
      setIsSaving(true);
      try {
        await handleSaveInforme(prestacion.id, informe);
        onClose();
      } catch (e) {
        setError('Ocurrió un error al guardar el informe.');
        setIsSaving(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setInforme(file);
        setError('');
      } else {
        setError('Solo se permiten archivos en formato PDF.');
        setInforme(null);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setInforme(file);
        setError('');
      } else {
        setError('Solo se permiten archivos en formato PDF.');
        setInforme(null);
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
        disabled={!informe || isSaving}
        className="px-6 py-2 justify-center flex items-center bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition disabled:bg-text-tertiary disabled:cursor-not-allowed"
      >
        {isSaving ? <SpinnerIcon className="w-5 h-5" /> : 'Guardar Informe'}
      </button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title="Cargar Informe"
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
            htmlFor="file-upload"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Archivo de Informe (PDF) <span className="text-red-600">*</span>
          </label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-strong border-dashed rounded-md cursor-pointer hover:border-primary"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ')
                fileInputRef.current?.click();
            }}
          >
            <div className="space-y-1 text-center">
              <NoteAddIcon className="mx-auto h-12 w-12 text-text-tertiary" />
              {informe ? (
                <p className="text-sm text-text-secondary font-medium">
                  {informe.name}
                </p>
              ) : (
                <div className="flex text-sm text-text-secondary justify-center">
                  <p className="pl-1">Arrastra y suelta un archivo, o</p>
                  <button
                    type="button"
                    className="relative bg-surface rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-focus-ring ml-1"
                    onClick={e => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <span>selecciona uno</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
              )}
              <p className="text-xs text-text-secondary">
                Solo se permiten archivos PDF
              </p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CargarInformeDrawer;
