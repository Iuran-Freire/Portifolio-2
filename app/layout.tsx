import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "@fontsource/press-start-2p/400.css";
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

export const metadata: Metadata = {
  title: "Iuran Freire | Portfólio",
  description:
    "Portfólio profissional sobre desenvolvimento, Business Intelligence e análise de dados.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
