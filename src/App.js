import { createContext, useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, grey, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AdSense from 'react-adsense';
import MenuBar from 'components/menu/MenuBar';
import UnlimitedMode from 'components/game/modes/unlimited/UnlimitedMode';
import useWindowOrientation from 'hooks/useWindowOrientation';
import { isTouchDevice } from 'helpers/app';
import { getSum } from 'helpers/game';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'src/App.css';


const theme = createTheme({
  palette: {
    primary: {
      light: pink[100],
      main: pink[500],
      dark: pink[800]
    },
    secondary: {
      light: grey[50],
      main: grey[300],
      dark: grey[700]
    },
    success: {
      light: green[50],
      main: green[300],
      dark: green[700]
    },
  }
});

const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};

export const GameContext = createContext();

function App() {
  const loadingRef = useRef(0);
  const { orientation, resizing } = useWindowOrientation();
  
  // Game Context State
  const [gameMode, setGameMode] = useState(null);
  const [targetSum, setTargetSum] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [useSwipe, setUseSwipe] = useState(
    localStorage.getItem('sd-useSwipeMode') ? localStorage.getItem('sd-useSwipeMode') === 'true' : isTouchDevice()
  );
  
  // Unlimited Mode State
  const [urlGame, setUrlGame] = useState(null);
  const [unlimitedSum, setUnlimitedSum] = useState(parseInt(localStorage.getItem('sd-sum')) || 10);
  const [numberOfDisks, setNumberOfDisks] = useState(parseInt(localStorage.getItem('sd-numberOfDisks')) || 3);
  const [numbersPerDisk, setNumbersPerDisk] = useState(parseInt(localStorage.getItem('sd-numbersPerDisk')) || 4);
  const [includeNegatives, setIncludeNegatives] = useState(localStorage.getItem('sd-includeNegatives') === 'true');
  const [unlimitedStats, setUnlimitedStats] = useState([
    parseInt(localStorage.getItem('sd-unlimitedStats-3')) || 0,
    parseInt(localStorage.getItem('sd-unlimitedStats-4')) || 0,
    parseInt(localStorage.getItem('sd-unlimitedStats-5')) || 0,
    parseInt(localStorage.getItem('sd-unlimitedStats-6')) || 0,
    parseInt(localStorage.getItem('sd-unlimitedStats-7')) || 0
  ]);
  
  useEffect(() => {
    let game;
    if (loadingRef.current < 2) {
      const params = new URLSearchParams(window.location.search);
      const urlDisks = params.get('disks');
      
      if (urlDisks) {
        setGameMode('unlimited');
      } else {
        // TO-DO: add more cases for different game modes
        setGameMode('unlimited');
      }
      
      if (urlDisks) {
        try {
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
          
          setTargetSum(urlSum);
          setUnlimitedSum(urlSum);
          setNumberOfDisks(game.length);
          setNumbersPerDisk(game[0].length);
          setIncludeNegatives(urlDisks.includes('-'));
          setUrlGame(game);
        } catch (error) {
          if (loadingRef.current === 0) {
            console.log(`${error.message} Generating random game...`);
          }
          game = null;
        } finally {
          loadingRef.current++;
        }
      }
    }
  }, []);
  
  const handleChangeUnlimitedSum = (val) => {
    setUnlimitedSum(val);
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
  
  const handleChangeUseSwipe = (val) => {
    setUseSwipe(val);
    localStorage.setItem('sd-useSwipeMode', val);
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
          <GameContext.Provider 
            value={{
              gameMode,
              targetSum,
              setTargetSum,
              disksText, 
              setDisksText, 
              rotatedDisksText, 
              setRotatedDisksText, 
              useSwipe, 
              handleChangeUseSwipe
            }}
          >
            <MenuBar 
              unlimitedSum={unlimitedSum}
              setUnlimitedSum={handleChangeUnlimitedSum}
              numberOfDisks={numberOfDisks}
              setNumberOfDisks={handleChangeNumberOfDisks}
              numbersPerDisk={numbersPerDisk}
              setNumbersPerDisk={handleChangeNumbersPerDisk}
              includeNegatives={includeNegatives}
              setIncludeNegatives={handleChangeIncludeNegatives}
              unlimitedStats={unlimitedStats}
            />
            {gameMode === 'unlimited' &&
              <UnlimitedMode
                firstGame={urlGame}
                stats={unlimitedStats}
                setStats={setUnlimitedStats}
                sum={unlimitedSum}
                numberOfDisks={numberOfDisks}
                numbersPerDisk={numbersPerDisk}
                includeNegatives={includeNegatives}
                buttonTransition={!resizing}
              />
            }
          </GameContext.Provider>
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
