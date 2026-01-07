import React from 'react';
import { cn } from '@/core/lib/utils';

// Defino los tipos de estado posibles para asegurar que solo usemos los valores esperados.
export type Status =
  | 'Solicitada'
  | 'Aprobado'
  | 'Pendiente Informe'
  | 'Cancelada'
  | 'Turno Asignado'
  | 'Finalizada'
  | 'Preliquidado'
  | 'Pagada'
  | 'Con Informe'
  // Estados para Consultas y Reclamos
  | 'Recibido'
  | 'En análisis'
  | 'Respondido'
  | 'Cerrado'
  | 'Derivado';

interface StatusChipProps {
  status: Status;
  className?: string;
}

// Mapeamos cada estado a sus estilos correspondientes (borde, texto y fondo con opacidad).
const statusStyles: Record<Status, { bg: string; border: string; text: string }> = {
  // Amarillo/Naranja - Estados pendientes o en espera
  'Solicitada': {
    bg: 'bg-amber-50',
    border: 'border-amber-500',
    text: 'text-amber-700',
  },
  'Recibido': {
    bg: 'bg-amber-50',
    border: 'border-amber-500',
    text: 'text-amber-700',
  },
  // Verde - Estados aprobados o exitosos
  'Aprobado': {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
  },
  'Respondido': {
    bg: 'bg-green-50',
    border: 'border-green-500',
    text: 'text-green-700',
  },
  // Naranja - Advertencias o acciones requeridas
  'Pendiente Informe': {
    bg: 'bg-orange-50',
    border: 'border-orange-500',
    text: 'text-orange-700',
  },
  // Rojo - Estados cancelados o errores
  'Cancelada': {
    bg: 'bg-red-50',
    border: 'border-red-500',
    text: 'text-red-700',
  },
  // Azul - Estados informativos o programados
  'Turno Asignado': {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
  },
  'En análisis': {
    bg: 'bg-blue-50',
    border: 'border-blue-500',
    text: 'text-blue-700',
  },
  // Gris - Estados finalizados o neutros
  'Finalizada': {
    bg: 'bg-gray-50',
    border: 'border-gray-400',
    text: 'text-gray-700',
  },
  'Cerrado': {
    bg: 'bg-gray-50',
    border: 'border-gray-400',
    text: 'text-gray-700',
  },
  'Derivado': {
    bg: 'bg-indigo-50',
    border: 'border-indigo-500',
    text: 'text-indigo-700',
  },
  // Púrpura - Estados de liquidación
  'Preliquidado': {
    bg: 'bg-purple-50',
    border: 'border-purple-500',
    text: 'text-purple-700',
  },
  // Verde oscuro - Estados completados con pago
  'Pagada': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-600',
    text: 'text-emerald-800',
  },
  // Cyan - Estados con documentación
  'Con Informe': {
    bg: 'bg-cyan-50',
    border: 'border-cyan-500',
    text: 'text-cyan-700',
  },
};

/**
 * Un componente reutilizable para mostrar un chip de estado con colores diferenciados.
 * Cada estado tiene:
 * - Borde sólido de color intenso
 * - Texto del mismo color que el borde (tono más oscuro)
 * - Fondo del mismo color con opacidad baja (tono 50)
 */
const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  // Obtenemos el estilo o usamos uno por defecto si el estado no se encuentra.
  const styles = statusStyles[status] || {
    bg: 'bg-gray-50',
    border: 'border-gray-400',
    text: 'text-gray-700',
  };

  return (
    <span
      className={cn(
        'px-2.5 py-1 rounded-md text-xs font-medium inline-flex items-center border whitespace-nowrap bg-card text-card-foreground border-border',
        styles.bg,
        styles.border,
        styles.text,
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusChip;
