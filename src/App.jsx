import { useStore } from "hooks";
import { Game } from "./components/Game";
import { Home } from "components/Home";
import { useLayoutEffect } from "react";
import Flip from "gsap/Flip";
import { gsap } from "gsap";

export const App = () => {
  const gameState = useStore(state => state.gameState);
  let content;
  const activeGameStates = ["creating-deck", "animating-cards", "playing"];

  if (activeGameStates.includes(gameState)) content = <Game />;
  else if (gameState === "setup") content = <Home />;
  else if (gameState === "win")
    content = <div className="text-3xl text-white">You Win</div>;
  else if (gameState === "lose")
    content = <div className="text-3xl text-white">Game Over</div>;

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  return (
    <main className="bg-(image:--pattern) bg-no-repeat bg-cover h-screen">
      {content}
    </main>
  );
};
