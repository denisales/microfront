import { Outlet } from "react-router-dom";
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
