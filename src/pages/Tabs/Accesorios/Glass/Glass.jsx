import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import GlassMobile from "./GlassMobile";
import GlassDesk from "./GlassDesk";

const Glass = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <GlassMobile /> : <GlassDesk />}</>;
};

export default Glass;
