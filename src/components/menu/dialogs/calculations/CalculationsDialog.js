import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Paper,
  Table, 
  TableBody, 
  TableCell,
  TableContainer,
  TableHead, 
  TableRow 
} from '@mui/material';
import { getSum, transpose } from 'helpers/game';
import { GameContext } from 'src/App';


const CalculationsDialog = forwardRef((props, ref) => {
  const theme = useTheme();
  const { targetSum, rotatedDisksText } = useContext(GameContext);
  const [data, setData] = useState(null);
  
  useImperativeHandle(ref, () => {
    return {
      updateData() {
        const columnSums = [];
        const numberMatrix = transpose(rotatedDisksText);
        for (let i=0; i < numberMatrix.length; i++) {
          columnSums.push({
            calculation: numberMatrix[i].join(' + '),
            sum: getSum(numberMatrix[i])
          });
        }
        
        setData(columnSums);
      },
    };
  }, [rotatedDisksText]);
  
  return (
    <Dialog
      aria-labelledby="sum-dialog-title"
      aria-describedby="sum-dialog-content"
      fullWidth={true}
      maxWidth="sm"
      open={props.open} 
      onClose={props.onClose}
    >
      <DialogTitle id="sum-dialog-title">Calculations</DialogTitle>
      <DialogContent id="sum-dialog-content" dividers={true}>
        {data &&
          <TableContainer component={Paper}>
            <Table aria-label="Table of Sums" align="center">
              <TableHead sx={{ bgcolor: theme.palette.action.hover }}>
                <TableRow>
                  <TableCell>Column</TableCell>
                  <TableCell align="center">Calculation</TableCell>
                  <TableCell align="right" colSpan="2" sx={{ pr: "4rem" }}>Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => {
                  let symbol;
                  if (row.sum < targetSum) {
                    symbol = { icon: '▼', label: 'Too Low' };
                  } else if (row.sum > targetSum) {
                    symbol = { icon: '▲', label: 'Too High' };
                  } else {
                    symbol = { icon: '✓', label: 'Correct' };
                  }
                  
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        bgcolor: targetSum === row.sum ? (theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light) : 'inherit',
                        td: { color: targetSum === row.sum ? (theme.palette.mode === 'dark' ? theme.palette.success.light : theme.palette.success.dark) : 'inherit' }
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="center">{row.calculation}</TableCell>
                      <TableCell align="right">{row.sum}</TableCell>
                      <TableCell aria-label={symbol.label} sx={{ width: "1rem" }}>{symbol.icon}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
});

export default CalculationsDialog;