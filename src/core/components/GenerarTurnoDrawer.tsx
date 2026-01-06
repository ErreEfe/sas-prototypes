import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Drawer from './Drawer';
import Input from './Input';
import Alert from './Alert';
import DatePicker from './DatePicker';
import { SpinnerIcon } from './icons';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { Afiliado } from '../utils/prestaciones-helpers';
import Autocomplete from './Autocomplete';
import Select from './Select';

interface GenerarTurnoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  initialAfiliado?: Afiliado | null;
}

const GenerarTurnoDrawer: React.FC<GenerarTurnoDrawerProps> = ({
  isOpen,
  onClose,
  triggerRef,
  initialAfiliado,
}) => {
  const { uniqueAfiliados, prestaciones, cie10Codes, handleSavePrestacion } =
    usePrestaciones();
  const [selectedAfiliado, setSelectedAfiliado] = useState<Afiliado | null>(
    null,
  );
  const [afiliadoInputValue, setAfiliadoInputValue] = useState('');
  const [denuncia, setDenuncia] = useState('');
  const [selectedPrestacionObj, setSelectedPrestacionObj] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [prestacionInputValue, setPrestacionInputValue] = useState('');
  const [selectedCie10Obj, setSelectedCie10Obj] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [cie10InputValue, setCie10InputValue] = useState('');
  const [observacion, setObservacion] = useState('');
  const [turno, setTurno] = useState<Date | null>(null);
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = useCallback(() => {
    setSelectedAfiliado(null);
    setAfiliadoInputValue('');
    setDenuncia('');
    setSelectedPrestacionObj(null);
    setPrestacionInputValue('');
    setSelectedCie10Obj(null);
    setCie10InputValue('');
    setObservacion('');
    setTurno(null);
    setError('');
    setIsSaving(false);
  }, []);

  const handleClose = useCallback(() => {
    if (isSaving) return;
    onClose();
  }, [onClose, isSaving]);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      if (initialAfiliado) {
        setSelectedAfiliado(initialAfiliado);
        setAfiliadoInputValue(
          `${initialAfiliado.nombre} (DNI: ${initialAfiliado.dni})`,
        );
      }
    }
  }, [isOpen, resetForm, initialAfiliado]);

  const handleSave = async () => {
    setError('');
    const prestacionValue = selectedPrestacionObj?.value;
    const cie10Value = selectedCie10Obj?.value;
    if (
      !selectedAfiliado ||
      !prestacionValue ||
      !cie10Value ||
      !denuncia.trim()
    ) {
      setError(
        'Debe completar todos los campos obligatorios: afiliado, denuncia, prestación y CIE10.',
      );
      return;
    }
    setIsSaving(true);
    try {
      await handleSavePrestacion({
        afiliado: selectedAfiliado,
        denuncia: denuncia.trim(),
        prestacion: prestacionValue,
        cie10: cie10Value,
        observacion,
        turno: turno ? turno.toISOString() : null,
      });
      onClose();
    } catch (e) {
      setError('Ocurrió un error al guardar el turno.');
      setIsSaving(false);
    }
  };

  const prestacionOptions = useMemo(
    () => [...prestaciones.map(p => ({ value: p, label: p }))],
    [prestaciones],
  );

  const cie10Options = useMemo(
    () => [...cie10Codes.map(c => ({ value: c.code, label: `${c.code} - ${c.description}` }))],
    [cie10Codes],
  );

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
        {isSaving ? <SpinnerIcon className="w-5 h-5" /> : 'Confirmar'}
      </button>
    </>
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title="Cargar Prestación"
      footerContent={footer}
    >
      <div className="px-6 pb-6 space-y-6 pt-0">
        {error && <Alert message={error} />}

        <Autocomplete
          id="afiliado-search"
          label="Afiliado *"
          placeholder="Buscar por Nombre, Apellido o DNI"
          options={uniqueAfiliados}
          getOptionLabel={option => `${option.nombre} (DNI: ${option.dni})`}
          getOptionValue={option => option.dni}
          value={selectedAfiliado}
          // FIX: Wrapped state setter in a lambda to ensure correct type inference for the Autocomplete component.
          onChange={value => setSelectedAfiliado(value)}
          inputValue={afiliadoInputValue}
          onInputChange={setAfiliadoInputValue}
          disabled={!!initialAfiliado}
        />

        <div>
          <label
            htmlFor="denuncia"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Nro. Denuncia <span className="text-red-600">*</span>
          </label>
          <Input
            id="denuncia"
            type="text"
            value={denuncia}
            onChange={e => setDenuncia(e.target.value)}
            placeholder="Ej: 02620747/001/00"
            required
          />
        </div>

        <div>
          <label
            htmlFor="prestacion"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Prestación <span className="text-red-600">*</span>
          </label>
          <Autocomplete
            id="prestacion"
            label=""
            placeholder="Seleccione una prestación"
            options={prestacionOptions}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            value={selectedPrestacionObj}
            // FIX: Wrapped state setter in a lambda to ensure correct type inference for the Autocomplete component.
            onChange={value => setSelectedPrestacionObj(value)}
            inputValue={prestacionInputValue}
            onInputChange={setPrestacionInputValue}
          />
        </div>

        <div>
          <label
            htmlFor="cie10"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            CIE 10 <span className="text-red-600">*</span>
          </label>
          <Autocomplete
            id="cie10"
            label=""
            placeholder="Seleccione un código"
            options={cie10Options}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            value={selectedCie10Obj}
            // FIX: Wrapped state setter in a lambda to ensure correct type inference for the Autocomplete component.
            onChange={value => setSelectedCie10Obj(value)}
            inputValue={cie10InputValue}
            onInputChange={setCie10InputValue}
          />
        </div>

        <div>
          <label
            htmlFor="observacion"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Observación
          </label>
          <textarea
            id="observacion"
            value={observacion}
            onChange={e => setObservacion(e.target.value)}
            placeholder="Añadir observación (opcional)..."
            rows={4}
            className="w-full bg-surface text-text-primary pl-4 pr-4 py-3 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus-ring focus:border-transparent transition placeholder:text-text-placeholder"
          />
        </div>

        <div>
          <label
            htmlFor="turno"
            className="block text-sm font-medium text-text-primary mb-1"
          >
            Fecha de Turno (Opcional)
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

export default GenerarTurnoDrawer;
