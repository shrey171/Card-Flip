import { useStore } from "hooks";
import { DifficultyCard } from "./DifficultyCard";
import { useGrid } from "hooks";

export const Home = () => {
  const settings = useStore(state => state.settings);
  const preMadeSettings = settings.slice(0, 4);
  const { ref } = useGrid({ cellCount: 4, minWidth: 150 });

  return (
    <div
      ref={ref}
      style={{ height: "100vh" }}
      className="gap-2 p-4 w-full 2xl:gap-4 xl:w-10/12 mx-auto place-content-center">
      {preMadeSettings.map(data => (
        <DifficultyCard key={data.id} {...data} />
      ))}
    </div>
  );
};
