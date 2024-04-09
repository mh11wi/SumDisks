import { useContext, useEffect, useRef, useState } from 'react';
import { useStopwatch } from 'react-timer-hook';
import ReplayButton from 'components/game/modes/challenge/ReplayButton';
import GameInterface from 'components/game/GameInterface';
import { showInterstitialAd } from 'helpers/app';
import { challengeThresholds } from 'helpers/config';
import { GameContext } from 'src/App';


const ChallengeMode = (props) => {
  const gameRef = useRef();
  const { disksText, setDisksText, setRotatedDisksText, timerStatus, setTimerStatus } = useContext(GameContext);
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: false });
  const [wins, setWins] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    if (timerStatus === 'started') {
      start();
    }
  }, [timerStatus]);
  
  useEffect(() => {
    if (wins === 0) {
      gameRef.current.loadNewGame(props.sum, props.numberOfDisks, props.numberOfColumns, props.includeNegatives);
      setCompleted(false);
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
    showInterstitialAd(function() {
      // Ensure timer is 00:00:00 when the ad is over
      reset();
    });
    
    setWins(0);
    reset();
    setTimerStatus('started');
  }
  
  const updateStats = () => {
    const val = props.stats + 1;
    props.setStats(val);
    localStorage.setItem('sd-challengeStats', val);
    
    if (challengeThresholds.includes(val)) {
      const message = `Complete ${val} challenge${val == 1 ? '' : 's'}`;
      gameRef.current.displaySnack(message);
    }
  }
  
  const handleWin = () => {
    setWins(w => w + 1);
  }
  
  const Timer = () => {
    return (
      <span>{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
    );
  }
  
  const Count = () => {
    return (
      <span>Wins: {wins}</span>
    );
  }
  
  return (
    <GameInterface 
      ref={gameRef}
      completed={completed}
      handleWin={handleWin}
      left={<Count />}
      right={<Timer />}
      actionButton={
        completed ? <ReplayButton handleClick={handleClickReplay} doTransition={props.buttonTransition} /> : null
      }
    />
  );
};

export default ChallengeMode;