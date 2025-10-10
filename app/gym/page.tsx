'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'

export default function GymCoach(){
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(()=>setMounted(true),[]);
  if(!mounted) return null;

  return (
    <div className="container">
      <Card>
        <CardHeader><CardTitle>Gym Coach</CardTitle></CardHeader>
        <CardContent>Visual equipment guide comes here (static-ready).</CardContent>
      </Card>
    </div>
  )
}
