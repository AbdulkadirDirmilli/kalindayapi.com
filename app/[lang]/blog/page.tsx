"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Tag, Search, ArrowRight } from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { formatDate } from "@/lib/utils";

const kategoriler = ["Tümü", "Emlak", "İmar", "Tadilat", "Gayrimenkul"];

export default function BlogPage() {
  const [aktifKategori, setAktifKategori] = useState("Tümü");
  const [aramaMetni, setAramaMetni] = useState("");

  const filtrelenmisYazilar = blogData.yazilar.filter((yazi) => {
    const kategoriUyumu =
      aktifKategori === "Tümü" || yazi.kategori === aktifKategori;
    const aramaUyumu =
      aramaMetni === "" ||
      yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      yazi.ozet.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      yazi.etiketler.some((e) =>
        e.toLowerCase().includes(aramaMetni.toLowerCase())
      );
    return kategoriUyumu && aramaUyumu;
  });

  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-[#0B1F3A] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1a3a5c] to-[#0B1F3A]" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            Blog & <span className="text-[#C9A84C]">Rehber</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            Emlak, yapı, tadilat ve imar konularında güncel bilgiler, uzman
            görüşleri ve pratik rehberler
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-[#e0e0e0] sticky top-[64px] z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Kategori Filtreleri */}
            <div className="flex flex-wrap gap-2">
              {kategoriler.map((kategori) => (
                <button
                  key={kategori}
                  onClick={() => setAktifKategori(kategori)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    aktifKategori === kategori
                      ? "bg-[#0B1F3A] text-white"
                      : "bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]"
                  }`}
                >
                  {kategori}
                </button>
              ))}
            </div>

            {/* Arama */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
              <input
                type="text"
                placeholder="Yazılarda ara..."
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-[#e0e0e0] rounded-lg text-sm focus:outline-none focus:border-[#0B1F3A] transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Listesi */}
      <section className="py-12 md:py-16 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          {filtrelenmisYazilar.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#666666] text-lg">
                Aramanızla eşleşen yazı bulunamadı.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtrelenmisYazilar.map((yazi, index) => (
                <motion.article
                  key={yazi.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${yazi.slug}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                      {/* Kapak Görseli */}
                      <div className="relative h-48 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] overflow-hidden">
                        {yazi.kapakGorsel && (
                          <Image
                            src={yazi.kapakGorsel}
                            alt={yazi.baslik}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-block px-3 py-1 bg-[#C9A84C] text-[#0B1F3A] text-xs font-bold rounded-full">
                            {yazi.kategori}
                          </span>
                        </div>
                      </div>

                      {/* İçerik */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-lg font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
                          {yazi.baslik}
                        </h2>
                        <p className="text-[#666666] text-sm mb-4 line-clamp-3 flex-1">
                          {yazi.ozet}
                        </p>

                        {/* Meta Bilgiler */}
                        <div className="flex items-center justify-between text-xs text-[#999999] pt-4 border-t border-[#e0e0e0]">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(yazi.yayinTarihi)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {yazi.okunmaSuresi} dk
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#C9A84C] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Bölümü */}
      <section className="py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Profesyonel Danışmanlık Almak İster misiniz?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Emlak, tadilat, inşaat veya imar konularında uzman ekibimizden
            ücretsiz danışmanlık alın.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#C9A84C] text-[#0B1F3A] px-8 py-3 rounded-lg font-semibold hover:bg-[#a88a3d] transition-colors"
          >
            Bize Ulaşın
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
