import Image from 'next/image'
import {ProductCategory} from "@prisma/client";
import {getRandomProducts, prisma} from "@/lib/db";
import {ProductCard} from "@/components";


export default async function Home() {
    const products = await prisma.product.findMany()
    return (


        <main className="flex min-h-screen flex-row items-top p-24">

            <div className="bg-white px-12 py-12 rounded shadow-md">
                <Image
                    src="/dd-logo.svg"
                    alt="Dilli Daaru"
                    className="dark:invert pb-4"
                    width={160}
                    height={24}
                    priority
                />

                <div className="section-title">SOFT</div>
                <div className="option"><input type="checkbox" id={ProductCategory.WINE} value={ProductCategory.WINE} defaultChecked={true}/><label htmlFor="wine">Wine</label></div>
                <div className="option"><input type="checkbox" id="beer" value="beer" defaultChecked={true}/><label htmlFor="beer">Beer</label></div>
                <div className="option"><input type="checkbox" id="alcopop" value="alcopop" defaultChecked={true}/><label
                    htmlFor="alcopop">Alcopop</label></div>
                <div className="option"><input type="checkbox" id="cider" value="cider" defaultChecked={true}/><label htmlFor="cider">Cider</label>
                </div>

                <div className="section-title">HARD</div>
                <div className="option"><input type="checkbox" id="gin" value="gin" defaultChecked={true}/><label htmlFor="gin">Gin</label></div>
                <div className="option"><input type="checkbox" id="whiskey" value="whiskey" defaultChecked={true}/><label
                    htmlFor="whiskey">Whiskey</label></div>
                <div className="option"><input type="checkbox" id="vodka" value="vodka" defaultChecked={true}/><label htmlFor="vodka">Vodka</label>
                </div>
                <div className="option"><input type="checkbox" id="rum" value="rum" defaultChecked={true}/><label htmlFor="rum">Rum</label></div>
                <div className="option"><input type="checkbox" id="tequila" value="tequila" defaultChecked={true}/><label
                    htmlFor="tequila">Tequila</label></div>
                <div className="option"><input type="checkbox" id="brandy" value="brandy" defaultChecked={true}/><label
                    htmlFor="brandy">Brandy</label></div>

                <div className="section-title">OTHER</div>
                <div className="option"><input type="checkbox" id="liqueur" value="liqueur" defaultChecked={true}/><label
                    htmlFor="liqueur">Liqueur</label></div>
                <div className="option"><input type="checkbox" id="other" value="other" defaultChecked={true}/><label htmlFor="other">Other</label></div>

                <button>SELECT ALL</button>
                <button>DESELECT ALL</button>

            </div>


            <div className='max-w-md mx-auto'>
                <div
                    className="relative flex items-center w-full h-12 rounded-md shadow-sm focus-within:shadow-lg bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>

                    <input
                        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                        type="text"
                        id="search"
                        placeholder="What's your fix?"/>

                </div>
                {products.map((product) => ProductCard({product}))}
            </div>
        </main>
    )
}
