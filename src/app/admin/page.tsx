'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import { imageSlots } from '@/lib/content'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || url === 'PROJECT_URL_ICI') return null
  return createClient(url, key!)
}

interface ContentRow { id: string; value: string }
interface EventRow { id: string; titre: string; date: string; heure?: string; description?: string; contact?: string; active: boolean }
interface MenuRow { id: string; category: string; nom: string; description?: string; prix?: string; img?: string; position: number; active: boolean }

type Tab = 'contenu' | 'horaires' | 'evenements' | 'bar' | 'cave' | 'epicerie' | 'photos'

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'contenu', label: 'Contenu', icon: '\u270f\ufe0f' },
  { key: 'horaires', label: 'Horaires', icon: '\ud83d\udd50' },
  { key: 'evenements', label: '\u00c9v\u00e9nements', icon: '\ud83d\udcc5' },
  { key: 'bar', label: 'Le Bar', icon: '\ud83c\udf7a' },
  { key: 'cave', label: 'La Cave', icon: '\ud83c\udf77' },
  { key: 'epicerie', label: '\u00c9picerie', icon: '\ud83e\uddc0' },
  { key: 'photos', label: 'Photos', icon: '\ud83d\uddbc\ufe0f' },
]

const CONTENT_FIELDS = [
  { id: 'hero_title', label: 'Titre principal (Hero)', multiline: false },
  { id: 'hero_subtitle', label: 'Sous-titre Hero', multiline: false },
  { id: 'hero_description', label: 'Description Hero', multiline: true },
  { id: 'histoire_text', label: 'Texte Notre histoire', multiline: true },
  { id: 'adresse', label: 'Adresse', multiline: false },
  { id: 'telephone', label: 'T\u00e9l\u00e9phone', multiline: false },
  { id: 'email', label: 'Email', multiline: false },
  { id: 'instagram', label: 'Handle Instagram', multiline: false },
]

type SectionKey = 'bar' | 'cave' | 'epicerie'

type SectionConfigEntry = {
  label: string
  fields: { id: string; label: string; multiline?: boolean }[]
  imgKey: string
  imgDefault: string
  imgLabel: string
}

