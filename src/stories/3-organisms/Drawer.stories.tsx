import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef } from 'react';
import Drawer from '@/core/components/Drawer';
import { Button } from '@/core/components/ui/button';

const meta: Meta<typeof Drawer> = {
    title: '3-Organisms/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

const DrawerWrapper = (args: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // We need to construct the triggerRef object that the Drawer expects
    // In a real app this comes from sticking a ref locally, here we pass it.

    return (
        <div className="p-4">
            <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
                Abrir Drawer
            </Button>
            <Drawer
                {...args}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                triggerRef={buttonRef}
            >
                {args.children}
            </Drawer>
        </div>
    );
};

export const Default: Story = {
    render: (args) => <DrawerWrapper {...args} />,
    args: {
        title: 'Título del Drawer',
        children: (
            <div className="p-6">
                <p className="text-gray-600 mb-4">
                    Este es el contenido principal del Drawer. Aquí puedes colocar formularios,
                    información detallada, o cualquier otro componente.
                </p>
                <p className="text-gray-600">
                    El drawer se superpone al contenido y bloquea la interacción con el fondo.
                </p>
            </div>
        ),
    },
};

export const WithFooter: Story = {
    render: (args) => <DrawerWrapper {...args} />,
    args: {
        title: 'Drawer con Footer',
        children: (
            <div className="p-6 space-y-4">
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    Contenido scrolleable...
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    Más contenido...
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    Más contenido...
                </div>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    Más contenido...
                </div>
            </div>
        ),
        footerContent: (
            <>
                <Button variant="outline" onClick={() => { }}>Cancelar</Button>
                <Button onClick={() => { }}>Guardar Cambios</Button>
            </>
        ),
    },
};
