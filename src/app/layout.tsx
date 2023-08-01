import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jbm = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dilli Daaru',
    description: 'Dilliwaale ke liye',
}

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={jbm.className}>
                {children}
                {modal}
                <Analytics />
            </body>
        </html>
    )
}
