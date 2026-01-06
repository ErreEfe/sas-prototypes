import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Stepper from '@/core/components/Stepper';

const meta: Meta<typeof Stepper> = {
    title: '2-molecules/Stepper',
    component: Stepper,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
    { label: 'Información del Paciente', description: 'Datos personales y contacto' },
    { label: 'Detalles Médicos', description: 'Diagnóstico y CIE10' },
    { label: 'Documentación', description: 'Carga de archivos e informes' },
    { label: 'Confirmación', description: 'Revisión final y envío' },
];

export const Horizontal: Story = {
    args: {
        steps: defaultSteps,
        currentStep: 1,
        orientation: 'horizontal',
    },
};

export const Vertical: Story = {
    args: {
        steps: defaultSteps,
        currentStep: 2,
        orientation: 'vertical',
    },
};

export const Completed: Story = {
    args: {
        steps: defaultSteps,
        currentStep: 4,
        orientation: 'horizontal',
    },
};

export const Interactive: Story = {
    render: () => {
        const [step, setStep] = useState(0);
        return (
            <div className="space-y-12 max-w-4xl mx-auto p-8 border rounded-xl bg-surface shadow-sm">
                <Stepper
                    steps={defaultSteps}
                    currentStep={step}
                    onStepClick={(i) => setStep(i)}
                    orientation="horizontal"
                />

                <div className="p-8 bg-background border-2 border-dashed rounded-lg text-center min-h-[200px] flex flex-col items-center justify-center">
                    <h3 className="text-xl font-bold mb-2">{defaultSteps[step].label}</h3>
                    <p className="text-muted-foreground mb-6">{defaultSteps[step].description}</p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setStep(s => Math.max(0, s - 1))}
                            disabled={step === 0}
                            className="px-6 py-2 bg-surface text-text-primary border border-border-strong font-medium rounded-full hover:bg-background-alt transition disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setStep(s => Math.min(defaultSteps.length - 1, s + 1))}
                            disabled={step === defaultSteps.length - 1}
                            className="px-6 py-2 bg-primary text-text-on-primary font-medium rounded-full hover:bg-primary-hover transition disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};
