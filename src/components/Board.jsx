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
      const stack = gsap.utils.toArray(".stack")[0];
      gsap.set(".stack", {
        width: cards[0].offsetWidth,
        height: cards[0].offsetHeight,
      });
      const state = Flip.getState(cards);
      cards.map(card => stack.appendChild(card));

      const animateFLIP = () => {
        Flip.to(state, {
          stagger: { amount: 1 + difficulty / 2 },
          ease: "power2.out",
          duration: 0.15,
          onComplete: () => {
            cards.map(card => ref.current.appendChild(card));
            stack.remove();
            const perspective = gsap.getProperty(
              ".card",
              "transformPerspective"
            );
            gsap.set(cards, { clearProps: "all" });
            gsap.set(cards, { transformPerspective: perspective });
            setGameState("playing");
          },
        });
      };

      gsap.to(cards, {
        x: idx => idx / 2,
        y: idx => idx / 2,
        z: idx => 1 - idx / cards.length,
        duration: 0.1,
        onComplete: animateFLIP,
      });
    },
    { scope: ref, dependencies: [gameState] }
  );

  return (
    <div
      ref={ref}
      className="grid gap-1 p-1 content-center lg:gap-2 xl:w-9/12 h-full mx-auto">
      <Deck />
      <div className="stack absolute bottom-12 left-6/12 transform-3d -translate-x-6/12 *:border *:border-black/20 *:absolute *:w-full *:shadow-transparent"></div>
    </div>
  );
};
