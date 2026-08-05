---
created: 2026-07-15T00:00
issued_by: Genilson
chunk_id: cms-img-alt-caption-fe
branch: feat-cms-img-alt-caption
worktree: ../techmaster-editado-feat-cms-img-alt-caption
depends_on: []
priority: 1
---

# Task pra Francisgleydisson — alt text + legenda nas imagens do CMS (capa + inline)

Vertical slice completo, 1 worker, 1 PR. Você escreve (editor) E lê (render) —
por isso o contrato do frontmatter não pode driftar entre dois workers. Tudo seu.

## Objetivo (decisões do Bruno já travadas)
Dar ao autor, no CMS, campo de **alt text** e de **legenda visível** pra:
1. **Imagem de capa (hero)** do post.
2. **Imagens inline** inseridas no corpo do artigo pelo Quill.

"Descrição" = **legenda visível** (`<figcaption>` abaixo da imagem), NÃO atributo oculto.

## [ok] Escopo permitido (toca SÓ nesses)
- `src/content/config.ts` — schema: 2 campos novos no hero
- `src/components/admin/PostEditor.tsx` — editor (hero fields + modal inline + save/load)
- `src/components/admin/ImageInsertModal.tsx` — **arquivo novo** (modal DS de inserir imagem inline). Opcional inlinar dentro do PostEditor, mas prefira componente separado.
- `src/components/bunzo/PostDetails.astro` — render da capa (alt + figcaption) + CSS do figcaption inline
- `src/components/bunzo/BlogHeroThree.astro` — só o `alt` fallback da capa
- `src/components/bunzo/PostStyleTwo.astro` — só o `alt` fallback da capa

## [x] Escopo PROIBIDO
- Não mexer em `extractAndUploadInlineImages` (o upload base64→/uploads já funciona e o regex já casa img com `alt` — ver nota). Só **confirmar** que casa.
- Não mexer em plugins, outros editores do admin, layouts fora dos 3 citados.
- Não trocar a lib do editor (segue `react-quill-new`).
- Nada de Supabase/API nova — imagem vai pro GitHub pelo `githubApi` que já existe.

## Worktree (cria ANTES de codar — isolamento obrigatório)
`git worktree add ../techmaster-editado-feat-cms-img-alt-caption -b feat-cms-img-alt-caption`
Trabalha só nela. Dúvida no path → Adelmo.

## Implementação

### 1. Schema — `src/content/config.ts`
No `z.object` do `blog`, adiciona (depois de `heroImage`):
```ts
heroImageAlt: z.string().optional(),
heroImageCaption: z.string().optional(),
```
São `.optional()` → não quebra os posts existentes.

### 2. Editor — capa (`PostEditor.tsx`)
- Estende o state `post` (linha ~97) com `heroImageAlt: ''`, `heroImageCaption: ''`.
- No `loadData` (setPost do bloco de edição, ~linha 130) carrega: `heroImageAlt: extract('heroImageAlt')`, `heroImageCaption: extract('heroImageCaption')`.
- No template `markdown` do `handleSave` (~linha 206), adiciona 2 linhas no frontmatter (mesmo padrão `yamlEscape`):
  ```
  heroImageAlt: "${yamlEscape(post.heroImageAlt)}"
  heroImageCaption: "${yamlEscape(post.heroImageCaption)}"
  ```
- UI: no card "Imagem de Capa" da sidebar (depois do `pendingUploads['heroImage']`, ~linha 426), 2 inputs usando `inputClass`/`labelClass` que já existem:
  - **"Texto alternativo (alt)"** — input. Hint abaixo: *"Descreve a imagem pra leitor de tela e SEO. Deixe vazio só se for puramente decorativa."*
  - **"Legenda"** — input/textarea. Hint: *"Aparece abaixo da imagem no artigo."*

