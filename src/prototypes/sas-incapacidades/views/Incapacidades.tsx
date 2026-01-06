import React from 'react';
import { IncapacidadesFilters } from '../components/IncapacidadesFilters';
import { IncapacidadesTable } from '../components/IncapacidadesTable';

const Incapacidades: React.FC = () => {
    return (
        <div className="p-6 space-y-6 animate-in fade-in duration-500">


            <IncapacidadesFilters />
            <IncapacidadesTable />
        </div>
    );
};

export default Incapacidades;
