import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowNext, ArrowPrevious } from "../../assets/icon";
import ImagePlaceholder from "../../assets/no-image.png";

function PokemonList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [pokemonItems, setPokemonItems] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchPekomonData() {
      try {
        const limit = 10;
        const offset = (currentPage - 1) * limit;

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();
        console.log(data);

        setMaxPage(Math.ceil(data.count / limit));

        const newPokemonItems = await Promise.all(
          data.results.map(async (item) => {
            const detailResponse = await fetch(item.url);
            const detailData = await detailResponse.json();

            return {
              name: item.name,
              image: detailData.sprites.front_default,
              url: item.url,
            };
          })
        );
        console.log(newPokemonItems);
        setPokemonItems(newPokemonItems);
      } catch (error) {
        console.error("Failed to fetch Pokemon data:", error);
        setPokemonItems([]);
      }
    }

    fetchPekomonData();
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handlePaginationChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <div className="w-screen">
      <div className="flex h-14 justify-center bg-orange-600 px-2 sm:px-12">
        <div className="flex w-full items-center justify-between md:w-[880px]">
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
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-3 md:py-8">
        {pokemonItems.length === 0 ? (
          <div className="font-oxanium flex flex-grow flex-col items-center justify-center text-white">
            <p className="mb-4 text-3xl">Oops! No Pokémon available.</p>
            <button
              className="rounded-2xl bg-white px-4 py-1 text-xl text-zinc-500 hover:cursor-pointer hover:bg-slate-200"
              onClick={() => handlePaginationChange(1)}
            >
              Go to First Page
            </button>
          </div>
        ) : (
          <div className="mb-12 grid grid-cols-2 gap-2 px-2 sm:gap-8 sm:px-12 md:w-[880px]">
            {pokemonItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-start rounded-lg bg-white px-2 py-4 md:h-80 md:w-full md:py-8"
              >
                <img
                  src={item.image ? item.image : ImagePlaceholder}
                  className="aspect-square w-1/2 object-contain"
                />
                <h3 className="font-oxanium mt-8 text-center text-base font-bold sm:text-lg md:text-xl">
                  {item.name}
                </h3>
              </div>
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
          <p className="font-oxanium text-bold text-2xl text-white">
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
