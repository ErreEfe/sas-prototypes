import React, { useState, useEffect } from 'react';
import Drawer from '@/core/components/Drawer';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/ui/card';
import { Textarea } from '@/core/components/ui/textarea';
import { Separator } from '@/core/components/ui/separator';
import { User, Phone, Mail, FileText, Send, Clock, XCircle, Briefcase, MessageSquare } from 'lucide-react';
import { Caso, EstadoCaso } from '../types';

import { Select } from '@/core/components/ui/select';
import ConfirmActionModal from '@/core/components/ConfirmActionModal';
import SuccessDialog from '@/core/components/SuccessDialog';

const PLANTILLAS_RESPUESTA = [
    { label: 'Recepción del caso', value: 'Estimado/a, hemos recibido su consulta y estamos analizando su caso. Le responderemos a la brevedad.' },
    { label: 'Solicitud de datos', value: 'Estimado/a, para continuar con la gestión necesitamos que nos adjunte la siguiente documentación: ' },
    { label: 'Resolución favorable', value: 'Estimado/a, le informamos que su gestión ha sido resuelta favorablemente. Saludos cordiales.' },
    { label: 'Cierre de gestión', value: 'Damos por cerrado el caso. Si necesita algo más, por favor contáctenos nuevamente.' }
];

interface DetalleCasoDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    caso: Caso | null;
    onStateChange: (casoId: string, newState: EstadoCaso) => void;
    onAddResponse: (casoId: string, respuesta: string) => void;
}

