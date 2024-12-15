import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPokemonList } from "../../../application/useCases/getPokemonList";
import { ArrowNext, ArrowPrevious } from "../../../assets/icon";
import { PokemonListHeader } from "../../components/PokemonListHeader";
import ImagePlaceholder from "../../../assets/no-image.png";

function PokemonList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [pokemonItems, setPokemonItems] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function loadPokemonData() {
      try {
        setLoading(true);
        const { pokemonList, totalPages } = await getPokemonList(currentPage);
        setPokemonItems(pokemonList);
        setMaxPage(totalPages);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        setPokemonItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadPokemonData();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePaginationChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  if (loading)
    return (
      <div className="w-screen">
        <PokemonListHeader />
        <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-2 md:py-8">
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-3xl text-white">
            Loading...
          </div>
        </div>
      </div>
    );
  return (
    <div className="w-screen">
      <PokemonListHeader />
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-3 md:py-8">
        {pokemonItems.length === 0 ? (
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-white">
            <p className="mb-4 text-3xl">Oops! No Pokémon available.</p>
            <button
              className="rounded-2xl bg-white px-4 py-1 text-xl text-zinc-500 hover:cursor-pointer hover:bg-slate-200"
              onClick={() => handlePaginationChange(1)}
            >
              Go to First Page
            </button>
          </div>
        ) : (
          <div className="mb-12 grid w-full grid-cols-2 gap-2 px-2 sm:gap-8 sm:px-12 md:w-[768px]">
            {pokemonItems.map((item) => (
              <Link
                to={`/pokemon/${item.id}`}
                key={item.id}
                className="flex w-full flex-col items-center justify-start rounded-lg bg-white px-2 py-4 transition-colors hover:bg-slate-100 md:h-80 md:w-full md:py-8"
              >
                <img
                  src={item.image ? item.image : ImagePlaceholder}
                  className="aspect-square w-1/2 object-contain"
                />
                <h3 className="mt-8 text-center font-oxanium text-base font-bold capitalize sm:text-lg md:text-xl">
                  {item.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center gap-12">
          <button
            className={`text-white transition-colors hover:cursor-pointer hover:text-slate-400 ${
              currentPage <= 1
                ? "text-gray-700 hover:cursor-not-allowed hover:text-gray-700"
                : ""
            }`}
            onClick={() => handlePaginationChange(Math.max(currentPage - 1, 1))}
          >
            <ArrowPrevious />
          </button>
          <p className="text-bold font-oxanium text-2xl text-white">
            {currentPage}
          </p>
          <button
            className={`text-white transition-colors hover:cursor-pointer hover:text-slate-400 ${
              currentPage >= maxPage
                ? "text-gray-700 hover:cursor-not-allowed hover:text-gray-700"
                : ""
            }`}
            onClick={() =>
              handlePaginationChange(Math.min(currentPage + 1, maxPage))
            }
            disabled={currentPage >= maxPage}
          >
            <ArrowNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PokemonList;
