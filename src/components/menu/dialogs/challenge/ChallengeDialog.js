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
  const onWinsChange = (event, newValue) => {
    props.setTargetWins(newValue);
  }
  
  const onSumChange = (event, newValue) => {
    props.setSum(newValue);
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
            value={props.targetWins}
            onChangeCommitted={onWinsChange}
            step={null}
            min={winMarks[0].value}
            max={winMarks[winMarks.length - 1].value}
            marks={winMarks}
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
            value={props.sum}
            onChangeCommitted={onSumChange}
            step={null}
            min={sumMarks[0].value}
            max={sumMarks[sumMarks.length - 1].value}
            marks={sumMarks}
          />
        </DialogContentText>
        
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
        <Button onClick={props.onClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChallengeDialog;
