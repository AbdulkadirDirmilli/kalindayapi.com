"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  Share2,
  Phone,
} from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { formatDate, createWhatsAppLink } from "@/lib/utils";

export default function BlogDetayPage() {
  const params = useParams();
  const slug = params.slug as string;

  const yazi = blogData.yazilar.find((y) => y.slug === slug);

  if (!yazi) {
    return (
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-[#0B1F3A] mb-4">
            Yazı Bulunamadı
          </h1>
          <p className="text-[#666666] mb-8">
            Aradığınız blog yazısı bulunamadı veya kaldırılmış olabilir.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Blog'a Dön
          </Link>
        </div>
      </section>
    );
  }

  // Diğer yazıları bul (mevcut yazı hariç)
  const digerYazilar = blogData.yazilar
    .filter((y) => y.id !== yazi.id)
    .slice(0, 3);

  // Ortak bilgisi
  const ortaklar: Record<string, { telefon: string; whatsapp: string }> = {
    "Zafer Soylu": { telefon: "+90 537 053 07 54", whatsapp: "905370530754" },
    "Arif Dağdelen": {
      telefon: "+90 532 159 15 56",
      whatsapp: "905321591556",
    },
    "Hikmet Karaoğlan": {
      telefon: "+90 555 453 12 07",
      whatsapp: "905554531207",
    },
  };

  const yazarBilgisi = ortaklar[yazi.yazar];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0B1F3A] pt-32 pb-12 md:pt-40 md:pb-16">
        {/* Background Image */}
        {yazi.kapakGorsel && (
          <div className="absolute inset-0">
            <Image
              src={yazi.kapakGorsel}
              alt={yazi.baslik}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/80 to-[#0B1F3A]/60" />
          </div>
        )}
        {!yazi.kapakGorsel && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1a3a5c] to-[#0B1F3A]" />
        )}
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog'a Dön
            </Link>

            <span className="inline-block px-3 py-1 bg-[#C9A84C] text-[#0B1F3A] text-xs font-bold rounded-full mb-4">
              {yazi.kategori}
            </span>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl leading-tight">
              {yazi.baslik}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C9A84C]" />
                {yazi.yazar}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C9A84C]" />
                {formatDate(yazi.yayinTarihi)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C9A84C]" />
                {yazi.okunmaSuresi} dk okuma
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* İçerik */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Ana İçerik */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="prose prose-lg max-w-none">
                {yazi.icerik.map((blok, index) => {
                  if (blok.tip === "baslik") {
                    return (
                      <h2
                        key={index}
                        className="text-xl md:text-2xl font-bold text-[#0B1F3A] mt-8 mb-4"
                      >
                        {blok.metin}
                      </h2>
                    );
                  }
                  return (
                    <p
                      key={index}
                      className="text-[#444444] leading-relaxed mb-4"
                    >
                      {blok.metin}
                    </p>
                  );
                })}
              </div>

              {/* Etiketler */}
              <div className="mt-10 pt-6 border-t border-[#e0e0e0]">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-[#C9A84C]" />
                  {yazi.etiketler.map((etiket) => (
                    <span
                      key={etiket}
                      className="px-3 py-1 bg-[#F5F5F5] text-[#666666] text-sm rounded-full"
                    >
                      {etiket}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Yazar Bilgisi */}
              {yazarBilgisi && (
                <div className="bg-[#F5F5F5] rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-[#0B1F3A] mb-4 uppercase tracking-wider">
                    Yazar
                  </h3>
                  <div className="space-y-3">
                    <p className="font-bold text-[#0B1F3A]">{yazi.yazar}</p>
                    <p className="text-sm text-[#666666]">
                      Gayrimenkul & Yapı Danışmanı
                    </p>
                    <div className="flex gap-2 pt-2">
                      <a
                        href={`tel:${yazarBilgisi.telefon.replace(/\s/g, "")}`}
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#0B1F3A] text-white text-xs rounded-lg hover:bg-[#1a3a5c] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        Ara
                      </a>
                      <a
                        href={createWhatsAppLink(
                          yazarBilgisi.whatsapp,
                          `Merhaba, "${yazi.baslik}" yazınız hakkında bilgi almak istiyorum.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#25D366] text-white text-xs rounded-lg hover:bg-[#128C7E] transition-colors"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Hızlı İletişim */}
              <div className="bg-[#0B1F3A] rounded-2xl p-6 text-white">
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-[#C9A84C]">
                  Danışmanlık Alın
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  Bu konuda profesyonel destek almak ister misiniz? Uzman
                  ekibimiz yanınızda.
                </p>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1F3A] px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#a88a3d] transition-colors w-full justify-center"
                >
                  Bize Ulaşın
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Diğer Yazılar */}
              <div>
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-4 uppercase tracking-wider">
                  Diğer Yazılar
                </h3>
                <div className="space-y-4">
                  {digerYazilar.map((diger) => (
                    <Link
                      key={diger.id}
                      href={`/blog/${diger.slug}`}
                      className="block group"
                    >
                      <div className="bg-[#F5F5F5] rounded-xl p-4 hover:bg-[#E5E5E5] transition-colors">
                        <span className="text-xs text-[#C9A84C] font-semibold">
                          {diger.kategori}
                        </span>
                        <h4 className="text-sm font-bold text-[#0B1F3A] mt-1 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                          {diger.baslik}
                        </h4>
                        <span className="text-xs text-[#999999] mt-2 block">
                          {formatDate(diger.yayinTarihi)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
