import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { useGrid, useStore } from "hooks";
import { Deck } from "./Deck";

export const Board = () => {
  const difficulty = useStore(state => state.difficulty);
  const settings = useStore(state => state.settings);
  const gameState = useStore(state => state.gameState);
  const setGameState = useStore(state => state.setGameState);
  const { minRows, minWidth, pairCount } = settings[difficulty];
  const { ref } = useGrid({ cellCount: pairCount * 2, minRows, minWidth });

  useGSAP(
    () => {
      if (gameState !== "animating-cards") return;
      const cards = gsap.utils.toArray(".card");
      const stack = gsap.utils.toArray(".stack")[0]; // TODO Hide the deck's overflow
      gsap.set(".stack", {
        width: cards[0].offsetWidth,
        height: cards[0].offsetHeight,
      });
      const state = Flip.getState(cards);
      cards.map(card => stack.appendChild(card));

      Flip.to(state, {
        stagger: { amount: 1 + difficulty / 2 },
        ease: "power2.out",
        duration: 0.15,
        onComplete: () => {
          cards.map(card => ref.current.appendChild(card));
          stack.remove();
          const perspective = gsap.getProperty(".card", "transformPerspective");
          gsap.set(cards, { clearProps: "all" });
          gsap.set(cards, { transformPerspective: perspective });
          setGameState("playing");
        },
      });
    },
    { scope: ref, dependencies: [gameState] }
  );

  return (
    <div
      ref={ref}
      className="grid gap-1 p-1 content-center lg:gap-2 xl:w-9/12 h-screen mx-auto">
      <Deck />
      <div className="stack absolute top-full left-6/12 -translate-x-6/12 *:absolute *:top-0 *:left-0"></div>
    </div>
  );
};
