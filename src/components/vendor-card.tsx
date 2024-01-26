'use client'

import Link from 'next/link'

import VendorLocation from '@/app/thekas/location-button'
import HomeButton from '@/components/home-button'
import { ExtendedVendor, translator } from '@/lib'
import styles from '@/styles/vendor-card.module.css'

export async function VendorCard({
    vendor,
    showHome,
    titleLink,
}: {
    vendor: ExtendedVendor
    showHome?: boolean
    titleLink?: boolean
}) {
    const showHomeButton = showHome ?? false
    return (
        <div className={styles.vendorCard}>
            <div className="flex flex-row justify-between items-center mb-2">
                {titleLink ?? false ? (
                    <Link
                        className="text-lg leading-6 block"
                        href={`/thekas/${translator.fromUUID(vendor.id)}`}
                    >
                        {vendor.name}
                    </Link>
                ) : (
                    <h1 className="text-lg leading-6 block">{vendor.name}</h1>
                )}

                <div className={`flex flex-row`}>
                    {showHomeButton && <HomeButton id={vendor.id} />}
                    <VendorLocation vendor={vendor} />
                </div>
            </div>
            <div className="text-slate-500 inline col-span-2">
                {vendor.address}
            </div>
            {vendor.dist_meters && (
                <div className="text-slate-500 inline col-span-2">
                    {vendor.dist_meters.toFixed(0)} meters away
                </div>
            )}
        </div>
    )
}

export default VendorCard
