import * as React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

export default function BackButton() {
  const location = useLocation();
  const excludePaths = ["/", "/admin", "/admin/*"];
  const [tooltip1Open, setTooltip1Open] = React.useState(false);

  const handleTooltip1Open = () => {
    setTooltip1Open(true);
  };

  const handleTooltip1Close = () => {
    setTooltip1Open(false);
  };

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Box id='contenedor-backr-refresh'>
      <Tooltip
        id='tooltip1'
        title='Volver'
        placement='right'
        open={tooltip1Open}
        onClose={handleTooltip1Close}
        onOpen={handleTooltip1Open}
      >
        <Link
          id='back-button'
          to='/'
          onMouseEnter={handleTooltip1Open}
          onMouseLeave={handleTooltip1Close}
        >
          <ArrowBackIosIcon color='black' />
        </Link>
      </Tooltip>
    </Box>
  );
}
