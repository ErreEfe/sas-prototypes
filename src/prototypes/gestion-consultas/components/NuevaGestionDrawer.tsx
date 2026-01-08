import React, { useState } from 'react';
import Drawer from '@/core/components/Drawer';
import { Button } from '@/core/components/ui/button';
import { Label } from '@/core/components/ui/label';
import { Select } from '@/core/components/ui/select';
import { Textarea } from '@/core/components/ui/textarea';
import { Input } from '@/core/components/ui/input';
import { Search, UserCheck, Save, Paperclip, X, Plus } from 'lucide-react';
import { TIPOS_CONSULTA, MOTIVOS_RECLAMO } from '../../formularios-publicos/data/constants';
import { Caso, CanalIngreso, TipoCaso } from '../types';

interface NuevaGestionDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (nuevaGestion: Partial<Caso>) => void;
}

const MOCK_AFILIADOS: Record<string, { nombre: string; apellido: string; cuil: string; email: string; telefono: string; siniestros: string[]; empleador: string }> = {
    '12345678': {
        nombre: 'Juan',
        apellido: 'Pérez',
        cuil: '20123456789',
        email: 'juan.perez@email.com',
        telefono: '1144556677',
        siniestros: ['SN-2023-001', 'SN-2024-055', 'SN-2025-003'],
        empleador: 'Tech Solutions S.A.'
    },
    '87654321': {
        nombre: 'Maria',
        apellido: 'Gómez',
        cuil: '27876543210',
        email: 'maria.gomez@email.com',
        telefono: '1122334455',
        siniestros: ['SN-2024-012'],
        empleador: 'Construcciones Norte'
    },
    '11223344': {
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        cuil: '20112233445',
        email: 'carlos.rod@email.com',
        telefono: '1199887766',
        siniestros: [],
        empleador: 'Retail Group'
    },
};

