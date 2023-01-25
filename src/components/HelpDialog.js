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
  ListItemText
} from '@mui/material';
import { Calculate, FastForward, Help, Lightbulb, Settings } from '@mui/icons-material';

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
      <DialogContent id="help-dialog-content" dividers={true} sx={{ px: 2, py: 0 }}>
        <DialogContentText component="div">
          <List>
            <ListItem>
              <ListItemText>
                Rotate the disks so every column of numbers add up to { props.sum }.
              </ListItemText>
            </ListItem>
            
            <ListItem>
              <ListItemText>
                You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrows that appear.
              </ListItemText>
            </ListItem>
            
            <ListItem sx={{ pb: 0 }}>
              <ListItemText>
                If you ever feel stuck, the following icons may assist you:
              </ListItemText>
            </ListItem>
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
            <ListItem sx={{ pt: 0 }}>
              <ListItemIcon>
                <Calculate />
              </ListItemIcon>
              <ListItemText primary="Check the current sum of each column" />
            </ListItem>
            
            <ListItem sx={{ pb: 0 }}>
              <ListItemText>
                Play as much as you like! Each game is randomly generated, so the fun is endless. When you are ready to try another, use the following icons:
              </ListItemText>
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Change the difficulty of the next game" />
            </ListItem>
            <ListItem sx={{ pt: 0 }}>
              <ListItemIcon>
                <FastForward />
              </ListItemIcon>
              <ListItemText primary="Start a new game with the same settings" />
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DialogContentText sx={{ ml: 1, flexGrow: 1 }}>
          Like Sum Disks? Try <Link href="https://mh11wi.github.io/WordDisks/" target="_blank">Word Disks</Link>!
        </DialogContentText>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
