# L'Arsouille — Site Web

## Projet
- Commerce : L'Arsouille (bar, Brest)
- Stack : Next.js 15 + TypeScript + Tailwind CSS v4 + Supabase
- Brief créatif : ../CLIENT_BRIEF.md (lire avant tout travail de design)

## Conventions
- Indentation : 2 espaces
- Commits : `feat:` / `fix:` / `style:` / `refactor:`
- Images : toujours via `next/image`, format WebP, lazy loading activé
- Toujours tester responsive (mobile-first)
- Ne jamais committer `.env.local`

## Structure
- `src/app/page.tsx` → Page d'accueil
- `src/app/admin/` → Interface admin (si activée)
- `src/components/` → Composants réutilisables
- `src/lib/supabase.ts` → Client Supabase

## Workflow
- `npm run dev` pour le développement local
- `npm run build` pour vérifier avant commit
- Photos sources dans `../photos/`
