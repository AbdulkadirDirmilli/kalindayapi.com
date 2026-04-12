"use client";

import { useState, useCallback } from "react";
import { Heart, Loader2, CheckCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";

interface LeadFormProps {
  listingId: string;
  listingTitle: string;
  /** Render variant: "icon" shows just the heart, "button" shows heart + text */
  variant?: "icon" | "button";
  className?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const TURKISH_PHONE_REGEX = /^(0?5\d{9}|905\d{9}|\+905\d{9})$/;

function cleanPhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "");
}

export default function LeadForm({
  listingId,
  listingTitle,
  variant = "icon",
  className = "",
}: LeadFormProps) {
  const [liked, setLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleHeartClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!liked) {
        setLiked(true);
        setModalOpen(true);
      } else {
        // Already submitted or modal open - toggle modal
        setModalOpen(true);
      }
    },
    [liked]
  );

  const handleClose = useCallback(() => {
    setModalOpen(false);
    // If not submitted, revert heart
    if (status !== "success") {
      setLiked(false);
    }
  }, [status]);

  const isPhoneValid = TURKISH_PHONE_REGEX.test(cleanPhone(phone));
  const isFormValid = name.trim().length >= 2 && isPhoneValid && kvkkAccepted;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid || status === "loading") return;

      setStatus("loading");
      setErrorMessage("");

      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: cleanPhone(phone),
            listingId,
            listingTitle,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error || "Bir hata oluştu.");
          return;
        }

        setStatus("success");
      } catch {
        setStatus("error");
        setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyiniz.");
      }
    },
    [isFormValid, status, name, phone, listingId, listingTitle]
  );

  return (
    <>
      {/* Heart Button */}
      <button
        type="button"
        onClick={handleHeartClick}
        className={`group/heart inline-flex items-center gap-1.5 transition-all duration-200 ${className}`}
        aria-label="Bu ilan hakkında bilgi al"
      >
        <Heart
          className={`w-6 h-6 transition-all duration-300 ${
            liked
              ? "fill-red-500 text-red-500 scale-110"
              : "text-gray-400 group-hover/heart:text-red-400"
          }`}
        />
        {variant === "button" && (
          <span
            className={`text-sm font-medium ${
              liked ? "text-red-500" : "text-gray-500 group-hover/heart:text-red-400"
            }`}
          >
            Bilgi Al
          </span>
        )}
      </button>

      {/* Lead Form Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleClose}
        title={status === "success" ? undefined : "İlan Hakkında Bilgi Al"}
        size="sm"
      >
        {status === "success" ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#0B1F3A] mb-2">
              Talebiniz Alındı!
            </h3>
            <p className="text-[#666666] mb-6">
              En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-6 py-2.5 bg-[#0B1F3A] text-white rounded-lg font-medium hover:bg-[#0B1F3A]/90 transition-colors"
            >
              Tamam
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Listing info */}
            <div className="bg-[#F5F5F5] rounded-lg p-3">
              <p className="text-sm text-[#666666]">İlan:</p>
              <p className="font-semibold text-[#0B1F3A] text-sm line-clamp-2">
                {listingTitle}
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="lead-name"
                className="block text-sm font-medium text-[#0B1F3A] mb-1"
              >
                Ad Soyad
              </label>
              <input
                id="lead-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız Soyadınız"
                required
                minLength={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="lead-phone"
                className="block text-sm font-medium text-[#0B1F3A] mb-1"
              >
                Telefon
              </label>
              <input
                id="lead-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="05XX XXX XX XX"
                required
                className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-shadow ${
                  phone && !isPhoneValid
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
              />
              {phone && !isPhoneValid && (
                <p className="text-xs text-red-500 mt-1">
                  Geçerli bir telefon numarası giriniz (05XX XXX XX XX)
                </p>
              )}
            </div>

            {/* KVKK Consent */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(e) => setKvkkAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-[#C9A84C] focus:ring-[#C9A84C]"
              />
              <span className="text-xs text-[#666666] leading-relaxed">
                Kişisel verilerimin işlenmesini ve bilgilerimin paylaşılmasını{" "}
                <a
                  href="/gizlilik"
                  target="_blank"
                  className="text-[#C9A84C] underline"
                >
                  KVKK Aydınlatma Metni
                </a>
                {" "}kapsamında kabul ediyorum.
              </span>
            </label>

            {/* Error */}
            {status === "error" && errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || status === "loading"}
              className="w-full py-3 bg-[#C9A84C] text-white rounded-lg font-semibold text-sm hover:bg-[#b8963e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                "Bu ilan hakkında bilgi almak istiyorum"
              )}
            </button>
          </form>
        )}
      </Modal>
    </>
  );
}
