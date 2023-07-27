import './globals.css'

import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'

const jbm = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dilli Daaru',
    description: 'Dilliwaale ke liye',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={jbm.className}>{children}</body>
        </html>
    )
}
