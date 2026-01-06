import React from 'react';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Select } from '@/core/components/ui/select';

export const IncapacidadesFilters: React.FC = () => {
    return (
        <div className="bg-card text-card-foreground border border-border p-6 rounded-lg shadow-md mb-6 animate-in slide-in-from-top-2 fade-in duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Row 1 */}
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">ID Proceso</label>
                    <Input placeholder="Ej: INC-123456" className="h-9 text-sm" />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Nro. Denuncia</label>
                    <Input placeholder="Ingresar nro." className="h-9 text-sm" />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Empleado</label>
                    <Input placeholder="Nombre o Apellido" className="h-9 text-sm" />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">DNI</label>
                    <Input placeholder="Ingresar sin puntos" className="h-9 text-sm" />
                </div>

                {/* Row 2 */}
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Empleador</label>
                    <Input placeholder="Razón Social o CUIT" className="h-9 text-sm" />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Tipo Siniestro</label>
                    <Select
                        className="h-9 text-sm"
                        placeholder="Todos"
                        options={[
                            { value: "at", label: "Accidente de Trabajo" },
                            { value: "itinere", label: "Accidente de Trabajo In Itinere" },
                            { value: "ep", label: "Enfermedad Profesional" }
                        ]}
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Recalificación</label>
                    <Select
                        className="h-9 text-sm"
                        placeholder="Ambas"
                        options={[
                            { value: "si", label: "Si" },
                            { value: "no", label: "No" }
                        ]}
                    />
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-500 mb-1 block">Estado</label>
                    <Select
                        className="h-9 text-sm"
                        placeholder="Todos"
                        options={[
                            { value: "iniciado", label: "Iniciado" },
                            { value: "en-gestion", label: "En gestión" },
                            { value: "citado", label: "Citado" },
                            { value: "evaluacion", label: "Evaluación" },
                            { value: "cerrado", label: "Cerrado" }
                        ]}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline" size="sm" className="h-9 rounded-full px-6">
                    Limpiar filtros
                </Button>
                <Button size="sm" className="h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                    Buscar
                </Button>
            </div>
        </div>
    );
};

