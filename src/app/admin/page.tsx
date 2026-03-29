'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase ────────────────────────────────────────────────────────────────
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || url === 'PROJECT_URL_ICI') return null
  return createClient(url, key!)
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContentRow { id: string; value: string }
interface EventRow { id: string; titre: string; date: string; heure?: string; description?: string; contact?: string; active: boolean }
interface MenuRow { id: string; category: string; nom: string; description?: string; prix?: string; position: number; active: boolean }

// ─── Tabs ────────────────────────────────────────────────────────────────────
type Tab = 'contenu' | 'horaires' | 'evenements' | 'carte'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'contenu', label: 'Contenu', icon: '✏️' },
  { key: 'horaires', label: 'Horaires', icon: '🕐' },
  { key: 'evenements', label: 'Événements', icon: '📅' },
  { key: 'carte', label: 'Carte', icon: '🍷' },
]

const CONTENT_FIELDS = [
  { id: 'hero_title', label: 'Titre principal (Hero)', multiline: false },
  { id: 'hero_subtitle', label: 'Sous-titre Hero', multiline: false },
  { id: 'hero_description', label: 'Description Hero', multiline: true },
  { id: 'histoire_text', label: 'Texte Notre histoire', multiline: true },
  { id: 'adresse', label: 'Adresse', multiline: false },
  { id: 'telephone', label: 'Téléphone', multiline: false },
  { id: 'email', label: 'Email', multiline: false },
  { id: 'instagram', label: 'Handle Instagram', multiline: false },
]

