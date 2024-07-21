import { Dispatch, SetStateAction, RefObject, useEffect } from "react";

export default function useClickOutside(
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  ref: RefObject<HTMLDivElement>,
) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", listener as EventListener);

    return () => {
      document.removeEventListener("mousedown", listener as EventListener);
    };
  }, [setIsOpen, ref]);
}
