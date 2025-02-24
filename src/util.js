export const createDeck = (data, pairCount) => {
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
    .sort(() => Math.random() - 0.5);
};
