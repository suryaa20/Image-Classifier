import { useState, useEffect, useCallback } from "react";

interface KeyboardControlsState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
  isLocked: boolean;
  setIsLocked: (value: boolean) => void;
}

export const useKeyboardControls = (): KeyboardControlsState => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
  });

  const [isLocked, setIsLocked] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isLocked) return;

      // Prevent default behavior for arrow keys and WASD
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "ArrowRight",
          "w",
          "a",
          "s",
          "d",
          "W",
          "A",
          "S",
          "D",
          "Shift",
        ].includes(event.key)
      ) {
        event.preventDefault();
      }

      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setMovement((prev) => ({ ...prev, forward: true }));
          break;
        case "s":
        case "arrowdown":
          setMovement((prev) => ({ ...prev, backward: true }));
          break;
        case "a":
        case "arrowleft":
          setMovement((prev) => ({ ...prev, left: true }));
          break;
        case "d":
        case "arrowright":
          setMovement((prev) => ({ ...prev, right: true }));
          break;
        case "shift":
          setMovement((prev) => ({ ...prev, run: true }));
          break;
        default:
          break;
      }
    },
    [isLocked]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (!isLocked) return;

      switch (event.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setMovement((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setMovement((prev) => ({ ...prev, backward: false }));
          break;
        case "a":
        case "arrowleft":
          setMovement((prev) => ({ ...prev, left: false }));
          break;
        case "d":
        case "arrowright":
          setMovement((prev) => ({ ...prev, right: false }));
          break;
        case "shift":
          setMovement((prev) => ({ ...prev, run: false }));
          break;
        default:
          break;
      }
    },
    [isLocked]
  );

  // Set up event listeners
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return {
    ...movement,
    isLocked,
    setIsLocked,
  };
};

export default useKeyboardControls;