### 3. Editor — imagens inline (a parte que dá trabalho)
Hoje o botão de imagem do Quill insere `<img>` base64 cru, sem alt e sem legenda. Troca isso por um **modal do DS**:

- **Override do handler de imagem do Quill.** Em `quillModules` (linha 31), adiciona `handlers: { image: () => abreModalImagem() }` no objeto `toolbar`. Ao abrir, **salva o `range` atual** do editor (`quillRef.current.getEditor().getSelection(true)`) num state, pra inserir no lugar certo depois.
- **Modal DS** (clona o pattern de `src/components/admin/AuthorsEditor.tsx:162-206` — overlay `fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/...` + card branco `rounded-2xl`, botões Cancelar/Confirmar). Conteúdo:
  - **Upload do PC** (`<input type="file" accept="image/*">`) — regra dura: upload do arquivo, **NUNCA** campo de colar path/URL. Preview do selecionado.
  - Input **alt text** (encoraja preencher, hint igual ao da capa).
  - Input **legenda**.
  - Botão **Inserir** desabilitado até ter arquivo.
- **Ao confirmar:** lê o file como data URL base64, monta o HTML e insere no `range` salvo via `editor.clipboard.dangerouslyPasteHTML(idx, html, 'user')` — **mesmo mecanismo do bloco Prós/Contras** (linha 77), que já é comprovado que sobrevive neste setup do Quill. HTML:
  ```html
  <figure class="post-figure"><img src="data:image/...;base64,..." alt="ALT_ESCAPADO" /><figcaption>LEGENDA_ESCAPADA</figcaption></figure><p></p>
  ```
  - Omite o `<figcaption>` se a legenda estiver vazia.
  - **Escapa** o alt (contexto de atributo) e a legenda (contexto de texto) — reusa o `esc` de `insertProsCons` (linha 69) pro texto; pro alt, escapa também aspas (`"` → `&quot;`).
  - Monta com `src` ANTES do `alt` no `<img>` (garante o casamento do regex de upload).

- **Round-trip do upload (só confirmar, NÃO alterar):** `extractAndUploadInlineImages` (linha 170) já casa `<img ... src="data:image/...;base64,...">` mesmo com `alt` presente, sobe pro `/uploads/` e troca o src. O `alt` e o `<figcaption>` ficam intactos no HTML salvo. **Testa e confirma** — se por algum motivo não casar, me avisa antes de mudar a função.

- **RISCO real a validar (o único ponto que pode virar):** o Quill sanitiza HTML colado contra os formats registrados e **pode remover `<figure>`/`<figcaption>`**. O `<div>` do Prós/Contras sobrevive, mas figure é outra tag. **Você TEM que testar**: insere a imagem → o figure some do `post.content`? Reabre o post salvo → o figure/figcaption/alt voltam? Se sobreviver, ótimo, segue. Se o Quill comer o figure, **fallback** (escolhe o que realmente round-trippa):
  - (a) registra um blot mínimo de `figure`/`figcaption` no Quill, **ou**
  - (b) insere a imagem com `editor.insertEmbed(idx,'image',dataUrl)`, seta o `alt` no nó `<img>` do DOM, e insere a legenda como `<p class="img-caption"><em>...</em></p>` logo abaixo.
  Se cair no fallback (b), ajusta o CSS do item 5 pra `.img-caption` em vez de `figcaption`. Me reporta qual caminho você usou.

- **Editar alt de imagem já existente** (clicar numa imagem já inserida e reabrir o modal): **opcional / P2**. Não bloqueia o pronto. Só faz se sair barato.

### 4. Render da capa (`.astro`)
- **alt fallback** nos 3 pontos (troca `alt={post.data.title}` por):
  - `PostDetails.astro:47` → `alt={post.data.heroImageAlt || post.data.title}`
  - `BlogHeroThree.astro:84` e `:86` → idem
  - `PostStyleTwo.astro:23` → idem
