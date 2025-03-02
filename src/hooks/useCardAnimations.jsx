import { useGSAP } from "@gsap/react";
import { gsap, Power2 } from "gsap";
import { useRef } from "react";

export const useCardAnimations = ({ scope }) => {
  const liftCardTl = useRef(null);
  const discardTl = useRef(null);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(scope.current, { transformPerspective: 600 });
      gsap.set(".front", { rotationY: 180, filter: "brightness(0.9) grayscale(0)" });
      gsap.set(".back", { filter: "brightness(1)" });
      let target, duration, x, y;

      // Card hover timeline
      liftCardTl.current = gsap
        .timeline({ paused: true })
        .to(scope.current, { y: -10, z: 20, zIndex: 10, duration: 0.15 })
        .to(".back", { filter: "brightness(.85)", duration: 0.15 }, "<");

      // Discard animation timeline
      target = scope.current;
      duration = 0.7;
      const upDuration = 0.3;
      const rangeX = Math.max(window.innerWidth / 3, 300);
      const rangeY = window.innerHeight / 3;
      x = Power2.easeOut(Math.random()) * rangeX;
      y = gsap.utils.random(-200, -rangeY);
      const reversedRotation = Math.random() < 0.5;
      const reversedX = Math.random() < 0.5;
      if (reversedX) x = -x;
      discardTl.current = gsap
        .timeline({ paused: true })
        .to(target, {
          rotate: 360,
          reversed: reversedRotation,
          duration,
          ease: "none",
        })
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

  const gameLose = contextSafe(() => {
    gsap.to(scope.current, {
      rotationY: -180,
      y: 0,
      z: 0,
      overwrite: true,
      duration: 0.3,
    });
    gsap.to(".back", { opacity: 0, duration: 0.1 });    
    gsap.to(".front", {
      filter: "brightness(.5) grayscale(1)",
      overwrite: true,
      delay: 0.2,
    });
  });

  return {
    liftCardTl: liftCardTl.current,
    discardTl: discardTl.current,
    rotateCard,
    gameLose,
  };
};
