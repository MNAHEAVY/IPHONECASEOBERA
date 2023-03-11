import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import AppBar from '../../pages/Components/AppBar';
import Toolbar from '../../pages/Components/Toolbar';
import "./NavBar.css"
import SearchBar from '../SearchBar/SearchBar';
import { Typography } from '@mui/material';

const rightLink = {
  fontSize: 16,
  color: 'black',
  ml: 1,
  '&:hover': {color: 'gray',}
};

const leftLink = {
  fontSize: 24,
  color: 'black',
  ml: 2,
  '&:hover': {color: 'gray',}
};
function NavBar() {
  return (
    <div>
      <AppBar sx={{  top:"35px", display: 'flex', bgcolor: 'white' }} >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: -3 }} />
          <Box component="a" href="/" sx={{ top: "2px" }}>
                  <img id='logo'
                    src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
                    alt="Iphone"
                  />
                </Box>
                
          <Typography
            color="inherit"
            variant="h6"
            underline="none"
            href="/"
            sx={leftLink}
          >
            {'Iphone Case Oberá'}
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <SearchBar/>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Typography
              color="inherit"
              variant="h6"
              sx={rightLink}
            >
              {'Accesorios '}|
            </Typography>
          <Typography
              color="gray"
              variant="h6"
              sx={rightLink}
            >
              {'Iphone '}|
            </Typography>

            <Link to= "/airpods">
            <Typography
              color="inherit"
              variant="h6"
              sx={rightLink}
            >
            {'AirPods '}
            </Typography>

            </Link>
            |
            
            <Typography
              color="inherit"
              variant="h6"
              underline="none"
              href="/watch"
              sx={rightLink}
            >
              {'Watch'}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
