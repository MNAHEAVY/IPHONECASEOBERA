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
  '&:hover': {color: 'gray',}
};

const leftLink = {
  fontSize: 24,
  color: 'black',
  ml: 3,
  '&:hover': {color: 'gray',}
};
function NavBar() {
  return (
    <div>
      <AppBar sx={{ top:"35px", display: 'flex', bgcolor: 'white' }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: -3 }} />
          <Box component="a" href="/" sx={{ top: "2px" }}>
                  <img id='logo'
                    src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
                    alt="Iphone"
                  />
                </Box>
                
          <Link
            color="inherit"
            variant="h6"
            underline="none"
            href="/"
            sx={leftLink}
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
              href="/accesorios"
              sx={rightLink}
            >
              {'Accesorios'}
            </Link>
          <Link
              color="gray"
              variant="h6"
              underline="none"
              href="/iphone"
              sx={rightLink}
            >
              {'Iphone '}|
            </Link>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/"
              sx={rightLink}
            >
              {'AirPods '}|
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
