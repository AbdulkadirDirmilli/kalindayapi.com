import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { translateIlan, createSlug } from "@/lib/services/translate";

type TargetLang = 'EN' | 'AR' | 'DE' | 'RU';

interface TranslateRequestBody {
  targetLang: TargetLang;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: TranslateRequestBody = await request.json();
    const { targetLang } = body;

    // Geçerli dil kontrolü
    if (!['EN', 'AR', 'DE', 'RU'].includes(targetLang)) {
      return NextResponse.json(
        { error: 'Geçersiz hedef dil. EN, AR, DE veya RU olmalı.' },
        { status: 400 }
      );
    }

    // İlanı getir
    const ilan = await prisma.ilan.findUnique({
      where: { id },
      select: {
        id: true,
        baslik: true,
        slug: true,
        aciklama: true,
        kategori: true,
        tip: true,
      },
    });

    if (!ilan) {
      return NextResponse.json(
        { error: 'İlan bulunamadı' },
        { status: 404 }
      );
    }

    // Çeviri yap
    const langCode = targetLang.toLowerCase() as 'en' | 'ar' | 'de' | 'ru';
    const translated = await translateIlan(
      {
        baslik: ilan.baslik,
        aciklama: ilan.aciklama,
        kategori: ilan.kategori,
        tip: ilan.tip,
      },
      targetLang
    );

    // Benzersiz slug oluştur
    let translatedSlug = createSlug(translated.baslik);

    // Slug benzersizliği kontrolü
    const existingSlug = await prisma.ilanTranslation.findFirst({
      where: {
        slug: translatedSlug,
        language: langCode,
        NOT: { ilanId: ilan.id },
      },
    });

    if (existingSlug) {
      translatedSlug = `${translatedSlug}-${Date.now()}`;
    }

    // Çeviriyi kaydet veya güncelle
    const translation = await prisma.ilanTranslation.upsert({
      where: {
        ilanId_language: {
          ilanId: ilan.id,
          language: langCode,
        },
      },
      create: {
        ilanId: ilan.id,
        language: langCode,
        baslik: translated.baslik,
        slug: translatedSlug,
        aciklama: translated.aciklama,
        kategori: translated.kategori,
        tip: translated.tip,
        status: 'published',
        translatedBy: 'Google Translate',
      },
      update: {
        baslik: translated.baslik,
        slug: translatedSlug,
        aciklama: translated.aciklama,
        kategori: translated.kategori,
        tip: translated.tip,
        status: 'published',
        translatedBy: 'Google Translate',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      translation: {
        id: translation.id,
        language: translation.language,
        baslik: translation.baslik,
        slug: translation.slug,
        status: translation.status,
      },
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Çeviri işlemi başarısız' },
      { status: 500 }
    );
  }
}

// Tüm dillere çevir
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // İlanı getir
    const ilan = await prisma.ilan.findUnique({
      where: { id },
      select: {
        id: true,
        baslik: true,
        slug: true,
        aciklama: true,
        kategori: true,
        tip: true,
      },
    });

    if (!ilan) {
      return NextResponse.json(
        { error: 'İlan bulunamadı' },
        { status: 404 }
      );
    }

    const results = [];
    const targetLangs: TargetLang[] = ['EN', 'AR', 'DE', 'RU'];

    for (const targetLang of targetLangs) {
      try {
        const langCode = targetLang.toLowerCase() as 'en' | 'ar' | 'de' | 'ru';
        const translated = await translateIlan(
          {
            baslik: ilan.baslik,
            aciklama: ilan.aciklama,
            kategori: ilan.kategori,
            tip: ilan.tip,
          },
          targetLang
        );

        let translatedSlug = createSlug(translated.baslik);

        // Slug benzersizliği kontrolü
        const existingSlug = await prisma.ilanTranslation.findFirst({
          where: {
            slug: translatedSlug,
            language: langCode,
            NOT: { ilanId: ilan.id },
          },
        });

        if (existingSlug) {
          translatedSlug = `${translatedSlug}-${Date.now()}`;
        }

        const translation = await prisma.ilanTranslation.upsert({
          where: {
            ilanId_language: {
              ilanId: ilan.id,
              language: langCode,
            },
          },
          create: {
            ilanId: ilan.id,
            language: langCode,
            baslik: translated.baslik,
            slug: translatedSlug,
            aciklama: translated.aciklama,
            kategori: translated.kategori,
            tip: translated.tip,
            status: 'published',
            translatedBy: 'Google Translate',
          },
          update: {
            baslik: translated.baslik,
            slug: translatedSlug,
            aciklama: translated.aciklama,
            kategori: translated.kategori,
            tip: translated.tip,
            status: 'published',
            translatedBy: 'Google Translate',
            updatedAt: new Date(),
          },
        });

        results.push({
          language: langCode,
          success: true,
          baslik: translation.baslik,
        });
      } catch (error) {
        results.push({
          language: targetLang.toLowerCase(),
          success: false,
          error: error instanceof Error ? error.message : 'Çeviri hatası',
        });
      }
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Çeviri işlemi başarısız' },
      { status: 500 }
    );
  }
}
