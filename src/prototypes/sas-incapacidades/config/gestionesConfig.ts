import { TipoGestionConfig } from '../types/tipos';

/**
 * Configuración de tipos de gestión disponibles
 * Para agregar nuevos tipos, simplemente añadir un nuevo objeto a este array
 */
export const TIPOS_GESTION: TipoGestionConfig[] = [
    {
        id: 'registrar-pme-con-incapacidad',
        nombre: 'Registrar PME con incapacidad',
        descripcion: 'Registro del peritaje médico con determinación de incapacidad',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'fechaPME',
                tipo: 'date',
                label: 'Fecha PME',
                requerido: true,
            },
            {
                nombre: 'profesional',
                tipo: 'text',
                label: 'Profesional',
                requerido: true,
                placeholder: 'Nombre del profesional médico',
            },
            {
                nombre: 'adjuntoPME',
                tipo: 'file',
                label: 'PME',
                requerido: true,
                descripcion: 'Archivo del peritaje médico',
            },
        ],
    },
    {
        id: 'solicitar-documentacion-trabajador',
        nombre: 'Solicitar documentación al trabajador',
        descripcion: 'Solicitud de documentación complementaria al trabajador',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'fechaEnvio',
                tipo: 'date',
                label: 'Fecha envío',
                requerido: true,
            },
            {
                nombre: 'medio',
                tipo: 'select',
                label: 'Medio de envío',
                requerido: true,
                opciones: ['Email', 'Carta Documento', 'Notificación presencial'],
                placeholder: 'Seleccione el medio',
            },
            {
                nombre: 'fechaLimite',
                tipo: 'date',
                label: 'Fecha límite',
                requerido: true,
            },
            {
                nombre: 'adjuntoNotificacion',
                tipo: 'file',
                label: 'Carta Documento / Notificación',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-recepcion-documentacion',
        nombre: 'Registrar recepción de documentación',
        descripcion: 'Registro de documentación recibida del trabajador',
        icono: 'CheckSquare',
        camposAdicionales: [
            {
                nombre: 'fechaRecepcion',
                tipo: 'date',
                label: 'Fecha recepción',
                requerido: true,
            },
            {
                nombre: 'completa',
                tipo: 'radio',
                label: 'Completa',
                requerido: true,
                opciones: ['Sí', 'No'],
            },
            {
                nombre: 'adjuntoDocumentacion',
                tipo: 'file',
                label: 'Documentación recibida',
                requerido: true,
            },
        ],
    },
    {
        id: 'citar-valoracion-dano',
        nombre: 'Citar a valoración de daño',
        descripcion: 'Citación del trabajador para valoración médica del daño',
        icono: 'Calendar',
        camposAdicionales: [
            {
                nombre: 'fechaAudiencia',
                tipo: 'date',
                label: 'Fecha audiencia',
                requerido: true,
            },
            {
                nombre: 'hora',
                tipo: 'text',
                label: 'Hora',
                requerido: true,
                placeholder: 'HH:MM',
            },
            {
                nombre: 'lugar',
                tipo: 'text',
                label: 'Lugar',
                requerido: true,
                placeholder: 'Dirección o modalidad virtual',
            },
            {
                nombre: 'medio',
                tipo: 'select',
                label: 'Medio',
                requerido: true,
                opciones: ['Email', 'Carta Documento', 'Presencial'],
                placeholder: 'Seleccione el medio',
            },
            {
                nombre: 'adjuntoCitacion',
                tipo: 'file',
                label: 'Citación',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-resultado-valoracion',
        nombre: 'Registrar resultado de valoración',
        descripcion: 'Registro del resultado de la audiencia de valoración',
        icono: 'CheckSquare',
        camposAdicionales: [
            {
                nombre: 'comparecencia',
                tipo: 'radio',
                label: 'Comparecencia',
                requerido: true,
                opciones: ['Sí', 'No'],
            },
            {
                nombre: 'adjuntoActa',
                tipo: 'file',
                label: 'Acta',
                requerido: false,
            },
        ],
    },
    {
        id: 'registrar-propuesta-acuerdo',
        nombre: 'Registrar propuesta de acuerdo',
        descripcion: 'Registro de propuesta de acuerdo presentada',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'descripcion',
                tipo: 'textarea',
                label: 'Descripción',
                requerido: true,
                placeholder: 'Detalle de la propuesta',
            },
            {
                nombre: 'porcentajeIncapacidad',
                tipo: 'text',
                label: '% Incapacidad',
                requerido: true,
                placeholder: 'Ej: 15',
            },
            {
                nombre: 'adjuntoPropuesta',
                tipo: 'file',
                label: 'Propuesta',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-aceptacion-acuerdo',
        nombre: 'Registrar aceptación de acuerdo',
        descripcion: 'Registro de aceptación del acuerdo por parte del trabajador',
        icono: 'CheckSquare',
        camposAdicionales: [
            {
                nombre: 'fechaAceptacion',
                tipo: 'date',
                label: 'Fecha aceptación',
                requerido: true,
            },
            {
                nombre: 'adjuntoAceptacion',
                tipo: 'file',
                label: 'Aceptación firmada',
                requerido: true,
            },
        ],
    },
    {
        id: 'iniciar-tramite-srt-valoracion',
        nombre: 'Iniciar trámite SRT – Valoración de Daño',
        descripcion: 'Inicio de trámite ante la SRT para valoración de daño',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'comisionMedica',
                tipo: 'select',
                label: 'Comisión Médica',
                requerido: true,
                opciones: ['CABA', 'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
                placeholder: 'Seleccione comisión',
            },
            {
                nombre: 'fechaInicio',
                tipo: 'date',
                label: 'Fecha inicio',
                requerido: true,
            },
            {
                nombre: 'numeroTramite',
                tipo: 'text',
                label: 'N° trámite',
                requerido: true,
                placeholder: 'Número de trámite SRT',
            },
            {
                nombre: 'adjuntoChecklist',
                tipo: 'file',
                label: 'Checklist documental',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-citacion-homologacion-srt',
        nombre: 'Registrar citación de homologación SRT',
        descripcion: 'Registro de citación para homologación ante SRT',
        icono: 'Calendar',
        camposAdicionales: [
            {
                nombre: 'fechaAudiencia',
                tipo: 'date',
                label: 'Fecha audiencia',
                requerido: true,
            },
            {
                nombre: 'hora',
                tipo: 'text',
                label: 'Hora',
                requerido: true,
                placeholder: 'HH:MM',
            },
            {
                nombre: 'lugar',
                tipo: 'text',
                label: 'Lugar',
                requerido: true,
            },
            {
                nombre: 'adjuntoCitacion',
                tipo: 'file',
                label: 'Citación SRT',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-dictamen-homologacion',
        nombre: 'Registrar dictamen de homologación',
        descripcion: 'Registro del dictamen de homologación emitido',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'fecha',
                tipo: 'date',
                label: 'Fecha',
                requerido: true,
            },
            {
                nombre: 'resultado',
                tipo: 'select',
                label: 'Resultado',
                requerido: true,
                opciones: ['Homologado', 'Rechazado', 'Observado'],
                placeholder: 'Seleccione resultado',
            },
            {
                nombre: 'porcentajeIncapacidad',
                tipo: 'text',
                label: '% Incapacidad',
                requerido: true,
            },
            {
                nombre: 'adjuntoDictamen',
                tipo: 'file',
                label: 'Dictamen',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-rechazo-acuerdo',
        nombre: 'Registrar rechazo de acuerdo',
        descripcion: 'Registro del rechazo del acuerdo propuesto',
        icono: 'XCircle',
        camposAdicionales: [
            {
                nombre: 'fechaRechazo',
                tipo: 'date',
                label: 'Fecha de rechazo',
                requerido: true,
            },
            {
                nombre: 'motivo',
                tipo: 'textarea',
                label: 'Motivo',
                requerido: true,
                placeholder: 'Motivo del rechazo',
            },
        ],
    },
    {
        id: 'iniciar-tramite-srt-determinacion',
        nombre: 'Iniciar trámite SRT – Determinación de Incapacidad',
        descripcion: 'Inicio de trámite ante SRT para determinación de incapacidad',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'comisionMedica',
                tipo: 'select',
                label: 'Comisión Médica',
                requerido: true,
                opciones: ['CABA', 'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'],
                placeholder: 'Seleccione comisión',
            },
            {
                nombre: 'fechaInicio',
                tipo: 'date',
                label: 'Fecha inicio',
                requerido: true,
            },
            {
                nombre: 'numeroTramite',
                tipo: 'text',
                label: 'N° trámite',
                requerido: true,
            },
            {
                nombre: 'adjuntoChecklist',
                tipo: 'file',
                label: 'Checklist documental',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-citacion-comision-medica',
        nombre: 'Registrar citación Comisión Médica',
        descripcion: 'Registro de citación ante Comisión Médica',
        icono: 'Calendar',
        camposAdicionales: [
            {
                nombre: 'fechaAudiencia',
                tipo: 'date',
                label: 'Fecha audiencia',
                requerido: true,
            },
            {
                nombre: 'hora',
                tipo: 'text',
                label: 'Hora',
                requerido: true,
                placeholder: 'HH:MM',
            },
            {
                nombre: 'lugar',
                tipo: 'text',
                label: 'Lugar',
                requerido: true,
            },
            {
                nombre: 'adjuntoCitacion',
                tipo: 'file',
                label: 'Citación SRT',
                requerido: true,
            },
        ],
    },
    {
        id: 'registrar-audiencia-comision-medica',
        nombre: 'Registrar audiencia Comisión Médica',
        descripcion: 'Registro de asistencia a audiencia ante Comisión Médica',
        icono: 'Users',
        camposAdicionales: [
            {
                nombre: 'comparecencia',
                tipo: 'radio',
                label: 'Comparecencia',
                requerido: true,
                opciones: ['Sí', 'No'],
            },
            {
                nombre: 'adjuntoActa',
                tipo: 'file',
                label: 'Acta',
                requerido: false,
            },
        ],
    },
    {
        id: 'registrar-dictamen-comision-medica',
        nombre: 'Registrar dictamen Comisión Médica',
        descripcion: 'Registro del dictamen emitido por Comisión Médica',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'fecha',
                tipo: 'date',
                label: 'Fecha',
                requerido: true,
            },
            {
                nombre: 'resultado',
                tipo: 'select',
                label: 'Resultado',
                requerido: true,
                opciones: ['Confirmado', 'Modificado', 'Rechazado'],
                placeholder: 'Seleccione resultado',
            },
            {
                nombre: 'porcentajeIncapacidad',
                tipo: 'text',
                label: '% Incapacidad',
                requerido: true,
            },
            {
                nombre: 'adjuntoDictamen',
                tipo: 'file',
                label: 'Dictamen',
                requerido: true,
            },
        ],
    },
    {
        id: 'elaborar-enviar-descargo-tecnico',
        nombre: 'Elaborar y enviar descargo técnico',
        descripcion: 'Elaboración y envío de descargo técnico',
        icono: 'FileText',
        camposAdicionales: [
            {
                nombre: 'fundamentosMedicos',
                tipo: 'textarea',
                label: 'Fundamentos médicos',
                requerido: true,
                placeholder: 'Fundamentos técnicos del descargo',
            },
            {
                nombre: 'fechaEnvio',
                tipo: 'date',
                label: 'Fecha envío',
                requerido: true,
            },
            {
                nombre: 'adjuntoDescargo',
                tipo: 'file',
                label: 'Descargo firmado',
                requerido: true,
            },
        ],
    },
    {
        id: 'solicitar-rectificacion-revocacion',
        nombre: 'Solicitar rectificación / revocación',
        descripcion: 'Solicitud de rectificación o revocación de dictamen',
        icono: 'RefreshCw',
        camposAdicionales: [
            {
                nombre: 'motivo',
                tipo: 'textarea',
                label: 'Motivo',
                requerido: true,
                placeholder: 'Motivo de la solicitud',
            },
            {
                nombre: 'fechaPresentacion',
                tipo: 'date',
                label: 'Fecha presentación',
                requerido: true,
            },
            {
                nombre: 'adjuntoPresentacion',
                tipo: 'file',
                label: 'Presentación firmada',
                requerido: true,
            },
        ],
    },
    {
        id: 'derivar-prestaciones-medicas',
        nombre: 'Derivar a prestaciones médicas',
        descripcion: 'Derivación del caso a prestaciones médicas',
        icono: 'ArrowRight',
        camposAdicionales: [
            {
                nombre: 'fechaDerivacion',
                tipo: 'date',
                label: 'Fecha derivación',
                requerido: true,
            },
            {
                nombre: 'adjuntoDictamen',
                tipo: 'file',
                label: 'Dictamen',
                requerido: false,
            },
        ],
    },
    {
        id: 'derivar-prestaciones-dinerarias',
        nombre: 'Derivar a prestaciones dinerarias',
        descripcion: 'Derivación del caso a prestaciones dinerarias',
        icono: 'DollarSign',
        camposAdicionales: [
            {
                nombre: 'fechaDerivacion',
                tipo: 'date',
                label: 'Fecha derivación',
                requerido: true,
            },
            {
                nombre: 'adjuntoDictamen',
                tipo: 'file',
                label: 'Dictamen',
                requerido: false,
            },
        ],
    },
    {
        id: 'cerrar-proceso-incapacidad',
        nombre: 'Cerrar proceso de incapacidad',
        descripcion: 'Cierre definitivo del proceso de incapacidad',
        icono: 'CheckCircle',
        camposAdicionales: [
            {
                nombre: 'resultadoFinal',
                tipo: 'select',
                label: 'Resultado final',
                requerido: true,
                opciones: ['Resuelto con acuerdo', 'Derivado a prestaciones', 'Sin incapacidad', 'Otro'],
                placeholder: 'Seleccione resultado',
            },
            {
                nombre: 'fechaCierre',
                tipo: 'date',
                label: 'Fecha cierre',
                requerido: true,
            },
        ],
    },
    {
        id: 'divergencia-incapacidad',
        nombre: 'Divergencia de Incapacidad',
        descripcion: 'Gestión de divergencia de incapacidad',
        icono: 'AlertTriangle',
        camposAdicionales: [],
    },
    {
        id: 'prestaciones-medicas',
        nombre: 'Prestaciones Médicas',
        descripcion: 'Gestión de prestaciones médicas',
        icono: 'Activity',
        camposAdicionales: [],
    },
    {
        id: 'alta-medica',
        nombre: 'Alta Médica',
        descripcion: 'Gestión de alta médica',
        icono: 'CheckCircle',
        camposAdicionales: [],
    },
    {
        id: 'archivo-clausura',
        nombre: 'Archivo / Clausura',
        descripcion: 'Archivo o clausura del expediente',
        icono: 'Archive',
        camposAdicionales: [],
    },
    {
        id: 'solicitud-apelacion',
        nombre: 'Solicitud de Apelación',
        descripcion: 'Solicitud de apelación',
        icono: 'FileText',
        camposAdicionales: [],
    },
    {
        id: 'respuesta-apelacion',
        nombre: 'Respuesta de Apelación',
        descripcion: 'Respuesta a la apelación',
        icono: 'MessageSquare',
        camposAdicionales: [],
    },
    {
        id: 'estimacion-incapacidad',
        nombre: 'Estimación de Incapacidad',
        descripcion: 'Estimación del porcentaje de incapacidad',
        icono: 'Percent',
        camposAdicionales: [],
    },
    {
        id: 'revocacion-alta-medica-interna',
        nombre: 'Revocación de Alta Médica Interna',
        descripcion: 'Revocación interna del alta médica',
        icono: 'RotateCcw',
        camposAdicionales: [],
    },
];

/**
 * Obtiene la configuración de un tipo de gestión por su ID
 */
export const getTipoGestionById = (id: string): TipoGestionConfig | undefined => {
    return TIPOS_GESTION.find((tipo) => tipo.id === id);
};

/**
 * Obtiene la configuración de un tipo de gestión por su nombre
 */
export const getTipoGestionByNombre = (nombre: string): TipoGestionConfig | undefined => {
    return TIPOS_GESTION.find((tipo) => tipo.nombre === nombre);
};
