import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@/core/components/ui/icon-button';
import { Edit, Trash2 } from 'lucide-react';

const meta: Meta<typeof IconButton> = {
    title: '1-atoms/IconButton',
    component: IconButton,
    parameters: { layout: 'centered' },
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['outline', 'destructive'] },
        size: { control: 'select', options: ['sm', 'default', 'lg', 'auto'] },
        disabled: { control: 'boolean' },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

// Variantes principales y distintas entre sí
export const IconOnly: Story = {
    args: {
        icon: <Edit />,
        'aria-label': 'Editar',
    },
};

export const IconAndText: Story = {
    args: {
        icon: <Edit />,
        label: 'Editar',
    },
};

export const TextOnly: Story = {
    args: {
        label: 'Guardar',
    },
};

export const Disabled: Story = {
    args: {
        icon: <Edit />,
        disabled: true,
        'aria-label': 'Editar deshabilitado',
    },
};

export const Destructive: Story = {
    args: {
        icon: <Trash2 />,
        label: 'Eliminar',
        variant: 'destructive',
    },
};

export const Sizes: Story = {
    render: () => (
        <div className="flex items-center gap-3">
            <IconButton icon={<Edit />} size="sm" aria-label="Editar pequeño" />
            <IconButton icon={<Edit />} size="default" aria-label="Editar" />
            <IconButton icon={<Edit />} size="lg" aria-label="Editar grande" />
        </div>
    ),
};
