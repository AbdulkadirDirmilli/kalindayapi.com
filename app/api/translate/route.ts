import { NextRequest, NextResponse } from 'next/server';
import { translateContent, generateSlug } from '@/lib/services/translation';
import { locales, type Locale } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';

// Rate limiting - Google Translate için daha düşük limit
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute (Google Translate için uygun)
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { type, id, targetLocale, content } = body;

    // Validate target locale
    if (!targetLocale || !locales.includes(targetLocale as Locale)) {
      return NextResponse.json(
        { error: 'Invalid target locale. Supported: tr, en, ar, de, ru' },
        { status: 400 }
      );
    }

    // Skip Turkish as source language
    if (targetLocale === 'tr') {
      return NextResponse.json(
        { error: 'Turkish is the source language, no translation needed.' },
        { status: 400 }
      );
    }

    // Handle different content types
    if (type === 'listing' && id) {
      // Translate a listing
      const ilan = await prisma.ilan.findUnique({
        where: { id },
        select: { baslik: true, aciklama: true, slug: true },
      });

      if (!ilan) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }

      const result = await translateContent(
        {
          title: ilan.baslik,
          description: ilan.aciklama,
        },
        {
          targetLocale: targetLocale as Locale,
          contentType: 'listing',
        }
      );

      if (!result) {
        return NextResponse.json(
          { error: 'Translation failed. Please try again.' },
          { status: 500 }
        );
      }

      // Generate slug if not provided
      if (!result.slug) {
        result.slug = generateSlug(result.title, targetLocale as Locale);
      }

      // Save to database
      await prisma.ilanTranslation.upsert({
        where: {
          ilanId_language: {
            ilanId: id,
            language: targetLocale,
          },
        },
        update: {
          baslik: result.title,
          slug: result.slug,
          aciklama: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'pending',
          translatedBy: 'ai',
          updatedAt: new Date(),
        },
        create: {
          ilanId: id,
          language: targetLocale,
          baslik: result.title,
          slug: result.slug,
          aciklama: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'pending',
          translatedBy: 'ai',
        },
      });

      return NextResponse.json({
        success: true,
        data: result,
        message: `Listing translated to ${targetLocale}`,
      });
    }

    if (type === 'service' && id) {
      // Translate a service
      const hizmet = await prisma.hizmet.findUnique({
        where: { id },
        select: { baslik: true, kisaAciklama: true, uzunAciklama: true, slug: true },
      });

      if (!hizmet) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
      }

      const result = await translateContent(
        {
          title: hizmet.baslik,
          description: hizmet.kisaAciklama,
          content: hizmet.uzunAciklama,
        },
        {
          targetLocale: targetLocale as Locale,
          contentType: 'service',
        }
      );

      if (!result) {
        return NextResponse.json(
          { error: 'Translation failed. Please try again.' },
          { status: 500 }
        );
      }

      if (!result.slug) {
        result.slug = generateSlug(result.title, targetLocale as Locale);
      }

      // Save to database
      await prisma.hizmetTranslation.upsert({
        where: {
          hizmetId_language: {
            hizmetId: id,
            language: targetLocale,
          },
        },
        update: {
          baslik: result.title,
          slug: result.slug,
          kisaAciklama: result.description,
          uzunAciklama: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'pending',
          updatedAt: new Date(),
        },
        create: {
          hizmetId: id,
          language: targetLocale,
          baslik: result.title,
          slug: result.slug,
          kisaAciklama: result.description,
          uzunAciklama: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'pending',
        },
      });

      return NextResponse.json({
        success: true,
        data: result,
        message: `Service translated to ${targetLocale}`,
      });
    }

    if (type === 'blog' && id) {
      // Translate a blog post
      const blog = await prisma.blogPost.findUnique({
        where: { id },
        select: { baslik: true, ozet: true, icerik: true, etiketler: true },
      });

      if (!blog) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
      }

      const result = await translateContent(
        {
          title: blog.baslik,
          description: blog.ozet,
          content: blog.icerik,
        },
        {
          targetLocale: targetLocale as Locale,
          contentType: 'blog',
        }
      );

      if (!result) {
        return NextResponse.json(
          { error: 'Translation failed. Please try again.' },
          { status: 500 }
        );
      }

      if (!result.slug) {
        result.slug = generateSlug(result.title, targetLocale as Locale);
      }

      // Save to database
      await prisma.blogPostTranslation.upsert({
        where: {
          postId_language: {
            postId: id,
            language: targetLocale,
          },
        },
        update: {
          baslik: result.title,
          slug: result.slug,
          ozet: result.description,
          icerik: result.content,
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'published',
          updatedAt: new Date(),
        },
        create: {
          postId: id,
          language: targetLocale,
          baslik: result.title,
          slug: result.slug,
          ozet: result.description,
          icerik: result.content,
          etiketler: blog.etiketler || '[]',
          seoTitle: result.seoTitle,
          seoDescription: result.seoDescription,
          status: 'published',
        },
      });

      return NextResponse.json({
        success: true,
        data: result,
        message: `Blog post translated to ${targetLocale}`,
      });
    }

    if (type === 'custom' && content) {
      // Translate custom content
      const result = await translateContent(
        {
          title: content.title || '',
          description: content.description || '',
          content: content.content,
        },
        {
          targetLocale: targetLocale as Locale,
          contentType: content.contentType || 'static',
        }
      );

      if (!result) {
        return NextResponse.json(
          { error: 'Translation failed. Please try again.' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        data: result,
      });
    }

    return NextResponse.json(
      { error: 'Invalid request. Provide type (listing, service, custom) and required data.' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check translation status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const language = searchParams.get('language');

  if (!type || !id) {
    return NextResponse.json(
      { error: 'Missing required parameters: type, id' },
      { status: 400 }
    );
  }

  try {
    if (type === 'listing') {
      const translations = await prisma.ilanTranslation.findMany({
        where: language ? { ilanId: id, language } : { ilanId: id },
        select: {
          language: true,
          baslik: true,
          slug: true,
          status: true,
          translatedBy: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({ translations });
    }

    if (type === 'service') {
      const translations = await prisma.hizmetTranslation.findMany({
        where: language ? { hizmetId: id, language } : { hizmetId: id },
        select: {
          language: true,
          baslik: true,
          slug: true,
          status: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({ translations });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Get translations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
