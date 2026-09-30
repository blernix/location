import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { site } from "@/data/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tikazkreyol.gp"),
  title: {
    default: `${site.name} — ${site.baseline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "location Guadeloupe",
    "villa Guadeloupe",
    "gîte Guadeloupe",
    "bungalow lagon",
    "location Deshaies",
    "location Sainte-Anne",
    "Le Gosier location",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: `${site.name} — ${site.baseline}`,
    description: site.description,
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630 }],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0d4a4b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lagoon-800 focus:px-5 focus:py-2 focus:text-sm focus:text-white"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
