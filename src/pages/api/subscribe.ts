import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let email = '';
  try {
    const ct = request.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      const body = await request.json();
      email = typeof body?.email === 'string' ? body.email : '';
    } else {
      const form = await request.formData();
      email = String(form.get('email') ?? '');
    }
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }

  email = email.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return json({ ok: false, error: 'Please enter a valid email address.' }, 400);
  }

  const referrer = request.headers.get('referer') || null;
  const ua = request.headers.get('user-agent') || null;

  const { error } = await supabase.from('meridian_subscribers').insert({
    email,
    source: 'landing',
    referrer,
    user_agent: ua,
  });

  if (error && !/duplicate key/i.test(error.message) && error.code !== '23505') {
    // eslint-disable-next-line no-console
    console.error('[meridian] subscribe insert failed', error);
    return json({ ok: false, error: "Couldn't save your email. Try again in a moment." }, 500);
  }

  return json({ ok: true, message: "You're on the list. We'll be in touch." });
};

export const GET: APIRoute = () => json({ ok: false, error: 'Method not allowed' }, 405);
