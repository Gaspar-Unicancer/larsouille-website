import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createClient } from '@supabase/supabase-js'

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'larsouille-admin-secret-change-in-prod'
)

export async function POST(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Non autoris\u00e9' }, { status: 401 })
  try { await jwtVerify(token, JWT_SECRET) } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const productId = formData.get('productId') as string | null

  if (!file || !productId)
    return NextResponse.json({ error: 'Donn\u00e9es manquantes' }, { status: 400 })

  const allowed = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type))
    return NextResponse.json({ error: 'Format non support\u00e9 (JPG, PNG, WebP)' }, { status: 400 })

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const path = `products/${productId}.${ext}`
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const { error: uploadError } = await supabase.storage
    .from('site-images')
    .upload(path, buffer, { upsert: true, contentType: file.type })

  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: { publicUrl } } = supabase.storage
    .from('site-images')
    .getPublicUrl(path)

  await supabase.from('menu_items').update({ img: publicUrl }).eq('id', productId)

  return NextResponse.json({ url: publicUrl })
}
