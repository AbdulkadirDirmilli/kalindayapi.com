// Kapsamlı Gayrimenkul Özellikleri
// Sahibinden.com seviyesinde detaylı özellik sistemi

export interface OzellikKategori {
  baslik: string
  alanlar: OzellikAlan[]
}

export interface OzellikAlan {
  ad: string
  tip: 'select' | 'number' | 'text' | 'checkbox' | 'multiselect'
  secenekler?: string[]
  birim?: string
  zorunlu?: boolean
}

// ==================== KONUT (Daire, Villa, Müstakil) ====================
export const konutOzellikleri: OzellikKategori[] = [
  {
    baslik: 'Temel Bilgiler',
    alanlar: [
      { ad: 'brutMetrekare', tip: 'number', birim: 'm²', zorunlu: true },
      { ad: 'netMetrekare', tip: 'number', birim: 'm²' },
      {
        ad: 'odaSayisi',
        tip: 'select',
        secenekler: [
          '1+0 (Stüdyo)',
          '1+1',
          '1.5+1',
          '2+0',
          '2+1',
          '2.5+1',
          '2+2',
          '3+1',
          '3.5+1',
          '3+2',
          '4+1',
          '4.5+1',
          '4+2',
          '5+1',
          '5+2',
          '6+1',
          '6+2',
          '7+1',
          '7+2',
          '8+1',
          '8+2',
          '9+1',
          '10+',
          'Açık Plan',
        ],
        zorunlu: true,
      },
      { ad: 'banyoSayisi', tip: 'number', zorunlu: true },
      { ad: 'tuvaletSayisi', tip: 'number' },
      { ad: 'balkonSayisi', tip: 'number' },
    ],
  },
  {
    baslik: 'Bina Bilgileri',
    alanlar: [
      { ad: 'binaYasi', tip: 'number', birim: 'Yıl' },
      { ad: 'bulunduguKat', tip: 'number' },
      { ad: 'katSayisi', tip: 'number' },
      {
        ad: 'binaKatSayisi',
        tip: 'select',
        secenekler: [
          '1',
          '2',
          '3',
          '4',
          '5-10',
          '10-20',
          '20-30',
          '30+',
          'Villa',
          'Müstakil',
        ],
      },
      {
        ad: 'binaTipi',
        tip: 'select',
        secenekler: [
          'Apartman',
          'Rezidans',
          'Villa',
          'Müstakil Ev',
          'Kooperatif',
          'Konut Sitesi',
          'Bahçeli Ev',
          'Köy Evi',
          'Çiftlik Evi',
          'Tarihi Konut',
          'Yalı',
        ],
      },
      {
        ad: 'kullanimDurumu',
        tip: 'select',
        secenekler: [
          'Boş',
          'Kiracılı',
          'Mal Sahibi Oturuyor',
          'Proje Aşamasında',
          'İnşaat Halinde',
        ],
      },
    ],
  },
  {
    baslik: 'Isınma ve Enerji',
    alanlar: [
      {
        ad: 'isitmaTipi',
        tip: 'select',
        secenekler: [
          'Doğalgaz (Kombi)',
          'Doğalgaz (Merkezi)',
          'Merkezi Sistem',
          'Merkezi Sistem (Pay Ölçer)',
          'Soba',
          'Yerden Isıtma',
          'Klima',
          'Şömine',
          'Fuel-Oil',
          'Kömür',
          'Elektrikli Radyatör',
          'Güneş Enerjisi',
          'Jeotermal',
          'Isı Pompası',
          'VRV/VRF',
          'Yok',
        ],
      },
      {
        ad: 'yakitTipi',
        tip: 'select',
        secenekler: [
          'Doğalgaz',
          'Elektrik',
          'Kömür',
          'Fuel-Oil',
          'Güneş Enerjisi',
          'Jeotermal',
        ],
      },
      {
        ad: 'enerjiSinifi',
        tip: 'select',
        secenekler: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      },
    ],
  },
  {
    baslik: 'İç Özellikler',
    alanlar: [
      {
        ad: 'icOzellikler',
        tip: 'multiselect',
        secenekler: [
          'ADSL/Fiber İnternet',
          'Akıllı Ev Sistemi',
          'Alarm Sistemi',
          'Amerikan Kapı',
          'Amerikan Mutfak',
          'Ankastre Mutfak',
          'Banyo Jakuzili',
          'Barbekü',
          'Bulaşık Makinesi',
          'Çamaşır Makinesi',
          'Çamaşır Odası',
          'Çelik Kapı',
          'Duşakabin',
          'Ebeveyn Banyosu',
          'Fırın',
          'Giyinme Odası',
          'Gömme Dolap',
          'Hilton Banyo',
          'İşyerine Uygun',
          'Jakuzi',
          'Kartonpiyer',
          'Kiler',
          'Klima',
          'Küvet',
          'Laminat Zemin',
          'Marley',
          'Mobilyalı',
          'Mutfak Ankastre',
          'Panel Radyatör',
          'Parke Zemin',
          'PVC Doğrama',
          'Sauna',
          'Seramik Zemin',
          'Set Üstü Ocak',
          'Spot Aydınlatma',
          'Şömine',
          'Teras',
          'Vestiyer',
          'Yüksek Tavan',
        ],
      },
    ],
  },
  {
    baslik: 'Dış Özellikler',
    alanlar: [
      {
        ad: 'disOzellikler',
        tip: 'multiselect',
        secenekler: [
          'Araç Park Yeri',
          'Asansör',
          'Bahçe',
          'Balkon',
          'Bahçe Katı',
          'Çatı Katı',
          'Deniz Görünümü',
          'Denize Sıfır',
          'Garaj',
          'Güneş Paneli',
          'Havuz',
          'Isıcamlı Pencere',
          'Jeneratör',
          'Kablo TV',
          'Kapıcı',
          'Kapalı Garaj',
          'Kapalı Otopark',
          'Kış Bahçesi',
          'Mantolama',
          'Müstakil Girişli',
          'Otopark',
          'Panjur/Kepenk',
          'PVC Doğrama',
          'Spor Alanı',
          'Şehir Görünümü',
          'Tenis Kortu',
          'Yangın Merdiveni',
        ],
      },
    ],
  },
  {
    baslik: 'Muhit ve Konum',
    alanlar: [
      {
        ad: 'muhitOzellikleri',
        tip: 'multiselect',
        secenekler: [
          'AVM',
          'Belediye',
          'Cami',
          'Cemevi',
          'Deniz',
          'Eğlence Merkezi',
          'Göl',
          'Hastane',
          'Havalimanı',
          'İtfaiye',
          'Kilise',
          'Market',
          'Metro',
          'Metrobüs',
          'Minibüs',
          'Müze',
          'Eczane',
          'Okul',
          'Orman',
          'Otoban',
          'Otobüs Durağı',
          'Park',
          'Plaj',
          'Polis',
          'Sağlık Ocağı',
          'Sahil',
          'Sinema',
          'Spor Salonu',
          'Tren/Tram İstasyonu',
          'Üniversite',
        ],
      },
    ],
  },
  {
    baslik: 'Güvenlik',
    alanlar: [
      {
        ad: 'guvenlikOzellikleri',
        tip: 'multiselect',
        secenekler: [
          '24 Saat Güvenlik',
          'Güvenlik Kamerası',
          'Güvenlik Personeli',
          'Yangın Algılama Sistemi',
          'Yangın Merdiveni',
          'Yangın Söndürme Sistemi',
          'Hırsız Alarmı',
          'Kartlı Giriş',
          'Kapıcı Dairesi',
          'Site İçi',
          'Video Diafon',
        ],
      },
    ],
  },
  {
    baslik: 'Cephe',
    alanlar: [
      {
        ad: 'cephe',
        tip: 'multiselect',
        secenekler: [
          'Kuzey',
          'Güney',
          'Doğu',
          'Batı',
          'Kuzey-Doğu',
          'Kuzey-Batı',
          'Güney-Doğu',
          'Güney-Batı',
          'Tüm Cepheler',
        ],
      },
    ],
  },
  {
    baslik: 'Manzara',
    alanlar: [
      {
        ad: 'manzara',
        tip: 'multiselect',
        secenekler: [
          'Deniz Manzarası',
          'Göl Manzarası',
          'Dağ Manzarası',
          'Orman Manzarası',
          'Şehir Manzarası',
          'Doğa Manzarası',
          'Havuz Manzarası',
          'Bahçe Manzarası',
          'Park Manzarası',
          'Boğaz Manzarası',
        ],
      },
    ],
  },
  {
    baslik: 'Tapu ve Yasal Durum',
    alanlar: [
      {
        ad: 'tapuDurumu',
        tip: 'select',
        secenekler: [
          'Kat Mülkiyetli',
          'Kat İrtifaklı',
          'Hisseli Tapu',
          'Müstakil Tapu',
          'Kooperatif',
          'Tapu Yok',
          'Tapu Alınacak',
        ],
      },
      { ad: 'tapiRanosu', tip: 'checkbox' },
      { ad: 'krediyeUygun', tip: 'checkbox' },
      { ad: 'takasaUygun', tip: 'checkbox' },
    ],
  },
]

