import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/Alert';

const meta: Meta<typeof Alert> = {
  title: '2-molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'success', 'warning', 'destructive'],
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      <AlertTitle>Información</AlertTitle>
      <AlertDescription>
        La preliquidación ha sido generada y está pendiente de aprobación.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
};

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        No se pudo cancelar la prestación. Por favor, intente nuevamente.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
};

export const Success: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      <AlertTitle>Operación exitosa</AlertTitle>
      <AlertDescription>
        Los cambios se guardaron correctamente.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert {...args} className="w-[450px]">
      <AlertTitle>Atención requerida</AlertTitle>
      <AlertDescription>
        Revisa los campos resaltados antes de continuar.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
};

export const SimpleMessage: Story = {
  args: {
    variant: 'success',
    title: '¡Éxito!',
    message: 'La operación se completó sin problemas usando props directas.'
  }
};