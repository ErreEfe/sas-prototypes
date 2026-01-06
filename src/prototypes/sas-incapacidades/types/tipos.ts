// ============================================
// TIPOS DE GESTIÓN - MÓDULO INCAPACIDADES
// ============================================

/**
 * Estados posibles de una gestión
 */
export type EstadoGestion = 'En Proceso' | 'Completado';

/**
 * Interfaz para un Siniestro (Caso)
 */
export interface Siniestro {
    idProceso: string;
    denuncia: string;
    fechaAltaMedica: string;
    tipoSiniestro: 'Accidente de Trabajo' | 'Accidente de Trabajo In Itinere' | 'Enfermedad Profesional';
    recalificacion: boolean;
    fechaInicioPlazo: string;
    fechaVencimientoPlazo: string;
    diasRestantes: number;
    nombreCompleto: string;
    documento: string;
    empleador: string;
    cuil: string;
    cuit: string;
    estado: 'Iniciado' | 'En gestión' | 'Citado' | 'Evaluación' | 'Cerrado';
}

/**
 * Interfaz para un Registro de Gestión (Historial)
 */
export interface GestionRecord {
    id: string;
    tipoGestion: string;
    gestion: string;
    expediente?: string;
    fecha: string;
    motivo: string;
    vencimiento: string;
    diasRestantes: number;
    estado: EstadoGestion;
}

/**
 * Formulario base común a todas las gestiones
 */
export interface GestionBase {
    id?: string;
    tipoGestion: string;
    expediente: string;
    fechaInicio: string;
    fechaVencimiento: string; // Calculado automáticamente: fechaInicio + 5 días (editable)
    responsable: string; // Usuario logueado actualmente
    observacionesGenerales: string;
    estado: EstadoGestion;
    adjuntos?: (File | string)[];
    fechaCreacion?: string;
    fechaActualizacion?: string;
}

/**
 * Tipo de campo adicional para configuración dinámica
 */
export type TipoCampo = 'text' | 'textarea' | 'date' | 'select' | 'radio' | 'checkbox' | 'file';

/**
 * Definición de un campo adicional
 */
export interface CampoAdicional {
    nombre: string;
    tipo: TipoCampo;
    label: string;
    requerido: boolean;
    opciones?: string[]; // Para select y radio
    placeholder?: string;
    descripcion?: string;
}

/**
 * Configuración de un tipo de gestión
 */
export interface TipoGestionConfig {
    id: string;
    nombre: string;
    descripcion: string;
    icono?: string; // Nombre del icono a usar
    camposAdicionales: CampoAdicional[];
}

/**
 * Campos específicos para "Citación a Valoración de Daño"
 */
export interface CitacionValoracionDano {
    fechaCitacion: string;
    lugarModalidad: 'Presencial' | 'Virtual';
    medioCitacion: 'CD' | 'Email';
    resultadoCitacion: 'Compareció' | 'No compareció' | 'Reprogramada' | '';
    observaciones: string;
}

/**
 * Gestión completa con datos base y específicos
 */
export interface GestionCompleta extends GestionBase {
    datosEspecificos: CitacionValoracionDano | Record<string, any>;
}

/**
 * Props para el modo del drawer
 */
export type ModoDrawer = 'new' | 'edit' | 'view';
