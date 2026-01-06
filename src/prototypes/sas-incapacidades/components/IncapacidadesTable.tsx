import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon } from '@/core/components/icons';
import { Accessibility } from 'lucide-react';
import { IconButton } from '@/core/components/ui/icon-button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/components/ui/table';
import { Badge } from '@/core/components/ui/badge';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/core/components/ui/tooltip';

import { Siniestro } from '../types/tipos';
import { siniestrosData } from '../data/siniestrosData';

const getDiasRestantesStyles = (dias: number) => {
    if (dias <= 1) return 'bg-red-600 text-white border-red-700 hover:bg-red-700';
    if (dias <= 3) return 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600';
    return 'bg-green-600 text-white border-green-700 hover:bg-green-700';
};

const getEstadoStyles = (estado: string) => {
    switch (estado) {
        case 'Iniciado':
            return 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200';
        case 'En gestión':
            return 'bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200';
        case 'Citado':
            return 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200';
        case 'Evaluación':
            return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200';
        case 'Cerrado':
            return 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

export const IncapacidadesTable: React.FC = () => {
    const navigate = useNavigate();

    // Estado para ordenamiento
    const [sortColumn, setSortColumn] = React.useState<keyof Siniestro | null>('fechaAltaMedica');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

    // Función para manejar el click en los headers
    const handleSort = (column: keyof Siniestro) => {
        if (sortColumn === column) {
            // Si ya está ordenado por esta columna, cambiar dirección
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Si es una nueva columna, ordenar ascendente
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    // Función para convertir fecha DD/MM/YYYY a timestamp para comparación
    const parseFecha = (fecha: string): number => {
        const [day, month, year] = fecha.split('/').map(Number);
        return new Date(year, month - 1, day).getTime();
    };

    // Ordenar los datos
    const sortedData = React.useMemo(() => {
        if (!sortColumn) return siniestrosData;

        return [...siniestrosData].sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            // Manejar fechas
            if (sortColumn === 'fechaAltaMedica' || sortColumn === 'fechaInicioPlazo' || sortColumn === 'fechaVencimientoPlazo') {
                aValue = parseFecha(aValue as string);
                bValue = parseFecha(bValue as string);
            }

            // Comparar valores
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    }, [sortColumn, sortDirection]);

    // Componente para el icono de ordenamiento
    const SortIcon = ({ column }: { column: keyof Siniestro }) => {
        if (sortColumn !== column) {
            return <span className="ml-1 text-gray-400">↕</span>;
        }
        return sortDirection === 'asc' ?
            <span className="ml-1 text-blue-600">↑</span> :
            <span className="ml-1 text-blue-600">↓</span>;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">

            <Table>
                <TableHeader className="bg-muted">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">ID PROCESO</TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">DENUNCIA</TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">EMPLEADO</TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">TIPO SINIESTRO</TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs text-center">RECALIF.</TableHead>
                        <TableHead
                            className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                            onClick={() => handleSort('fechaAltaMedica')}
                        >
                            ALTA MÉDICA (PME)<SortIcon column="fechaAltaMedica" />
                        </TableHead>
                        <TableHead
                            className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                            onClick={() => handleSort('fechaVencimientoPlazo')}
                        >
                            VENCIMIENTO PLAZO<SortIcon column="fechaVencimientoPlazo" />
                        </TableHead>
                        <TableHead
                            className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                            onClick={() => handleSort('diasRestantes')}
                        >
                            DÍAS REST.<SortIcon column="diasRestantes" />
                        </TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs">EMPLEADOR</TableHead>
                        <TableHead
                            className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs cursor-pointer hover:text-gray-900 select-none"
                            onClick={() => handleSort('estado')}
                        >
                            ESTADO<SortIcon column="estado" />
                        </TableHead>
                        <TableHead className="h-12 px-4 text-muted-foreground font-medium uppercase text-xs text-center">ACCIONES</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((siniestro, index) => (
                        <TableRow key={index} className="hover:bg-gray-50 border-b border-border">
                            <TableCell className="px-4 py-4 font-medium text-xs">{siniestro.idProceso}</TableCell>
                            <TableCell className="px-4 py-4 text-xs">
                                <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                    {siniestro.denuncia}
                                </a>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs">
                                <div className="flex flex-col">
                                    <span className="font-medium">{siniestro.nombreCompleto}</span>
                                    <span className="text-gray-500 text-[11px]">CUIL: {siniestro.cuil}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs font-medium text-gray-600">
                                {siniestro.tipoSiniestro}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs text-center">
                                <Badge variant="outline" className={`font-medium rounded px-2 py-0.5 border ${siniestro.recalificacion ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                    {siniestro.recalificacion ? 'Si' : 'No'}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs">{siniestro.fechaAltaMedica}</TableCell>
                            <TableCell className="px-4 py-4 text-xs">{siniestro.fechaVencimientoPlazo}</TableCell>
                            <TableCell className="px-4 py-4 text-xs">
                                {siniestro.estado === 'Cerrado' ? (
                                    <span className="text-gray-400 font-medium ml-2">-</span>
                                ) : (
                                    <Badge variant="outline" className={`font-medium rounded px-2.5 py-0.5 border ${getDiasRestantesStyles(siniestro.diasRestantes)}`}>
                                        {siniestro.diasRestantes}
                                    </Badge>
                                )}
                            </TableCell>
                            <TableCell className="px-4 py-4 text-xs">
                                <div className="flex flex-col">
                                    <span className="font-medium">{siniestro.empleador}</span>
                                    <span className="text-gray-500 text-[11px]">CUIT: {siniestro.cuit}</span>
                                </div>
                            </TableCell>
                            <TableCell className="px-4 py-4">
                                <Badge variant="outline" className={`font-normal rounded px-2 py-0.5 border ${getEstadoStyles(siniestro.estado)}`}>
                                    {siniestro.estado}
                                </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-4 text-center">
                                <IconButton
                                    icon={<Accessibility className="h-5 w-5" />}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 text-gray-500 hover:text-green-600 hover:border-green-600 hover:bg-green-50"
                                    onClick={() => navigate(`/sas-incapacidades/incapacidades/${encodeURIComponent(siniestro.denuncia)}/gestion`)}
                                    title="Gestión de Incapacidad"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
