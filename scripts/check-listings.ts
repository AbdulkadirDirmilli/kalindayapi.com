import { PrismaClient } from '../lib/generated/prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({ url: 'file:./prisma/dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Tüm ilanları al (filtre yok)
  const ilanlar = await prisma.ilan.findMany({
    select: { id: true, baslik: true, durum: true },
  });

  console.log(`Toplam ${ilanlar.length} ilan:`);
  ilanlar.forEach(ilan => {
    console.log(`- [${ilan.durum}] ${ilan.baslik.substring(0, 50)}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
