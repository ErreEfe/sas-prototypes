import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from './icons';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footerContent?: ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footerContent,
  triggerRef,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const titleId = `drawer-title-${Math.random().toString(36).substring(2, 9)}`;

  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  // Use createPortal to render the drawer at the end of the body
  // This avoids issues with z-index and fixed positioning when parents have transform/filter properties
  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-screen w-full max-w-lg bg-card text-card-foreground border-l border-border shadow-2xl z-[9999] flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        style={{ top: 0, margin: 0 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h2 id={titleId} className="text-xl font-semibold text-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground rounded-full hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Cerrar panel"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Footer */}
        {footerContent && (
          <footer className="flex justify-end gap-4 p-6 bg-card border-t border-border flex-shrink-0">
            {footerContent}
          </footer>
        )}
      </div>
    </>,
    document.body
  );
};

export default Drawer;
