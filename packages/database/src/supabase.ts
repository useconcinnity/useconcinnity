import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.com/dashboard/project/nqyudbywjkyydhiltcho/settings/api-keys';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xeXVkYnl3amt5eWRoaWx0Y2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNzQxNjMsImV4cCI6MjA3ODY1MDE2M30.fzzaFabqjLErfIQp4S38hT7tVCBbOmdn9ZLkbK3miXU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xeXVkYnl3amt5eWRoaWx0Y2hvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzA3NDE2MywiZXhwIjoyMDc4NjUwMTYzfQ.5e88aAx_-ct_1Vqqq8kLtFKqza6jP8XznVAIWFgNQBc',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

