import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/components/ui/table';
import { IconButton } from '@/core/components/ui/icon-button';
import { ViewIcon, EditIcon } from '@/core/components/icons';
import {
    ChevronLeftIcon,
    PlusIcon,
    FileTextIcon,
    AmbulanceIcon,
    ActivityIcon,
    CalendarIcon,
    Accessibility,
    ClipboardList
} from 'lucide-react';
import GestionDrawer from '../components/GestionDrawer';
import { TipoGestionConfig, GestionCompleta, ModoDrawer } from '../types/tipos';
import { formatearFecha } from '../utils/dateUtils';
import { useToast } from '@/core/contexts/ToastContext';
import { TIPOS_GESTION } from '../config/gestionesConfig';

// Helper to calculate date + days
const addDaysToDate = (dateString: string, days: number): string => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Helper calculate days remaining
const calculateDiasRestantes = (vencimientoString: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    // Parse vencimiento DD/MM/YYYY
    const [day, month, year] = vencimientoString.split('/').map(Number);
    const vencimiento = new Date(year, month - 1, day);

    const diffTime = vencimiento.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

import { gestionesData } from '../data/gestionesData';
import { GestionRecord } from '../types/tipos';

const getEstadoStyles = (estado: string) => {
    switch (estado) {
        case 'Completado':
            return 'bg-green-100 text-green-700 hover:bg-green-100 border-green-200';
        case 'En Proceso':
            return 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const getDiasRestantesStyles = (dias: number) => {
    if (dias <= 1) return 'bg-red-600 text-white border-red-700 hover:bg-red-700'; // 1 o menos (vencido o por vencer hoy/mañana)
    if (dias <= 3) return 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600'; // 2 y 3 días
    return 'bg-green-600 text-white border-green-700 hover:bg-green-700'; // 4, 5 o más días
};

const GestionIncapacidad: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [drawerAbierto, setDrawerAbierto] = useState(false);
    const [modoDrawer, setModoDrawer] = useState<ModoDrawer>('new');
    const [tipoGestionSeleccionado, setTipoGestionSeleccionado] = useState<TipoGestionConfig | null>(null);
    const [gestionActual, setGestionActual] = useState<GestionCompleta | null>(null);
    const [gestiones, setGestiones] = useState<GestionRecord[]>(gestionesData);

    // Estado para pestañas
    const [activeTab, setActiveTab] = useState('gestion-incapacidad');

    // Estado para ordenamiento de la tabla de gestiones
    const [sortColumn, setSortColumn] = useState<keyof GestionRecord | null>('fecha');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Función para manejar el ordenamiento
    const handleSort = (column: keyof GestionRecord) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Función para convertir fecha DD/MM/YYYY a timestamp
    const parseFecha = (fecha: string): number => {
        const [day, month, year] = fecha.split('/').map(Number);
        return new Date(year, month - 1, day).getTime();
    };

    // Ordenar gestiones
    const sortedGestiones = React.useMemo(() => {
        if (!sortColumn) return gestiones;

        return [...gestiones].sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            // Manejar fechas
            if (sortColumn === 'fecha' || sortColumn === 'vencimiento') {
                aValue = parseFecha(aValue as string);
                bValue = parseFecha(bValue as string);
            }

            // Comparar valores
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [gestiones, sortColumn, sortDirection]);

    // Obtener expedientes únicos
    const expedientesUnicos = React.useMemo(() => {
        const exps = new Set(gestiones.map(g => g.expediente).filter(e => e && e.trim() !== ''));
        return Array.from(exps);
    }, [gestiones]);

    // Componente para el icono de ordenamiento
    const SortIcon = ({ column }: { column: keyof GestionRecord }) => {
        if (sortColumn !== column) {
            return <span className="ml-1 text-gray-400">↕</span>;
        }
        return sortDirection === 'asc' ?
            <span className="ml-1 text-blue-600">↑</span> :
            <span className="ml-1 text-blue-600">↓</span>;
    };

    // Definición de pestañas
    const tabs = [
        { id: 'denuncia', label: `${id}`, icon: ClipboardList },
        { id: 'general', label: 'General', icon: FileTextIcon },
        { id: 'primera-asistencia', label: 'Primera Asistencia y Derivaciones', icon: AmbulanceIcon },
        { id: 'seguimiento', label: 'Seguimiento', icon: ActivityIcon },
        { id: 'turnos', label: 'Turnos', icon: CalendarIcon },
        { id: 'gestion-incapacidad', label: 'Gestión de Incapacidad', icon: Accessibility },
    ];

    // Manejadores de eventos
    const handleNuevaGestion = () => {
        setTipoGestionSeleccionado(null);
        setModoDrawer('new');
        setGestionActual(null);
        setDrawerAbierto(true);
    };

    const handleEditarGestion = (gestion: GestionRecord) => {
        // Buscar el tipo de gestión por nombre
        const tipoGestionConfig = TIPOS_GESTION.find(t => t.nombre === gestion.gestion);

        // Crear datos específicos de ejemplo según el tipo de gestión
        let datosEspecificos: Record<string, any> = {};

        if (tipoGestionConfig) {
            // Llenar con datos de ejemplo según los campos del tipo
            tipoGestionConfig.camposAdicionales.forEach(campo => {
                if (campo.tipo === 'date') {
                    datosEspecificos[campo.nombre] = '20/12/2023';
                } else if (campo.tipo === 'text') {
                    datosEspecificos[campo.nombre] = 'Ejemplo de texto';
                } else if (campo.tipo === 'textarea') {
                    datosEspecificos[campo.nombre] = 'Ejemplo de observaciones';
                } else if (campo.tipo === 'select' && campo.opciones && campo.opciones.length > 0) {
                    datosEspecificos[campo.nombre] = campo.opciones[0];
                } else if (campo.tipo === 'radio' && campo.opciones && campo.opciones.length > 0) {
                    datosEspecificos[campo.nombre] = campo.opciones[0];
                } else if (campo.tipo === 'file') {
                    datosEspecificos[campo.nombre] = [];
                }
            });
        }

        const gestionCompleta: GestionCompleta = {
            id: gestion.id,
            tipoGestion: gestion.gestion,
            fechaInicio: gestion.fecha,
            fechaVencimiento: gestion.vencimiento,
            responsable: 'Usuario Sistema',
            observacionesGenerales: gestion.motivo,
            estado: gestion.estado as any,
            expediente: gestion.expediente || '',
            datosEspecificos: datosEspecificos,
        };

        setGestionActual(gestionCompleta);
        setTipoGestionSeleccionado(tipoGestionConfig || null);
        setModoDrawer('edit');
        setDrawerAbierto(true);
    };

    const handleVerGestion = (gestion: GestionRecord) => {
        // Buscar el tipo de gestión por nombre
        const tipoGestionConfig = TIPOS_GESTION.find(t => t.nombre === gestion.gestion);

        // Crear datos específicos de ejemplo completados según el tipo de gestión
        let datosEspecificos: Record<string, any> = {};

        if (tipoGestionConfig) {
            // Llenar con datos de ejemplo completados según los campos del tipo
            tipoGestionConfig.camposAdicionales.forEach(campo => {
                if (campo.tipo === 'date') {
                    datosEspecificos[campo.nombre] = '20/12/2023';
                } else if (campo.tipo === 'text') {
                    datosEspecificos[campo.nombre] = 'Información completada';
                } else if (campo.tipo === 'textarea') {
                    datosEspecificos[campo.nombre] = 'Observaciones completadas del proceso';
                } else if (campo.tipo === 'select' && campo.opciones && campo.opciones.length > 0) {
                    datosEspecificos[campo.nombre] = campo.opciones[0];
                } else if (campo.tipo === 'radio' && campo.opciones && campo.opciones.length > 0) {
                    datosEspecificos[campo.nombre] = campo.opciones[0];
                } else if (campo.tipo === 'file') {
                    datosEspecificos[campo.nombre] = ['documento-ejemplo.pdf'];
                }
            });
        }

        const gestionCompleta: GestionCompleta = {
            id: gestion.id,
            tipoGestion: gestion.gestion,
            fechaInicio: gestion.fecha,
            fechaVencimiento: gestion.vencimiento,
            responsable: 'Usuario Sistema',
            observacionesGenerales: gestion.motivo,
            estado: gestion.estado as any,
            expediente: gestion.expediente || '',
            datosEspecificos: datosEspecificos,
        };

        setGestionActual(gestionCompleta);
        setTipoGestionSeleccionado(tipoGestionConfig || null);
        setModoDrawer('view');
        setDrawerAbierto(true);
    };

    const handleGuardarGestion = (gestion: GestionCompleta) => {
        // Simulación de error si el texto es 'error'
        if (gestion.observacionesGenerales.toLowerCase().includes('error')) {
            addToast('Error simulado: No se pudo conectar con el servidor', 'error');
            return;
        }

        // Aquí se guardaría en el backend
        // Por ahora, solo actualizamos el estado local
        console.log('Guardando gestión:', gestion);

        if (modoDrawer === 'new') {
            // Agregar nueva gestión
            const fecha = formatearFecha(gestion.fechaInicio);
            const vencimiento = addDaysToDate(fecha, 5); // Calculate vencimiento as fecha + 5 days
            // Generar nuevo ID secuencial
            const maxId = Math.max(...gestiones.map(g => parseInt(g.id.substring(1)) || 0), 0);
            const nuevoId = `G${(maxId + 1).toString().padStart(3, '0')}`;

            const nuevaGestion: GestionRecord = {
                id: gestion.id || nuevoId,
                tipoGestion: 'Médica', // Default for now
                gestion: gestion.tipoGestion,
                fecha: fecha,
                motivo: gestion.observacionesGenerales.substring(0, 50) || 'Nueva gestión',
                vencimiento: vencimiento,
                diasRestantes: calculateDiasRestantes(vencimiento),
                estado: gestion.estado as any,
                expediente: gestion.expediente,
            };
            setGestiones([...gestiones, nuevaGestion]);
            addToast('La gestión ha sido creada correctamente', 'success');
        } else if (modoDrawer === 'edit') {
            // Actualizar gestión existente
            setGestiones(gestiones.map(g =>
                g.id === gestion.id
                    ? {
                        ...g,
                        gestion: gestion.tipoGestion,
                        fecha: formatearFecha(gestion.fechaInicio),
                        // Recalculate vencimiento/diasRestantes if needed logic here, 
                        // for simplicity keeping existing or updating if fecha changed (omitted for brevity)
                        estado: gestion.estado as any,
                        motivo: gestion.observacionesGenerales.substring(0, 50) || g.motivo,
                        expediente: gestion.expediente,
                    }
                    : g
            ));
            addToast('La gestión ha sido actualizada correctamente', 'success');
        }
    };

    // Componente placeholder para pestañas sin contenido
    const PlaceholderTab = ({ title, description }: { title: string; description: string }) => (
        <div className="flex items-center justify-center h-96">
            <div className="text-center max-w-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </div>
    );

    return (
        <div className="flex h-full animate-in fade-in duration-500">
            {/* Sidebar de pestañas */}
            <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
                <nav className="p-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                                    ${isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 overflow-auto">
                <div className="p-6 space-y-6">
                    {/* Pestaña: Denuncia */}
                    {activeTab === 'denuncia' && <PlaceholderTab title={`${id}`} description="Información del empleado, lugar de trabajo y relato del siniestro." />}

                    {/* Pestaña: General */}
                    {activeTab === 'general' && <PlaceholderTab title="General" description="Datos médicos del empleado e información sobre el siniestro." />}

                    {/* Pestaña: Primera Asistencia y Derivaciones */}
                    {activeTab === 'primera-asistencia' && <PlaceholderTab title="Primera Asistencia y Derivaciones" description="Información general de la primera asistencia." />}

                    {/* Pestaña: Seguimiento */}
                    {activeTab === 'seguimiento' && <PlaceholderTab title="Seguimiento" description="Evolución de la denuncia." />}

                    {/* Pestaña: Turnos */}
                    {activeTab === 'turnos' && <PlaceholderTab title="Turnos" description="Todas las atenciones del empleado." />}

                    {/* Pestaña: Gestión de Incapacidad (contenido actual) */}
                    {activeTab === 'gestion-incapacidad' && (
                        <>
                            {/* Botón Volver */}
                            <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2 mb-2">
                                <ChevronLeftIcon className="w-4 h-4" /> Volver
                            </Button>

                            {/* Header with Estado Badge */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 flex items-center gap-3">
                                    <h1 className="text-xl font-bold text-gray-900">Gestión de Incapacidad</h1>
                                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                                        En gestión
                                    </Badge>
                                </div>
                            </div>

                            {/* Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Card: Datos del Siniestro */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-semibold text-gray-700">Datos del Siniestro</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500">ID Proceso Incapacidad</p>
                                                <p className="text-sm font-medium text-gray-900">INC-{id}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Fecha Alta Médica (PME)</p>
                                                <p className="text-sm font-medium text-gray-900">15/11/2023</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Tipo de Siniestro</p>
                                                <p className="text-sm font-medium text-gray-900">Enfermedad Profesional</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Recalificación</p>
                                                <p className="text-sm font-medium text-gray-900">No</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Fecha Inicio Plazo Legal</p>
                                                <p className="text-sm font-medium text-gray-900">20/11/2023</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Fecha Vencimiento Plazo</p>
                                                <p className="text-sm font-medium text-gray-900">05/12/2023</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Card: Datos del Empleado */}
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-sm font-semibold text-gray-700">Datos del Empleado</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Nombre Completo</p>
                                                <p className="text-sm font-medium text-gray-900">CORO VERONICA SOLEDAD</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Documento</p>
                                                <p className="text-sm font-medium text-gray-900">33875476</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">Empleador</p>
                                                <p className="text-sm font-medium text-gray-900">CORAL</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500">CUIL</p>
                                                <p className="text-sm font-medium text-gray-900">27-33875476-8</p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="text-xs text-gray-500">Expedientes Asociados</p>
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {expedientesUnicos.length > 0 ? (
                                                        expedientesUnicos.map((exp, index) => (
                                                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100">
                                                                {exp}
                                                            </Badge>
                                                        ))
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Gestiones Section */}
                            <div className="space-y-4">
                                {/* Header with Nueva Gestión Button */}
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">Historial de Gestiones</h2>
                                    <Button
                                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                                        onClick={handleNuevaGestion}
                                    >
                                        <PlusIcon className="w-4 h-4" />
                                        Nueva Gestión
                                    </Button>
                                </div>

                                {/* Gestiones Table */}
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100">
                                    <Table>
                                        <TableHeader className="bg-muted">
                                            <TableRow className="hover:bg-transparent">
                                                <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">ID</TableHead>
                                                <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">Tipo de Gestión</TableHead>
                                                <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">Expediente</TableHead>
                                                <TableHead
                                                    className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                                                    onClick={() => handleSort('fecha')}
                                                >
                                                    Fecha Inicio<SortIcon column="fecha" />
                                                </TableHead>
                                                <TableHead
                                                    className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                                                    onClick={() => handleSort('vencimiento')}
                                                >
                                                    Vencimiento<SortIcon column="vencimiento" />
                                                </TableHead>
                                                <TableHead
                                                    className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                                                    onClick={() => handleSort('diasRestantes')}
                                                >
                                                    Días Rest.<SortIcon column="diasRestantes" />
                                                </TableHead>
                                                <TableHead
                                                    className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                                                    onClick={() => handleSort('estado')}
                                                >
                                                    Estado<SortIcon column="estado" />
                                                </TableHead>
                                                <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs text-center">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {sortedGestiones.map((gestion) => (
                                                <TableRow key={gestion.id} className="hover:bg-gray-50 border-b border-border">
                                                    <TableCell className="px-4 py-4 font-medium text-xs">{gestion.id}</TableCell>
                                                    <TableCell className="px-4 py-4 text-xs">{gestion.gestion}</TableCell>
                                                    <TableCell className="px-4 py-4 text-xs font-medium text-gray-700">{gestion.expediente || '-'}</TableCell>
                                                    <TableCell className="px-4 py-4 text-xs">{gestion.fecha}</TableCell>
                                                    <TableCell className="px-4 py-4 text-xs">{gestion.vencimiento}</TableCell>
                                                    <TableCell className="px-4 py-4 text-xs">
                                                        {gestion.estado === 'Completado' ? (
                                                            <span className="text-gray-400 font-medium ml-2">-</span>
                                                        ) : (
                                                            <Badge variant="outline" className={`font-medium rounded px-2.5 py-0.5 border ${getDiasRestantesStyles(gestion.diasRestantes)}`}>
                                                                {gestion.diasRestantes}
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="px-4 py-4">
                                                        <Badge variant="outline" className={`font-normal rounded px-2 py-0.5 border ${getEstadoStyles(gestion.estado)}`}>
                                                            {gestion.estado}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="px-4 py-4 text-center">
                                                        {gestion.estado === 'Completado' ? (
                                                            <IconButton
                                                                icon={<ViewIcon className="h-5 w-5" />}
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50"
                                                                title="Ver gestión"
                                                                onClick={() => handleVerGestion(gestion)}
                                                            />
                                                        ) : (
                                                            <IconButton
                                                                icon={<EditIcon className="h-5 w-5" />}
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 w-8 text-gray-500 hover:text-green-600 hover:border-green-600 hover:bg-green-50"
                                                                title="Editar gestión"
                                                                onClick={() => handleEditarGestion(gestion)}
                                                            />
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Drawer de Gestión (Nueva / Editar / Ver) */}
                            <GestionDrawer
                                isOpen={drawerAbierto}
                                onClose={() => setDrawerAbierto(false)}
                                mode={modoDrawer}
                                tipoGestion={tipoGestionSeleccionado}
                                datosExistentes={gestionActual}
                                onSave={handleGuardarGestion}
                            />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default GestionIncapacidad;
