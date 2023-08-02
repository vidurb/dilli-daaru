import Image from 'next/image'
import Link from 'next/link'

import HomeTheka from '@/app/home-theka'
import { BeerBottle,MapPin } from '@/components'

import styles from './home.module.css'

export default async function Home() {
    return (
        <main
            className={`flex min-h-screen flex-col gap-8 md:mx-36 sm:mx-8 items-center`}
        >
            <Image
                src="/dd-logo.svg"
                alt="Dilli Daaru"
                className="p-4"
                width={300}
                height={24}
                priority
            />

            <Link href={`/daaru`} className={styles.card}>
                <BeerBottle size={36} />
                Find by name
                <div class="text-slate-500 text-base pt-4">
                    Which thekas stock the alcohol you want?
                </div>
            </Link>
            <Link href={`/thekas`} className={styles.card}>
                <MapPin size={36} />
                Thekas near you
                <div class="text-slate-500 text-base pt-4">
                    Look through what your local theka has in stock
                </div>
            </Link>
            <HomeTheka />
            <div class="position-fixed left-0 right-0 bottom-0">
                made with 💛 by vidurb + gyanl
            </div>
        </main>
    )
}
