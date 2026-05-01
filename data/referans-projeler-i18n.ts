// Reference Projects Fallback Data - Internationalization
import type { Locale } from '@/lib/i18n/config';

interface Proje {
  id: string;
  baslik: string;
  kategori: string | null;
  konum: string | null;
  oncesiFoto: string;
  sonrasiFoto: string;
}

export const fallbackProjeler: Record<Locale, Proje[]> = {
  tr: [
    {
      id: "1",
      baslik: "Villa Projesi - Dalyan",
      kategori: "İnşaat",
      konum: "Dalyan, Ortaca",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
    },
    {
      id: "2",
      baslik: "Mutfak Yenileme - Ortaca",
      kategori: "Tadilat",
      konum: "Ortaca Merkez",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
    },
    {
      id: "3",
      baslik: "Daire Renovasyonu - Köyceğiz",
      kategori: "Tadilat",
      konum: "Köyceğiz Merkez",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
    },
    {
      id: "4",
      baslik: "Bahçeli Ev - Dalaman",
      kategori: "İnşaat",
      konum: "Dalaman",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
    },
    {
      id: "5",
      baslik: "Banyo Yenileme - Ortaca",
      kategori: "Tadilat",
      konum: "Ortaca Merkez",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
    },
  ],
  en: [
    {
      id: "1",
      baslik: "Villa Project - Dalyan",
      kategori: "Construction",
      konum: "Dalyan, Ortaca",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
    },
    {
      id: "2",
      baslik: "Kitchen Renovation - Ortaca",
      kategori: "Renovation",
      konum: "Ortaca Center",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
    },
    {
      id: "3",
      baslik: "Apartment Renovation - Köyceğiz",
      kategori: "Renovation",
      konum: "Köyceğiz Center",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
    },
    {
      id: "4",
      baslik: "Garden House - Dalaman",
      kategori: "Construction",
      konum: "Dalaman",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
    },
    {
      id: "5",
      baslik: "Bathroom Renovation - Ortaca",
      kategori: "Renovation",
      konum: "Ortaca Center",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
    },
  ],
  ar: [
    {
      id: "1",
      baslik: "مشروع فيلا - دالان",
      kategori: "بناء",
      konum: "دالان، أورتاجا",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
    },
    {
      id: "2",
      baslik: "تجديد المطبخ - أورتاجا",
      kategori: "تجديد",
      konum: "مركز أورتاجا",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
    },
    {
      id: "3",
      baslik: "تجديد شقة - كويجيز",
      kategori: "تجديد",
      konum: "مركز كويجيز",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
    },
    {
      id: "4",
      baslik: "منزل بحديقة - دالامان",
      kategori: "بناء",
      konum: "دالامان",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
    },
    {
      id: "5",
      baslik: "تجديد الحمام - أورتاجا",
      kategori: "تجديد",
      konum: "مركز أورتاجا",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
    },
  ],
  de: [
    {
      id: "1",
      baslik: "Villa-Projekt - Dalyan",
      kategori: "Bau",
      konum: "Dalyan, Ortaca",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
    },
    {
      id: "2",
      baslik: "Küchenrenovierung - Ortaca",
      kategori: "Renovierung",
      konum: "Ortaca Zentrum",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
    },
    {
      id: "3",
      baslik: "Wohnungsrenovierung - Köyceğiz",
      kategori: "Renovierung",
      konum: "Köyceğiz Zentrum",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
    },
    {
      id: "4",
      baslik: "Gartenhaus - Dalaman",
      kategori: "Bau",
      konum: "Dalaman",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
    },
    {
      id: "5",
      baslik: "Badezimmerrenovierung - Ortaca",
      kategori: "Renovierung",
      konum: "Ortaca Zentrum",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
    },
  ],
  ru: [
    {
      id: "1",
      baslik: "Проект виллы - Далян",
      kategori: "Строительство",
      konum: "Далян, Ортака",
      oncesiFoto: "/images/projects/villa-oncesi.jpg",
      sonrasiFoto: "/images/projects/villa-sonrasi.jpg",
    },
    {
      id: "2",
      baslik: "Ремонт кухни - Ортака",
      kategori: "Ремонт",
      konum: "Центр Ортака",
      oncesiFoto: "/images/projects/mutfak-oncesi.jpg",
      sonrasiFoto: "/images/projects/mutfak-sonrasi.jpg",
    },
    {
      id: "3",
      baslik: "Ремонт квартиры - Кёйджеиз",
      kategori: "Ремонт",
      konum: "Центр Кёйджеиз",
      oncesiFoto: "/images/projects/daire-oncesi.jpg",
      sonrasiFoto: "/images/projects/daire-sonrasi.jpg",
    },
    {
      id: "4",
      baslik: "Дом с садом - Даламан",
      kategori: "Строительство",
      konum: "Даламан",
      oncesiFoto: "/images/projects/bahce-oncesi.jpg",
      sonrasiFoto: "/images/projects/bahce-sonrasi.jpg",
    },
    {
      id: "5",
      baslik: "Ремонт ванной - Ортака",
      kategori: "Ремонт",
      konum: "Центр Ортака",
      oncesiFoto: "/images/projects/banyo-oncesi.jpg",
      sonrasiFoto: "/images/projects/banyo-sonrasi.jpg",
    },
  ],
};
