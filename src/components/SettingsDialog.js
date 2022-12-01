import React from 'react';
import {
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Slider,
  Switch,
  Typography
} from '@mui/material';

const numbersMarks = [
  { value: 2, label: '2' },
  { value: 4, label: '4' },
  { value: 6, label: '6' },
];

const disksMarks = [
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
];

const SettingsDialog = (props) => {
  const onNumbersChange = (event, newValue) => {
    props.setNumbersPerDisk(newValue);
  }
  
  const onDisksChange = (event, newValue) => {
    props.setNumberOfDisks(newValue);
  }
  
  const onNegativesChange = (event, newValue) => {
    props.setIncludeNegatives(newValue);
  }
  
  return (
    <Dialog
      aria-labelledby="settings-dialog-title"
      aria-describedby="settings-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
      <DialogContent id="settings-dialog-content">
        <DialogContentText component="div" sx={{ mb: 3 }}>
          <Typography id="numbers-slider">
            Numbers per disk
          </Typography>
          <Slider 
            aria-labelledby="numbers-slider"
            value={props.numbersPerDisk}
            onChangeCommitted={onNumbersChange}
            step={2}
            min={2}
            max={6}
            marks={numbersMarks}
          />
        </DialogContentText>
        <DialogContentText component="div" sx={{ mb: 3 }}>
          <Typography id="disks-slider">
            Number of disks
          </Typography>
          <Slider 
            aria-labelledby="disks-slider"
            value={props.numberOfDisks}
            onChangeCommitted={onDisksChange}
            step={1}
            min={3}
            max={6}
            marks={disksMarks}
          />
        </DialogContentText>
        <DialogContentText component="div">
          <Typography id="negatives-switch">
            Negative numbers
          </Typography>
          <Switch
            inputProps={{ 'aria-labelledby': 'negatives-switch' }}
            checked={props.includeNegatives}
            onChange={onNegativesChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;