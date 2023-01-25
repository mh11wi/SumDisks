import React, { createRef, useEffect, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Calculate, FastForward, Help, Home, Lightbulb, Settings } from '@mui/icons-material';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import SumDialog from './SumDialog';
import TipsDialog from './TipsDialog';

const MenuBar = (props) => {
  const actionRef = createRef();
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
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
  
  const handleClickTips = () => {
    setTipsOpen(true);
  }
  
  const handleCloseTips = () => {
    setTipsOpen(false);
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
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
          sum={props.sum}
        />
        
        <IconButton aria-label="Tips" onClick={handleClickTips} color="inherit">
          <Lightbulb />
        </IconButton>
        <TipsDialog
          open={tipsOpen}
          onClose={handleCloseTips}
        />
        
        <IconButton aria-label="Calculations" onClick={handleClickCalculations} color="inherit">
          <Calculate />
        </IconButton>
        <SumDialog
          open={calculationsOpen}
          onClose={handleCloseCalculations}
          data={columnSums}
          sum={props.sum}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Sum Disks
        </Typography>
        
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
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;