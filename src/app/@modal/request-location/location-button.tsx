'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function SetLocation() {
    const router = useRouter()

    function getLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                sessionStorage.setItem('lat', String(position.coords.latitude))
                sessionStorage.setItem('lng', String(position.coords.longitude))
                router.back()
            },
            (error) => {
                alert(
                    'We were unable to determine your location. Apologies for the inconvenience.'
                )
            },
            {}
        )
    }

    return (
        <button
            type="button"
            className="text-white bg-green-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            onClick={() => {
                getLocation()
            }}
        >
            Allow access
        </button>
    )
}
