import type { Metadata, Viewport } from "next";
import { Anton, Inter, Poppins } from "next/font/google";
import "./globals.css";

// Inter mantém parágrafos e descrições claros e confortáveis de ler.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Poppins cria títulos modernos e próximos da identidade visual da Alura.
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Anton traz o visual alto e condensado da referência do Behance aos títulos.
const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portifolio-iuran-freire.pages.dev"),
  title: "Iuran Freire | Portfólio",
  description:
    "Iuran Freire, desenvolvedor full stack júnior. Projetos de desenvolvimento web, dados e automação industrial.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Iuran Freire | Desenvolvedor Full Stack Júnior",
    description:
      "Conheça minha trajetória e projetos em desenvolvimento web, dados e automação industrial.",
    images: [{ url: "/og-v5.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-v5.png"],
  },
};

// Faz o layout usar a largura real do celular em vez de simular um desktop.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppins.variable} ${anton.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
