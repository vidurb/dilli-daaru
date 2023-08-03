import Link from 'next/link'

import { MapPin } from '@/components'
import { ExtendedVendor } from '@/lib'

export default function VendorLocation({ vendor }: { vendor: ExtendedVendor }) {
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
                className={`hover:text-blue-500 hover:scale-110 ease-in-out`}
            >
                <MapPin size={24} />
            </Link>
        )
    }
    return null
}
