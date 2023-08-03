'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function LocationHelper() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    function isAlreadyDeclined() {
        const tempDecline = window.sessionStorage.getItem('locationDeclined')
        const permanentDecline = window.localStorage.getItem('locationDeclined')
        return tempDecline || permanentDecline
    }

    useEffect(() => {
        if (!(searchParams.has('lat') && searchParams.has('lng'))) {
            if (isAlreadyDeclined()) {
                return
            }
            navigator.permissions
                .query({ name: 'geolocation' })
                .then((result) => {
                    if (result.state === 'granted') {
                        navigator.geolocation.getCurrentPosition(
                            (position) => {
                                window.sessionStorage.setItem(
                                    'lat',
                                    String(position.coords.latitude)
                                )
                                window.sessionStorage.setItem(
                                    'lng',
                                    String(position.coords.longitude)
                                )
                                const clonedSearchParams = new URLSearchParams(
                                    searchParams as unknown as URLSearchParams
                                )
                                clonedSearchParams.set(
                                    'lat',
                                    String(position.coords.latitude)
                                )
                                clonedSearchParams.set(
                                    'lng',
                                    String(position.coords.longitude)
                                )
                                router.push(
                                    `${pathname}?${clonedSearchParams.toString()}`
                                )
                            },
                            (error) => {
                                window.sessionStorage.setItem(
                                    'locationDeclined',
                                    'true'
                                )
                            },
                            {}
                        )
                    } else if (result.state === 'prompt') {
                        router.push('/request-location')
                    }
                })
        }
    }, [router, searchParams, pathname])

    return <></>
}
