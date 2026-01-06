import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from '@/core/components/AppSidebar';
import { SidebarProvider } from '@/core/components/ui/sidebar';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof AppSidebar> = {
  title: '3-organisms/Sidebar',
  component: AppSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

// Historia básica del Sidebar
export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-8 bg-muted/30">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">Sidebar de shadcn</h1>
            <p className="text-muted-foreground mb-4">
              Este es el sidebar de la aplicación usando shadcn/ui. Incluye:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Menú principal con navegación</li>
              <li>Sección colapsable "Guías del Sistema"</li>
              <li>Iconos de lucide-react</li>
              <li>Responsive (desktop y móvil)</li>
              <li>Toggle interno al lado del logo</li>
              <li>Vista de solo iconos cuando está colapsado (con tooltips)</li>
            </ul>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
};

// Historia con el sidebar colapsado por defecto
export const Collapsed: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 p-8 bg-muted/30">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-4">Sidebar Colapsado</h1>
            <p className="text-muted-foreground mb-4">
              El sidebar está colapsado por defecto mostrando solo los iconos.
            </p>
            <p className="text-muted-foreground">
              Pasa el cursor sobre los iconos para ver tooltips con los nombres.
              Haz clic en el botón dentro del sidebar para expandirlo.
            </p>
          </div>
        </div>
      </div>
    </SidebarProvider>
  ),
};

// Historia mostrando el contenido completo
export const WithContent: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header simulado */}
          <header className="flex items-center justify-between h-16 px-6 bg-background border-b">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Gestión de Prestaciones</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-sm">Dr. Anibal</p>
                <p className="text-xs text-muted-foreground">Médico General</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                DA
              </div>
            </div>
          </header>

          {/* Contenido principal */}
          <main className="flex-1 bg-muted/30 p-6">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-4">Bienvenido al Sistema</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-background p-6 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-2">Prestaciones Solicitadas</h3>
                  <p className="text-3xl font-bold text-primary">24</p>
                </div>
                <div className="bg-background p-6 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-2">Pendientes de Informe</h3>
                  <p className="text-3xl font-bold text-orange-600">12</p>
                </div>
                <div className="bg-background p-6 rounded-lg border shadow-sm">
                  <h3 className="font-semibold mb-2">Preliquidaciones</h3>
                  <p className="text-3xl font-bold text-green-600">8</p>
                </div>
              </div>
              <div className="bg-background p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">
                  Actividad Reciente
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">Prestación #{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">
                          Paciente: Juan Pérez
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-md text-sm bg-blue-50 text-blue-700 border border-blue-500">
                        Aprobado
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  ),
};

// Historia mostrando solo el sidebar (para inspeccionar estilos)
export const SidebarOnly: Story = {
  render: () => (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen">
        <AppSidebar />
      </div>
    </SidebarProvider>
  ),
};

// Historia con vista móvil
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="flex items-center h-16 px-4 bg-background border-b">
            <h2 className="text-lg font-semibold ml-4">Inicio</h2>
          </header>
          <main className="flex-1 bg-muted/30 p-4">
            <h1 className="text-xl font-bold mb-4">Vista Móvil</h1>
            <p className="text-muted-foreground">
              En dispositivos móviles, el sidebar se muestra como un drawer
              deslizable. Toca el ícono del menú para abrirlo.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  ),
};
