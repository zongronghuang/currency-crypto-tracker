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
      className="sticky top-0 left-0 z-10 flex w-full items-center justify-between bg-white px-5 py-3 shadow-md md:px-8 md:py-4 xl:fixed xl:right-0 xl:ml-auto xl:py-2 xl:shadow-none"
    >
      <button
        type="button"
        aria-label="open side menu"
        className="rounded bg-blue-600 p-1 text-center text-white hover:bg-blue-700 active:bg-blue-800 md:rounded-lg md:p-1.5 xl:w-0 xl:p-0"
        onClick={() => setIsSideMenuOpen(true)}
      >
        <SideMenuIcon className="h-auto w-6 md:w-12 xl:hidden" />
      </button>

      <h1 className="text-xl font-bold text-slate-900 uppercase md:text-3xl lg:text-4xl xl:text-2xl">
        {title}
      </h1>

      <button
        aria-label="open user profile"
        className="rounded bg-blue-600 p-1 text-center text-white hover:bg-blue-700 active:bg-blue-800 md:rounded-lg"
      >
        <UserIcon className="h-auto w-6 md:w-12 xl:w-8" />
      </button>
    </header>
  );
}
