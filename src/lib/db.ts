import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Global singleton for Supabase client (avoid multiple instances in dev)
const globalForSupabase = globalThis as unknown as {
  supabase: ReturnType<typeof createClient> | undefined
}

export const db = globalForSupabase.supabase ?? createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false }
})

if (process.env.NODE_ENV !== 'production') globalForSupabase.supabase = db
