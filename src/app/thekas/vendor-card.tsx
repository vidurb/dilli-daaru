import { Vendor } from '@prisma/client'
import Link from 'next/link'

import { translator } from '@/lib'

import styles from './thekas.module.css'

export async function VendorCard({ vendor }: { vendor: Vendor }) {
    return (
        <div className={styles.vendorCard}>
            <div>
                <Link
                    className="text-lg pb-1.5 leading-6 block"
                    href={`/thekas/${translator.fromUUID(vendor.id)}`}
                >
                    {vendor.name}
                </Link>
                <div className="text-slate-500 inline pl-3">
                    {vendor.address}
                </div>
            </div>
        </div>
    )
}

export default VendorCard
