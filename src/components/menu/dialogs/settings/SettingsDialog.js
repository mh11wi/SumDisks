import { useContext } from 'react';
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
import { isTouchDevice } from 'helpers/app';
import { GameContext } from 'src/App';


const sumMarks = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

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
  { value: 7, label: '7' },
];

const SettingsDialog = (props) => {
  const { gameMode, useSwipe, handleChangeUseSwipe } = useContext(GameContext);
  
  const onSumChange = (event, newValue) => {
    props.setSum(newValue);
  }
  
  const onNumbersChange = (event, newValue) => {
    props.setNumbersPerDisk(newValue);
  }
  
  const onDisksChange = (event, newValue) => {
    props.setNumberOfDisks(newValue);
  }
  
  const onNegativesChange = (event, newValue) => {
    props.setIncludeNegatives(newValue);
  }
  
  const onSwipeChange = (event, newValue) => {
    handleChangeUseSwipe(newValue);
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
      <DialogContent id="settings-dialog-content" dividers={true}>
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="sum-slider">
              Sum of numbers
            </Typography>
            <Slider 
              aria-labelledby="sum-slider"
              value={props.sum}
              onChangeCommitted={onSumChange}
              step={null}
              min={10}
              max={100}
              marks={sumMarks}
            />
          </DialogContentText>
        }
        
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="numbers-slider">
              Numbers per disk
            </Typography>
            <Slider 
              aria-labelledby="numbers-slider"
              value={props.numbersPerDisk}
              onChangeCommitted={onNumbersChange}
              step={null}
              min={2}
              max={6}
              marks={numbersMarks}
            />
          </DialogContentText>
        }
        
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="disks-slider">
              Number of disks
            </Typography>
            <Slider 
              aria-labelledby="disks-slider"
              value={props.numberOfDisks}
              onChangeCommitted={onDisksChange}
              step={null}
              min={3}
              max={7}
              marks={disksMarks}
            />
          </DialogContentText>
        }
        
        {gameMode === 'unlimited' &&
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
        }
        
        {isTouchDevice() && 
          <DialogContentText component="div" sx={{ pt: 2 }}>
            <Typography id="swipe-mode-switch">
              Swipe to rotate
            </Typography>
            <Switch
              inputProps={{ 'aria-labelledby': 'swipe-mode-switch' }}
              checked={useSwipe}
              onChange={onSwipeChange}
            />
          </DialogContentText>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
