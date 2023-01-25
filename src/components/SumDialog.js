import React from 'react';
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


const SumDialog = (props) => {
  const theme = useTheme();
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
        {props.data &&
          <TableContainer component={Paper}>
            <Table aria-label="Table of Sums" align="center">
              <TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
                <TableRow>
                  <TableCell>Column</TableCell>
                  <TableCell align="center">Calculation</TableCell>
                  <TableCell align="right" colSpan="2" sx={{ pr: "4rem" }}>Sum</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.data.map((row, index) => {
                  let symbol;
                  if (row.sum < props.sum) {
                    symbol = { icon: '▼', label: 'Too Low' };
                  } else if (row.sum > props.sum) {
                    symbol = { icon: '▲', label: 'Too High' };
                  } else {
                    symbol = { icon: '✓', label: 'Correct' };
                  }
                  
                  return (
                    <TableRow
                      key={index}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        backgroundColor: props.sum === row.sum ? theme.palette.success.light : 'inherit',
                        td: { color: props.sum === row.sum ? theme.palette.success.dark : 'inherit' }
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
};

export default SumDialog;