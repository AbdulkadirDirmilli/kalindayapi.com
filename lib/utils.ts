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

/**
 * Yaygın ASCII-Türkçe karakter hatalarını düzeltir.
 * Örn: "Celik Kapi" → "Çelik Kapı", "Asansor" → "Asansör"
 */
const TURKISH_CORRECTIONS: Record<string, string> = {
  // İç Özellikler
  "ADSL/Fiber Internet": "ADSL/Fiber İnternet",
  "Akilli Ev Sistemi": "Akıllı Ev Sistemi",
  "Amerikan Kapi": "Amerikan Kapı",
  "Ankastre Mutfak": "Ankastre Mutfak",
  "Banyo Jakuzili": "Banyo Jakuzili",
  "Bulaşik Makinesi": "Bulaşık Makinesi",
  "Bulasik Makinesi": "Bulaşık Makinesi",
  "Camasir Makinesi": "Çamaşır Makinesi",
  "Camasir Odasi": "Çamaşır Odası",
  "Celik Kapi": "Çelik Kapı",
  "Dusakabin": "Duşakabin",
  "Ebeveyn Banyosu": "Ebeveyn Banyosu",
  "Firin": "Fırın",
  "Giyinme Odasi": "Giyinme Odası",
  "Gömme Dolap": "Gömme Dolap",
  "Gomme Dolap": "Gömme Dolap",
  "Hilton Banyo": "Hilton Banyo",
  "Isyerine Uygun": "İşyerine Uygun",
  "Jakuzi": "Jakuzi",
  "Kartonpiyer": "Kartonpiyer",
  "Kuvet": "Küvet",
  "Laminat Zemin": "Laminat Zemin",
  "Mobilyali": "Mobilyalı",
  "Mutfak Ankastre": "Mutfak Ankastre",
  "Panel Radyator": "Panel Radyatör",
  "Parke Zemin": "Parke Zemin",
  "PVC Dograma": "PVC Doğrama",
  "Seramik Zemin": "Seramik Zemin",
  "Set Ustu Ocak": "Set Üstü Ocak",
  "Spot Aydinlatma": "Spot Aydınlatma",
  "Somine": "Şömine",
  "Vestiyer": "Vestiyer",
  "Yuksek Tavan": "Yüksek Tavan",
  // Dış Özellikler
  "Arac Park Yeri": "Araç Park Yeri",
  "Asansor": "Asansör",
  "Bahce": "Bahçe",
  "Bahce Kati": "Bahçe Katı",
  "Cati Kati": "Çatı Katı",
  "Deniz Gorunumu": "Deniz Görünümü",
  "Denize Sifir": "Denize Sıfır",
  "Gunes Paneli": "Güneş Paneli",
  "Isicamli Pencere": "Isıcamlı Pencere",
  "Jenerator": "Jeneratör",
  "Kapici": "Kapıcı",
  "Kapali Garaj": "Kapalı Garaj",
  "Kapali Otopark": "Kapalı Otopark",
  "Kis Bahcesi": "Kış Bahçesi",
  "Mustakil Girisli": "Müstakil Girişli",
  "Panjur/Kepenk": "Panjur/Kepenk",
  "Sehir Gorunumu": "Şehir Görünümü",
  "Yangin Merdiveni": "Yangın Merdiveni",
  // Muhit Özellikleri
  "Eglence Merkezi": "Eğlence Merkezi",
  "Gol": "Göl",
  "Havalimani": "Havalimanı",
  "Itfaiye": "İtfaiye",
  "Metrobus": "Metrobüs",
  "Minibus": "Minibüs",
  "Muze": "Müze",
  "Otobus Duragi": "Otobüs Durağı",
  "Otobus Durağı": "Otobüs Durağı",
  "Otobüs Duraği": "Otobüs Durağı",
  "Saglik Ocagi": "Sağlık Ocağı",
  "Saglik Ocağı": "Sağlık Ocağı",
  "Spor Salonu": "Spor Salonu",
  "Tren/Tram Istasyonu": "Tren/Tram İstasyonu",
  "Universite": "Üniversite",
  // Güvenlik
  "24 Saat Guvenlik": "24 Saat Güvenlik",
  "Guvenlik Kamerasi": "Güvenlik Kamerası",
  "Guvenlik Personeli": "Güvenlik Personeli",
  "Yangin Algilama Sistemi": "Yangın Algılama Sistemi",
  "Yangin Sondurme Sistemi": "Yangın Söndürme Sistemi",
  "Hirsiz Alarmi": "Hırsız Alarmı",
  "Kartli Giris": "Kartlı Giriş",
  "Kapici Dairesi": "Kapıcı Dairesi",
  "Site Ici": "Site İçi",
  // Cephe
  "Kuzey-Dogu": "Kuzey-Doğu",
  "Kuzey-Bati": "Kuzey-Batı",
  "Guney": "Güney",
  "Guney-Dogu": "Güney-Doğu",
  "Guney-Bati": "Güney-Batı",
  "Dogu": "Doğu",
  "Bati": "Batı",
  "Tum Cepheler": "Tüm Cepheler",
  // Manzara
  "Deniz Manzarasi": "Deniz Manzarası",
  "Gol Manzarasi": "Göl Manzarası",
  "Dag Manzarasi": "Dağ Manzarası",
  "Orman Manzarasi": "Orman Manzarası",
  "Sehir Manzarasi": "Şehir Manzarası",
  "Doga Manzarasi": "Doğa Manzarası",
  "Havuz Manzarasi": "Havuz Manzarası",
  "Bahce Manzarasi": "Bahçe Manzarası",
  "Park Manzarasi": "Park Manzarası",
  "Bogaz Manzarasi": "Boğaz Manzarası",
  // Konum
  "Mugla": "Muğla",
  "Koycegiz": "Köyceğiz",
  "Koycegız": "Köyceğiz",
};

