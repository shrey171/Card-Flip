import { useStore } from "hooks";
import { Game } from "./components/Game";
import { Home } from "components/Home";

export const App = () => {
  const gameState = useStore(state => state.gameState);
  console.log(' App ~ gameState', gameState)
  let content;
  if (gameState === "setup") content = <Home />;
  if (["idle", "loading","playing"].includes(gameState)) content = <Game />;
  if (gameState === "win") content = <div>You Win</div>;
  if (gameState === "lose") content = <div>Game Over</div>;

  return (
    <main className="bg-(image:--pattern) bg-no-repeat bg-cover h-screen">
      {content}
    </main>
  );
};
