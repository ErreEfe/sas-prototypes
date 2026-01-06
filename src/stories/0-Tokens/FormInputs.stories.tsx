import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Input } from '@/core/components/ui/input';
import { Select } from '@/core/components/ui/select';
import Autocomplete from '@/core/components/Autocomplete';
import { Button } from '@/core/components/ui/button';
import { Mail, Lock, Search, Calendar } from 'lucide-react';

const meta: Meta = {
    title: '2-Molecules/Form Inputs Showcase',
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;

export const AllInputs = () => {
    const [autocompleteValue, setAutocompleteValue] = useState<{ value: string; label: string } | null>(null);
    const [autocompleteInput, setAutocompleteInput] = useState('');

    const countries = [
        { value: 'ar', label: 'Argentina' },
        { value: 'br', label: 'Brasil' },
        { value: 'cl', label: 'Chile' },
        { value: 'uy', label: 'Uruguay' },
        { value: 'py', label: 'Paraguay' },
    ];

    return (
        <div className="space-y-8 max-w-2xl mx-auto p-6 bg-card rounded-lg border shadow-sm">
            <div className="border-b pb-4">
                <h2 className="text-2xl font-bold text-foreground">Form Inputs Showcase</h2>
                <p className="text-muted-foreground">Documentación de los distintos tipos de inputs disponibles en el sistema.</p>
            </div>

            {/* 1. Text Inputs */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">1. Text Fields</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Standard Text</label>
                        <Input placeholder="Escribe algo..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">With Icon (Start)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                            </span>
                            <Input className="pl-9" placeholder="email@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">With Icon (End)</label>
                        <div className="relative">
                            <Input className="pr-9" placeholder="Buscar..." />
                            <span className="absolute right-3 top-2.5 text-muted-foreground">
                                <Search className="h-4 w-4" />
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-muted-foreground">
                                <Lock className="h-4 w-4" />
                            </span>
                            <Input type="password" className="pl-9" placeholder="••••••••" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Selects */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">2. Selects</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Standard Select</label>
                        <Select
                            placeholder="Seleccionar país..."
                            options={[
                                { value: 'ar', label: 'Argentina' },
                                { value: 'co', label: 'Colombia' },
                                { value: 'mx', label: 'México' },
                            ]}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Disabled Select</label>
                        <Select
                            disabled
                            placeholder="No seleccionable"
                            options={[]}
                        />
                    </div>
                </div>
            </section>

            {/* 3. Dates */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">3. Date Pickers</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date Input</label>
                        <Input type="date" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Datetime Input</label>
                        <Input type="datetime-local" />
                    </div>
                </div>
            </section>

            {/* 4. Autocomplete */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">4. Autocomplete</h3>
                <div className="space-y-2">
                    <Autocomplete<{ value: string; label: string }>
                        id="country-autocomplete"
                        label="Búsqueda de Países (Autocomplete)"
                        placeholder="Escribe para buscar..."
                        options={countries}
                        getOptionLabel={(option) => option.label}
                        getOptionValue={(option) => option.value}
                        value={autocompleteValue}
                        onChange={setAutocompleteValue}
                        inputValue={autocompleteInput}
                        onInputChange={setAutocompleteInput}
                    />
                    <p className="text-xs text-muted-foreground">
                        Seleccionado: {autocompleteValue ? autocompleteValue.label : 'Ninguno'}
                    </p>
                </div>
            </section>

            {/* 5. Textarea */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">5. Textarea</h3>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Comentarios</label>
                    <textarea
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Escribe tu mensaje aquí..."
                    />
                </div>
            </section>
        </div>
    );
};
