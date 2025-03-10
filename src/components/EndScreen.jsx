import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useStore } from "hooks";
import { useRef } from "react";

export const EndScreen = () => {
  const scope = useRef(null);
  const initialized = useRef(false);
  const difficulty = useStore(state => state.difficulty);
  const gameState = useStore(state => state.gameState);
  const restart = useStore(state => state.restart);
  const isWon = gameState === "win";
  const content = isWon ? "victory" : "defeat";

  useGSAP(
    () => {
      const count = 20;
      const range = 0.6;
      const textElement = scope.current.firstElementChild;
      const fontFamilies = [
        "Bubblegum Sans",
        "Playfair Display",
        "Special Elite",
        "Ephesis",
      ];
      const fontFamily = fontFamilies[difficulty];
      const colorPallete = isWon ? ["white", "#05df72"] : ["#4f1a1a", "red"];
      const fontColor = isWon ? "#e5e5e5" : "hsl(0, 0%, 80%)";

      for (let i = 0; i < count; i++) {
        if (initialized.current) break;
        const clone = textElement.cloneNode(true);
        clone.classList.add("clone");
        scope.current.appendChild(clone);
      }
      gsap.set(".text", {
        xPercent: -50,
        yPercent: -50,
        textShadow: "0px 0px 5px black",
        fontFamily,
      });

      gsap.set(".text:not(:last-child)", {
        color: idx =>
          gsap.utils.interpolate(colorPallete[0], colorPallete[1], idx / count),
      });

      gsap.set(".text:last-child", { color: fontColor });

      const resetTween = () =>
        gsap.to(".text", {
          x: idx => idx * 1,
          y: idx => idx * -1,
          ease: "elastic",
          duration: 1,
        });

      const onMouseMove = event => {
        const { clientX, clientY } = event;
        const { offsetTop, offsetLeft, offsetWidth, offsetHeight } =
          scope.current;
        const posX = clientX - offsetLeft;
        const posY = clientY - offsetTop;
        const offsetX = posX - offsetWidth / 2;
        const offsetY = posY - offsetHeight / 2;

        const decX = offsetX / (textElement.offsetWidth / 2);
        const decY = offsetY / (textElement.offsetHeight / 2);

        const x = decX * range;
        const y = decY * range * 1.5;

        gsap.to(".text", {
          x: idx => idx * x,
          y: idx => idx * y,
          overwrite: true,
          duration: 0.1,
        });
      };

      resetTween();
      scope.current.addEventListener("mousemove", onMouseMove);
      scope.current.addEventListener("mouseleave", resetTween);
      initialized.current = true;
      return () => {
        scope.current.removeEventListener("mousemove", onMouseMove);
        scope.current.removeEventListener("mouseleave", resetTween);
      };
    },
    { scope }
  );

  return (
    <div className="w-full h-full">
      <div
        ref={scope}
        className="w-11/12 h-4/12 lg:h-6/12 mx-auto transform-3d relative">
        <p className="text select-none last:select-text capitalize text-[20vw] md:text-[10vw] font-bold absolute top-6/12 left-6/12">
          {content}
        </p>
      </div>
      <div className="flex justify-center items-start grow">
        <button
          onClick={restart}
          className="text-white btn font-semibold uppercase md:text-xl xl:text-2xl cursor-pointer relative w-96 py-6 xl:py-8">
          Restart
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
      </div>
    </div>
  );
};