// ==================== ARSA / TARLA / ARAZİ ====================
export const arsaOzellikleri: OzellikKategori[] = [
  {
    baslik: 'Arsa Bilgileri',
    alanlar: [
      { ad: 'metrekare', tip: 'number', birim: 'm²', zorunlu: true },
      { ad: 'adaNo', tip: 'text' },
      { ad: 'parselNo', tip: 'text' },
      { ad: 'paftaNo', tip: 'text' },
    ],
  },
  {
    baslik: 'İmar Durumu',
    alanlar: [
      {
        ad: 'imarDurumu',
        tip: 'select',
        secenekler: [
          'Konut İmarlı',
          'Ticari İmarlı',
          'Ticari + Konut İmarlı',
          'Tarla (İmarsız)',
          'Bağ-Bahçe',
          'Zeytinlik',
          'Mera',
          'Orman',
          'Sanayi İmarlı',
          'Turizm İmarlı',
          'Sit Alanı',
          'Özel Koruma',
          'Serbest',
          'Diğer',
        ],
        zorunlu: true,
      },
      {
        ad: 'emsal',
        tip: 'select',
        secenekler: [
          '0.10',
          '0.15',
          '0.20',
          '0.25',
          '0.30',
          '0.40',
          '0.50',
          '0.60',
          '0.70',
          '0.80',
          '0.90',
          '1.00',
          '1.20',
          '1.50',
          '2.00',
          '2.50',
          '3.00',
          'Serbest',
        ],
      },
      {
        ad: 'gabari',
        tip: 'select',
        secenekler: [
          '1 Kat',
          '2 Kat',
          '3 Kat',
          '4 Kat',
          '5 Kat',
          '6-10 Kat',
          '10+ Kat',
          'Yükseklik (m)',
          'Serbest',
        ],
      },
      { ad: 'taks', tip: 'number', birim: '%' },
      { ad: 'kaks', tip: 'number', birim: '%' },
    ],
  },
  {
    baslik: 'Altyapı',
    alanlar: [
      {
        ad: 'altyapi',
        tip: 'multiselect',
        secenekler: [
          'Elektrik',
          'Su',
          'Doğalgaz',
          'Kanalizasyon',
          'Yol',
          'Asfalt Yol',
          'Telefon/İnternet',
          'DSİ Suyu',
          'Derin Kuyu',
          'Artezyen',
        ],
      },
    ],
  },
  {
    baslik: 'Arsa Özellikleri',
    alanlar: [
      { ad: 'yolCephesi', tip: 'number', birim: 'm' },
      { ad: 'derinlik', tip: 'number', birim: 'm' },
      {
        ad: 'arsaTipi',
        tip: 'select',
        secenekler: [
          'Köşe Parsel',
          'Ara Parsel',
          'Çift Cephe',
          'Ada',
          'Kadastral Yol',
          'Sınır Parseli',
        ],
      },
      {
        ad: 'egim',
        tip: 'select',
        secenekler: ['Düz', 'Hafif Eğimli', 'Eğimli', 'Çok Eğimli', 'Dik', 'Yamaç'],
      },
      {
        ad: 'zemin',
        tip: 'select',
        secenekler: ['Kaya', 'Kum', 'Toprak', 'Taşlı', 'Verimli Toprak', 'Kayalık'],
      },
    ],
  },
  {
    baslik: 'Tarım Özellikleri (Tarla için)',
    alanlar: [
      {
        ad: 'tarimOzellikleri',
        tip: 'multiselect',
        secenekler: [
          'Sulama İmkanı',
          'Sera Yapılabilir',
          'Zeytin Ağacı Var',
          'Meyve Ağacı Var',
          'Narenciye Bahçesi',
          'Bağ',
          'Tarla Ürünü Yetiştirilebilir',
          'Hayvancılığa Uygun',
          'Organik Tarıma Uygun',
          'Traktör Girişi Var',
        ],
      },
    ],
  },
  {
    baslik: 'Konum Özellikleri',
    alanlar: [
      {
        ad: 'konumOzellikleri',
        tip: 'multiselect',
        secenekler: [
          'Denize Yakın',
          'Göle Yakın',
          'Dağ Manzarası',
          'Ana Yola Cepheli',
          'Köy İçi',
          'Köy Dışı',
          'Şehir Merkezine Yakın',
          'Ormanlık Alan',
          'Çevresi Yapılaşmış',
          'Tek Parsel',
        ],
      },
    ],
  },
  {
    baslik: 'Tapu Durumu',
    alanlar: [
      {
        ad: 'tapuDurumu',
        tip: 'select',
        secenekler: [
          'Müstakil Tapu',
          'Hisseli Tapu',
          'Kadastro Parseli',
          'Zilyetlik',
          'Kooperatif',
        ],
      },
      { ad: 'krediyeUygun', tip: 'checkbox' },
      { ad: 'takasaUygun', tip: 'checkbox' },
      { ad: 'vekaletliSatis', tip: 'checkbox' },
    ],
  },
]

