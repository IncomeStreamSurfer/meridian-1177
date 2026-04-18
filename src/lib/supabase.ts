import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('[meridian] Supabase env vars missing; db ops will no-op.');
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: false },
});

export type Subscriber = {
  id: string;
  email: string;
  source: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};
