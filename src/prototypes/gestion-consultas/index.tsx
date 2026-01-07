import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BandejaView } from './views/BandejaView';
import { DetalleCasoView } from './views/DetalleCasoView';
import { GestionLayout } from './components/GestionLayout';

export const GestionConsultasRoutes = () => {
    return (
        <Routes>
            <Route element={<GestionLayout />}>
                <Route path="/" element={<BandejaView />} />
                <Route path="/:id" element={<DetalleCasoView />} />
                {/* Placeholder for other menu items */}
                <Route path="/mis-casos" element={<BandejaView />} />
                <Route path="/reportes" element={<div className="p-4">Reportes en construcción</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
