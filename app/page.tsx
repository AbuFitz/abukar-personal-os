import { createServerSupabase } from "../lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerSupabase();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/auth");
  redirect("/dashboard");
}
