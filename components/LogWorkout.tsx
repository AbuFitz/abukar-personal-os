"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LogWorkout() {
  const supabase = createClient();
  const [focus, setFocus] = useState("other");
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("12,10,8");
  const [weight, setWeight] = useState("40,50,60");

  async function save() {
    const { data: w, error } = await supabase.from("workouts").insert({ focus }).select().single();
    if (error || !w) return alert(error?.message || "error");
    await supabase.from("workout_sets").insert({
      workout_id: w.id,
      exercise,
      reps: `{${reps}}`,
      weight: `{${weight}}`,
      sets: reps.split(",").length
    });
    alert("Saved workout");
  }

  return (
    <div className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-3">
      <div className="font-semibold">Log Workout</div>
      <select className="bg-black/40 border border-white/20 rounded px-3 py-2" value={focus} onChange={(e)=>setFocus(e.target.value)}>
        <option>push</option><option>pull</option><option>legs</option><option>upper</option><option>lower</option><option>full</option><option>other</option>
      </select>
      <input className="bg-black/40 border border-white/20 rounded px-3 py-2 w-full" placeholder="Exercise (e.g. Bench Press)" value={exercise} onChange={(e)=>setExercise(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <input className="bg-black/40 border border-white/20 rounded px-3 py-2" placeholder="Reps (e.g. 12,10,8)" value={reps} onChange={(e)=>setReps(e.target.value)} />
        <input className="bg-black/40 border border-white/20 rounded px-3 py-2" placeholder="Weight (e.g. 40,50,60)" value={weight} onChange={(e)=>setWeight(e.target.value)} />
      </div>
      <button onClick={save} className="rounded bg-white text-black py-2 px-4 font-semibold">Save</button>
    </div>
  );
}
