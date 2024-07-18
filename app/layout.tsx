
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '@/common-components/header-components/Logo';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vitsinco',
  description: 'Generated by Vitcinoc',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <Logo/>
        {children}
       
        </body>
    </html>
  )
}