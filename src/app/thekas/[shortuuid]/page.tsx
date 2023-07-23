import {translator} from "@/lib/uuid";
import {prisma} from "@/lib/db";

export default async function Daaru({ params }: { params: { shortuuid: string } }) {
    const uuid = translator.toUUID(params.shortuuid)
    const vendor = await prisma.vendor.findFirstOrThrow({ where: { id: uuid } })

    return (
        <div>
            {JSON.stringify(vendor)}
        </div>
    )
}