import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImagePlaceholder from "../../assets/no-image.png";
import DigimonDetailsHeader from "../../components/DigimonDetailsHeader";

function DigimonDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [digimonData, setDigimonData] = useState({});

  useEffect(() => {
    async function fetchDigimonData(id) {
      try {
        const url = `https://digi-api.com/api/v1/digimon/${id}`;
        const response = await fetch(url);
        const newDigimonData = await response.json();
        console.log(newDigimonData);
        setDigimonData(newDigimonData);
      } catch (error) {
        console.log("Failed to fetch specific Digimon data:", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDigimonData(id);
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="w-screen">
        <DigimonDetailsHeader id={id} />
        <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-2 md:py-8">
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-3xl text-white">
            Loading...
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen">
      <DigimonDetailsHeader id={id} />
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 px-4 py-4 md:px-10 md:py-8">
        {digimonData.name ? (
          <div className="flex flex-col items-center md:w-[768px]">
            <div className="flex flex-col items-center md:w-[768px] md:flex-row">
              <img
                className="aspect-square rounded-full object-cover md:w-1/2"
                src={
                  digimonData.images
                    ? digimonData.images[0].href
                    : ImagePlaceholder
                }
              />
              <div className="flex flex-col md:ml-12 md:w-1/2">
                <h2 className="mt-6 self-center font-oxanium text-3xl font-bold capitalize text-white md:self-start">
                  {digimonData.name}
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 font-oxanium text-xl text-white">
                  <p>Level</p>
                  {digimonData.levels.length > 0 ? (
                    <p>{digimonData.levels[0].level}</p>
                  ) : (
                    <p>None</p>
                  )}
                  <p>Type</p>
                  {digimonData.types.length > 0 ? (
                    <p>{digimonData.types[0].type}</p>
                  ) : (
                    <p>None</p>
                  )}
                  <p>Skills</p>
                  <div>
                    {digimonData.skills.length > 0 ? (
                      <span>
                        {digimonData.skills.map((skill, index) => (
                          <span key={skill.id}>
                            {skill.translation
                              ? skill.translation
                              : skill.skill}
                            {index < digimonData.skills.length - 1 && ", "}{" "}
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
                Description
              </p>
              <div className="mt-1 w-full border-b-2 border-b-white"></div>
              <p className="mt-4 font-oxanium text-lg text-white">
                {digimonData.descriptions?.length > 1
                  ? digimonData.descriptions[1].description
                  : "None"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-grow flex-col items-center justify-center font-oxanium text-white">
            <p className="mb-4 text-3xl">Oops! No Digimons available.</p>
            <Link
              to="/digimon?page=0"
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

export default DigimonDetails;
