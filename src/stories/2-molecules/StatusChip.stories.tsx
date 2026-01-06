import type { Meta, StoryObj } from '@storybook/react';
import StatusChip, { Status } from '@/core/components/StatusChip';

const meta: Meta<typeof StatusChip> = {
  title: '2-molecules/StatusChip',
  component: StatusChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: [
        'Solicitada',
        'Aprobado',
        'Pendiente Informe',
        'Cancelada',
        'Turno Asignado',
        'Finalizada',
        'Preliquidado',
        'Pagada',
        'Con Informe',
      ] as Status[],
      description: 'Estado a mostrar en el chip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

// Historia para estado Solicitada (Amarillo/Naranja)
export const Solicitada: Story = {
  args: {
    status: 'Solicitada',
  },
};

// Historia para estado Aprobado (Verde)
export const Aprobado: Story = {
  args: {
    status: 'Aprobado',
  },
};

// Historia para estado Pendiente Informe (Naranja)
export const PendienteInforme: Story = {
  args: {
    status: 'Pendiente Informe',
  },
};

// Historia para estado Cancelada (Rojo)
export const Cancelada: Story = {
  args: {
    status: 'Cancelada',
  },
};

// Historia para estado Turno Asignado (Azul)
export const TurnoAsignado: Story = {
  args: {
    status: 'Turno Asignado',
  },
};

// Historia para estado Finalizada (Gris)
export const Finalizada: Story = {
  args: {
    status: 'Finalizada',
  },
};

// Historia para estado Preliquidado (Púrpura)
export const Preliquidado: Story = {
  args: {
    status: 'Preliquidado',
  },
};

// Historia para estado Pagada (Verde oscuro)
export const Pagada: Story = {
  args: {
    status: 'Pagada',
  },
};

// Historia para estado Con Informe (Cyan)
export const ConInforme: Story = {
  args: {
    status: 'Con Informe',
  },
};

// Historia con todos los estados juntos
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Estados Pendientes
        </h3>
        <div className="flex flex-wrap gap-2">
          <StatusChip status="Solicitada" />
          <StatusChip status="Turno Asignado" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Estados en Proceso
        </h3>
        <div className="flex flex-wrap gap-2">
          <StatusChip status="Aprobado" />
          <StatusChip status="Pendiente Informe" />
          <StatusChip status="Con Informe" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Estados de Liquidación
        </h3>
        <div className="flex flex-wrap gap-2">
          <StatusChip status="Preliquidado" />
          <StatusChip status="Pagada" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Estados Finalizados/Cancelados
        </h3>
        <div className="flex flex-wrap gap-2">
          <StatusChip status="Finalizada" />
          <StatusChip status="Cancelada" />
        </div>
      </div>
    </div>
  ),
};

// Historia mostrando los chips en una tabla
export const InTableContext: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="text-left p-4 text-sm font-bold text-gray-700">
              Prestación
            </th>
            <th className="text-left p-4 text-sm font-bold text-gray-700">
              Afiliado
            </th>
            <th className="text-left p-4 text-sm font-bold text-gray-700">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Consulta Médica</td>
            <td className="p-4 text-sm">Juan Pérez</td>
            <td className="p-4">
              <StatusChip status="Solicitada" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Análisis Clínicos</td>
            <td className="p-4 text-sm">María García</td>
            <td className="p-4">
              <StatusChip status="Aprobado" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Radiografía</td>
            <td className="p-4 text-sm">Carlos López</td>
            <td className="p-4">
              <StatusChip status="Pendiente Informe" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Ecografía</td>
            <td className="p-4 text-sm">Ana Martínez</td>
            <td className="p-4">
              <StatusChip status="Con Informe" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Resonancia</td>
            <td className="p-4 text-sm">Luis Rodríguez</td>
            <td className="p-4">
              <StatusChip status="Preliquidado" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Tomografía</td>
            <td className="p-4 text-sm">Laura Fernández</td>
            <td className="p-4">
              <StatusChip status="Pagada" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Consulta Cardiológica</td>
            <td className="p-4 text-sm">Roberto Gómez</td>
            <td className="p-4">
              <StatusChip status="Cancelada" />
            </td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-4 text-sm">Fisioterapia</td>
            <td className="p-4 text-sm">Sofía Castro</td>
            <td className="p-4">
              <StatusChip status="Finalizada" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

// Historia con variaciones de tamaño usando className
export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-gray-500 mb-2">Tamaño por defecto</p>
        <StatusChip status="Aprobado" />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Tamaño más grande (custom)</p>
        <StatusChip
          status="Preliquidado"
          className="px-4 py-2 text-base"
        />
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-2">Tamaño más pequeño (custom)</p>
        <StatusChip
          status="Cancelada"
          className="px-2 py-0.5 text-xs"
        />
      </div>
    </div>
  ),
};
