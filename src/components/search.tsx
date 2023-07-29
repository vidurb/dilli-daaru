'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Search({ path }: { path: string }) {
    const router = useRouter()
    const searchParams = useSearchParams()!

    function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            // @ts-ignore: Next has to fix this
            const clonedSearchParams = new URLSearchParams(searchParams)
            clonedSearchParams.set('s', (e.target as HTMLInputElement).value)
            router.push(`/${path}?${clonedSearchParams.toString()}`)
        }
    }

    return (
        <div className="relative flex items-center w-full h-12 rounded-md shadow-sm focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="What's your fix?"
                onKeyDown={handleSearch}
            />
        </div>
    )
}
