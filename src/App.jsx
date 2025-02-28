import { useStore } from "hooks";
import { Game } from "./components/Game";
import { Home } from "components/Home";
import { useLayoutEffect } from "react";
import Flip from "gsap/Flip";
import { gsap } from "gsap";

export const App = () => {
  const gameState = useStore(state => state.gameState);

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  return (
    <main className="bg-(image:--pattern) bg-center bg-no-repeat bg-cover h-screen overflow-hidden">
      {gameState === "setup" ? <Home /> : <Game />}
    </main>
  );
};
