import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SideContactBar from "@/components/layout/SideContactBar";
import ScrollToTop from "@/components/layout/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kalindayapi.com"),
  title: {
    default: "Kalinda Yapı | Ortaca Emlak, Tadilat & Taahhüt",
    template: "%s | Kalinda Yapı",
  },
  description:
    "Muğla Ortaca'da güvenilir emlak danışmanlığı, tadilat ve inşaat taahhüt hizmetleri. Satılık & kiralık daireler, villalar, araziler. Zafer Soylu ve Arif Dağdelen ortaklığıyla 2012'den bu yana hizmetinizdeyiz.",
  keywords: [
    "Ortaca emlak",
    "Ortaca satılık daire",
    "Ortaca kiralık ev",
    "Ortaca tadilat",
    "Muğla inşaat taahhüt",
    "Dalyan emlak",
    "Ortaca yapı firması",
    "Köyceğiz kiralık",
    "Dalaman emlak",
    "Muğla emlak",
  ],
  authors: [{ name: "Kalinda Yapı" }],
  creator: "Kalinda Yapı",
  publisher: "Kalinda Yapı",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.kalindayapi.com",
    siteName: "Kalinda Yapı",
    title: "Kalinda Yapı | Ortaca'nın Güvenilir Yapı & Emlak Ortağı",
    description:
      "Muğla Ortaca'da emlak, tadilat ve taahhüt hizmetleri. 12+ yıllık deneyim, 500+ tamamlanan proje.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kalinda Yapı - Ortaca Emlak & Yapı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kalinda Yapı | Ortaca Emlak, Tadilat & Taahhüt",
    description:
      "Muğla Ortaca'da güvenilir emlak ve yapı çözümleri. Satılık & kiralık gayrimenkuller.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: "https://www.kalindayapi.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${nunito.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0B1F3A" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ScrollToTop />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <SideContactBar />
      </body>
    </html>
  );
}
