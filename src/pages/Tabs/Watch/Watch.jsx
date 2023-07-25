import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import WatchMobile from "./WatchMobile";
import WatchDesk from "./WatchDesk";

const Watch = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <WatchMobile /> : <WatchDesk />}</>;
};

export default Watch;
