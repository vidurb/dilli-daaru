import { Vendor } from '@prisma/client'
import { GeoJSON } from 'geojson'
import Link from 'next/link'

import { HouseLine, MapPin } from '@/components'
import { ExtendedVendor, translator } from '@/lib'

import styles from './thekas.module.css'

const regex = new RegExp(
    `POINT\((?<lat>\\d{1,2}\\.\\d+) (?<lng>\\d{1,2}\\.\\d+)\)`
)

function VendorLocation({
    vendor,
}: {
    vendor: Vendor & { location?: GeoJSON }
}) {
    if (vendor.location?.type === 'Point') {
        return (
            <Link
                href={`https://www.google.com/maps/search/?api=1&query=${
                    vendor.location.coordinates[1]
                },${vendor.location.coordinates[0]}${
                    vendor.gmapsPlaceId
                        ? '&query_place_id=' + vendor.gmapsPlaceId
                        : ''
                }`}
                className={``}
            >
                <MapPin size={24} />
            </Link>
        )
    }
    return null
}

export async function VendorCard({
    vendor,
    showHome,
}: {
    vendor: ExtendedVendor
    showHome?: boolean
}) {
    const showHomeButton = showHome ?? false
    return (
        <div className={styles.vendorCard}>
            <div className="flex flex-row justify-between items-center mb-2">
                <Link
                    className="text-lg leading-6 block"
                    href={`/thekas/${translator.fromUUID(vendor.id)}`}
                >
                    {vendor.name}
                </Link>
                {showHomeButton && (
                    <Link href={`/select-home-theka?id=${vendor.id}`}>
                        <HouseLine size={24} />
                    </Link>
                )}
                <VendorLocation vendor={vendor} />
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
