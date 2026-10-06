export const pt = {
  // Textos do cabeçalho em português
  header: {
    about: "Sobre",
    skills: "Habilidades",
    projects: "Projetos",
    contact: "Contato",
    navigationLabel: "Navegação principal",
    languageLabel: "Selecionar idioma",
  },

  hero: {
    introduction: "Olá, eu sou",
    firstName: "Iuran",
    lastName: "Freire",
    role: "Desenvolvedor e Analista de Dados",
    description:
      "Transformo dados e necessidades do ambiente industrial em soluções digitais claras, eficientes e orientadas à tomada de decisão.",
    projectsButton: "Ver projetos",
    contactButton: "Entrar em contato",
  },

  about: {
    introduction: "Sobre mim",
    title: "Minha trajetória, ponto a ponto",
    summary:
      "Uma jornada construída entre dados, automação e desenvolvimento — sempre conectando problemas reais a soluções práticas.",
    journey: [
      {
        label: "O começo",
        title: "Dados que ganharam forma",
        description:
          "Minha trajetória começou com a criação de dashboards no Power BI, transformando informações em análises mais claras e úteis.",
      },
      {
        label: "A expansão",
        title: "Novas ferramentas, novas possibilidades",
        description:
          "Ampliei meus conhecimentos em Python, Excel, SQL e desenvolvimento web para organizar informações, melhorar a rastreabilidade e reduzir tarefas manuais.",
      },
      {
        label: "Hoje",
        title: "Desenvolvedor em evolução",
        description:
          "Sou desenvolvedor júnior e estudante de Análise e Desenvolvimento de Sistemas, com interesse em software, dados e automação de processos.",
      },
    ],
    closing:
      "Gosto de compreender o problema antes de construir a solução. Sou curioso, dedicado e comprometido em aprender e criar projetos que gerem resultados reais.",
  },

  skills: {
    introduction: "Habilidades",
    title: "Ferramentas que transformam dados em soluções",
    description:
      "Tecnologias utilizadas na criação de dashboards, análises e aplicações para o ambiente industrial.",
    orbitHint: "Selecione uma tecnologia para levá-la ao centro da galáxia.",

    // Traduções das categorias usadas em data/skills.ts.
    categories: {
      businessIntelligence: "Business Intelligence",
      dataAnalysis: "Análise de Dados",
      database: "Banco de Dados",
      webDevelopment: "Desenvolvimento Web",
      frontend: "Front-end",
      backend: "Back-end",
    },
  },

  projects: {
    introduction: "Projetos",
    title: "Soluções criadas para problemas reais",
    description:
      "Projetos que unem desenvolvimento, dados e conhecimento do ambiente industrial.",
    viewDashboard: "Abrir dashboard",
    viewRepository: "Ver código no GitHub",
    projectLabel: "Projeto",
    carouselLabel: "Carrossel de projetos",
    previousProject: "Projeto anterior",
    nextProject: "Próximo projeto",

    items: {
      qualitySystem: {
        title: "Sistema de Gestão da Qualidade",
        category: "Desenvolvimento Full Stack",
        description:
          "Aplicação full stack para gerenciar planos e inspeções de qualidade, digitalizar registros IQC e OQC, acompanhar indicadores e gerar relatórios.",
        features: [
          "Centraliza planos, amostragens e registros de inspeção em uma única interface.",
          "Organiza indicadores de aprovação, reprovação e desempenho da qualidade.",
          "Projeto construído com front-end Vue e serviços em Node.js.",
        ],
        highlight: "Planos e inspeções de qualidade",
      },

      inventoryDashboard: {
        title: "Gestão de Estoque",
        category: "Business Intelligence",
        description:
          "Dashboard para monitoramento de materiais não conformes, impacto financeiro, movimentações e variação mensal do estoque.",
        features: [
          "Acompanha custos, volumes e movimentações de materiais.",
          "Facilita a análise mensal e a identificação de desvios.",
        ],
        highlight: "Controle financeiro e operacional",
      },

      productionDashboard: {
        title: "Performance de Produção e Qualidade",
        category: "Análise de Dados",
        description:
          "Dashboard para acompanhar produção, defeitos, yield, fail rate e os principais problemas encontrados em cada modelo.",
        features: [
          "Relaciona produção, qualidade e principais defeitos.",
          "Apoia decisões com indicadores de yield e fail rate.",
        ],
        highlight: "Monitoramento de yield e defeitos",
      },

      barcodeCam: {
        title: "BarcodeCam — Leitor de Códigos",
        category: "Automação e Visão Computacional",
        description:
          "Aplicação em Python que utiliza a câmera para reconhecer códigos de barras de S/N e MAC, validar as leituras, armazená-las em SQLite e exportar os registros para Excel.",
        features: [
          "Captura e associa automaticamente os códigos S/N e MAC pela câmera.",
          "Valida as leituras antes de salvar os registros em uma base SQLite.",
          "Disponibiliza histórico pela interface web e exportação para Excel.",
        ],
        highlight: "Leitura automatizada com câmera",
      },

      laserValidation: {
        title: "Valida Laser — Inspeção por OCR",
        category: "PWA · Visão Computacional",
        description:
          "PWA para ler Data Matrix, reconhecer a tampografia por OCR e comparar automaticamente as séries de peças, com revisão do inspetor antes do registro.",
        features: [
          "Processa código e OCR localmente no navegador, inclusive em celulares.",
          "Mantém inspeções offline e sincroniza registros e fotos quando a conexão retorna.",
          "Usa Cloudflare Workers, D1 e R2 para centralizar o histórico de inspeções.",
        ],
        highlight: "Validação visual e rastreabilidade industrial",
      },

      fpyManagement: {
        title: "Gestão FPY — Produção e Qualidade",
        category: "Full Stack · PWA Industrial",
        description:
          "Sistema para registrar produção e defeitos, calcular FPY, analisar indicadores e acompanhar planos de ação, com acesso por perfil e histórico de alterações.",
        features: [
          "Calcula FPY ponderado e apresenta análises por período, turno, linha e produto.",
          "Mantém lançamentos em fila offline e sincroniza os dados quando a conexão retorna.",
          "Inclui permissões, auditoria, cadastros, exportação CSV e gestão de planos de ação.",
        ],
        highlight: "Produção, defeitos e planos de ação em uma PWA",
      },
    },
  },

  contact: {
    introduction: "Contato",
    title: "Vamos transformar uma ideia em solução?",
    description:
      "Estou aberto a oportunidades, colaborações e projetos relacionados a desenvolvimento, dados e melhoria de processos.",
    email: "E-mail",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Telefone",
  },

  footer: {
    rights: "Todos os direitos reservados.",
    backToTop: "Voltar ao início",
  },
  
  metadata: {
  title: "Iuran Freire | Portfólio",
  description:
    "Portfólio profissional de Iuran Freire sobre desenvolvimento, Business Intelligence e análise de dados.",
},
};


