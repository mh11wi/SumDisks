import { createContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { green, grey, pink } from '@mui/material/colors';
import Box from '@mui/material/Box';
import AdSense from 'react-adsense';
import MenuBar from 'components/menu/MenuBar';
import UnlimitedMode from 'components/game/modes/unlimited/UnlimitedMode';
import ChallengeMode from 'components/game/modes/challenge/ChallengeMode';
import useWindowOrientation from 'hooks/useWindowOrientation';
import { isTouchDevice, getPageScale } from 'helpers/app';
import { getSum } from 'helpers/game';
import { diskMarks, columnMarks, sumMarks } from 'helpers/config';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'src/App.css';


const adStyle = {
  display: 'block',
  width: 'calc(100% - 1rem)',
  height: 'calc(100% - 1rem)',
  margin: '0.5rem'
};

export const GameContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function SumDisks() {
  const theme = useTheme();
  const { orientation, resizing } = useWindowOrientation();
  
  // Game Context State
  const [gameMode, setGameMode] = useState(null);
  const [targetSum, setTargetSum] = useState(null);
  const [disksText, setDisksText] = useState(null);
  const [rotatedDisksText, setRotatedDisksText] = useState(null);
  const [useSwipe, setUseSwipe] = useState(
    localStorage.getItem('sd-useSwipeMode') ? localStorage.getItem('sd-useSwipeMode') === 'true' : isTouchDevice()
  );
  const [timerStatus, setTimerStatus] = useState(null);
  const [showAds, setShowAds] = useState(false);
  
  // Unlimited Mode State
  const [urlGame, setUrlGame] = useState(null);
  const [unlimitedSum, setUnlimitedSum] = useState(parseInt(localStorage.getItem('sd-sum')) || 10);
  const [unlimitedDisks, setUnlimitedDisks] = useState(parseInt(localStorage.getItem('sd-numberOfDisks')) || 3);
  const [unlimitedColumns, setUnlimitedColumns] = useState(parseInt(localStorage.getItem('sd-numbersPerDisk')) || 4);
  const [unlimitedIncludeNegatives, setUnlimitedIncludeNegatives] = useState(localStorage.getItem('sd-includeNegatives') === 'true');
  const [unlimitedStats, setUnlimitedStats] = useState(diskMarks.map((mark) => parseInt(localStorage.getItem(`sd-unlimitedStats-${mark.value}`)) || 0));
  
  // Challenge Mode State
  const [challengeSum, setChallengeSum] = useState(10);
  const [challengeDisks, setChallengeDisks] = useState(3);
  const [challengeColumns, setChallengeColumns] = useState(4);
  const [challengeIncludeNegatives, setChallengeIncludeNegatives] = useState(false);
  const [challengeTargetWins, setChallengeTargetWins] = useState(10);
  const [challengeStats, setChallengeStats] = useState(diskMarks.map((mark) => {
    return {
      count: parseInt(localStorage.getItem(`sd-challengeStats-${mark.value}`)) || 0,
      average: parseFloat(localStorage.getItem(`sd-challengeAverage-${mark.value}`)) || 0,
      best: parseFloat(localStorage.getItem(`sd-challengeBest-${mark.value}`)) || 0,
    }
  }));
  
  useEffect(() => {
    window.adConfig({preloadAdBreaks: 'on'});
    setTimeout(function() { setShowAds(true) }, 120000);
    
    const params = new URLSearchParams(window.location.search);
    
    try {
      if (params.get('disks')) {
        // Load a specific puzzle if valid
        const disks = urlDisks.split('_');
        if (!diskMarks.map((mark) => mark.value).includes(disks.length)) {
          throw new Error('Invalid number of disks.');
        }
        
        const numberOfColumns = disks[0].split('.').length;
        if (!columnMarks.map((mark) => mark.value).includes(numberOfColumns)) {
          throw new Error('Invalid number of columns.');
        }
        
        let urlSum = 0;
        const game = disks.map((disk) => {
          const columns = disk.split('.'); 
          if (columns.length !== numberOfColumns) {
            throw new Error('Inconsistent number of columns.');
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
        if (!sumMarks.map((mark) => mark.value).includes(urlSum)) {
          throw new Error('Invalid target sum.');
        }
        
        setGameMode('unlimited');
        setTargetSum(urlSum);
        setUnlimitedSum(urlSum);
        setUnlimitedDisks(game.length);
        setUnlimitedColumns(game[0].length);
        setUnlimitedIncludeNegatives(urlDisks.includes('-'));
        setUrlGame(game);
        
      }  else if (params.get('challenge')) {
          // Load a specific challenge if valid
          const challenge = params.get('challenge').split('_');
          if (challenge.length !== 5) {
            throw new Error('Invalid number of challenge parameters.');
          }
          
          const urlSum = parseInt(challenge[0]);
          if (isNaN(urlSum) || !sumMarks.map((mark) => mark.value).includes(urlSum)) {
            throw new Error('Invalid target sum for challenge.');
          }
          
          const numberOfDisks = parseInt(challenge[1]);
          if (isNaN(numberOfDisks) || !diskMarks.map((mark) => mark.value).includes(numberOfDisks)) {
            throw new Error('Invalid number of disks for challenge.');
          }
          
          const numberOfColumns = parseInt(challenge[2]);
          if (isNaN(numberOfColumns) || !columnMarks.map((mark) => mark.value).includes(numberOfColumns)) {
            throw new Error('Invalid number of columns for challenge.');
          }
          
          const urlIncludeNegatives = parseInt(challenge[3]);
          if (urlIncludeNegatives !== 0 && urlIncludeNegatives !== 1) {
            throw new Error('Invalid negative inclusion for challenge.');
          }
          
          const numberOfWins = parseInt(challenge[4]);
          if (isNaN(numberOfWins) || numberOfWins <= 1) {
            throw new Error('Invalid number of games for challenge.');
          }
          
          setGameMode('challenge');
          setTargetSum(urlSum);
          setChallengeSum(urlSum);
          setChallengeDisks(numberOfDisks);
          setChallengeColumns(numberOfColumns);
          setChallengeIncludeNegatives(urlIncludeNegatives === 1);
          setChallengeTargetWins(numberOfWins);
        
        } else {
          // Load unlimited mode otherwise
          setGameMode('unlimited');
        }
    } catch (error) {
      console.log(`${error.message} Generating random game in Unlimited Mode...`);
      setGameMode('unlimited');
    }
  }, []);
  
  const handleChangeUnlimitedSum = (val) => {
    setUnlimitedSum(val);
    localStorage.setItem('sd-sum', val);
  }
  
  const handleChangeUnlimitedDisks = (val) => {
    setUnlimitedDisks(val);
    localStorage.setItem('sd-numberOfDisks', val);
  }
  
  const handleChangeUnlimitedColumns = (val) => {
    setUnlimitedColumns(val);
    localStorage.setItem('sd-numbersPerDisk', val);
  }
  
  const handleChangeUnlimitedIncludeNegatives = (val) => {
    setUnlimitedIncludeNegatives(val);
    localStorage.setItem('sd-includeNegatives', val);
  }
  
  const handleChangeUseSwipe = (val) => {
    setUseSwipe(val);
    localStorage.setItem('sd-useSwipeMode', val);
  }
  
  return (
    <Box className="App" sx={{ bgcolor: theme.palette.background.default, boxShadow: `inset 10000px 10000px ${theme.palette.action.hover}` }}>
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
      <Box role="main" className="Main" sx={{ bgcolor: theme.palette.background.default }}>
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
            handleChangeUseSwipe,
            timerStatus,
            setTimerStatus,
            showAds
          }}
        >
          {gameMode && 
            <MenuBar 
              unlimitedSum={unlimitedSum}
              setUnlimitedSum={handleChangeUnlimitedSum}
              unlimitedDisks={unlimitedDisks}
              setUnlimitedDisks={handleChangeUnlimitedDisks}
              unlimitedColumns={unlimitedColumns}
              setUnlimitedColumns={handleChangeUnlimitedColumns}
              unlimitedIncludeNegatives={unlimitedIncludeNegatives}
              setUnlimitedIncludeNegatives={handleChangeUnlimitedIncludeNegatives}
              unlimitedStats={unlimitedStats}
              challengeSum={challengeSum}
              challengeDisks={challengeDisks}
              challengeColumns={challengeColumns}
              challengeIncludeNegatives={challengeIncludeNegatives}
              challengeTargetWins={challengeTargetWins}
              challengeStats={challengeStats}
            />
          }
            
          {gameMode === 'unlimited' &&
            <UnlimitedMode
              firstGame={urlGame}
              stats={unlimitedStats}
              setStats={setUnlimitedStats}
              sum={unlimitedSum}
              numberOfDisks={unlimitedDisks}
              numberOfColumns={unlimitedColumns}
              includeNegatives={unlimitedIncludeNegatives}
              buttonTransition={!resizing}
            />
          }
          
          {gameMode === 'challenge' && 
            <ChallengeMode 
              stats={challengeStats}
              setStats={setChallengeStats}
              sum={challengeSum}
              numberOfDisks={challengeDisks}
              numberOfColumns={challengeColumns}
              includeNegatives={challengeIncludeNegatives}
              targetWins={challengeTargetWins}
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
            responsive={getPageScale() == 1}
          />
        </Box>
      }
    </Box>
  );
}

function App() {
  const [mode, setMode] = useState(localStorage.getItem('sd-colorMode') || 'light');
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        light: pink[100],
        main: pink[500],
        dark: pink[800]
      },
      secondary: {
        light: grey[50],
        main: grey[300],
        dark: grey[600]
      },
      success: {
        light: green[50],
        main: green[300],
        secondary: green[500],
        dark: green[700]
      }
    },
  }), [mode]);
  
  useEffect(() => {
    localStorage.setItem('sd-colorMode', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SumDisks />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
