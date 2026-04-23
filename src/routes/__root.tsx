import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import HeaderBar from "../components/HeaderBar";
import SideMenu from "../components/SideMenu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <HeaderBar setIsSideMenuOpen={setIsSideMenuOpen} />
      <main className="xl:pr-2xl px-5 pt-5 pb-15 md:mx-auto md:w-11/12 md:p-0 md:pt-16 xl:mt-[10vh] xl:ml-[13vw] xl:w-[85vw] xl:pt-0">
        <Outlet />
      </main>
      <SideMenu
        isSwipeable={false}
        setIsSideMenuOpen={setIsSideMenuOpen}
        isSideMenuOpen={isSideMenuOpen}
      />
    </>
  );
}
