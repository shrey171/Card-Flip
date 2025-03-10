import { useStore, useGrid } from "hooks";
import { DifficultyCard } from "./DifficultyCard";
import { useEffect } from "react";

export const Home = () => {
  const settings = useStore(state => state.settings);
  const preMadeSettings = settings.slice(0, 4);
  const { ref } = useGrid({ cellCount: 4, minWidth: 150 });

  useEffect(() => {
    const onLoad = () => {
      ref.current.style.visibility = "visible";
      // Preloading card's backface image
      const img = new Image();
      img.src = "/assets/images/test.jpg";
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div
      ref={ref}
      style={{ height: "100vh", visibility: "hidden" }}
      className="gap-2 p-4 w-full 2xl:gap-4 xl:w-10/12 mx-auto place-content-center">
      {preMadeSettings.map(data => (
        <DifficultyCard key={data.id} {...data} />
      ))}
    </div>
  );
};
