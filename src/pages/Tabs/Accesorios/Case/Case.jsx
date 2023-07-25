import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import CaseMobile from "./CaseMobile";
import CaseDesk from "./CaseDesk";

const Case = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <CaseMobile /> : <CaseDesk />}</>;
};

export default Case;
