'use client'

import { useRouter } from 'next/navigation'

export default function ConfirmHomeThekaButton({ id }: { id: string }) {
    const router = useRouter()

    return (
        <button
            type="button"
            className="text-white bg-green-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            onClick={() => {
                window.localStorage.setItem('homeTheka', id)
                router.back()
            }}
        >
            Set as home
        </button>
    )
}
