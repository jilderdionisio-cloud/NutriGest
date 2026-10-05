import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Footer from '../../home/components/Footer'

const links = [
  { label: 'Inicio', to: '/' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contáctanos', to: '/contacto' },
]

export function PublicHeader() {
  const [open, setOpen] = useState(false)
  return <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur"><div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between px-5 lg:px-8"><Link to="/" className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)] no-underline">Nutri<span className="text-[var(--color-accent)]">Gest</span></Link><nav className="hidden items-center gap-6 md:flex" aria-label="Navegación pública">{links.map((item)=><NavLink key={item.to} to={item.to} className={({isActive})=>`text-sm font-semibold no-underline ${isActive?'text-[var(--color-primary)]':'text-[var(--color-muted)] hover:text-[var(--color-primary)]'}`}>{item.label}</NavLink>)}<Link to="/login" className="rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-bold text-white no-underline">Iniciar sesión</Link></nav><button type="button" className="grid h-11 w-11 place-items-center rounded-xl text-[var(--color-primary)] md:hidden" aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} onClick={()=>setOpen((value)=>!value)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav className="grid border-t border-[var(--color-border)] px-5 py-3 md:hidden" aria-label="Navegación móvil">{links.map((item)=><Link key={item.to} to={item.to} onClick={()=>setOpen(false)} className="py-3 font-semibold text-[var(--color-muted)] no-underline">{item.label}</Link>)}<Link to="/login" onClick={()=>setOpen(false)} className="mt-2 rounded-full bg-[var(--color-primary)] px-5 py-3 text-center font-bold text-white no-underline">Iniciar sesión</Link></nav>}</header>
}

export default function PublicLayout({ children }) { return <div className="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-text)]"><PublicHeader/><main className="flex-1">{children}</main><Footer/></div> }
