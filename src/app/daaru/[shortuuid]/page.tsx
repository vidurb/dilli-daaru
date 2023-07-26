import {translator} from "@/lib/uuid";
import {prisma} from "@/lib/db";
import Image from "next/image";
import {categoryImageMap} from "@/app/daaru/product-card";
import {Vendor} from "@prisma/client";
import {fetchAndUpdateVendors} from "@/app/api/availability/route";

export default async function Daaru({params}: { params: { shortuuid: string } }) {
    const uuid = translator.toUUID(params.shortuuid)
    const product = await prisma.product.findFirstOrThrow({where: {id: uuid}})
    const vendors: Vendor[] = await fetchAndUpdateVendors(product)
    return (
        <main className={"flex min-h-screen flex-row items-center p-24 justify-center"}>
            <div className="bg-white px-4 py-4 rounded shadow-sm ease-in-out duration-200 hover:shadow-md flex m-2">
                <Image
                    src={categoryImageMap[product.category]}
                    alt={product.category}
                    className="border rounded border-solid border-slate-300 inline mr-4"
                    width={64}
                    height={64}
                    priority
                />
                <div>
                    <div className="text-lg pb-1.5 leading-6 block">{product.name}</div>
                    <div
                        className="bg-purple-700 text-white rounded inline-block px-1.5 py-0.5 mb-0.5">{product.category}</div>
                    <ul className={"flex flex-col"}>
                        {vendors.map((vendor) => {
                            return (
                                <li className="text-slate-500 pl-3" key={vendor.id}>{vendor.name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </main>
    )
}

export const revalidate = 43200