import React from 'react';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Select } from '@/core/components/ui/select';
import { TIPOS_DOCUMENTO } from '../data/constants';
import { AffiliateData } from '../types';

interface AffiliateIdentificationProps {
    values: AffiliateData;
    onChange: (field: keyof AffiliateData, value: string) => void;
    errors: Partial<Record<keyof AffiliateData, string>>;
}

export const AffiliateIdentification: React.FC<AffiliateIdentificationProps> = ({
    values,
    onChange,
    errors,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Basic normalization could happen here if needed, but passing raw value for now
        onChange(name as keyof AffiliateData, value);
    };

    return (
        <div className="space-y-6 border-b pb-6 mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Identificación del Afiliado</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                    <Select
                        id="tipoDocumento"
                        name="tipoDocumento"
                        options={TIPOS_DOCUMENTO.map((t) => ({ label: t, value: t }))}
                        value={values.tipoDocumento}
                        onChange={handleInputChange}
                        error={!!errors.tipoDocumento}
                        placeholder="Seleccione..."
                    />
                    {errors.tipoDocumento && <p className="text-sm text-destructive">{errors.tipoDocumento}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="numeroDocumento">Número de Documento</Label>
                    <Input
                        id="numeroDocumento"
                        name="numeroDocumento"
                        value={values.numeroDocumento}
                        onChange={handleInputChange}
                        className={errors.numeroDocumento ? 'border-destructive' : ''}
                        placeholder="Sin puntos"
                    />
                    {errors.numeroDocumento && <p className="text-sm text-destructive">{errors.numeroDocumento}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="cuil">CUIL</Label>
                    <Input
                        id="cuil"
                        name="cuil"
                        value={values.cuil}
                        onChange={handleInputChange}
                        className={errors.cuil ? 'border-destructive' : ''}
                        placeholder="Sin guiones"
                    />
                    {errors.cuil && <p className="text-sm text-destructive">{errors.cuil}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={values.telefono}
                        onChange={handleInputChange}
                        className={errors.telefono ? 'border-destructive' : ''}
                        placeholder="Cod. área + número"
                    />
                    {errors.telefono && <p className="text-sm text-destructive">{errors.telefono}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input
                        id="nombre"
                        name="nombre"
                        value={values.nombre}
                        onChange={handleInputChange}
                        className={errors.nombre ? 'border-destructive' : ''}
                    />
                    {errors.nombre && <p className="text-sm text-destructive">{errors.nombre}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input
                        id="apellido"
                        name="apellido"
                        value={values.apellido}
                        onChange={handleInputChange}
                        className={errors.apellido ? 'border-destructive' : ''}
                    />
                    {errors.apellido && <p className="text-sm text-destructive">{errors.apellido}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleInputChange}
                        className={errors.email ? 'border-destructive' : ''}
                        placeholder="ejemplo@email.com"
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>
            </div>
        </div>
    );
};
