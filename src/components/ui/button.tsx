import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // BOTÃO ROSA (CTA): Texto preto e sem sombra pesada
        neonPink:
          "bg-neon-pink text-black font-semibold font-oswald uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform",

        // BOTÃO SÓ COM BORDA: Texto rosa que fica preto no hover
        neonPinkOutline:
          "border-2 border-neon-pink text-neon-pink bg-transparent font-oswald uppercase tracking-wider hover:bg-neon-pink hover:text-black transition-colors duration-300",

        // BOTÃO DA NAVBAR: Limpo de sombras e anéis (Lighthouse 100%)
        nav: "border border-neon-pink text-neon-pink bg-transparent font-oswald uppercase tracking-wider hover:bg-neon-pink hover:text-black text-sm transition-colors duration-300 shadow-none ring-0",

        // BOTÃO HERO: Grande e acessível
        hero: "bg-neon-pink text-black font-bold font-oswald uppercase tracking-wider text-lg px-8 py-6 hover:scale-105 active:scale-95 transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
