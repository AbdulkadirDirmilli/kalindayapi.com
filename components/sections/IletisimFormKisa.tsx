"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, MapPin, Phone, Clock } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const hizmetSecenekleri = [
  { value: "", label: "Hizmet Seçin" },
  { value: "emlak", label: "Emlak Danışmanlığı" },
  { value: "tadilat", label: "Tadilat & Dekorasyon" },
  { value: "taahhut", label: "Taahhüt & İnşaat" },
  { value: "diger", label: "Diğer" },
];

export default function IletisimFormKisa() {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      ad: formData.get('name') as string,
      telefon: formData.get('phone') as string,
      konu: formData.get('service') as string,
      mesaj: formData.get('message') as string || 'Bilgi talebi',
      email: '',
    };

    try {
      const response = await fetch('/api/iletisim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Bir hata oluştu');
      }

      setIsSubmitted(true);
      formRef.current?.reset();

      // Reset after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Mesaj gönderilemedi');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#0B1F3A]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white"
          >
            <span className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider">
              İletişim
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Hemen Bize Ulaşın
            </h2>
            <p className="text-gray-300 mb-8">
              Emlak, tadilat veya inşaat projeleriniz için ücretsiz danışmanlık
              alın. Size en kısa sürede dönüş yapacağız.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Adres</p>
                  <p className="font-medium">Ortaca, Muğla</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Telefon</p>
                  <p className="font-medium">+90 537 053 07 54</p>
                  <p className="font-medium">+90 532 159 15 56</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#C9A84C]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Çalışma Saatleri</p>
                  <p className="font-medium">Pzt-Cum: 08:00 - 18:00</p>
                  <p className="font-medium">Cumartesi: 09:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Map Preview */}
            <div className="mt-8 rounded-2xl overflow-hidden h-48 bg-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25555.36436036367!2d28.75!3d36.8384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c0089a8c48e0c3%3A0x6fd3bf1e56bc0f7c!2sOrtaca%2C%20Mu%C4%9Fla!5e0!3m2!1str!2str!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kalinda Yapı Konum"
              />
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-6">
                Ücretsiz Danışmanlık Formu
              </h3>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
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
                  <h4 className="text-lg font-bold text-[#0B1F3A] mb-2">
                    Mesajınız Alındı!
                  </h4>
                  <p className="text-[#666666]">
                    En kısa sürede size dönüş yapacağız.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Adınız Soyadınız"
                    name="name"
                    placeholder="Adınızı girin"
                    required
                  />

                  <Input
                    label="Telefon"
                    name="phone"
                    type="tel"
                    placeholder="0 (5XX) XXX XX XX"
                    required
                  />

                  <Select
                    label="Hizmet Türü"
                    name="service"
                    options={hizmetSecenekleri}
                    required
                  />

                  <Textarea
                    label="Mesajınız"
                    name="message"
                    placeholder="Projeniz hakkında kısaca bilgi verin..."
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-5 h-5" />}
                  >
                    Gönder
                  </Button>

                  <p className="text-xs text-[#999999] text-center">
                    Formu göndererek{" "}
                    <a href="/gizlilik" className="text-[#C9A84C] hover:underline">
                      gizlilik politikamızı
                    </a>{" "}
                    kabul etmiş olursunuz.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
