import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/ui/table';
import { Input } from '@/core/components/ui/input';
import { Select } from '@/core/components/ui/select';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/core/components/ui/tabs';
import StatusChip, { Status } from '@/core/components/StatusChip';
import { CASOS_MOCK } from '../data/mock-data';
import { Caso, EstadoCaso, TipoCaso } from '../types';
import { Eye, Briefcase, User as UserIcon, PlusCircle, Headphones, Mail, User, FileText, Globe, Hand } from 'lucide-react';
import { IconButton } from '@/core/components/ui/icon-button';
import { DetalleCasoDrawer } from '../components/DetalleCasoDrawer';
import { NuevaGestionDrawer } from '../components/NuevaGestionDrawer';

export const BandejaView = () => {
    // const navigate = useNavigate(); // Removed navigation to detailed view
    const [casos, setCasos] = useState<Caso[]>(CASOS_MOCK);
    const [filterTipo, setFilterTipo] = useState<TipoCaso | ''>('');
    const [filterEstado, setFilterEstado] = useState<EstadoCaso | ''>('');
    const [filterEmpleador, setFilterEmpleador] = useState('');

    // Drawer State
    const [selectedCaso, setSelectedCaso] = useState<Caso | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);

    // Sort by date desc by default
    const sortedAndFilteredCasos = useMemo(() => {
        return [...casos]
            .filter((caso) => {
                if (filterTipo && caso.tipo !== filterTipo) return false;
                if (filterEstado && caso.estado !== filterEstado) return false;
                if (filterEmpleador && !caso.empleador.toLowerCase().includes(filterEmpleador.toLowerCase())) return false;
                return true;
            })
            .sort((a, b) => new Date(b.fechaIngreso).getTime() - new Date(a.fechaIngreso).getTime());
    }, [casos, filterTipo, filterEstado, filterEmpleador]);

    const renderStatusChip = (estado: EstadoCaso) => {
        let status: Status = 'Recibido';
        switch (estado) {
            case 'RECIBIDO': status = 'Recibido'; break;
            case 'EN_ANALISIS': status = 'En análisis'; break;
            case 'RESPONDIDO': status = 'Respondido'; break;
            case 'CERRADO': status = 'Cerrado'; break;
            case 'DERIVADO': status = 'Derivado'; break;
        }
        return <StatusChip status={status} />;
    };

    const getCorrelativeNumber = (caso: Caso) => {
        // Find all cases for this employer and sort them by date ascending
        const employerCases = casos
            .filter(c => c.empleador === caso.empleador)
            .sort((a, b) => new Date(a.fechaIngreso).getTime() - new Date(b.fechaIngreso).getTime());

        const index = employerCases.findIndex(c => c.id === caso.id);
        return index + 1;
    };

    const getStatusLabel = (estado: EstadoCaso) => {
        return estado.replace('_', ' ');
    };

    const getChannelIcon = (canal: string) => {
        switch (canal) {
            case 'WEB_FORM': return <Globe className="w-3 h-3" />;
            case 'EMAIL': return <Mail className="w-3 h-3" />;
            case 'TELEFONO': return <Headphones className="w-3 h-3" />;
            case 'MESA_ENTRADA': return <User className="w-3 h-3" />;
            case 'PORTAL_EMPLEADOR': return <Briefcase className="w-3 h-3" />;
            case 'CARTA_DOCUMENTO': return <FileText className="w-3 h-3" />;
            default: return null;
        }
    };

    const getChannelLabel = (canal: string) => {
        switch (canal) {
            case 'WEB_FORM': return 'Web';
            case 'EMAIL': return 'Email';
            case 'TELEFONO': return 'Teléfono';
            case 'MESA_ENTRADA': return 'Mesa Entrada';
            case 'PORTAL_EMPLEADOR': return 'Portal';
            case 'CARTA_DOCUMENTO': return 'C. Doc.';
            case 'TRAMITADORES': return 'Tramitadores';
            default: return canal;
        }
    };

    // Handlers for Drawer interactions
    const handleViewDetails = (caso: Caso) => {
        setSelectedCaso(caso);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        // setSelectedCaso(null); // Optional: keep it to avoid flicker during close animation
    };

    const handleStateChange = (casoId: string, newState: EstadoCaso) => {
        setCasos(prevCasos => prevCasos.map(c =>
            c.id === casoId ? { ...c, estado: newState } : c
        ));

        // Update selected caso as well to reflect immediately in drawer
        setSelectedCaso(prev => prev && prev.id === casoId ? { ...prev, estado: newState } : prev);
    };

    const handleAddResponse = (casoId: string, textoRespuesta: string) => {
        const newResponse = {
            id: `RESP-${Date.now()}`,
            fecha: new Date().toISOString(),
            texto: textoRespuesta,
            enviadoPor: 'Eduardo Romano'
        };

        setCasos(prevCasos => prevCasos.map(c => {
            if (c.id !== casoId) return c;
            return {
                ...c,
                estado: 'RESPONDIDO', // Auto-update status on reply
                respuestas: [...(c.respuestas || []), newResponse]
            };
        }));

        // Update selected caso
        setSelectedCaso(prev => {
            if (!prev || prev.id !== casoId) return prev;
            return {
                ...prev,
                estado: 'RESPONDIDO',
                respuestas: [...(prev.respuestas || []), newResponse]
            };
        });
    };

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Bandeja de Entrada</h2>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Exportar</Button>
                </div>
            </div>


            <div className="bg-card rounded-lg border shadow-sm p-4 mb-6 space-y-4">
                <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Filtros</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Estado</label>
                        <Select
                            options={[
                                { label: 'Todos', value: '' },
                                { label: 'Recibido', value: 'RECIBIDO' },
                                { label: 'En Análisis', value: 'EN_ANALISIS' },
                                { label: 'Respondido', value: 'RESPONDIDO' },
                                { label: 'Cerrado', value: 'CERRADO' }
                            ]}
                            value={filterEstado}
                            onChange={(e) => setFilterEstado(e.target.value as EstadoCaso | '')}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Tipo</label>
                        <Select
                            options={[
                                { label: 'Todos', value: '' },
                                { label: 'Consultas', value: 'CONSULTA' },
                                { label: 'Reclamos', value: 'RECLAMO' }
                            ]}
                            value={filterTipo}
                            onChange={(e) => setFilterTipo(e.target.value as TipoCaso | '')}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Empleador</label>
                        <Input
                            placeholder="Buscar empresa..."
                            value={filterEmpleador}
                            onChange={(e) => setFilterEmpleador(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mb-4">
                <div className="text-sm text-muted-foreground">
                    Mostrando <span className="font-bold text-foreground">{sortedAndFilteredCasos.length}</span> trámites en total
                </div>
                <Button onClick={() => setIsNewModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow-lg transform active:scale-95 transition-all rounded-full px-6">
                    <PlusCircle className="mr-2 h-4 w-4" /> Nueva consulta
                </Button>
            </div>

            <div className="rounded-md border bg-white overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-[100px] text-center">Nº</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Empleador</TableHead>
                            <TableHead>Afiliado</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Canal</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedAndFilteredCasos.map((caso) => (
                            <TableRow key={caso.id} className="hover:bg-muted/30">
                                <TableCell className="font-bold text-center text-sm text-blue-600">
                                    #{getCorrelativeNumber(caso)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={`text-xs font-bold uppercase ${caso.tipo === 'RECLAMO' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {caso.tipo}
                                    </span>
                                </TableCell>
                                <TableCell className="text-sm flex items-center gap-2">
                                    <Briefcase className="w-3 h-3 text-muted-foreground" />
                                    {caso.empleador}
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                    <div className="flex flex-col">
                                        <span>{caso.afiliado.nombre} {caso.afiliado.apellido}</span>
                                        <span className="text-xs text-muted-foreground">{caso.afiliado.documento}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">{caso.categoria}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground bg-gray-50 px-2 py-1 rounded-md border w-fit">
                                        {getChannelIcon(caso.canal)}
                                        {getChannelLabel(caso.canal)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {renderStatusChip(caso.estado)}
                                </TableCell>
                                <TableCell className="text-sm text-muted-foreground">
                                    {new Date(caso.fechaIngreso).toLocaleDateString()} <br />
                                    <span className="text-xs">{new Date(caso.fechaIngreso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        {!caso.asignadoA && (
                                            <IconButton
                                                variant="outline"
                                                size="sm"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-200"
                                                title="Tomar Caso"
                                                icon={<Hand className="w-4 h-4" />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStateChange(caso.id, 'EN_ANALISIS');
                                                    // In a real app we'd also set asignadoA here, mock it:
                                                    setCasos(prev => prev.map(c => c.id === caso.id ? { ...c, asignadoA: 'Eduardo Romano' } : c));
                                                    // Also update selected if open
                                                    setSelectedCaso(prev => prev && prev.id === caso.id ? { ...prev, asignadoA: 'Eduardo Romano', estado: 'EN_ANALISIS' } : prev);
                                                }}
                                            />
                                        )}
                                        <IconButton
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 text-muted-foreground hover:text-primary hover:border-primary"
                                            title="Ver detalle"
                                            icon={<Eye className="h-4 w-4" />}
                                            onClick={() => handleViewDetails(caso)}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {sortedAndFilteredCasos.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={8} className="h-24 text-center">
                                    No se encontraron resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center">
                Mostrando {sortedAndFilteredCasos.length} registros
            </div>

            <DetalleCasoDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                caso={selectedCaso}
                correlativeNumber={selectedCaso ? getCorrelativeNumber(selectedCaso) : undefined}
                onStateChange={handleStateChange}
                onAddResponse={handleAddResponse}
            />

            <NuevaGestionDrawer
                isOpen={isNewModalOpen}
                onClose={() => setIsNewModalOpen(false)}
                onSave={(data) => {
                    const newId = `${new Date().getFullYear()}-${String(casos.length + 1).padStart(3, '0')}`;
                    const completo: Caso = {
                        ...data as Caso,
                        id: newId
                    };
                    setCasos([completo, ...casos]);
                }}
            />
        </div>
    );
};
