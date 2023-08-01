'use client'

import Link from 'next/link'

import styles from '@/app/home.module.css'

export default function HomeTheka() {
    const homeTheka = localStorage.getItem('homeTheka')

    if (homeTheka) {
        ;<Link href={`/thekas/${homeTheka}`} className={styles.card}>
            Check stock at your home theka
        </Link>
    } else {
        return <></>
    }
}