// ─── Component ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('contenu')
  const [supabase] = useState(() => getSupabase())
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  // Content
  const [content, setContent] = useState<Record<string, string>>({})
  const [horaires, setHoraires] = useState('')

  // Events
  const [events, setEvents] = useState<EventRow[]>([])
  const [newEvent, setNewEvent] = useState<Partial<EventRow>>({ active: true })

  // Menu
  const [menuItems, setMenuItems] = useState<MenuRow[]>([])
  const [newItem, setNewItem] = useState<Partial<MenuRow>>({ category: 'vins', active: true, position: 0 })

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  // ── Fetch data ──
  const fetchContent = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('site_content').select('*')
    if (data) {
      const map: Record<string, string> = {}
      data.forEach((r: ContentRow) => { map[r.id] = r.value })
      setContent(map)
      setHoraires(map['horaires'] ?? '')
    }
  }, [supabase])

  const fetchEvents = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('events').select('*').order('date')
    if (data) setEvents(data)
  }, [supabase])

  const fetchMenu = useCallback(async () => {
    if (!supabase) return
    const { data } = await supabase.from('menu_items').select('*').order('category').order('position')
    if (data) setMenuItems(data)
  }, [supabase])

  useEffect(() => { fetchContent(); fetchEvents(); fetchMenu() }, [fetchContent, fetchEvents, fetchMenu])

  // ── Save content field ──
  async function saveField(id: string, value: string) {
    if (!supabase) return
    setSaving(true)
    await supabase.from('site_content').upsert({ id, value, updated_at: new Date().toISOString() })
    setSaving(false)
    showToast('Enregistré ✓')
  }

  // ── Save horaires ──
  async function saveHoraires() {
    await saveField('horaires', horaires)
  }

  // ── Event CRUD ──
  async function saveEvent() {
    if (!supabase || !newEvent.titre) return
    setSaving(true)
    await supabase.from('events').insert({ ...newEvent })
    setNewEvent({ active: true })
    await fetchEvents()
    setSaving(false)
    showToast('Événement ajouté ✓')
  }
  async function toggleEvent(id: string, active: boolean) {
    if (!supabase) return
    await supabase.from('events').update({ active }).eq('id', id)
    await fetchEvents()
  }
  async function deleteEvent(id: string) {
    if (!supabase || !confirm('Supprimer cet événement ?')) return
    await supabase.from('events').delete().eq('id', id)
    await fetchEvents()
  }

  // ── Menu CRUD ──
  async function saveMenuItem() {
    if (!supabase || !newItem.nom) return
    setSaving(true)
    await supabase.from('menu_items').insert({ ...newItem })
    setNewItem({ category: 'vins', active: true, position: 0 })
    await fetchMenu()
    setSaving(false)
    showToast('Article ajouté ✓')
  }
  async function deleteMenuItem(id: string) {
    if (!supabase || !confirm('Supprimer cet article ?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    await fetchMenu()
  }

  // ── Logout ──
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const isConfigured = !!supabase

  return (
    <div className="min-h-screen bg-[#F8F7F5] font-body">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.webp" alt="L'Arsouille" width={36} height={36} className="rounded-full" />
          <div>
            <p className="font-heading text-sm text-gray-900">Administration</p>
            <p className="text-xs text-gray-400">L&apos;Arsouille — Brest</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-700">
            Voir le site →
          </a>
          <button onClick={logout} className="text-xs text-gray-400 hover:text-red-600 transition-colors">
            Déconnexion
          </button>
        </div>
      </header>

      {/* Supabase warning */}
      {!isConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700">
          ⚠️ Supabase non configuré — configurez <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> et <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> dans .env.local
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-4xl mx-auto flex gap-0">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.key
                  ? 'border-[#8B1A1A] text-[#8B1A1A]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* ── CONTENU ── */}
        {tab === 'contenu' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Textes du site</h2>
            {CONTENT_FIELDS.map((field) => (
              <div key={field.id} className="bg-white rounded border border-gray-200 p-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    rows={4}
                    defaultValue={content[field.id] ?? ''}
                    onBlur={(e) => saveField(field.id, e.target.value)}
                    disabled={!isConfigured}
                    className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none disabled:opacity-50"
                  />
                ) : (
                  <input
                    type="text"
                    defaultValue={content[field.id] ?? ''}
                    onBlur={(e) => saveField(field.id, e.target.value)}
                    disabled={!isConfigured}
                    className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] disabled:opacity-50"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── HORAIRES ── */}
        {tab === 'horaires' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Horaires d&apos;ouverture</h2>
            <div className="bg-white rounded border border-gray-200 p-4">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Texte horaires (affiché dans la section Contact)
              </label>
              <textarea
                rows={6}
                value={horaires}
                onChange={(e) => setHoraires(e.target.value)}
                disabled={!isConfigured}
                placeholder={"Lundi : fermé\nMardi–Vendredi : 17h–23h\nSamedi : 14h–23h\nDimanche : 14h–20h"}
                className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none disabled:opacity-50"
              />
              <button
                onClick={saveHoraires}
                disabled={!isConfigured || saving}
                className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors"
              >
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        )}

        {/* ── ÉVÉNEMENTS ── */}
        {tab === 'evenements' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Événements</h2>

            {/* Ajouter */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ajouter un événement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Titre *" value={newEvent.titre ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, titre: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Date (ex: 12 avril 2025)" value={newEvent.date ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, date: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Heure (ex: 20h)" value={newEvent.heure ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, heure: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Contact (ex: @cave_larsouille_brest)" value={newEvent.contact ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, contact: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <textarea placeholder="Description" value={newEvent.description ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, description: e.target.value }))} rows={2} className="sm:col-span-2 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
              </div>
              <button onClick={saveEvent} disabled={!isConfigured || saving || !newEvent.titre} className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors">
                Ajouter l&apos;événement
              </button>
            </div>

            {/* Liste */}
            <div className="space-y-3">
              {events.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Aucun événement</p>}
              {events.map((ev) => (
                <div key={ev.id} className={`bg-white rounded border p-4 flex gap-3 ${ev.active ? 'border-gray-200' : 'border-gray-100 opacity-50'}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{ev.titre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.date}{ev.heure ? ` — ${ev.heure}` : ''}</p>
                    {ev.description && <p className="text-xs text-gray-500 mt-1">{ev.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleEvent(ev.id, !ev.active)} className="text-xs text-gray-400 hover:text-gray-700">
                      {ev.active ? 'Masquer' : 'Afficher'}
                    </button>
                    <button onClick={() => deleteEvent(ev.id)} className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CARTE ── */}
        {tab === 'carte' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Carte & Menu</h2>

            {/* Ajouter */}
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ajouter un article</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select value={newItem.category} onChange={(e) => setNewItem(p => ({ ...p, category: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]">
                  <option value="vins">Vins nature</option>
                  <option value="bieres">Bières craft</option>
                  <option value="spiritueux">Spiritueux</option>
                  <option value="planches">Planches & Bouchées</option>
                </select>
                <input placeholder="Nom *" value={newItem.nom ?? ''} onChange={(e) => setNewItem(p => ({ ...p, nom: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Prix (optionnel, ex: 4€)" value={newItem.prix ?? ''} onChange={(e) => setNewItem(p => ({ ...p, prix: e.target.value }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input type="number" placeholder="Ordre d'affichage" value={newItem.position ?? 0} onChange={(e) => setNewItem(p => ({ ...p, position: Number(e.target.value) }))} className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <textarea placeholder="Description" value={newItem.description ?? ''} onChange={(e) => setNewItem(p => ({ ...p, description: e.target.value }))} rows={2} className="sm:col-span-2 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
              </div>
              <button onClick={saveMenuItem} disabled={!isConfigured || saving || !newItem.nom} className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors">
                Ajouter à la carte
              </button>
            </div>

            {/* Liste par catégorie */}
            {(['vins', 'bieres', 'spiritueux', 'planches'] as const).map((cat) => {
              const catLabels = { vins: 'Vins nature', bieres: 'Bières craft', spiritueux: 'Spiritueux', planches: 'Planches & Bouchées' }
              const catItems = menuItems.filter(i => i.category === cat)
              return (
                <div key={cat}>
                  <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">{catLabels[cat]}</h3>
                  <div className="space-y-2">
                    {catItems.length === 0 && <p className="text-xs text-gray-300 py-2">Aucun article — les données par défaut sont affichées.</p>}
                    {catItems.map((item) => (
                      <div key={item.id} className="bg-white rounded border border-gray-200 px-4 py-3 flex gap-3 items-start">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{item.nom}{item.prix ? <span className="ml-2 text-xs text-[#8B1A1A]">{item.prix}</span> : null}</p>
                          {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                        </div>
                        <button onClick={() => deleteMenuItem(item.id)} className="text-xs text-red-400 hover:text-red-600 shrink-0">Supprimer</button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white text-sm px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
