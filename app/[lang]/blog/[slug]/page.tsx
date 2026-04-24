import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import blogData from "@/data/blog-posts.json";
import BlogDetayClient from "./BlogDetayClient";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";
import { buildLocalizedUrl, buildSeoAlternates, resolveLocale, SITE_URL } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

const siteUrl = SITE_URL;

// Veritabanından blog yazısı getir
// Returns { post, isOriginalLocale, redirectSlug } to handle redirects properly
async function getBlogPost(slug: string, locale: Locale): Promise<{
  post: {
    id: string;
    slug: string;
    baslik: string;
    ozet: string;
    icerik: string;
    kategori: string;
    yazar: string;
    kapakGorsel: string;
    yayinTarihi: string;
    etiketler: string[];
    okunmaSuresi: number;
  } | null;
  isOriginalLocale: boolean;
  redirectSlug?: string;
}> {
  try {
    // Önce slug ile translation'ı bul
    const translation = await prisma.blogPostTranslation.findFirst({
      where: {
        slug: slug,
        language: locale,
        status: 'published',
      },
      include: {
        post: true,
      },
    });

    if (translation && translation.post.aktif) {
      return {
        post: {
          id: translation.post.id,
          slug: translation.slug,
          baslik: translation.baslik,
          ozet: translation.ozet,
          icerik: translation.icerik,
          kategori: translation.post.kategori,
          yazar: translation.post.yazar,
          kapakGorsel: translation.post.kapakGorsel || '',
          yayinTarihi: translation.post.yayinTarihi.toISOString().split('T')[0],
          etiketler: translation.etiketler ? JSON.parse(translation.etiketler) : [],
          okunmaSuresi: Math.ceil((translation.icerik?.length || 1000) / 1000),
        },
        isOriginalLocale: true,
      };
    }

    // Translation bulunamadıysa, originalSlug ile dene
    const post = await prisma.blogPost.findUnique({
      where: { originalSlug: slug },
      include: {
        translations: {
          where: { language: locale, status: 'published' },
          take: 1,
        },
      },
    });

    if (post && post.aktif && post.translations[0]) {
      const tr = post.translations[0];
      return {
        post: {
          id: post.id,
          slug: tr.slug,
          baslik: tr.baslik,
          ozet: tr.ozet,
          icerik: tr.icerik,
          kategori: post.kategori,
          yazar: post.yazar,
          kapakGorsel: post.kapakGorsel || '',
          yayinTarihi: post.yayinTarihi.toISOString().split('T')[0],
          etiketler: tr.etiketler ? JSON.parse(tr.etiketler) : [],
          okunmaSuresi: Math.ceil((tr.icerik?.length || 1000) / 1000),
        },
        isOriginalLocale: true,
      };
    }

    // Çeviri yok: Türkçe slug'ı bul ve redirect için döndür
    if (locale !== 'tr') {
      // Slug ile Türkçe translation ara
      const trTranslation = await prisma.blogPostTranslation.findFirst({
        where: {
          slug: slug,
          language: 'tr',
          status: 'published',
        },
        include: { post: true },
      });

      if (trTranslation && trTranslation.post.aktif) {
        return {
          post: null,
          isOriginalLocale: false,
          redirectSlug: trTranslation.slug,
        };
      }

      // originalSlug ile post bul, Türkçe çevirisini al
      if (post && post.aktif) {
        const postTrTranslation = await prisma.blogPostTranslation.findFirst({
          where: { postId: post.id, language: 'tr', status: 'published' },
        });

        if (postTrTranslation) {
          return {
            post: null,
            isOriginalLocale: false,
            redirectSlug: postTrTranslation.slug,
          };
        }
      }
    }

    return { post: null, isOriginalLocale: true };
  } catch (error) {
    console.error('Blog getirme hatası:', error);
    return { post: null, isOriginalLocale: true };
  }
}

// Diğer yazıları getir
async function getOtherPosts(currentId: string, locale: Locale, limit = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        aktif: true,
        id: { not: currentId },
      },
      include: {
        translations: {
          where: { language: locale, status: 'published' },
          take: 1,
        },
      },
      orderBy: { yayinTarihi: 'desc' },
      take: limit,
    });

    return posts
      .filter(p => p.translations[0])
      .map(p => {
        const tr = p.translations[0];
        return {
          id: p.id,
          slug: tr.slug,
          baslik: tr.baslik,
          ozet: tr.ozet,
          kategori: p.kategori,
          kapakGorsel: p.kapakGorsel,
          yayinTarihi: p.yayinTarihi.toISOString().split('T')[0],
          okunmaSuresi: Math.ceil((tr.icerik?.length || 1000) / 1000),
        };
      });
  } catch {
    return [];
  }
}

