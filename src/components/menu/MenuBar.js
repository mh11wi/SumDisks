import { useContext, useRef, useState } from 'react';
import { 
  AppBar, 
  FormControl, 
  IconButton, 
  ListItemIcon,
  ListItemText,
  MenuItem, 
  Select, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  AllInclusive,
  Calculate, 
  Grade,
  Help, 
  Menu, 
  Settings 
} from '@mui/icons-material';
import MainMenu from 'components/menu/MainMenu';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';
import SettingsDialog from 'components/menu/dialogs/settings/SettingsDialog';
import CalculationsDialog from 'components/menu/dialogs/calculations/CalculationsDialog';
import TipsDialog from 'components/menu/dialogs/tips/TipsDialog';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import StatisticsDialog from 'components/menu/dialogs/statistics/StatisticsDialog';
import ChallengeDialog from 'components/menu/dialogs/challenge/ChallengeDialog';
import { isMobile } from 'helpers/app';
import { GameContext } from 'src/App';


function getChallengeQuery(sum, disks, columns, negatives, wins) {
  return `?challenge=${sum}_${disks}_${columns}_${negatives ? 1 : 0}_${wins}`;
}

const MenuBar = (props) => {
  const calculationsRef = useRef();
  const { gameMode, disksText, timerStatus, setTimerStatus } = useContext(GameContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(true);
  const [tipsOpen, setTipsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [calculationsOpen, setCalculationsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [statisticsOpen, setStatisticsOpen] = useState(false);
  const [challengeOpen, setChallengeOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState(gameMode);
  
  let text, query;  
  switch (gameMode) {
    case 'challenge':
      text = `How quickly can you solve ${props.challengeTargetWins} puzzles?`;
      query = getChallengeQuery(props.challengeSum, props.challengeDisks, props.challengeColumns, props.challengeIncludeNegatives, props.challengeTargetWins);
      break;
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
    if (gameMode !== 'unlimited' && timerStatus === null) {
      setTimeout(function() {
        setTimerStatus('started');
      }, 500);
    }
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
  
  const handleChangeMode = (event) => {
    const selected = event.target.closest('.modeOption')?.getAttribute('data-value');
    
    if (selected) {
      setSelectedMode(selected);
      
      let query = '';
      switch (selected) {
        case "challenge":
          setChallengeOpen(true);
          break;     
        default:
          if (gameMode !== selected) {
            window.location = window.location.origin + window.location.pathname + query;
            setTimeout(function() {
              setSelectedMode(gameMode);
            }, 500);
          }
          break;
      }
    }
  }
  
  const handleCloseChallenge = () => {
    setSelectedMode(gameMode);
    setChallengeOpen(false);
  }
  
  const handleCreateChallenge = (sum , disks, columns, negatives, wins) => {
    setChallengeOpen(false);
    const query = getChallengeQuery(sum, disks, columns, negatives, wins);
    window.location = window.location.origin + window.location.pathname + query;
    setTimeout(function() {
      setSelectedMode(gameMode);
    }, 500);
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
          handleChangeMode={handleChangeMode}
        />
        
        <FormControl sx={{ width: 'calc(80px - 0.5rem)', mr: '0.5rem' }} size="small">
          <Select 
            value={selectedMode} 
            onClose={handleChangeMode}
            sx={{
              color: "white",
              '.MuiSelect-select': {
                display: "flex !important",
              },
              '.MuiSelect-select .MuiListItemText-root': {
                display: "none !important",
              },
              '.MuiOutlinedInput-notchedOutline': {
                border: 0,
              },
              '&.Mui-focused': {
                backgroundColor: "rgb(255, 255, 255, 0.2) !important",
                borderRadius: "7.5px",
              },
              '&:hover': {
                backgroundColor: "rgb(0, 0, 0, 0.04)",
                borderRadius: "7.5px",
              },
              '.MuiSvgIcon-root ': {
                fill: "white",
              }
            }}
          >
            <MenuItem className="modeOption" value="unlimited">
              <ListItemIcon>
                <AllInclusive />
              </ListItemIcon>
              <ListItemText>Unlimited Mode</ListItemText>
            </MenuItem>
            <MenuItem className="modeOption" value="challenge">
              <ListItemIcon>
                <Grade />
              </ListItemIcon>
              <ListItemText>Challenge Mode</ListItemText>
            </MenuItem>
          </Select>
        </FormControl>
        <ChallengeDialog
          open={challengeOpen}
          onClose={handleCloseChallenge}
          onCreate={handleCreateChallenge}
          sum={props.challengeSum}
          numberOfDisks={props.challengeDisks}
          numberOfColumns={props.challengeColumns}
          includeNegatives={props.challengeIncludeNegatives}
          targetWins={props.challengeTargetWins}
        />
        
        <Typography variant="h5" component="h1" align="center" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Sum Disks
        </Typography>
        
        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Help />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
          challengeTargetWins={props.challengeTargetWins}
        />
        
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
          numberOfDisks={props.unlimitedDisks}
          setNumberOfDisks={props.setUnlimitedDisks}
          numberOfColumns={props.unlimitedColumns}
          setNumberOfColumns={props.setUnlimitedColumns}
          includeNegatives={props.unlimitedIncludeNegatives}
          setIncludeNegatives={props.setUnlimitedIncludeNegatives}
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
          challengeStats={props.challengeStats}
        />
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;