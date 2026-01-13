import { type Dispatch, type SetStateAction } from "react";
import { useLocation } from "@tanstack/react-router";

type ToolbarProps = {
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Toolbar({ setIsSideMenuOpen }: ToolbarProps) {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <nav className="flex items-center justify-between px-5 py-3 outline-1 outline-black">
      <button
        type="button"
        className="w-1/5 text-center outline outline-black"
        onClick={() => setIsSideMenuOpen(true)}
      >
        open
      </button>
      <h1 className="text-xl font-bold uppercase">{title}</h1>
      <button className="w-1/5 text-center outline">User</button>
    </nav>
  );
}
