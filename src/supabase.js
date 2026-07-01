import { createClient } from '@supabase/supabase-js'

export const SUPABASE_URL = "https://xptzdgdaokrnbccldohh.supabase.co"
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwdHpkZ2Rhb2tybmJjY2xkb2hoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjgwODg4NCwiZXhwIjoyMDk4Mzg0ODg0fQ.sLf4pmb1LhU3le1vzP-LagGKyhSb4DWFK18etcT1C7M"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)