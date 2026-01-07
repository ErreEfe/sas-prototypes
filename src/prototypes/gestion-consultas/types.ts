export type TipoCaso = 'CONSULTA' | 'RECLAMO';

export type EstadoCaso = 'RECIBIDO' | 'EN_ANALISIS' | 'RESPONDIDO' | 'CERRADO' | 'DERIVADO';

export type CanalIngreso = 'WEB_FORM' | 'EMAIL' | 'TELEFONO';

export interface Afiliado {
    id: string;
    nombre: string;
    apellido: string;
    documento: string;
    cuil: string;
    email: string;
    telefono: string;
}

export interface Caso {
    id: string; // Nº de gestión
    tipo: TipoCaso;
    estado: EstadoCaso;
    fechaIngreso: string; // ISO String
    empleador: string;
    afiliado: Afiliado;
    categoria: string; // Motivo/Tipo de consulta
    descripcion: string;
    canal: CanalIngreso;
    asignadoA?: string;
    comentariosInternos?: ComentarioInterno[];
    respuestas?: Respuesta[];
}

export interface ComentarioInterno {
    id: string;
    autor: string;
    fecha: string;
    texto: string;
}

export interface Respuesta {
    id: string;
    fecha: string;
    texto: string;
    enviadoPor: string; // Email del operador
}