- **Legenda da capa** (só no `PostDetails.astro`, que é a página do artigo): no bloco `.featured-image` (linhas 46-48), envolve em `<figure>` e renderiza a legenda condicional:
  ```astro
  <figure class="featured-image mb-12">
    <img src={post.data.heroImage || post.data.image} alt={post.data.heroImageAlt || post.data.title} class="w-full rounded-2xl shadow-2xl border border-gray-100">
    {post.data.heroImageCaption && <figcaption class="text-sm text-gray-500 mt-3 italic">{post.data.heroImageCaption}</figcaption>}
  </figure>
  ```

### 5. CSS do figcaption inline
As imagens inline renderizam sozinhas via `<Content />` (`PostDetails.astro:51`) — HTML cru passa direto (igual iframe/pros-cons). Falta só estilizar. No `.post-content` (linha 50) o prose já cuida do `img`. Adiciona um `<style>` escopado no `PostDetails.astro` (ou classes prose) pra:
```css
.post-content figure { margin: 1.5rem 0; }
.post-content figcaption { font-size: 0.875rem; color: #6b7280; text-align: center; font-style: italic; margin-top: 0.5rem; }
```
(Se caiu no fallback (b), mira `.img-caption` no lugar de `figcaption`.)

## Critério de pronto
- [ ] `src/content/config.ts` tem `heroImageAlt` e `heroImageCaption` (`.optional()`)
- [ ] Editor: capa tem input de alt + legenda; carregam ao editar post existente; salvam no frontmatter
- [ ] Editor: botão de imagem do Quill abre **modal do DS** (não `prompt()`/`alert()` nativo) com **upload do PC** + alt + legenda
- [ ] Imagem inline inserida vira figure com `alt` + `<figcaption>` que **sobrevive no conteúdo e round-trippa** (reabre o post → continua lá)
- [ ] Ao salvar, a imagem inline base64 sobe pro `/uploads/` e o `alt`/`figcaption` persistem no corpo do `.md`
- [ ] Frontend: capa usa alt custom quando setado (fallback = título), legenda aparece abaixo da capa; imagem inline mostra alt (inspeciona o DOM) + legenda visível
- [ ] Nenhuma interação nativa/crua (regra `design-system-obrigatorio`) — modal estilizado no DS
- [ ] `bun run dev` sobe sem erro e `bunx astro build` passa com os campos novos do schema
- [ ] Reporta no done qual caminho de inline você usou (figure direto vs fallback), pro Leonardo/Marivone saberem o que estilizar/testar

## Dependencias / aguarde
Nenhuma. Independente, começa já. Leonardo entra depois de você (polish), Marivone depois do Leonardo (QA).

---
---
# ⬇️ NOVO HANDOFF (2026-07-15) — o de cima (cms-img-alt-caption) já foi commitado. Este é o ciclo novo.
---

---
created: 2026-07-15
issued_by: Genilson
chunk_id: home-prova-social-sobre
branch: feat-home-prova-social-sobre
base: main
worktree: ../techmaster-editado-feat-home-prova-social-sobre
depends_on: []
priority: 1
---

# Task pra Francisgleydisson — 2 seções novas na Home (Prova Social + Sobre), editáveis no CMS

Adicionar duas seções na homepage (`src/pages/index.astro`), ambas no visual **Bunzo** (o tema em uso):

1. **Prova Social** — grid de **3 colunas** com logos de clientes satisfeitos. Configurável no editor da Home (`/admin/home` → `HomeEditor`), com **upload do arquivo do PC** (nunca campo de path/URL).
2. **Sobre** — seção institucional que **puxa o conteúdo de `about.json`** (já editável em `/admin/sobre`). **NÃO cria editor novo** — só lê e renderiza.

