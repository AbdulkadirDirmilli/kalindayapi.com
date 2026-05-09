"use client";

import { useEffect, useState } from "react";
import { Users, Calendar, Activity } from "lucide-react";

interface VisitorStats {
  launchDate: string;
  daysSinceLaunch: number;
  allTime: {
    totalVisits: number;
    uniqueVisitors: number;
  };
  today: {
    totalVisits: number;
    uniqueVisitors: number;
  };
  online: number;
}

// Sayıları formatla (1234 -> 1,234)
function formatNumber(num: number): string {
  return num.toLocaleString("tr-TR");
}

// Tarihi formatla
function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return date.toLocaleDateString(locale === "tr" ? "tr-TR" : "en-US", options);
}

// Çeviriler
const translations = {
  tr: {
    totalVisitors: "Toplam Ziyaretçi",
    onlineNow: "Şu an sitede",
    since: "tarihinden beri",
    person: "kişi",
  },
  en: {
    totalVisitors: "Total Visitors",
    onlineNow: "Online now",
    since: "since",
    person: "person",
  },
  ar: {
    totalVisitors: "إجمالي الزوار",
    onlineNow: "متصل الآن",
    since: "منذ",
    person: "شخص",
  },
  de: {
    totalVisitors: "Gesamtbesucher",
    onlineNow: "Jetzt online",
    since: "seit",
    person: "Person",
  },
  ru: {
    totalVisitors: "Всего посетителей",
    onlineNow: "Сейчас онлайн",
    since: "с",
    person: "чел.",
  },
};

interface VisitorCounterProps {
  locale?: string;
}

export default function VisitorCounter({ locale = "tr" }: VisitorCounterProps) {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(0);
  const t = translations[locale as keyof typeof translations] || translations.tr;

  // Sayfa yüklendiğinde ziyareti kaydet ve istatistikleri al
  useEffect(() => {
    // Ziyareti kaydet
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {
      // Hata olursa sessizce devam et
    });

    // İstatistikleri al
    fetch("/api/analytics/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // Animasyonlu sayaç efekti
  useEffect(() => {
    if (!stats) return;

    const target = stats.allTime.uniqueVisitors;
    const duration = 2000; // 2 saniye
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayCount(target);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stats]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-6 py-4 animate-pulse">
        <div className="h-12 w-32 bg-white/10 rounded-lg"></div>
        <div className="h-12 w-24 bg-white/10 rounded-lg"></div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10">
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
        {/* Toplam Ziyaretçi */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
              {formatNumber(displayCount)}
            </div>
            <div className="text-xs text-gray-400">{t.totalVisitors}</div>
          </div>
        </div>

        {/* Ayraç */}
        <div className="hidden md:block w-px h-12 bg-white/20"></div>

        {/* Şu an sitede */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            {/* Canlı gösterge */}
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-bold text-green-400 tabular-nums">
              {stats.online} <span className="text-sm font-normal text-gray-400">{t.person}</span>
            </div>
            <div className="text-xs text-gray-400">{t.onlineNow}</div>
          </div>
        </div>

        {/* Ayraç */}
        <div className="hidden md:block w-px h-12 bg-white/20"></div>

        {/* Tarih */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>
            {formatDate(stats.launchDate, locale)} {t.since}
          </span>
        </div>
      </div>
    </div>
  );
}
