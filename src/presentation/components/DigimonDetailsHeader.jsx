import { useNavigate } from "react-router-dom";
import { ArrowGoBack } from "../../assets/icon";

export default function DigimonDetailsHeader({ id }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-14 justify-center bg-red-600 px-2 sm:px-12">
      <div className="flex w-full items-center justify-between md:w-[768px]">
        <div className="flex">
          <button
            onClick={handleGoBack}
            className="h-6 px-2 text-white transition-colors hover:text-slate-300 md:px-6"
          >
            <ArrowGoBack />
          </button>
          <h1 className="font-oxanium text-xl font-bold text-white">
            Digimon Encyclopedia
          </h1>
        </div>
        <p className="font-oxanium text-xl font-bold text-white">
          #{String(id).padStart(4, "0")}
        </p>
      </div>
    </div>
  );
}
