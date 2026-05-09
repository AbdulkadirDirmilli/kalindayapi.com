'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="tr">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <svg
                style={{ margin: '0 auto', height: '4rem', width: '4rem', color: '#ef4444' }}
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Kritik Hata
            </h1>
            <p style={{ color: '#4b5563', marginBottom: '2rem' }}>
              Uygulama yüklenirken kritik bir hata oluştu. Lütfen sayfayı yenileyin.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => reset()}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Tekrar Dene
              </button>
              <a
                href="/tr"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#e5e7eb',
                  color: '#1f2937',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                }}
              >
                Ana Sayfa
              </a>
            </div>
            {error.digest && (
              <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                Hata Kodu: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  )
}
