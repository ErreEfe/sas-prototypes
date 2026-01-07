import { Caso } from '../types';

export const CASOS_MOCK: Caso[] = [
    {
        id: '2024-001',
        tipo: 'CONSULTA',
        estado: 'RECIBIDO',
        fechaIngreso: '2024-03-10T09:30:00Z',
        empleador: 'Tech Solutions S.A.',
        afiliado: {
            id: 'AF-1001',
            nombre: 'Juan',
            apellido: 'Pérez',
            documento: '30123456',
            cuil: '20301234567',
            email: 'juan.perez@email.com',
            telefono: '1155551234'
        },
        categoria: 'Estado del siniestro',
        descripcion: 'Quisiera saber en qué estado se encuentra mi trámite de siniestro Nº 12345, ya que no he recibido novedades.',
        canal: 'WEB_FORM'
    },
    {
        id: '2024-002',
        tipo: 'RECLAMO',
        estado: 'EN_ANALISIS',
        fechaIngreso: '2024-03-09T14:15:00Z',
        empleador: 'Construcciones Norte',
        afiliado: {
            id: 'AF-1002',
            nombre: 'María',
            apellido: 'González',
            documento: '28987654',
            cuil: '27289876543',
            email: 'maria.g@email.com',
            telefono: '1155555678'
        },
        categoria: 'Demora en atención',
        descripcion: 'Me presenté en la clínica asignada y me informaron que no tenían la autorización. Perdí el día de trabajo.',
        canal: 'WEB_FORM',
        asignadoA: 'operador1'
    },
    {
        id: '2024-003',
        tipo: 'CONSULTA',
        estado: 'RESPONDIDO',
        fechaIngreso: '2024-03-08T11:00:00Z',
        empleador: 'Tech Solutions S.A.',
        afiliado: {
            id: 'AF-1003',
            nombre: 'Carlos',
            apellido: 'Rodríguez',
            documento: '35678901',
            cuil: '20356789012',
            email: 'carlos.r@email.com',
            telefono: '1155559012'
        },
        categoria: 'Pagos / reintegros',
        descripcion: 'Consulta sobre fecha de pago de la liquidación de Febrero.',
        canal: 'EMAIL',
        respuestas: [
            {
                id: 'RESP-001',
                fecha: '2024-03-08T15:00:00Z',
                texto: 'Estimado Carlos, el pago se acreditará el día 15/03. Saludos.',
                enviadoPor: 'Eduardo Romano'
            }
        ]
    },
    {
        id: '2024-004',
        tipo: 'RECLAMO',
        estado: 'CERRADO',
        fechaIngreso: '2024-03-01T10:00:00Z',
        empleador: 'Logística Express',
        afiliado: {
            id: 'AF-1004',
            nombre: 'Ana',
            apellido: 'Martínez',
            documento: '25432109',
            cuil: '27254321098',
            email: 'ana.m@email.com',
            telefono: '1155553456'
        },
        categoria: 'Rechazo de prestación',
        descripcion: 'Me rechazaron la kinesiología sin justificación.',
        canal: 'TELEFONO',
        asignadoA: 'supervisor',
        comentariosInternos: [
            {
                id: 'COM-001',
                autor: 'supervisor',
                fecha: '2024-03-02T10:00:00Z',
                texto: 'Se revisó con auditoría médica. Corresponde cubrir 10 sesiones.'
            }
        ]
    },
    {
        id: '2024-005',
        tipo: 'CONSULTA',
        estado: 'RECIBIDO',
        fechaIngreso: '2024-03-11T08:00:00Z',
        empleador: 'Retail Group',
        afiliado: {
            id: 'AF-1005',
            nombre: 'Lucía',
            apellido: 'Fernández',
            documento: '40111222',
            cuil: '27401112223',
            email: 'lucia.fer@email.com',
            telefono: '1155557788'
        },
        categoria: 'Turnos médicos',
        descripcion: 'Necesito turno con traumatólogo en zona norte, preferentemente por la tarde.',
        canal: 'WEB_FORM'
    }
];
