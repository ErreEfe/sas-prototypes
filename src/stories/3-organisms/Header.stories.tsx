import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '@/core/components/Header';

const meta: Meta<typeof Header> = {
  title: '3-organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    pageTitle: {
      control: 'text',
      description: 'Título de la página que se muestra en el header',
    },
    userName: {
      control: 'text',
      description: 'Nombre del usuario actual',
    },
    userRole: {
      control: 'text',
      description: 'Rol o descripción del usuario',
    },
    userInitials: {
      control: 'text',
      description: 'Iniciales del usuario para mostrar en el avatar',
    },
    onMenuClick: {
      action: 'menu clicked',
      description: 'Se ejecuta cuando se hace clic en el botón del menú',
    },
    onLogout: {
      action: 'logout clicked',
      description: 'Se ejecuta cuando se hace clic en el botón de logout',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * Estado por defecto del Header con todos los elementos visibles.
 * Incluye: botón de menú, logo, título de página, información del usuario y botón de logout.
 */
export const Default: Story = {
  args: {
    pageTitle: 'Sistema de Administración de Siniestros',
    userName: 'Eduardo Romano',
    userRole: 'Usuario',
    userInitials: 'ER',
  },
};

/**
 * Header con un título de página diferente.
 */
export const GestionPrestaciones: Story = {
  args: {
    pageTitle: 'Gestión de Prestaciones',
    userName: 'Eduardo Romano',
    userRole: 'Usuario',
    userInitials: 'ER',
  },
};

/**
 * Header con información de un usuario médico.
 */
export const UsuarioMedico: Story = {
  args: {
    pageTitle: 'Mis Prestaciones',
    userName: 'Dr. Aníbal García',
    userRole: 'Médico General',
    userInitials: 'AG',
  },
};

/**
 * Header con información de un administrador.
 */
export const UsuarioAdmin: Story = {
  args: {
    pageTitle: 'Panel de Administración',
    userName: 'María González',
    userRole: 'Administrador',
    userInitials: 'MG',
  },
};

/**
 * Header con un título largo para probar el comportamiento del texto.
 */
export const TituloLargo: Story = {
  args: {
    pageTitle: 'Sistema de Administración de Siniestros y Gestión Integral de Prestaciones Médicas',
    userName: 'Eduardo Romano',
    userRole: 'Usuario',
    userInitials: 'ER',
  },
};

/**
 * Header con contenido de página simulado debajo.
 */
export const ConContenido: Story = {
  args: {
    pageTitle: 'Inicio',
    userName: 'Eduardo Romano',
    userRole: 'Usuario',
    userInitials: 'ER',
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50">
      <Header {...args} />
      <main className="p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Bienvenido al Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Prestaciones Activas</h3>
              <p className="text-4xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Pendientes</h3>
              <p className="text-4xl font-bold text-orange-600">8</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Completadas</h3>
              <p className="text-4xl font-bold text-green-600">156</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  ),
};
