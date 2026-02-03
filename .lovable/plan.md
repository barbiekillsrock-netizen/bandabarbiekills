
# Plano: Corrigir Imagem e Numeração do Post de Músicas

## Problemas Identificados

### 1. Imagem Hero com Rostos Cortados
- **Arquivo:** `src/pages/BlogPost.tsx` (linha 182)
- **Problema:** A imagem usa `object-center`, mas como a imagem tem os rostos da vocalista e noiva na parte superior, o enquadramento centralizado corta os rostos
- **Solução:** Mudar de `object-center` para `object-top` para priorizar a parte superior da imagem

### 2. Lista de Músicas com Numeração Errada (todas mostram "1.")
- **Arquivo:** `src/data/blogPosts.ts` (linhas 327-345)
- **Problema:** Cada item numerado está separado por linha em branco (`\n\n`). O parser em `BlogPost.tsx` divide o conteúdo por `\n\n`, tratando cada música como um parágrafo separado. Quando detecta que começa com número, cria uma lista `<ol>` com apenas 1 item
- **Solução:** Remover as linhas em branco entre os itens da lista, deixando-os separados apenas por `\n`

## Alterações Necessárias

### Alteração 1: `src/pages/BlogPost.tsx`
```tsx
// Linha 182 - De:
className="w-full h-full object-cover object-center"

// Para:
className="w-full h-full object-cover object-top"
```

### Alteração 2: `src/data/blogPosts.ts`
Modificar o conteúdo do post (linhas 327-345) para que todos os 10 itens da lista fiquem em sequência sem linhas em branco:

```
1. **Bad Romance – Lady Gaga:** Pop icônico...
2. **Baby One More Time – Britney Spears:** Um dos maiores...
3. **Wannabe – Spice Girls:** O hino máximo...
4. **Blank Space – Taylor Swift:** Em uma versão...
5. **Uptown Funk – Bruno Mars:** Funk com estilo...
6. **Torn – Natalie Imbruglia:** Clássico dos anos 90...
7. **I Don't Want to Miss a Thing – Aerosmith:** O rock romântico...
8. **I Kissed a Girl – Katy Perry:** Pop ousado...
9. **Mr. Brightside – The Killers:** O hino do rock...
10. **Can't Stop the Feeling! – Justin Timberlake:** Hit vibrante...
```

## Resultado Esperado
- A imagem mostrará os rostos da vocalista e da noiva corretamente
- A lista de músicas será renderizada como uma única `<ol>` com numeração sequencial de 1 a 10
