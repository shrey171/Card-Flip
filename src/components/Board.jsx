import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGrid, useStore } from "hooks";
import { Deck } from "./Deck";

export const Board = () => {
  const difficulty = useStore(state => state.difficulty);
  const settings = useStore(state => state.settings);
  const gameState = useStore(state => state.gameState);
  const setGameState = useStore(state => state.setGameState);
  const { minRows, minWidth, pairCount } = settings[difficulty];
  const cellCount = pairCount * 2;
  const { ref } = useGrid({ cellCount, minRows, minWidth });

  useGSAP(
    () => {
      if (gameState !== "animating-cards") return;
      const cards = gsap.utils.toArray(".card");
      const { offsetWidth, offsetHeight } = cards[0];
      // TODO Fix the fucking deck sitting at the top-left corner on load animation
      gsap.set(".stack", {
        width: offsetWidth,
        height: offsetHeight,
      });
      const stack = gsap.utils.toArray(".stack")[0];
      // cards.map(card => stack.appendChild(card))
      const state = Flip.getState(cards);
      // cards.map(card => ref.current.appendChild(card));
      Flip.from(state, {
        stagger: {
          amount: 1 + difficulty,
        },
        absolute: true,
        onComplete: () => {
          gsap.set(".card", { clearProps: "all" });
          setGameState("playing");
        },
      });
    },
    { scope: ref, dependencies: [gameState] }
  );

  return (
    <div
      ref={ref}
      className="grid gap-1 p-1 content-center lg:gap-2 xl:w-9/12 h-screen overflow-x-clip mx-auto">
      <Deck />
      <div className="stack border-2 hidden border-white absolute"></div>
    </div>
  );
};
