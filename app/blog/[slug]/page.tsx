import { Metadata } from "next";
import { notFound } from "next/navigation";
import blogData from "@/data/blog-posts.json";
import BlogDetayClient from "./BlogDetayClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogData.yazilar.map((yazi) => ({ slug: yazi.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const yazi = blogData.yazilar.find((y) => y.slug === slug);

  if (!yazi) {
    return { title: "Yazı Bulunamadı" };
  }

  return {
    title: yazi.baslik,
    description: yazi.ozet,
    keywords: yazi.etiketler,
    authors: [{ name: yazi.yazar }],
    openGraph: {
      title: yazi.baslik,
      description: yazi.ozet,
      url: `https://www.kalindayapi.com/blog/${yazi.slug}`,
      type: "article",
      publishedTime: yazi.yayinTarihi,
      authors: [yazi.yazar],
      images: yazi.kapakGorsel ? [{ url: yazi.kapakGorsel, alt: yazi.baslik }] : [],
    },
    alternates: {
      canonical: `https://www.kalindayapi.com/blog/${yazi.slug}`,
    },
  };
}

export default async function BlogDetayPage({ params }: PageProps) {
  const { slug } = await params;
  const yazi = blogData.yazilar.find((y) => y.slug === slug);

  if (!yazi) {
    notFound();
  }

  const digerYazilar = blogData.yazilar
    .filter((y) => y.id !== yazi.id)
    .slice(0, 3);

  return <BlogDetayClient yazi={yazi} digerYazilar={digerYazilar} />;
}
