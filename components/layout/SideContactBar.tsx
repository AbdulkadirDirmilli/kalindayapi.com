"use client";

import { useState, useEffect } from "react";
import { DanismanAvatar, type Cinsiyet } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";
import { useLocale } from "@/components/providers/LocaleProvider";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/kalindayapiortaca/",
    icon: Instagram,
    color: "#E4405F",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/kalindayapi",
    icon: Facebook,
    color: "#1877F2",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/kalindayapi",
    icon: Youtube,
    color: "#FF0000",
  },
];

/** /api/danismanlar yanitindaki alanlardan kullandiklarimiz. */
interface BarDanismani {
  id: string;
  ad: string;
  unvan: string;
  telefon: string;
  foto: string | null;
  cinsiyet: string | null;
}

export default function SideContactBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // Danismanlar artik sabit degil; admin panelinden eklenen herkes burada da
  // gorunur (sira alanina gore siralanir).
  const [danismanlar, setDanismanlar] = useState<BarDanismani[]>([]);
  const { dict } = useLocale();

  useEffect(() => {
    let iptal = false;
    fetch("/api/danismanlar")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!iptal && d?.danismanlar) setDanismanlar(d.danismanlar);
      })
      .catch(() => {});
    return () => {
      iptal = true;
    };
  }, []);

  // Çeviriler
  const t = dict?.sideContact || {
    email: "E-posta",
    sendEmail: "E-posta gönder",
    closeMenu: "Menüyü kapat"
  };



  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:block"
        >
          <div className="relative">
            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-primary text-white rounded-l-lg flex items-center justify-center hover:bg-primary-light transition-colors"
              aria-label={isExpanded ? t.closeMenu : ""}
            >
              {isExpanded ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>

            {/* Contact Bar */}
            <motion.div
              animate={{ width: isExpanded ? "auto" : "48px" }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-l-xl overflow-hidden"
            >
              {/* Phone Section */}
              <div className="p-2 border-b border-border">
                {danismanlar.map((item) => (
                  <a
                    key={item.id}
                    href={`tel:${item.telefon.replace(/s/g, "")}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors group"
                    title={`${item.ad} - ${item.unvan}`}
                  >
                    <DanismanAvatar
                      foto={item.foto}
                      cinsiyet={item.cinsiyet as Cinsiyet}
                      ad={item.ad}
                      size={32}
                    />
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          <p className="text-xs text-text-light">{item.unvan}</p>
                          <p className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                            {item.ad}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                ))}
              </div>

              {/* Email Section */}
              <div className="p-2 border-b border-border">
                <a
                  href="mailto:info@kalindayapi.com"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors group"
                  title={t.sendEmail}
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-ink" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        <p className="text-xs text-text-light">{t.email}</p>
                        <p className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                          info@kalindayapi.com
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </a>
              </div>

              {/* Social Media Section */}
              <div className="p-2">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors group"
                      title={item.name}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-sm font-medium text-ink group-hover:text-primary transition-colors whitespace-nowrap overflow-hidden"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
