import { Outlet } from "react-router-dom";
import GuestNav from "../components/Navs/GuestNav";

const GuestLayout = () => {
  return (
    <>
      <GuestNav />
      <Outlet />
    </>
  );
};

export default GuestLayout;
