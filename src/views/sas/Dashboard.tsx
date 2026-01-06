import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/core/components/ui/card';
import { Button } from '@/core/components/ui/button';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Bienvenido a SAS</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Estado del Sistema</CardTitle>
                        <CardDescription>Resumen general</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Todo funcionando correctamente.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Accesos Rápidos</CardTitle>
                        <CardDescription>Tareas comunes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="default" className="w-full">Reportar Incidencia</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
