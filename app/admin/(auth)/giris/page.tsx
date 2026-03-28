'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(
    error === 'CredentialsSignin' ? 'Email veya sifre hatali' : null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        setLoginError('Email veya sifre hatali')
        setIsLoading(false)
      } else if (result?.ok) {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setLoginError('Bir hata olustu. Lutfen tekrar deneyin.')
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs font-medium">{loginError}</span>
        </div>
      )}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1.5">
          E-posta Adresi
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
          placeholder="ornek@email.com"
          required
          autoComplete="email"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-xs font-semibold text-gray-600 mb-1.5">
          Sifre
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 pr-10 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all"
            placeholder="Sifrenizi girin"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-violet-500 transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500 focus:ring-offset-0"
          />
          <span className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors">Beni hatirla</span>
        </label>
        <button type="button" className="text-xs text-violet-600 hover:text-violet-700 font-medium transition-colors">
          Sifremi Unuttum
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Giris Yapiliyor...
          </span>
        ) : (
          'Giris Yap'
        )}
      </button>

      {/* Back to Home */}
      <Link
        href="/"
        className="flex items-center justify-center gap-1.5 pt-2 text-gray-400 hover:text-violet-600 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span className="text-xs font-medium">Ana Sayfaya Don</span>
      </Link>
    </form>
  )
}

function LoginFormFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-3 border-violet-100 border-t-violet-500 rounded-full animate-spin" />
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50 to-purple-50 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(139 92 246 / 0.12) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-200 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-xs relative z-10">
        {/* Main Card */}
        <div className="relative p-6 rounded-2xl border border-gray-100 shadow-xl shadow-violet-500/5 overflow-hidden">
          {/* Gradient background - top transparent, bottom solid */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent" />
          {/* Logo Section */}
          <div className="relative z-10 text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-2.5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                <Image
                  src="/logo.svg"
                  alt="Kalinda Yapi"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority
                />
              </div>
            </div>
            <h1 className="text-lg font-bold text-gray-800">Kalinda Yapi</h1>
            <p className="text-gray-400 mt-0.5 text-xs">Hesabiniza Giris Yapin</p>
          </div>

          {/* Login Form */}
          <div className="relative z-10">
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>
          </div>
        </div>

      </div>

      {/* Footer - Fixed Bottom */}
      <div className="absolute bottom-0 left-0 right-0 pb-4">
        <p className="text-center text-xs font-medium tracking-wider" suppressHydrationWarning>
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            2026 KALINDA YAPI
          </span>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-gray-400">Tum Haklar Saklidir</span>
        </p>
      </div>
    </div>
  )
}
