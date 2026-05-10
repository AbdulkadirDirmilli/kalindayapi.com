-- CreateTable
CREATE TABLE "IlanView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ilanId" TEXT NOT NULL,
    "visitorId" TEXT NOT NULL,
    "viewedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "IlanView_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "Ilan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OncesiSonrasi" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "baslik" TEXT NOT NULL,
    "kategori" TEXT,
    "konum" TEXT,
    "oncesiFoto" TEXT NOT NULL,
    "sonrasiFoto" TEXT NOT NULL,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "listingTitle" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SmsGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SmsContact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "note" TEXT,
    "groupId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SmsContact_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "SmsGroup" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SmsTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SmsLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "recipients" TEXT NOT NULL,
    "totalSent" INTEGER NOT NULL,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "errorMessage" TEXT,
    "netgsmJobId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SmsSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "netgsmUsername" TEXT NOT NULL,
    "netgsmPassword" TEXT NOT NULL,
    "netgsmHeader" TEXT NOT NULL,
    "senderNames" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL,
    "direction" TEXT NOT NULL DEFAULT 'ltr',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "sira" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "IlanTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ilanId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'tr',
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aciklama" TEXT NOT NULL,
    "kategori" TEXT,
    "tip" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "translatedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "IlanTranslation_ilanId_fkey" FOREIGN KEY ("ilanId") REFERENCES "Ilan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HizmetTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hizmetId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'tr',
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kisaAciklama" TEXT NOT NULL,
    "uzunAciklama" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HizmetTranslation_hizmetId_fkey" FOREIGN KEY ("hizmetId") REFERENCES "Hizmet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalSlug" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "yazar" TEXT NOT NULL,
    "kapakGorsel" TEXT,
    "yayinTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellenmeTarihi" DATETIME NOT NULL,
    "aktif" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "BlogPostTranslation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'tr',
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ozet" TEXT NOT NULL,
    "icerik" TEXT NOT NULL,
    "etiketler" TEXT NOT NULL,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "BlogPostTranslation_postId_fkey" FOREIGN KEY ("postId") REFERENCES "BlogPost" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SiteVisit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "visitorHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "path" TEXT,
    "referrer" TEXT,
    "country" TEXT,
    "visitedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "totalVisits" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ilan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "baslik" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "kategori" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "altTip" TEXT,
    "fiyat" INTEGER NOT NULL,
    "paraBirimi" TEXT NOT NULL DEFAULT 'TL',
    "il" TEXT NOT NULL,
    "ilce" TEXT NOT NULL,
    "mahalle" TEXT,
    "koordinatLat" REAL,
    "koordinatLng" REAL,
    "brutMetrekare" INTEGER,
    "netMetrekare" INTEGER,
    "metrekare" INTEGER,
    "odaSayisi" TEXT,
    "banyoSayisi" INTEGER,
    "tuvaletSayisi" INTEGER,
    "balkonSayisi" INTEGER,
    "kat" INTEGER,
    "toplamKat" INTEGER,
    "binaYasi" INTEGER,
    "binaTipi" TEXT,
    "kullanimDurumu" TEXT,
    "insaatDurumu" TEXT,
    "isitma" TEXT,
    "yakitTipi" TEXT,
    "enerjiSinifi" TEXT,
    "esyali" BOOLEAN NOT NULL DEFAULT false,
    "balkon" BOOLEAN NOT NULL DEFAULT false,
    "asansor" BOOLEAN NOT NULL DEFAULT false,
    "otopark" BOOLEAN NOT NULL DEFAULT false,
    "guvenlik" BOOLEAN NOT NULL DEFAULT false,
    "havuz" BOOLEAN NOT NULL DEFAULT false,
    "bahce" BOOLEAN NOT NULL DEFAULT false,
    "bahceMetrekare" INTEGER,
    "icOzellikler" TEXT,
    "disOzellikler" TEXT,
    "muhitOzellikleri" TEXT,
    "guvenlikOzellikleri" TEXT,
    "cephe" TEXT,
    "manzara" TEXT,
    "imarDurumu" TEXT,
    "emsal" TEXT,
    "gabari" TEXT,
    "taks" REAL,
    "kaks" REAL,
    "yolCephesi" INTEGER,
    "derinlik" INTEGER,
    "arsaTipi" TEXT,
    "egim" TEXT,
    "zemin" TEXT,
    "altyapi" BOOLEAN NOT NULL DEFAULT false,
    "altyapiDetay" TEXT,
    "tarimOzellikleri" TEXT,
    "adaNo" TEXT,
    "parselNo" TEXT,
    "paftaNo" TEXT,
    "ticariTip" TEXT,
    "cepheGenisligi" INTEGER,
    "tavanYuksekligi" REAL,
    "personelKapasitesi" INTEGER,
    "depoOzellikleri" TEXT,
    "tapuDurumu" TEXT,
    "krediyeUygun" BOOLEAN NOT NULL DEFAULT false,
    "takasaUygun" BOOLEAN NOT NULL DEFAULT false,
    "isyeriRuhsati" BOOLEAN NOT NULL DEFAULT false,
    "eidsStatus" TEXT NOT NULL DEFAULT 'pending',
    "videoUrl" TEXT,
    "danismanId" TEXT,
    "aciklama" TEXT NOT NULL,
    "oneCikan" BOOLEAN NOT NULL DEFAULT false,
    "durum" TEXT NOT NULL DEFAULT 'aktif',
    "ilanNo" TEXT,
    "yayinTarihi" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "guncellenmeTarihi" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Ilan_danismanId_fkey" FOREIGN KEY ("danismanId") REFERENCES "Ortak" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Ilan" ("aciklama", "altyapi", "asansor", "bahce", "bahceMetrekare", "balkon", "banyoSayisi", "baslik", "binaYasi", "createdAt", "durum", "esyali", "fiyat", "gabari", "guncellenmeTarihi", "guvenlik", "havuz", "id", "il", "ilanNo", "ilce", "imarDurumu", "isitma", "kat", "kategori", "koordinatLat", "koordinatLng", "mahalle", "metrekare", "odaSayisi", "oneCikan", "otopark", "paraBirimi", "slug", "tip", "toplamKat", "yayinTarihi", "yolCephesi") SELECT "aciklama", "altyapi", "asansor", "bahce", "bahceMetrekare", "balkon", "banyoSayisi", "baslik", "binaYasi", "createdAt", "durum", "esyali", "fiyat", "gabari", "guncellenmeTarihi", "guvenlik", "havuz", "id", "il", "ilanNo", "ilce", "imarDurumu", "isitma", "kat", "kategori", "koordinatLat", "koordinatLng", "mahalle", "metrekare", "odaSayisi", "oneCikan", "otopark", "paraBirimi", "slug", "tip", "toplamKat", "yayinTarihi", "yolCephesi" FROM "Ilan";
