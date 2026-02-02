
# Plano: Corrigir Numeração da Playlist de Músicas

## Problema Identificado
O conteúdo do blog post "musicas-mais-pedidas-casamento-2025" tem cada música em um parágrafo separado (com `\n\n` entre eles). O parser de markdown em `BlogPost.tsx` divide o conteúdo por `\n\n`, tratando cada música como um parágrafo individual em vez de itens de uma lista única.

**Resultado atual:** Cada música é renderizada como uma lista `<ol>` separada com apenas 1 item, fazendo com que os números não apareçam corretamente na página.

## Solução
Modificar o conteúdo no arquivo `src/data/blogPosts.ts` para que todas as 10 músicas fiquem no mesmo bloco de texto, separadas apenas por `\n` (uma quebra de linha) em vez de `\n\n` (duas quebras).

## Alteração Necessária

**Arquivo:** `src/data/blogPosts.ts`

**De (linhas 327-345):**
```
1. **Bad Romance – Lady Gaga:** ...

2. **Baby One More Time – Britney Spears:** ...

(cada item separado por linha em branco)
```

**Para:**
```
1. **Bad Romance – Lady Gaga:** ...
2. **Baby One More Time – Britney Spears:** ...
3. **Wannabe – Spice Girls:** ...
(todos os itens em sequência, sem linha em branco entre eles)
```

## Detalhes Técnicos
- O parser em `BlogPost.tsx` (linha 132-145) detecta listas numeradas com regex `/^\d+\.\s/`
- Faz split por `\n` para encontrar múltiplos itens
- Renderiza como `<ol className="list-decimal list-inside">`
- Com a correção, todos os 10 itens serão agrupados em uma única lista ordenada com numeração visível
