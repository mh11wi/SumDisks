import { useContext, useState } from 'react';
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
import { diskMarks, columnMarks, sumMarks } from 'helpers/config';
import { GameContext } from 'src/App';


const SettingsDialog = (props) => {
  const { gameMode, useSwipe, handleChangeUseSwipe } = useContext(GameContext);
  const [scaledSum, setScaledSum] = useState(sumMarks.map((mark) => mark.value).indexOf(props.sum));
  
  const scaledSumValue = (index) => {
    return sumMarks[index].value;
  }
  
  const scaledSumMarks = sumMarks.map((mark, index) => ({
    value: index,
    label: scaledSumValue(index)
  }));
  
  const onSumChange = (event, newValue) => {
    setScaledSum(newValue);
    
    const newSum = scaledSumValue(newValue);
    props.setSum(newSum);
  }
  
  const onDisksChange = (event, newValue) => {
    props.setNumberOfDisks(newValue);
  }
  
  const onColumnsChange = (event, newValue) => {
    props.setNumberOfColumns(newValue);
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
              value={scaledSum}
              onChangeCommitted={onSumChange}
              step={null}
              min={scaledSumMarks[0].value}
              max={scaledSumMarks[scaledSumMarks.length - 1].value}
              marks={scaledSumMarks}
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
              min={diskMarks[0].value}
              max={diskMarks[diskMarks.length - 1].value}
              marks={diskMarks}
            />
          </DialogContentText>
        }
        
        {gameMode === 'unlimited' &&
          <DialogContentText component="div" sx={{ mb: 1 }}>
            <Typography id="columns-slider">
              Number of columns
            </Typography>
            <Slider 
              aria-labelledby="columns-slider"
              value={props.numberOfColumns}
              onChangeCommitted={onColumnsChange}
              step={null}
              min={columnMarks[0].value}
              max={columnMarks[columnMarks.length - 1].value}
              marks={columnMarks}
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
          <DialogContentText component="div" sx={{ pt: gameMode === 'unlimited' ? 2 : 0 }}>
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
        
        {gameMode !== 'unlimited' && !isTouchDevice() &&
          <DialogContentText component="div">
            Stay tuned for future settings of this game mode.
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
