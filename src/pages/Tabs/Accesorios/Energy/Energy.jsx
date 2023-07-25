import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import EnergyMobile from "./EnergyMobile";
import EnergyDesk from "./EnergyDesk";

const Energy = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <EnergyMobile /> : <EnergyDesk />}</>;
};

export default Energy;