const SECTION_CONFIG: Record<SectionKey, SectionConfigEntry> = {
  bar: {
    label: 'Le Bar',
    fields: [
      { id: 'bar_title', label: 'Titre de section' },
      { id: 'bar_subtitle', label: 'Sous-titre' },
      { id: 'bar_description', label: 'Description', multiline: true },
    ],
    imgKey: 'img_bar',
    imgDefault: '/images/bieres.webp',
    imgLabel: 'Photo principale \u2014 Le Bar',
  },
  cave: {
    label: 'La Cave \u00e0 Vins',
    fields: [
      { id: 'cave_title', label: 'Titre de section' },
      { id: 'cave_subtitle', label: 'Sous-titre' },
      { id: 'cave_description', label: 'Description', multiline: true },
    ],
    imgKey: 'img_cave',
    imgDefault: '/images/vins.png',
    imgLabel: 'Photo principale \u2014 La Cave',
  },
  epicerie: {
    label: "L'\u00c9picerie",
    fields: [
      { id: 'epicerie_title', label: 'Titre de section' },
      { id: 'epicerie_subtitle', label: 'Sous-titre' },
      { id: 'epicerie_description', label: 'Description', multiline: true },
    ],
    imgKey: 'img_epicerie',
    imgDefault: '/images/assiette.png',
    imgLabel: "Photo principale \u2014 L'\u00c9picerie",
  },
}

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('contenu')
  const [supabase] = useState(() => getSupabase())
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadingProduct, setUploadingProduct] = useState<string | null>(null)
  const [toast, setToast] = useState('')

  const [content, setContent] = useState<Record<string, string>>({})
  const [horaires, setHoraires] = useState('')
  const [events, setEvents] = useState<EventRow[]>([])
  const [newEvent, setNewEvent] = useState<Partial<EventRow>>({ active: true })
  const [menuItems, setMenuItems] = useState<MenuRow[]>([])
  const [newProduct, setNewProduct] = useState<Partial<MenuRow>>({ category: 'bar', active: true, position: 0, nom: '' })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<MenuRow>>({})

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

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

  useEffect(() => {
    if (tab === 'bar' || tab === 'cave' || tab === 'epicerie') {
      setNewProduct({ category: tab, active: true, position: 0, nom: '', description: '', prix: '' })
      setEditingId(null)
      setEditData({})
    }
  }, [tab])

  async function saveField(id: string, value: string) {
    if (!supabase) return
    setSaving(true)
    await supabase.from('site_content').upsert({ id, value, updated_at: new Date().toISOString() })
    setSaving(false)
    showToast('Enregistr\u00e9 \u2713')
  }

  async function saveHoraires() { await saveField('horaires', horaires) }

  async function handleImageUpload(slotKey: string, file: File) {
    setUploading(slotKey)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('slot', slotKey)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form })
      if (!res.ok) { const d = await res.json(); showToast('Erreur\u00a0: ' + (d.error ?? 'inconnue')) }
      else { const { url } = await res.json(); setContent(prev => ({ ...prev, [slotKey]: url })); showToast('Image mise \u00e0 jour \u2713') }
    } catch { showToast('Erreur r\u00e9seau') }
    setUploading(null)
  }

  async function handleProductPhotoUpload(productId: string, file: File) {
    setUploadingProduct(productId)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('productId', productId)
      const res = await fetch('/api/admin/upload-product', { method: 'POST', body: form })
      if (!res.ok) { const d = await res.json(); showToast('Erreur\u00a0: ' + (d.error ?? 'inconnue')) }
      else { const { url } = await res.json(); setMenuItems(prev => prev.map(i => i.id === productId ? { ...i, img: url } : i)); showToast('Photo mise \u00e0 jour \u2713') }
    } catch { showToast('Erreur r\u00e9seau') }
    setUploadingProduct(null)
  }

  async function saveEvent() {
    if (!supabase || !newEvent.titre) return
    setSaving(true)
    await supabase.from('events').insert({ ...newEvent })
    setNewEvent({ active: true })
    await fetchEvents()
    setSaving(false)
    showToast('\u00c9v\u00e9nement ajout\u00e9 \u2713')
  }
  async function toggleEvent(id: string, active: boolean) {
    if (!supabase) return
    await supabase.from('events').update({ active }).eq('id', id)
    await fetchEvents()
  }
  async function deleteEvent(id: string) {
    if (!supabase || !confirm('Supprimer cet \u00e9v\u00e9nement ?')) return
    await supabase.from('events').delete().eq('id', id)
    await fetchEvents()
  }

  async function addProduct() {
    if (!supabase || !newProduct.nom) return
    setSaving(true)
    await supabase.from('menu_items').insert({ ...newProduct })
    setNewProduct(prev => ({ category: prev.category, active: true, position: 0, nom: '', description: '', prix: '' }))
    await fetchMenu()
    setSaving(false)
    showToast('Produit ajout\u00e9 \u2713')
  }
  async function updateProduct() {
    if (!supabase || !editingId) return
    setSaving(true)
    await supabase.from('menu_items').update(editData).eq('id', editingId)
    setEditingId(null)
    setEditData({})
    await fetchMenu()
    setSaving(false)
    showToast('Produit mis \u00e0 jour \u2713')
  }
  async function deleteProduct(id: string) {
    if (!supabase || !confirm('Supprimer ce produit ?')) return
    await supabase.from('menu_items').delete().eq('id', id)
    await fetchMenu()
    showToast('Produit supprim\u00e9')
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const isConfigured = !!supabase
  const logoSrc = content['img_logo'] || '/images/logo.webp'

  function renderSectionTab(category: SectionKey) {
    const config = SECTION_CONFIG[category]
    const sectionItems = menuItems.filter(i => i.category === category)
    const imgSrc = content[config.imgKey] || config.imgDefault

    return (
      <div className="space-y-6">
        <h2 className="font-heading text-xl text-gray-900">{config.label}</h2>

        {/* Textes */}
        <div className="bg-white rounded border border-gray-200 p-4 space-y-4">
          <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide">Textes de la section</h3>
          {config.fields.map((f) => (
            <div key={f.id}>
              <label className="block text-xs text-gray-500 mb-1">{f.label}</label>
              {f.multiline ? (
                <textarea
                  rows={3}
                  defaultValue={content[f.id] ?? ''}
                  onBlur={(e) => saveField(f.id, e.target.value)}
                  disabled={!isConfigured}
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none disabled:opacity-50"
                />
              ) : (
                <input
                  type="text"
                  defaultValue={content[f.id] ?? ''}
                  onBlur={(e) => saveField(f.id, e.target.value)}
                  disabled={!isConfigured}
                  className="w-full text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] disabled:opacity-50"
                />
              )}
            </div>
          ))}
        </div>

        {/* Image de section */}
        <div className="bg-white rounded border border-gray-200 overflow-hidden">
          <div className="relative aspect-video bg-gray-100">
            <Image src={imgSrc} alt={config.label} fill className="object-cover" sizes="100vw"
              unoptimized={imgSrc.startsWith('http')} />
            {uploading === config.imgKey && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#8B1A1A] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          <div className="p-4">
            <p className="text-sm font-medium text-gray-900 mb-3">{config.imgLabel}</p>
            <label className={`flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded py-2.5 text-sm font-medium transition-colors ${
              uploading === config.imgKey ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#8B1A1A]/30 text-[#8B1A1A] hover:border-[#8B1A1A] hover:bg-[#8B1A1A]/5'
            }`}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              {uploading === config.imgKey ? 'Upload en cours\u2026' : "Changer l'image"}
              <input type="file" accept="image/jpeg,image/webp,image/png" className="sr-only"
                disabled={uploading === config.imgKey}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(config.imgKey, f) }}
              />
            </label>
          </div>
        </div>

        {/* Ajouter un produit */}
        <div className="bg-white rounded border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Ajouter un produit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Nom *" value={newProduct.nom ?? ''}
              onChange={(e) => setNewProduct(p => ({ ...p, nom: e.target.value }))}
              className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
            <input placeholder="Prix (ex: 4\u20ac)" value={newProduct.prix ?? ''}
              onChange={(e) => setNewProduct(p => ({ ...p, prix: e.target.value }))}
              className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
            <textarea placeholder="Description" value={newProduct.description ?? ''}
              onChange={(e) => setNewProduct(p => ({ ...p, description: e.target.value }))}
              rows={2} className="sm:col-span-2 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
          </div>
          <button onClick={addProduct} disabled={!isConfigured || saving || !newProduct.nom}
            className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors">
            Ajouter le produit
          </button>
        </div>

        {/* Liste produits */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {sectionItems.length} produit{sectionItems.length !== 1 ? 's' : ''}
          </p>
          {sectionItems.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-6 bg-white rounded border border-gray-200">
              Aucun produit \u2014 donn\u00e9es par d\u00e9faut affich\u00e9es sur le site
            </p>
          )}
          {sectionItems.map((item) => (
            <div key={item.id} className="bg-white rounded border border-gray-200 overflow-hidden">
              {editingId === item.id ? (
                <div className="p-4 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input value={editData.nom ?? ''} onChange={(e) => setEditData(p => ({ ...p, nom: e.target.value }))}
                      placeholder="Nom" className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                    <input value={editData.prix ?? ''} onChange={(e) => setEditData(p => ({ ...p, prix: e.target.value }))}
                      placeholder="Prix" className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                    <textarea value={editData.description ?? ''} onChange={(e) => setEditData(p => ({ ...p, description: e.target.value }))}
                      placeholder="Description" rows={2}
                      className="sm:col-span-2 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={updateProduct} disabled={saving}
                      className="bg-[#8B1A1A] text-white text-sm px-4 py-1.5 rounded hover:bg-[#7A1515] disabled:opacity-50">
                      Enregistrer
                    </button>
                    <button onClick={() => { setEditingId(null); setEditData({}) }}
                      className="text-sm text-gray-500 px-4 py-1.5 rounded border border-gray-200 hover:bg-gray-50">
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 p-3 items-start">
                  {/* Vignette photo */}
                  <div className="shrink-0 relative w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    {item.img
                      ? <Image src={item.img} alt={item.nom} fill className="object-cover" unoptimized />
                      : <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] text-center leading-tight px-1">pas de photo</div>
                    }
                    <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors group" title="Changer la photo">
                      <svg className="opacity-0 group-hover:opacity-100 text-white" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                      </svg>
                      <input type="file" accept="image/jpeg,image/webp,image/png" className="sr-only"
                        disabled={uploadingProduct === item.id}
                        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleProductPhotoUpload(item.id, f) }}
                      />
                    </label>
                    {uploadingProduct === item.id && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-[#8B1A1A] border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {item.nom}
                      {item.prix && <span className="ml-2 text-xs text-[#8B1A1A]">{item.prix}</span>}
                    </p>
                    {item.description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { setEditingId(item.id); setEditData({ nom: item.nom, prix: item.prix ?? '', description: item.description ?? '' }) }}
                      className="text-xs text-gray-400 hover:text-gray-700">Modifier</button>
                    <button onClick={() => deleteProduct(item.id)}
                      className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F7F5] font-body">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={logoSrc} alt="L'Arsouille" width={36} height={36} className="rounded-full"
            unoptimized={logoSrc.startsWith('http')} />
          <div>
            <p className="font-heading text-sm text-gray-900">Administration</p>
            <p className="text-xs text-gray-400">L&apos;Arsouille \u2014 Brest</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-gray-700">Voir le site \u2192</a>
          <button onClick={logout} className="text-xs text-gray-400 hover:text-red-600 transition-colors">D\u00e9connexion</button>
        </div>
      </header>

      {!isConfigured && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-700">
          \u26a0\ufe0f Supabase non configur\u00e9 \u2014 ajoutez les variables d&apos;environnement
        </div>
      )}

      <div className="bg-white border-b border-gray-200 px-4">
        <div className="max-w-4xl mx-auto flex gap-0 overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                tab === t.key ? 'border-[#8B1A1A] text-[#8B1A1A]' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}>
              <span>{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">

        {tab === 'contenu' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Textes du site</h2>
            {CONTENT_FIELDS.map((field) => (
              <div key={field.id} className="bg-white rounded border border-gray-200 p-4">
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">{field.label}</label>
                {field.multiline ? (
                  <textarea rows={4} defaultValue={content[field.id] ?? ''}
                    onBlur={(e) => saveField(field.id, e.target.value)} disabled={!isConfigured}
                    className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none disabled:opacity-50" />
                ) : (
                  <input type="text" defaultValue={content[field.id] ?? ''}
                    onBlur={(e) => saveField(field.id, e.target.value)} disabled={!isConfigured}
                    className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] disabled:opacity-50" />
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'horaires' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">Horaires d&apos;ouverture</h2>
            <div className="bg-white rounded border border-gray-200 p-4">
              <textarea rows={6} value={horaires} onChange={(e) => setHoraires(e.target.value)}
                disabled={!isConfigured}
                placeholder={"Lundi : ferm\u00e9\nMardi\u2013Vendredi : 17h\u201323h\nSamedi : 14h\u201323h\nDimanche : 14h\u201320h"}
                className="w-full text-sm text-gray-800 border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none disabled:opacity-50" />
              <button onClick={saveHoraires} disabled={!isConfigured || saving}
                className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors">
                {saving ? 'Enregistrement\u2026' : 'Enregistrer'}
              </button>
            </div>
          </div>
        )}

        {tab === 'evenements' && (
          <div className="space-y-6">
            <h2 className="font-heading text-xl text-gray-900">\u00c9v\u00e9nements</h2>
            <div className="bg-white rounded border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Ajouter un \u00e9v\u00e9nement</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Titre *" value={newEvent.titre ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, titre: e.target.value }))}
                  className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Date (ex: 12 avril 2025)" value={newEvent.date ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, date: e.target.value }))}
                  className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Heure (ex: 20h)" value={newEvent.heure ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, heure: e.target.value }))}
                  className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <input placeholder="Contact" value={newEvent.contact ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, contact: e.target.value }))}
                  className="text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A]" />
                <textarea placeholder="Description" value={newEvent.description ?? ''} onChange={(e) => setNewEvent(p => ({ ...p, description: e.target.value }))}
                  rows={2} className="sm:col-span-2 text-sm border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-[#8B1A1A] resize-none" />
              </div>
              <button onClick={saveEvent} disabled={!isConfigured || saving || !newEvent.titre}
                className="mt-3 bg-[#8B1A1A] text-white text-sm px-4 py-2 rounded hover:bg-[#7A1515] disabled:opacity-50 transition-colors">
                Ajouter l&apos;\u00e9v\u00e9nement
              </button>
            </div>
            <div className="space-y-3">
              {events.length === 0 && <p className="text-sm text-gray-400 text-center py-4">Aucun \u00e9v\u00e9nement</p>}
              {events.map((ev) => (
                <div key={ev.id} className={`bg-white rounded border p-4 flex gap-3 ${ev.active ? 'border-gray-200' : 'border-gray-100 opacity-50'}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900">{ev.titre}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{ev.date}{ev.heure ? ` \u2014 ${ev.heure}` : ''}</p>
                    {ev.description && <p className="text-xs text-gray-500 mt-1">{ev.description}</p>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleEvent(ev.id, !ev.active)} className="text-xs text-gray-400 hover:text-gray-700">{ev.active ? 'Masquer' : 'Afficher'}</button>
                    <button onClick={() => deleteEvent(ev.id)} className="text-xs text-red-400 hover:text-red-600">Supprimer</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'bar' && renderSectionTab('bar')}
        {tab === 'cave' && renderSectionTab('cave')}
        {tab === 'epicerie' && renderSectionTab('epicerie')}

        {tab === 'photos' && (
          <div className="space-y-4">
            <div>
              <h2 className="font-heading text-xl text-gray-900 mb-1">Photos du site</h2>
              <p className="text-sm text-gray-400">Hero, logo, galerie. Les photos des sections bar/cave/\u00e9picerie se g\u00e8rent dans leurs onglets respectifs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageSlots.map((slot) => {
                const currentSrc = content[slot.key] || slot.defaultSrc
                const isUploading = uploading === slot.key
                return (
                  <div key={slot.key} className="bg-white rounded border border-gray-200 overflow-hidden">
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <Image src={currentSrc} alt={slot.label} fill className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw" unoptimized={currentSrc.startsWith('http')} />
                      {isUploading && (
                        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-[#8B1A1A] border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-sm text-gray-900">{slot.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{slot.description}</p>
                      <label className={`mt-3 flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded py-2.5 text-sm font-medium transition-colors ${
                        isUploading ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#8B1A1A]/30 text-[#8B1A1A] hover:border-[#8B1A1A] hover:bg-[#8B1A1A]/5'
                      }`}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        {isUploading ? 'Upload en cours\u2026' : "Changer l'image"}
                        <input type="file" accept="image/jpeg,image/webp,image/png" className="sr-only"
                          disabled={isUploading || !isConfigured}
                          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageUpload(slot.key, f) }}
                        />
                      </label>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white text-sm px-4 py-2 rounded shadow-lg z-50">{toast}</div>
      )}
    </div>
  )
}
