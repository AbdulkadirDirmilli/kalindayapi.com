'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const errorMessages = {
  tr: {
    title: 'Bir Hata Oluştu',
    description: 'Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin veya ana sayfaya dönün.',
    retry: 'Tekrar Dene',
    home: 'Ana Sayfaya Dön',
    errorCode: 'Hata Kodu',
  },
  en: {
    title: 'An Error Occurred',
    description: 'An unexpected error occurred while loading the page. Please refresh or return to the homepage.',
    retry: 'Try Again',
    home: 'Return Home',
    errorCode: 'Error Code',
  },
  ar: {
    title: 'حدث خطأ',
    description: 'حدث خطأ غير متوقع أثناء تحميل الصفحة. يرجى تحديث الصفحة أو العودة إلى الصفحة الرئيسية.',
    retry: 'حاول مرة أخرى',
    home: 'العودة للرئيسية',
    errorCode: 'رمز الخطأ',
  },
  de: {
    title: 'Ein Fehler ist aufgetreten',
    description: 'Beim Laden der Seite ist ein unerwarteter Fehler aufgetreten. Bitte aktualisieren Sie die Seite oder kehren Sie zur Startseite zurück.',
    retry: 'Erneut versuchen',
    home: 'Zur Startseite',
    errorCode: 'Fehlercode',
  },
  ru: {
    title: 'Произошла ошибка',
    description: 'При загрузке страницы произошла непредвиденная ошибка. Пожалуйста, обновите страницу или вернитесь на главную.',
    retry: 'Попробовать снова',
    home: 'На главную',
    errorCode: 'Код ошибки',
  },
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  // URL'den dil kodunu al
  const lang = typeof window !== 'undefined'
    ? (window.location.pathname.split('/')[1] as keyof typeof errorMessages) || 'tr'
    : 'tr'

  const messages = errorMessages[lang] || errorMessages.tr
  const isRTL = lang === 'ar'

  return (
    <div
      className="min-h-[60vh] flex items-center justify-center px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {messages.title}
        </h1>
        <p className="text-gray-600 mb-8">
          {messages.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {messages.retry}
          </button>
          <Link
            href={`/${lang}`}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {messages.home}
          </Link>
        </div>
        {error.digest && (
          <p className="mt-8 text-sm text-gray-400">
            {messages.errorCode}: {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
