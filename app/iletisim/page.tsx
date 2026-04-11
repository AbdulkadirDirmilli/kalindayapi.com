"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Building2,
  HardHat,
} from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";
import { Card } from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/jsonld";
import { Users } from "lucide-react";

const hizmetSecenekleri = [
  { value: "", label: "Hizmet Seçin" },
  { value: "emlak-satilik", label: "Emlak - Satılık" },
  { value: "emlak-kiralik", label: "Emlak - Kiralık" },
  { value: "tadilat", label: "Tadilat & Dekorasyon" },
  { value: "taahhut", label: "Taahhüt & İnşaat" },
  { value: "plan-proje", label: "Plan & Proje" },
  { value: "diger", label: "Diğer" },
];

const yetkililer = [
  {
    ad: "Zafer SOYLU",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 537 053 07 54",
    whatsapp: "905370530754",
    email: "zafer@kalindayapi.com",
    foto: "/zafersoylu.png",
    ikon: Building2,
    renk: "#C9A84C",
  },
  {
    ad: "Arif DAĞDELEN",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 532 159 15 56",
    whatsapp: "905321591556",
    email: "arif@kalindayapi.com",
    foto: "/arifdagdelen.png",
    ikon: HardHat,
    renk: "#0B1F3A",
  },
  {
    ad: "Hikmet KARAOĞLAN",
    unvan: "Gayrimenkul & Yapı Danışmanı",
    telefon: "+90 555 453 12 07",
    whatsapp: "905554531207",
    email: "hikmet@kalindayapi.com",
    foto: "/hikmetkaraoglan.svg",
    ikon: Users,
    renk: "#2E7D32",
  },
];

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    konu: "",
    mesaj: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/iletisim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ad: `${formData.ad} ${formData.soyad}`.trim(),
          email: formData.email || '',
          telefon: formData.telefon,
          konu: formData.konu,
          mesaj: formData.mesaj,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
      }

      setIsSubmitted(true);
      setFormData({
        ad: "",
        soyad: "",
        telefon: "",
        email: "",
        konu: "",
        mesaj: "",
      });

      // Reset after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mesaj gönderilemedi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Ana Sayfa", url: "/" },
    { name: "İletişim", url: "/iletisim" },
  ]);

  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Hero with Video Background */}
      <section className="relative bg-[#0B1F3A] pt-32 pb-20 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          aria-hidden="true"
        >
          <source src="/videos/drone-iletisim.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/60 via-[#0B1F3A]/40 to-[#0B1F3A]/70" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#C9A84C] transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#C9A84C]">İletişim</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bizimle <span className="text-[#C9A84C]">İletişime</span> Geçin
            </h1>
            <p className="text-gray-300 text-lg">
              Emlak, tadilat veya inşaat projeleriniz için sorularınızı yanıtlamaktan
              mutluluk duyarız. Size en kısa sürede dönüş yapacağız.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-[#F5F5F5]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  İletişim Bilgileri
                </h2>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A]">Adres</h3>
                    <p className="text-[#666666]">
                      Atatürk Mah. 58 Sk. No: 2/B
                      <br />
                      (Belediye Arkası), Ortaca / Muğla
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A]">E-posta</h3>
                    <a
                      href="mailto:info@kalindayapi.com"
                      className="text-[#C9A84C] hover:underline"
                    >
                      info@kalindayapi.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1F3A]">Çalışma Saatleri</h3>
                    <p className="text-[#666666]">
                      Pazartesi - Cuma: 08:00 - 18:00
                      <br />
                      Cumartesi: 09:00 - 14:00
                      <br />
                      Pazar: Kapalı
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Contacts */}
              <div>
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">
                  Yetkililerimiz
                </h2>
                <div className="space-y-2">
                  {yetkililer.map((yetkili) => (
                      <Card key={yetkili.ad} padding="md" className="!p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2"
                            style={{ borderColor: yetkili.renk }}
                          >
                            <Image
                              src={yetkili.foto}
                              alt={yetkili.ad}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#0B1F3A] text-sm">
                              {yetkili.ad}
                            </h3>
                            <a
                              href={`tel:${yetkili.telefon.replace(/\s/g, "")}`}
                              className="text-xs text-[#666666] hover:text-[#C9A84C] transition-colors"
                            >
                              {yetkili.telefon}
                            </a>
                          </div>
                          <a
                            href={createWhatsAppLink(
                              yetkili.whatsapp,
                              `Merhaba ${yetkili.ad}, bilgi almak istiyorum.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0"
                          >
                            <Button
                              variant="whatsapp"
                              size="sm"
                              className="!px-3 !py-1.5"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </a>
                        </div>
                      </Card>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  Sosyal Medya
                </h2>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/kalindayapiortaca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://facebook.com/kalindayapi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://youtube.com/kalindayapi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-transform"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Side - Form */}
            <div>
              <Card padding="md" className="!p-5">
                <h2 className="text-xl font-bold text-[#0B1F3A] mb-4">
                  Bize Mesaj Gönderin
                </h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-sm text-[#666666]">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input
                        label="Adınız"
                        name="ad"
                        value={formData.ad}
                        onChange={handleChange}
                        placeholder="Adınız"
                        required
                      />
                      <Input
                        label="Soyadınız"
                        name="soyad"
                        value={formData.soyad}
                        onChange={handleChange}
                        placeholder="Soyadınız"
                        required
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input
                        label="Telefon"
                        name="telefon"
                        type="tel"
                        value={formData.telefon}
                        onChange={handleChange}
                        placeholder="0 (5XX) XXX XX XX"
                        required
                      />
                      <Input
                        label="E-posta"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@email.com"
                      />
                    </div>

                    <Select
                      label="Konu"
                      name="konu"
                      value={formData.konu}
                      onChange={handleChange}
                      options={hizmetSecenekleri}
                      required
                    />

                    <Textarea
                      label="Mesajınız"
                      name="mesaj"
                      value={formData.mesaj}
                      onChange={handleChange}
                      placeholder="Projeniz veya sorunuz hakkında detaylı bilgi verin..."
                      rows={4}
                      required
                    />

                    <Button
                      type="submit"
                      variant="accent"
                      size="md"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Mesaj Gönder
                    </Button>

                    <p className="text-xs text-[#999999] text-center">
                      Formu göndererek{" "}
                      <Link href="/gizlilik" className="text-[#C9A84C] hover:underline">
                        gizlilik politikamızı
                      </Link>{" "}
                      kabul etmiş olursunuz.
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section - Responsive */}
      <section className="py-12 lg:py-16 bg-[#0B1F3A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-10">
            <span className="text-[#C9A84C] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              Bölgemizi Keşfedin
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Ortaca ve <span className="text-[#C9A84C]">Çevresi</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Video 1 - Harita */}
            <div className="relative group">
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-[#C9A84C] via-[#0B1F3A] to-[#C9A84C] rounded-2xl sm:rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/mapharita.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#C9A84C] text-[#0B1F3A] text-xs sm:text-sm font-bold rounded-full shadow-lg">
                      Harita Görünümü
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 2 - Drone */}
            <div className="relative group">
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-[#0B1F3A] via-[#C9A84C] to-[#0B1F3A] rounded-2xl sm:rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-2xl">
                <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/drone-iletisim.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-[#0B1F3A] text-xs sm:text-sm font-bold rounded-full shadow-lg">
                      Drone Çekimi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-400 text-sm sm:text-base mt-6 lg:mt-8 max-w-2xl mx-auto px-4">
            Muğla'nın incisi Ortaca ve çevresindeki eşsiz lokasyonları keşfedin.
            Dalyan, Köyceğiz, Dalaman ve daha fazlası...
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-[#e0e0e0]">
        <iframe
          src="https://maps.google.com/maps?q=36.83947,28.76639&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kalinda Yapı Konum - Ortaca, Muğla"
        />
      </section>
    </>
  );
}
