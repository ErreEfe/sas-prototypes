import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/core/lib/utils"

const iconButtonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:border-primary focus:border-primary focus-visible:border-primary",
    {
        variants: {
            variant: {
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                destructive:
                    "border border-input bg-background text-destructive hover:bg-destructive/10 active:bg-destructive/10 hover:text-destructive focus-visible:ring-destructive hover:border-destructive focus:border-destructive focus-visible:border-destructive active:border-destructive",
            },
            size: {
                default: "h-10 w-10 rounded-[6px]", // 40px circular con 6px border radius
                sm: "h-9 w-9 rounded-[6px]",
                lg: "h-11 w-11 rounded-[6px]",
                auto: "h-10 rounded-[6px] px-4 py-2", // Auto width con padding para texto
            },
        },
        defaultVariants: {
            variant: "outline",
            size: "default",
        },
    }
)

export interface IconButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
    asChild?: boolean
    icon?: React.ReactNode
    label?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ className, variant, size, asChild = false, icon, label, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"

        // Si hay label, usar tamaño auto para ajustar el ancho
        const buttonSize = label ? "auto" : size

        return (
            <Comp
                className={cn(iconButtonVariants({ variant, size: buttonSize, className }))}
                ref={ref}
                {...props}
            >
                {icon && <span className="flex items-center justify-center">{icon}</span>}
                {label && <span>{label}</span>}
                {children}
            </Comp>
        )
    }
)
IconButton.displayName = "IconButton"

export { IconButton, iconButtonVariants }
