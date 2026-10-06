# Portfólio — Iuran Freire

Portfólio profissional bilíngue de **Iuran Freire**, desenvolvedor full stack júnior com experiência em aplicações web, dados e automação para o ambiente industrial.

**Site publicado:** [portifolio-iuran-freire.iuranhumberto99.workers.dev](https://portifolio-iuran-freire.iuranhumberto99.workers.dev/pt)

## Sobre o projeto

O site apresenta minha trajetória, tecnologias e projetos por meio de uma interface editorial responsiva. A experiência inclui animações controladas por rolagem, navegação em português e inglês, apresentação interativa dos projetos e suporte a dispositivos móveis.

## Tecnologias

- React 19 e TypeScript
- Next.js com Vinext e Vite
- GSAP para animações
- CSS Modules
- Cloudflare Workers
- React Icons

## Recursos

- Interface responsiva para desktop e celular
- Conteúdo em português e inglês
- Animação tipográfica no início
- Entrada suave das seções durante a rolagem
- Loop animado das tecnologias
- Vitrine interativa de projetos
- Navegação acessível por teclado
- Preferência de movimento reduzido respeitada

## Projetos apresentados

- Sistema de Gestão da Qualidade
- Gestão de Estoque
- Performance de Produção e Qualidade
- BarcodeCam
- Valida Laser
- Gestão FPY
- Controle de Solda

## Executar localmente

Requer Node.js 22.13 ou superior.

```bash
git clone --branch source-code https://github.com/Iuran-Freire/Portifolio-2.git
cd Portifolio-2
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Organização principal

```text
src/app/                 rotas e metadados do framework
src/components/portfolio/ página atual dividida em seções e lógica de rolagem
src/components/          componentes visuais e animações reutilizáveis
src/data/                projetos e grupos de tecnologias
src/dictionaries/        conteúdo em português e inglês
public/                  imagens, ícones e recursos visuais
infra/                   configuração de publicação e tipos do Cloudflare
docs/                    guia da estrutura do projeto
```

Comece por `src/components/portfolio/Portfolio.tsx`. Veja o mapa detalhado em [docs/ESTRUTURA.md](docs/ESTRUTURA.md).

## Créditos

Alguns efeitos foram adaptados de demonstrações públicas do [React Bits](https://reactbits.dev/) e [Skiper UI](https://skiper-ui.com/). Os avisos de licença aplicáveis foram preservados no código.

## Licença

O código original está disponível sob a licença MIT. Fotografias pessoais, imagens dos projetos e demais recursos indicados em [ASSET-NOTICE.md](ASSET-NOTICE.md) não fazem parte dessa licença.

## Contato

- [LinkedIn](https://www.linkedin.com/in/iuran-freire-a23092204)
- [GitHub](https://github.com/Iuran-Freire)

## Recursos da cópia pública

Fotos e capturas pessoais não estão incluídas. Para reproduzir o visual, adicione seus próprios arquivos nos caminhos de imagem indicados em src/data/projects.ts e HeroSection.tsx. Os contatos foram substituídos por exemplos; .openai/hosting.json contém apenas configuração vazia, sem identificadores de conta.
