import { createServerSupabase } from "../../lib/supabaseClient";
import LogWorkout from "../../components/LogWorkout";
import LogFinance from "../../components/LogFinance";

export default async function Dashboard() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: index } = await supabase
    .from("daily_index")
    .select("*")
    .eq("user_id", user?.id)
    .order("date", { ascending: false })
    .limit(7);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Becoming — Dashboard</h1>
      <section className="grid sm:grid-cols-3 gap-4">
        {index?.map((d) => (
          <div key={d.date} className="rounded-xl border border-white/10 p-4 bg-white/5">
            <div className="text-white/60 text-sm">{d.date}</div>
            <div className="mt-2 text-lg">Body: {d.body_score}</div>
            <div>Mind: {d.mind_score}</div>
            <div>Soul: {d.soul_score}</div>
            <div className="mt-1 font-semibold">Becoming: {d.becoming_index}</div>
          </div>
        ))}
      </section>

      <section className="grid md:grid-cols-2 gap-4">
        <LogWorkout />
        <LogFinance />
      </section>
    </main>
  );
}
