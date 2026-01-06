import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ContactView } from './views/ContactView';

export const FormulariosPublicosRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ContactView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
