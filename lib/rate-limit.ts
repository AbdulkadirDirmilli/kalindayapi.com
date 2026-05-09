/**
 * Basit In-Memory Rate Limiter
 *
 * Production için Redis kullanılması önerilir.
 * Bu implementasyon tek sunucu için uygundur.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store
const rateLimitStore = new Map<string, RateLimitEntry>();

// Belirli aralıklarla eski kayıtları temizle
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetTime < now) {
      rateLimitStore.delete(key);
    }
  }
}, 60000); // Her 1 dakikada bir temizle

export interface RateLimitConfig {
  /** Maksimum istek sayısı */
  maxRequests: number;
  /** Süre penceresi (saniye) */
  windowSeconds: number;
}

export interface RateLimitResult {
  /** İstek izin verildi mi? */
  success: boolean;
  /** Kalan istek sayısı */
  remaining: number;
  /** Reset zamanı (Unix timestamp ms) */
  resetTime: number;
  /** Hata mesajı (başarısız ise) */
  message?: string;
}

/**
 * Rate limit kontrolü yap
 *
 * @param identifier - Benzersiz tanımlayıcı (genellikle IP adresi)
 * @param config - Rate limit ayarları
 * @returns Rate limit sonucu
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const key = identifier;
  const windowMs = config.windowSeconds * 1000;

  let entry = rateLimitStore.get(key);

  // Yeni pencere başlat veya mevcut olanı kontrol et
  if (!entry || entry.resetTime < now) {
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(key, entry);

    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetTime: entry.resetTime,
    };
  }

  // Limit aşıldı mı?
  if (entry.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
      message: `Rate limit aşıldı. ${Math.ceil((entry.resetTime - now) / 1000)} saniye sonra tekrar deneyin.`,
    };
  }

  // İstek sayısını artır
  entry.count++;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * IP adresini request header'larından al
 */
export function getClientIP(request: Request): string {
  // Cloudflare
  const cfIP = request.headers.get('cf-connecting-ip');
  if (cfIP) return cfIP;

  // X-Forwarded-For (proxy arkası)
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // X-Real-IP (nginx)
  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  // Fallback
  return 'unknown';
}

/**
 * Rate limit response headers oluştur
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString(),
  };
}

// Önceden tanımlanmış rate limit konfigürasyonları
export const RATE_LIMITS = {
  /** Public API'ler için: 100 istek / dakika */
  public: { maxRequests: 100, windowSeconds: 60 },

  /** Form gönderimi için: 5 istek / dakika */
  form: { maxRequests: 5, windowSeconds: 60 },

  /** Arama için: 30 istek / dakika */
  search: { maxRequests: 30, windowSeconds: 60 },

  /** Çeviri API'si için: 20 istek / dakika */
  translate: { maxRequests: 20, windowSeconds: 60 },
} as const;
