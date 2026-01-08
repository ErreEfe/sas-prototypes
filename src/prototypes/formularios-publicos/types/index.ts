export interface AffiliateData {
    tipoDocumento: string;
    numeroDocumento: string;
    cuil: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
}

export type TipoTramite = 'CONSULTA' | 'RECLAMO';

export interface UnifiedFormData extends AffiliateData {
    tipoTramite: TipoTramite;
    motivo: string;
    descripcion: string;
    numeroSiniestro?: string;
    adjuntos?: File[];
}

export interface ConsultaData extends AffiliateData {
    tipoConsulta: string;
    descripcion: string;
    numeroSiniestro?: string;
    adjuntos?: File[];
}

export interface ReclamoData extends AffiliateData {
    motivoReclamo: string;
    descripcion: string;
    numeroSiniestro?: string;
    adjuntos?: File[];
}
