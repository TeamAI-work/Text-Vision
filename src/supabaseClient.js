import { createClient } from '@supabase/supabase-js'

// Using the exact variable name defined in the user's .env.local
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing. Check your .env.local file.")
}

export const supabase = createClient(supabaseUrl || 'http://localhost', supabaseAnonKey || 'placeholder')
