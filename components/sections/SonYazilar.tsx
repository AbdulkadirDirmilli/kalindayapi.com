"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { formatDate } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface SonYazilarProps {
  lang?: Locale;
  dict?: any;
}

export default function SonYazilar({ lang = 'tr', dict }: SonYazilarProps) {
  const sonYazilar = blogData.yazilar.slice(0, 3);

  // Fallback translations
  const t = dict?.home?.blog || {
    badge: "Blog & Rehber",
    title: "Son",
    titleHighlight: "Yazılarımız",
    subtitle: "Emlak, imar, tadilat ve gayrimenkul konularında uzman görüşleri ve pratik bilgiler",
    viewAll: "Tüm Yazıları Gör",
    readTime: "dk",
  };

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-semibold rounded-full mb-3"
          >
            {t.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold text-primary mb-4"
          >
            {t.title} <span className="text-accent">{t.titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#666666] max-w-xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Yazılar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {sonYazilar.map((yazi, index) => (
            <motion.article
              key={yazi.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/${lang}/blog/${yazi.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  {/* Kapak */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] overflow-hidden">
                    {yazi.kapakGorsel && (
                      <Image
                        src={yazi.kapakGorsel}
                        alt={yazi.baslik}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 bg-[#C9A84C] text-primary text-xs font-bold rounded-full">
                        {yazi.kategori}
                      </span>
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {yazi.baslik}
                    </h3>
                    <p className="text-[#666666] text-sm mb-4 line-clamp-2 flex-1">
                      {yazi.ozet}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#999999] pt-3 border-t border-[#e0e0e0]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(yazi.yayinTarihi)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {yazi.okunmaSuresi} {t.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Tümünü Gör */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors"
          >
            {t.viewAll}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
