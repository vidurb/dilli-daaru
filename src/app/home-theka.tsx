'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from '@/app/home.module.css'

export default function HomeTheka() {
    const [homeTheka, setHomeTheka] = useState<string | null>(null)
    useEffect(() => {
        setHomeTheka(window.localStorage.getItem('homeTheka'))
    }, [setHomeTheka])

    if (homeTheka) {
        return (
            <Link href={`/thekas/${homeTheka}`} className={styles.card}>
                Check stock at your home theka
            </Link>
        )
    } else {
        return <></>
    }
}
