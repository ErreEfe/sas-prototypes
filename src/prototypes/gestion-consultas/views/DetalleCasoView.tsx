import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/ui/card';
import { Badge } from '@/core/components/ui/badge';
import { Textarea } from '@/core/components/ui/textarea';
import { Separator } from '@/core/components/ui/separator';
import { ArrowLeft, User, Phone, Mail, FileText, Send, CheckCircle, Clock, XCircle, Briefcase } from 'lucide-react';
import { CASOS_MOCK } from '../data/mock-data';
import { Caso, EstadoCaso } from '../types';

export const DetalleCasoView = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [caso, setCaso] = useState<Caso | null>(null);
    const [respuesta, setRespuesta] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Simulate fetch
        const found = CASOS_MOCK.find(c => c.id === id);
        if (found) setCaso({ ...found }); // Clone to simulate local state mutations
    }, [id]);

    if (!caso) return <div className="p-8">Cargando caso...</div>;

    const handleStateChange = (newStatus: EstadoCaso) => {
        // In a real app this would be an API call
        setCaso(prev => prev ? { ...prev, estado: newStatus } : null);
        // Could show a toast here
    };

    const handleSendResponse = async () => {
        if (!respuesta.trim()) return;
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simulate adding response
        const newResponse = {
            id: `RESP-${Date.now()}`,
            fecha: new Date().toISOString(),
            texto: respuesta,
            enviadoPor: 'usuario.actual@sas.com'
        };

        setCaso(prev => {
            if (!prev) return null;
            return {
                ...prev,
                estado: 'RESPONDIDO', // Auto-change status
                respuestas: [...(prev.respuestas || []), newResponse]
            };
        });
        setRespuesta('');
        setIsSubmitting(false);
        alert('Respuesta enviada y caso marcado como RESPONDIDO');
    };

    const getStatusColor = (estado: EstadoCaso) => {
        switch (estado) {
            case 'RECIBIDO': return 'bg-gray-100 text-gray-800';
            case 'EN_ANALISIS': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'RESPONDIDO': return 'bg-green-100 text-green-800 border-green-200';
            case 'CERRADO': return 'bg-gray-100 text-gray-400 border-gray-200';
            default: return '';
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent hover:text-primary" onClick={() => navigate('..')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la Bandeja
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold tracking-tight">{caso.id}</h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(caso.estado)}`}>
                            {caso.estado.replace('_', ' ')}
                        </span>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                        Ingresado el {new Date(caso.fechaIngreso).toLocaleString()} por
                        <span className="font-medium text-foreground">{caso.canal}</span>
                    </p>
                </div>

                <div className="flex gap-2">
                    {/* Workflow Actions */}
                    {caso.estado === 'RECIBIDO' && (
                        <Button onClick={() => handleStateChange('EN_ANALISIS')} className="bg-blue-600 hover:bg-blue-700">
                            <Clock className="mr-2 h-4 w-4" /> Tomar Caso
                        </Button>
                    )}
                    {caso.estado !== 'CERRADO' && (
                        <Button variant="outline" onClick={() => handleStateChange('CERRADO')} className="text-muted-foreground">
                            <XCircle className="mr-2 h-4 w-4" /> Cerrar Caso
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Main Info */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Case Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Detalle de la {caso.tipo === 'CONSULTA' ? 'Consulta' : 'Reclamo'}</CardTitle>
                            <CardDescription>{caso.categoria}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-muted/30 rounded-md border text-sm leading-relaxed whitespace-pre-wrap">
                                {caso.descripcion}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Conversation/History */}
                    <div className="space-y-4">
                        <h3 className="tex-lg font-semibold flex items-center gap-2">
                            <Mail className="h-5 w-5" /> Historial de Respuestas
                        </h3>

                        {(!caso.respuestas || caso.respuestas.length === 0) && (
                            <div className="text-center py-8 text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                                No hay respuestas registradas aún.
                            </div>
                        )}

                        {caso.respuestas?.map(resp => (
                            <Card key={resp.id} className="bg-blue-50/50 border-blue-100">
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm text-blue-900">{resp.enviadoPor}</span>
                                        <span className="text-xs text-muted-foreground">{new Date(resp.fecha).toLocaleString()}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-800">{resp.texto}</p>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Reply Box */}
                        {caso.estado !== 'CERRADO' && (
                            <div className="bg-white rounded-lg border p-4 shadow-sm mt-4">
                                <label className="text-sm font-medium mb-2 block">Nueva Respuesta al Afiliado</label>
                                <Textarea
                                    value={respuesta}
                                    onChange={e => setRespuesta(e.target.value)}
                                    placeholder="Escriba su respuesta aquí..."
                                    className="mb-3 min-h-[120px]"
                                />
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                                            <FileText className="h-4 w-4 mr-1" /> Plantillas
                                        </Button>
                                    </div>
                                    <Button onClick={handleSendResponse} disabled={!respuesta.trim() || isSubmitting}>
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

                {/* Right Column: Context Info */}
                <div className="space-y-6">
                    {/* Affiliate Card */}
                    <Card>
                        <CardHeader className="pb-3 bg-muted/20">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" /> Datos del Afiliado
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-3">
                            <div>
                                <p className="text-lg font-bold">{caso.afiliado.nombre} {caso.afiliado.apellido}</p>
                                <p className="text-sm text-muted-foreground">{caso.afiliado.documento}</p>
                            </div>
                            <Separator />
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium truncate" title={caso.empleador}>{caso.empleador}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <a href={`mailto:${caso.afiliado.email}`} className="text-blue-600 hover:underline truncate">{caso.afiliado.email}</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{caso.afiliado.telefono}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Internal Info */}
                    <Card>
                        <CardHeader className="pb-3 bg-muted/20">
                            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <FileText className="h-4 w-4" /> Datos de Gestión
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4 text-sm">
                            <div>
                                <span className="text-muted-foreground block text-xs">Asignado a</span>
                                <span className="font-medium">{caso.asignadoA || 'Sin asignar'}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block text-xs">SLA Restante</span>
                                <span className="font-medium text-green-600">48 hs</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
