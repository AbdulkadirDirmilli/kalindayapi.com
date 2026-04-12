import { Locale } from './config';

// Dictionary type tanımı
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  nav: {
    home: string;
    services: string;
    listings: string;
    exchange: string;
    blog: string;
    corporate: string;
    about: string;
    visionMission: string;
    references: string;
    certificates: string;
    contact: string;
    faq: string;
    searchListings: string;
    callNow: string;
  };
  services: {
    realEstate: string;
    renovation: string;
    construction: string;
    planning: string;
  };
  common: {
    readMore: string;
    viewAll: string;
    share: string;
    loading: string;
    error: string;
    retry: string;
    back: string;
    next: string;
    previous: string;
    close: string;
    search: string;
    filter: string;
    sort: string;
    noResults: string;
    showMore: string;
    showLess: string;
    yes: string;
    no: string;
    or: string;
    and: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      ctaSecondary: string;
    };
    stats: {
      experience: string;
      projects: string;
      clients: string;
      area: string;
    };
    featured: {
      title: string;
      subtitle: string;
    };
    services: {
      title: string;
      subtitle: string;
    };
    whyUs: {
      title: string;
      experience: string;
      quality: string;
      price: string;
      trust: string;
    };
  };
  listings: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      forSale: string;
      forRent: string;
      type: string;
      apartment: string;
      villa: string;
      land: string;
      commercial: string;
      priceRange: string;
      minPrice: string;
      maxPrice: string;
      area: string;
      rooms: string;
      location: string;
    };
    sort: {
      newest: string;
      priceAsc: string;
      priceDesc: string;
      areaAsc: string;
      areaDesc: string;
    };
    detail: {
      overview: string;
      features: string;
      location: string;
      contact: string;
      price: string;
      area: string;
      rooms: string;
      bathrooms: string;
      floor: string;
      buildingAge: string;
      heating: string;
      furnished: string;
      elevator: string;
      parking: string;
      pool: string;
      garden: string;
      security: string;
      description: string;
      callAgent: string;
      whatsapp: string;
      shareOnWhatsapp: string;
      listingNo: string;
      updated: string;
      similar: string;
    };
    categories: Record<string, string>;
    types: Record<string, string>;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      workingHours: string;
      weekdays: string;
      hours: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    team: {
      title: string;
      subtitle: string;
    };
  };
  blog: {
    title: string;
    subtitle: string;
    readTime: string;
    categories: Record<string, string>;
    author: string;
    publishDate: string;
    relatedPosts: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    services: string;
    contact: string;
    followUs: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
  exchange: {
    title: string;
    subtitle: string;
    gold: string;
    dollar: string;
    euro: string;
    sterling: string;
    buying: string;
    selling: string;
    lastUpdate: string;
  };
  language: {
    select: string;
    tr: string;
    en: string;
    ar: string;
  };
}

// Dictionary'leri dinamik olarak import et
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

// Server Component'ler için cache'lenmiş versiyon
import { cache } from 'react';

export const getCachedDictionary = cache(async (locale: Locale) => {
  return getDictionary(locale);
});
