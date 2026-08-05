---
created: 2026-07-15T00:00
issued_by: Genilson
chunk_id: cms-img-alt-caption-qa
branch: feat-cms-img-alt-caption
worktree: ../techmaster-editado-feat-cms-img-alt-caption
depends_on: [cms-img-alt-caption-fe, cms-img-alt-caption-polish]
priority: 3
---

# Task pra Marivone — QA do alt/legenda de imagem no CMS

Entra por último (depois de FE + polish). QA funcional end-to-end.

## Roteiro de teste (via /admin, com `bun run dev`)

### Capa
1. Novo post → sobe imagem de capa → preenche **alt** e **legenda** → salva.
2. Abre o `.md` gerado (`src/content/blog/<slug>.md`): frontmatter tem `heroImageAlt` e `heroImageCaption` corretos e escapados.
3. Abre `/blog/<slug>`: a capa tem o `alt` custom (inspeciona o DOM), e a **legenda aparece** abaixo da capa.
4. Post SEM alt/legenda: capa cai no `alt = título` (fallback) e não renderiza figcaption vazio.

### Inline
5. No editor, clica no botão de imagem do Quill → abre **modal do DS** (NÃO caixa nativa do browser) → sobe imagem do PC + alt + legenda → Inserir.
6. A imagem aparece no editor com a legenda. **Reabre o post** (sai e edita de novo): a imagem, o alt e a legenda continuam lá (round-trip).
7. Salva → confere no `.md`: a imagem virou `/uploads/...` (não ficou base64), o `<img>` tem `alt`, e o `<figcaption>`/legenda persiste.
8. `/blog/<slug>`: imagem inline renderiza com legenda visível + `alt` no DOM.

### Acessibilidade / regressão
9. Todas as imagens da página do post têm `alt` (nenhuma vazia sem querer). Roda um Lighthouse Acessibilidade — não pode regredir por imagem sem alt.
10. Posts ANTIGOS (sem os campos novos) continuam abrindo e renderizando normal (schema `.optional()`).
11. Nenhuma interação nativa (`alert/confirm/prompt`) aparece em nenhum fluxo.

## Critério de aprovação
- [ ] 11/11 passam
- [ ] Bugs → reporta em `.agents/inbox/genilson.md` com passo pra reproduzir; eu repasso pro worker
- [ ] `bunx astro build` verde

## Aguarde
Bruno te invoca depois do done do Leonardo.

---
---
# ⬇️ NOVO HANDOFF (2026-07-15) — ciclo novo (home: prova social + sobre).
---

---
created: 2026-07-15
issued_by: Genilson
chunk_id: home-prova-social-sobre-qa
branch: feat-home-prova-social-sobre
depends_on: [home-prova-social-sobre-polish]
priority: 3
---

# Task pra Marivone — QA das 2 seções novas da Home

Entra por último, depois do Leonardo. Testa o fluxo end-to-end.

## Roteiro de teste
1. [ ] `bun run dev` sobe sem erro; `bun run build` passa
2. [ ] `/admin/home`: subir 3 logos do PC na Prova Social, nomear cada um, Publicar → recarregar → logos persistem
3. [ ] Home mostra Prova Social em **3 colunas** com os logos e o título salvo
4. [ ] Inspecionar HTML: cada logo tem `alt` = nome do cliente; imagens com `loading="lazy"` + width/height
5. [ ] `/admin/sobre`: editar título/descrição/imagem do Sobre → seção Sobre da home reflete a mudança
6. [ ] Toggle `showSocialProof` OFF → seção Prova Social some da home; ON → volta
7. [ ] Toggle "Sobre na Home" OFF → seção Sobre some; ON → volta
8. [ ] Prova Social sem nenhum logo → seção não renderiza (nada quebrado/vazio no ar)
9. [ ] Mobile (~375px): Prova Social vira 1 coluna, Sobre empilha, sem overflow horizontal
10. [ ] Parceiros (carrossel existente) continua funcionando — não foi afetado

## Reprovar se
- Campo de path/URL de imagem em vez de upload do PC
- Logo sem `alt`
- Seção vazia aparecendo no ar
- Qualquer `alert`/`confirm` nativo do browser

## Aguarde
Bruno te invoca depois do done do Leonardo.