export function normalizeTurkishText(text: string): string {
  return TURKISH_CORRECTIONS[text] || text;
}

export function normalizeTurkishJsonArray(jsonStr: string | null | undefined): string | null {
  if (!jsonStr) return null;
  try {
    const arr: string[] = JSON.parse(jsonStr);
    const normalized = arr.map((item) => normalizeTurkishText(item));
    return JSON.stringify(normalized);
  } catch {
    return jsonStr;
  }
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

// İnşaat Durumu enum değerleri ve Türkçe karşılıkları
export const INSAAT_DURUMU_OPTIONS = [
  { value: 'PROJE', label: 'Proje aşamasında' },
  { value: 'TEMEL', label: 'Temel aşamasında' },
  { value: 'KABA_INSAAT', label: 'Kaba inşaat' },
  { value: 'INCE_INSAAT', label: 'İnce inşaat' },
  { value: 'SATISA_HAZIR', label: 'Satışa hazır' },
] as const;

export type InsaatDurumuValue = typeof INSAAT_DURUMU_OPTIONS[number]['value'];

export function getInsaatDurumuLabel(value: string | null | undefined): string {
  if (!value) return '';
  const option = INSAAT_DURUMU_OPTIONS.find((o) => o.value === value);
  return option?.label || value;
}

export function getInsaatDurumuBadgeClass(value: string): string {
  const classes: Record<string, string> = {
    PROJE: 'bg-blue-500 text-white animate-insaat-pulse',
    TEMEL: 'bg-orange-500 text-white animate-insaat-pulse',
    KABA_INSAAT: 'bg-yellow-500 text-black animate-insaat-pulse',
    INCE_INSAAT: 'bg-purple-500 text-white animate-insaat-pulse',
    SATISA_HAZIR: 'bg-green-500 text-white animate-insaat-pulse',
  };
  return classes[value] || 'bg-gray-500 text-white';
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
    // Detayli ozellikler
    icOzellikler?: string[];
    disOzellikler?: string[];
    muhitOzellikleri?: string[];
    guvenlikOzellikleri?: string[];
    cephe?: string[];
    manzara?: string[];
    // Arsa ozellikleri
    altyapiDetay?: string[];
    tarimOzellikleri?: string[];
    // Ticari ozellikler
    depoOzellikleri?: string[];
    // Insaat durumu
    insaatDurumu?: string;
  };
  aciklama: string;
  fotograflar: string[];
  videoUrl?: string | null;
  oneCikan: boolean;
  eidsDogrulanmis?: boolean;
  yayinTarihi: string;
  guncellenmeTarihi: string;
  durum: string;
  insaatDurumu?: string | null;
  ilanNo: string;
  danisman?: {
    id: string;
    ad: string;
    unvan: string;
    telefon: string;
    whatsapp?: string | null;
    email?: string | null;
    foto?: string | null;
  } | null;
}

export interface Hizmet {
  id: string;
  slug: string;
  baslik: string;
  kisaAciklama: string;
  uzunAciklama: string;
  ikon: string;
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
