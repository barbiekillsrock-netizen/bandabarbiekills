

# Diagnóstico e Plano de Correção do SSG

## O que está acontecendo

Seu projeto **já possui** toda a infraestrutura de SSG montada:
- `entry-server.tsx` — renderiza as rotas via `renderToString` + `StaticRouter`
- `prerender.js` — gera HTML estático para cada rota (cidades, blog, etc.)
- `package.json` — define o build completo: `build:client → build:server → build:prerender`

**Porém, há dois problemas que impedem o funcionamento:**

1. **O marcador `<!--ssr-outlet-->` foi removido do `index.html`.** O `prerender.js` tenta fazer `template.replace("<!--ssr-outlet-->", html)`, mas o `<div id="root">` agora contém a shell estática da nav. O replace silenciosamente falha e o conteúdo nunca é injetado.

2. **O build de deploy provavelmente só executa `vite build`** (build do client), sem rodar `build:server` e `build:prerender`. Se você deploya pela Lovable, o build é fixo. Se deploya pelo Vercel, o comando de build precisa ser `npm run build` (o completo).

## Plano de correção (3 passos)

### Passo 1 — Restaurar o marcador SSR no `index.html`

Dentro do `<div id="root">`, substituir a shell estática da nav pelo marcador:

```html
<div id="root"><!--ssr-outlet--></div>
```

A nav estática que existe hoje (linhas 116-129) será removida. O prerender vai injetar o HTML completo (incluindo a nav renderizada pelo React) no lugar do marcador. Isso significa que o HTML inicial já virá com **todo o conteúdo**: nav, hero, links, textos, tags `<a>`, etc.

### Passo 2 — Garantir que `entry-server.tsx` inclui todas as rotas

O arquivo atual já cobre Index, Blog, BlogPost, PressKit, Rider, Corporativo e CidadeLanding. Verificar se está sincronizado com o `App.tsx` (faltam DjBriefing e páginas admin, mas essas não precisam de SSG — são rotas protegidas/internas).

### Passo 3 — Configurar o build completo no Vercel

No painel do Vercel (ou no `vercel.json`), definir o **Build Command** como:

```
npm run build
```

Isso executa a cadeia completa: `build:client` → `build:server` → `build:prerender`. O resultado será arquivos HTML físicos em `dist/` para cada rota (ex: `dist/cidade/banda-casamento-campinas/index.html`), todos com conteúdo real renderizado.

**Nota sobre Lovable hosting:** Se o deploy principal é pelo Vercel (domínio `bandabarbiekills.com.br`), basta configurar lá. O preview da Lovable continuará sendo CSR (comportamento normal para desenvolvimento).

---

## Resultado esperado

Após o deploy, cada URL retornará HTML com:
- Textos reais e parágrafos de conteúdo
- Tags `<a href>` para todas as 30+ páginas internas
- Meta tags (title, description, canonical) via Helmet
- Schema JSON-LD específico por página
- O Googlebot e Screaming Frog lerão tudo sem depender de JavaScript

