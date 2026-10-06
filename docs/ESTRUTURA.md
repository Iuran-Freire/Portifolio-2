# Como navegar pelo código

## Comece aqui

`src/app/[lang]/page.tsx` valida o idioma, carrega o dicionário e apresenta `src/components/portfolio/Portfolio.tsx`. As rotas ficam em `src/app/`, estrutura suportada pelo framework.

## Página atual

Em `src/components/portfolio/`:

| Arquivo | Responsabilidade |
| --- | --- |
| `Portfolio.tsx` | Montar as seções da página |
| `PortfolioHeader.tsx` | Menu, navegação e seletor de idioma |
| `HeroSection.tsx` | Foto, título animado, apresentação e botão de projetos |
| `ContactSection.tsx` | Contatos e acesso ao código público |
| `PortfolioFooter.tsx` | Rodapé |
| `SectionHeading.tsx` | Títulos reutilizados pelas seções |
| `usePortfolioScroll.ts` | Seção ativa e entrada suave ao rolar |
| `social-links.tsx` | Links sociais compartilhados |
| `translate.ts` e `types.ts` | Auxiliar de idioma e tipos compartilhados |
| `Portfolio.module.css` | Estilos compartilhados e regras responsivas da página |

Os estilos compartilhados foram mantidos juntos para preservar a cascata CSS e as regras de celular. Agora estão formatados, com cada declaração em sua própria linha.

## Conteúdo e componentes

- `src/data/projects.ts`: links e tecnologias dos projetos.
- `src/data/stack.ts`: grupos de tecnologias da página atual.
- `src/dictionaries/pt.ts` e `en.ts`: textos traduzidos.
- `src/components/AboutJourney.tsx`: apresentação da trajetória.
- `src/components/TechnologyStack.tsx`: loop e cartões de tecnologias.
- `src/components/projects/ProjectShowcase.tsx`: vitrine interativa.
- `src/components/react-bits/`: efeitos adaptados e respectivos avisos de licença.
- `src/components/UserCursor.tsx`: cursor personalizado.
- `public/`: arquivos que podem ser acessados pelo navegador.

As versões anteriores e os componentes sem ligação com as rotas atuais foram removidos. A página atual é montada por `portfolio/Portfolio.tsx`.

## Infraestrutura

`infra/build/` e `infra/worker/` participam da publicação, junto de `.openai/` e `vite.config.ts`. `infra/cloudflare-env.d.ts` fornece os tipos do ambiente Cloudflare. Os exemplos de banco do modelo inicial foram removidos porque o portfólio não utiliza banco de dados.

`node_modules/`, `dist/`, `.vinext/`, `.wrangler/` e `.next/` são dependências ou saídas geradas. Estão ocultas no explorador por `.vscode/settings.json`, sem serem apagadas. Remova a regra correspondente em `files.exclude` se quiser vê-las.

## Validação

Execute `npx tsc --noEmit` e `npm run build` depois de alterações estruturais. `npm test` executa TypeScript e compilação.

O repositório público usa uma cópia separada sem fotos e contatos pessoais. Esta reorganização local não deve ser enviada ao GitHub com o histórico completo sem revisar os arquivos dessa cópia.

## Explorador do VS Code

A raiz apresenta src, public, infra e docs. As configurações necessárias na raiz ficam agrupadas sob package.json; licença e aviso de imagens ficam sob README.md. Expanda as setas para vê-las. As pastas internas .openai e .vscode ficam ocultas pelo explorador, mas continuam no disco. Todas essas preferências podem ser ajustadas em .vscode/settings.json.
