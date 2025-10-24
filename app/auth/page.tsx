"use client";
import { useState } from "react";
import { createClient } from "./lib/supabaseClient";

export default function AuthPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <main className="grid place-items-center h-screen p-6">
      <div className="w-full max-w-sm bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
        <h1 className="text-xl font-bold">Sign in to Becoming</h1>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/40 border border-white/20 rounded px-3 py-2"
        />
        <button
          onClick={signIn}
          className="w-full rounded bg-white text-black py-2 font-semibold"
        >
          Send Magic Link
        </button>
        {sent && <p className="text-sm text-white/60">Check your email.</p>}
      </div>
    </main>
  );
}
