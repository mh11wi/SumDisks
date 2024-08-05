import { useContext, useEffect, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import Box from '@mui/material/Box';
import { WorkspacePremium } from '@mui/icons-material';
import ReplayButton from 'components/game/modes/challenge/ReplayButton';
import GameInterface from 'components/game/GameInterface';
import { getSum } from 'helpers/game';
import { showInterstitialAd } from 'helpers/app';
import { challengeThresholds } from 'helpers/config';
import { GameContext } from 'src/App';


function getNumberOfSeconds(hours, minutes, seconds) {
  return (3600 * hours) + (60 * minutes) + seconds;
}

function roundToTwoDecimals(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function getRunningAverage(n, oldAverage, newVal) {
  const average = (((n - 1) * oldAverage) / n) + (newVal / n);
  return roundToTwoDecimals(average);
}

const ChallengeMode = (props) => {
  const gameRef = useRef();
  const { disksText, setDisksText, setRotatedDisksText, timerStatus, setTimerStatus, showAds } = useContext(GameContext);
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: false });
  const [wins, setWins] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showPersonalBest, setShowPersonalBest] = useState(false);
  
  useEffect(() => {
    if (timerStatus === 'started') {
      start();
    }
  }, [timerStatus]);
  
  useEffect(() => {
    if (wins === 0) {
      gameRef.current.loadNewGame(props.sum, props.numberOfDisks, props.numberOfColumns, props.includeNegatives);
      setCompleted(false);
      setShowPersonalBest(false);
    } else if (wins === props.targetWins) {
      pause();
      setTimerStatus('stopped');
      setCompleted(true);
      updateStats();
    } else {
      setTimeout(function() {
        gameRef.current.loadNewGame(props.sum, props.numberOfDisks, props.numberOfColumns, props.includeNegatives);
      }, 1500);
    }
  }, [wins, props.sum, props.numberOfColumns, props.numberOfDisks, props.includeNegatives, props.targetWins]);
  
  const handleClickReplay = () => {
    if (showAds) {
      showInterstitialAd(function() {
        // Ensure timer is 00:00:00 when the ad is over
        reset();
      });
    }
    
    setWins(0);
    reset();
    setTimerStatus('started');
  }
  
  const getAverageTimePerSum = () => {
    const time = getNumberOfSeconds(hours, minutes, seconds);
    const average = time / (props.numberOfColumns * props.targetWins);
    return roundToTwoDecimals(average);
  }
  
  const updateStats = () => {
    const newStats = props.stats.slice();
    const challengeWins = getSum(newStats.map((stat) => stat.count)) + 1;
    const averageTimePerSum = getAverageTimePerSum();
    
    const disksStats = newStats[props.numberOfDisks - 3];
    disksStats.count = disksStats.count + 1;
    disksStats.average = getRunningAverage(disksStats.count, disksStats.average, averageTimePerSum);
    
    if (disksStats.best === 0) {
      disksStats.best = averageTimePerSum;
    } else {
      if (disksStats.count > 1 && averageTimePerSum < disksStats.best) {
        setShowPersonalBest(true);
      }
      
      disksStats.best = Math.min(disksStats.best, averageTimePerSum);
    }
    
    props.setStats(newStats);
    localStorage.setItem('sd-challengeStats-' + props.numberOfDisks, disksStats.count);
    localStorage.setItem('sd-challengeAverage-' + props.numberOfDisks, disksStats.average);
    localStorage.setItem('sd-challengeBest-' + props.numberOfDisks, disksStats.best);
    
    if (challengeThresholds.includes(challengeWins)) {
      const message = `Complete ${challengeWins} challenge${challengeWins == 1 ? '' : 's'}`;
      gameRef.current.displaySnack(message);
    }
  }
  
  const handleWin = () => {
    setWins(w => w + 1);
  }
  
  const Left = () => {
    return (
      <Box>
        <Box sx={{ color: completed ? 'success.dark' : 'text.primary', fontWeight: completed ? '500' : '' }}>
          {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </Box>
        {completed &&
          <Box sx={{ mt: '0.25rem', color: 'success.secondary', fontSize: '80%' }}>{ getAverageTimePerSum() }s / sum</Box>
        }
      </Box>
    );
  }
  
  const Right = () => {
    return (
      <Box>
        <Box sx={{ color: completed ? 'success.dark' : 'text.primary', fontWeight: completed ? '500' : '' }}>
          Wins: {wins}
        </Box>
        {showPersonalBest &&
          <Box sx={{ mt: '0.25rem', color: 'success.secondary', fontSize: '80%', display: 'flex', alignItems: 'center' }}>
            <span>New Best</span>
            <WorkspacePremium fontSize="small" sx={{ transform: 'translateX(0.25rem)' }} />
          </Box>
        }
      </Box>
    );
  }
  
  return (
    <GameInterface 
      ref={gameRef}
      handleWin={handleWin}
      left={<Left />}
      right={<Right />}
      actionButton={
        completed ? <ReplayButton handleClick={handleClickReplay} doTransition={props.buttonTransition} /> : null
      }
    />
  );
};

export default ChallengeMode;