import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, AlertCircle, Search, Accessibility } from 'lucide-react';
import { Header } from '@/core/components/Header';
import { AppSidebar, SidebarItem } from '@/core/components/AppSidebar';
import { SidebarProvider } from '@/core/components/ui/sidebar';

const sasMenuItems: SidebarItem[] = [
    { name: 'Inicio', path: '/sas-incapacidades', icon: Home },
    { name: 'Incapacidades', path: '/sas-incapacidades/incapacidades', icon: Accessibility },
];

const getPageTitle = (pathname: string): string => {
    if (pathname === '/sas-incapacidades') return 'Inicio';
    if (pathname === '/sas-incapacidades/incapacidades') return 'Incapacidades';
    if (pathname.includes('/gestion')) return 'Gestión de Incapacidad';
    return 'SAS';
};

const SASLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full">
                {/* Pasamos los items específicos de SAS */}
                <AppSidebar
                    items={sasMenuItems}
                    logoSrc="/logo-colonia-suiza-white.png"
                    footerText="Prototipo de validación SAS"
                    className="[&>div]:bg-[#124680] [&>div]:text-white"
                />
                <div className="flex-1 flex flex-col">
                    <Header
                        pageTitle={pageTitle}
                        onLogout={handleLogout}
                        onMenuClick={() => { }}
                    />
                    <main className="flex-1 bg-muted/30 p-4 sm:p-6 overflow-y-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default SASLayout;
