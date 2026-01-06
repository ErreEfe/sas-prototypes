import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, ColumnDef } from '@/core/components/DataTable';
import StatusChip, { Status } from '@/core/components/StatusChip';
import { useState } from 'react';
import type { PrestacionData } from '@/core/utils/prestaciones-helpers';
import { getPrestacionDisplayStatus } from '@/core/utils/prestaciones-helpers';

// Datos de ejemplo simples
const simpleData = [
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Admin' },
  { id: 2, name: 'María García', email: 'maria@example.com', role: 'User' },
  { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'User' },
  { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Editor' },
  { id: 5, name: 'Luis Rodríguez', email: 'luis@example.com', role: 'Admin' },
];

// Datos de ejemplo para prestaciones
const prestacionesData: PrestacionData[] = [
  {
    id: 1,
    afiliado: { nombre: 'Gomez, Juan Carlos', dni: '25.123.456' },
    prestacion: 'Consulta Médica General',
    cie10: 'Z00.0',
    estado: 'Aprobado',
    observacion: 'Control anual',
    turno: '2025-10-25T10:00:00Z',
    atencionConfirmada: false,
    monto: 1500,
    denuncia: 'D-2024-001',
    autorizacionId: 'AUTH-001',
  },
  {
    id: 2,
    afiliado: { nombre: 'Fernández, María Laura', dni: '30.456.789' },
    prestacion: 'Análisis Clínicos',
    cie10: 'R79.9',
    estado: 'Pendiente',
    observacion: 'Requiere autorización',
    turno: null,
    atencionConfirmada: false,
    monto: 2500,
    denuncia: 'D-2024-002',
    autorizacionId: 'AUTH-002',
  },
  {
    id: 3,
    afiliado: { nombre: 'Martínez, Roberto', dni: '28.789.123' },
    prestacion: 'Radiografía de Tórax',
    cie10: 'R91',
    estado: 'Preliquidado',
    observacion: 'Completado',
    turno: '2025-10-20T14:00:00Z',
    atencionConfirmada: true,
    informe: 'Informe médico adjunto',
    monto: 3200,
    denuncia: 'D-2024-003',
    autorizacionId: 'AUTH-003',
  },
  {
    id: 4,
    afiliado: { nombre: 'López, Ana María', dni: '32.654.987' },
    prestacion: 'Consulta Cardiológica',
    cie10: 'I10',
    estado: 'Cancelado',
    observacion: 'Cancelada por paciente',
    turno: null,
    atencionConfirmada: false,
    monto: 4500,
    motivoCancelacion: 'Paciente no puede asistir',
    denuncia: 'D-2024-004',
    autorizacionId: 'AUTH-004',
  },
  {
    id: 5,
    afiliado: { nombre: 'Rodríguez, Carlos', dni: '27.321.654' },
    prestacion: 'Fisioterapia',
    cie10: 'M62.8',
    estado: 'Aprobado',
    observacion: 'Sesión programada',
    turno: '2025-11-05T16:00:00Z',
    atencionConfirmada: false,
    monto: 2800,
    denuncia: 'D-2024-005',
    autorizacionId: 'AUTH-005',
  },
  {
    id: 6,
    afiliado: { nombre: 'García, Elena', dni: '29.987.654' },
    prestacion: 'Ecografía Abdominal',
    cie10: 'R10.4',
    estado: 'Aprobado',
    observacion: 'Turno confirmado',
    turno: '2025-10-15T09:00:00Z',
    atencionConfirmada: true,
    monto: 3800,
    denuncia: 'D-2024-006',
    autorizacionId: 'AUTH-006',
  },
  {
    id: 7,
    afiliado: { nombre: 'Sánchez, Pedro', dni: '31.234.567' },
    prestacion: 'Resonancia Magnética',
    cie10: 'M51.1',
    estado: 'Aprobado',
    observacion: 'Con informe médico',
    turno: '2025-10-10T11:00:00Z',
    atencionConfirmada: true,
    informe: 'Informe de resonancia completo',
    monto: 8500,
    denuncia: 'D-2024-007',
    autorizacionId: 'AUTH-007',
  },
  {
    id: 8,
    afiliado: { nombre: 'Ramírez, Lucía', dni: '26.876.543' },
    prestacion: 'Consulta Traumatológica',
    cie10: 'S83.2',
    estado: 'Pagada',
    observacion: 'Pago procesado',
    turno: '2025-09-20T15:00:00Z',
    atencionConfirmada: true,
    informe: 'Tratamiento completado',
    monto: 5200,
    denuncia: 'D-2024-008',
    autorizacionId: 'AUTH-008',
  },
];

const meta: Meta<typeof DataTable> = {
  title: '3-organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Columnas básicas
const basicColumns: ColumnDef<typeof simpleData[0]>[] = [
  { key: 'name', header: 'Nombre' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Rol' },
];

// Historia básica
export const Basic: Story = {
  args: {
    data: simpleData,
    columns: basicColumns,
  },
};

// Historia con selección
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleRowSelect = (rowId: number) => {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      setSelectedRows(newSelected);
    };

    const handleSelectAll = (selectAll: boolean) => {
      if (selectAll) {
        setSelectedRows(new Set(simpleData.map((row) => row.id)));
      } else {
        setSelectedRows(new Set());
      }
    };

    return (
      <div>
        <p className="mb-4 text-sm text-gray-600">
          Seleccionadas: {selectedRows.size} de {simpleData.length}
        </p>
        <DataTable
          data={simpleData}
          columns={basicColumns}
          selectable
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />
      </div>
    );
  },
};

// Historia con acciones
export const WithActions: Story = {
  render: () => (
    <DataTable
      data={simpleData}
      columns={basicColumns}
      showActions
      onView={(row: typeof simpleData[0]) => alert(`Ver detalles de: ${row.name}`)}
      onEdit={(row: typeof simpleData[0]) => alert(`Editar: ${row.name}`)}
      onDelete={(row: typeof simpleData[0]) => alert(`Eliminar: ${row.name}`)}
    />
  ),
};

// Columnas para prestaciones
const prestacionesColumns: ColumnDef<PrestacionData>[] = [
  {
    key: 'afiliado',
    header: 'Afiliado',
    cell: (row: PrestacionData) => (
      <div>
        <div className="font-medium">{row.afiliado.nombre}</div>
        <div className="text-sm text-gray-500">DNI: {row.afiliado.dni}</div>
      </div>
    ),
  },
  {
    key: 'prestacion',
    header: 'Prestación',
    cell: (row: PrestacionData) => (
      <div>
        <div>{row.prestacion}</div>
        <div className="text-sm text-gray-500">CIE10: {row.cie10}</div>
      </div>
    ),
  },
  {
    key: 'denuncia',
    header: 'Denuncia',
  },
  {
    key: 'turno',
    header: 'Turno',
    cell: (row: PrestacionData) =>
      row.turno
        ? new Date(row.turno).toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
        : 'Sin turno',
  },
  {
    key: 'estado',
    header: 'Estado',
    cell: (row: PrestacionData) => {
      const displayStatus = getPrestacionDisplayStatus(row);
      // Mapeo de displayStatus.text a los estados válidos de StatusChip
      const statusMap: Record<string, Status> = {
        'Solicitada': 'Solicitada',
        'Aprobado': 'Aprobado',
        'Pendiente informe': 'Pendiente Informe',
        'Cancelado': 'Cancelada',
        'Preliquidado': 'Preliquidado',
        'Pagada': 'Pagada',
        'Con Informe': 'Con Informe',
      };
      const chipStatus = statusMap[displayStatus.text] || 'Solicitada';
      return <StatusChip status={chipStatus} />;
    },
    className: 'whitespace-nowrap',
  },
  {
    key: 'monto',
    header: 'Monto',
    cell: (row: PrestacionData) => `$${row.monto.toLocaleString('es-AR')}`,
    className: 'text-right',
    headerClassName: 'text-right',
  },
];

// Historia de tabla de prestaciones
export const PrestacionesTable: Story = {
  args: {
    data: prestacionesData,
    columns: prestacionesColumns,
    showActions: true,
    onView: (row: PrestacionData) => console.log('Ver prestación:', row),
    onEdit: (row: PrestacionData) => console.log('Editar prestación:', row),
    onSchedule: (row: PrestacionData) => console.log('Asignar turno:', row),
  },
};

// Historia completa con selección y acciones
export const Complete: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

    const handleRowSelect = (rowId: number) => {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      setSelectedRows(newSelected);
    };

    const handleSelectAll = (selectAll: boolean) => {
      if (selectAll) {
        setSelectedRows(new Set(prestacionesData.map((row) => row.id)));
      } else {
        setSelectedRows(new Set());
      }
    };

    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Seleccionadas: {selectedRows.size} de {prestacionesData.length}
          </p>
          {selectedRows.size > 0 && (
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                onClick={() => alert(`Crear preliquidación con ${selectedRows.size} prestaciones`)}
              >
                Crear Preliquidación
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
                onClick={() => setSelectedRows(new Set())}
              >
                Limpiar selección
              </button>
            </div>
          )}
        </div>
        <DataTable
          data={prestacionesData}
          columns={prestacionesColumns}
          selectable
          showActions
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          onView={(row: PrestacionData) => alert(`Ver prestación ${row.id}`)}
          onEdit={(row: PrestacionData) => alert(`Editar prestación ${row.id}`)}
          onSchedule={(row: PrestacionData) => alert(`Asignar turno para ${row.afiliado.nombre}`)}
        />
      </div>
    );
  },
};

// Historia con estado vacío
export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
  },
};

// Historia con muchas acciones
export const AllActions: Story = {
  render: () => (
    <DataTable
      data={simpleData}
      columns={basicColumns}
      showActions
      onView={(row: typeof simpleData[0]) => console.log('Ver:', row)}
      onEdit={(row: typeof simpleData[0]) => console.log('Editar:', row)}
      onDelete={(row: typeof simpleData[0]) => console.log('Eliminar:', row)}
      onSchedule={(row: typeof simpleData[0]) => console.log('Programar:', row)}
      onConfirm={(row: typeof simpleData[0]) => console.log('Confirmar:', row)}
      onCancel={(row: typeof simpleData[0]) => console.log('Cancelar:', row)}
    />
  ),
};
