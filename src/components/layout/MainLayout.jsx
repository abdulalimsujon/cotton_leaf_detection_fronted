import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>

      <div className="flex">
        <div className="flex-[1]">
          <Sidebar></Sidebar>
        </div>
        <div className="flex-[5]">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
