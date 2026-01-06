import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '@/core/components/Spinner';
import SkeletonLoader from '@/core/components/SkeletonLoader';
import { Skeleton } from '@/core/components/ui/skeleton';

const meta: Meta = {
    title: '2-Molecules/Loading States',
    tags: ['autodocs'],
    parameters: {
        layout: 'padded',
    },
};

export default meta;

export const Spinners = () => (
    <div className="space-y-8">
        <section>
            <h3 className="text-lg font-semibold mb-4">Spinner Variants</h3>
            <div className="flex flex-wrap gap-8 items-center bg-card p-6 rounded-lg border">
                <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">Default (Inline)</p>
                    <Spinner size="sm" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">Medium</p>
                    <Spinner size="md" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">Large</p>
                    <Spinner size="lg" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground">With Text</p>
                    <div className="border p-4 rounded-md">
                        <Spinner variant="container" text="Cargando datos..." size="md" />
                    </div>
                </div>
            </div>
        </section>

        <section className="relative h-[200px] border rounded-lg overflow-hidden bg-slate-50">
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <p className="text-slate-400">Contenido de fondo...</p>
            </div>
            <Spinner variant="overlay" text="Verificando..." size="lg" />
        </section>
    </div>
);

export const Skeletons = () => (
    <div className="space-y-8 max-w-3xl">
        <section>
            <h3 className="text-lg font-semibold mb-4">Text Skeletons</h3>
            <div className="space-y-2 p-6 border rounded-lg">
                <Skeleton className="h-8 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[300px]" />
            </div>
        </section>

        <section>
            <h3 className="text-lg font-semibold mb-4">Card Profile Skeleton</h3>
            <div className="flex items-center space-x-4 p-6 border rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </section>

        <section>
            <h3 className="text-lg font-semibold mb-4">Table Loading State (SkeletonLoader Component)</h3>
            <div className="border rounded-lg overflow-hidden">
                <SkeletonLoader />
            </div>
        </section>
    </div>
);
