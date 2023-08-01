import { redirect } from 'next/navigation'

import ConfirmHomeThekaButton from '@/app/@modal/select-home-theka/confirm-button'
import DeclineHomeThekaButton from '@/app/@modal/select-home-theka/decline-button'
import { HouseLine } from '@/components'
import { ModalBackButton } from '@/components/modal-back-button'
import { prisma, translator } from '@/lib'

export default async function RequestLocation({
    searchParams: { id },
}: {
    searchParams: { id: string }
}) {
    if (!id) {
        redirect('/')
    }
    const vendor = await prisma.vendor.findUnique({
        where: { id: id.includes('-') ? id : translator.toUUID(id) },
    })
    if (!vendor) {
        redirect('/')
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
                        <DeclineHomeThekaButton />
                        <ConfirmHomeThekaButton id={id} />
                    </div>
                </div>
            </div>
        </div>
    )
}
