import { useStore } from "hooks";
import { memo, useRef } from "react";
import { useCardAnimations } from "hooks";

export const Card = memo(({ data, isFlipped, onClick }) => {
  const scope = useRef(null);
  const gameState = useStore(state => state.gameState);
  const { rotateCard, liftCardTl, discardTl } = useCardAnimations({ scope });
  const isDisabled = isFlipped || data.isMatched || gameState !== "playing";

  const cardUp = () => {
    if (isDisabled) return;
    liftCardTl.restart();
  };

  const cardDown = () => {
    if (isDisabled) return;
    liftCardTl.reverse();
  };

  if (isFlipped) rotateCard(-180);
  else if (data.isMatched) discardTl.play();
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
