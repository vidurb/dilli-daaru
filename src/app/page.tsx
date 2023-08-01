import Image from 'next/image'
import Link from 'next/link'

import HomeTheka from '@/app/home-theka'

import styles from './home.module.css'

export default async function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col justify-evenly px-2 sm:px-0 items-center`}
        >
            <Image
                src="/dd-logo.svg"
                alt="Dilli Daaru"
                className="dark:invert"
                width={160}
                height={24}
                priority
            />
            <Link href={`/daaru`} className={styles.card}>
                Find your fix
            </Link>
            <Link href={`/thekas`} className={styles.card}>
                Check local stock
            </Link>
            <HomeTheka />
        </main>
    )
}
