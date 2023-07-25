import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import IphoneMobile from "./IphoneMobile";
import IphoneDesk from "./IphoneDesk";

const Iphone = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <IphoneMobile /> : <IphoneDesk />}</>;
};

export default Iphone;
