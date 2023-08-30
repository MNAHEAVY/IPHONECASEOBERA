import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./Landing.css";

import Carrousel from "../Carousel/Carousel";
import Home from "../Home/Home";

export default function Landing() {
  const isMobileView = useMediaQuery("(max-width:600px)");
  return (
    <>
      <div>
        <div>
          <Carrousel />
        </div>

        <div id='centering'>
          <iframe
            id='style'
            src='https://dolarhoy.com/i/cotizaciones/dolar-blue'
            frameborder='0'
          ></iframe>
        </div>
        <div>
          <Home />
        </div>
        {isMobileView ? (
          <h6
            style={{
              display: "flex",
              color: "violet",
              fontSize: "9px",
              justifyContent: "center",
              marginBottom: 0,
            }}
          >
            Iphone case Oberá
          </h6>
        ) : (
          <h3>Iphone case Oberá</h3>
        )}
      </div>
    </>
  );
}
