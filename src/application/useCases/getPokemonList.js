import { PokemonListItem } from "../../domain/models/PokemonListItem";
import { fetchPokemonListData } from "../../infrastructure/api/pokemonApi";

export const getPokemonList = async (page) => {
  const { content, totalPages } = await fetchPokemonListData(page);
  const pokemonList = content.map((item) => new PokemonListItem(item));
  return { pokemonList, totalPages };
};
