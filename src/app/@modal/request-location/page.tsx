import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'

import { NavigationArrow } from '@/components'
import { ModalBackButton } from '@/components/modal-back-button'

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
    const router = useRouter()
    return (
        <div
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-800/25 flex justify-center items-center"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <ModalBackButton />
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
