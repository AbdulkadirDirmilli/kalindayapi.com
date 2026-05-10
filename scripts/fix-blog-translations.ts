import { prisma } from '../lib/prisma';

async function fixBlogTranslations() {
  console.log('Fixing corrupted blog translations...');

  // Find all translations with "undefined" in baslik
  const corruptedTranslations = await prisma.blogPostTranslation.findMany({
    where: {
      baslik: { contains: 'undefined' }
    },
    include: { post: true }
  });

  console.log(`Found ${corruptedTranslations.length} corrupted translations`);

  for (const t of corruptedTranslations) {
    console.log(`\n[${t.language}] ${t.baslik.substring(0, 50)}...`);

    // Get the Turkish translation to use as reference
    const trTranslation = await prisma.blogPostTranslation.findFirst({
      where: { postId: t.postId, language: 'tr' }
    });

    if (!trTranslation) {
      console.log('  No Turkish translation found, skipping...');
      continue;
    }

    // Extract location name from Turkish title (first word usually)
    const locationMatch = trTranslation.baslik.match(/^(\w+)/);
    const location = locationMatch ? locationMatch[1] : 'Ortaca';

    let newBaslik = t.baslik;
    let newSlug = t.slug;

    // Fix the title based on language
    if (t.language === 'de') {
      newBaslik = t.baslik.replace('undefined', location);
      // Create a proper German title
      if (newBaslik.includes('Emlak Rehberi')) {
        newBaslik = `${location} Immobilien-Guide 2026: Hauspreise und Investitionsanalyse nach Stadtteilen`;
      }
      newSlug = `${location.toLowerCase()}-immobilien-guide-2026`;
    } else if (t.language === 'ru') {
      newBaslik = t.baslik.replace('undefined', location);
      // Create a proper Russian title
      if (newBaslik.includes('Emlak Rehberi')) {
        newBaslik = `Гид по недвижимости ${location} 2026: цены на жилье и инвестиционный анализ по районам`;
      }
      newSlug = `${location.toLowerCase()}-gid-po-nedvizhimosti-2026`;
    } else {
      // For other languages, just replace undefined with location
      newBaslik = t.baslik.replace('undefined', location);
      newSlug = t.slug.replace('undefined', location.toLowerCase());
    }

    // Update the translation
    await prisma.blogPostTranslation.update({
      where: { id: t.id },
      data: {
        baslik: newBaslik,
        slug: newSlug
      }
    });

    console.log(`  Fixed to: ${newBaslik.substring(0, 50)}...`);
    console.log(`  New slug: ${newSlug}`);
  }

  console.log('\nDone!');
  await prisma.$disconnect();
}

fixBlogTranslations().catch(console.error);
