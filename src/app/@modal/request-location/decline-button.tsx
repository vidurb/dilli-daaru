'use client'

import { useRouter } from 'next/navigation'

export default function DeclineLocationButton() {
    const router = useRouter()

    function markLocationDeclined() {
        sessionStorage.setItem('locationDeclined', 'true')
    }

    return (
        <button
            type="button"
            onClick={() => {
                markLocationDeclined()
                router.back()
            }}
            className="text-gray-500 bg-slate-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
            Not this time
        </button>
    )
}
