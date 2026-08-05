---
created: 2026-07-15T00:00
issued_by: Genilson
chunk_id: cms-img-alt-caption-polish
branch: feat-cms-img-alt-caption
worktree: ../techmaster-editado-feat-cms-img-alt-caption
depends_on: [cms-img-alt-caption-fe]
priority: 2
---

# Task pra Leonardo — polish visual do alt/legenda de imagem (capa + inline)

Entra DEPOIS do Francisgleydisson entregar a FE. Mesma branch/worktree (sequencial, sem overlap com ninguém). Só polish, sem mudar comportamento.

## Contexto
Francisgleydisson adicionou:
1. No CMS (`PostEditor.tsx`): campos de alt + legenda na sidebar da capa + um **modal DS** de inserir imagem inline (upload + alt + legenda).
2. No frontend (`PostDetails.astro`): legenda abaixo da capa (`figcaption`) e das imagens inline.

Confere no done report dele qual caminho de inline ele usou (figure direto ou fallback `.img-caption`) — muda o seletor que você estiliza.

## Escopo do polish
- **Modal de inserir imagem** — alinhar 100% ao DS do admin (tokens violet, `rounded-2xl`, sombras, espaçamento e tipografia iguais aos outros editores tipo `AuthorsEditor`/`CategoriesEditor`). Preview da imagem com aspecto correto (não esticada). Estados: sem arquivo (dropzone/placeholder), com arquivo (preview + trocar), botão Inserir desabilitado coerente. Foco/hover consistentes.
- **Campos de alt/legenda da capa** — hierarquia visual e hints legíveis, casando com os demais campos da sidebar.
- **figcaption no frontend** (capa + inline) — tipografia de legenda de jornal: menor, muted, centralizada, itálico, espaçamento respirado. Coerente com a tipografia do `.post-content`. Não competir com o corpo do texto.

## Escopo PROIBIDO
- Não muda lógica (upload, save, handler do Quill, schema). Só CSS/markup visual.
- Não toca em nada fora do que o Francisgleydisson entregou.

## Critério de pronto
- [ ] Modal indistinguível em qualidade dos outros modais do admin
- [ ] Legenda no frontend com cara de legenda editorial (não texto solto)
- [ ] Nenhum P0 visual pendente (se achar algum, LEVANTA pro Bruno antes de aplicar — não aplica P0 sozinho)
- [ ] `bun run dev` sobe sem erro

## Aguarde
Bruno te invoca só depois do done do Francisgleydisson.

---
---
# ⬇️ NOVO HANDOFF (2026-07-15) — ciclo novo (home: prova social + sobre).
---

---
created: 2026-07-15
issued_by: Genilson
chunk_id: home-prova-social-sobre-polish
branch: feat-home-prova-social-sobre
depends_on: [home-prova-social-sobre]
priority: 2
---

# Task pra Leonardo — polish visual das 2 seções novas da Home

Entra **depois** do Francisgleydisson (chunk `home-prova-social-sobre`). Mesma branch/worktree.

## Objetivo
Garantir fidelidade visual **Bunzo** das 2 seções novas (Prova Social + Sobre) na home. Não reinventar design — ajustar pra encaixar no tema existente.

## Checklist
- [ ] Spacing/ritmo batendo com as seções vizinhas (`py-section`, `container mx-auto px-4`) — nada "solto"
- [ ] Tokens Bunzo corretos: `text-primary`, `text-accent`, `font-heading` (NÃO `primary-500`/tokens do set `sections`)
- [ ] Prova Social: 3 colunas alinhadas, logos com altura consistente (`max-h-16 object-contain`), grayscale→cor coerente com o `TrustedPartnerCarousel`
- [ ] Sobre: 2 colunas equilibradas, imagem com aspect ratio limpo, CTA "Saiba mais" no estilo dos botões do tema
- [ ] Responsivo: 3 col → 1 col no mobile; Sobre empilha imagem+texto no mobile
- [ ] Estados vazios elegantes (seção some se sem conteúdo — já feito pelo Francis, só validar visualmente)

## Escopo
Só os 2 componentes novos (`SocialProofColumns.astro`, `AboutHome.astro`) e ajustes finos de classe. Não mexe em dados nem no HomeEditor. Se achar P0, LEVANTA pro Bruno antes de aplicar.

## Aguarde
Bruno te invoca depois do done do Francisgleydisson.
