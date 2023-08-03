import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'

import { HouseLine } from '@/components'
import { ModalBackButton } from '@/components/modal-back-button'
import { prisma, translator } from '@/lib'

const DynamicConfirmButton = dynamic(() => import('./confirm-button'), {
    ssr: false,
    loading: () => <Skeleton className={`w-20 h-4`} />,
})

const DynamicDeclineButton = dynamic(() => import('./decline-button'), {
    ssr: false,
    loading: () => <Skeleton className={`w-20 h-4`} />,
})

export default async function RequestLocation({
    searchParams: { id },
}: {
    searchParams: { id?: string }
}) {
    if (!id) {
        return notFound()
    }
    const vendor = await prisma.vendor.findUnique({ where: { id } })

    if (!vendor) {
        return notFound()
    }

    return (
        <div
            tabIndex={-1}
            className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-slate-800/25 flex justify-center items-center"
        >
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <ModalBackButton />
                    <div className="p-6 text-center">
                        <HouseLine size={64} className={`mx-auto mb-4`} />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Would you like to mark {vendor.name} as your home
                            theka?
                        </h3>
                        <p className="mb-5 font-normal text-gray-500 dark:text-gray-400">
                            We will store your selected theka in your browser
                            and display it on the home page on your next visit.
                        </p>
                        <DynamicConfirmButton id={id} />
                        <DynamicDeclineButton />
                    </div>
                </div>
            </div>
        </div>
    )
}
