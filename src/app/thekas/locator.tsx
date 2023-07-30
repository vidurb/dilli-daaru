'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Locator() {
    const searchParams = useSearchParams()!
    const router = useRouter()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // @ts-ignore: Next has to fix this
                const clonedSearchParams = new URLSearchParams(searchParams)
                clonedSearchParams.set('lat', String(position.coords.latitude))
                clonedSearchParams.set('lng', String(position.coords.longitude))
                router.push(`/thekas?${clonedSearchParams.toString()}`)
            },
            (error) => {
                console.log(error)
            },
            {}
        )
    }, [])
    return <></>
}
