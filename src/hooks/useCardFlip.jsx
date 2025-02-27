import { useState } from "react";
import { useStore } from "hooks";

export const useCardFlip = () => {
  const [disableClick, setDisableClick] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const matchCards = useStore(state => state.matchCards);

  const handleFlip = card => {
    if (card.isMatched || disableClick) return;
    setFlippedCards(prev => [...prev, card]);
    if (flippedCards.length === 0) return;    
    setDisableClick(true); // Prevent spamming by disabling clicks if cards don't match
    setTimeout(() => {
      if (flippedCards[0].id === card.id) matchCards(card.id);
      setFlippedCards([]);
      setDisableClick(false);
    }, 600);
  };

  const getIsFlipped = card =>
    flippedCards.some(c => c.instanceId === card.instanceId);

  return { flippedCards, getIsFlipped, handleFlip };
};
