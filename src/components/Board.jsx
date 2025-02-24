import { useGrid, useStore } from "hooks";
import { Deck } from "./Deck";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Board = () => {
  const difficulty = useStore(state => state.difficulty);
  const settings = useStore(state => state.settings);
  const gameState = useStore(state => state.gameState);
  const { minRows, minWidth, pairCount } = settings[difficulty];
  const cellCount = pairCount * 2;
  const { ref } = useGrid({ cellCount, minRows, minWidth });

  useGSAP(
    () => {
      if (gameState !== "playing") return;
      const children = ref.current?.children;
      const { offsetWidth, offsetHeight } = children[0];
      gsap.set(".deck-holder", { height: offsetHeight, width: offsetWidth });
      // gsap.from(children, { opacity: 0, stagger: 0.05 });
    },
    { scope: ref, dependencies: [gameState] }
  );

  return (
    <div
      className={`grid gap-1 p-1 content-center lg:gap-2 xl:w-9/12 h-screen overflow-x-clip mx-auto`}
      ref={ref}>
      <Deck />
      <div className="deck-holder absolute bottom-0 left-5/12 border-2 border-white" />
    </div>
  );
};
