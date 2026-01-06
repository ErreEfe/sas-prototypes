import React, { useState, useEffect, useRef } from 'react';
import Drawer from '@/core/components/Drawer';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Textarea } from '@/core/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/core/components/ui/radio-group';
import { Select } from '@/core/components/ui/select';
import { IconButton } from '@/core/components/ui/icon-button';
import { PlusCircle } from 'lucide-react';
import { TipoGestionConfig, GestionCompleta, ModoDrawer } from '../types/tipos';
import { calcularFechaVencimiento, obtenerFechaActual, obtenerUsuarioLogueado, formatearFecha, displayToIso, isoToDisplay } from '../utils/dateUtils';
import { getTipoGestionById, TIPOS_GESTION } from '../config/gestionesConfig';
import { useToast } from '@/core/contexts/ToastContext';
import FileUpload from './FileUpload';

interface GestionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    mode: ModoDrawer;
    tipoGestion: TipoGestionConfig | null;
    datosExistentes?: GestionCompleta | null;
    onSave?: (gestion: GestionCompleta) => void;
}

const GestionDrawer: React.FC<GestionDrawerProps> = ({
    isOpen,
    onClose,
    mode,
    tipoGestion,
    datosExistentes,
    onSave,
}) => {
    const { addToast } = useToast();
    const triggerRef = useRef<HTMLButtonElement>(null);

    // Estado del formulario base
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [observacionesGenerales, setObservacionesGenerales] = useState('');
    const [expediente, setExpediente] = useState('');
    const [isNuevoExpediente, setIsNuevoExpediente] = useState(false);

    // Estado de campos específicos (dinámico)
    const [camposEspecificos, setCamposEspecificos] = useState<Record<string, any>>({});
    const [tipoCompleto, setTipoCompleto] = useState<TipoGestionConfig | null>(null);
    const [tipoSeleccionado, setTipoSeleccionado] = useState<string>('');

    // Estado para archivos adjuntos generales
    const [adjuntos, setAdjuntos] = useState<(File | string)[]>([]);

    // Inicializar formulario
    useEffect(() => {
        if (isOpen) {
            // Cargar configuración completa del tipo de gestión si no está completa
            let tipoConfig = tipoGestion;
            if (tipoGestion && (!tipoGestion.camposAdicionales || tipoGestion.camposAdicionales.length === 0)) {
                tipoConfig = getTipoGestionById(tipoGestion.id) || tipoGestion;
            }
            setTipoCompleto(tipoConfig);

            if (mode === 'new') {
                // Modo nuevo: valores por defecto
                const hoy = obtenerFechaActual();
                setFechaInicio(hoy);
                setFechaVencimiento(calcularFechaVencimiento(hoy));
                setObservacionesGenerales('');
                setExpediente('');
                setIsNuevoExpediente(false);
                setCamposEspecificos({});
                setTipoSeleccionado('');
                setTipoSeleccionado('');
                setAdjuntos([]);
            } else if (datosExistentes) {
                // Modo editar/ver: cargar datos existentes
                setFechaInicio(formatearFecha(datosExistentes.fechaInicio));
                setFechaVencimiento(formatearFecha(datosExistentes.fechaVencimiento));
                setObservacionesGenerales(datosExistentes.observacionesGenerales);
                setExpediente(datosExistentes.expediente || '');
                setIsNuevoExpediente(false);
                setCamposEspecificos(datosExistentes.datosEspecificos || {});
                setTipoSeleccionado(tipoConfig?.id || '');
                setAdjuntos(datosExistentes.adjuntos || []);
            }
        }
    }, [isOpen, mode, datosExistentes, tipoGestion]);

    // Actualizar fecha de vencimiento cuando cambia fecha de inicio
    const handleFechaInicioChange = (fechaIso: string) => {
        // Input gives YYYY-MM-DD, convert to DD/MM/YYYY for state
        const fechaDisplay = isoToDisplay(fechaIso);
        setFechaInicio(fechaDisplay);
        setFechaVencimiento(calcularFechaVencimiento(fechaDisplay));
    };

    // Actualizar campo específico
    const handleCampoEspecificoChange = (nombre: string, valor: any) => {
        setCamposEspecificos((prev) => ({
            ...prev,
            [nombre]: valor,
        }));
    };

    // Manejar cambio de tipo de gestión
    const handleTipoGestionChange = (tipoId: string) => {
        setTipoSeleccionado(tipoId);
        // Limpiar campos específicos y archivos al cambiar tipo
        setCamposEspecificos({});
        // Limpiar campos específicos al cambiar tipo
        setCamposEspecificos({});
        // Cargar configuración del nuevo tipo
        const nuevoTipo = getTipoGestionById(tipoId);
        setTipoCompleto(nuevoTipo || null);
    };

    // Manejar cambio de archivos adjuntos
    // Manejar cambio de archivos adjuntos
    const handleAdjuntosChange = (files: (File | string)[]) => {
        setAdjuntos(files);
    };

    // Validar formulario
    const isFormularioValido = (): boolean => {
        // Validar que se haya seleccionado un tipo en modo nuevo
        if (mode === 'new' && !tipoSeleccionado) return false;

        // Validar campos base
        if (!fechaInicio || !fechaVencimiento) return false;



        return true;
    };

    // Guardar gestión
    const handleGuardar = () => {
        if (!tipoCompleto) return;

        const errores: string[] = [];

        // Validar campos base
        if (!fechaInicio) errores.push('Fecha de inicio');
        if (!fechaVencimiento) errores.push('Fecha de vencimiento');



        // Determinar estado basado en completitud
        const nuevoEstado: 'En Proceso' | 'Completado' = errores.length > 0 ? 'En Proceso' : 'Completado';

        // Notificar si faltan datos pero permitir guardar
        if (errores.length > 0) {
            addToast(`La gestión se guardará como "En Proceso" porque faltan: ${errores.join(', ')}`, 'info');
        } else {
            addToast('Todos los datos completados. Gestión marcada como "Completado".', 'success');
        }

        const gestion: GestionCompleta = {
            id: datosExistentes?.id || '',
            tipoGestion: tipoCompleto.nombre,
            fechaInicio,
            fechaVencimiento,
            responsable: obtenerUsuarioLogueado(),
            observacionesGenerales,
            expediente,
            estado: nuevoEstado,
            datosEspecificos: camposEspecificos,
            adjuntos,
            fechaCreacion: datosExistentes?.fechaCreacion || new Date().toISOString(),
            fechaActualizacion: new Date().toISOString(),
        };

        onSave?.(gestion);
        onClose();
    };

    // Renderizar campo dinámico según tipo
    const renderCampoDinamico = (campo: any) => {
        const valor = camposEspecificos[campo.nombre] || '';
        const isReadOnly = mode === 'view';

        switch (campo.tipo) {
            case 'text':
                return (
                    <Input
                        id={campo.nombre}
                        value={valor}
                        onChange={(e) => handleCampoEspecificoChange(campo.nombre, e.target.value)}
                        placeholder={campo.placeholder}
                        disabled={isReadOnly}
                        className="w-full"
                    />
                );

            case 'textarea':
                return (
                    <Textarea
                        id={campo.nombre}
                        value={valor}
                        onChange={(e) => handleCampoEspecificoChange(campo.nombre, e.target.value)}
                        placeholder={campo.placeholder}
                        disabled={isReadOnly}
                        rows={3}
                        className="w-full resize-none"
                    />
                );

            case 'date':
                return (
                    <Input
                        id={campo.nombre}
                        type="date"
                        value={displayToIso(valor)}
                        onChange={(e) => handleCampoEspecificoChange(campo.nombre, isoToDisplay(e.target.value))}
                        disabled={isReadOnly}
                        className="w-full"
                    />
                );

            case 'select':
                return (
                    <Select
                        id={campo.nombre}
                        value={valor}
                        onChange={(e) => handleCampoEspecificoChange(campo.nombre, e.target.value)}
                        disabled={isReadOnly}
                        options={campo.opciones?.map((opcion: string) => ({ value: opcion, label: opcion })) || []}
                        placeholder={campo.placeholder || 'Seleccione una opción'}
                    />
                );

            case 'radio':
                return (
                    <RadioGroup
                        value={valor}
                        onValueChange={(val) => handleCampoEspecificoChange(campo.nombre, val)}
                        disabled={isReadOnly}
                        className="flex gap-4"
                    >
                        {campo.opciones?.map((opcion: string) => (
                            <div key={opcion} className="flex items-center space-x-2">
                                <RadioGroupItem value={opcion} id={`${campo.nombre}-${opcion}`} />
                                <Label htmlFor={`${campo.nombre}-${opcion}`} className="cursor-pointer">
                                    {opcion}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                );

            default:
                return null;
        }
    };

    // Determinar título del drawer
    const getTitulo = () => {
        if (!tipoCompleto) return 'Gestión';

        switch (mode) {
            case 'new':
                return `Nueva Gestión: ${tipoCompleto.nombre}`;
            case 'edit':
                return `Editar Gestión: ${tipoCompleto.nombre}`;
            case 'view':
                return `Ver Gestión: ${tipoCompleto.nombre}`;
            default:
                return tipoCompleto.nombre;
        }
    };

    const isReadOnly = mode === 'view';
    const formValido = isFormularioValido();

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={getTitulo()}
            triggerRef={triggerRef}
            footerContent={
                <div className="flex gap-3">
                    <Button variant="outline" onClick={onClose}>
                        {isReadOnly ? 'Cerrar' : 'Cancelar'}
                    </Button>
                    {!isReadOnly && (
                        <Button
                            onClick={handleGuardar}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Guardar Gestión
                        </Button>
                    )}
                </div>
            }
        >
            <div className="p-6 space-y-6">
                {/* Sección: Datos Generales */}
                <section>
                    <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        Datos Generales
                    </h3>
                    <div className="space-y-4">
                        {/* Tipo de Gestión */}
                        <div>
                            <Label htmlFor="tipoGestion" className="text-sm font-medium text-gray-700">
                                Tipo de gestión <span className="text-red-500">*</span>
                            </Label>
                            {mode === 'new' ? (
                                <Select
                                    id="tipoGestion"
                                    value={tipoSeleccionado}
                                    onChange={(e) => handleTipoGestionChange(e.target.value)}
                                    options={TIPOS_GESTION.map((tipo) => ({ value: tipo.id, label: tipo.nombre }))}
                                    placeholder="Seleccione un tipo de gestión"
                                    containerClassName="mt-1"
                                />
                            ) : (
                                <Input
                                    id="tipoGestion"
                                    value={tipoCompleto?.nombre || ''}
                                    disabled
                                    className="mt-1 bg-gray-50"
                                />
                            )}
                        </div>

                        {/* Nro. de Expediente */}
                        <div>
                            <Label htmlFor="expediente" className="text-sm font-medium text-gray-700">
                                Nro. de Expediente
                            </Label>
                            <div className="flex gap-2 items-center mt-1">
                                {!isNuevoExpediente && mode !== 'view' ? (
                                    <>
                                        <Select
                                            id="expediente"
                                            value={expediente}
                                            onChange={(e) => setExpediente(e.target.value)}
                                            options={[
                                                { value: 'EXP-2023-00125', label: 'EXP-2023-00125' },
                                                { value: 'EXP-2023-00482', label: 'EXP-2023-00482' },
                                                { value: 'EXP-2024-00015', label: 'EXP-2024-00015' },
                                            ]}
                                            placeholder="Seleccione un expediente"
                                            containerClassName="flex-1"
                                        />
                                        <IconButton
                                            icon={<PlusCircle className="h-5 w-5" />}
                                            variant="outline"
                                            onClick={() => {
                                                setIsNuevoExpediente(true);
                                                setExpediente('');
                                            }}
                                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                            title="Crear nuevo expediente"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Input
                                            id="expediente"
                                            value={expediente}
                                            onChange={(e) => setExpediente(e.target.value)}
                                            placeholder="Ej: EXP-2024-XXXXX"
                                            disabled={isReadOnly}
                                            className="flex-1"
                                            autoFocus={isNuevoExpediente}
                                        />
                                        {isNuevoExpediente && mode !== 'view' && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setIsNuevoExpediente(false);
                                                    setExpediente('');
                                                }}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                Cancelar
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Fecha de Inicio */}
                        <div>
                            <Label htmlFor="fechaInicio" className="text-sm font-medium text-gray-700">
                                Fecha de inicio <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="fechaInicio"
                                type="date"
                                value={displayToIso(fechaInicio)}
                                onChange={(e) => handleFechaInicioChange(e.target.value)}
                                disabled={isReadOnly}
                                className="mt-1"
                            />
                        </div>

                        {/* Fecha de Vencimiento */}
                        <div>
                            <Label htmlFor="fechaVencimiento" className="text-sm font-medium text-gray-700">
                                Fecha de vencimiento <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="fechaVencimiento"
                                type="date"
                                value={displayToIso(fechaVencimiento)}
                                onChange={(e) => setFechaVencimiento(isoToDisplay(e.target.value))}
                                disabled={isReadOnly}
                                className="mt-1"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Calculada automáticamente como fecha de inicio + 5 días
                            </p>
                        </div>

                        {/* Responsable */}
                        <div>
                            <Label htmlFor="responsable" className="text-sm font-medium text-gray-700">
                                Responsable
                            </Label>
                            <Input
                                id="responsable"
                                value={obtenerUsuarioLogueado()}
                                disabled
                                className="mt-1 bg-gray-50"
                            />
                        </div>

                        {/* Observaciones Generales */}
                        <div>
                            <Label htmlFor="observacionesGenerales" className="text-sm font-medium text-gray-700">
                                Observaciones generales
                            </Label>
                            <Textarea
                                id="observacionesGenerales"
                                value={observacionesGenerales}
                                onChange={(e) => setObservacionesGenerales(e.target.value)}
                                placeholder="Ingrese observaciones generales sobre la gestión"
                                disabled={isReadOnly}
                                rows={3}
                                className="mt-1 resize-none"
                            />
                        </div>

                        {/* Adjuntos Generales */}
                        <div>
                            <Label className="text-sm font-medium text-gray-700 mb-2 block">
                                Documentación Adjunta
                            </Label>
                            <FileUpload
                                id="adjuntos-generales"
                                label="Adjuntar documentación"
                                required={false}
                                disabled={isReadOnly}
                                files={adjuntos}
                                onChange={handleAdjuntosChange}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Puede adjuntar múltiples archivos (PDF, JPG, PNG) relacionados con esta gestión.
                            </p>
                        </div>
                    </div>
                </section>




            </div>
        </Drawer>
    );
};

export default GestionDrawer;
