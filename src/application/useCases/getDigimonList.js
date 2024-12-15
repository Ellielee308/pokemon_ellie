import { DigimonListItem } from "../../domain/models/DigimonListItem";
import { fetchDigimonListData } from "../../infrastructure/api/digimonApi";

export const getDigimonList = async (page) => {
  const { content, totalPages } = await fetchDigimonListData(page);
  const digimonList = content.map((item) => new DigimonListItem(item));
  return { digimonList, totalPages };
};
