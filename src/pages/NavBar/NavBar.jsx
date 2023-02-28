import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../../pages/Components/AppBar';
import Toolbar from '../../pages/Components/Toolbar';
import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar';

const rightLink = {
  fontSize: 16,
  color: 'black',
  ml: 3,
};

const iconStyle = {
  width: 58,
  height: 58,
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  mr: 1,
  '&:hover': {
    width: 60,
  height: 60,
  },
};
function NavBar() {
  return (
    <div>
      <AppBar sx={{ top:"35px", display: 'flex', bgcolor: 'grey' }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: -3 }} />
          <Box component="a" href="/" sx={{ top: "2px" }}>
                  <img id='logo'
                    src="../../src/assets/logo.png "
                    alt="Iphone"
                  />
                </Box>
                
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{  fontSize: 24 }}
          >
            {'Iphone Case Oberá'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar/>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://iphonecaseobera.vercel.app/accesorios"
              sx={rightLink}
            >
     
              {'Accesorios'}
            </Link>
          <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="https://iphonecaseobera.vercel.app/iphone"
              sx={rightLink}
            >
              {'Iphone'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'AirPods'}
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'Watch'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
