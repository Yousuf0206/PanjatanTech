import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ExitIntentModal } from "@/components/overlays/exit-intent-modal";
import { SiteServices } from "@/components/overlays/site-services";
import { StickyCtaBar } from "@/components/overlays/sticky-cta-bar";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — AI infrastructure for developers`, template: `%s · ${site.name}` },
  description: site.description,
  icons: { icon: "/brand/logo.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0B1120",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <StickyCtaBar />
        <ExitIntentModal />
        <SiteServices />
      </body>
    </html>
  );
}
