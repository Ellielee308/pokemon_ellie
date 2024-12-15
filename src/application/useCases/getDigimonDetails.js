import { DigimonDetails } from "../../domain/models/DigimonDetails";
import { fetchDigimonDetailedData } from "../../infrastructure/api/digimonApi";

export const getDigimonDetails = async (id) => {
  try {
    const data = await fetchDigimonDetailedData(id);
    const digimonDetails = new DigimonDetails(data);

    return digimonDetails;
  } catch (error) {
    console.error("Failed to fetch Digimon details:", error.message);
    throw error;
  }
};
