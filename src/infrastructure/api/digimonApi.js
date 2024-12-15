export const fetchDigimonListData = async (pagination) => {
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
  console.log(firstHalfDigimonItems);
  console.log(firstHalfDigimonItems.pageable);

  return {
    content: [
      ...firstHalfDigimonItems.content,
      ...secondHalfDigimonItems.content,
    ],
    totalPages: Math.ceil(firstHalfDigimonItems.pageable.totalPages / 2),
  };
};

export const fetchDigimonDetailedData = async (id) => {
  const url = `https://digi-api.com/api/v1/digimon/${id}`;
  const response = await fetch(url);
  const digimonData = await response.json();
  return {
    id: digimonData.id,
    name: digimonData.name,
    images: digimonData.images,
    levels: digimonData.levels,
    types: digimonData.types,
    skills: digimonData.skills,
    descriptions: digimonData.descriptions,
  };
};
