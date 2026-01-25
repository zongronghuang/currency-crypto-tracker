import { type Dispatch, type SetStateAction } from "react";
import { useLocation } from "@tanstack/react-router";

type HeaderBarProps = {
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderBar({ setIsSideMenuOpen }: HeaderBarProps) {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <header
      role="banner"
      className="sticky top-0 left-0 z-1 flex w-full items-center justify-between bg-white px-5 py-3 shadow-md"
    >
      <button
        type="button"
        className="w-1/5 text-center outline outline-black"
        onClick={() => setIsSideMenuOpen(true)}
      >
        open
      </button>
      <h1 className="text-xl font-bold uppercase">{title}</h1>
      <button className="w-1/5 text-center outline">User</button>
    </header>
  );
}
