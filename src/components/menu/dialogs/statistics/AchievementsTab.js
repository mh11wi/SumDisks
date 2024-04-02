import { Alert, Box } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { getSum } from 'helpers/game';
import { unlimitedThresholds, challengeThresholds } from 'helpers/config';


const AchievementsTab = (props) => {
  const unlimitedWins = getSum(props.unlimitedStats);
  const challengeWins = props.challengeStats;
  
  const unlimitedAchievements = unlimitedThresholds.map((threshold) => {
    return (
      <Alert 
        key={'unlimited-' + threshold}
        variant="filled" 
        severity="success"
        color={unlimitedWins < threshold ? "secondary" : ""}
        icon={unlimitedWins < threshold ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        <strong>Unlimited Mode:</strong> Win { threshold } game{ threshold === 1 ? '' : 's' }
      </Alert>
    )
  });
  
  const challengeAchievements = challengeThresholds.map((threshold) => {
    return (
      <Alert 
        key={'challenge-' + threshold}
        variant="filled" 
        severity="success"
        color={challengeWins < threshold ? "secondary" : ""}
        icon={challengeWins < threshold ? <RadioButtonUncheckedIcon fontSize="inherit" /> : ""}
        sx={{ mb: 1 }}
      >
        <strong>Challenge Mode:</strong> Complete { threshold } challenge{ threshold === 1 ? '' : 's' }
      </Alert>
    )
  });
  
  return (
    <Box sx={{ width: "80%", p: 2 }}>
      { unlimitedAchievements }
      { challengeAchievements }
    </Box>
  );
};

export default AchievementsTab;