// ==================== TİCARİ (Dükkan, Ofis, Mağaza, Depo, Fabrika) ====================
export const ticariOzellikleri: OzellikKategori[] = [
  {
    baslik: 'Temel Bilgiler',
    alanlar: [
      { ad: 'brutMetrekare', tip: 'number', birim: 'm²', zorunlu: true },
      { ad: 'netMetrekare', tip: 'number', birim: 'm²' },
      {
        ad: 'ticariTip',
        tip: 'select',
        secenekler: [
          'Dükkan',
          'Mağaza',
          'Ofis',
          'Büro',
          'Plaza Katı',
          'İş Merkezi',
          'Fabrika',
          'Atölye',
          'Depo',
          'Antrepo',
          'Showroom',
          'Oto Galeri',
          'Akaryakıt İstasyonu',
          'Otel',
          'Apart Otel',
          'Pansiyon',
          'Restaurant',
          'Cafe',
          'Fırın',
          'Pastane',
          'Kuaför',
          'Eczane',
          'Hastane/Klinik',
          'Okul/Kurs',
          'Spor Salonu',
          'Sinema/Tiyatro',
          'Düğün Salonu',
          'Çiftlik',
          'Sera',
          'Bağ Evi',
          'Müstakil İşyeri',
          'Diğer',
        ],
        zorunlu: true,
      },
      { ad: 'odaSayisi', tip: 'number' },
      { ad: 'wc', tip: 'number' },
      { ad: 'personelKapasitesi', tip: 'number' },
    ],
  },
  {
    baslik: 'Bina Bilgileri',
    alanlar: [
      { ad: 'bulunduguKat', tip: 'number' },
      { ad: 'katSayisi', tip: 'number' },
      { ad: 'binaYasi', tip: 'number', birim: 'Yıl' },
      { ad: 'cepheGenisligi', tip: 'number', birim: 'm' },
      { ad: 'tavanYuksekligi', tip: 'number', birim: 'm' },
      {
        ad: 'kullanimDurumu',
        tip: 'select',
        secenekler: [
          'Boş',
          'Kiracılı',
          'Faal Çalışıyor',
          'Tadilat Gerekli',
        ],
      },
    ],
  },
  {
    baslik: 'İç Özellikler',
    alanlar: [
      {
        ad: 'icOzellikler',
        tip: 'multiselect',
        secenekler: [
          'Asma Tavan',
          'Alçıpan Bölmeli',
          'Akıllı Kartlı Giriş',
          'Alarm Sistemi',
          'Bulaşık Makinesi',
          'Fiberoptik İnternet',
          'Görüntülü Diafon',
          'Isıcam',
          'Kablosuz İnternet',
          'Klima',
          'Mini Mutfak',
          'Mobilyalı',
          'Panjur',
          'Parke Zemin',
          'Seramik Zemin',
          'Sprinkler Sistemi',
          'Spot Aydınlatma',
          'Trifaze Elektrik',
          'Yangın Merdiveni',
          'Yangın Tüpü',
        ],
      },
    ],
  },
  {
    baslik: 'Dış ve Bina Özellikleri',
    alanlar: [
      {
        ad: 'disOzellikler',
        tip: 'multiselect',
        secenekler: [
          'Asansör',
          'Bahçe',
          'Garaj',
          'Jeneratör',
          'Kapalı Otopark',
          'Rampa',
          'Resepsiyon',
          'Toplantı Salonu',
          'Yük Asansörü',
          'Yemekhane',
          '7/24 Güvenlik',
          'Güvenlik Kamerası',
          'Vale Hizmeti',
          'Vinç',
        ],
      },
    ],
  },
  {
    baslik: 'Depo/Fabrika Özellikleri',
    alanlar: [
      {
        ad: 'depoOzellikleri',
        tip: 'multiselect',
        secenekler: [
          'Yükleme Rampası',
          'TIR Girişi',
          'Forklift Kapasiteli',
          'Soğuk Oda',
          'Yüksek Tavan',
          'Vinç',
          'Trifaze Elektrik',
          'Doğalgaz Hattı',
          'Sanayi Elektriği',
          'Yangın Sistemi',
          'Paletli Stok Alanı',
          'İstifleme Alanı',
        ],
      },
    ],
  },
  {
    baslik: 'Tapu ve Yasal',
    alanlar: [
      {
        ad: 'tapuDurumu',
        tip: 'select',
        secenekler: [
          'Kat Mülkiyetli',
          'Kat İrtifaklı',
          'Hisseli Tapu',
          'İşyeri Ruhsatlı',
        ],
      },
      { ad: 'isyeriRuhsati', tip: 'checkbox' },
      { ad: 'krediyeUygun', tip: 'checkbox' },
      { ad: 'takasaUygun', tip: 'checkbox' },
    ],
  },
]

