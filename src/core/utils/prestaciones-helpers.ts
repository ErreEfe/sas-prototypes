// --- Type Definitions ---
export interface Afiliado {
  nombre: string;
  dni: string;
}
export interface PrestacionData {
  id: number;
  afiliado: Afiliado;
  prestacion: string;
  cie10: string;
  estado:
    | 'Pendiente'
    | 'Aprobado'
    | 'Reprogramado'
    | 'Preliquidado'
    | 'Cancelado'
    | 'Pagada';
  observacion: string;
  turno: string | null;
  informe?: string;
  atencionConfirmada?: boolean;
  monto: number;
  motivoReprogramacion?: string;
  motivoCancelacion?: string;
  autorizacionId?: string;
  cantidad?: number;
  documentoAdjunto?: string;
  denuncia: string;
  codigo?: string;
}

export interface Preliquidacion {
  id: number;
  periodo: string;
  cantidad: number;
  montoTotal: number;
  estado: 'Pendiente' | 'Liquidado';
  prestaciones: PrestacionData[];
}

// FIX: Define and export FilterState to resolve import errors in multiple files.
// The properties are optional to support partial filter updates.
export interface FilterState {
  afiliado?: string;
  prestacion?: string;
  turno?: string;
  autorizacionId?: string;
  estado?: string;
  denuncia?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

// --- Business Logic ---
export const statusConfig = {
  Pendiente: {
    text: 'Solicitada',
    bg: 'bg-status-warning-bg',
    textColor: 'text-status-warning-text',
    borderColor: 'border-status-warning-border',
  },
  Aprobado: {
    text: 'Aprobado',
    bg: 'bg-status-success-bg',
    textColor: 'text-status-success-text',
    borderColor: 'border-status-success-border',
  },
  Preliquidado: {
    text: 'Preliquidado',
    bg: 'bg-status-preliquidado-bg',
    textColor: 'text-status-preliquidado-text',
    borderColor: 'border-status-preliquidado-border',
  },
  Cancelado: {
    text: 'Cancelado',
    bg: 'bg-status-cancelado-bg',
    textColor: 'text-status-cancelado-text',
    borderColor: 'border-status-cancelado-border',
  },
  PendienteInforme: {
    text: 'Pendiente informe',
    bg: 'bg-status-pendienteinforme-bg',
    textColor: 'text-status-pendienteinforme-text',
    borderColor: 'border-status-pendienteinforme-border',
  },
  ConInforme: {
    text: 'Con Informe',
    bg: 'bg-status-coninforme-bg',
    textColor: 'text-status-coninforme-text',
    borderColor: 'border-status-coninforme-border',
  },
  Pagada: {
    text: 'Pagada',
    bg: 'bg-status-pagada-bg',
    textColor: 'text-status-pagada-text',
    borderColor: 'border-status-pagada-border',
  },
};

export const getPrestacionDisplayStatus = (p: PrestacionData) => {
  const now = new Date();
  // --- Terminal and Primary States First ---
  if (p.estado === 'Pagada') return statusConfig.Pagada;
  if (p.estado === 'Cancelado') return statusConfig.Cancelado;
  if (p.estado === 'Preliquidado') return statusConfig.Preliquidado;

  // A non-approved request should always show as pending, regardless of turn status.
  if (p.estado === 'Pendiente') {
    return statusConfig.Pendiente;
  }

  // --- States for Approved/Reprogrammed items ---
  if (p.informe) return statusConfig.ConInforme;

  // If attention was confirmed manually OR the turn has passed, it is pending a report.
  if (p.atencionConfirmada || (p.turno && new Date(p.turno) <= now)) {
    return statusConfig.PendienteInforme;
  }

  // If it's approved but not yet pending a report, it's just 'Aprobado'.
  // This covers 'Aprobado'/'Reprogramado' with a future turn or no turn yet.
  return statusConfig.Aprobado;
};
