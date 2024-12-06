import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowNext, ArrowPrevious } from "../../assets/icon";

function DigimonList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [pagination, setPagination] = useState(initialPage);
  const [digimonItems, setDigimonItems] = useState([]);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    async function fetchDigimonData() {
      try {
        const apiPage1 = (pagination - 1) * 2;
        const apiPage2 = apiPage1 + 1;

        const [firstHalfData, secondHalfData] = await Promise.all([
          fetch(`https://digi-api.com/api/v1/digimon?page=${apiPage1}`),
          fetch(`https://digi-api.com/api/v1/digimon?page=${apiPage2}`),
        ]);

        if (!firstHalfData.ok || !secondHalfData.ok) {
          throw new Error("Failed to fetch data from the API");
        }

        const firstHalfDigimonItems = await firstHalfData.json();
        const secondHalfDigimonItems = await secondHalfData.json();

        const newDigimonItems = [
          ...firstHalfDigimonItems.content,
          ...secondHalfDigimonItems.content,
        ];

        console.log(newDigimonItems);
        setDigimonItems(newDigimonItems);
        if (firstHalfDigimonItems.pageable) {
          const totalPages = firstHalfDigimonItems.pageable.totalPages;
          setMaxPage(Math.ceil(totalPages / 2));
        }
      } catch (error) {
        console.error("Failed to fetch Digimon data:", error.message);
        setDigimonItems([]);
      }
    }

    fetchDigimonData();
  }, [pagination]);

  const handlePaginationChange = (newPage) => {
    setPagination(newPage);
    setSearchParams({ page: newPage });
  };

  return (
    <div className="w-screen">
      <div className="flex h-14 justify-center bg-red-600 px-2 sm:px-12">
        <div className="flex w-full items-center justify-between md:w-[880px]">
          <h1 className="font-oxanium text-xl font-bold text-white">
            Digimon Encyclopedia
          </h1>
          <Link
            to="/pokemon?page=1"
            className="font-oxanium hidden h-6 rounded-2xl bg-white px-4 text-sm font-semibold leading-6 hover:bg-slate-100 md:block"
          >
            Go to Pokémon Encyclopedia ➜
          </Link>
          <Link
            to="/pokemon?page=1"
            className="font-oxanium h-6 rounded-2xl bg-white px-2 text-xs font-semibold leading-6 hover:bg-slate-100 md:hidden"
          >
            Pokémon ➜
          </Link>
        </div>
      </div>
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-3 md:py-8">
        {digimonItems.length === 0 ? (
          <div className="font-oxanium flex flex-grow flex-col items-center justify-center text-white">
            <p className="mb-4 text-3xl">Oops! No Digimons available.</p>
            <button
              className="rounded-2xl bg-white px-4 py-1 text-xl text-zinc-500 hover:cursor-pointer hover:bg-slate-200"
              onClick={() => {
                setPagination(1);
                setSearchParams({ page: 1 });
              }}
            >
              Go to First Page
            </button>
          </div>
        ) : (
          <div className="mb-12 grid grid-cols-2 gap-2 px-2 sm:gap-8 sm:px-12 md:w-[880px]">
            {digimonItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-start rounded-lg bg-white px-2 py-4 md:h-80 md:w-full md:py-8"
              >
                <img
                  src={item.image}
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
              pagination <= 1
                ? "text-gray-700 hover:cursor-not-allowed hover:text-gray-700"
                : ""
            }`}
            onClick={() => handlePaginationChange(Math.max(pagination - 1, 1))}
          >
            <ArrowPrevious />
          </button>
          <p className="font-oxanium text-bold text-2xl text-white">
            {pagination}
          </p>
          <button
            className={`text-white transition-colors hover:cursor-pointer hover:text-slate-400 ${
              pagination >= maxPage
                ? "text-gray-700 hover:cursor-not-allowed hover:text-gray-700"
                : ""
            }`}
            onClick={() =>
              handlePaginationChange(Math.min(pagination + 1, maxPage))
            }
            disabled={pagination >= maxPage}
          >
            <ArrowNext />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DigimonList;
