import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base 100% limpa: apenas transição de cor suave. Sem pular, sem piscar, sem sombras pesadas.
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        
        // BOTÃO ROSA PRINCIPAL - Fundo sólido, texto branco, não pisca
        neonPink:
          "bg-neon-pink text-white font-semibold font-oswald uppercase tracking-wider hover:bg-pink-600",
        
        // BOTÃO SÓ COM BORDA - Limpo, apenas preenche o fundo ao passar o mouse
        neonPinkOutline:
          "border-2 border-neon-pink text-neon-pink bg-transparent font-oswald uppercase tracking-wider hover:bg-neon-pink hover:text-white",
        
        // BOTÃO DA NAVBAR - O seu "Contrate" estático e elegante
        nav: "border border-neon-pink text-neon-pink bg-transparent font-oswald uppercase tracking-wider hover:bg-neon-pink hover:text-white text-sm",
        
        // HERO CTA - Grande, sólido e sem efeitos de escala
        hero: "bg-neon-pink text-white font-bold font-oswald uppercase tracking-wider text-lg px-8 py-6 hover:bg-pink-600",
      },