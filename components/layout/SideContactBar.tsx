"use client";

import { useState, useEffect } from "react";
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
  { name: "Zafer Bey", phone: "+905370530754", label: "Emlak" },
  { name: "Arif Bey", phone: "+905321591556", label: "Yapı" },
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
              className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#0B1F3A] text-white rounded-l-lg flex items-center justify-center hover:bg-[#1a3a5c] transition-colors"
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
              <div className="p-2 border-b border-[#e0e0e0]">
                {phoneNumbers.map((item, index) => (
                  <a
                    key={item.phone}
                    href={`tel:${item.phone}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors group"
                    title={`${item.name} - ${item.label}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0B1F3A] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          className="whitespace-nowrap overflow-hidden"
                        >
                          <p className="text-xs text-[#666666]">{item.label}</p>
                          <p className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors">
                            {item.name}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </a>
                ))}
              </div>

              {/* Email Section */}
              <div className="p-2 border-b border-[#e0e0e0]">
                <a
                  href="mailto:info@kalindayapi.com"
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors group"
                  title="E-posta gönder"
                >
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#0B1F3A]" />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        className="whitespace-nowrap overflow-hidden"
                      >
                        <p className="text-xs text-[#666666]">E-posta</p>
                        <p className="text-sm font-semibold text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors">
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
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors group"
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
                            className="text-sm font-medium text-[#0B1F3A] group-hover:text-[#C9A84C] transition-colors whitespace-nowrap overflow-hidden"
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
