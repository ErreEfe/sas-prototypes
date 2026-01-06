import * as React from "react"
import { cn } from "@/core/lib/utils"

const RadioGroupContext = React.createContext<{
    value?: string
    onValueChange?: (value: string) => void
    name?: string
    disabled?: boolean
}>({})

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string
    onValueChange?: (value: string) => void
    disabled?: boolean
    name?: string
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ className, value, onValueChange, disabled, name, children, ...props }, ref) => {
        const [generatedName] = React.useState(() => name || `radio-group-${Math.random().toString(36).substr(2, 9)}`)

        return (
            <RadioGroupContext.Provider value={{ value, onValueChange, name: generatedName, disabled }}>
                <div
                    ref={ref}
                    className={cn("grid gap-2", className)}
                    role="radiogroup"
                    {...props}
                >
                    {children}
                </div>
            </RadioGroupContext.Provider>
        )
    }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
    ({ className, value, disabled, ...props }, ref) => {
        const context = React.useContext(RadioGroupContext)

        if (!context) {
            throw new Error("RadioGroupItem must be used within a RadioGroup")
        }

        const isChecked = context.value === value
        const isDisabled = context.disabled || disabled

        return (
            <input
                ref={ref}
                type="radio"
                name={context.name}
                value={value}
                checked={isChecked}
                disabled={isDisabled}
                onChange={() => context.onValueChange?.(value)}
                className={cn(
                    "h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                {...props}
            />
        )
    }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
