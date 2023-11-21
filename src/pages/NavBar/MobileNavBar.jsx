import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBar from "../SearchBar/SearchBar";
import FloatButton from "../Button/FloatButton";

const logoUrl =
  "https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png";

const rightLink = {
  fontSize: 12,
  color: "black",
  ml: 1,
  "&:hover": { color: "gray" },
};

const leftLink = {
  fontSize: 14,
  color: "black",
  ml: 2,
  "&:hover": { color: "gray" },
};

const navItems = [
  { to: "/accesorios", label: "Accesorios" },
  { to: "/fundas", label: "Fundas" },
  { to: "/glass", label: "Glass" },
  { to: "/charger", label: "Energia/Cables" },
  { to: "/Iphone", label: "Iphone" },
  { to: "/airpods", label: "AirPods" },
  { to: "/watch", label: "Watch" },
];

function NavBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const excludePaths = ["/admin", "/obercoins"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const navInit = [{ to: "/", label: "Iphone Case Oberá" }];

  const navItemsMobile = (
    <List>
      {navItems.map((item, index) => (
        <ListItem key={index} button component={Link} to={item.to}>
          {item.label}
        </ListItem>
      ))}
    </List>
  );

  return (
    <div>
      <AppBar sx={{ top: "35px", display: "flex", bgcolor: "#61169521" }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img style={{ width: "45px" }} id='logo' src={logoUrl} alt='Iphone' />
            <Link to={navInit[0].to}>
              <Typography color='inherit' variant='h6' sx={leftLink}>
                {navInit[0].label}
              </Typography>
            </Link>
          </Box>
          <IconButton
            edge='end'
            color='black'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
          <SearchBar />
          <Box
            sx={{ width: 250 }}
            role='presentation'
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            {navItemsMobile}
          </Box>
          <FloatButton />
        </Drawer>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
