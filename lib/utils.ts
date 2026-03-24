import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number, currency: string = "TL"): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: currency === "TL" ? "TRY" : currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPhoneNumber(phone: string): string {
  // +90 537 053 07 54 formatı
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("90")) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10, 12)}`;
  }
  return phone;
}

export function createWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const baseUrl = `https://wa.me/${cleanPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function slugify(text: string): string {
  const turkishMap: { [key: string]: string } = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    I: "I",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return text
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export function getPropertyTypeLabel(tip: string): string {
  const labels: { [key: string]: string } = {
    daire: "Daire",
    villa: "Villa",
    arsa: "Arsa",
    ticari: "Ticari",
    mustakil: "Müstakil Ev",
  };
  return labels[tip] || tip;
}

export function getCategoryLabel(kategori: string): string {
  const labels: { [key: string]: string } = {
    satilik: "Satılık",
    kiralik: "Kiralık",
    gunluk: "Günlük Kiralık",
  };
  return labels[kategori] || kategori;
}

export function getCategoryBadgeClass(kategori: string): string {
  const classes: { [key: string]: string } = {
    satilik: "badge-satilik",
    kiralik: "badge-kiralik",
    ticari: "badge-ticari",
  };
  return classes[kategori] || "badge-satilik";
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return "Bugün";
  if (diffInDays === 1) return "Dün";
  if (diffInDays < 7) return `${diffInDays} gün önce`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} ay önce`;
  return `${Math.floor(diffInDays / 365)} yıl önce`;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateIlanNo(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `KY-${year}-${random}`;
}

// Type definitions for data
export interface Ilan {
  id: string;
  baslik: string;
  slug: string;
  kategori: "satilik" | "kiralik";
  tip: "daire" | "villa" | "arsa" | "ticari";
  fiyat: number;
  paraBirimi: string;
  konum: {
    il: string;
    ilce: string;
    mahalle: string;
    koordinatlar: {
      lat: number;
      lng: number;
    };
  };
  ozellikler: {
    metrekare: number;
    odaSayisi?: string;
    banyoSayisi?: number;
    kat?: number;
    toplamKat?: number;
    binaYasi?: number;
    isitma?: string;
    esyali?: boolean;
    balkon?: boolean;
    asansor?: boolean;
    otopark?: boolean;
    guvenlik?: boolean;
    havuz?: boolean;
    bahce?: boolean;
    bahceMetrekare?: number;
    imarDurumu?: string;
    gabari?: string;
    yolCephesi?: number;
    altyapi?: boolean;
  };
  aciklama: string;
  fotograflar: string[];
  oneCikan: boolean;
  yayinTarihi: string;
  guncellenmeTarihi: string;
  durum: string;
  ilanNo: string;
}

export interface Hizmet {
  id: string;
  slug: string;
  baslik: string;
  kisaAciklama: string;
  uzunAciklama: string;
  ikon: string;
  yetkili: {
    ad: string;
    unvan: string;
    telefon: string;
    whatsapp: string;
  };
  altHizmetler: {
    baslik: string;
    aciklama: string;
    ikon: string;
  }[];
  bolge: string[];
  sss: {
    soru: string;
    cevap: string;
  }[];
}

export interface Ortak {
  id: string;
  ad: string;
  unvan: string;
  telefon: string;
  whatsapp: string;
  email: string;
  biyografi: string;
  uzmanlikAlanlari: string[];
  foto: string;
}
