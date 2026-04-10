import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Kalinda Yapı ile iletişime geçin. Ortaca, Dalyan, Köyceğiz ve Muğla genelinde emlak, tadilat ve inşaat hizmetleri için bize ulaşın.",
  openGraph: {
    title: "İletişim",
    description:
      "Kalinda Yapı ile iletişime geçin. Emlak, tadilat ve inşaat hizmetleri için bize ulaşın.",
    url: "https://www.kalindayapi.com/iletisim",
  },
  alternates: {
    canonical: "https://www.kalindayapi.com/iletisim",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
