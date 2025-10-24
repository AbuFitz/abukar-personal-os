// lib/supabaseClient.ts
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// Server-side client that persists auth via cookies
export const createServerSupabase = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) => {
          // Next.js edge/runtime doesn’t let us set here easily in RSC; fine for read use.
        },
        remove: (name: string, options: any) => {
          // same as above; fine for read use in RSC.
        }
      }
    }
  );
};
