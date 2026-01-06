import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/core/components/Input';
import { Mail, Search, Eye, EyeOff } from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: '2-Molecules/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: {
      control: false,
    },
    endAdornment: {
      control: false,
    }
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    id: 'default-input',
    label: 'Correo Electrónico',
    placeholder: 'tu.correo@ejemplo.com',
  },
};

export const WithHelpText: Story = {
  args: {
    id: 'help-text-input',
    label: 'Nombre de Usuario',
    placeholder: 'ej. juanperez',
    helpText: 'Este será tu nombre público en la plataforma.',
  },
};

export const WithIcon: Story = {
  args: {
    id: 'icon-input',
    label: 'Buscar',
    placeholder: 'Escribe para buscar...',
    icon: <Search className="w-5 h-5" />,
  },
};

export const WithError: Story = {
  args: {
    id: 'error-input',
    label: 'Contraseña',
    value: '123',
    error: 'La contraseña debe tener al menos 8 caracteres.',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled-input',
    label: 'Campo Deshabilitado',
    placeholder: 'No se puede editar',
    disabled: true,
  },
};

export const AllElements: Story = {
  args: {
    id: 'all-elements-input',
    label: 'Dirección de Envío',
    placeholder: 'Av. Siempre Viva 742',
    icon: <Mail className="w-5 h-5" />,
    helpText: 'Por favor, introduce la dirección completa.',
  },
};

export const WithEndAdornment: Story = {
  args: {
    id: 'end-adornment-input',
    label: 'Contraseña',
    type: 'password',
    placeholder: 'Ingresa tu contraseña',
    endAdornment: (
      <button type="button" className="text-text-secondary hover:text-text-primary transition">
        <Eye className="w-5 h-5" />
      </button>
    ),
  },
};

export const EmailWithIcon: Story = {
  args: {
    id: 'email-input',
    label: 'Correo Electrónico',
    type: 'email',
    placeholder: 'tu.correo@ejemplo.com',
    icon: <Mail className="w-5 h-5" />,
    helpText: 'Nunca compartiremos tu correo con nadie.',
  },
};