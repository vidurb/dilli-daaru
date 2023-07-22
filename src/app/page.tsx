import Image from 'next/image'


export default function Home() {
  return (


    <main className="flex min-h-screen flex-row items-top p-24">

      <div class="bg-white px-12 py-12 rounded shadow-md">
      <Image
              src="/dd-logo.svg"
              alt="Dilli Daaru"
              className="dark:invert"
              width={160}
              height={24}
              priority
            />

      <div class="section-title">SOFT</div>
      <div class="option"><input type="checkbox" id="wine" value="wine"/><label for="wine">Wine</label></div>
      <div class="option"><input type="checkbox" id="beer" value="beer"/><label for="beer">Beer</label></div>
      <div class="option"><input type="checkbox" id="alcopop" value="alcopop"/><label for="alcopop">Alcopop</label></div>
      <div class="option"><input type="checkbox" id="cider" value="cider"/><label for="cider">Cider</label></div>

      <div class="section-title">HARD</div>
      <div class="option"><input type="checkbox" id="gin" value="gin"/><label for="gin">Gin</label></div>
      <div class="option"><input type="checkbox" id="whiskey" value="whiskey"/><label for="whiskey">Whiskey</label></div>
      <div class="option"><input type="checkbox" id="vodka" value="vodka"/><label for="vodka">Vodka</label></div>
      <div class="option"><input type="checkbox" id="rum" value="rum"/><label for="rum">Rum</label></div>
      <div class="option"><input type="checkbox" id="tequila" value="tequila"/><label for="tequila">Tequila</label></div>
      <div class="option"><input type="checkbox" id="brandy" value="brandy"/><label for="brandy">Brandy</label></div>

      <div class="section-title">OTHER</div>
      <div class="option"><input type="checkbox" id="liqueur" value="liqueur"/><label for="liqueur">Liqueur</label></div>
      <div class="option"><input type="checkbox" id="misc" value="misc"/><label for="misc">Misc</label></div>
      
      <button>SELECT ALL</button>
      <button>DESELECT ALL</button>
      
      </div>


      <div class='max-w-md mx-auto'>
    <div class="relative flex items-center w-full h-12 rounded-md shadow-sm focus-within:shadow-lg bg-white overflow-hidden">
        <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>

        <input
        class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
        type="text"
        id="search"
        placeholder="What's your fix?" /> 
    </div>

    <div class="bg-white px-4 py-4 rounded shadow-md flex m-2">
    <Image
              src="/beer.svg"
              alt="beer"
              className="border rounded border-solid border-slate-300 inline mr-4"
              width={64}
              height={64}
              priority
            />

            <div>
              <div class="text-lg pb-1.5 leading-6">BREWHOLIK SMOKE PREMIUM STRONG BEER</div>
              <div class="bg-amber-900 text-white rounded inline-block px-1.5 py-0.5 mb-0.5">BEER</div><div class="text-slate-500 inline pl-3">3 thekas</div>
            </div>
    </div>

    <div class="bg-white px-4 py-4 rounded shadow-md flex m-2">
    <Image
              src="/wine.svg"
              alt="beer"
              className="border rounded border-solid border-slate-300 inline mr-4"
              width={64}
              height={64}
              priority
            />

            <div>
              <div class="text-lg pb-1.5 leading-6">SULA DINDORI RESERVE CHARDONNAY</div>
              <div class="bg-purple-700 text-white rounded inline-block px-1.5 py-0.5 mb-0.5">WINE</div><div class="text-slate-500 inline pl-3">3 thekas</div>
            </div>
    </div>



</div>






    </main>
  )
}
