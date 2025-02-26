import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { useStore } from "hooks";

export const Timer = ({ seconds }) => {
  const scope = useRef(null);
  const setGameState = useStore(state => state.setGameState);

  useGSAP(
    () => {
      gsap.set(scope.current, { clipPath: "inset(0% 100% 0% 100%)" });
      gsap.to(scope.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: seconds,
        ease: "none",
        onComplete: () => setGameState("lose"),
      });
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="h-1 absolute top-0 
      bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 w-screen"></div>
  );
};
