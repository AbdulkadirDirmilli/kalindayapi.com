"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";
import { createWhatsAppLink } from "@/lib/utils";

const quickLinks = [
  { name: "Ana Sayfa", href: "/" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "İletişim", href: "/iletisim" },
  { name: "Gizlilik Politikası", href: "/gizlilik" },
];

const hizmetler = [
  { name: "Emlak Danışmanlığı", href: "/hizmetler/emlak-danismanligi" },
  { name: "Tadilat & Dekorasyon", href: "/hizmetler/tadilat-dekorasyon" },
  { name: "Taahhüt & İnşaat", href: "/hizmetler/taahhut-insaat" },
];

const ilanKategorileri = [
  { name: "Satılık Daireler", href: "/ilanlar?kategori=satilik&tip=daire" },
  { name: "Kiralık Daireler", href: "/ilanlar?kategori=kiralik&tip=daire" },
  { name: "Satılık Villalar", href: "/ilanlar?kategori=satilik&tip=villa" },
  { name: "Arsalar", href: "/ilanlar?kategori=satilik&tip=arsa" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F3A] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.svg"
                  alt="Kalında Yapı Logo"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight">KALINDA</span>
                <span className="font-bold text-xl tracking-tight text-[#C9A84C]"> YAPI</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Muğla Ortaca'da 2012'den bu yana güvenilir emlak danışmanlığı,
              tadilat ve inşaat taahhüt hizmetleri sunuyoruz. Hayalinizdeki eve
              veya projeye bir adım daha yakınsınız.
            </p>
            {/* Social Media */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/kalindayapi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/kalindayapi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/kalindayapi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Hizmetler */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[#C9A84C] font-bold mb-4">Hızlı Linkler</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[#C9A84C] font-bold mb-4">Hizmetler</h3>
              <ul className="space-y-2">
                {hizmetler.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* İlan Kategorileri */}
          <div>
            <h3 className="text-[#C9A84C] font-bold mb-4">İlan Kategorileri</h3>
            <ul className="space-y-2">
              {ilanKategorileri.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm flex items-center gap-1"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#C9A84C] font-bold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Cumhuriyet Mah. Atatürk Cad.<br />
                    No: 45/A, Ortaca / Muğla
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                  <div className="text-sm">
                    <a
                      href="tel:+905370530754"
                      className="text-gray-300 hover:text-[#C9A84C] transition-colors block"
                    >
                      +90 537 053 07 54
                    </a>
                    <span className="text-gray-500 text-xs">Zafer Bey (Emlak)</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                  <div className="text-sm">
                    <a
                      href="tel:+905321591556"
                      className="text-gray-300 hover:text-[#C9A84C] transition-colors block"
                    >
                      +90 532 159 15 56
                    </a>
                    <span className="text-gray-500 text-xs">Arif Bey (Yapı)</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                  <a
                    href="mailto:info@kalindayapi.com"
                    className="text-gray-300 hover:text-[#C9A84C] transition-colors text-sm"
                  >
                    info@kalindayapi.com
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C9A84C] flex-shrink-0" />
                  <div className="text-gray-300 text-sm">
                    <p>Pzt - Cum: 08:00 - 18:00</p>
                    <p>Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Kalında Yapı — Ortaca, Muğla | Tüm Hakları Saklıdır
            </p>
            <div className="flex items-center gap-4">
              <Link href="/gizlilik" className="hover:text-[#C9A84C] transition-colors">
                Gizlilik Politikası
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/kullanim-kosullari" className="hover:text-[#C9A84C] transition-colors">
                Kullanım Koşulları
              </Link>
            </div>
          </div>
          <div className="text-center mt-4 pt-4 border-t border-white/5">
            <p className="text-xs text-gray-500">
              Tasarım ve Geliştirme:{" "}
              <a
                href="https://www.akduniverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A84C] hover:text-white transition-colors"
              >
                AKD Universe
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
