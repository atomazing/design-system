import type { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { AppProviders } from "@/components/providers/AppProviders";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Design System Next.js Static Export Reference",
    template: "%s | DS Next Static Reference",
  },
  description:
    "Reference integration of @atomazing-org/design-system with Next.js App Router static export and MUI.",
  applicationName: "DS Next Static Reference",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "DS Next Static Reference",
    title: "Design System Next.js Static Export Reference",
    description:
      "Reference integration of @atomazing-org/design-system with Next.js App Router static export and MUI.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design System Next.js Static Export Reference",
    description:
      "Reference integration of @atomazing-org/design-system with Next.js App Router static export and MUI.",
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
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <AppProviders>{children}</AppProviders>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
