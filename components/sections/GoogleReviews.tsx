"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { getRandomReviews, GoogleReview } from "@/data/google-reviews";

// Google renkleri için avatar palette
const avatarColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

function formatDate(tarih: string): string {
  // Tarih formatı: "Mart 2025" gibi gelecek, bunu Google formatına çevirelim
  const ayMap: Record<string, string> = {
    "Ocak": "oca",
    "Şubat": "şub",
    "Mart": "mar",
    "Nisan": "nis",
    "Mayıs": "may",
    "Haziran": "haz",
    "Temmuz": "tem",
    "Ağustos": "ağu",
    "Eylül": "eyl",
    "Ekim": "eki",
    "Kasım": "kas",
    "Aralık": "ara",
  };

  const parts = tarih.split(" ");
  if (parts.length === 2) {
    const ay = ayMap[parts[0]] || parts[0].toLowerCase().substring(0, 3);
    return `${ay} ${parts[1]}`;
  }
  return tarih.toLowerCase();
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const initials = getInitials(review.isim);
  const avatarColor = getAvatarColor(review.isim);

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Header: Avatar + Name + Date */}
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-medium text-sm flex-shrink-0`}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#202124] text-sm truncate">{review.isim}</p>
          <div className="flex items-center gap-2 text-xs text-[#70757a]">
            <span>{review.konum}</span>
            <span>·</span>
            <span>{formatDate(review.tarih)}</span>
          </div>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.puan ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-gray-200 text-gray-200"}`}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm text-[#202124] leading-relaxed line-clamp-4">
        {review.yorum}
      </p>

      {/* Service type badge */}
      <div className="mt-3">
        <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-[#70757a] rounded-full">
          {review.yapilanIs}
        </span>
      </div>
    </div>
  );
}

export default function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setReviews(getRandomReviews(4));
    setIsLoaded(true);
  }, []);

  // Ortalama puan hesapla (tüm yorumlardan)
  const avgRating = 4.9;
  const totalReviews = 50;

  if (!isLoaded) {
    return (
      <div className="py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 animate-pulse">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                  <div className="h-3 bg-gray-200 rounded w-32" />
                </div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Google Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Google Logo */}
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium text-[#202124]">{avgRating}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(avgRating) ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-[#70757a]">{totalReviews} Google yorumu</p>
          </div>
        </div>

        <a
          href="https://g.page/r/CQvKz8hZ2uYiEBM/review"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#1a73e8] hover:text-[#174ea6] font-medium"
        >
          <span>Google'da yorum yap</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* Reviews Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-[#70757a] mt-6">
        Bu yorumlar Google Haritalar'dan alınmıştır
      </p>
    </div>
  );
}
