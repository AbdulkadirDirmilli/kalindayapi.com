"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import blogData from "@/data/blog-posts.json";
import { formatDate } from "@/lib/utils";

export default function SonYazilar() {
  const sonYazilar = blogData.yazilar.slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        {/* Başlık */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-[#C9A84C]/10 text-[#C9A84C] text-sm font-semibold rounded-full mb-3"
          >
            Blog & Rehber
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-bold text-[#0B1F3A] mb-4"
          >
            Son <span className="text-[#C9A84C]">Yazılarımız</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#666666] max-w-xl mx-auto"
          >
            Emlak, imar, tadilat ve gayrimenkul konularında uzman görüşleri ve
            pratik bilgiler
          </motion.p>
        </div>

        {/* Yazılar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sonYazilar.map((yazi, index) => (
            <motion.article
              key={yazi.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link href={`/blog/${yazi.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  {/* Kapak */}
                  <div className="relative h-44 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a5c] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-3 py-1 bg-[#C9A84C] text-[#0B1F3A] text-xs font-bold rounded-full">
                        {yazi.kategori}
                      </span>
                    </div>
                  </div>

                  {/* İçerik */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-bold text-[#0B1F3A] mb-2 line-clamp-2 group-hover:text-[#C9A84C] transition-colors">
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

        {/* Tümünü Gör */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0B1F3A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors"
          >
            Tüm Yazıları Gör
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
