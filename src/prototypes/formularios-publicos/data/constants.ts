export const TIPOS_DOCUMENTO = [
  'DNI',
  'LC',
  'LE',
  'Pasaporte'
] as const;

export const TIPOS_CONSULTA = [
  'Estado del siniestro',
  'Turnos médicos',
  'Prestaciones autorizadas',
  'Pagos / reintegros',
  'Incapacidad',
  'Comisión médica',
  'Otra',
] as const;

export const MOTIVOS_RECLAMO = [
  'Demora en atención',
  'Rechazo de prestación',
  'Problemas con turnos',
  'Pagos / reintegros',
  'Alta / seguimiento de siniestro',
  'Incapacidad',
  'Comisión médica',
  'Atención del prestador',
  'Otro',
] as const;

export const NUMEROS_UTILES = [
  {
    title: 'Atención al Cliente',
    phone: '0800-555-0123',
    schedule: 'Lun a Vie de 8:00 a 20:00 hs',
  },
  {
    title: 'Atención al Cliente ART',
    phone: '0800-555-0124',
    schedule: 'Lun a Vie de 9:00 a 18:00 hs',
  },
  {
    title: 'Denuncias ART / Accidentes',
    phone: '0800-999-9999',
    schedule: '24 hs, los 365 días del año',
  },
];
