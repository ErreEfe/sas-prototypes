import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { UnifiedForm } from './UnifiedForm';
import { UsefulNumbers } from '../components/UsefulNumbers';

export const ContactView = () => {
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Centro de Atención</h1>
                <p className="text-muted-foreground text-lg">
                    Complete el formulario para realizar su consulta o reclamo.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Card className="shadow-lg border-t-4 border-t-primary" style={{ backgroundColor: 'hsl(0, 0%, 93.3%)' }}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl">Nuevo Trámite</CardTitle>
                            <CardDescription className="text-base mt-2">
                                Por favor, asegúrese de completar todos los campos obligatorios para que podamos procesar su solicitud lo antes posible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <UnifiedForm />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-4 space-y-4">
                        <UsefulNumbers />
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-4">
                                <h4 className="font-semibold text-sm mb-2">¿Necesita ayuda?</h4>
                                <p className="text-xs text-muted-foreground">
                                    Si tiene dudas sobre cómo completar el formulario, puede contactarnos a través de nuestros canales de atención telefónica.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
