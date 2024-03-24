import { useTheme } from '@mui/material/styles';
import { Fab, Zoom }  from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { keyframes } from '@mui/system';


const NewGameButton = (props) => {
  const theme = useTheme();
  const pulsate = keyframes`
    0% {
      transform: scale(1.0);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1.0);
    }
  `;
  
  return (
    <Zoom in={props.doTransition} timeout={{ enter: theme.transitions.duration.enteringScreen, exit: 0 }}>
      <Fab
        aria-label="New Game"
        className="newGameButton" 
        sx={{ 
          position: "fixed", 
          width: "4rem", 
          height: "4rem", 
          animation: props.doPulsate ? `${pulsate} 1s ease infinite` : "none",
          "@media (hover: none) or (pointer: coarse)": { backgroundColor: `${theme.palette.primary.main} !important` }
        }}
        color="primary"
        onClick={props.handleClick}
      >
        <FastForwardIcon/>
      </Fab>
    </Zoom>
  );
};

export default NewGameButton;