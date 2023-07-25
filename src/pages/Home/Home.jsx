import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import HomeDesk from "./HomeDesk";
import HomeMobile from "./HomeMobile";

const Home = () => {
  // Use the useMediaQuery hook to check if the screen width is below 600px (mobile view)
  const isMobileView = useMediaQuery("(max-width:600px)");

  return <>{isMobileView ? <HomeMobile /> : <HomeDesk />}</>;
};

export default Home;
