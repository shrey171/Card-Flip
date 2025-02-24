import { useStore } from "hooks/useStore";
import { Board } from "./Board";
import { Timer } from "./Timer";
import { useEffect } from "react";

export const Game = () => {
  const difficulty = useStore(state => state.difficulty);
  const settings = useStore(state => state.settings);
  const time = settings[difficulty].time;

  useEffect(() => {
    const handleBeforeUnload = e => e.preventDefault();
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      <Board />
      <Timer seconds={time} />
    </>
  );
};