// ==================== DEVREMÜLK / TATİL ====================
export const devreMulkOzellikleri: OzellikKategori[] = [
  {
    baslik: 'Temel Bilgiler',
    alanlar: [
      { ad: 'metrekare', tip: 'number', birim: 'm²', zorunlu: true },
      {
        ad: 'odaSayisi',
        tip: 'select',
        secenekler: ['1+0', '1+1', '2+1', '3+1', '4+1'],
      },
      { ad: 'banyoSayisi', tip: 'number' },
      { ad: 'kisiKapasitesi', tip: 'number' },
    ],
  },
  {
    baslik: 'Devremülk Bilgileri',
    alanlar: [
      { ad: 'haftaSayisi', tip: 'number', birim: 'hafta/yıl' },
      {
        ad: 'donem',
        tip: 'select',
        secenekler: [
          'Yüksek Sezon',
          'Orta Sezon',
          'Düşük Sezon',
          'Tüm Sezonlar',
          'Yazlık',
          'Kışlık',
        ],
      },
      {
        ad: 'kullanim',
        tip: 'select',
        secenekler: ['Yıllık', '2 Yılda 1', 'Dönemsel', 'Puan Bazlı'],
      },
    ],
  },
  {
    baslik: 'Tesis Özellikleri',
    alanlar: [
      {
        ad: 'tesisOzellikleri',
        tip: 'multiselect',
        secenekler: [
          'Açık Havuz',
          'Kapalı Havuz',
          'Çocuk Havuzu',
          'Aqua Park',
          'Plaj',
          'Özel Plaj',
          'SPA',
          'Hamam',
          'Sauna',
          'Fitness',
          'Tenis Kortu',
          'Basketbol Sahası',
          'Mini Golf',
          'Animasyon',
          'Çocuk Kulübü',
          'Restaurant',
          'Bar',
          'Market',
          'Kuaför',
          'Doktor',
          'WiFi',
          'Otopark',
          '24 Saat Güvenlik',
          'Transfer Hizmeti',
        ],
      },
    ],
  },
]

