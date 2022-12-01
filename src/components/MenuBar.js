import React, { createRef, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { FastForward, Home } from '@mui/icons-material';

const MenuBar = (props) => {
  const actionRef = createRef();
  
  useEffect(() => {
    if (props.hasWon) {
      actionRef.current.focusVisible();
    }
  }, [actionRef, props.hasWon]);
  
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
          Sum Disks
        </Typography>
        <IconButton action={actionRef} aria-label="New Game" onClick={props.handleClickNewGame} color="inherit">
          <FastForward />
        </IconButton>
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;