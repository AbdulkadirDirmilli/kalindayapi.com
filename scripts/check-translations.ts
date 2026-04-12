import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  const translations = await prisma.ilanTranslation.findMany({
    select: {
      language: true,
      baslik: true,
      slug: true,
      status: true,
    },
    orderBy: [{ language: 'asc' }],
  });

  console.log(`\n📋 Toplam ${translations.length} çeviri kaydı:\n`);

  const grouped = {
    en: translations.filter(t => t.language === 'en'),
    ar: translations.filter(t => t.language === 'ar'),
  };

  console.log('🇬🇧 İNGİLİZCE ÇEVİRİLER:');
  grouped.en.forEach(t => {
    console.log(`  ✓ ${t.baslik.substring(0, 60)}`);
  });

  console.log('\n🇸🇦 ARAPÇA ÇEVİRİLER:');
  grouped.ar.forEach(t => {
    console.log(`  ✓ ${t.baslik.substring(0, 60)}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
