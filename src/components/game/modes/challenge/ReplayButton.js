import { useTheme } from '@mui/material/styles';
import { Fab, Zoom }  from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';


const ReplayButton = (props) => {
  const theme = useTheme();

  return (
    <Zoom in={props.doTransition} timeout={{ enter: theme.transitions.duration.enteringScreen, exit: 0 }}>
      <Fab
        aria-label="Replay Challenge"
        className="actionButton" 
        sx={{ 
          position: "fixed", 
          width: "4rem", 
          height: "4rem", 
          "@media (hover: none) or (pointer: coarse)": { backgroundColor: `${theme.palette.primary.main} !important` }
        }}
        color="primary"
        onClick={props.handleClick}
      >
        <LoopIcon/>
      </Fab>
    </Zoom>
  );
};

export default ReplayButton;