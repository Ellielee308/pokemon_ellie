import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-zinc-800 px-12 py-36">
      <h1 className="font-oxanium text-2xl font-bold text-white">
        Welcome to the Pokémon x Digimon Encyclopedia!
      </h1>
      <div className="my-20 flex flex-col">
        <Link
          to="pokemon?page=1"
          className="font-oxanium rounded-2xl bg-blue-700 px-4 py-2 text-center text-lg font-bold text-yellow-500 transition-colors hover:bg-blue-900"
        >
          Go to Pokémon Encyclopedia ➜
        </Link>
        <Link
          to="digimon?page=1"
          className="font-oxanium mt-16 rounded-2xl bg-yellow-500 px-4 py-2 text-center text-lg font-bold text-blue-700 transition-colors hover:bg-yellow-600"
        >
          Go to Digimon Encyclopedia ➜
        </Link>
      </div>
    </div>
  );
}

export default Home;
