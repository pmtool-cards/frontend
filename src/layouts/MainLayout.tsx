import { Outlet } from "react-router-dom";
import MainNav from "../components/Navs/MainNav";

const MainLayout = () => {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
};

export default MainLayout;
