import { Menu, LogOut } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useIsMobile } from '@/core/hooks/use-mobile';

interface HeaderProps {
  /**
   * Título de la página actual
   */
  pageTitle?: string;
  /**
   * Nombre del usuario actual
   */
  userName?: string;
  /**
   * Rol o descripción del usuario
   */
  userRole?: string;
  /**
   * Iniciales del usuario para el avatar
   */
  userInitials?: string;
  /**
   * Callback cuando se hace clic en el menú
   */
  onMenuClick?: () => void;
  /**
   * Callback cuando se hace clic en logout
   */
  onLogout?: () => void;
}

export function Header({
  pageTitle = 'Sistema de Administración de Siniestros',
  userName = 'Eduardo Romano',
  userRole = 'Usuario',
  userInitials = 'ER',
  onMenuClick,
  onLogout,
}: HeaderProps) {
  const isMobile = useIsMobile();

  return (
    <header className="bg-white shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)] flex items-center h-16 w-full">
      {/* Botón de menú con fondo azul - solo en mobile */}
      {isMobile && (
        <div className="bg-[#0e52a3] h-full w-16 flex items-center justify-center shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="h-8 w-8 text-white hover:bg-white/10"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Título de página */}
      <div className="flex-1 px-8 py-2 min-w-0">
        <h1 className="text-base font-semibold text-[#252525] truncate">
          {pageTitle}
        </h1>
      </div>

      {/* Info de usuario */}
      <div className="flex items-center gap-3 px-4 shrink-0">
        {/* Información del usuario */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <p className="text-sm font-medium text-black leading-tight">{userName}</p>
            <p className="text-xs font-normal text-[#707070] leading-tight">{userRole}</p>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#ff7052] flex items-center justify-center shrink-0">
            <span className="text-white text-lg font-normal">
              {userInitials}
            </span>
          </div>
        </div>

        {/* Botón de logout */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onLogout}
          className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
