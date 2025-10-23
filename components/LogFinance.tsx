"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LogFinance() {
  const supabase = createClient();
  const [type, setType] = useState<"income"|"expense"|"transfer">("expense");
  const [category, setCategory] = useState("Fuel");
  const [amount, setAmount] = useState("");

  async function save() {
    const { error } = await supabase.from("finance_transactions").insert({
      type, category, amount: Number(amount)
    });
    if (error) alert(error.message); else alert("Saved transaction");
  }
  return (
    <div className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-3">
      <div className="font-semibold">Log Finance</div>
      <select className="bg-black/40 border border-white/20 rounded px-3 py-2" value={type} onChange={(e)=>setType(e.target.value as any)}>
        <option>income</option><option>expense</option><option>transfer</option>
      </select>
      <input className="bg-black/40 border border-white/20 rounded px-3 py-2 w-full" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)} />
      <input className="bg-black/40 border border-white/20 rounded px-3 py-2 w-full" placeholder="Amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
      <button onClick={save} className="rounded bg-white text-black py-2 px-4 font-semibold">Save</button>
    </div>
  );
}
