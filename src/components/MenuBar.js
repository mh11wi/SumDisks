import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Calculate, Help, Home, Lightbulb, Settings, Share } from '@mui/icons-material';
import HelpDialog from './HelpDialog';
import SettingsDialog from './SettingsDialog';
import SumDialog from './SumDialog';
import TipsDialog from './TipsDialog';
import ShareDialog from './ShareDialog';

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

const MenuBar = (props) => {
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calculationsOpen, setCalculationsOpen] = useState(false);
  const [columnSums, setColumnSums] = useState(null);
  const [shareOpen, setShareOpen] = useState(false);
  
  const shareData = {
    title: "Sum Disks",
    text: props.getQueryString() ? "Can you solve this puzzle?" : "Like number games? Try:",
    url: "https://mh11wi.github.io/SumDisks" + props.getQueryString()
  };
  
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
  
  const handleClickShare = async () => {
    if (!isMobile()) {
      setShareOpen(true);
    } else {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setShareOpen(true);
        }
      }
    }
  }
  
  const handleCloseShare = () => {
    setShareOpen(false);
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
          useSwipeMode={props.useSwipeMode}
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
          useSwipeMode={props.useSwipeMode}
          setUseSwipeMode={props.setUseSwipeMode}
        />
        
        <IconButton aria-label="Share" onClick={handleClickShare} color="inherit">
          <Share />
        </IconButton>
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
        />
        
        <IconButton aria-label="Home" href="https://mh11wi.github.io" color="inherit">
          <Home />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;