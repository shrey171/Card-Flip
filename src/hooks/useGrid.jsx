import { useCallback, useEffect, useRef } from "react";

const getFactors = n => {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      factors.push(i);
      if (i !== n / i) {
        factors.push(n / i);
      }
    }
  }
  return factors.sort((a, b) => b - a);
};

export const useGrid = ({
  cellCount,
  ref: givenRef,
  maxHeight: givenMaxHeight = 0,
  minWidth: givenMinWidth = 0,
  minRows = 1,
}) => {
  const ref = givenRef || useRef(null);
  const resizeTimeoutRef = useRef(null);

  const createGrid = useCallback(() => {
    const gap = parseFloat(window.getComputedStyle(ref.current).gap) || 0;
    const gridHeight = ref.current.offsetHeight;
    const gridWidth = ref.current.offsetWidth;
    let minWidth = givenMinWidth;

    if (typeof givenMinWidth === "object") {
      Object.keys(minWidth).forEach(key => {
        minWidth = gridWidth >= Number(key) ? givenMinWidth[key] : minWidth;
      });
    }
    const maxColumns = Math.floor(gridWidth / (minWidth + gap));
    const factors = getFactors(cellCount);
    let columns = factors.find(factor => factor <= maxColumns);
    let rows = Math.ceil(cellCount / columns);

    if (rows < minRows) {
      for (let i = factors.length - 1; i >= 0; i--) {
        if (factors[i] >= minRows) {
          rows = factors[i];
          break;
        }
      }
      columns = Math.ceil(cellCount / rows);
    }

    const maxHeight = givenMaxHeight || Math.floor(gridHeight / rows) - gap;
    ref.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    ref.current.style.setProperty("--cell-min-width", `${minWidth}px`);
    ref.current.style.setProperty("--cell-max-height", `${maxHeight}px`);
    ref.current.classList.add(
      "grid",
      "*:min-w-(--cell-min-width)",
      "*:max-h-(--cell-max-height)"
    );
  }, [cellCount, givenMinWidth, minRows]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = setTimeout(createGrid, 100);
    };
    createGrid();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [createGrid]);

  return { createGrid, ref };
};
