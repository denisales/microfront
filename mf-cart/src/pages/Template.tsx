import { Outlet } from "react-router-dom";
import "../index.css";
import Menu from "@/components/shared/Menu";

const Template = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};

export default Template;
