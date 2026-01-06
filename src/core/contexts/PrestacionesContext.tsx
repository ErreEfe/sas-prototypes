import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PrestacionData, getPrestacionDisplayStatus, Afiliado } from '../utils/prestaciones-helpers';

interface PrestacionesContextType {
    prestaciones: string[];
    allData: PrestacionData[];
    uniqueAfiliados: Afiliado[];
    cie10Codes: { code: string; description: string }[];
    cie10DescriptionMap: Record<string, string>;
    getPrestacionDisplayStatus: (p: PrestacionData) => any;
    handleAddRelatedPrestacion: (parentId: number, data: any) => Promise<void>;
    handleReprogramarTurno: (prestacionId: number, nuevaFecha: Date, motivo: string) => Promise<void>;
    handleCancelarPrestacion: (prestacionId: number, motivo: string) => Promise<void>;
    handleSaveInforme: (prestacionId: number, data: any) => Promise<void>;
    handleSaveTurno: (prestacionId: number, data: any) => Promise<void>;
    handleSavePrestacion: (data: any) => Promise<void>;
}

const PrestacionesContext = createContext<PrestacionesContextType | undefined>(undefined);

export const PrestacionesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [prestaciones] = useState<string[]>([
        'Consulta Médica',
        'Kinesiología',
        'Radiografía',
        'Resonancia Magnética',
        'Análisis de Sangre',
    ]);

    const [allData] = useState<PrestacionData[]>([]);
    const [uniqueAfiliados] = useState<Afiliado[]>([]);
    const [cie10Codes] = useState<{ code: string; description: string }[]>([]);
    const [cie10DescriptionMap] = useState<Record<string, string>>({});

    const handleAddRelatedPrestacion = async (parentId: number, data: any) => {
        console.log('Adding related prestacion to', parentId, data);
    };

    const handleReprogramarTurno = async (prestacionId: number, nuevaFecha: Date, motivo: string) => {
        console.log('Reprogramming turn', prestacionId, nuevaFecha, motivo);
    };

    const handleCancelarPrestacion = async (prestacionId: number, motivo: string) => {
        console.log('Cancelling prestacion', prestacionId, motivo);
    };

    const handleSaveInforme = async (prestacionId: number, data: any) => {
        console.log('Saving informe', prestacionId, data);
    };

    const handleSaveTurno = async (prestacionId: number, data: any) => {
        console.log('Saving turno', prestacionId, data);
    };

    const handleSavePrestacion = async (data: any) => {
        console.log('Saving prestacion', data);
    };

    return (
        <PrestacionesContext.Provider
            value={{
                prestaciones,
                allData,
                uniqueAfiliados,
                cie10Codes,
                cie10DescriptionMap,
                getPrestacionDisplayStatus,
                handleAddRelatedPrestacion,
                handleReprogramarTurno,
                handleCancelarPrestacion,
                handleSaveInforme,
                handleSaveTurno,
                handleSavePrestacion,
            }}
        >
            {children}
        </PrestacionesContext.Provider>
    );
};

export const usePrestaciones = () => {
    const context = useContext(PrestacionesContext);
    if (context === undefined) {
        throw new Error('usePrestaciones must be used within a PrestacionesProvider');
    }
    return context;
};
