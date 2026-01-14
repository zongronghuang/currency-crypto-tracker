import { useState } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Toolbar from "./-components/Toolbar";
import SideMenu from "./-components/SideMenu";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <Toolbar setIsSideMenuOpen={setIsSideMenuOpen} />
      <main className="p-5">
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
