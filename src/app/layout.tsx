import './global.css'

import {Analytics} from '@vercel/analytics/react'
import type {Metadata} from 'next'
import {JetBrains_Mono} from 'next/font/google'
import Image from "next/image";

import styles from "@/app/home.module.css";
import {DesktopDaaruSearch} from "@/components";

const jbm = JetBrains_Mono({subsets: ['latin'], display: 'swap', variable: '--font-jetbrains-mono'})

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
        <html lang="en" className={`${jbm.variable}`}>
        <body>
        <header className={styles.header}>
            <div className={styles.logo}>
                <Image
                    src="/dd-logo-alt.svg"
                    alt="Dilli Daaru"
                    priority
                    width={165}
                    height={88}
                />
            </div>
            <div className={styles.search}>
                <DesktopDaaruSearch placeholder={`What's your fix?`}/>
            </div>
            <div className={styles.ticker}>
                <div className={styles.tickerText}>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru ·&nbsp;</span>
                    <span>dilli daaru</span>
                </div>
            </div>
        </header>

        {children}
        {modal}
        <Analytics/>
        </body>
        </html>
    )
}
