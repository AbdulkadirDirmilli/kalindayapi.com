import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Satılık & Kiralık İlanlar | Kalinda Yapı",
  description: "Muğla Ortaca, Dalyan, Köyceğiz ve çevresinde satılık ve kiralık daireler, villalar, arsalar. Güncel emlak ilanları ve fiyatları.",
  keywords: [
    "Ortaca satılık daire",
    "Ortaca kiralık ev",
    "Dalyan villa",
    "Köyceğiz arsa",
    "Muğla emlak ilanları",
  ],
  openGraph: {
    title: "Satılık & Kiralık İlanlar | Kalinda Yapı",
    description: "Muğla bölgesinde güncel emlak ilanları. Satılık ve kiralık gayrimenkuller.",
    url: "https://www.kalindayapi.com/ilanlar",
  },
  alternates: {
    canonical: "https://www.kalindayapi.com/ilanlar",
  },
};

export default function IlanlarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
