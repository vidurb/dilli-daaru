import dynamic from 'next/dynamic'
import Skeleton from 'react-loading-skeleton'

import { NavigationArrow } from '@/components'

const DynamicLocationButton = dynamic(() => import('./location-button'), {
    ssr: false,
    loading: () => <Skeleton className={`w-20 h-4`} />,
})

const DynamicDeclineButton = dynamic(() => import('./decline-button'), {
    ssr: false,
    loading: () => <Skeleton className={`w-20 h-4`} />,
})

const DynamicPermanentDeclineButton = dynamic(
    () => import('./permanent-decline-button'),
    {
        ssr: false,
        loading: () => <Skeleton className={`w-20 h-4`} />,
    }
)

export default function RequestLocation() {
    return (
        <div
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-800/25 flex justify-center items-center"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        <NavigationArrow size={64} className={`mx-auto mb-4`} />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Would you like to allow location access?
                        </h3>
                        <p className="mb-5 font-normal text-gray-500 dark:text-gray-400">
                            We use your location to determine which thekas are
                            closest to you and do not store the location or
                            transmit it to any third parties.
                        </p>
                        <DynamicLocationButton />
                        <DynamicDeclineButton />
                        <DynamicPermanentDeclineButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
