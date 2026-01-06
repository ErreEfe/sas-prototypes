import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/core/components/ui/table';
import { Eye, Edit, Calendar, Trash2, Check, X } from 'lucide-react';
import { IconButton } from '@/core/components/ui/icon-button';
import { cn } from '@/core/lib/utils';

// Tipos para las columnas de la tabla
export interface ColumnDef<T> {
  key: string;
  header: string;
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

// Props del DataTable
export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  selectable?: boolean;
  showActions?: boolean;
  selectedRows?: Set<number>;
  onRowSelect?: (rowId: number) => void;
  onSelectAll?: (selectAll: boolean) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onSchedule?: (row: T) => void;
  onConfirm?: (row: T) => void;
  onCancel?: (row: T) => void;
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
}

/**
 * DataTable - Componente de tabla reutilizable con soporte para:
 * - Selección múltiple mediante checkboxes
 * - Columna de acciones configurable
 * - Renderizado personalizado de celdas
 * - Estilos del sistema de diseño
 */
export function DataTable<T extends { id: number }>({
  data,
  columns,
  selectable = false,
  showActions = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  onView,
  onEdit,
  onDelete,
  onSchedule,
  onConfirm,
  onCancel,
  className,
  rowClassName,
  headerClassName,
}: DataTableProps<T>) {
  // Verificar si todas las filas están seleccionadas
  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  const handleSelectAll = () => {
    if (onSelectAll) {
      onSelectAll(!allSelected);
    }
  };

  return (
    <div className={cn('rounded-md border border-border bg-card text-card-foreground', className)}>
      <Table>
        <TableHeader className={cn('bg-muted', headerClassName)}>
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = someSelected;
                    }
                  }}
                  onChange={handleSelectAll}
                  className="h-4 w-4 cursor-pointer rounded border-input"
                  aria-label="Seleccionar todas las filas"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  'h-12 px-4 text-muted-foreground font-medium uppercase',
                  column.headerClassName
                )}
              >
                {column.header}
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="text-right h-12 px-4 text-muted-foreground font-medium uppercase">
                Acciones
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length + (selectable ? 1 : 0) + (showActions ? 1 : 0)
                }
                className="text-center text-muted-foreground h-24"
              >
                No hay datos para mostrar
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const isSelected = selectedRows.has(row.id);
              return (
                <TableRow
                  key={row.id}
                  data-state={isSelected ? 'selected' : undefined}
                  className={cn(
                    'bg-card border-b border-border hover:bg-muted/50',
                    rowClassName
                  )}
                >
                  {selectable && (
                    <TableCell className="w-12">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onRowSelect?.(row.id)}
                        className="h-4 w-4 cursor-pointer rounded border-input"
                        aria-label={`Seleccionar fila ${row.id}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn('px-4 py-4 text-foreground', column.className)}
                    >
                      {column.cell
                        ? column.cell(row)
                        : String((row as any)[column.key] ?? '')}
                    </TableCell>
                  ))}
                  {showActions && (
                    <TableCell className="text-right px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <IconButton
                            icon={<Eye className="h-5 w-5" />}
                            aria-label="Ver detalle"
                            onClick={() => onView(row)}
                          />
                        )}
                        {onEdit && (
                          <IconButton
                            icon={<Edit className="h-5 w-5" />}
                            aria-label="Editar"
                            onClick={() => onEdit(row)}
                          />
                        )}
                        {onSchedule && (
                          <IconButton
                            icon={<Calendar className="h-5 w-5" />}
                            aria-label="Asignar turno"
                            onClick={() => onSchedule(row)}
                          />
                        )}
                        {onConfirm && (
                          <IconButton
                            icon={<Check className="h-5 w-5 text-green-600" />}
                            aria-label="Confirmar"
                            onClick={() => onConfirm(row)}
                          />
                        )}
                        {onCancel && (
                          <IconButton
                            icon={<X className="h-5 w-5 text-red-600" />}
                            aria-label="Cancelar"
                            onClick={() => onCancel(row)}
                          />
                        )}
                        {onDelete && (
                          <IconButton
                            icon={<Trash2 className="h-5 w-5 text-red-600" />}
                            aria-label="Eliminar"
                            onClick={() => onDelete(row)}
                          />
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