// JSON'dan fallback fonksiyonu
function getFromJson(slug: string) {
  const yazi = blogData.yazilar.find((y) => y.slug === slug);
  if (!yazi) return null;

  // İçerik array'ini string'e çevir
  const icerikString = yazi.icerik.map((item) => {
    if (item.tip === 'baslik') return `## ${item.metin}`;
    if (item.tip === 'altbaslik') return `### ${item.metin}`;
    if (item.tip === 'liste') return `- ${item.metin}`;
    return item.metin;
  }).join('\n\n');

  return {
    id: yazi.id,
    slug: yazi.slug,
    baslik: yazi.baslik,
    ozet: yazi.ozet,
    icerik: icerikString,
    kategori: yazi.kategori,
    yazar: yazi.yazar,
    kapakGorsel: yazi.kapakGorsel,
    yayinTarihi: yazi.yayinTarihi,
    etiketler: yazi.etiketler,
    okunmaSuresi: yazi.okunmaSuresi,
  };
}

export async function generateStaticParams() {
  // Her dil için statik parametreler oluştur
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const yazi of blogData.yazilar) {
      params.push({ lang, slug: yazi.slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = resolveLocale(lang);

  const result = await getBlogPost(slug, locale);

  // Çeviri yoksa redirect olacak, metadata önemli değil
  if (!result.isOriginalLocale && result.redirectSlug) {
    return { title: 'Redirecting...' };
  }

  let yazi = result.post;
  if (!yazi) {
    yazi = getFromJson(slug);
  }

  if (!yazi) {
    return { title: locale === 'en' ? 'Post Not Found' : locale === 'ar' ? 'المقالة غير موجودة' : 'Yazı Bulunamadı' };
  }

  const url = buildLocalizedUrl(`/blog/${yazi.slug}`, locale);

  return {
    title: `${yazi.baslik} | Kalinda Yapı`,
    description: yazi.ozet,
    keywords: yazi.etiketler,
    authors: [{ name: yazi.yazar }],
    openGraph: {
      title: yazi.baslik,
      description: yazi.ozet,
      url,
      type: "article",
      publishedTime: yazi.yayinTarihi,
      authors: [yazi.yazar],
      images: yazi.kapakGorsel ? [{ url: yazi.kapakGorsel, alt: yazi.baslik }] : [],
      locale: locale === 'tr' ? 'tr_TR' : locale === 'en' ? 'en_US' : 'ar_SA',
    },
    alternates: buildSeoAlternates(`/blog/${yazi.slug}`, locale),
  };
}

export default async function BlogDetayPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;

  const result = await getBlogPost(slug, locale);

  // Çeviri yoksa Türkçe'ye redirect yap (301 permanent)
  if (!result.isOriginalLocale && result.redirectSlug) {
    redirect(`/tr/blog/${result.redirectSlug}`);
  }

  let yazi = result.post;
  let digerYazilar: Array<{
    id: string;
    slug: string;
    baslik: string;
    ozet: string;
    kategori: string;
    kapakGorsel: string | null;
    yayinTarihi: string;
    okunmaSuresi: number;
  }> = [];

  if (yazi) {
    digerYazilar = await getOtherPosts(yazi.id, locale);
  } else {
    // JSON fallback
    yazi = getFromJson(slug);
    if (yazi) {
      digerYazilar = blogData.yazilar
        .filter((y) => y.id !== yazi!.id)
        .slice(0, 3)
        .map(y => ({
          id: y.id,
          slug: y.slug,
          baslik: y.baslik,
          ozet: y.ozet,
          kategori: y.kategori,
          kapakGorsel: y.kapakGorsel,
          yayinTarihi: y.yayinTarihi,
          okunmaSuresi: y.okunmaSuresi,
        }));
    }
  }

  if (!yazi) {
    notFound();
  }

  return <BlogDetayClient yazi={yazi} digerYazilar={digerYazilar} locale={locale} />;
}
