import { type Dispatch, type SetStateAction } from "react";
import { useLocation } from "@tanstack/react-router";
import SideMenuIcon from "@/assets/side_menu.svg";
import UserIcon from "@/assets/user.svg";

type HeaderBarProps = {
  setIsSideMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export default function HeaderBar({ setIsSideMenuOpen }: HeaderBarProps) {
  const location = useLocation();
  const title = location.pathname.split("/")[1];

  return (
    <header
      role="banner"
      className="sticky top-0 left-0 z-10 flex w-full items-center justify-between bg-white px-5 py-3 shadow-md"
    >
      <button
        type="button"
        className="rounded bg-blue-600 p-1 text-center text-white hover:bg-blue-700 active:bg-blue-800"
        onClick={() => setIsSideMenuOpen(true)}
      >
        <SideMenuIcon className="h-auto w-6" />
      </button>

      <h1 className="text-xl font-bold text-slate-900 uppercase">{title}</h1>

      <button className="rounded bg-blue-600 p-1 text-center text-white hover:bg-blue-700 active:bg-blue-800">
        <UserIcon className="h-auto w-6" />
      </button>
    </header>
  );
}
