import * as React from 'react'
export function Card({ className='', children }: any){ return <div className={`card ${className}`}>{children}</div> }
export function CardHeader({ children }: any){ return <div className="px-4 pt-4">{children}</div> }
export function CardTitle({ className='', children }: any){ return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3> }
export function CardContent({ className='', children }: any){ return <div className={`px-4 pb-4 ${className}`}>{children}</div> }