## ✅ Escopo permitido (toca SÓ nesses)
- `src/data/home.json` — adicionar blocos `socialProof`, `showSocialProof`, `showAbout`
- `src/components/bunzo/SocialProofColumns.astro` — **NOVO**
- `src/components/bunzo/AboutHome.astro` — **NOVO**
- `src/pages/index.astro` — importar e renderizar as 2 seções (com guards)
- `src/components/admin/HomeEditor.tsx` — UI de edição da Prova Social + toggle da seção Sobre

## ❌ Escopo PROIBIDO
- `src/data/about.json` e `SobreEditor.tsx` — a seção Sobre só **lê** o about.json; não mexe no editor/conteúdo
- `src/data/sobre.json` — arquivo legado, não usado pelo `/admin/sobre`. **Não tocar.**
- `src/pages/api/**`, `src/pages/admin/**` (exceto o componente HomeEditor.tsx já listado), `src/plugins/**`, `src/middleware.ts`, `src/lib/auth.ts`
- Componente `TrustedPartnerCarousel.astro` e o bloco `partners` — Prova Social é **seção nova e separada**, Parceiros continua como está

## Worktree (cria ANTES de codar — isolamento obrigatório, a partir de `main`)
`git worktree add ../techmaster-editado-feat-home-prova-social-sobre -b feat-home-prova-social-sobre main`
Trabalha SÓ nessa worktree/branch. Dúvida no path → Adelmo.

## Implementação

### 1. `src/data/home.json` — novos campos
Adicionar ao objeto raiz (mantendo o resto intacto):
```json
"showSocialProof": true,
"socialProof": {
    "title": "Empresas que confiam na gente",
    "logos": [
        { "image": "", "name": "" },
        { "image": "", "name": "" },
        { "image": "", "name": "" }
    ]
},
"showAbout": true
```
- `socialProof.logos[].name` = nome do cliente, usado como **`alt` da imagem** (obrigatório p/ Acessibilidade 100).
- Começar com 3 slots vazios (as 3 colunas).

### 2. `src/components/bunzo/SocialProofColumns.astro` (NOVO)
- Lê `readData('home.json')` (mesmo padrão do `TrustedPartnerCarousel.astro`).
- Não renderiza nada se não houver logo com `image` preenchida (evita grid vazio no ar).
- Estrutura no padrão Bunzo — espelhar `RecentPostWrapperTwo.astro`:
  - Wrapper `py-section bg-white` + `container mx-auto px-4`.
  - Título `<h2 class="text-3xl md:text-4xl text-primary font-bold font-heading">` (vem de `socialProof.title`).
  - Grid **`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8`**, cada célula centraliza o logo (`flex items-center justify-center`), com o tratamento grayscale→cor do partner (`grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all`, `max-h-16 object-contain`).
  - `<img>` com `alt={logo.name || 'Logo de cliente'}`, `loading="lazy"`, `decoding="async"`, `width`/`height` definidos (performance/CLS).
- Só itera os logos com `image` truthy.

### 3. `src/components/bunzo/AboutHome.astro` (NOVO)
- Lê `readData('about.json')` → usa `intro.title`, `intro.description`, `intro.image`, `intro.features` e linka pra `/sobre`.
- Layout 2 colunas (imagem + texto), padrão Bunzo (`py-section`, `container mx-auto px-4`, `text-primary`/`text-accent`, `font-heading`). Espelhar o *espírito* do `sections/Section5About.astro` MAS com os tokens **Bunzo** (NÃO `primary-500`/`max-w-7xl` — usar `text-primary`, `container mx-auto px-4`).
  - `<h2>` = `intro.title`; parágrafo = `intro.description`.
  - `intro.features` → lista com check (bullets).
  - Botão "Saiba mais" → `/sobre`.
  - Imagem: `<img src={intro.image} alt={intro.title} loading="lazy" decoding="async" width/height>`; se `intro.image` vazio, esconder a coluna da imagem (não quebrar layout).

