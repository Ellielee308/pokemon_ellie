import { Link } from "react-router-dom";

export function PokemonListHeader() {
  return (
    <div className="flex h-14 justify-center bg-orange-600 px-2 sm:px-12">
      <div className="flex w-full items-center justify-between md:w-[768px]">
        <h1 className="font-oxanium text-xl font-bold text-white">
          Pokémon Encyclopedia
        </h1>
        <Link
          to="/digimon?page=1"
          className="font-oxanium hidden h-6 rounded-2xl bg-white px-4 text-sm font-semibold leading-6 hover:bg-slate-100 md:block"
        >
          Go to Digimon Encyclopedia ➜
        </Link>
        <Link
          to="/digimon?page=1"
          className="font-oxanium h-6 rounded-2xl bg-white px-2 text-xs font-semibold leading-6 hover:bg-slate-100 md:hidden"
        >
          Digimon ➜
        </Link>
      </div>
    </div>
  );
}
