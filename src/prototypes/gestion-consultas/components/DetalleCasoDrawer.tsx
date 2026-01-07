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
                <Button variant="destructive" onClick={() => onStateChange(caso.id, 'CERRADO')} className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 shadow-none">
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
            <div className="space-y-6 px-1">
                {/* Header Info */}
                <div className="flex flex-col gap-2 pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <Badge variant={getStatusBadgeVariant(caso.estado)} className="text-xs">
                            {caso.estado.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{new Date(caso.fechaIngreso).toLocaleString()}</span>
                    </div>
                    <h2 className="text-lg font-semibold leading-tight">{caso.tipo === 'CONSULTA' ? 'Consulta' : 'Reclamo'}: {caso.categoria}</h2>
                    <div className="flex justify-between items-start text-sm text-muted-foreground">
                        <p>Canal: <span className="font-medium text-foreground">{caso.canal}</span></p>
                        {caso.asignadoA ? (
                            <p className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                                Op: {caso.asignadoA}
                            </p>
                        ) : (
                            <p className="text-xs text-orange-600 italic">Sin asignar</p>
                        )}
                    </div>
                </div>

                {/* Affiliate Info - Compact */}
                <Card className="bg-muted/20 border-none shadow-sm">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm">{caso.afiliado.nombre} {caso.afiliado.apellido}</p>
                                <p className="text-xs text-muted-foreground">{caso.afiliado.documento}</p>
                            </div>
                        </div>
                        <Separator className="bg-border/50" />
                        <div className="grid grid-cols-1 gap-2 text-xs">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Briefcase className="h-3.5 w-3.5" />
                                <span className="text-foreground truncate">{caso.empleador}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="h-3.5 w-3.5" />
                                <a href={`mailto:${caso.afiliado.email}`} className="text-blue-600 hover:underline truncate">{caso.afiliado.email}</a>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-3.5 w-3.5" />
                                <span>{caso.afiliado.telefono}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Description */}
                <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" /> Descripción
                    </h3>
                    <div className="p-3 bg-muted/30 rounded-md border text-sm leading-relaxed whitespace-pre-wrap">
                        {caso.descripcion}
                    </div>
                </div>

                <Separator />

                {/* History */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" /> Historial de Respuestas
                    </h3>

                    <div className="space-y-3 pl-2 border-l-2 border-muted">
                        {!caso.respuestas?.length && (
                            <p className="text-xs text-muted-foreground italic pl-2">No hay respuestas aún.</p>
                        )}
                        {caso.respuestas?.map(resp => (
                            <div key={resp.id} className="relative pl-4 pb-2">
                                <div className="absolute -left-[21px] top-0 bg-background border border-muted rounded-full w-3 h-3 mt-1.5"></div>
                                <div className="bg-card border rounded-lg p-3 text-sm shadow-sm">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-xs text-primary">{resp.enviadoPor}</span>
                                        <span className="text-[10px] text-muted-foreground">{new Date(resp.fecha).toLocaleString()}</span>
                                    </div>
                                    <p className="text-foreground/90">{resp.texto}</p>
                                </div>
                            </div>
                        ))}
                    </div>



                    {/* Reply Input */}
                    {caso.estado !== 'CERRADO' && (
                        <div className="pt-2">
                            <label className="text-xs font-medium mb-1.5 block">Nueva Respuesta</label>

                            <div className="mb-2">
                                <Select
                                    placeholder="Seleccionar plantilla..."
                                    options={PLANTILLAS_RESPUESTA}
                                    value=""
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val) setRespuesta(val);
                                    }}
                                    className="text-xs h-8"
                                />
                            </div>

                            <Textarea
                                value={respuesta}
                                onChange={e => setRespuesta(e.target.value)}
                                placeholder="Escriba su respuesta aquí..."
                                className="mb-2 min-h-[100px] text-sm resize-none"
                            />
                            <div className="flex justify-end">
                                <Button size="sm" onClick={handleSendResponse} disabled={!respuesta.trim() || isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : (
                                        <>
                                            <Send className="h-3.5 w-3.5 mr-2" /> Enviar
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Drawer>
    );
};