// Emlak tipine göre özellikleri getir
export function getOzelliklerByTip(
  tip: string
): OzellikKategori[] {
  switch (tip) {
    case 'daire':
    case 'villa':
    case 'mustakil':
    case 'residans':
    case 'kooperatif':
      return konutOzellikleri

    case 'arsa':
    case 'tarla':
    case 'arazi':
    case 'bag':
    case 'bahce':
      return arsaOzellikleri

    case 'ticari':
    case 'dukkan':
    case 'ofis':
    case 'magaza':
    case 'depo':
    case 'fabrika':
    case 'atolye':
      return ticariOzellikleri

    case 'devremulk':
    case 'yazlik':
      return devreMulkOzellikleri

    default:
      return konutOzellikleri
  }
}

// Emlak tipleri listesi
export const emlakTipleri = {
  konut: [
    { value: 'daire', label: 'Daire' },
    { value: 'residans', label: 'Rezidans' },
    { value: 'villa', label: 'Villa' },
    { value: 'mustakil', label: 'Müstakil Ev' },
    { value: 'ciftlikevi', label: 'Çiftlik Evi' },
    { value: 'yazlik', label: 'Yazlık' },
    { value: 'kooperatif', label: 'Kooperatif' },
    { value: 'prefabrik', label: 'Prefabrik' },
    { value: 'devremulk', label: 'Devremülk' },
  ],
  arsa: [
    { value: 'arsa', label: 'Konut İmarlı Arsa' },
    { value: 'arsaticari', label: 'Ticari İmarlı Arsa' },
    { value: 'tarla', label: 'Tarla' },
    { value: 'arazi', label: 'Arazi' },
    { value: 'bag', label: 'Bağ' },
    { value: 'bahce', label: 'Bahçe' },
    { value: 'zeytinlik', label: 'Zeytinlik' },
  ],
  ticari: [
    { value: 'dukkan', label: 'Dükkan / Mağaza' },
    { value: 'ofis', label: 'Ofis' },
    { value: 'plazakati', label: 'Plaza Katı' },
    { value: 'ishanibinasi', label: 'İşhanı / İş Merkezi' },
    { value: 'fabrika', label: 'Fabrika' },
    { value: 'atolye', label: 'Atölye / İmalathane' },
    { value: 'depo', label: 'Depo / Antrepo' },
    { value: 'diger', label: 'Diğer İşyeri' },
  ],
  turistik: [
    { value: 'otel', label: 'Otel' },
    { value: 'aparthotel', label: 'Apart Otel' },
    { value: 'pansiyon', label: 'Pansiyon' },
    { value: 'tatilkoyu', label: 'Tatil Köyü' },
  ],
}

// Tüm emlak tiplerini düz liste olarak al
export function getAllEmlakTipleri(): { value: string; label: string; kategori: string }[] {
  const tumTipler: { value: string; label: string; kategori: string }[] = []

  Object.entries(emlakTipleri).forEach(([kategori, tipler]) => {
    tipler.forEach((tip) => {
      tumTipler.push({ ...tip, kategori })
    })
  })

  return tumTipler
}
