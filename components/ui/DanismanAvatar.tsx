import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export type Cinsiyet = "erkek" | "kadin" | null | undefined;

interface DanismanAvatarProps {
  /** Danisman fotografinin yolu. Bos ise cinsiyete gore ikon gosterilir. */
  foto?: string | null;
  cinsiyet?: Cinsiyet;
  /** Erisilebilirlik icin alt metni; ikon durumunda title olarak kullanilir. */
  ad: string;
  /** Piksel cinsinden kenar uzunlugu (kare/daire). */
  size?: number;
  /** Daireyi cevreleyen kenarlik sinifi, ornegin "border-2 border-white/25". */
  className?: string;
}

/**
 * Danisman profil gorseli. Fotograf varsa onu, yoksa cinsiyete gore renkli
 * bir kisi ikonu gosterir (erkek: accent mavisi, kadin: feminine pembesi).
 *
 * Proje genelinde ayni "rounded-full + Image" kalibi yedi ayri yerde elle
 * tekrarlaniyordu; hepsi bu bilesene tasindi.
 */
export default function DanismanAvatar({
  foto,
  cinsiyet,
  ad,
  size = 48,
  className,
}: DanismanAvatarProps) {
  const kutu = cn("relative shrink-0 rounded-full overflow-hidden", className);

  if (foto) {
    return (
      <span className={kutu} style={{ width: size, height: size }}>
        <Image src={foto} alt={ad} fill sizes={`${size}px`} className="object-cover" />
      </span>
    );
  }

  const kadin = cinsiyet === "kadin";
  return (
    <span
      className={cn(kutu, "grid place-items-center", kadin ? "bg-feminine/15" : "bg-accent/15")}
      style={{ width: size, height: size }}
      title={ad}
      aria-label={ad}
      role="img"
    >
      <User
        className={kadin ? "text-feminine" : "text-accent"}
        style={{ width: size * 0.55, height: size * 0.55 }}
        aria-hidden="true"
      />
    </span>
  );
}
