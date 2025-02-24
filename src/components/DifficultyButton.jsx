import { useStore } from "hooks";

export const DifficultyButton = ({ name, id, time, pairCount }) => {
  const difficulty = useStore(state => state.difficulty);
  const setDifficulty = useStore(state => state.setDifficulty);
  return (
    <label
      className="flex items-center px-4 py-2 text-center cursor-pointer relative">
      <input
        type="radio"
        name="difficulty"
        value={id}
        defaultChecked={difficulty === id}
        onChange={() => setDifficulty(id)}
        className="peer hidden"
      />
      <p className="text-xl capitalize peer-checked:font-bold">{name}</p>
      <div className="flex gap-3 ml-auto">
        <div className="flex items-center gap-1">
          <p className="font-bold text-sm">{pairCount}</p>
          <img
            className="w-5 rotate-y-180"
            src="src/assets/images/cards.png"
            alt="cards-icon"
          />
        </div>
        <div className="flex items-center gap-1">
          <p className="font-bold text-sm">{time}</p>
          <img
            className="w-5"
            src="src/assets/images/time.png"
            alt="time-icon"
          />
        </div>
      </div>
    </label>
  );
};
