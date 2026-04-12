import type { Metadata, Viewport } from "next";
import "./globals.css";

// Root layout sadece admin ve API için kullanılacak
// Public sayfalar app/[lang]/layout.tsx kullanacak

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kalindayapi.com"),
  title: {
    default: "Kalinda Yapı | Ortaca Emlak, Tadilat & Taahhüt",
    template: "%s | Kalinda Yapı",
  },
  description:
    "Muğla Ortaca'da güvenilir emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri.",
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Bu layout sadece [lang] dışındaki route'lar için çalışır (admin, api, vb.)
  // [lang] segmenti kendi layout'unu kullanır
  return children;
}