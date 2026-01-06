import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import FilterSection from '@/core/components/FilterSection';
import { Input } from '@/core/components/ui/input';
import { Select } from '@/core/components/ui/select';
import Autocomplete from '@/core/components/Autocomplete';

const meta: Meta<typeof FilterSection> = {
    title: '2-Molecules/FilterSection',
    component: FilterSection,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterSection>;

export const Default: Story = {
    render: (args) => (
        <FilterSection {...args}>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">ID Proceso</label>
                <Input placeholder="Ej: INC-123456" className="h-9 text-sm" />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Empleado</label>
                <Input placeholder="Nombre o Apellido" className="h-9 text-sm" />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Estado</label>
                <Select
                    className="h-9 text-sm"
                    placeholder="Seleccionar..."
                    options={[
                        { value: "abierto", label: "Abierto" },
                        { value: "cerrado", label: "Cerrado" }
                    ]}
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Fecha</label>
                <Input type="date" className="h-9 text-sm" />
            </div>
        </FilterSection>
    ),
    args: {
        onSearch: () => alert('Buscando...'),
        onClear: () => alert('Limpiando filtros...'),
    },
};

export const ComplexFilters: Story = {
    render: (args) => (
        <FilterSection {...args}>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Contrato</label>
                <Input placeholder="Nro Contrato" className="h-9 text-sm" />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Cliente</label>
                <Input placeholder="Razón Social" className="h-9 text-sm" />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Zona</label>
                <Select
                    className="h-9 text-sm"
                    placeholder="Todas"
                    options={[
                        { value: "norte", label: "Norte" },
                        { value: "centro", label: "Centro" },
                        { value: "sur", label: "Sur" }
                    ]}
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Prioridad</label>
                <Select
                    className="h-9 text-sm"
                    placeholder="Todas"
                    options={[
                        { value: "alta", label: "Alta" },
                        { value: "media", label: "Media" },
                        { value: "baja", label: "Baja" }
                    ]}
                />
            </div>
            <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Asignado a</label>
                <Input placeholder="Usuario" className="h-9 text-sm" />
            </div>
        </FilterSection>
    ),
    args: {
        onSearch: () => console.log('Buscar click'),
        onClear: () => console.log('Limpiar click'),
        searchLabel: 'Aplicar Filtros',
    },
};

export const AllInputTypes: Story = {
    render: (args) => {
        // Mock state for Autocomplete example
        const [autoValue, setAutoValue] = useState<{ value: string, label: string } | null>(null);
        const [autoInput, setAutoInput] = useState('');

        return (
            <FilterSection {...args}>
                {/* 1. Texto Simple */}
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Búsqueda por Texto</label>
                    <Input placeholder="Ej: Nombre..." className="h-9 text-sm" />
                </div>

                {/* 2. Select */}
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Selector (Select)</label>
                    <Select
                        className="h-9 text-sm"
                        placeholder="Seleccione..."
                        options={[
                            { value: "opt1", label: "Opción 1" },
                            { value: "opt2", label: "Opción 2" }
                        ]}
                    />
                </div>

                {/* 3. Fecha */}
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Selector de Fecha</label>
                    <Input type="date" className="h-9 text-sm" />
                </div>

                {/* 4. Autocomplete */}
                <div>
                    {/* Note: Autocomplete usually manages its own label, but here we enforce grid consistency */}
                    <Autocomplete<{ value: string; label: string }>
                        id="filter-autocomplete"
                        label="Autocompletado"
                        placeholder="Escribe para buscar..."
                        options={[{ value: '1', label: 'Resultado A' }, { value: '2', label: 'Resultado B' }]}
                        getOptionLabel={(o) => o.label}
                        getOptionValue={(o) => o.value}
                        value={autoValue}
                        onChange={setAutoValue}
                        inputValue={autoInput}
                        onInputChange={setAutoInput}
                    />
                </div>
            </FilterSection>
        );
    },
    args: {
        searchLabel: 'Filtrar',
    }
};
