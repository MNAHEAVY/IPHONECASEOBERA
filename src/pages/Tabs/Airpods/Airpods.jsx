import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import AirpodsMobile from "./AirpodsMobile";
import AirpodsDesk from "./AirpodsDesk";

const Airpods = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <AirpodsMobile /> : <AirpodsDesk />}</>;
};

export default Airpods;
