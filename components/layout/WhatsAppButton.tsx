"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { createWhatsAppLink } from "@/lib/utils";

const contacts = [
  {
    name: "Zafer SOYLU",
    title: "Emlak Danışmanı",
    phone: "905370530754",
    foto: "/zafersoylu.png",
    color: "#C9A84C",
  },
  {
    name: "Arif DAĞDELEN",
    title: "Yapı & Taahhüt",
    phone: "905321591556",
    foto: "/arifdagdelen.png",
    color: "#0B1F3A",
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-2 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] px-4 py-3 text-white">
              <h3 className="font-bold">WhatsApp ile İletişim</h3>
              <p className="text-sm text-white/80">Yetkililerimize ulaşın</p>
            </div>

            {/* Contacts */}
            <div className="p-2">
              {contacts.map((contact) => (
                <a
                  key={contact.phone}
                  href={createWhatsAppLink(
                    contact.phone,
                    `Merhaba ${contact.name}, Kalında Yapı web sitesinden ulaşıyorum.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F5] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2" style={{ borderColor: contact.color }}>
                    <Image
                      src={contact.foto}
                      alt={contact.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1F3A] group-hover:text-[#25D366] transition-colors">
                      {contact.name}
                    </p>
                    <p className="text-sm text-[#666666]">{contact.title}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-[#F5F5F5] text-center">
              <p className="text-xs text-[#666666]">
                7/24 WhatsApp destek hattımız
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-lg flex items-center justify-center
          transition-all duration-300
          ${isOpen ? "bg-[#0B1F3A]" : "bg-[#25D366] whatsapp-bounce"}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="WhatsApp"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        )}
      </motion.button>

      {/* Pulse Effect */}
      {!isOpen && (
        <span className="absolute -inset-1 rounded-full bg-[#25D366] animate-ping opacity-25" />
      )}
    </div>
  );
}
