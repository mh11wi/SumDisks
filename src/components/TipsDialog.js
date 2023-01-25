import React from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Link
} from '@mui/material';

const TipsDialog = (props) => {
  return (
    <Dialog
      aria-labelledby="tips-dialog-title"
      aria-describedby="tips-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="tips-dialog-title">Tips & Tidbits</DialogTitle>
      <DialogContent id="tips-dialog-content" dividers={true}>
        This game was inspired by a physical version I saw at <Link href="https://www.museumofplay.org/" target="_blank">The Strong National Museum of Play</Link>. Some variability was added.
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipsDialog;
