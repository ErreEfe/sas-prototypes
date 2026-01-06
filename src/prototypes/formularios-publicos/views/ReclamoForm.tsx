import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';
import { Select } from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';
import { Input } from '@/core/components/ui/input';
import { AffiliateIdentification } from '../components/AffiliateIdentification';
import { MOTIVOS_RECLAMO } from '../data/constants';
import { validateAffiliate } from '../utils/validation';
import { ReclamoData } from '../types';

const initialValues: ReclamoData = {
    tipoDocumento: '',
    numeroDocumento: '',
    cuil: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    motivoReclamo: '',
    descripcion: '',
    numeroSiniestro: '',
};

export const ReclamoForm = () => {
    const [values, setValues] = useState<ReclamoData>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof ReclamoData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (field: keyof ReclamoData, value: any) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleAffiliateChange = (field: string, value: string) => {
        handleChange(field as keyof ReclamoData, value);
    };

    const validate = () => {
        const affiliateErrors = validateAffiliate(values);
        const formErrors: typeof errors = { ...affiliateErrors };

        if (!values.motivoReclamo) formErrors.motivoReclamo = 'Requerido';
        if (!values.descripcion) formErrors.descripcion = 'Requerido';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert('Reclamo enviado con éxito (Simulación)');
        setIsSubmitting(false);
        setValues(initialValues);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <AffiliateIdentification
                values={values}
                onChange={handleAffiliateChange}
                errors={errors}
            />

            <div className="space-y-6">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">Detalle del Reclamo</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="motivoReclamo">Motivo</Label>
                        <Select
                            id="motivoReclamo"
                            name="motivoReclamo"
                            options={MOTIVOS_RECLAMO.map(t => ({ label: t, value: t }))}
                            value={values.motivoReclamo}
                            onChange={(e) => handleChange('motivoReclamo', e.target.value)}
                            error={!!errors.motivoReclamo}
                            placeholder="Seleccione..."
                        />
                        {errors.motivoReclamo && <p className="text-sm text-destructive">{errors.motivoReclamo}</p>}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="numeroSiniestro">Número de Siniestro (Opcional)</Label>
                        <Input
                            id="numeroSiniestro"
                            name="numeroSiniestro"
                            value={values.numeroSiniestro || ''}
                            onChange={(e) => handleChange('numeroSiniestro', e.target.value)}
                            placeholder="Ej: 123456"
                        />
                    </div>

                    <div className="space-y-2 lg:col-span-4">
                        <Label htmlFor="descripcion">Descripción</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            value={values.descripcion}
                            onChange={(e) => handleChange('descripcion', e.target.value)}
                            className={errors.descripcion ? 'border-destructive' : ''}
                            placeholder="Describa el problema..."
                            rows={3}
                        />
                        {errors.descripcion && <p className="text-sm text-destructive">{errors.descripcion}</p>}
                    </div>

                    <div className="space-y-2 lg:col-span-4">
                        <Label htmlFor="adjuntos">Adjuntar Evidencia (Opcional)</Label>
                        <Input
                            id="adjuntos"
                            type="file"
                            multiple
                            onChange={() => { }}
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button type="submit" size="lg" variant="destructive" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar Reclamo'}
                </Button>
            </div>
        </form>
    );
};
