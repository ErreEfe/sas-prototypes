import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Drawer from './Drawer';
import Alert from './Alert';
import Input from './Input';
import { SpinnerIcon, NoteAddIcon } from './icons';
import { usePrestaciones } from '@/core/contexts/PrestacionesContext';
import type { PrestacionData } from '../utils/prestaciones-helpers';
import Select from './Select';
import Autocomplete from './Autocomplete';

interface AgregarPrestacionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prestacion: PrestacionData | null;
  triggerRef: React.RefObject<HTMLElement>;
}

type Step = 'datos' | 'traslado' | 'confirmacion';
type OpcionesTraslado = {
  espera: boolean;
  sillaDeRueda: boolean;
  movilGrande: boolean;
  acompanante: boolean;
};

// --- Custom Checkbox for this form ---
const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ label, checked, onChange }) => (
  <label className="flex items-center text-sm font-medium text-text-primary cursor-pointer">
    <div className="relative flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div
        className={`w-5 h-5 border rounded-md flex-shrink-0 flex items-center justify-center transition-colors
                ${checked ? 'bg-status-success-icon border-status-success-icon' : 'bg-surface border-border-strong'}`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 14 11"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path
              d="M1 5.5L4.95263 9.45263L13.4053 1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
    <span className="ml-2">{label}</span>
  </label>
);

const AgregarPrestacionDrawer: React.FC<AgregarPrestacionDrawerProps> = ({
  isOpen,
  onClose,
  prestacion,
  triggerRef,
}) => {
  const { prestaciones: prestacionList, handleAddRelatedPrestacion } =
    usePrestaciones();
  const [step, setStep] = useState<Step>('datos');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Step 1: Datos state
  const [selectedPrestacionObj, setSelectedPrestacionObj] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [prestacionInputValue, setPrestacionInputValue] = useState('');
  const [observacion, setObservacion] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [documentoAdjunto, setDocumentoAdjunto] = useState<File | null>(null);

  // Step 2: Traslado state
  const [requiereTraslado, setRequiereTraslado] = useState(false);
  const [tipoViaje, setTipoViaje] = useState('Solo ida');
  const [medio, setMedio] = useState('Remis');
  const [opcionesTraslado, setOpcionesTraslado] = useState<OpcionesTraslado>({
    espera: false,
    sillaDeRueda: false,
    movilGrande: false,
    acompanante: false,
  });
  const [direccionOrigen, setDireccionOrigen] = useState('Av. Corrientes 1234');
  const [localidadOrigen, setLocalidadOrigen] = useState('CABA - Buenos Aires');
  const [direccionDestino, setDireccionDestino] = useState(
    'Hospital Italiano, Gascón 450',
  );
  const [localidadDestino, setLocalidadDestino] = useState('Almagro, CABA');
  const [observacionesTraslado, setObservacionesTraslado] = useState('');

  // General state
  const [error, setError] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = useCallback(() => {
    setStep('datos');
    setSelectedPrestacionObj(null);
    setPrestacionInputValue('');
    setObservacion('');
    setCantidad(1);
    setDocumentoAdjunto(null);
    setRequiereTraslado(false);
    setTipoViaje('Solo ida');
    setMedio('Remis');
    setOpcionesTraslado({
      espera: false,
      sillaDeRueda: false,
      movilGrande: false,
      acompanante: false,
    });
    setDireccionOrigen('Av. Corrientes 1234');
    setLocalidadOrigen('CABA - Buenos Aires');
    setDireccionDestino('Hospital Italiano, Gascón 450');
    setLocalidadDestino('Almagro, CABA');
    setObservacionesTraslado('');
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

  const handleNext = () => {
    setError('');
    if (step === 'datos') {
      if (!selectedPrestacionObj) {
        setError('Debe seleccionar una prestación.');
        return;
      }
      if (cantidad < 1) {
        setError('La cantidad debe ser de al menos 1.');
        return;
      }
      setStep('traslado');
    } else if (step === 'traslado') {
      if (requiereTraslado) {
        if (
          !tipoViaje ||
          !medio ||
          !direccionOrigen ||
          !localidadOrigen ||
          !direccionDestino ||
          !localidadDestino
        ) {
          setError(
            'Por favor, complete todos los campos obligatorios del traslado.',
          );
          return;
        }
      }
      setStep('confirmacion');
    }
  };

  const handleBack = () => {
    setError('');
    if (step === 'confirmacion') setStep('traslado');
    else if (step === 'traslado') setStep('datos');
  };

  const handleSave = async () => {
    if (prestacion && selectedPrestacionObj) {
      setIsSaving(true);
      try {
        await handleAddRelatedPrestacion(prestacion.id, {
          prestacion: selectedPrestacionObj.value,
          observacion,
          cantidad,
          documentoAdjunto,
          turno: null, // Turno logic not included in this step for simplicity
        });
        onClose();
      } catch (e) {
        setError('Ocurrió un error al agregar la prestación.');
        setIsSaving(false);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setDocumentoAdjunto(file);
        setError('');
      } else {
        setError('Solo se permiten archivos en formato PDF.');
        setDocumentoAdjunto(null);
      }
    }
  };

  const Tab: React.FC<{ title: string; isActive: boolean }> = ({
    title,
    isActive,
  }) => (
    <div
      className={`whitespace-nowrap pb-3 pt-1 px-1 border-b-2 text-sm font-medium ${isActive ? 'border-primary text-primary' : 'border-transparent text-text-secondary'}`}
    >
      {title}
    </div>
  );

  const prestacionOptions = useMemo(
    () => [...prestacionList.map(p => ({ value: p, label: p }))],
    [prestacionList],
  );

  const tipoViajeOptions = [
    { value: 'Solo ida', label: 'Solo ida' },
    { value: 'Ida y vuelta', label: 'Ida y vuelta' },
  ];

  const medioOptions = [
    { value: 'Remis', label: 'Remis' },
    { value: 'Ambulancia', label: 'Ambulancia' },
  ];

  const renderContent = () => {
    switch (step) {
      case 'datos':
        return (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="nueva-prestacion"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Nueva Prestación <span className="text-red-600">*</span>
              </label>
              <Autocomplete
                id="nueva-prestacion"
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
                htmlFor="cantidad"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Cantidad <span className="text-red-600">*</span>
              </label>
              <Input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={e => setCantidad(parseInt(e.target.value, 10) || 1)}
                min="1"
                required
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
                htmlFor="file-upload-related"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Documentación Clínica (PDF, Opcional)
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-border-strong border-dashed rounded-md cursor-pointer hover:border-primary"
              >
                <div className="space-y-1 text-center">
                  <NoteAddIcon className="mx-auto h-12 w-12 text-text-tertiary" />
                  {documentoAdjunto ? (
                    <p className="text-sm text-text-secondary font-medium">
                      {documentoAdjunto.name}
                    </p>
                  ) : (
                    <div className="flex text-sm text-text-secondary justify-center">
                      <p className="pl-1">Arrastra y suelta un archivo, o</p>
                      <span className="relative bg-surface rounded-md font-medium text-primary hover:text-primary-hover ml-1">
                        selecciona uno
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-text-secondary">
                    Solo se permiten archivos PDF
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  id="file-upload-related"
                  name="file-upload-related"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
            </div>
          </div>
        );
      case 'traslado':
        return (
          <div className="space-y-6">
            <Checkbox
              label="Requiere traslado"
              checked={requiereTraslado}
              onChange={setRequiereTraslado}
            />
            {requiereTraslado && (
              <div className="space-y-6 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Tipo de viaje <span className="text-red-600">*</span>
                    </label>
                    <Select
                      id="tipo-viaje"
                      value={tipoViaje}
                      onChange={e => setTipoViaje(e.target.value)}
                      options={tipoViajeOptions}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Medio <span className="text-red-600">*</span>
                    </label>
                    <Select
                      id="medio"
                      value={medio}
                      onChange={e => setMedio(e.target.value)}
                      options={medioOptions}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Checkbox
                    label="Requiere espera"
                    checked={opcionesTraslado.espera}
                    onChange={c =>
                      setOpcionesTraslado(p => ({ ...p, espera: c }))
                    }
                  />
                  <Checkbox
                    label="Silla de rueda"
                    checked={opcionesTraslado.sillaDeRueda}
                    onChange={c =>
                      setOpcionesTraslado(p => ({ ...p, sillaDeRueda: c }))
                    }
                  />
                  <Checkbox
                    label="Móvil Grande"
                    checked={opcionesTraslado.movilGrande}
                    onChange={c =>
                      setOpcionesTraslado(p => ({ ...p, movilGrande: c }))
                    }
                  />
                  <Checkbox
                    label="Acompañante"
                    checked={opcionesTraslado.acompanante}
                    onChange={c =>
                      setOpcionesTraslado(p => ({ ...p, acompanante: c }))
                    }
                  />
                </div>
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="text-md font-semibold text-text-primary">
                    Datos Ida
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Dirección origen <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="dir-origen"
                        type="text"
                        value={direccionOrigen}
                        onChange={e => setDireccionOrigen(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Localidad Origen <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="loc-origen"
                        type="text"
                        value={localidadOrigen}
                        onChange={e => setLocalidadOrigen(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Dirección destino{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="dir-destino"
                        type="text"
                        value={direccionDestino}
                        onChange={e => setDireccionDestino(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-1">
                        Localidad Destino{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <Input
                        id="loc-destino"
                        type="text"
                        value={localidadDestino}
                        onChange={e => setLocalidadDestino(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {tipoViaje === 'Ida y vuelta' && (
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="text-md font-semibold text-text-primary">
                      Datos Vuelta
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Dirección origen
                        </label>
                        <Input
                          id="dir-origen-vuelta"
                          type="text"
                          value={direccionDestino}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Localidad Origen
                        </label>
                        <Input
                          id="loc-origen-vuelta"
                          type="text"
                          value={localidadDestino}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Dirección destino
                        </label>
                        <Input
                          id="dir-destino-vuelta"
                          type="text"
                          value={direccionOrigen}
                          disabled
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Localidad Destino
                        </label>
                        <Input
                          id="loc-destino-vuelta"
                          type="text"
                          value={localidadOrigen}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Observaciones traslado
                  </label>
                  <textarea
                    value={observacionesTraslado}
                    onChange={e => setObservacionesTraslado(e.target.value)}
                    rows={3}
                    className="w-full bg-surface text-text-primary pl-4 pr-4 py-3 border border-border-strong rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-focus-ring focus:border-transparent transition placeholder:text-text-placeholder"
                  />
                </div>
              </div>
            )}
          </div>
        );
      case 'confirmacion':
        const DetailRow: React.FC<{
          label: string;
          value: React.ReactNode;
        }> = ({ label, value }) => (
          <div>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              {label}
            </p>
            <div className="mt-1 text-text-primary">{value}</div>
          </div>
        );
        return (
          <div className="space-y-6">
            <p className="text-sm text-text-secondary">
              Por favor, revise la información antes de confirmar.
            </p>
            <div className="p-4 bg-background-alt rounded-lg border space-y-4">
              <h4 className="text-md font-semibold text-text-primary border-b pb-2">
                Datos de la Prestación
              </h4>
              <DetailRow
                label="Prestación"
                value={
                  <p className="font-semibold">
                    {selectedPrestacionObj?.label}
                  </p>
                }
              />
              <DetailRow
                label="Cantidad"
                value={<p className="font-semibold">{cantidad}</p>}
              />
              {observacion && (
                <DetailRow
                  label="Observación"
                  value={<p className="italic text-sm">{observacion}</p>}
                />
              )}
              {documentoAdjunto && (
                <DetailRow
                  label="Documento Adjunto"
                  value={
                    <p className="text-sm font-mono">{documentoAdjunto.name}</p>
                  }
                />
              )}
            </div>
            {requiereTraslado && (
              <div className="p-4 bg-background-alt rounded-lg border space-y-4">
                <h4 className="text-md font-semibold text-text-primary border-b pb-2">
                  Datos del Traslado
                </h4>
                <DetailRow label="Tipo de Viaje" value={tipoViaje} />
                <DetailRow label="Medio" value={medio} />
                <DetailRow
                  label="Dirección Ida"
                  value={`${direccionOrigen}, ${localidadOrigen} → ${direccionDestino}, ${localidadDestino}`}
                />
                {tipoViaje === 'Ida y vuelta' && (
                  <DetailRow
                    label="Dirección Vuelta"
                    value={`${direccionDestino}, ${localidadDestino} → ${direccionOrigen}, ${localidadOrigen}`}
                  />
                )}
                <DetailRow
                  label="Opciones"
                  value={
                    Object.entries(opcionesTraslado)
                      .filter(([, val]) => val)
                      .map(([key]) => key)
                      .join(', ') || 'Ninguna'
                  }
                />
                {observacionesTraslado && (
                  <DetailRow
                    label="Observaciones"
                    value={observacionesTraslado}
                  />
                )}
              </div>
            )}
          </div>
        );
    }
  };

  const footer = () => {
    const cancelButton = (
      <button
        onClick={handleClose}
        disabled={isSaving}
        className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition disabled:bg-background-alt disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
    );
    const backButton = (
      <button
        onClick={handleBack}
        disabled={isSaving}
        className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition"
      >
        Volver
      </button>
    );
    const nextButton = (
      <button
        onClick={handleNext}
        className="px-6 py-2 bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition"
      >
        Siguiente
      </button>
    );
    const confirmButton = (
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="px-6 py-2 justify-center flex items-center bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition disabled:bg-text-tertiary disabled:cursor-not-allowed"
      >
        {isSaving ? <SpinnerIcon className="w-5 h-5" /> : 'Confirmar'}
      </button>
    );

    switch (step) {
      case 'datos':
        return (
          <>
            {cancelButton}
            {nextButton}
          </>
        );
      case 'traslado':
        return (
          <>
            {backButton}
            {nextButton}
          </>
        );
      case 'confirmacion':
        return (
          <>
            {backButton}
            {confirmButton}
          </>
        );
      default:
        return null;
    }
  };

  if (!prestacion) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      triggerRef={triggerRef}
      title="Nueva prestación relacionada"
      footerContent={footer()}
    >
      <div className="px-6 pt-2">
        <p className="text-sm text-text-secondary">ID: #{prestacion.id}</p>
        <div className="border-b border-border mt-4">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <Tab title="Datos" isActive={step === 'datos'} />
            <Tab title="Traslado" isActive={step === 'traslado'} />
            <Tab title="Confirmación" isActive={step === 'confirmacion'} />
          </nav>
        </div>
      </div>
      <div className="p-6">
        {error && <Alert message={error} />}
        <div className={error ? 'mt-6' : ''}>{renderContent()}</div>
      </div>
    </Drawer>
  );
};

export default AgregarPrestacionDrawer;
