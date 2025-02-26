import { useStore } from "hooks";
import { DifficultyCard } from "./DifficultyCard";

export const Home = () => {
  const settings = useStore(state => state.settings);
  const preMadeSettings = settings.slice(0, 4);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full text-gray-200 p-6 rounded-lg">
        <div className="text-center">
          {/* <h1 className="text-4xl font-bold">Flippy</h1> */}
        </div>
        <div className="flex flex-col items-center mt-6">
          {/* <p className="text-lg">Choose Difficulty</p> */}
          <div className="flex justify-center items-center gap-12 w-full mt-2">
            {preMadeSettings.map(data => (
              <DifficultyCard key={data.id} {...data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
