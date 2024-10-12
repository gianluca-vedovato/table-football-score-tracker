// supabase-client.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = 'https://ycibpvrkeyrrykhjoaod.supabase.co';
  const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljaWJwdnJrZXlycnlraGpvYW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3MTcxODksImV4cCI6MjA0NDI5MzE4OX0.UKA8hLN5X6a85b32CRybz5j1OKv71T4H9VTbr5S4l40';

  return createClient(supabaseUrl, supabaseKey);
}
