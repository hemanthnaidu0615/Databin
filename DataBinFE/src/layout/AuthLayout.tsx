import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { SidebarComp } from "../components/common/SidebarComp";

export const AuthLayout = () => {
  return (
    <div className="h-screen flex overflow-y-hidden overflow-x-hidden font-inter">
      <SidebarComp />
      <div className="bg-stone-100 h-full w-full flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};
