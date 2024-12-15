import { PokemonDetails } from "../../domain/models/PokemonDetails";
import { fetchPokemonDetailedData } from "../../infrastructure/api/pokemonApi";

export const getPokemonDetails = async (id) => {
  try {
    const data = await fetchPokemonDetailedData(id);
    const pokemonDetails = new PokemonDetails(data);
    return pokemonDetails;
  } catch (error) {
    console.error("Failed to fetch Pokemon details:", error.message);
    throw error;
  }
};
