import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import party from 'party-js';
import ReactDisks from 'react-disks';
import ConsecutiveSnackbars from 'components/game/ConsecutiveSnackbars';
import { GameContext } from 'src/App';
import { debounce } from 'helpers/app';
import { isSolved, newGame } from 'helpers/game';


const GameInterface = forwardRef((props, ref) => {
  const theme = useTheme();
  const { targetSum, setTargetSum, disksText, setDisksText, setRotatedDisksText, useSwipe } = useContext(GameContext);
  const [hasWon, setHasWon] = useState(false);
  const [snackPack, setSnackPack] = useState([]);
  
  useEffect(() => {
    if (hasWon) {
      const element = document.querySelector('.DisksContainer');
      party.confetti(element, {
        count: party.variation.range(50, 70),
      });
      props.handleWin();
    }
  }, [hasWon]);
  
  useImperativeHandle(ref, () => {
    return {
      displaySnack(message) {
        setSnackPack((prev) => [...prev, { 
          message: message, 
          key: new Date().getTime() 
        }]);
      },
      
      loadNewGame(sum, numberOfDisks, numberOfColumns, includeNegatives) {
        const game = newGame(sum, numberOfDisks, numberOfColumns, includeNegatives);
        setTargetSum(sum);
        setDisksText(game);
        setRotatedDisksText(game);
        setHasWon(false);
      },
    };
  }, [props.sum]);
  
  const onRotate = (rotatedDisksText) => {
    setRotatedDisksText(rotatedDisksText);
    setHasWon(isSolved(targetSum, rotatedDisksText));
  }
  
  return (
    <Box className="Game" sx={{ position: 'relative' }}>
      <Box 
        className="gameLabel left" 
        sx={{ 
          color: props.completed ? 'success.dark' : '',
          fontWeight: props.completed ? '500' : ''
        }}
      >
        { props.left }
      </Box>
      <Box 
        className="gameLabel right" 
        sx={{ 
          color: props.completed ? 'success.dark' : '',
          fontWeight: props.completed ? '500' : '' 
        }}
      >
        { props.right }
      </Box>
      <ReactDisks 
        disksText={disksText}
        theme={theme.palette.primary}
        onRotate={debounce(onRotate, 500)}
        disabled={hasWon}
        swipeMode={useSwipe}
        swipeContainer={".Main"}
      />
      { props.actionButton }
      <ConsecutiveSnackbars snackPack={snackPack} setSnackPack={setSnackPack} />
    </Box>
  );
});

export default GameInterface;