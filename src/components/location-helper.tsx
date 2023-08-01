'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LocationHelper() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        if (!(searchParams.has('lat') && searchParams.has('lng'))) {
            const tempDecline = sessionStorage.getItem('locationDeclined')
            const permanentDecline = localStorage.getItem('locationDeclined')
            if (!(tempDecline || permanentDecline)) {
                const lat = Number(sessionStorage.getItem('lat'))
                const lng = Number(sessionStorage.getItem('lng'))
                if (lat && lng) {
                    const clonedSearchParams = new URLSearchParams(
                        searchParams as unknown as URLSearchParams
                    )
                    clonedSearchParams.set('lat', String(lat))
                    clonedSearchParams.set('lng', String(lng))
                    router.push(`${pathname}?${clonedSearchParams.toString()}`)
                } else {
                    router.push('/request-location')
                }
            }
        }
    }, [router, searchParams, pathname])

    return <></>
}
