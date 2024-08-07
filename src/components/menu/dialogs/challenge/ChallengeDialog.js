import { useState } from 'react';
import {
  Box,
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
import { diskMarks, columnMarks, sumMarks, winMarks } from 'helpers/config';


const ChallengeDialog = (props) => {
  // State of dialog settings, only persisting to props on submit
  const [challengeSum, setChallengeSum] = useState(sumMarks.map((mark) => mark.value).indexOf(props.sum));
  const [challengeDisks, setChallengeDisks] = useState(props.numberOfDisks);
  const [challengeColumns, setChallengeColumns] = useState(props.numberOfColumns);
  const [challengeIncludeNegatives, setChallengeIncludeNegatives] = useState(props.includeNegatives);
  const [challengeTargetWins, setChallengeTargetWins] = useState(winMarks.map((mark) => mark.value).indexOf(props.targetWins));
  
  const scaledWinValue = (index) => {
    return winMarks[index].value;
  }
  
  const scaledWinMarks = winMarks.map((mark, index) => ({
    value: index,
    label: scaledWinValue(index)
  }));
  
  const onWinsChange = (event, newValue) => {
    setChallengeTargetWins(newValue);
  }
  
  const scaledSumValue = (index) => {
    return sumMarks[index].value;
  }
  
  const scaledSumMarks = sumMarks.map((mark, index) => ({
    value: index,
    label: scaledSumValue(index)
  }));
  
  const onSumChange = (event, newValue) => {
    setChallengeSum(newValue);
  }
  
  const onDisksChange = (event, newValue) => {
    setChallengeDisks(newValue);
  }
  
  const onColumnsChange = (event, newValue) => {
    setChallengeColumns(newValue);
  }
  
  const onNegativesChange = (event, newValue) => {
    setChallengeIncludeNegatives(newValue);
  }
  
  const handleClickCreate = () => {
    props.onCreate(scaledSumValue(challengeSum), challengeDisks, challengeColumns, challengeIncludeNegatives, scaledWinValue(challengeTargetWins));
  }
  
  return (
    <Dialog
      aria-labelledby="challenge-dialog-title"
      aria-describedby="challenge-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="challenge-dialog-title">Create Challenge</DialogTitle>
      <DialogContent id="challenge-dialog-content" dividers={true}>
        <DialogContentText component="div">
          <Typography id="wins-slider">
            Number of games
          </Typography>
          <Slider 
            aria-labelledby="wins-slider"
            value={challengeTargetWins}
            onChangeCommitted={onWinsChange}
            step={null}
            min={scaledWinMarks[0].value}
            max={scaledWinMarks[scaledWinMarks.length - 1].value}
            marks={scaledWinMarks}
            scale={scaledWinValue}
          />
        </DialogContentText>
        
        <DialogContentText sx={{ my: 2, fontWeight: 'bold' }}>
          Game Settings
        </DialogContentText>
        
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="sum-slider">
            Sum of numbers
          </Typography>
          <Slider 
            aria-labelledby="sum-slider"
            value={challengeSum}
            onChangeCommitted={onSumChange}
            step={null}
            min={scaledSumMarks[0].value}
            max={scaledSumMarks[scaledSumMarks.length - 1].value}
            marks={scaledSumMarks}
          />
        </DialogContentText>
        
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="disks-slider">
            Number of disks
          </Typography>
          <Slider 
            aria-labelledby="disks-slider"
            value={challengeDisks}
            onChangeCommitted={onDisksChange}
            step={null}
            min={diskMarks[0].value}
            max={diskMarks[diskMarks.length - 1].value}
            marks={diskMarks}
          />
        </DialogContentText>
      
        <DialogContentText component="div" sx={{ mb: 1 }}>
          <Typography id="columns-slider">
            Number of columns
          </Typography>
          <Slider 
            aria-labelledby="columns-slider"
            value={challengeColumns}
            onChangeCommitted={onColumnsChange}
            step={null}
            min={columnMarks[0].value}
            max={columnMarks[columnMarks.length - 1].value}
            marks={columnMarks}
          />
        </DialogContentText>
        
        <DialogContentText component="div">
          <Typography id="negatives-switch">
            Negative numbers
          </Typography>
          <Switch
            inputProps={{ 'aria-labelledby': 'negatives-switch' }}
            checked={challengeIncludeNegatives}
            onChange={onNegativesChange}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChallengeDialog;
