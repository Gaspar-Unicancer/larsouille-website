import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'larsouille-admin-secret-change-in-prod'
)

export async function POST(request: NextRequest) {
  // Vérification du token admin
  const token = request.cookies.get('admin_token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    await jwtVerify(token, JWT_SECRET)
  } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  // Lecture du fichier
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const slot = formData.get('slot') as string | null

  if (!file || !slot) {
    return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
  }

  // Validation type
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: 'Format non supporté (JPG, PNG, WebP uniquement)' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `${slot}.${ext}`
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Upload vers Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(path, buffer, { upsert: true, contentType: file.type })

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('site-images')
    .getPublicUrl(path)

  // Sauvegarde de l'URL dans site_content
  await supabase
    .from('site_content')
    .upsert({ id: slot, value: publicUrl, updated_at: new Date().toISOString() })

  return NextResponse.json({ url: publicUrl })
}
