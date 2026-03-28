-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "lastLogin" DATETIME
);

-- CreateTable
CREATE TABLE "Ilan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "fiyat" INTEGER NOT NULL,
    "paraBirimi" TEXT NOT NULL DEFAULT 'TL',
    "il" TEXT NOT NULL,
    "ilce" TEXT NOT NULL,
    "mahalle" TEXT,
    "koordinatLat" REAL,
    "koordinatLng" REAL,
    "metrekare" INTEGER,
    "odaSayisi" TEXT,
    "banyoSayisi" INTEGER,
    "kat" INTEGER,
    "toplamKat" INTEGER,
    "binaYasi" INTEGER,
    "isitma" TEXT,
    "esyali" BOOLEAN NOT NULL DEFAULT false,
    "balkon" BOOLEAN NOT NULL DEFAULT false,
    "asansor" BOOLEAN NOT NULL DEFAULT false,
    "otopark" BOOLEAN NOT NULL DEFAULT false,
    "guvenlik" BOOLEAN NOT NULL DEFAULT false,
    "havuz" BOOLEAN NOT NULL DEFAULT false,
    "bahce" BOOLEAN NOT NULL DEFAULT false,
    "bahceMetrekare" INTEGER,
    "imarDurumu" TEXT,
    "gabari" TEXT,
    "yolCephesi" INTEGER,
    "altyapi" BOOLEAN NOT NULL DEFAULT false,
    "aciklama" TEXT NOT NULL,
    "oneCikan" BOOLEAN NOT NULL DEFAULT false,
    "durum" TEXT NOT NULL DEFAULT 'aktif',
    "ilanNo" TEXT,
    "yayinTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellenmeTarihi" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "IlanFoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ilanId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IlanFoto_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "Ilan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hizmet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "baslik" TEXT NOT NULL,
    "kisaAciklama" TEXT NOT NULL,
    "uzunAciklama" TEXT NOT NULL,
    "ikon" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AltHizmet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hizmetId" TEXT NOT NULL,
    "baslik" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "ikon" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AltHizmet_hizmetId_fkey" FOREIGN KEY ("hizmetId") REFERENCES "Hizmet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HizmetSSS" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hizmetId" TEXT NOT NULL,
    "soru" TEXT NOT NULL,
    "cevap" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HizmetSSS_hizmetId_fkey" FOREIGN KEY ("hizmetId") REFERENCES "Hizmet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HizmetBolge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hizmetId" TEXT NOT NULL,
    "bolge" TEXT NOT NULL,
    CONSTRAINT "HizmetBolge_hizmetId_fkey" FOREIGN KEY ("hizmetId") REFERENCES "Hizmet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactForm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ad" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefon" TEXT,
    "konu" TEXT,
    "mesaj" TEXT NOT NULL,
    "durum" TEXT NOT NULL DEFAULT 'yeni',
    "notlar" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "kategori" TEXT,
    "altText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Ortak" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "ad" TEXT NOT NULL,
    "unvan" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT,
    "biyografi" TEXT,
    "foto" TEXT,
    "uzmanlikAlanlari" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ilan_slug_key" ON "Ilan"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Ilan_ilanNo_key" ON "Ilan"("ilanNo");

-- CreateIndex
CREATE UNIQUE INDEX "Hizmet_slug_key" ON "Hizmet"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "HizmetBolge_hizmetId_bolge_key" ON "HizmetBolge"("hizmetId", "bolge");

-- CreateIndex
CREATE UNIQUE INDEX "Ortak_slug_key" ON "Ortak"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");
