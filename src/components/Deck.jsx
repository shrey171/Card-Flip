import data from "assets/data.json";
import { useEffect } from "react";
import { Card } from "./Card";
import { useCardFlip, useStore } from "hooks";
import { createDeck } from "src/util";

export const Deck = () => {
  const cards = useStore(state => state.cards);
  const setCards = useStore(state => state.setCards);
  const difficulty = useStore(state => state.difficulty);
  const settings = useStore(state => state.settings);
  const setGameState = useStore(state => state.setGameState);
  const { getIsFlipped, handleFlip } = useCardFlip();
  const { pairCount } = settings[difficulty];

  useEffect(() => {
    setCards(createDeck(data, pairCount));
    setGameState("animating-cards");
  }, []);

  return (
    <>
      {cards?.map(card => (
        <Card
          key={card.instanceId}
          isFlipped={getIsFlipped(card)}
          data={card}
          onClick={() => handleFlip(card)}
        />
      ))}
    </>
  );
};
