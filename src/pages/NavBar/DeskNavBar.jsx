import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "../Components/AppBar";
import Toolbar from "../Components/Toolbar";
import SearchBar from "../SearchBar/SearchBar";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const logoUrl =
  "https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png";

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
const navInit = [{ to: "/", label: "Iphone Case Oberá" }];

const navItems = [
  { to: "/accesorios", label: "Accesorios" },
  { to: "/fundas", label: "Fundas" },
  { to: "/glass", label: "Glass" },
  { to: "/charger", label: "Energia/Cables" },
  { to: "/Iphone", label: "Iphone" },
  { to: "/airpods", label: "AirPods" },
  { to: "/watch", label: "Watch" },
];

const NavBar = () => {
  const location = useLocation();
  const excludePaths = ["/admin"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <React.Fragment>
      <AppBar sx={{ top: "35px", display: "flex", bgcolor: "#61169521" }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Box component="a" href="/" sx={{ display: "flex", alignItems: "center" }}>
            <img style={{ width: "65px", heigth: "65px" }} src={logoUrl} alt="Iphone" />

            <Typography color="inherit" variant="h6" sx={leftLink}>
              {navInit[0].label}
            </Typography>
          </Box>

          <SearchBar />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ left: "5px", backgroundColor: "gray" }}
                  />
                )}
                <Link to={item.to}>
                  <Typography color="inherit" variant="h6" sx={rightLink}>
                    {item.label}
                  </Typography>
                </Link>
              </React.Fragment>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default NavBar;
