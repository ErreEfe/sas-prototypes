import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from '@/core/contexts/ToastContext';

// Prototypes
import { SASIncapacidadesRoutes } from '@/prototypes/sas-incapacidades';
import { FormulariosPublicosRoutes } from '@/prototypes/formularios-publicos';
import { GestionConsultasRoutes } from '@/prototypes/gestion-consultas';

import PrototypeSelector from './views/PrototypeSelector';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Route for Prototype Selector (Landing Page) */}
        <Route path="/" element={<PrototypeSelector />} />

        {/* SAS Incapacidades Prototype */}
        <Route path="/sas-incapacidades/*" element={<SASIncapacidadesRoutes />} />

        {/* Public Forms Prototype */}
        <Route path="/formularios-publicos/*" element={<FormulariosPublicosRoutes />} />

        {/* Management Tray Prototype */}
        <Route path="/gestion-consultas/*" element={<GestionConsultasRoutes />} />

        {/* Catch-all redirect to Prototype Selector */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
};

export default App;
