import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Emlak ve Yapı Rehberi | Kalinda Yapı",
  description: "Emlak yatırımı, tadilat önerileri, imar bilgileri ve Muğla bölgesi hakkında güncel blog yazıları.",
  keywords: [
    "emlak blog",
    "tadilat rehberi",
    "imar durumu",
    "Muğla emlak",
    "gayrimenkul yatırım",
  ],
  openGraph: {
    title: "Blog | Emlak ve Yapı Rehberi | Kalinda Yapı",
    description: "Emlak ve yapı sektörü hakkında bilgilendirici yazılar.",
    url: "https://www.kalindayapi.com/blog",
  },
  alternates: {
    canonical: "https://www.kalindayapi.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
