import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { SidebarComp } from "../components/common/SidebarComp";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex-col flex overflow-y-auto overflow-x-hidden font-inter">
      <Navbar />
      <div className="flex-1 bg-stone-100 w-full overflow-hidden flex">
        <SidebarComp />
        <Outlet />
      </div>
    </div>
  );
};
