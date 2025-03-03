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
      const range = 0.5;
      const textElement = scope.current.firstElementChild;
      const fontFamilies = [
        "Bubblegum Sans",
        "Playfair Display",
        "Special Elite",
        "Ephesis",
      ];
      const fontFamily = fontFamilies[difficulty];
      const colorPallete = isWon ? ["#022f2e", "#05df72"] : ["#4f1a1a", "red"];
      const fontColor = isWon ? "#e5e5e5" : "#d6d3d1";

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
        const y = decY * range;

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
    <div className="flex flex-col gap-[10vh] w-full h-full">
      <div
        ref={scope}
        className="bg-linear-to-r from-transparent via-black/5 to-transparent w-11/12 h-4/12 lg:h-6/12 mx-auto transform-3d relative">
        <p className="text select-none last:select-text capitalize text-[20vw] md:text-[10vw] font-bold absolute top-6/12 left-6/12">
          {content}
        </p>
      </div>
      <div className="flex justify-center items-start grow">
        <button
          onClick={restart}
          className="text-white capitalize text-3xl cursor-pointer">
          play again
        </button>
      </div>
    </div>
  );
};
