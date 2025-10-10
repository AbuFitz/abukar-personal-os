import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Abukar — Personal OS',
  description: 'Upgrade • Enhance • Enjoy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800/40">
          <div className="container py-4 flex items-center justify-between">
            <div className="text-lg font-semibold">Abukar • Personal OS</div>
            <nav className="text-sm space-x-4">
              <Link href="/">Dashboard</Link>
              <Link href="/gym">Gym Coach</Link>
            </nav>
          </div>
        </header>
        <main className="py-6 min-h-[70vh]">{children}</main>
        <footer className="border-t border-slate-800/40 text-xs opacity-70 text-center py-6">
          © {new Date().getFullYear()} Abukar • Personal OS
        </footer>
      </body>
    </html>
  )
}
