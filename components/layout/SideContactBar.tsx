"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { Instagram, Facebook, Youtube } from "@/components/icons/SocialIcons";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/kalindayapi",
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

const phoneNumbers = [
  { name: "Zafer Bey", phone: "+905370530754", label: "Danışman", foto: "/zafersoylu.png" },
  { name: "Arif Bey", phone: "+905321591556", label: "Danışman", foto: "/arifdagdelen.png" },
  { name: "Hikmet Bey", phone: "+905554531207", label: "Danışman", foto: null },
];

export default function SideContactBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
              aria-label={isExpanded ? "Kapat" : "Aç"}
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
                {phoneNumbers.map((item, index) => (
                  <a
                    key={item.phone}
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface transition-colors group"
                    title={`${item.name} - ${item.label}`}
                  >
                    {item.foto ? (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-accent">
                        <Image
                          src={item.foto}
                          alt={item.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          <p className="text-xs text-text-light">{item.label}</p>
                          <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                            {item.name}
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
                  title="E-posta gönder"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        <p className="text-xs text-text-light">E-posta</p>
                        <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
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
                            className="text-sm font-medium text-primary group-hover:text-accent transition-colors whitespace-nowrap overflow-hidden"
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
