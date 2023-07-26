import Image from 'next/image'
import Link from "next/link";


export default async function Home() {
    return (
        <main className={`flex min-h-screen flex-col justify-evenly p-24 items-center`}>
            <Image
                src="/dd-logo.svg"
                alt="Dilli Daaru"
                className="dark:invert pb-4"
                width={160}
                height={24}
                priority
            />
            <Link href={`/daaru`} className={`bg-white px-12 py-12 rounded shadow-md text-center text-2xl uppercase w-full max-w-sm`}>Find your fix</Link>
            <Link href={`/thekas`} className={`bg-white px-12 py-12 rounded shadow-md text-center text-2xl uppercase w-full max-w-sm`}>Check
                local stock</Link>
        </main>

    )
}
