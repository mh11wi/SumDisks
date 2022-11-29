import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Home } from '@mui/icons-material';

const MenuBar = (props) => {  
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Sum Disks
        </Typography>
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;