'use client'

import React from 'react'
import {
  ResponsiveContainer,
  AreaChart, Area,
  CartesianGrid, XAxis, YAxis, Tooltip, Line
} from 'recharts'

// If anything goes wrong, render a harmless fallback (no page crash)
export default function ChartSavings({
  data,
}: {
  data: Array<{ name: string; Saved: number; Target: number }>
}) {
  const [ok, setOk] = React.useState(true)
  if (!ok) {
    return (
      <div className="h-44 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-center text-xs opacity-70">
        Chart unavailable
      </div>
    )
  }
  try {
    return (
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="Saved" stroke="#38bdf8" fill="url(#g1)" />
            <Line type="monotone" dataKey="Target" stroke="#22c55e" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    )
  } catch (e) {
    console.error('Chart error:', e)
    setOk(false)
    return null
  }
}
