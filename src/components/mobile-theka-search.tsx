"use client";

import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useRef} from "react";

import {NavigationArrow} from "@/components/icons";

export function MobileThekaSearch({pathNameOverride}: {pathNameOverride?: string}) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const searchRef = useRef<HTMLInputElement>(null)

    function search() {
        const input = searchRef.current;
        if (input) {
            const clonedSearchParams = new URLSearchParams(
                searchParams as unknown as URLSearchParams
            )
            clonedSearchParams.set('s', input.value)
            if (pathNameOverride) {
                router.push(`${pathNameOverride}?${clonedSearchParams.toString()}`)
            } else {
                router.replace(`${pathname}?${clonedSearchParams.toString()}`)
            }
        }
    }


    return (
        <div className={`m-8 bg-white rounded-lg shadow-lg p-4`}>
            <h1 className={`font-bold text-lg pb-4`}>Find thekas close to you and check their stock</h1>
            <div className={`relative flex items-center w-full h-12 rounded-md border border-slate-200 bg-white overflow-hidden dark:bg-slate-900 dark:border-slate-500 dark:border mb-4`}>
                <div className={`grid place-items-center h-full w-12 text-gray-300 dark:text-slate-100`}>
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
                    className={`h-full w-full outline-none text-sm text-gray-700 pr-2 dark:bg-slate-900 dark:text-slate-100`}
                    type="text"
                    id="search"
                    placeholder={`Where you at?`}
                    ref={searchRef}
                />
            </div>
            <button className={`bg-ddb w-full uppercase text-white rounded p-2 mb-4`} onClick={() => {search()}}>Find Alcohol</button>
            <Link className={`bg-gray-200 text-black w-full uppercase rounded p-2 flex justify-evenly`} href={`/thekas`}><NavigationArrow size={24} />Auto-detect my location</Link>
        </div>

    )
}