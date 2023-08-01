'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function ConfirmHomeThekaButton({ id }: { id: string }) {
    const router = useRouter()

    function setHomeTheka() {
        localStorage.setItem('homeTheka', id)
    }

    return (
        <button
            type="button"
            className="text-white bg-green-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            onClick={() => {
                setHomeTheka()
                router.back()
            }}
        >
            Set as home
        </button>
    )
}