### 4. `src/pages/index.astro` — renderizar
Importar os 2 componentes e inserir com guards (mesmo padrão do `showPartners`):
```astro
import AboutHome from '../components/bunzo/AboutHome.astro';
import SocialProofColumns from '../components/bunzo/SocialProofColumns.astro';
```
Ordem sugerida (pode ajustar se o Bruno pedir):
```astro
<BlogHeroThree />
<RecentPostWrapperTwo />
{homeData.showAbout !== false && <AboutHome />}
<div class="container mx-auto px-4 mb-20"><NewsletterTwo /></div>
<TrendingPostCarousel />
{homeData.showSocialProof !== false && <SocialProofColumns />}
{homeData.showPartners !== false && <TrustedPartnerCarousel />}
```

### 5. `src/components/admin/HomeEditor.tsx` — edição no CMS
- Estender o type `HomeConfig`:
  ```ts
  showSocialProof?: boolean;
  socialProof?: { title: string; logos: { image: string; name: string }[] };
  showAbout?: boolean;
  ```
  e o `DEFAULT_CONFIG` (`socialProof: { title: '', logos: [] }`, `showSocialProof: true`, `showAbout: true`).
- **Card "Prova Social"** (espelhar o card "Parceiros", ~linhas 337-377):
  - Input do `socialProof.title`.
  - Grid de uploaders (reusar o mesmo bloco visual do partner): cada item = **upload do PC** + input do `name` (label "Nome do cliente (vira o alt da imagem)") + botão remover. Botão "Adicionar" com `Plus`.
  - Toggle de visibilidade (`showSocialProof`) igual ao de Parceiros (Eye/EyeOff).
- **Upload**: estender `handleFileSelect` e o loop de `save`. Chave nova `socialLogo-<i>`:
  - No `handleFileSelect`: setar preview em `socialProof.logos[i].image`.
  - No `save`: subir base64 pra `public/uploads/<Date.now()>-socialLogo-<i>.<ext>` (idêntico ao partner) e gravar `finalConfig.socialProof.logos[i].image = url`.
- **Card "Sobre na Home"** (pequeno): só um toggle `showAbout` + nota: *"O conteúdo desta seção é editado em Sobre Nós (/admin/sobre)."* com link pra `/admin/sobre`. **Sem campos de conteúdo** (reusa about.json).
- (Opcional) incluir `showSocialProof` e `showAbout` na lista "Seções da Home" já existente — não obrigatório, os toggles nos cards bastam.

## Regras que valem (não negociáveis)
- **Upload do PC, nunca path** (regra dura CMS + skill `cms-image-upload`) — já é o padrão do HomeEditor, só reusar.
- **Acessibilidade 100**: todo logo com `alt` (= nome do cliente); `<img>` do about com `alt`. Foco visível, headings `<h2>` (hierarquia).
- **Performance**: `loading="lazy"` + `decoding="async"` + `width`/`height` em todas as imagens novas (CLS 0).
- **Design System**: nada de interação crua. Sem `alert`/`confirm`. Remover logo = botão inline no padrão do editor (igual Parceiros).
- **Sem seção vazia no ar**: SocialProof não renderiza sem ≥1 logo; AboutHome esconde coluna de imagem se `intro.image` vazio.

## Critério de pronto
- [ ] `/admin/home` mostra o card Prova Social: dá pra **subir logo do PC**, nomear, e o toggle esconde/mostra a seção
- [ ] `/admin/home` mostra toggle "Sobre na Home" + link pro `/admin/sobre`
- [ ] Home renderiza a Prova Social em **3 colunas** com os logos salvos
- [ ] Home renderiza a seção Sobre puxando `about.json` (bate com `/admin/sobre`)
- [ ] Editar o Sobre em `/admin/sobre` reflete na seção da home
- [ ] Toggles `showSocialProof`/`showAbout` escondem as seções
- [ ] Todo logo tem `alt`; imagens com lazy + width/height
- [ ] `bun run dev` sobe sem erro e `bun run build` passa

## Dependências / aguarde
Nenhuma. Independente — começa já.
