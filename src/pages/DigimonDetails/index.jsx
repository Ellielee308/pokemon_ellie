import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowGoBack } from "../../assets/icon";
import ImagePlaceholder from "../../assets/no-image.png";

function DigimonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className="w-screen">
        <div className="flex h-14 justify-center bg-red-600 px-2 sm:px-12">
          <div className="flex w-full items-center justify-between md:w-[768px]">
            <div className="flex">
              <button
                onClick={handleGoBack}
                className="h-6 px-4 text-white transition-colors hover:text-slate-300"
              >
                <ArrowGoBack />
              </button>
              <h1 className="font-oxanium text-xl font-bold text-white">
                Digimon Encyclopedia
              </h1>
            </div>
            <p className="font-oxanium text-xl font-bold text-white">{`#${id}`}</p>
          </div>
        </div>
        <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 py-2 md:py-8">
          <div className="font-oxanium flex flex-grow flex-col items-center justify-center text-3xl text-white">
            Loading...
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-screen">
      <div className="flex h-14 justify-center bg-red-600 px-2 sm:px-12">
        <div className="flex w-full items-center justify-between md:w-[768px]">
          <div className="flex">
            <button
              onClick={handleGoBack}
              className="h-6 px-4 text-white transition-colors hover:text-slate-300"
            >
              <ArrowGoBack />
            </button>
            <h1 className="font-oxanium text-xl font-bold text-white">
              Digimon Encyclopedia
            </h1>
          </div>
          <p className="font-oxanium text-xl font-bold text-white">{`#${id}`}</p>
        </div>
      </div>
      <div className="flex h-fit min-h-[calc(100vh-56px)] w-full flex-col items-center justify-between bg-zinc-800 px-4 py-4 md:px-10 md:py-8">
        {digimonData.name ? (
          <div className="flex flex-col items-center md:w-[768px]">
            <div className="flex flex-col items-center md:w-[768px] md:flex-row">
              <img
                className="rounded-full md:w-1/2"
                src={
                  digimonData.images
                    ? digimonData.images[0].href
                    : ImagePlaceholder
                }
              />
              <div className="flex flex-col md:ml-12 md:w-1/2">
                <h2 className="font-oxanium mt-6 text-3xl font-bold text-white">
                  {digimonData.name}
                </h2>
                <div className="font-oxanium mt-8 grid grid-cols-2 gap-4 text-xl text-white">
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
              <p className="font-oxanium text-xl text-white">Description</p>
              <div className="mt-1 w-full border-b-2 border-b-white"></div>
              <p className="font-oxanium mt-4 text-lg text-white">
                {digimonData.descriptions?.length > 1
                  ? digimonData.descriptions[1].description
                  : "None"}
              </p>
            </div>
          </div>
        ) : (
          <div className="font-oxanium flex flex-grow flex-col items-center justify-center text-white">
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
