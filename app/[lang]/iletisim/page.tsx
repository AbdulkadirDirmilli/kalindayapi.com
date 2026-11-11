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
} from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";
import { Card } from "@/components/ui/Card";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { createWhatsAppLink } from "@/lib/utils";
import { generateBreadcrumbSchema, generateOrganizationSchema } from "@/lib/jsonld";
import { useLocale } from "@/components/providers/LocaleProvider";

const yetkililer = [
  {
    id: "arif",
    telefon: "+90 532 159 15 56",
    whatsapp: "905321591556",
    email: "arif@kalindayapi.com",
    foto: "/arifdagdelen.png",
    ikon: Building2,
    renk: "#C9A84C",
  },
];

export default function IletisimPage() {
  const { dict } = useLocale();
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

  // Translations
  const t = dict?.contactPage || {
    heroTitle: "İletişim",
    heroSubtitle: "Sorularınız için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk duyarız.",
    heroDescription: "Alım, satım veya kiralama planınız için lisanslı danışmanımızla görüşün.",
    infoTitle: "İletişim Bilgileri",
    address: "Adres",
    addressLine1: "Atatürk Mah. 58 Sk. No: 2/B",
    addressLine2: "(Belediye Arkası), Ortaca / Muğla",
    email: "E-posta",
    workingHours: "Çalışma Saatleri",
    weekdaysHours: "Pazartesi - Cuma: 09:00 - 18:00",
    saturdayHours: "Cumartesi: 10:00 - 14:00",
    sundayClosed: "Pazar: Kapalı",
    teamTitle: "Danışmanınız",
    socialTitle: "Sosyal Medya",
    formTitle: "Bize Mesaj Gönderin",
    successTitle: "Mesajınız Gönderildi!",
    successMessage: "En kısa sürede size dönüş yapacağız.",
    form: {
      name: "Adınız Soyadınız",
      namePlaceholder: "Adınızı girin",
      email: "E-posta Adresiniz",
      emailPlaceholder: "ornek@email.com",
      phone: "Telefon Numaranız",
      phonePlaceholder: "0 (5XX) XXX XX XX",
      service: "İlgilendiğiniz Hizmet",
      serviceSelect: "Hizmet Seçin",
      message: "Mesajınız",
      messagePlaceholder: "Mesajınızı buraya yazın...",
      submit: "Mesaj Gönder",
      sending: "Gönderiliyor..."
    },
    serviceOptions: {
      emlak: "Emlak Danışmanlığı",
      degerleme: "Gayrimenkul Değerleme",
      yatirim: "Yatırım Danışmanlığı",
      tapu: "Tapu & Resmi İşlemler",
      diger: "Diğer"
    },
    team: {
      arif: { name: "Arif DAĞDELEN", title: "Kurucu | Lisanslı Gayrimenkul Danışmanı" }
    },
    mapTitle: "Kalinda Yapı Konum - Ortaca, Muğla"
  };

  const nav = dict?.nav || { home: "Ana Sayfa", contact: "İletişim" };
  const homeContactForm = dict?.home?.contactForm || { privacyNote: "Formu göndererek", privacyLink: "gizlilik politikamızı", privacyAccept: "kabul etmiş olursunuz." };

  // Service options with translations
  const hizmetSecenekleri = [
    { value: "", label: t.form?.serviceSelect || "Hizmet Seçin" },
    { value: "emlak-satilik", label: `${t.serviceOptions?.emlak || "Emlak"} - ${dict?.listings?.categories?.satilik || "Satılık"}` },
    { value: "emlak-kiralik", label: `${t.serviceOptions?.emlak || "Emlak"} - ${dict?.listings?.categories?.kiralik || "Kiralık"}` },
    { value: "degerleme", label: t.serviceOptions?.degerleme || "Gayrimenkul Değerleme" },
    { value: "yatirim", label: t.serviceOptions?.yatirim || "Yatırım Danışmanlığı" },
    { value: "tapu", label: t.serviceOptions?.tapu || "Tapu & Resmi İşlemler" },
    { value: "diger", label: t.serviceOptions?.diger || "Diğer" },
  ];

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
    { name: nav.home, url: "/" },
    { name: nav.contact, url: "/iletisim" },
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

      {/* Kompakt başlık - banner yok */}
      <section className="pt-28 md:pt-32 pb-8 bg-white border-b border-border">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-5">
            <Link href="/" className="hover:text-accent transition-colors">
              <Home className="w-4 h-4" />
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-ink">{nav.contact}</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-bold text-ink">
              {t.heroTitle}
            </h1>
            <p className="text-text-light mt-3">{t.heroSubtitle}</p>
          </div>

          {/* Hızlı iletişim kanalları */}
          <div className="grid sm:grid-cols-3 gap-3 mt-6">
            <a
              href="tel:+905321591556"
              className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-surface hover:border-accent transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-text-muted">
                  {dict?.nav?.callNow || "Telefon"}
                </span>
                <span className="block text-sm font-semibold text-ink truncate">
                  +90 532 159 15 56
                </span>
              </span>
            </a>

            <a
              href={createWhatsAppLink(
                "905321591556",
                dict?.whatsapp?.greeting || "Merhaba, bilgi almak istiyorum."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-surface hover:border-accent transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-whatsapp flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-text-muted">WhatsApp</span>
                <span className="block text-sm font-semibold text-ink truncate">
                  +90 532 159 15 56
                </span>
              </span>
            </a>

            <a
              href="mailto:info@kalindayapi.com"
              className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-surface hover:border-accent transition-colors"
            >
              <span className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-ink" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-text-muted">{t.email}</span>
                <span className="block text-sm font-semibold text-ink truncate">
                  info@kalindayapi.com
                </span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-14 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <div>
                <h2 className="text-2xl font-bold text-ink mb-6">
                  {t.infoTitle}
                </h2>

                {/* Address */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{t.address}</h3>
                    <p className="text-text-light">
                      {t.addressLine1}
                      <br />
                      {t.addressLine2}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{t.email}</h3>
                    <a
                      href="mailto:info@kalindayapi.com"
                      className="text-primary-dark font-medium hover:text-accent transition-colors"
                    >
                      info@kalindayapi.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{t.workingHours}</h3>
                    <p className="text-text-light">
                      {t.weekdaysHours}
                      <br />
                      {t.saturdayHours}
                      <br />
                      {t.sundayClosed}
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Contacts */}
              <div>
                <h2 className="text-xl font-bold text-ink mb-4">
                  {t.teamTitle}
                </h2>
                <div className="space-y-2">
                  {yetkililer.map((yetkili) => {
                    const teamMember = t.team?.[yetkili.id as keyof typeof t.team] || { name: yetkili.id, title: "" };
                    return (
                      <Card key={yetkili.id} padding="md" className="!p-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2"
                            style={{ borderColor: yetkili.renk }}
                          >
                            <Image
                              src={yetkili.foto}
                              alt={teamMember.name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-ink text-sm">
                              {teamMember.name}
                            </h3>
                            <a
                              href={`tel:${yetkili.telefon.replace(/\s/g, "")}`}
                              className="text-xs text-text-light hover:text-[#C9A84C] transition-colors"
                            >
                              {yetkili.telefon}
                            </a>
                          </div>
                          <a
                            href={createWhatsAppLink(
                              yetkili.whatsapp,
                              dict?.whatsapp?.greeting || "Merhaba, bilgi almak istiyorum."
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
                    );
                  })}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-2xl font-bold text-ink mb-6">
                  {t.socialTitle}
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
                <h2 className="text-xl font-bold text-ink mb-4">
                  {t.formTitle}
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
                    <h3 className="text-lg font-bold text-ink mb-2">
                      {t.successTitle}
                    </h3>
                    <p className="text-sm text-text-light">
                      {t.successMessage}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <Input
                        label={t.form?.name || "Adınız Soyadınız"}
                        name="ad"
                        value={formData.ad}
                        onChange={handleChange}
                        placeholder={t.form?.namePlaceholder || "Adınızı girin"}
                        required
                      />
                      <Input
                        label={t.form?.phone || "Telefon"}
                        name="telefon"
                        type="tel"
                        value={formData.telefon}
                        onChange={handleChange}
                        placeholder={t.form?.phonePlaceholder || "0 (5XX) XXX XX XX"}
                        required
                      />
                    </div>

                    <Input
                      label={t.form?.email || "E-posta"}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.form?.emailPlaceholder || "ornek@email.com"}
                    />

                    <Select
                      label={t.form?.service || "İlgilendiğiniz Hizmet"}
                      name="konu"
                      value={formData.konu}
                      onChange={handleChange}
                      options={hizmetSecenekleri}
                      required
                    />

                    <Textarea
                      label={t.form?.message || "Mesajınız"}
                      name="mesaj"
                      value={formData.mesaj}
                      onChange={handleChange}
                      placeholder={t.form?.messagePlaceholder || "Mesajınızı buraya yazın..."}
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
                      {t.form?.submit || "Mesaj Gönder"}
                    </Button>

                    <p className="text-xs text-text-muted text-center">
                      {homeContactForm.privacyNote}{" "}
                      <Link href="/gizlilik" className="text-primary-dark font-medium hover:text-accent transition-colors">
                        {homeContactForm.privacyLink}
                      </Link>{" "}
                      {homeContactForm.privacyAccept}
                    </p>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery Section - Responsive */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 lg:mb-10">
            <span className="text-[#C9A84C] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {dict?.videoGallery?.badge || "Bölgemizi Keşfedin"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              {dict?.videoGallery?.title || "Ortaca ve"} <span className="text-[#C9A84C]">{dict?.videoGallery?.titleHighlight || "Çevresi"}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Video 1 - Harita */}
            <div className="relative group">
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-[#C9A84C] via-primary to-[#C9A84C] rounded-2xl sm:rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#C9A84C] text-ink text-xs sm:text-sm font-bold rounded-full shadow-lg">
                      {dict?.videoGallery?.mapView || "Harita Görünümü"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video 2 - Drone */}
            <div className="relative group">
              <div className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-primary via-[#C9A84C] to-primary rounded-2xl sm:rounded-3xl opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-300" />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-ink text-xs sm:text-sm font-bold rounded-full shadow-lg">
                      {dict?.videoGallery?.droneView || "Drone Çekimi"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-white/70 text-sm sm:text-base mt-6 lg:mt-8 max-w-2xl mx-auto px-4">
            {dict?.videoGallery?.description || "Muğla'nın incisi Ortaca ve çevresindeki eşsiz lokasyonları keşfedin. Dalyan, Köyceğiz, Dalaman ve daha fazlası..."}
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-surface-dark">
        <iframe
          src="https://maps.google.com/maps?q=36.83947,28.76639&t=&z=17&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.mapTitle}
        />
      </section>
    </>
  );
}
