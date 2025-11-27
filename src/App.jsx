import React, { useState, useMemo } from 'react';
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

  // Random background kleur voor het panel - consistent per sessie
  const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
  const panelColor = useMemo(() => {
    return panelColors[Math.floor(Math.random() * panelColors.length)];
  }, [gameState === 'IDLE']); // Reset bij nieuwe game

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
          panelColor={panelColor}
        />
      )}

      {(gameState === 'WON' || gameState === 'FINISHED') && (
        <ResultScreen
          prize={prize}
          history={history}
          bingoCard={bingoCard}
          checkedNumbers={checkedNumbers}
          panelColor={panelColor}
        />
      )}
    </div>
  );
}

export default App;
