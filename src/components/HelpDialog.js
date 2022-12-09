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
import { FastForward, Settings } from '@mui/icons-material';

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
            <ListItem disablePadding>
              <ListItemText>
                Rotate the disks so every column of numbers add up to { props.sum }.
              </ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="You can rotate a disk by clicking on it, and then clicking either the clockwise or counterclockwise arrow." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText>
                This game was inspired by a physical version I saw at <Link href="https://www.museumofplay.org/" target="_blank">The Strong National Museum of Play</Link>. Some variability was added.
              </ListItemText>
            </ListItem>
            <ListItem disablePadding sx={{ mt: 2, px: 0 }}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Open the settings menu to adjust the game" />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
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
        <Button autoFocus onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpDialog;
