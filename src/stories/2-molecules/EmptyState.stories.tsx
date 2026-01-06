import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from '@/core/components/EmptyState';
import { FileX, Inbox, RefreshCcw } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
    title: '2-Molecules/EmptyState',
    component: EmptyState,
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: {},
};

export const WithAction: Story = {
    args: {
        title: 'No hay trámites pendientes',
        description: 'Actualmente no tienes ningún trámite en curso. Puedes iniciar uno nuevo cuando quieras.',
        action: {
            label: 'Iniciar Nuevo Trámite',
            onClick: () => alert('Acción ejecutada!'),
        },
        icon: <Inbox className="h-10 w-10 text-muted-foreground" />
    },
};

export const SearchNoResults: Story = {
    args: {
        title: 'Sin resultados de búsqueda',
        description: 'No encontramos ningún empleado con el DNI "12345678". Verifica los datos e intenta nuevamente.',
        action: {
            label: 'Limpiar Búsqueda',
            onClick: () => console.log('clear'),
        },
    },
};

export const ErrorState: Story = {
    args: {
        title: 'Error de conexión',
        description: 'No pudimos cargar los datos. Por favor revisa tu conexión a internet.',
        icon: <FileX className="h-10 w-10 text-destructive" />,
        children: (
            <button className="flex items-center gap-2 text-primary hover:underline mt-4 font-medium">
                <RefreshCcw className="w-4 h-4" /> Reintentar
            </button>
        )
    },
};
