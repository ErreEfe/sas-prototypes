export interface AffiliateData {
    tipoDocumento: string;
    numeroDocumento: string;
    cuil: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
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
