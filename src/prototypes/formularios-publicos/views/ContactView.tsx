import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs';
import { ConsultaForm } from './ConsultaForm';
import { ReclamoForm } from './ReclamoForm';
import { UsefulNumbers } from '../components/UsefulNumbers';

export const ContactView = () => {
    return (
        <div className="container mx-auto py-8 px-4 max-w-7xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">Centro de Atención</h1>
                <p className="text-muted-foreground">
                    Seleccione el tipo de trámite que desea realizar.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    <Card>
                        <CardHeader className="pb-0">
                            {/* Header content moved to tabs triggers mostly, keeping clean */}
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Tabs defaultValue="consulta" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 h-12 mb-8">
                                    <TabsTrigger value="consulta" className="text-base">Nueva Consulta</TabsTrigger>
                                    <TabsTrigger value="reclamo" className="text-base">Nuevo Reclamo</TabsTrigger>
                                </TabsList>

                                <TabsContent value="consulta">
                                    <div className="mt-4">
                                        <CardDescription className="mb-6 text-base">
                                            Complete este formulario para consultas sobre estado de siniestros, turnos, pagos o reintegros.
                                        </CardDescription>
                                        <ConsultaForm />
                                    </div>
                                </TabsContent>

                                <TabsContent value="reclamo">
                                    <div className="mt-4">
                                        <CardDescription className="mb-6 text-base text-red-600/80">
                                            Utilice este canal si ha tenido inconvenientes con la atención o prestaciones.
                                        </CardDescription>
                                        <ReclamoForm />
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    {/* Sidebar for useful numbers/info can go here if we want a sidebar layout, 
                 or we can put it below depending on preferences. 
                 User asked for 2 columns form, so wide space is good.
                 Let's put useful numbers in a sidebar column for desktop.
             */}
                    <div className="sticky top-4">
                        <UsefulNumbers />
                    </div>
                </div>
            </div>
        </div>
    );
};
