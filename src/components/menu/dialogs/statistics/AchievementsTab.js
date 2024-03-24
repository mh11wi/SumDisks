import { Alert, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { getSum } from 'helpers/game';


const AchievementsTab = (props) => {
  const unlimitedWins = getSum(props.unlimitedStats);
  
  return (
    <Box sx={{ width: "80%", p: 2 }}>
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 1 ? "secondary" : ""}
        icon={unlimitedWins < 1 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 1 game
      </Alert>
      
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 5 ? "secondary" : ""}
        icon={unlimitedWins < 5 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 5 games
      </Alert>
      
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 10 ? "secondary" : ""}
        icon={unlimitedWins < 10 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 10 games
      </Alert>
      
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 20 ? "secondary" : ""}
        icon={unlimitedWins < 20 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 20 games
      </Alert>
      
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 50 ? "secondary" : ""}
        icon={unlimitedWins < 50 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 50 games
      </Alert>
      
      <Alert 
        variant="filled" 
        severity="success"
        color={unlimitedWins < 100 ? "secondary" : ""}
        icon={unlimitedWins < 100 ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        Win 100 games
      </Alert>
    </Box>
  );
};

export default AchievementsTab;
