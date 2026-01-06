import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './views/Home';
import Incapacidades from './views/Incapacidades';
import GestionIncapacidad from './views/GestionIncapacidad';

export const SASIncapacidadesRoutes = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="incapacidades" element={<Incapacidades />} />
            <Route path="incapacidades/:id/gestion" element={<GestionIncapacidad />} />
        </Route>
    </Routes>
);

export default SASIncapacidadesRoutes;