export const DetalleCasoDrawer: React.FC<DetalleCasoDrawerProps> = ({
    isOpen,
    onClose,
    caso,
    onStateChange,
    onAddResponse
}) => {
    const [respuesta, setRespuesta] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isConfirmCloseOpen, setIsConfirmCloseOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    // Reset state when case changes or drawer opens
    useEffect(() => {
        if (isOpen) {
            setRespuesta('');
            setIsSubmitting(false);
        }
    }, [isOpen, caso]);

    if (!caso) return null;

    const handleSendResponse = async () => {
        if (!respuesta.trim()) return;
        setIsSubmitting(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        onAddResponse(caso.id, respuesta);

        setRespuesta('');
        setIsSubmitting(false);
    };

    const getStatusBadgeVariant = (estado: EstadoCaso) => {
        switch (estado) {
            case 'RECIBIDO': return 'secondary';
            case 'EN_ANALISIS': return 'default';
            case 'RESPONDIDO': return 'outline';
            case 'CERRADO': return 'outline';
            default: return 'default';
        }
    };

    const footer = (
        <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={onClose}>
                Cerrar
            </Button>
            {caso.estado !== 'CERRADO' && (
                <Button
                    variant="destructive"
                    onClick={() => setIsConfirmCloseOpen(true)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 shadow-none"
                >
                    <XCircle className="mr-2 h-4 w-4" /> Cerrar Caso
                </Button>
            )}
        </div>
    );

    return (
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            title={`Caso ${caso.id}`}
            footerContent={footer}
            className="w-full sm:max-w-xl" // Make it a bit wider than default if possible
        >
            <div className="space-y-8 px-6 py-4">
                {/* Header Info */}
                <div className="flex flex-col gap-3 pb-6 border-b">
                    <div className="flex items-center justify-between">
                        <Badge variant={getStatusBadgeVariant(caso.estado)} className="text-xs px-2.5 py-0.5">
                            {caso.estado.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium">{new Date(caso.fechaIngreso).toLocaleString()}</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">{caso.tipo === 'CONSULTA' ? 'Consulta' : 'Reclamo'}: {caso.categoria}</h2>
                    <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>Canal:</span>
                            <span className="font-semibold text-foreground bg-gray-100 px-2 py-0.5 rounded text-xs">{caso.canal}</span>
                        </div>
                        {caso.asignadoA ? (
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                Op: {caso.asignadoA}
                            </Badge>
                        ) : (
                            <span className="text-xs text-orange-600 font-medium italic bg-orange-50 px-2 py-1 rounded border border-orange-100">Sin asignar</span>
                        )}
                    </div>
                </div>

                {/* Affiliate Info - Compact */}
                <Card className="bg-white border-gray-200 shadow-sm overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-5 flex items-center gap-4 bg-gray-50/50">
                            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-base text-gray-900">{caso.afiliado.nombre} {caso.afiliado.apellido}</p>
                                <p className="text-sm text-muted-foreground font-medium">{caso.afiliado.documento}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="p-5 grid grid-cols-1 gap-3 text-sm">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Briefcase className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-700 font-medium">{caso.empleador}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Mail className="h-4 w-4 text-blue-500" />
                                <a href={`mailto:${caso.afiliado.email}`} className="text-blue-600 hover:text-blue-700 underline font-medium">{caso.afiliado.email}</a>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Phone className="h-4 w-4 text-blue-500" />
                                <span className="text-gray-700 font-medium">{caso.afiliado.telefono}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Description */}
                <div className="space-y-3">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" /> Descripción
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap shadow-inner">
                        {caso.descripcion}
                    </div>
                </div>

                <Separator className="my-2" />

                {/* History */}
                <div className="space-y-6">
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-blue-600" /> Historial de Respuestas
                    </h3>

                    <div className="space-y-5 pl-3 border-l-2 border-blue-100 ml-2">
                        {!caso.respuestas?.length && (
                            <div className="py-4 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <p className="text-sm text-muted-foreground italic">No hay respuestas cargadas en este caso.</p>
                            </div>
                        )}
                        {caso.respuestas?.map(resp => (
                            <div key={resp.id} className="relative pl-6 pb-2">
                                <div className="absolute -left-[23px] top-1 bg-white border-2 border-blue-400 rounded-full w-4 h-4 shadow-sm"></div>
                                <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm shadow-sm hover:shadow transition-shadow">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-xs">{resp.enviadoPor}</span>
                                        <span className="text-[11px] text-muted-foreground font-medium">{new Date(resp.fecha).toLocaleString()}</span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-medium">{resp.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Reply Input */}
                    {caso.estado !== 'CERRADO' && (
                        <div className="pt-6 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-bold text-gray-900 uppercase tracking-tight">Nueva Respuesta</label>
                            </div>

                            <div className="mb-4">
                                <Select
                                    placeholder="Utilizar una plantilla..."
                                    options={PLANTILLAS_RESPUESTA}
                                    value=""
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val) setRespuesta(val);
                                    }}
                                    className="text-sm border-blue-100 focus:ring-blue-500 rounded-lg h-11"
                                />
                            </div>

                            <div className="relative group">
                                <Textarea
                                    value={respuesta}
                                    onChange={e => setRespuesta(e.target.value)}
                                    placeholder="Escriba aquí los detalles de la respuesta..."
                                    className="mb-4 min-h-[140px] text-sm resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 p-4 transition-all"
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    size="lg"
                                    onClick={handleSendResponse}
                                    disabled={!respuesta.trim() || isSubmitting}
                                    className="rounded-full px-8 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
                                >
                                    {isSubmitting ? 'Enviando...' : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" /> Enviar Respuesta
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmActionModal
                isOpen={isConfirmCloseOpen}
                onClose={() => setIsConfirmCloseOpen(false)}
                onConfirm={() => {
                    onStateChange(caso.id, 'CERRADO');
                    setIsSuccessOpen(true);
                }}
                title="¿Cerrar este caso?"
                description="Una vez cerrado, no podrás agregar nuevas respuestas. Asegúrate de que la gestión haya finalizado correctamente."
                confirmText="Sí, cerrar caso"
                cancelText="Volver"
                variant="destructive"
            />

            <SuccessDialog
                isOpen={isSuccessOpen}
                onConfirm={() => setIsSuccessOpen(false)}
                title="Caso cerrado correctamente"
                description={`El caso ${caso.id} ha sido finalizado y archivado.`}
                buttonText="Entendido"
            />
        </Drawer>
    );
};
