import { useStore } from "hooks";

export const DifficultyCard = ({ image, name, id, pairCount, time }) => {
  const setDifficulty = useStore(state => state.setDifficulty);
  const setGameState = useStore(state => state.setGameState);

  const onClick = () => {
    setDifficulty(id);
    setGameState("creating-deck");
  };

  return (
    <button
      onClick={onClick}
      className={`btn ${name} text-white bg-white/5 hover:bg-black/5 transition-all w-full aspect-[2/3] cursor-pointer relative z-0 group`}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <p className="difficulty-name absolute top-[12%] text-lg md:text-xl lg:text-2xl 2xl:text-4xl capitalize font-bold mb-3">
          {name}
        </p>
        <img
          className="difficulty-image w-6/12 max-w-36 transition-all duration-500 lg:grayscale-100 group-hover:grayscale-0"
          src={image}
          alt={name + "-image"}
        />
        <div className="absolute bottom-1/12 w-full">
          <div className="flex justify-center gap-5 w-full">
            <div className="flex items-center gap-1">
              <img
                className="w-4 md:w-5 lg:w-7 invert-10"
                src="/assets/images/cards.png"
                alt="cards-icon"
              />
              <p className="font-semibold text-xs sm:text-base">{pairCount}</p>
            </div>
            <div className="flex items-center gap-1">
              <img
                className="w-4 md:w-5 lg:w-7 invert-10"
                src="/assets/images/time.png"
                alt="time-icon"
              />
              <p className="font-semibold text-xs sm:text-base">{time}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="btn-border overflow-clip">
        <div className="top main-border"></div>
        <div className="bottom main-border"></div>
        <div className="left main-border"></div>
        <div className="right main-border"></div>
        <div className="top-left side-border"></div>
        <div className="top-right side-border"></div>
        <div className="bottom-left side-border"></div>
        <div className="bottom-right side-border"></div>
      </div>
    </button>
  );
};