export const NuevaGestionDrawer: React.FC<NuevaGestionDrawerProps> = ({ isOpen, onClose, onSave }) => {
    const [values, setValues] = useState({
        tipoDocumento: 'DNI',
        numeroDocumento: '',
        cuil: '',
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        empleador: '',
        tipo: 'CONSULTA' as TipoCaso,
        motivo: '',
        descripcion: '',
        numeroSiniestro: '',
        canal: 'TELEFONO' as CanalIngreso
    });

    const [isSearching, setIsSearching] = useState(false);
    const [lookupFound, setLookupFound] = useState(false);
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleChange = (field: string, value: any) => {
        setValues(prev => ({ ...prev, [field]: value }));

        if (field === 'numeroDocumento' && value.length >= 7) {
            setIsSearching(true);
            setTimeout(() => {
                const data = MOCK_AFILIADOS[value];
                if (data) {
                    setValues(prev => ({
                        ...prev,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        cuil: data.cuil,
                        email: data.email,
                        telefono: data.telefono,
                        empleador: data.empleador
                    }));
                    setLookupFound(true);
                }
                setIsSearching(false);
            }, 600);
        }
    };

    const handleSave = () => {
        const nuevaGestion: Partial<Caso> = {
            tipo: values.tipo,
            estado: 'RECIBIDO',
            fechaIngreso: new Date().toISOString(),
            empleador: values.empleador,
            afiliado: {
                id: `AF-${Date.now()}`,
                nombre: values.nombre,
                apellido: values.apellido,
                documento: values.numeroDocumento,
                cuil: values.cuil,
                email: values.email,
                telefono: values.telefono
            },
            categoria: values.motivo,
            descripcion: values.descripcion,
            canal: values.canal,
            ingresadoPor: 'Eduardo Romano'
        };
        // Log attachments in console as mock saving
        if (attachments.length > 0) {
            console.log('Archivos adjuntos guardados:', attachments.map(f => f.name));
        }
        onSave(nuevaGestion);
        onClose();
        // Reset values for next time
        setValues(prev => ({
            ...prev,
            numeroDocumento: '',
            cuil: '',
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            empleador: '',
            motivo: '',
            descripcion: '',
        }));
        setLookupFound(false);
        setAttachments([]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const footer = (
        <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={onClose}>
                Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8 shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
                <Save className="w-4 h-4 mr-2" /> Guardar Consulta
            </Button>
        </div>
    );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva Consulta Médica"
            footerContent={footer}
            className="w-full sm:max-w-xl"
        >
            <div className="space-y-8 px-6 py-4">
                {/* Identificación */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b pb-2">
                        <h3 className="font-bold text-blue-700 uppercase tracking-wider text-xs">Identificación del Afiliado</h3>
                        <div className="h-px flex-1 bg-blue-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <Label>Nº Documento / DNI</Label>
                            <div className="relative">
                                <Input
                                    value={values.numeroDocumento}
                                    onChange={(e) => handleChange('numeroDocumento', e.target.value)}
                                    placeholder="Ej: 12345678"
                                    className={lookupFound ? 'border-green-200 bg-green-50/30' : 'h-11'}
                                />
                                {isSearching && <Search className="absolute right-3 top-3.5 w-4 h-4 text-blue-500 animate-spin" />}
                                {lookupFound && <UserCheck className="absolute right-3 top-3.5 w-4 h-4 text-green-600" />}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Nombre</Label>
                                <Input value={values.nombre} onChange={(e) => handleChange('nombre', e.target.value)} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Apellido</Label>
                                <Input value={values.apellido} onChange={(e) => handleChange('apellido', e.target.value)} className="h-11" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>CUIL</Label>
                                <Input value={values.cuil} onChange={(e) => handleChange('cuil', e.target.value)} className="h-11" />
                            </div>
                            <div className="space-y-2">
                                <Label>Canal de Ingreso</Label>
                                <Select
                                    options={[
                                        { label: 'Teléfono', value: 'TELEFONO' },
                                        { label: 'Mesa de Entrada', value: 'MESA_ENTRADA' },
                                        { label: 'Correo Electrónico', value: 'EMAIL' },
                                        { label: 'Portal Empleador', value: 'PORTAL_EMPLEADOR' },
                                        { label: 'Carta Documento', value: 'CARTA_DOCUMENTO' }
                                    ]}
                                    value={values.canal}
                                    onChange={(e) => handleChange('canal', e.target.value)}
                                    className="h-11"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Empleador / Empresa</Label>
                            <Input value={values.empleador} onChange={(e) => handleChange('empleador', e.target.value)} className="h-11" />
                        </div>
                    </div>
                </div>

                {/* Detalle */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b pb-2">
                        <h3 className="font-bold text-blue-700 uppercase tracking-wider text-xs">Detalle del Trámite</h3>
                        <div className="h-px flex-1 bg-blue-100" />
                    </div>

                    <div className="grid grid-cols-1 gap-5">
                        <div className="space-y-2">
                            <Label>Tipo de Gestión</Label>
                            <Select
                                options={[{ label: 'Consulta', value: 'CONSULTA' }, { label: 'Reclamo', value: 'RECLAMO' }]}
                                value={values.tipo}
                                onChange={(e) => handleChange('tipo', e.target.value)}
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Motivo</Label>
                            <Select
                                options={(values.tipo === 'CONSULTA' ? TIPOS_CONSULTA : MOTIVOS_RECLAMO).map(m => ({ label: m, value: m }))}
                                value={values.motivo}
                                onChange={(e) => handleChange('motivo', e.target.value)}
                                placeholder="Seleccione un motivo..."
                                className="h-11"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea
                                value={values.descripcion}
                                onChange={(e) => handleChange('descripcion', e.target.value)}
                                rows={5}
                                placeholder="Ingrese los detalles de la gestión..."
                                className="resize-none"
                            />
                        </div>

                        {/* Adjuntos */}
                        <div className="space-y-3 pt-2">
                            <Label className="flex items-center gap-2">
                                <Paperclip className="w-4 h-4 text-blue-600" /> Adjuntar Archivos
                            </Label>

                            <div className="flex flex-wrap gap-2">
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-medium animate-in zoom-in-95 duration-200">
                                        <Paperclip className="w-3 h-3" />
                                        <span className="truncate max-w-[150px]">{file.name}</span>
                                        <button
                                            onClick={() => removeAttachment(index)}
                                            className="hover:bg-blue-200 p-0.5 rounded-full transition-colors"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="relative group">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    id="drawer-file-upload"
                                />
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300">
                                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-blue-600">
                                        <Plus className="w-4 h-4" />
                                        <span className="font-medium">Subir archivos o capturas</span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground mt-1">PDF, Imágenes (Máx. 5MB cada uno)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};
