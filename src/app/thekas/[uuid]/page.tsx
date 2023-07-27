import { prisma } from '@/lib/db'
import { translator } from '@/lib/uuid'

export default async function Daaru({
    params: { uuid },
}: {
    params: { uuid: string }
}) {
    const vendor = await prisma.vendor.findFirstOrThrow({
        where: { id: uuid.includes('-') ? uuid : translator.toUUID(uuid) },
    })

    return <div>{JSON.stringify(vendor)}</div>
}
