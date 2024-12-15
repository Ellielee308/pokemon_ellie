import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonDetails } from "../../../application/useCases/getPokemonDetails";
import ImagePlaceholder from "../../../assets/no-image.png";
import PokemonDetailsHeader from "../../components/PokemonDetailsHeader";

function PokemonDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    async function loadPokemonData(id) {
      try {
        setLoading(true);
        const pokemonDetails = await getPokemonDetails(id);
        setPokemonData(pokemonDetails);
      } catch (error) {
        console.log("Failed to fetch specific Pokemon data:", error.message);
        setPokemonData({});
      } finally {
        setLoading(false);
      }
    }
    loadPokemonData(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const maxStats = {
    hp: 300,
    attack: 200,
    defense: 250,
    speed: 250,
  };

  const statColors = {
    hp: "bg-[#d53a43]",
    attack: "bg-[#ffa42b]",
    defense: "bg-[#0191e3]",
    speed: "bg-[#8eb0c4]",
  };

  if (loading)
    return (
      <div className="w-screen">
        <PokemonDetailsHeader id={id} />
        <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-2 md:py-8">
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-3xl text-white">
            Loading...
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen">
      <PokemonDetailsHeader id={id} />
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 px-4 py-4 md:px-10 md:py-8">
        {pokemonData.name ? (
          <div className="flex flex-col items-center md:w-[768px]">
            <div className="flex flex-col items-center sm:flex-row md:w-[768px]">
              <img
                className="w-full rounded-full sm:w-1/2"
                src={pokemonData.images ? pokemonData.images : ImagePlaceholder}
              />
              <div className="flex w-[240px] flex-col sm:ml-12 sm:w-1/2">
                <h2 className="mt-6 self-center font-oxanium text-3xl font-bold capitalize text-white sm:self-start">
                  {pokemonData.name}
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 font-oxanium text-xl text-white">
                  <p>Height</p>
                  {pokemonData.height ? (
                    <p>{(pokemonData.height / 10).toFixed(1)} m</p>
                  ) : (
                    <p>None</p>
                  )}
                  <p>Weight</p>
                  {pokemonData.weight ? (
                    <p>{(pokemonData.weight / 10).toFixed(1)} kg</p>
                  ) : (
                    <p>None</p>
                  )}
                  <p>Type</p>
                  <div>
                    {pokemonData.types.length > 0 ? (
                      <span>
                        {pokemonData.types.map((type, index) => (
                          <span key={index}>
                            {type.type.name}
                            {index < pokemonData.types.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                  <p>Abilities</p>
                  <div>
                    {pokemonData.abilities.length > 0 ? (
                      <span>
                        {pokemonData.abilities.map((ability, index) => (
                          <span key={index}>
                            {ability.ability.name}
                            {index < pokemonData.abilities.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <p>None</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 w-full">
              <p className="text-center font-oxanium text-xl text-white">
                Base Stats
              </p>
              <div className="mt-1 w-full border-b-2 border-b-white"></div>
              <div className="mt-4 flex flex-col font-oxanium text-lg text-white">
                {[
                  { name: "HP", key: "hp" },
                  { name: "ATK", key: "attack" },
                  { name: "DEF", key: "defense" },
                  { name: "SPD", key: "speed" },
                ].map((stat) => {
                  const statData = pokemonData.stats.find(
                    (s) => s.stat.name === stat.key
                  );
                  const maxStat = maxStats[stat.key];
                  const percentage = statData
                    ? (statData.base_stat / maxStat) * 100
                    : 0;

                  return (
                    <div key={stat.key} className="mb-4 flex items-center">
                      <div className="mr-4 w-10">{stat.name}</div>
                      <div className="relative h-6 w-full rounded-3xl bg-gray-300">
                        {statData && (
                          <div
                            className={`absolute left-0 top-0 h-6 rounded-3xl ${statColors[stat.key]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        )}
                        {statData && (
                          <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
                            {statData.base_stat}/{maxStat}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-white">
            <p className="mb-4 text-3xl">Oops! No Pokémon available.</p>
            <Link
              to="/pokemon?page=0"
              className="rounded-2xl bg-white px-4 py-1 text-xl text-zinc-500 hover:cursor-pointer hover:bg-slate-200"
            >
              Go to First Page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
