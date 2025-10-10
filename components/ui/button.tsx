import * as React from 'react'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default'|'secondary' }
export function Button({ className='', variant='default', ...props }: Props){
  const base = variant==='secondary' ? 'btn-secondary' : 'btn'
  return <button {...props} className={`${base} ${className}`} />
}
