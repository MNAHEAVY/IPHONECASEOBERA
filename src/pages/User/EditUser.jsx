import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import EditUserDesk from "./EditUserDesk";
import EditUserMobile from "./EditUserMobile";

const EditUser = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <EditUserMobile /> : <EditUserDesk />}</>;
};

export default EditUser;
