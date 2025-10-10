'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Badge } from '../components/ui/badge'
import { Progress } from '../components/ui/progress'
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'

function useLocal<T>(key:string, initial:T){
  const [mounted,setMounted]=React.useState(false)
  const [state,setState]=React.useState<T>(initial)
  React.useEffect(()=>{ setMounted(true); try{ const r=localStorage.getItem(key); if(r) setState(JSON.parse(r)) }catch{} },[key])
  React.useEffect(()=>{ if(mounted) try{ localStorage.setItem(key, JSON.stringify(state)) }catch{} },[mounted,key,state])
  return [state,setState] as const
}
function currency(n:number){ return n.toLocaleString('en-GB',{style:'currency',currency:'GBP', maximumFractionDigits:0}) }

export default function Page(){
  const [mounted,setMounted]=React.useState(false); React.useEffect(()=>setMounted(true),[]); if(!mounted) return null;

  const [salary,setSalary]=useLocal<number>('fin.salary',2200)
  const [bills,setBills]=useLocal<number>('fin.bills',450)
  const [target,setTarget]=useLocal<number>('fin.target',10000)
  const [months,setMonths]=useLocal<number>('fin.months',12)

  const [studyHrs,setStudyHrs]=useLocal<number>('study.hrs',0)
  const [note,setNote]=useLocal<string>('daily.note','One priority for today…')

  const free = Math.max(0, salary - bills)
  const needPerMonth = Math.ceil(target / months)
  const chart = Array.from({length: months}, (_,i)=>{
    const saved = Math.min(target, (i+1)*Math.round(free*0.35))
    return { name: new Date(0, i).toLocaleString('en-GB',{month:'short'}), Saved: saved, Target: (target/months)*(i+1) }
  })
  const progress = Math.min(100, Math.round((free*0.35)/needPerMonth*100))

  return (
    <div className="container space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Personal Growth Overview</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat label="Free cash / mo" value={currency(free)} />
              <Stat label="Save plan / mo" value={currency(needPerMonth)} />
              <Stat label="Study logged" value={`${studyHrs}h`} />
              <Stat label="Discipline mode" value="ON" />
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2}/>
                  <XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip />
                  <Area type="monotone" dataKey="Saved" stroke="#38bdf8" fill="url(#g1)" />
                  <Line type="monotone" dataKey="Target" stroke="#22c55e" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Today’s Plan</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {/* FIX 1: add event type for Textarea */}
            <Textarea value={note} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>)=>setNote(e.target.value)} />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm"><span>Savings adherence</span><span>{progress}%</span></div>
              <Progress value={progress}/>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Finance Planner</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid sm:grid-cols-4 gap-3">
              <Num label="Net salary / mo" value={salary} setValue={setSalary}/>
              <Num label="Bills / mo" value={bills} setValue={setBills}/>
              <Num label="Goal (£)" value={target} setValue={setTarget}/>
              <Num label="Months" value={months} setValue={setMonths}/>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Info title="Save each month" value={currency(needPerMonth)} />
              <Info title="Suggested save rate" value="35% of free cash" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Prayer Snapshot (London)</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row k="Fajr" v="06:00" />
            <Row k="Dhuhr" v="12:50" />
            <Row k="Asr" v="15:45" />
            <Row k="Maghrib" v="18:25" />
            <Row k="Isha" v="19:45" />
            <div className="text-xs opacity-60">For live timings, we’ll add an API later.</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Study — Cloud Path</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>AZ-900 — Azure Fundamentals (15h)</li>
              <li>AZ-104 — Azure Administrator (40h)</li>
              <li>AZ-305 — Azure Architect (40h)</li>
              <li>ITIL — Foundation (12h)</li>
            </ul>
            <div className="flex items-center gap-2">
              <Button onClick={()=>setStudyHrs(h=>h+0.5)}>+0.5h</Button>
              <Button onClick={()=>setStudyHrs(h=>h+1)}>+1h</Button>
              <Badge>Logged: {studyHrs}h</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Trading Rules</CardTitle></CardHeader>
          <CardContent className="text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Risk max 1% per trade</li>
              <li>Journal thesis before entry</li>
              <li>2 losses → walk away</li>
              <li>Only A+ setups you recognise</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Stat({label, value}:{label:string; value:string}){
  return <div className="rounded-xl p-3 bg-slate-900/40"><div className="text-xs opacity-70">{label}</div><div className="text-2xl font-semibold">{value}</div></div>
}
function Num({label, value, setValue}:{label:string; value:number; setValue:(n:number)=>void}){
  // FIX 2: add event type for Input
  return <div><div className="text-xs opacity-70 mb-1">{label}</div><Input type="number" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setValue(parseFloat(e.target.value||'0'))}/></div>
}
function Info({title, value}:{title:string; value:string}){
  return <div className="rounded-xl p-3 bg-slate-900/40"><div className="text-xs opacity-70">{title}</div><div className="text-xl font-semibold">{value}</div></div>
}
function Row({k,v}:{k:string; v:string}){
  return <div className="flex items-center justify-between bg-slate-900/40 rounded-xl p-2"><span>{k}</span><span className="badge">{v}</span></div>
}
