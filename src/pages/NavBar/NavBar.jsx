import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "../../pages/Components/AppBar";
import Toolbar from "../../pages/Components/Toolbar";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "black",
  ml: 1,
  "&:hover": { color: "gray" },
};

const leftLink = {
  fontSize: 24,
  color: "black",
  ml: 2,
  "&:hover": { color: "gray" },
};
function NavBar() {
  const location = useLocation();
  const excludePaths = ["/admin"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }
  return (
    <div>
      <AppBar sx={{ top: "35px", display: "flex", bgcolor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Box sx={{ flex: -3 }} />
          <Box component="a" href="/" sx={{ top: "2px" }}>
            <img
              id="logo"
              src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
              alt="Iphone"
            />
          </Box>
          <Link to="/">
            <Typography color="inherit" variant="h6" sx={leftLink}>
              {"Iphone Case Oberá"}
            </Typography>
          </Link>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link to="/accesorios">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"Accesorios "}
              </Typography>
            </Link>
            <NavDropdown id="navbarScrollingDropdown">
              <NavDropdown.Item href="/fundas" className="dropDown">
                Fundas
              </NavDropdown.Item>
              <NavDropdown.Item href="/glass" className="dropDown">
                Glass
              </NavDropdown.Item>
              <NavDropdown.Item href="/charger" className="dropDown">
                Energia/Cables
              </NavDropdown.Item>
            </NavDropdown>

            <Divider orientation="vertical" flexItem />
            <Link to="/Iphone">
              <Typography color="gray" variant="h6" sx={rightLink}>
                {"Iphone "}
              </Typography>
            </Link>
            <Divider orientation="vertical" flexItem />

            <Link to="/airpods">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"AirPods "}
              </Typography>
            </Link>

            <Divider orientation="vertical" flexItem />
            <Link to="/watch">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"Watch"}
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