DROP TABLE "Ilan";
ALTER TABLE "new_Ilan" RENAME TO "Ilan";
CREATE UNIQUE INDEX "Ilan_slug_key" ON "Ilan"("slug");
CREATE UNIQUE INDEX "Ilan_ilanNo_key" ON "Ilan"("ilanNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "IlanView_ilanId_idx" ON "IlanView"("ilanId");

-- CreateIndex
CREATE UNIQUE INDEX "IlanView_ilanId_visitorId_key" ON "IlanView"("ilanId", "visitorId");

-- CreateIndex
CREATE INDEX "Lead_listingId_idx" ON "Lead"("listingId");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lead_phone_listingId_key" ON "Lead"("phone", "listingId");

-- CreateIndex
CREATE UNIQUE INDEX "SmsGroup_name_key" ON "SmsGroup"("name");

-- CreateIndex
CREATE INDEX "SmsContact_phone_idx" ON "SmsContact"("phone");

-- CreateIndex
CREATE INDEX "SmsContact_groupId_idx" ON "SmsContact"("groupId");

-- CreateIndex
CREATE INDEX "SmsLog_createdAt_idx" ON "SmsLog"("createdAt");

-- CreateIndex
CREATE INDEX "SmsLog_status_idx" ON "SmsLog"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE INDEX "IlanTranslation_language_idx" ON "IlanTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "IlanTranslation_ilanId_language_key" ON "IlanTranslation"("ilanId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "IlanTranslation_slug_language_key" ON "IlanTranslation"("slug", "language");

-- CreateIndex
CREATE INDEX "HizmetTranslation_language_idx" ON "HizmetTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "HizmetTranslation_hizmetId_language_key" ON "HizmetTranslation"("hizmetId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "HizmetTranslation_slug_language_key" ON "HizmetTranslation"("slug", "language");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_originalSlug_key" ON "BlogPost"("originalSlug");

-- CreateIndex
CREATE INDEX "BlogPostTranslation_language_idx" ON "BlogPostTranslation"("language");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostTranslation_postId_language_key" ON "BlogPostTranslation"("postId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPostTranslation_slug_language_key" ON "BlogPostTranslation"("slug", "language");

-- CreateIndex
CREATE INDEX "SiteVisit_visitedAt_idx" ON "SiteVisit"("visitedAt");

-- CreateIndex
CREATE INDEX "SiteVisit_visitorHash_visitedAt_idx" ON "SiteVisit"("visitorHash", "visitedAt");

-- CreateIndex
CREATE UNIQUE INDEX "SiteStats_date_key" ON "SiteStats"("date");

-- CreateIndex
CREATE INDEX "SiteStats_date_idx" ON "SiteStats"("date");

-- CreateIndex
CREATE INDEX "IlanFoto_ilanId_idx" ON "IlanFoto"("ilanId");
