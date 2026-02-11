import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import HeaderBar from "./-components/HeaderBar";
import SideMenu from "./-components/SideMenu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <HeaderBar setIsSideMenuOpen={setIsSideMenuOpen} />
      <main className="bg-white px-5 pb-15">
        <Outlet />
      </main>
      <SideMenu
        isSwipeable={true}
        setIsSideMenuOpen={setIsSideMenuOpen}
        isSideMenuOpen={isSideMenuOpen}
      />
    </>
  );
}
