import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { AppProviders } from "@/components/providers/AppProviders";
import { AppHeader } from "@/components/ui/AppHeader";
import { starterFontVariables } from "@/theme/appFonts";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Запускайте быстрее со стартовым шаблоном дизайн-системы",
    template: "%s | Стартовый шаблон дизайн-системы",
  },
  description:
    "Стартовый шаблон на Next.js в продуктовом стиле для @atomazing-org/design-system с пресетами, настройками темы, диагностикой рантайма, визуальной проверкой и подтверждением статического экспорта.",
  applicationName: "Стартовый шаблон дизайн-системы",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "Стартовый шаблон дизайн-системы",
    title: "Запускайте быстрее со стартовым шаблоном дизайн-системы",
    description:
      "Стартовый шаблон на Next.js в продуктовом стиле для @atomazing-org/design-system с пресетами, настройками темы, диагностикой рантайма, визуальной проверкой и подтверждением статического экспорта.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Запускайте быстрее со стартовым шаблоном дизайн-системы",
    description:
      "Стартовый шаблон на Next.js в продуктовом стиле для @atomazing-org/design-system с пресетами, настройками темы, диагностикой рантайма, визуальной проверкой и подтверждением статического экспорта.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={starterFontVariables}>
        <AppRouterCacheProvider>
          <AppProviders>
            <AppHeader />
            {children}
          </AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
