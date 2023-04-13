import React from 'react';
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
  ListItemText,
  Typography
} from '@mui/material';
import { 
  Calculate, 
  FastForward, 
  Help,
  Home,
  Lightbulb, 
  Settings,
  Share
} from '@mui/icons-material';

const HelpDialog = (props) => {
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
      <DialogContent id="help-dialog-content" dividers={true} sx={{ p: 0, maxHeight: '475px' }}>
        <DialogContentText component="div">
          <List>
            <ListItem>
              <ListItemText>
                Rotate the disks so that every column of numbers adds up to { props.sum }.
              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>
                You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrows that appear.
              </ListItemText>
            </ListItem>
          </List>
          
          <Typography align="center" sx={{ fontWeight: 500, fontSize: '1.1em', textDecoration: 'underline', pt: 2 }}>
            Other Controls
          </Typography>
          
          <List>
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', py: 0 }}>
              <ListItemText>
                If you ever feel stuck, the following buttons may assist you in the game:
              </ListItemText>
              <List>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    <Help />
                  </ListItemIcon>
                  <ListItemText primary="Open this help dialog again" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    <Lightbulb />
                  </ListItemIcon>
                  <ListItemText primary="Read some tips & tidbits about the game" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    <Calculate />
                  </ListItemIcon>
                  <ListItemText primary="Check the current sum of each column" />
                </ListItem>
              </List>
            </ListItem>
            
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', pb: 0 }}>
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
            
            <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', pb: 0 }}>
              <ListItemText>
                If you would like to support me, please share this game or check out my other work by using the following buttons:
              </ListItemText>
              <List>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    <Share />
                  </ListItemIcon>
                  <ListItemText primary="Select a method of sharing" />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon>
                    <Home />
                  </ListItemIcon>
                  <ListItemText primary="Visit my online portfolio" />
                </ListItem>
              </List>
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 1, flexGrow: 1 }}>
          <Link href="https://mh11wi.github.io/privacy-policy.html">Terms & Privacy Policy</Link>
        </DialogContentText>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
