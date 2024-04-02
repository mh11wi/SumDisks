import { useContext, Fragment } from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {  
  FastForward, 
  Loop, 
  Menu, 
  Settings
} from '@mui/icons-material';
import { GameContext } from 'src/App';


const HelpDialog = (props) => {
  const { gameMode, targetSum, useSwipe, timerStatus } = useContext(GameContext);
  
  let instructions;
  if (useSwipe) {
    instructions = "You can rotate a disk by tapping on it, and then swiping left or right anywhere on the screen.";
  } else {
    instructions = "You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrows that appear.";
  }
  
  const ChallengeListItemText = () => {
    if (timerStatus === null) {
      return (
        <ListItemText>
          How quickly can you finish {props.challengeTargetWins} randomly generated games? Press START to begin the challenge.
        </ListItemText>
      );
    } else if (timerStatus === 'started') {
      return (
        <ListItemText>
          Keep going! Try to finish {props.challengeTargetWins} games as quickly as possible.
        </ListItemText>
      );
    } else if (timerStatus === 'stopped') {
      return (
        <Fragment>
          <ListItemText primary="Great work, you completed the challenge! When you are ready to try another, use the following buttons:" />
          <List>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <Loop />
              </ListItemIcon>
              <ListItemText primary="Replay the challenge" />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <Menu />
              </ListItemIcon>
              <ListItemText primary="Try a different game mode" />
            </ListItem>
          </List>
        </Fragment>
      )
    }
  }
  
  return (
    <Dialog
      aria-labelledby="help-dialog-title"
      aria-describedby="help-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="help-dialog-title">How To Play</DialogTitle>
      <DialogContent id="help-dialog-content" dividers={true} sx={{ p: 0 }}>
        <DialogContentText component="div">
          <List>
            <ListItem>
              <ListItemText>
                Rotate the disks so that every column of numbers adds up to { targetSum }.
              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>{ instructions }</ListItemText>
            </ListItem>

            {gameMode === 'unlimited' &&
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
                <ListItemText primary="Unlimited Mode" primaryTypographyProps={{ sx: { fontWeight: 'bold', width: '100%' } }} />
                <ListItemText>
                  Play as much as you like! Each game is randomly generated, so the fun is endless. When you are ready to try another, use the following buttons:
                </ListItemText>
                <List>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon>
                      <Settings />
                    </ListItemIcon>
                    <ListItemText primary="Change the game settings/difficulty" />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemIcon>
                      <FastForward />
                    </ListItemIcon>
                    <ListItemText primary="Start a new game with the same settings" />
                  </ListItem>
                </List>
              </ListItem>
            }
            
            {gameMode === 'challenge' && 
              <ListItem alignItems="flex-start" sx={{ flexDirection: 'column'}}>
                <ListItemText primary="Challenge Mode" primaryTypographyProps={{ sx: { fontWeight: 'bold', width: '100%' } }} />
                <ChallengeListItemText />
              </ListItem>
            }
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 1, flexGrow: 1 }}>
          <Link href="https://mh11wi.github.io/privacy-policy.html">Terms & Privacy Policy</Link>
        </DialogContentText>
        <Button onClick={props.onClose}>{(timerStatus !== null || gameMode === 'unlimited') ? 'Close' : 'Start'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
