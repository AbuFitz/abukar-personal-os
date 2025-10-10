'use client'
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card'

const equipment = [
  { id:'chest-press', name:'Chest Press (Machine)', muscles:['Chest','Shoulders','Triceps'], video:'https://www.youtube.com/embed/EU1Z2hS8QmE' },
  { id:'shoulder-press', name:'Shoulder Press (Machine)', muscles:['Shoulders','Triceps'], video:'https://www.youtube.com/embed/_9V-2V2z0Zc' },
  { id:'lat-pulldown', name:'Lat Pulldown', muscles:['Back','Biceps'], video:'https://www.youtube.com/embed/CAwf7n6Luuc' },
  { id:'leg-press', name:'Leg Press', muscles:['Quads','Glutes'], video:'https://www.youtube.com/embed/IZxyjW7MPJQ' },
]

export default function GymCoach(){
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(()=>setMounted(true),[]);
  if(!mounted) return null;

  return (
    <div className="container space-y-4">
      <Card>
        <CardHeader><CardTitle>Gym Coach — Machine Guide</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          {equipment.map(eq=>(
            <div key={eq.id} className="p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="font-medium">{eq.name}</div>
              <div className="text-xs opacity-70">Muscles: {eq.muscles.join(', ')}</div>
              <div className="aspect-video mt-2 rounded-xl overflow-hidden">
                <iframe className="w-full h-full" src={eq.video} title={eq.name} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen/>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
