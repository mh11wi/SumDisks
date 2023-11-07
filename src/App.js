import React, { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import party from 'party-js';
import AdSense from 'react-adsense';
import ReactDisks from 'react-disks';
import MenuBar from './components/MenuBar';
import NewGameButton from './components/NewGameButton';
import useWindowOrientation from './hooks/useWindowOrientation';
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
      light: green[50],
      main: green[500],
      dark: green[900]
    },
  }
});

const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};

function debounce(func, timeout) {
  let timer;
  return function(event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, timeout, event);
  };
}

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

function isTouchDevice() {
  return ('ontouchstart' in window)
}

function App() {
  const loadingRef = useRef(0);
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [sum, setSum] = useState(parseInt(localStorage.getItem('sd-sum')) || 10);
  const [numberOfDisks, setNumberOfDisks] = useState(parseInt(localStorage.getItem('sd-numberOfDisks')) || 3);
  const [numbersPerDisk, setNumbersPerDisk] = useState(parseInt(localStorage.getItem('sd-numbersPerDisk')) || 4);
  const [includeNegatives, setIncludeNegatives] = useState(localStorage.getItem('sd-includeNegatives') === 'true');
  const [useSwipeMode, setUseSwipeMode] = useState(
    localStorage.getItem('sd-useSwipeMode') ? localStorage.getItem('sd-useSwipeMode') === 'true' : isTouchDevice()
  );
  const [hasWon, setHasWon] = useState(false);
  const { orientation, resizing } = useWindowOrientation();
  
  useEffect(() => {
    let game;
    if (loadingRef.current < 2) {
      const params = new URLSearchParams(window.location.search);
      const urlDisks = params.get('disks');
      
      try {
        if (!urlDisks) {
          throw new Error('No game provided.');
        }
        
        const disks = urlDisks.split('_');
        if (disks.length < 3 || disks.length > 7) {
          throw new Error('Invalid number of disks.');
        }
        
        const numberOfColumns = disks[0].split('.').length;
        if (numberOfColumns !== 2 &&  numberOfColumns !== 4 && numberOfColumns !== 6) {
          throw new Error('Invalid numbers per disk.');
        }
        
        let urlSum = 0;
        game = disks.map((disk) => {
          const columns = disk.split('.'); 
          if (columns.length !== numberOfColumns) {
            throw new Error('Inconsistent numbers per disk.');
          }
          
          const numbers = columns.map((column) => {
            const number = parseInt(column);
            if (isNaN(number)) {
              throw new Error('Invalid disk contents.');
            }
            return number;
          });
          
          urlSum += getSum(numbers);
          
          return numbers;
        });
        
        urlSum = urlSum / game[0].length;
        if (urlSum !== 10 && urlSum !== 20 && urlSum !== 50 && urlSum !== 100) {
          throw new Error('Invalid target sum.');
        }
        
        setSum(urlSum);
        setNumberOfDisks(game.length);
        setNumbersPerDisk(game[0].length);
        setIncludeNegatives(urlDisks.includes('-'));
      } catch (error) {
        if (loadingRef.current === 0) {
          console.log(`${error.message} Generating random game...`);
        }
        game = null;
      } finally {
        loadingRef.current++;
      }
    }
    
    if (!game) {
      game = newGame(sum, numberOfDisks, numbersPerDisk, includeNegatives);
    }
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
    setRotatedDisksText(rotatedDisksText);
    setHasWon(isSolved(sum, rotatedDisksText));
  }
  
  const handleClickNewGame = () => {
    window.adBreak({
      type: 'next',
      name: 'new-game',
      beforeAd: () => {
        document.querySelectorAll('.adsbygoogle[data-slotcar-interstitial="true"], .adsbygoogle[data-slotcar-interstitial="true"] *').forEach(function(el) {
          if (CSS.supports("height: 100dvh")) {
            el.style.width = "100dvw";
            el.style.height = "100dvh";
          } else { 
            el.style.width = "100vw";
            el.style.height = "100vh";
          }
        });
      }
    });

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
  
  const handleChangeUseSwipeMode = (val) => {
    setUseSwipeMode(val);
    localStorage.setItem('sd-useSwipeMode', val);
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
  
  const getQueryString = () => {
    if (!disksText) {
      return '';
    }
    
    const disks = disksText.map((disk) => disk.join('.')).join('_');
    return `?disks=${disks}`;
  }
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {orientation === 'landscape' && !resizing && 
          <Box className="vertical-ad-left">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="9091776362"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
        <Box role="main" className="Main">
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
            useSwipeMode={useSwipeMode}
            setUseSwipeMode={handleChangeUseSwipeMode}
            getColumnSums={getColumnSums}
            getQueryString={getQueryString}
          />
          <Box className="Game">
            <ReactDisks 
              disksText={disksText}
              theme={theme.palette.primary}
              onRotate={debounce(onRotate, 500)}
              disabled={hasWon}
              swipeMode={useSwipeMode}
            />
            <NewGameButton handleClick={handleClickNewGame} doTransition={!resizing} doPulsate={hasWon} />
          </Box>
        </Box>
        {orientation === 'landscape' && !resizing && 
          <Box className="vertical-ad-right">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="6465613026"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
        {orientation === 'portrait' && !resizing && 
          <Box className="horizontal-ad">
            <AdSense.Google
              client="ca-pub-9808989635264198"
              slot="2074941876"
              style={adStyle}
              format=""
              responsive="true"
            />
          </Box>
        }
      </ThemeProvider>
    </div>
  );
}

export default App;
