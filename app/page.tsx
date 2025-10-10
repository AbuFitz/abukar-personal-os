'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

export default function Page(){
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(()=>setMounted(true),[]);
  if(!mounted) return null;

  return (
    <div className="container space-y-4">
      <Card>
        <CardHeader><CardTitle>Dashboard</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm opacity-80">GitHub Pages build, styled with Tailwind.</div>
          <div className="space-x-2">
            <Badge>Faith</Badge>
            <Badge>Fitness</Badge>
            <Badge>Study</Badge>
            <Badge>Finance</Badge>
            <Badge>Trading</Badge>
            <Badge>Habits</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
