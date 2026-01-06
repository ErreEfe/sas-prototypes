import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';

const Incidencias: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Incidencias</h2>
                <Button>Nueva Incidencia</Button>
            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Incidencia #001</CardTitle>
                        <CardDescription>Error en carga de archivos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Estado: <span className="text-yellow-600 font-bold">Pendiente</span></p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Incidencia #002</CardTitle>
                        <CardDescription>Fallo de conexión base de datos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Estado: <span className="text-green-600 font-bold">Resuelto</span></p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Incidencias;
