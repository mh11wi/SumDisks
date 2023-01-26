import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import party from "party-js";
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
      light: pink[100],
      dark: pink[800]
    },
    success: {
      light: green[100],
      main: green[500],
      dark: green[900]
    },
  }
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

function generateNonNegtiveColumn(sum, length) {
  const tmp = [];
  for (let i=0; i < length - 1; i++) {
    tmp.push(Math.random());
  }
  tmp.push(0);
  tmp.push(1);
  tmp.sort((a,b) => a - b);
  
  const column = [];
  for (let i=0; i < tmp.length - 1; i++) {
    column.push(Math.floor(sum * (tmp[i + 1] - tmp[i])));
  }
  
  const currentSum = getSum(column);
  const index = getRandomInt(0, length);
  column[index] += sum - currentSum;
  
  return column;
}

function generateIntegerColumn(sum, length) {
  const column = [];
  for (let i=0; i < length - 1; i++) {
    column.push(getRandomInt(-sum + 1, sum))
  }
  
  const currentSum = getSum(column);
  if (Math.abs(sum - currentSum) >= sum) {
    return generateIntegerColumn(sum, length);
  }  
    
  column.push(sum - currentSum);
  return column;
}

function generateNumberColumn(sum, length, includeNegatives) {
  if (includeNegatives) {
    return generateIntegerColumn(sum, length);
  }
  
  return generateNonNegtiveColumn(sum, length);
}

function generateNumberMatrix(sum, numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = [];
  for (let i=0; i < numbersPerDisk; i++) {
    const numberColumn = generateNumberColumn(sum, numberOfDisks, includeNegatives);
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

function isSolved(sum, answer) {
  const numberMatrix = transpose(answer);
  return numberMatrix.every((numberColumn) => getSum(numberColumn) === sum);
}

function newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives) {
  const numberMatrix = generateNumberMatrix(sum, numberOfDisks, numbersPerDisk, includeNegatives);
  const disksText = transpose(numberMatrix);
  randomRotate(disksText);
  
  if (isSolved(sum, disksText)) {
    return newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives);
  }
  
  return disksText;
}

function App() {
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [sum, setSum] = useState(parseInt(localStorage.getItem('sd-sum')) || 100);
  const [numberOfDisks, setNumberOfDisks] = useState(parseInt(localStorage.getItem('sd-numberOfDisks')) || 4);
  const [numbersPerDisk, setNumbersPerDisk] = useState(parseInt(localStorage.getItem('sd-numbersPerDisk')) || 4);
  const [includeNegatives, setIncludeNegatives] = useState(localStorage.getItem('sd-includeNegatives') === 'true');
  const [hasWon, setHasWon] = useState(false);
  
  useEffect(() => {
    const game = newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives);
    setDisksText(game);
    setRotatedDisksText(game);
    setHasWon(false);
  }, [sum, numberOfDisks, numbersPerDisk, includeNegatives]);
  
  useEffect(() => {
    if (hasWon) {
      const element = document.querySelector('.DisksContainer');
      party.confetti(element, {
        count: party.variation.range(50, 70),
      });
    }
  }, [hasWon]);
  
  const onRotate = (rotatedDisksText) => {
    setRotatedDisksText((rotatedDisksText));
    setTimeout(() => setHasWon(isSolved(sum, rotatedDisksText)), 500);
  }
  
  const handleClickNewGame = () => {
    const game = newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives);
    setDisksText(game);
    setRotatedDisksText(game);
    setHasWon(false);
  }
  
  const handleChangeSum = (val) => {
    setSum(val);
    localStorage.setItem('sd-sum', val);
  }
  
  const handleChangeNumberOfDisks = (val) => {
    setNumberOfDisks(val);
    localStorage.setItem('sd-numberOfDisks', val);
  }
  
  const handleChangeNumbersPerDisk = (val) => {
    setNumbersPerDisk(val);
    localStorage.setItem('sd-numbersPerDisk', val);
  }
  
  const handleChangeIncludeNegatives = (val) => {
    setIncludeNegatives(val);
    localStorage.setItem('sd-includeNegatives', val);
  }
  
  const getColumnSums = () => {
    const columnSums = [];
    const numberMatrix = transpose(rotatedDisksText);
    for (let i=0; i < numberMatrix.length; i++) {
      columnSums.push({
        calculation: numberMatrix[i].join(' + '),
        sum: getSum(numberMatrix[i])
      });
    }
    return columnSums;
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MenuBar 
          handleClickNewGame={handleClickNewGame}
          sum={sum}
          setSum={handleChangeSum}
          numberOfDisks={numberOfDisks}
          setNumberOfDisks={handleChangeNumberOfDisks}
          numbersPerDisk={numbersPerDisk}
          setNumbersPerDisk={handleChangeNumbersPerDisk}
          includeNegatives={includeNegatives}
          setIncludeNegatives={handleChangeIncludeNegatives}
          hasWon={hasWon}
          getColumnSums={getColumnSums}
        />
        <Box role="main" className="Game">
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
