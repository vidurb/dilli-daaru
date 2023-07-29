'use client'

import { useEffect } from 'react'

export default function Locator() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
            },
            (error) => {
                console.log(error)
            },
            {}
        )
    }, [])
    return <div>Requesting your location...</div>
}
