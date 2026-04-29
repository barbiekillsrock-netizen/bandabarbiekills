## Objetivo

Remover completamente o bloco "Adicionar do Repertório" da página `/admin/shows/:showId`, já que o repertório agora é populado automaticamente na criação do show, e músicas extras podem ser adicionadas via "Música Exclusiva deste Show".

## Alterações

**Arquivo:** `src/pages/AdminShowDetail.tsx`

1. Remover o bloco JSX inteiro `<div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">` que contém o título "Adicionar do Repertório", o `Select` com `availableSongs` e o botão "Adicionar".
2. Remover o estado não utilizado `pickSongId` / `setPickSongId`.
3. Remover a função `addToSetlist`.
4. Remover o cálculo `availableSongs` (não utilizado em nenhum outro lugar).
5. Remover a query de `songs` do `Promise.all` em `load()` e o `setSongs` (não usado em mais nada).
6. Remover o estado `songs` e o tipo `Song` se não houver mais referências — verificar: `Song` ainda é usado dentro de `SetlistRow` (`song: Song | null`), portanto **manter o type `Song`**, mas remover o estado `songs`.
7. Remover o import `Select, SelectTrigger, SelectValue, SelectContent, SelectItem` se nenhum outro bloco estiver usando — o bloco "Música Exclusiva" usa apenas `Input` e `Button`, então o import de `Select` pode ser removido.

## Preservado

- Bloco "Música Exclusiva deste Show" (intacto).
- Tabela do setlist com edição de mín. R$, liberar slot, remover.
- População automática do repertório na criação do show (em `AdminShows.tsx`).
- Nenhuma alteração em SEO, blog, cidades, home ou meta-tags.
