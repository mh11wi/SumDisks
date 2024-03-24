import { useContext, useRef, useState } from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Calculate, Help, Menu, Settings } from '@mui/icons-material';
import MainMenu from 'components/menu/MainMenu';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';
import SettingsDialog from 'components/menu/dialogs/settings/SettingsDialog';
import CalculationsDialog from 'components/menu/dialogs/calculations/CalculationsDialog';
import TipsDialog from 'components/menu/dialogs/tips/TipsDialog';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import StatisticsDialog from 'components/menu/dialogs/statistics/StatisticsDialog';
import { isMobile } from 'helpers/app';
import { GameContext } from 'src/App';


const MenuBar = (props) => {
  const calculationsRef = useRef();
  const { gameMode, disksText } = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calculationsOpen, setCalculationsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  
  let text, query;
  switch (gameMode) {
    case 'unlimited':
      if (disksText) {
        const disks = disksText.map((disk) => disk.join('.')).join('_');
        text = "Can you solve this puzzle?";
        query = `?disks=${disks}`;
        break;
      }
    default:
      text = "Like number games? Try:";
      query = "";
      break;
  }
  
  const shareData = {
    title: "Sum Disks",
    text: text,
    url: "https://mh11wi.github.io/SumDisks" + query
  };
  
  const handleClickMenu = () => {
    setMenuOpen(true);
  }
  
  const handleCloseMenu = () => {
    setMenuOpen(false);
  }
  
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
    calculationsRef.current.updateData();
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
  
  const handleClickStatistics = () => {
    setStatisticsOpen(true);
  }
  
  const handleCloseStatistics = () => {
    setStatisticsOpen(false);
  }
  
  return (
    <AppBar position="relative">
      <Toolbar variant="dense">
        <IconButton aria-label="Menu" onClick={handleClickMenu} color="inherit">
          <Menu />
        </IconButton>
        <MainMenu
          open={menuOpen}
          onClose={handleCloseMenu}
          handleClickHelp={handleClickHelp}
          handleClickTips={handleClickTips}
          handleClickCalculations={handleClickCalculations}
          handleClickShare={handleClickShare}
          handleClickSettings={handleClickSettings}
          handleClickStatistics={handleClickStatistics}
        />
        
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Sum Disks
        </Typography>
        
        <IconButton aria-label="Calculations" onClick={handleClickCalculations} color="inherit">
          <Calculate />
        </IconButton>
        <CalculationsDialog
          ref={calculationsRef}
          open={calculationsOpen}
          onClose={handleCloseCalculations}
        />
        
        <IconButton aria-label="Settings" onClick={handleClickSettings} color="inherit">
          <Settings />
        </IconButton>
        <SettingsDialog
          open={settingsOpen}
          onClose={handleCloseSettings}
          sum={props.unlimitedSum}
          setSum={props.setUnlimitedSum}
          numberOfDisks={props.numberOfDisks}
          setNumberOfDisks={props.setNumberOfDisks}
          numbersPerDisk={props.numbersPerDisk}
          setNumbersPerDisk={props.setNumbersPerDisk}
          includeNegatives={props.includeNegatives}
          setIncludeNegatives={props.setIncludeNegatives}
        />
        
        {/* Dialogs where icon only in MainMenu: */}
        <TipsDialog
          open={tipsOpen}
          onClose={handleCloseTips}
        />
        
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
        />
        
        <StatisticsDialog
          open={statisticsOpen}
          onClose={handleCloseStatistics}
          unlimitedStats={props.unlimitedStats}
        />
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;