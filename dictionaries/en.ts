import type { pt } from "./pt";

export const en: typeof pt = {
  // Textos do cabeçalho em inglês
  header: {
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    navigationLabel: "Main navigation",
    languageLabel: "Select language",
  },

  hero: {
    introduction: "Hello, I am",
    firstName: "Iuran",
    lastName: "Freire",
    role: "Developer and Data Analyst",
    description:
      "I transform data and industrial needs into clear, efficient digital solutions that support decision-making.",
    projectsButton: "View projects",
    contactButton: "Get in touch",
  },

  about: {
    introduction: "About me",
    title: "My journey, point by point",
    summary:
      "A journey built across data, automation, and development — always connecting real problems to practical solutions.",
    journey: [
      {
        label: "The beginning",
        title: "Data taking shape",
        description:
          "My journey began by creating Power BI dashboards, transforming information into clearer, more useful analysis.",
      },
      {
        label: "The expansion",
        title: "New tools, new possibilities",
        description:
          "I expanded my knowledge of Python, Excel, SQL, and web development to organize information, improve traceability, and reduce manual tasks.",
      },
      {
        label: "Today",
        title: "A developer in constant evolution",
        description:
          "I am a junior developer and a Systems Analysis and Development student interested in software, data, and process automation.",
      },
    ],
    closing:
      "I like to understand the problem before building the solution. I am curious, dedicated, and committed to learning and creating projects that deliver real results.",
  },

  skills: {
    introduction: "Skills",
    title: "Tools that transform data into solutions",
    description:
      "Technologies used to create dashboards, analysis, and applications for industrial environments.",
    orbitHint: "Select a technology to bring it to the center of the galaxy.",

    technologies: {
      "Power BI": "I use Power BI to turn industrial data into inventory, production, and quality dashboards that make costs, yield, defects, and other indicators easier to monitor.",
      Excel: "Excel supports my projects by organizing, validating, and analyzing data, while also serving as an input and export format in solutions such as BarcodeCam.",
      SQL: "I use SQL to structure queries, validate records, and retrieve information safely in projects that store histories and operational data.",
      PostgreSQL: "I apply PostgreSQL concepts when designing robust relational databases prepared to centralize information and support growing applications.",
      JavaScript: "I use JavaScript to create interactions, validations, and dynamic behavior across the interfaces of my systems and web projects.",
      TypeScript: "I use TypeScript to organize applications such as this portfolio, reduce development errors, and make components easier to maintain.",
      React: "With React, I build component-based interactive interfaces, including the animations, navigation, and visual experiences found throughout this portfolio.",
      "Node.js": "I use Node.js to develop services and business rules that connect interfaces, data, and features in applications such as the Quality Management System.",
    },

    categories: {
      businessIntelligence: "Business Intelligence",
      dataAnalysis: "Data Analysis",
      database: "Database",
      webDevelopment: "Web Development",
      frontend: "Front-end",
      backend: "Back-end",
    },
  },

  projects: {
    introduction: "Projects",
    title: "Solutions created for real-world problems",
    description:
      "Projects that combine development, data, and industrial knowledge.",
    viewDashboard: "Open dashboard",
    viewRepository: "View code on GitHub",
    projectLabel: "Project",
    carouselLabel: "Projects carousel",
    previousProject: "Previous project",
    nextProject: "Next project",

    items: {
      qualitySystem: {
        title: "Quality Management System",
        category: "Full Stack Development",
        description:
          "Full-stack application for managing quality plans and inspections, digitizing IQC and OQC records, tracking indicators, and generating reports.",
        features: [
          "Centralizes plans, sampling, and inspection records in one interface.",
          "Organizes approval, rejection, and quality performance indicators.",
          "Built with a Vue front end and Node.js services.",
        ],
        highlight: "Quality plans and inspections",
      },

      inventoryDashboard: {
        title: "Inventory Management",
        category: "Business Intelligence",
        description:
          "Dashboard for monitoring non-conforming materials, financial impact, inventory movements, and monthly cost variation.",
        features: [
          "Tracks material costs, volumes, and movements.",
          "Makes monthly analysis and deviation detection easier.",
        ],
        highlight: "Financial and operational control",
      },

      productionDashboard: {
        title: "Production and Quality Performance",
        category: "Data Analysis",
        description:
          "Dashboard for tracking production, defects, yield, fail rate, and the main issues identified for each model.",
        features: [
          "Connects production, quality, and leading defects.",
          "Supports decisions with yield and fail-rate indicators.",
        ],
        highlight: "Yield and defect monitoring",
      },

      barcodeCam: {
        title: "BarcodeCam — Barcode Reader",
        category: "Automation and Computer Vision",
        description:
          "Python application that uses a camera to recognize S/N and MAC barcodes, validate readings, store them in SQLite, and export records to Excel.",
        features: [
          "Automatically captures and pairs S/N and MAC codes through the camera.",
          "Validates readings before storing records in a SQLite database.",
          "Provides a web history view and Excel export.",
        ],
        highlight: "Automated camera-based reading",
      },
    },
  },

  contact: {
    introduction: "Contact",
    title: "Let’s transform an idea into a solution",
    description:
      "I am open to opportunities, collaborations, and projects involving development, data, and process improvement.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    phone: "Phone",
  },

  footer: {
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  metadata: {
  title: "Iuran Freire | Portfolio",
  description:
    "Iuran Freire’s professional portfolio featuring development, Business Intelligence, and data analysis projects.",
},
};
