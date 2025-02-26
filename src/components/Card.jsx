import { useGSAP } from "@gsap/react";
import { useStore } from "hooks";
import { gsap } from "gsap";
import { memo, useRef } from "react";

export const Card = memo(({ data, isFlipped, onClick }) => {
  const scope = useRef(null);
  const liftCard = useRef(null);
  const gameState = useStore(state => state.gameState);
  const isDisabled = isFlipped || data.isMatched || gameState !== "playing";

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(scope.current, { transformPerspective: 600 });
      gsap.set(".front", { rotationY: 180, filter: "brightness(1)" });
      gsap.set(".back", { filter: "brightness(1)" });

      liftCard.current = gsap
        .timeline({ paused: true })
        .to(scope.current, { y: -10, z: 20, zIndex: 10, duration: 0.15 })
        .to(".back", { filter: "brightness(.85)", duration: 0.15 }, "<");
    },
    { scope }
  );

  const cardUp = () => {
    if (isDisabled) return;
    liftCard.current.restart();
  };

  const cardDown = () => {
    if (isDisabled) return;
    liftCard.current.reverse();
  };

  const flashCard = contextSafe(() => {
    gsap.to(".front", {
      filter: "brightness(0.7)",
      duration: 0.2,
    });
  });

  const rotateCard = contextSafe(
    rotationY =>
      scope.current && gsap.to(scope.current, { rotationY, duration: 0.4 })
  );

  if (isFlipped) rotateCard(-180);
  else if (data.isMatched) flashCard();
  else rotateCard(0);

  const handleClick = e => {
    e.preventDefault();
    if (isDisabled) return;
    cardDown();
    onClick(data, isFlipped);
  };

  return (
    <div
      ref={scope}
      onMouseEnter={cardUp}
      onMouseLeave={cardDown}
      onClick={handleClick}
      aria-disabled={isDisabled}
      onDragStart={e => e.preventDefault()}
      className={`shadow-md lg:shadow-xl card aspect-[5/7] cursor-pointer transform-3d 
      rounded-xs lg:rounded-sm *:rounded-[inherit] outline-0 relative aria-disabled:cursor-auto`}>
      <img
        src={`/assets/images/${data.image}`}
        className="front face p-1 bg-white w-full h-full absolute"
        alt={data.image}
      />
      <img
        src="/assets/images/test.jpg"
        className="back face bg-main backface-hidden w-full h-full absolute"
        alt={data.image + " backface"}
      />
    </div>
  );
});
