import type { Meta } from '@storybook/react';
import React from 'react';
import { SidebarProvider } from '@/core/components/ui/sidebar';
import AppSidebar from '@/core/components/AppSidebar';
import { Header } from '@/core/components/Header';
import { Button } from '@/core/components/ui/button';
import { Plus } from 'lucide-react';
import FilterSection from '@/core/components/FilterSection';
import { Input } from '@/core/components/ui/input';
import { Select } from '@/core/components/ui/select';
import { EmptyState } from '@/core/components/EmptyState';
import { DataTable } from '@/core/components/DataTable';

import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
    title: '4-Layouts/Page Templates',
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/']}>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;

const StandardPageTemplate = ({ children }: { children: React.ReactNode }) => (
    // NOTA: Este SidebarProvider envuelve toda la app en la implementación real (App.tsx)
    <SidebarProvider>
        <div className="flex h-screen w-full bg-slate-50">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header pageTitle="Gestión de Siniestros" userName="Demo User" />

                {/* Main Content Area - SIEMPRE usar flex-1 overflow-auto bg-slate-50/100 */}
                <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    </SidebarProvider>
);

export const EntityListLayout = () => {
    return (
        <StandardPageTemplate>


            {/* 2. Filters Section (Standardized) */}
            <FilterSection>
                <div>
                    <label htmlFor="search-input" className="text-xs font-medium text-gray-500 mb-1 block">Búsqueda</label>
                    <Input id="search-input" placeholder="Buscar por nombre..." className="h-9 text-sm" />
                </div>
                <div>
                    <label htmlFor="status-select" className="text-xs font-medium text-gray-500 mb-1 block">Estado</label>
                    <Select id="status-select" className="h-9 text-sm" placeholder="Todos" options={[{ value: '1', label: 'Activo' }]} />
                </div>
            </FilterSection>

            {/* 3. Actions Toolbar */}
            <div className="flex justify-end mb-4">
                <Button className="rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Registro
                </Button>
            </div>

            {/* 4. Main Data Table */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <DataTable
                    data={[
                        { id: 1, nombre: 'Juan Perez', estado: 'Activo', fecha: '2024-01-15', cargo: 'Desarrollador' },
                        { id: 2, nombre: 'Maria Gomez', estado: 'Pendiente', fecha: '2024-02-01', cargo: 'Diseñadora' },
                        { id: 3, nombre: 'Carlos Lopez', estado: 'Activo', fecha: '2023-11-20', cargo: 'Analista' },
                    ]}
                    columns={[
                        { key: 'nombre', header: 'Nombre' },
                        { key: 'cargo', header: 'Cargo' },
                        { key: 'fecha', header: 'Fecha Ingreso' },
                        {
                            key: 'estado', header: 'Estado', cell: (row) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {row.estado}
                                </span>
                            )
                        }
                    ]}
                    showActions
                    onView={() => console.log('view')}
                    onEdit={() => console.log('edit')}
                />
            </div>
        </StandardPageTemplate>
    );
};
