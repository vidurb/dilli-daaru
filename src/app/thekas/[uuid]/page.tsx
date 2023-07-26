import {translator} from "@/lib/uuid";
import {prisma} from "@/lib/db";

export default async function Daaru({ params: {uuid} }: { params: { uuid: string } }) {
    const vendor = await prisma.vendor.findFirstOrThrow({ where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) } })

    return (
        <div>
            {JSON.stringify(vendor)}
        </div>
    )
}