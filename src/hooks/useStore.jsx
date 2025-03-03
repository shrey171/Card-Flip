import { create } from "zustand";

const validGameStates = [
  "setup",
  "creating-deck",
  "animating-cards",
  "playing",
  "win",
  "lose",
];

export const useStore = create((set, get) => ({
  cards: [],
  difficulty: 1,
  settings: [
    {
      id: 0,
      name: "casual",
      pairCount: 6,
      time: 60,
      minRows: 2,
      minWidth: {
        0: 70,
        400: 100,
      },
      image: "/assets/images/casual.png",
    },
    {
      id: 1,
      name: "classic",
      pairCount: 12,
      time: 120,
      minRows: 3,
      minWidth: {
        0: 55,
        400: 80,
      },
      image: "/assets/images/classic.png",
    },
    {
      id: 2,
      name: "challenging",
      pairCount: 20,
      time: 200,
      minRows: 4,
      minWidth: {
        0: 55,
        400: 65,
      },
      image: "/assets/images/challenging.png",
    },
    {
      id: 3,
      name: "card-trickster",
      pairCount: 36,
      time: 360,
      minRows: 6,
      minWidth: {
        0: 40,
        400: 50,
      },
      image: "/assets/images/cardtrickster.png",
    },
    {
      id: 4,
      name: "custom (TBD)",
      pairCount: 0,
      time: 0,
      minRows: 2,
      minWidth: {
        0: 40,
        400: 50,
      },
    },
  ],
  gameState: "setup",
  getCard: id => get().cards.find(card => card.instanceId === id),
  matchCards: id =>
    set(state => {
      const cards = state.cards.map(card =>
        card.id === id ? { ...card, isMatched: true } : card
      );
      if (get().gameState !== "playing") return { cards };
      const isWon = cards.every(card => card.isMatched);
      const gameState = isWon ? "win" : "playing";
      return { cards, gameState };
    }),
  setCards: cards => set({ cards }),
  setDifficulty: difficulty => set({ difficulty }),
  setGameState: gameState => {
    if (validGameStates.includes(gameState)) set({ gameState });
    else throw new Error(`Invalid game state: ${gameState}`);
  },
  restart: () => set({ cards: [], gameState: "setup" }),
}));
