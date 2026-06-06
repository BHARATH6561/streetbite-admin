import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pyhciqfstnbquooglomr.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Use service role key for server-side operations (bypasses RLS)
// Use anon key for client-side operations (respects RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey)

// Admin client with service role key for API routes
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase

// Helper to get a Supabase client (synchronous, like the original)
export function getSupabase() {
  return supabase
}

export default supabase
