import { useEffect } from "react";
import { tinykeys } from "tinykeys";

export function useKeyboardShortcuts() {
  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      // ...
    });
    return () => {
      unsubscribe();
    };
  });
}
