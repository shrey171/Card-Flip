import { useState } from "react";
import { useStore } from "hooks";

export const useCardFlip = () => {
  const [disableClick, setDisableClick] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const matchCards = useStore(state => state.matchCards);

  const handleFlip = card => {
    if (card.isMatched || disableClick) return;
    const crntFlippedId = flippedCards[0]?.id;
    setFlippedCards(prev => [...prev, card]);
    if (!crntFlippedId) return;
    // Prevent spamming by disabling clicks if cards don't match
    setDisableClick(true);
    setTimeout(() => {
      if (crntFlippedId === card.id) matchCards(card.id);
      setFlippedCards([]);
      setDisableClick(false);
    }, 600);
  };

  const getIsFlipped = card =>
    flippedCards.some(c => c.instanceId === card.instanceId);

  return { flippedCards, getIsFlipped, handleFlip };
};
