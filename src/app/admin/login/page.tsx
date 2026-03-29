'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      const data = await res.json()
      setError(data.error ?? 'Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/images/logo.webp"
            alt="L'Arsouille"
            width={72}
            height={72}
            className="rounded-full mx-auto mb-3"
          />
          <h1 className="font-heading text-2xl text-ink">Administration</h1>
          <p className="font-body text-sm text-ink/50 mt-1">L&apos;Arsouille — Brest</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded border border-wood/30 p-8 shadow-sm">
          <label className="block font-body text-sm font-medium text-ink mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoFocus
            className="w-full border border-wood/40 rounded px-3 py-2 text-sm font-body text-ink bg-cream focus:outline-none focus:border-primary transition-colors"
          />

          {error && (
            <p className="mt-2 text-xs text-primary font-body">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary text-cream font-body font-medium text-sm px-4 py-2.5 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center mt-4 font-body text-xs text-ink/30">
          Configurez <code className="bg-wood/20 px-1 rounded">ADMIN_PASSWORD</code> dans .env.local
        </p>
      </div>
    </div>
  )
}
