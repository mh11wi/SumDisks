import React, { createRef, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Calculate, FastForward, Help, Home, Lightbulb, Settings } from '@mui/icons-material';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import SumDialog from './SumDialog';

const MenuBar = (props) => {
  const actionRef = createRef();
  const [helpOpen, setHelpOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calculationsOpen, setCalculationsOpen] = useState(false);
  const [columnSums, setColumnSums] = useState(null);
  
  useEffect(() => {
    if (props.hasWon) {
      actionRef.current.focusVisible();
    }
  }, [actionRef, props.hasWon]);
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  const handleClickSettings = () => {
    setSettingsOpen(true);
  }
  
  const handleCloseSettings = () => {
    setSettingsOpen(false);
  }
  
  const handleClickCalculations = () => {
    setColumnSums(props.getColumnSums());
    setCalculationsOpen(true);
  }
  
  const handleCloseCalculations = () => {
    setCalculationsOpen(false);
  }
  
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
          sum={props.sum}
        />
        <IconButton aria-label="Tips" color="inherit">
          <Lightbulb />
        </IconButton>
        <Typography variant="h6" component="h1" align="center" sx={{ flexGrow: 1 }}>
          Sum Disks
        </Typography>
        <IconButton aria-label="Calculations" onClick={handleClickCalculations} color="inherit">
          <Calculate />
        </IconButton>
        <SumDialog
          open={calculationsOpen}
          onClose={handleCloseCalculations}
          data={columnSums}
          sum={props.sum}
        />
        <IconButton aria-label="Settings" onClick={handleClickSettings} color="inherit">
          <Settings />
        </IconButton>
        <SettingsDialog
          open={settingsOpen}
          onClose={handleCloseSettings}
          sum={props.sum}
          setSum={props.setSum}
          numberOfDisks={props.numberOfDisks}
          setNumberOfDisks={props.setNumberOfDisks}
          numbersPerDisk={props.numbersPerDisk}
          setNumbersPerDisk={props.setNumbersPerDisk}
          includeNegatives={props.includeNegatives}
          setIncludeNegatives={props.setIncludeNegatives}
        />
        <IconButton action={actionRef} aria-label="New Game" onClick={props.handleClickNewGame} color="inherit">
          <FastForward />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;