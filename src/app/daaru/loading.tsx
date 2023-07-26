import Skeleton from "react-loading-skeleton";

export default function Loading() {
    return (
        <main className="flex min-h-screen flex-row  items-top p-24">
            <div className="rounded shadow-md w-full max-w-xs">
                <Skeleton className={"w-full h-full"} />
            </div>
            <div className='max-w-md w-full flex flex-col justify-center mx-auto'>
                <Skeleton className={"h-12 mx-2"} />
                <Skeleton containerClassName={"flex-1 px-2"} className={"m-2 h-28"} count={5}/>
            </div>
        </main>
    )
}