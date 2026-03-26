import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Hardcoded anon key (same as client.ts) to ensure it works without env vars
const SUPABASE_URL = "https://etecpuvmzqubfatqiipx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0ZWNwdXZtenF1YmZhdHFpaXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzOTk0OTEsImV4cCI6MjA4OTk3NTQ5MX0.gvtzKJpA0CrduyJLjGIXYW2P6NIPil8YTyFTHRjtppA";

export const publicSupabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
