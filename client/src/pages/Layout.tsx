/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import SideNavbar from "../components/SideNavbar";
import BottomNav from "@/components/ui/mobileNav";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";

const Layout = () => {
  return (
    <SidebarProvider>
      <SideNavbar />
      <div className="flex-1 overflow-y-scroll">
        <Outlet />
      </div>
      <BottomNav />
    </SidebarProvider>
  );
};

export default Layout;
