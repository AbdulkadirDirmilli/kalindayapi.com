"use client";

import { Share2 } from "lucide-react";
import Button from "./Button";

interface ShareButtonProps {
  title: string;
  text: string;
}

export default function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title,
        text,
        url: window.location.href,
      }).catch(() => {});
    } else {
      // Fallback: copy to clipboard
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        alert("Link kopyalandı!");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full"
      leftIcon={<Share2 className="w-5 h-5" />}
      onClick={handleShare}
    >
      Paylaş
    </Button>
  );
}
