import { createClient } from '@supabase/supabase-js'

// Supabase project URL is public (used in client-side code too)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pyhciqfstnbquooglomr.supabase.co'
// Service role key is secret - MUST be set as env var on Vercel
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseKey) {
  console.error('ERROR: SUPABASE_SERVICE_ROLE_KEY environment variable is not set!')
}

// Global singleton for Supabase client (avoid multiple instances in dev)
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient> | undefined
}

export const db = globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseKey || '', {
  auth: { persistSession: false, autoRefreshToken: false }
})

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = db
