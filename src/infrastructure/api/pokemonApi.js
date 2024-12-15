export const fetchPokemonListData = async (pagination) => {
  const limit = 10;
  const offset = (pagination - 1) * limit;

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
  );
  const data = await response.json();
  console.log(data);
  const maxPage = Math.ceil(data.count / limit);
  const pokemonListItems = await Promise.all(
    data.results.map(async (item) => {
      const detailResponse = await fetch(item.url);
      const detailData = await detailResponse.json();

      return {
        name: item.name,
        image: detailData.sprites.front_default,
        id: detailData.id,
      };
    })
  );
  console.log(pokemonListItems);
  return {
    content: pokemonListItems,
    totalPages: maxPage,
  };
};

export const fetchPokemonDetailedData = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const pokemonData = await response.json();
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    images: pokemonData.sprites.front_default,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: pokemonData.types,
    abilities: pokemonData.abilities,
    stats: pokemonData.stats,
  };
};
