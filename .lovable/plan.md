

## Adicionar icones sociais no menu superior

Sim, ficaria harmonico! A ideia e posicionar os icones de Instagram, YouTube e Spotify como pequenos icones (18-20px) entre os links de navegacao e o botao "Contrate", separados por um divisor vertical sutil.

### Layout proposto (Desktop)

```text
[Logo]                   Historia | Diferencial | Depoimentos | Midia | Blog | [IG] [YT] [SP] | [Contrate]
```

### Detalhes da implementacao

**Arquivo:** `src/components/Navbar.tsx`

1. **Importar icones** - Instagram e Youtube do lucide-react; Spotify via SVG inline (mesmo SVG ja usado no Footer)

2. **Desktop** - Adicionar um separador vertical (`div` com `w-px h-5 bg-white/20`) seguido dos 3 icones com:
   - Tamanho: 18px
   - Cor: `text-foreground/60` com hover `text-neon-pink`
   - Espacamento: `gap-4` entre icones
   - Links abrindo em nova aba

3. **Mobile** - Adicionar os icones em linha horizontal no menu mobile, abaixo dos links e acima do botao "Contrate", com tamanho ligeiramente maior (20px)

### Links das redes sociais
- Instagram: `https://instagram.com/barbiekillsrock`
- YouTube: `https://www.youtube.com/c/barbiekillsrock/?sub_confirmation=1`
- Spotify: `https://open.spotify.com/intl-pt/artist/2rBN5mr0RzEBrWQoyQ8tLM?si=DLoRIhT-SymreqjRdOsBRQ`

### Por que ficaria harmonico
- Os icones pequenos e discretos nao competem com os links de texto
- O separador vertical cria uma divisao visual limpa
- O efeito hover em neon pink mantem a identidade da marca
- No mobile, ficam organizados em linha horizontal sem poluir o menu

