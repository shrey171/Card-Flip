import { useStore } from "hooks";
import { useState } from "react";

export const useCardLogic = () => {
  const [disableClick, setDisableClick] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const matchCards = useStore(state => state.matchCards);

  const createDeck = (data, pairCount) => {
    const deck = new Set();
    while (deck.size < pairCount) {
      const randomIndex = Math.floor(Math.random() * data.length);
      deck.add(data[randomIndex]);
    }  
    return [...deck, ...deck]
      .map((card, idx) => ({
        ...card,
        instanceId: idx,
        isFlipped: false,
        isMatched: false,
      }))
      // .sort(() => Math.random() - 0.5);
  };

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

  return { flippedCards, createDeck, getIsFlipped, handleFlip };
};
