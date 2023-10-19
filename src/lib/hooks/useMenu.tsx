import { menuOpenState } from "@/state";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const useMenu = () => {
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState);

  useEffect(() => {
    if (menuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return {
    isOpen: menuOpen,
    toggleMenu: () => setMenuOpen((prev) => !prev),
    closeMenu: () => setMenuOpen(false),
    openMenu: () => setMenuOpen(true),
  };
};
