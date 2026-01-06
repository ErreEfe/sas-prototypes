import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Input } from '@/core/components/ui/input';
import { Button } from '@/core/components/ui/button';
import { Badge } from '@/core/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/core/components/ui/table';
import { AlertCircle, Clock, CheckCircle, FileText, TrendingUp } from 'lucide-react';

// Mock data - en producción vendría de una API
const mockStats = {
    vencidos: 12,
    porVencer: 8,
    enProceso: 23,
    cerrados: 45,
};

const mockCasosCriticos = [
    {
        id: 'INC-8464105',
        denuncia: '8464105',
        empleado: 'CORO VERONICA SOLEDAD',
        fechaVencimiento: '05/12/2023',
        diasRestantes: -5,
        estado: 'Vencido',
    },
    {
        id: 'INC-8464106',
        denuncia: '8464106',
        empleado: 'PEREZ JUAN CARLOS',
        fechaVencimiento: '10/12/2023',
        diasRestantes: 2,
        estado: 'Por Vencer',
    },
    {
        id: 'INC-02620744',
        denuncia: '02620744',
        empleado: 'YU MIAO CHAO',
        fechaVencimiento: '28/08/2025',
        diasRestantes: 0,
        estado: 'Vence Hoy',
    },
];

const mockActividadReciente = [
    { id: 1, texto: 'Gestión G005 creada para denuncia 8464105', tiempo: 'Hace 2 horas' },
    { id: 2, texto: 'Incapacidad INC-02620747 actualizada a "Completado"', tiempo: 'Hace 4 horas' },
    { id: 3, texto: 'Nueva citación registrada para denuncia 02620737', tiempo: 'Hace 6 horas' },
    { id: 4, texto: 'Gestión G003 marcada como "En Proceso"', tiempo: 'Hace 1 día' },
];

const getDiasRestantesStyles = (dias: number) => {
    if (dias <= 1) return 'bg-red-600 text-white border-red-700';
    if (dias <= 3) return 'bg-amber-500 text-white border-amber-600';
    return 'bg-green-600 text-white border-green-700';
};

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Métricas Clave */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* En Proceso (Iniciados) */}
                <Card className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/sas-incapacidades/incapacidades')}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            Iniciados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-blue-600">{mockStats.enProceso}</div>
                        <p className="text-xs text-gray-500 mt-1">Nuevas incapacidades</p>
                    </CardContent>
                </Card>

                {/* Vencidos */}
                <Card className="border-l-4 border-l-red-600 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/sas-incapacidades/incapacidades')}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            Vencidos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">{mockStats.vencidos}</div>
                        <p className="text-xs text-gray-500 mt-1">Requieren atención inmediata</p>
                    </CardContent>
                </Card>

                {/* Por Vencer */}
                <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/sas-incapacidades/incapacidades')}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-amber-500" />
                            Por Vencer
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-600">{mockStats.porVencer}</div>
                        <p className="text-xs text-gray-500 mt-1">Próximos 5 días</p>
                    </CardContent>
                </Card>

                {/* Cerrados */}
                <Card className="border-l-4 border-l-green-600 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/sas-incapacidades/incapacidades')}>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Cerrados
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-600">{mockStats.cerrados}</div>
                        <p className="text-xs text-gray-500 mt-1">Este mes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Casos Críticos */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        Casos Críticos
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/sas-incapacidades/incapacidades')}
                    >
                        Ver todos
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="bg-white rounded-lg border border-gray-100">
                        <Table>
                            <TableHeader className="bg-muted">
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">ID Proceso</TableHead>
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">Denuncia</TableHead>
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">Empleado</TableHead>
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">Vencimiento</TableHead>
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">Días Rest.</TableHead>
                                    <TableHead className="h-10 px-4 text-muted-foreground font-medium uppercase text-xs">Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockCasosCriticos.map((caso) => (
                                    <TableRow
                                        key={caso.id}
                                        className="hover:bg-gray-50 border-b border-border cursor-pointer"
                                        onClick={() => navigate(`/sas-incapacidades/incapacidades/${caso.denuncia}/gestion`)}
                                    >
                                        <TableCell className="px-4 py-3 font-medium text-xs">{caso.id}</TableCell>
                                        <TableCell className="px-4 py-3 text-xs">
                                            <span className="text-blue-600 hover:text-blue-800 hover:underline">
                                                {caso.denuncia}
                                            </span>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-xs">{caso.empleado}</TableCell>
                                        <TableCell className="px-4 py-3 text-xs">{caso.fechaVencimiento}</TableCell>
                                        <TableCell className="px-4 py-3 text-xs">
                                            <Badge variant="outline" className={`font-medium rounded px-2.5 py-0.5 border ${getDiasRestantesStyles(caso.diasRestantes)}`}>
                                                {caso.diasRestantes}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-xs">
                                            <Badge variant="outline" className={`font-normal rounded px-2 py-0.5 border ${caso.estado === 'Vencido' ? 'bg-red-100 text-red-700 border-red-200' :
                                                caso.estado === 'Vence Hoy' ? 'bg-orange-100 text-orange-700 border-orange-200' :
                                                    'bg-amber-100 text-amber-700 border-amber-200'
                                                }`}>
                                                {caso.estado}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Actividad Reciente
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {mockActividadReciente.map((actividad) => (
                            <div key={actividad.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{actividad.texto}</p>
                                    <p className="text-xs text-gray-500 mt-1">{actividad.tiempo}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Home;
