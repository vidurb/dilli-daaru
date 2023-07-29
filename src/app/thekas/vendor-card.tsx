import { Product, Vendor } from '@prisma/client'

import styles from './thekas.module.css'

export async function VendorCard({
    vendor,
}: {
    vendor: Vendor & { products: Product[] }
}) {
    return (
        <div className={styles.vendorCard}>
            <div>
                <div className="text-lg pb-1.5 leading-6 block">
                    {vendor.name}
                </div>
                <div className="text-black inline pl-3">{vendor.address}</div>

                <div className="text-slate-500 inline pl-3">
                    {vendor.products?.length ?? 0} sharaabs
                </div>
            </div>
        </div>
    )
}

export default VendorCard
