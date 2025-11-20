import React from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const {
    gameState,
    bingoCard,
    currentBall,
    drawnBalls,
    checkedNumbers,
    history,
    prize,
    wigglingNumber,
    startGame,
    handleCardClick,
    finishGame
  } = useBingoGame();

  const progress = (drawnBalls.length / 36) * 100;

  return (
    <div className="App h-full w-full">
      {gameState === 'IDLE' && (
        <StartScreen onStart={startGame} />
      )}

      {gameState === 'PLAYING' && (
        <GameScreen
          bingoCard={bingoCard}
          currentBall={currentBall}
          checkedNumbers={checkedNumbers}
          history={history}
          wigglingNumber={wigglingNumber}
          onCardClick={handleCardClick}
          onSkip={finishGame}
          progress={progress}
        />
      )}

      {(gameState === 'WON' || gameState === 'FINISHED') && (
        <ResultScreen
          prize={prize}
          history={history}
          bingoCard={bingoCard}
          checkedNumbers={checkedNumbers}
        />
      )}
    </div>
  );
}

export default App;
