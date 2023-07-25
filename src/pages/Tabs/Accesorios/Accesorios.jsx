import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import AccesoriosMobile from "./AccesoriosMobie";
import AccesoriosDesk from "./AccesoriosDesk";

const Accesorios = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <AccesoriosMobile /> : <AccesoriosDesk />}</>;
};

export default Accesorios;
