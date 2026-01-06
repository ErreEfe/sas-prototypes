import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/core/components/ui/card';
import { Phone, Clock } from 'lucide-react';
import { NUMEROS_UTILES } from '../data/constants';

export const UsefulNumbers = () => {
    return (
        <div className="">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Números Útiles</h3>
            <div className="flex flex-col gap-4">
                {NUMEROS_UTILES.map((item, index) => (
                    <Card key={index} className="bg-card/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-medium text-primary">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span className="font-semibold text-foreground">{item.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                <span>{item.schedule}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
