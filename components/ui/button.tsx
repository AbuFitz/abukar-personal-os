import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'secondary' }
export function Button({ className='', variant='default', ...props }: Props){
  const variants = { default: 'bg-sky-500 hover:bg-sky-600 text-white', secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100' }
  return <button {...props} className={`px-3 py-2 rounded-xl text-sm ${variants[variant]} ${className}`} />
}
