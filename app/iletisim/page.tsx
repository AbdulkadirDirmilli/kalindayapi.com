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

const hizmetSecenekleri = [
  { value: "", label: "Hizmet Seçin" },
  { value: "emlak-satilik", label: "Emlak - Satılık" },
  { value: "emlak-kiralik", label: "Emlak - Kiralık" },
  { value: "tadilat", label: "Tadilat & Dekorasyon" },
  { value: "taahhut", label: "Taahhüt & İnşaat" },
  { value: "diger", label: "Diğer" },
];

const yetkililer = [
  {
    ad: "Zafer SOYLU",
    unvan: "Emlak Danışmanı",
    telefon: "+90 537 053 07 54",
    whatsapp: "905370530754",
    email: "zafer@kalindayapi.com",
    foto: "/zafersoylu.png",
    ikon: Building2,
    renk: "#C9A84C",
  },
  {
    ad: "Arif DAĞDELEN",
    unvan: "Yapı & Taahhüt Uzmanı",
    telefon: "+90 532 159 15 56",
    whatsapp: "905321591556",
    email: "arif@kalindayapi.com",
    foto: "/arifdagdelen.png",
    ikon: HardHat,
    renk: "#0B1F3A",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
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

      {/* Hero */}
      <section className="bg-[#0B1F3A] pt-32 pb-20">
        <div className="container mx-auto px-4">
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
                      Cumhuriyet Mah. Atatürk Cad.
                      <br />
                      No: 45/A, Ortaca / Muğla
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
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  Yetkililerimiz
                </h2>
                <div className="space-y-4">
                  {yetkililer.map((yetkili) => (
                      <Card key={yetkili.ad} padding="lg">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border-2"
                            style={{ borderColor: yetkili.renk }}
                          >
                            <Image
                              src={yetkili.foto}
                              alt={yetkili.ad}
                              width={56}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-[#0B1F3A]">
                              {yetkili.ad}
                            </h3>
                            <p className="text-sm text-[#666666]">{yetkili.unvan}</p>
                          </div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <a
                            href={`tel:${yetkili.telefon.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C9A84C] transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            <span>{yetkili.telefon}</span>
                          </a>
                          <a
                            href={`mailto:${yetkili.email}`}
                            className="flex items-center gap-2 text-[#0B1F3A] hover:text-[#C9A84C] transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            <span>{yetkili.email}</span>
                          </a>
                        </div>

                        <a
                          href={createWhatsAppLink(
                            yetkili.whatsapp,
                            `Merhaba ${yetkili.ad}, bilgi almak istiyorum.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="whatsapp"
                            size="sm"
                            className="w-full"
                            leftIcon={<MessageCircle className="w-4 h-4" />}
                          >
                            WhatsApp ile Yaz
                          </Button>
                        </a>
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
                    href="https://instagram.com/kalindayapi"
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
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-[#0B1F3A] mb-6">
                  Bize Mesaj Gönderin
                </h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg
                        className="w-10 h-10 text-green-500"
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
                    <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
                      Mesajınız Gönderildi!
                    </h3>
                    <p className="text-[#666666]">
                      En kısa sürede size dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
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

                    <div className="grid sm:grid-cols-2 gap-4">
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
                      rows={5}
                      required
                    />

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-5 h-5" />}
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

      {/* Map */}
      <section className="h-[400px] bg-[#e0e0e0]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25555.36436036367!2d28.75!3d36.8384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c0089a8c48e0c3%3A0x6fd3bf1e56bc0f7c!2sOrtaca%2C%20Mu%C4%9Fla!5e0!3m2!1str!2str!4v1"
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
