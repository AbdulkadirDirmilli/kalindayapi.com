"use client";

import { type Locale } from "@/lib/i18n";

interface FlagIconProps {
  locale: Locale;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-5 h-4",
  md: "w-6 h-5",
  lg: "w-8 h-6",
};

export default function FlagIcon({ locale, className = "", size = "md" }: FlagIconProps) {
  const sizeClass = sizeClasses[size];

  // Turkey Flag
  if (locale === "tr") {
    return (
      <svg
        viewBox="0 0 1200 800"
        className={`${sizeClass} ${className} rounded-sm shadow-sm`}
        aria-label="Türkiye Bayrağı"
      >
        <rect width="1200" height="800" fill="#E30A17" />
        <circle cx="425" cy="400" r="200" fill="#ffffff" />
        <circle cx="475" cy="400" r="160" fill="#E30A17" />
        {/* 5 pointed star - proper Turkish flag star */}
        <g transform="translate(590, 400) rotate(18)">
          <polygon
            fill="#ffffff"
            points="
              0,-85
              20,-26
              81,-26
              32,10
              50,69
              0,33
              -50,69
              -32,10
              -81,-26
              -20,-26
            "
          />
        </g>
      </svg>
    );
  }

  // UK Flag (Union Jack)
  if (locale === "en") {
    return (
      <svg
        viewBox="0 0 60 30"
        className={`${sizeClass} ${className} rounded-sm shadow-sm`}
        aria-label="United Kingdom Flag"
      >
        <clipPath id="s">
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath="url(#t)"
            stroke="#C8102E"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  // Saudi Arabia Flag
  if (locale === "ar") {
    return (
      <svg
        viewBox="0 0 450 300"
        className={`${sizeClass} ${className} rounded-sm shadow-sm`}
        aria-label="علم المملكة العربية السعودية"
      >
        <rect width="450" height="300" fill="#006C35" />
        <g fill="#fff" transform="translate(45, 60)">
          {/* Shahada text simplified */}
          <text
            x="180"
            y="60"
            fontSize="32"
            fontFamily="Arial"
            textAnchor="middle"
            fill="#fff"
          >
            لا إله إلا الله
          </text>
          <text
            x="180"
            y="100"
            fontSize="28"
            fontFamily="Arial"
            textAnchor="middle"
            fill="#fff"
          >
            محمد رسول الله
          </text>
          {/* Sword */}
          <rect x="60" y="130" width="240" height="8" rx="2" fill="#fff" />
          <polygon points="300,134 320,134 310,120" fill="#fff" />
          <circle cx="60" cy="134" r="12" fill="#fff" />
        </g>
      </svg>
    );
  }

  return null;
}
