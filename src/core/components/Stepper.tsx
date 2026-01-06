import React from 'react';
import { cn } from '@/core/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
    label: string;
    description?: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onStepClick,
    orientation = 'horizontal',
    className,
}) => {
    const isVertical = orientation === 'vertical';

    return (
        <div
            className={cn(
                'flex w-full',
                isVertical ? 'flex-col px-4' : 'flex-row items-start justify-between',
                className
            )}
        >
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <div
                        key={index}
                        className={cn(
                            'relative flex',
                            isVertical ? 'flex-row gap-4 pb-12 last:pb-0' : 'flex-1 flex-col items-center'
                        )}
                    >
                        {/* Connecting Line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    'absolute transition-all duration-500 z-0',
                                    isVertical
                                        ? 'left-[19px] top-10 w-[2px] h-full pointer-events-none'
                                        : 'left-[calc(50%+20px)] top-5 w-[calc(100%-40px)] h-[2px] -translate-y-1/2',
                                    isCompleted ? 'bg-primary' : 'bg-border'
                                )}
                            />
                        )}

                        {/* Icon/Circle Container */}
                        <div
                            className={cn(
                                'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 bg-background',
                                isCompleted
                                    ? 'bg-primary border-primary text-white shadow-sm'
                                    : isActive
                                        ? 'border-primary text-primary shadow-md ring-4 ring-primary/10 font-bold'
                                        : 'border-muted-foreground/30 text-muted-foreground',
                                onStepClick && isCompleted ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-default'
                            )}
                            onClick={() => onStepClick && isCompleted && onStepClick(index)}
                        >
                            {isCompleted ? (
                                <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                            ) : (
                                <span className="text-sm font-semibold">{index + 1}</span>
                            )}
                        </div>

                        {/* Label & Description */}
                        <div
                            className={cn(
                                'flex flex-col',
                                isVertical ? 'pt-1' : 'mt-3 items-center text-center px-2'
                            )}
                        >
                            <span
                                className={cn(
                                    'text-sm font-bold transition-colors duration-300',
                                    isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                                )}
                            >
                                {step.label}
                            </span>
                            {step.description && (
                                <span className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                                    {step.description}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Stepper;
