import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import pink from '@mui/material/colors/pink';
import Box from '@mui/material/Box';
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

const SUM = 100;

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
      light: pink[100],
      dark: pink[800]
    }
  },
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min) + min);
}

function getSum(array) {
  return array.reduce((partialSum, a) => partialSum + a, 0);
}

function generateNonNegtiveColumn(length) {
  const tmp = [];
  for (let i=0; i < length - 1; i++) {
    tmp.push(Math.random());
  }
  tmp.push(0);
  tmp.push(1);
  tmp.sort((a,b) => a - b);
  
  const column = [];
  for (let i=0; i < tmp.length - 1; i++) {
    column.push(Math.floor(SUM * (tmp[i + 1] - tmp[i])));
  }
  
  const currentSum = getSum(column);
  const index = getRandomInt(0, length);
  column[index] += SUM - currentSum;
  
  return column;
}

function generateIntegerColumn(length) {
  const column = [];
  for (let i=0; i < length - 1; i++) {
    column.push(getRandomInt(-SUM + 1, SUM))
  }
  const currentSum = getSum(column);
  column.push(SUM - currentSum);
  return column;
}

function generateNumberColumn(length, includeNegatives) {
  if (includeNegatives) {
    return generateIntegerColumn(length);
  }
  
  return generateNonNegtiveColumn(length);
}

function generateNumberMatrix(numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = [];
  for (let i=0; i < numbersPerDisk; i++) {
    const numberColumn = generateNumberColumn(numberOfDisks, includeNegatives);
    numberMatrix.push(numberColumn);
  }
  return numberMatrix;
}


function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function rotate(array) {
  return array.push(array.shift());
}

function randomRotate(matrix) {
  return matrix.map((row) => {
    const numberOfRotations = getRandomInt(0, row.length);
    for (let i=0; i < numberOfRotations; i++) {
      rotate(row);
    }
    return row;
  });
}

function isSolved(answer) {
  const numberMatrix = transpose(answer);
  return numberMatrix.every((numberColumn) => getSum(numberColumn) === SUM);
}

function newGame(numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = generateNumberMatrix(numberOfDisks, numbersPerDisk, includeNegatives);
  const disksText = transpose(numberMatrix);
  randomRotate(disksText);
  
  if (isSolved(disksText)) {
    return newGame(numberOfDisks, numbersPerDisk, includeNegatives);
  }
  
  return disksText;
}

function App() {
  const [disksText, setDisksText] = useState(null);
  const [numberOfDisks, setNumberOfDisks] = useState(4);
  const [numbersPerDisk, setNumbersPerDisk] = useState(4);
  const [includeNegatives, setIncludeNegatives] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  
  useEffect(() => {
    setDisksText(newGame(numberOfDisks, numbersPerDisk, includeNegatives));
    setHasWon(false);
  }, [numberOfDisks, numbersPerDisk, includeNegatives]);
  
  const onRotate = (rotatedDisksText) => {
    setTimeout(() => setHasWon(isSolved(rotatedDisksText)), 500);
  }
  
  const handleClickNewGame = () => {
    setDisksText(newGame(numberOfDisks, numbersPerDisk, includeNegatives));
    setHasWon(false);
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <MenuBar 
            handleClickNewGame={handleClickNewGame}
            hasWon={hasWon}
          />
        </Box>
        <Box role="main" sx={{ flexGrow: 1, height: "calc(100% - 4rem)"}}>
          <ReactDisks 
            disksText={disksText}
            theme={theme.palette.primary}
            onRotate={onRotate}
            disabled={hasWon}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
