import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

export const useCardAnimations = ({ scope }) => {
  const liftCardTl = useRef(null);
  const discardTl = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(scope.current, { transformPerspective: 600 });
      gsap.set(".front", { rotationY: 180, filter: "brightness(1)" });
      gsap.set(".back", { filter: "brightness(1)" });

      // Card hover timeline
      liftCardTl.current = gsap
        .timeline({ paused: true })
        .to(scope.current, { y: -10, z: 20, zIndex: 10, duration: 0.15 })
        .to(".back", { filter: "brightness(.85)", duration: 0.15 }, "<");

      // Discard animation timeline
      const target = scope.current;
      const duration = 0.7;
      const upDuration = 0.3;
      const rangeX = Math.max(window.innerWidth / 3, 300);
      const rangeY = window.innerHeight / 3;
      const x = gsap.utils.random(-rangeX, rangeX);
      const y = gsap.utils.random(-200, -rangeY);
      discardTl.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            // const front = scope.current.querySelector(".front");
            // const clone = front.cloneNode(true);
            // scope.current.appendChild(clone);
            // gsap.set(clone, { filter: "brightness(0.6)" });
          },
        })
        .to(target, { rotate: 360, duration, ease: "none" })
        .to(target, { x, duration, ease: "power1.out" }, "<")
        .to(target, { y, duration: upDuration, ease: "power2.out" }, "<")
        .to(
          target,
          {
            y: window.innerHeight,
            duration: duration - upDuration,
            ease: "power2.in",
          },
          ">"
        );
    },
    { scope }
  );

  // Card click tween
  const rotateCard = contextSafe(
    rotationY =>
      scope.current && gsap.to(scope.current, { rotationY, duration: 0.4 })
  );

  return {
    liftCardTl: liftCardTl.current,
    discardTl: discardTl.current,
    rotateCard,
  };
};
