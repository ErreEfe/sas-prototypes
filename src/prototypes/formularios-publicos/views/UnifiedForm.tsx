import React, { useState } from 'react';
import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';
import { Select } from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';
import { Input } from '@/core/components/ui/input';
import { Plus, Search, UserCheck, CheckCircle, FileText, Mail, ArrowRight } from 'lucide-react';
import { AffiliateIdentification } from '../components/AffiliateIdentification';
import { TIPOS_CONSULTA, MOTIVOS_RECLAMO } from '../data/constants';
import { validateAffiliate } from '../utils/validation';
import { UnifiedFormData, TipoTramite } from '../types';

const MOCK_AFILIADOS: Record<string, { nombre: string; apellido: string; cuil: string; email: string; telefono: string; siniestros: string[] }> = {
    '12345678': {
        nombre: 'Juan',
        apellido: 'Pérez',
        cuil: '20123456789',
        email: 'juan.perez@email.com',
        telefono: '1144556677',
        siniestros: ['SN-2023-001', 'SN-2024-055', 'SN-2025-003']
    },
    '87654321': {
        nombre: 'Maria',
        apellido: 'Gómez',
        cuil: '27876543210',
        email: 'maria.gomez@email.com',
        telefono: '1122334455',
        siniestros: ['SN-2024-012']
    },
    '11223344': {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        cuil: '20112233445',
        email: 'carlos.rod@email.com',
        telefono: '1199887766',
        siniestros: []
    },
};

const initialValues: UnifiedFormData = {
    tipoDocumento: '',
    numeroDocumento: '',
    cuil: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    tipoTramite: 'CONSULTA',
    motivo: '',
    descripcion: '',
    numeroSiniestro: '',
};

