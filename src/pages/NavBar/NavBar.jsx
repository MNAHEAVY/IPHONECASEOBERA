import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MobileNavBar from "./MobileNavBar";
import DeskNavBar from "./DeskNavBar";

const NavBar = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <MobileNavBar /> : <DeskNavBar />}</>;
};

export default NavBar;
