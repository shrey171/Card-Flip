import { EndScreen } from "components/EndScreen";
import { Home } from "components/Home";
import { gsap } from "gsap";
import Flip from "gsap/Flip";
import { useStore } from "hooks";
import { useLayoutEffect } from "react";
import { Game } from "./components/Game";

export const App = () => {
  const gameState = useStore(state => state.gameState);
  const isGameOver = ["win", "lose"].includes(gameState);

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);
  }, []);

  return (
    <main className="bg-(image:--pattern) bg-center bg-no-repeat bg-cover h-screen overflow-hidden">
      {gameState === "setup" ? <Home /> : isGameOver ? <EndScreen /> : <Game />}
    </main>
  );
};