export const UnifiedForm = () => {
    const [values, setValues] = useState<UnifiedFormData>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof UnifiedFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [availableSiniestros, setAvailableSiniestros] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [lookupFound, setLookupFound] = useState(false);
    const [submittedData, setSubmittedData] = useState<{ id: string, email: string } | null>(null);

    const handleChange = (field: keyof UnifiedFormData, value: any) => {
        setValues((prev) => ({ ...prev, [field]: value }));

        // Lookup simulation when Document Number changes
        if (field === 'numeroDocumento') {
            if (value.length >= 7) {
                setIsSearching(true);
                setLookupFound(false);
                // Simulate network delay
                setTimeout(() => {
                    const data = MOCK_AFILIADOS[value];
                    if (data) {
                        setValues(prev => ({
                            ...prev,
                            nombre: data.nombre,
                            apellido: data.apellido,
                            cuil: data.cuil,
                            email: data.email,
                            telefono: data.telefono
                        }));
                        setAvailableSiniestros(data.siniestros);
                        setLookupFound(true);
                    } else {
                        setAvailableSiniestros([]);
                        setLookupFound(false);
                    }
                    setIsSearching(false);
                }, 800);
            } else {
                setAvailableSiniestros([]);
                setLookupFound(false);
            }
        }

        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleAffiliateChange = (field: string, value: string) => {
        handleChange(field as keyof UnifiedFormData, value);
    };

    const validate = () => {
        const affiliateErrors = validateAffiliate(values);
        const formErrors: any = { ...affiliateErrors };

        if (!values.motivo) formErrors.motivo = 'Requerido';
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

        const procedureId = `TR-${Math.floor(100000 + Math.random() * 900000)}`;
        setSubmittedData({ id: procedureId, email: values.email });

        setIsSubmitting(false);
    };

    const handleReset = () => {
        setValues(initialValues);
        setAvailableSiniestros([]);
        setLookupFound(false);
        setSubmittedData(null);
    };

    if (submittedData) {
        return (
            <div className="py-12 px-6 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-2">¡Solicitud Enviada!</h2>
                <p className="text-muted-foreground text-lg max-w-md mb-8">
                    Hemos recibido correctamente su trámite. Un asesor se pondrá en contacto a la brevedad.
                </p>

                <div className="w-full max-w-md bg-white rounded-2xl border-2 border-dashed border-muted p-8 mb-8 space-y-6">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Número de Trámite</span>
                        <div className="flex items-center gap-2 text-2xl font-mono font-black text-primary bg-primary/5 px-4 py-2 rounded-lg">
                            <FileText className="w-6 h-6" />
                            {submittedData.id}
                        </div>
                    </div>

                    <div className="h-px bg-muted w-full" />

                    <div className="flex items-start gap-4 text-left">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">Confirmación enviada</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Enviamos los detalles de su gestión al correo:<br />
                                <span className="font-bold text-foreground">{submittedData.email}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    className="group"
                >
                    Realizar otro trámite
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        );
    }

    const getMotivoLabel = () => {
        return values.tipoTramite === 'CONSULTA' ? 'Motivo de consulta' : 'Motivo de reclamo';
    };

    const getOptions = () => {
        const options = values.tipoTramite === 'CONSULTA' ? TIPOS_CONSULTA : MOTIVOS_RECLAMO;
        return options.map(t => ({ label: t, value: t }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
                <AffiliateIdentification
                    values={values}
                    onChange={handleAffiliateChange}
                    errors={errors}
                />
                <div className="absolute top-2 right-2 flex items-center gap-2">
                    {isSearching && (
                        <div className="flex items-center gap-2 text-primary animate-pulse bg-white/80 px-3 py-1 rounded-full shadow-sm border">
                            <Search className="w-3 h-3 animate-spin" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Buscando...</span>
                        </div>
                    )}
                    {lookupFound && !isSearching && (
                        <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full shadow-sm border border-green-200 animate-in fade-in zoom-in duration-300">
                            <UserCheck className="w-3 h-3" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Datos Recuperados</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center gap-3 border-b pb-2">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">Detalle del Trámite</h2>
                    <div className="h-px flex-1 bg-muted" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tipo de Trámite */}
                    <div className="space-y-2">
                        <Label htmlFor="tipoTramite">Tipo de Trámite</Label>
                        <Select
                            id="tipoTramite"
                            name="tipoTramite"
                            options={[
                                { label: 'Consulta', value: 'CONSULTA' },
                                { label: 'Reclamo', value: 'RECLAMO' }
                            ]}
                            value={values.tipoTramite}
                            onChange={(e) => {
                                handleChange('tipoTramite', e.target.value);
                                handleChange('motivo', ''); // Reset motivo when type changes
                            }}
                        />
                    </div>

                    {/* Motivo (Dinámico) */}
                    <div className="space-y-2">
                        <Label htmlFor="motivo">{getMotivoLabel()}</Label>
                        <Select
                            id="motivo"
                            name="motivo"
                            options={getOptions()}
                            value={values.motivo}
                            onChange={(e) => handleChange('motivo', e.target.value)}
                            error={!!errors.motivo}
                            placeholder="Seleccione..."
                        />
                        {errors.motivo && <p className="text-sm text-destructive">{errors.motivo}</p>}
                    </div>

                    {/* Selector de Siniestro (Basado en búsqueda DNI) */}
                    {/* Selector de Siniestro (Basado en búsqueda DNI) */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="numeroSiniestro">Número de Siniestro (Opcional)</Label>
                        {availableSiniestros.length > 0 ? (
                            <div className="space-y-2">
                                <Select
                                    id="numeroSiniestro"
                                    name="numeroSiniestro"
                                    options={availableSiniestros.map(s => ({ label: s, value: s }))}
                                    value={values.numeroSiniestro || ''}
                                    onChange={(e) => handleChange('numeroSiniestro', e.target.value)}
                                    placeholder="Seleccione un número de siniestro"
                                />
                                <p className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-1 animate-in slide-in-from-left-2">
                                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                    Se han encontrado {availableSiniestros.length} siniestros disponibles.
                                </p>
                            </div>
                        ) : (
                            <Input
                                id="numeroSiniestro"
                                name="numeroSiniestro"
                                value={values.numeroSiniestro || ''}
                                onChange={(e) => handleChange('numeroSiniestro', e.target.value)}
                                placeholder={
                                    values.numeroDocumento.length < 7
                                        ? "Ingrese DNI para buscar o tipee el número si lo tiene..."
                                        : "Tipee el número de siniestro aquí"
                                }
                            />
                        )}
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="descripcion">Descripción detallada</Label>
                        <Textarea
                            id="descripcion"
                            name="descripcion"
                            value={values.descripcion}
                            onChange={(e) => handleChange('descripcion', e.target.value)}
                            className={errors.descripcion ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'}
                            placeholder="Describa el motivo de su contacto aquí..."
                            rows={4}
                        />
                        {errors.descripcion && <p className="text-sm text-destructive">{errors.descripcion}</p>}
                    </div>

                    {/* Adjuntos */}
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="adjuntos">Adjuntar Archivos (Opcional)</Label>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-all cursor-pointer group border-muted-foreground/20 hover:border-primary/50">
                            <Input
                                id="adjuntos"
                                type="file"
                                multiple
                                onChange={() => { }}
                                className="hidden"
                            />
                            <label htmlFor="adjuntos" className="cursor-pointer">
                                <div className="flex flex-col items-center">
                                    <div className="p-4 bg-primary/5 rounded-full mb-3 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                                        <Plus className="w-8 h-8 text-primary" />
                                    </div>
                                    <span className="text-sm font-semibold text-foreground">Haga clic o arrastre archivos aquí</span>
                                    <span className="text-xs text-muted-foreground mt-2 bg-muted px-2 py-1 rounded">PNG, JPG, PDF (Máx. 10MB)</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t flex justify-end gap-3">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleReset}
                    disabled={isSubmitting}
                >
                    Limpiar Formulario
                </Button>
                <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className={`min-w-[220px] shadow-lg transition-all duration-500 hover:shadow-xl active:scale-95 ${values.tipoTramite === 'RECLAMO'
                        ? 'bg-red-600 hover:bg-red-700 active:bg-red-800'
                        : 'bg-primary hover:bg-primary/90'
                        }`}
                >
                    {isSubmitting ? 'Enviando trámite...' : `Enviar ${values.tipoTramite === 'CONSULTA' ? 'Consulta' : 'Reclamo'}`}
                </Button>
            </div>
        </form>
    );
};
