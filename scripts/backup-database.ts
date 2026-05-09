/**
 * VERİTABANI YEDEKLEME SCRİPTİ
 *
 * Bu script tüm ilanları, fotoğrafları, çevirileri ve ilişkili verileri
 * güvenli bir şekilde JSON formatında yedekler.
 *
 * Kullanım:
 * npx tsx scripts/backup-database.ts
 *
 * Çıktı: backups/backup-YYYY-MM-DD-HH-mm-ss.json
 */

import { prisma } from '../lib/prisma';
import * as fs from 'fs';
import * as path from 'path';

interface BackupData {
  backupDate: string;
  backupVersion: string;
  statistics: {
    ilanlar: number;
    ilanFotograflari: number;
    ilanCevirileri: number;
    blogYazilari: number;
    blogCevirileri: number;
    hizmetler: number;
    hizmetCevirileri: number;
    ortaklar: number;
    leadler: number;
  };
  data: {
    ilanlar: any[];
    blogPosts: any[];
    hizmetler: any[];
    ortaklar: any[];
    leads: any[];
  };
}

async function backupDatabase(): Promise<void> {
  console.log('🔄 Veritabanı yedekleme başlatılıyor...\n');

  try {
    // 1. İlanlar ve ilişkili veriler
    console.log('📦 İlanlar yedekleniyor...');
    const ilanlar = await prisma.ilan.findMany({
      include: {
        fotograflar: {
          orderBy: { sira: 'asc' },
        },
        translations: true,
        danisman: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    console.log(`   ✅ ${ilanlar.length} ilan bulundu`);

    // 2. Blog yazıları ve çevirileri
    console.log('📦 Blog yazıları yedekleniyor...');
    const blogPosts = await prisma.blogPost.findMany({
      include: {
        translations: true,
      },
      orderBy: { yayinTarihi: 'desc' },
    });
    console.log(`   ✅ ${blogPosts.length} blog yazısı bulundu`);

    // 3. Hizmetler ve ilişkili veriler
    console.log('📦 Hizmetler yedekleniyor...');
    const hizmetler = await prisma.hizmet.findMany({
      include: {
        translations: true,
        altHizmetler: true,
        bolgeler: true,
        sss: true,
      },
      orderBy: { sira: 'asc' },
    });
    console.log(`   ✅ ${hizmetler.length} hizmet bulundu`);

    // 4. Ortaklar (Danışmanlar)
    console.log('📦 Ortaklar yedekleniyor...');
    const ortaklar = await prisma.ortak.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`   ✅ ${ortaklar.length} ortak bulundu`);

    // 5. Leads (Müşteri talepleri)
    console.log('📦 Leads yedekleniyor...');
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log(`   ✅ ${leads.length} lead bulundu`);

    // İstatistikler
    const ilanFotoCount = ilanlar.reduce((acc, ilan) => acc + ilan.fotograflar.length, 0);
    const ilanTransCount = ilanlar.reduce((acc, ilan) => acc + ilan.translations.length, 0);
    const blogTransCount = blogPosts.reduce((acc, post) => acc + post.translations.length, 0);
    const hizmetTransCount = hizmetler.reduce((acc, h) => acc + h.translations.length, 0);

    // Backup objesi oluştur
    const backup: BackupData = {
      backupDate: new Date().toISOString(),
      backupVersion: '1.0.0',
      statistics: {
        ilanlar: ilanlar.length,
        ilanFotograflari: ilanFotoCount,
        ilanCevirileri: ilanTransCount,
        blogYazilari: blogPosts.length,
        blogCevirileri: blogTransCount,
        hizmetler: hizmetler.length,
        hizmetCevirileri: hizmetTransCount,
        ortaklar: ortaklar.length,
        leadler: leads.length,
      },
      data: {
        ilanlar,
        blogPosts,
        hizmetler,
        ortaklar,
        leads,
      },
    };

    // Backups klasörü oluştur
    const backupsDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
    }

    // Dosya adı oluştur
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const filename = `backup-${timestamp}.json`;
    const filepath = path.join(backupsDir, filename);

    // JSON olarak kaydet
    fs.writeFileSync(filepath, JSON.stringify(backup, null, 2), 'utf-8');

    // Özet göster
    console.log('\n' + '═'.repeat(60));
    console.log('✅ YEDEKLEME TAMAMLANDI');
    console.log('═'.repeat(60));
    console.log(`📁 Dosya: ${filepath}`);
    console.log(`📊 Boyut: ${(fs.statSync(filepath).size / 1024 / 1024).toFixed(2)} MB`);
    console.log('\n📈 İSTATİSTİKLER:');
    console.log(`   • İlanlar: ${backup.statistics.ilanlar}`);
    console.log(`   • İlan Fotoğrafları: ${backup.statistics.ilanFotograflari}`);
    console.log(`   • İlan Çevirileri: ${backup.statistics.ilanCevirileri}`);
    console.log(`   • Blog Yazıları: ${backup.statistics.blogYazilari}`);
    console.log(`   • Blog Çevirileri: ${backup.statistics.blogCevirileri}`);
    console.log(`   • Hizmetler: ${backup.statistics.hizmetler}`);
    console.log(`   • Ortaklar: ${backup.statistics.ortaklar}`);
    console.log(`   • Leads: ${backup.statistics.leadler}`);
    console.log('═'.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ YEDEKLEME HATASI:', error);
    process.exit(1);
  }
}

backupDatabase();
