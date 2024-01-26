import { useParams, useRouter } from 'next/navigation'

import { HouseLine } from '@/components/index'

export default function HomeButton({ id }: { id: string }) {
    const router = useRouter()
    const params = useParams()

    function setHomeTheka() {
        router.replace(`/select-home?id=${id}`)
    }

    if ('uuid' in params) {
        return (
            <HouseLine
                size={24}
                className={`hover:text-green-700 hover:scale-110 ease-in-out mr-2 cursor-pointer`}
                onClick={() => {
                    setHomeTheka()
                }}
            />
        )
    } else {
        return <></>
    }
}
