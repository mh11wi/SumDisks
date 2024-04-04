import { useContext } from 'react';
import { 
  Box, 
  Drawer, 
  FormControl,
  InputLabel,
  Link, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  MenuItem,
  Select
} from '@mui/material';
import { 
  AllInclusive,
  Calculate, 
  Facebook,
  Grade,  
  Help, 
  Home, 
  Leaderboard, 
  Lightbulb, 
  Settings, 
  Share, 
  Twitter, 
  YouTube 
} from '@mui/icons-material';
import { GameContext } from 'src/App';


const MainMenu = (props) => {
  const { gameMode } = useContext(GameContext);
  
  const handleClickHelp = () => {
    props.onClose();
    props.handleClickHelp();
  }
  
  const handleClickTips = () => {
    props.onClose();
    props.handleClickTips();
  }

  const handleClickSettings = () => {
    props.onClose();
    props.handleClickSettings();
  }
  
  const handleClickCalculations = () => {
    props.onClose();
    props.handleClickCalculations();
  }
  
  const handleClickShare = async () => {
    props.onClose();
    await props.handleClickShare();
  }
  
  const handleClickStatistics = () => {
    props.onClose();
    props.handleClickStatistics();
  }
  
  const handleChangeMode = (event) => {
    const selected = event.target.closest('.modeOption')?.getAttribute('data-value');
    
    if (selected) {
      props.onClose();
      props.handleChangeMode(event);
    }
  }
  
  return (
    <Drawer
      PaperProps={{ 
        sx: { 
          width: {
            xs: '50%',
            sm: '33%',
            lg: '20%',
            xl: '17.5%'
          }
        }
      }}
      open={props.open} 
      onClose={props.onClose} 
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <List sx={{ mb: 2 }}>
          <ListItem>
            <FormControl sx={{ width: '100%', my: 2 }}>
              <InputLabel id="game-mode-label">Game Mode</InputLabel>
              <Select
                labelId="game-mode-label"
                id="game-mode"
                label="Game Mode"
                defaultValue={gameMode}
                onClose={handleChangeMode}
                sx={{ 
                  '.MuiListItemIcon-root': { minWidth: 'auto', pr: 2 },
                  '.MuiSelect-select': { display: "flex !important", alignItems: 'center' },
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
          </ListItem>
        
          <ListItemButton onClick={handleClickHelp}>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText>How To Play</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickTips}>
            <ListItemIcon>
              <Lightbulb />
            </ListItemIcon>
            <ListItemText>Tips & Tidbits</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickStatistics}>
            <ListItemIcon>
              <Leaderboard />
            </ListItemIcon>
            <ListItemText>Stats & Achievements</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickCalculations}>
            <ListItemIcon>
              <Calculate />
            </ListItemIcon>
            <ListItemText>Calculations</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickSettings}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
          
          <ListItemButton onClick={handleClickShare}>
            <ListItemIcon>
              <Share />
            </ListItemIcon>
            <ListItemText>Share Game</ListItemText>
          </ListItemButton>
          
          <Link href="https://mh11wi.github.io" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton onClose={props.onClose}>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItemButton>
          </Link>
        </List>
        
        <List sx={{ borderTop: '1px solid #dbdbdb' }}>
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <YouTube />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://youtube.com/@sumdisks" 
                target="_blank" 
                sx={{ fontSize: '0.9em'}}
              >
                youtube.com/@sumdisks
              </Link>
            </ListItemText>
          </ListItem>
          
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Facebook />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://facebook.com/sumdisks" 
                target="_blank"
                sx={{ fontSize: '0.9em'}}
              >
                facebook.com/sumdisks
              </Link>
            </ListItemText>
          </ListItem>
          
          <ListItem sx={{ py: 0 }}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              <Twitter />
            </ListItemIcon>
            <ListItemText>
              <Link 
                href="https://twitter.com/sumdisks" 
                target="_blank"
                sx={{ fontSize: '0.9em'}}
              >
                twitter.com/sumdisks
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default MainMenu;