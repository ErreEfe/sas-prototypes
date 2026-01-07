import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/core/components/ui/sidebar';
import AppSidebar, { SidebarItem } from '@/core/components/AppSidebar';
import { Header } from '@/core/components/Header';
import { Briefcase, Inbox, FileBarChart } from 'lucide-react';

const MENU_ITEMS: SidebarItem[] = [
    { name: 'Gestión de Consultas y Reclamos', path: '/gestion-consultas', icon: Inbox },
];

export const GestionLayout = () => {
    const navigate = useNavigate();

    return (
        <SidebarProvider>
            <AppSidebar
                items={MENU_ITEMS}
                className="border-r"
                logoSrc="/logo-colonia-suiza-white.png" // Assuming this path exists from AppSidebar default
            />
            <SidebarInset className="flex flex-col min-h-screen bg-gray-50/50">
                <Header
                    pageTitle="Gestión de Consultas y Reclamos"
                    userRole="Operador Nivel 1"
                    userName="Eduardo Romano"
                    userInitials="ER"
                    onLogout={() => navigate('/')} // Back to selector
                />
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};
