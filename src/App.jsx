import React, { useState, useMemo, useEffect } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import MailScreen from './components/MailScreen';
import AccountHomeScreen from './components/AccountHomeScreen';
import BingoOverviewScreen from './components/BingoOverviewScreen';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import WonScreen from './components/WonScreen';
import LostScreen from './components/LostScreen';
import LoadingTransition from './components/LoadingTransition';
import LoginScreen from './components/LoginScreen';

function App() {
  // Routing state
  const [currentPage, setCurrentPage] = useState('mail'); // 'mail' | 'login' | 'account' | 'bingo' | 'result'
  const [showGameOverlay, setShowGameOverlay] = useState(false);
  const [resultType, setResultType] = useState(null); // 'won' | 'lost' | null
  const [hasPlayed, setHasPlayed] = useState(false); // Track if game has been played
  const [panelColor, setPanelColor] = useState('#AA167C'); // Panel color for current card
  const [loginRedirect, setLoginRedirect] = useState(null); // Waar naartoe na login: 'bingo' | 'account'

  const {
    gameState,
    bingoCard,
    currentBall,
    drawnBalls,
    checkedNumbers,
    history,
    prize,
    wigglingNumber,
    isSkipping,
    skipOutcome,
    isTransitioning,
    isCelebrating,
    isSkipEnding,
    startGame,
    generateCard,
    handleCardClick,
    finishGame,
    skipToResult,
    resetGame
  } = useBingoGame();

  const progress = (drawnBalls.length / 36) * 100;

  // Random background kleur voor het panel - consistent per kaart
  const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];

  // Navigatie functies
  const navigateToLogin = (redirectTo = 'bingo') => {
    setLoginRedirect(redirectTo);
    setCurrentPage('login');
    setShowGameOverlay(false);
  };

  const handleLogin = () => {
    // Na login, ga naar de opgeslagen redirect
    if (loginRedirect === 'account') {
      setCurrentPage('account');
    } else {
      setCurrentPage('bingo');
    }
    setLoginRedirect(null);
  };

  const navigateToAccount = () => {
    navigateToLogin('account');
  };

  const navigateToBingo = () => {
    navigateToLogin('bingo');
  };

  const navigateToMail = () => {
    setCurrentPage('mail');
    setShowGameOverlay(false);
  };

  const openGameOverlay = () => {
    setShowGameOverlay(true);
    // Generate card if it doesn't exist yet or if game hasn't been played
    // (if hasPlayed is false, we want a fresh card for a new game)
    if (bingoCard.length === 0 || (!hasPlayed && gameState === 'IDLE')) {
      generateCard();
      // Generate a random color for this card
      const randomColor = panelColors[Math.floor(Math.random() * panelColors.length)];
      setPanelColor(randomColor);
    }
    // Start game niet direct - laat StartScreen eerst tonen
  };

  const closeGameOverlay = () => {
    // Als het spel nog bezig is (PLAYING), reset het spel
    if (gameState === 'PLAYING') {
      resetGame();
      setHasPlayed(false);
    } else if (gameState === 'WON' || gameState === 'FINISHED') {
      // Als het spel is afgerond, markeer als gespeeld (niet resetten)
      setHasPlayed(true);
    }
    setShowGameOverlay(false);
    setResultType(null);
    // Blijf op bingo pagina (currentPage blijft 'bingo')
  };

  const handleStartGame = () => {
    startGame();
  };

  const openResultScreen = () => {
    // Open overlay en ga direct naar result screen
    setShowGameOverlay(true);
    // Set resultType based on current gameState
    if (gameState === 'WON') {
      setResultType('won');
    } else if (gameState === 'FINISHED') {
      setResultType('lost');
    }
  };

  // Generate card when bingo page is loaded (if not already generated)
  useEffect(() => {
    if (currentPage === 'bingo' && bingoCard.length === 0 && !hasPlayed) {
      generateCard();
      // Generate a random color for this card
      const randomColor = panelColors[Math.floor(Math.random() * panelColors.length)];
      setPanelColor(randomColor);
    }
  }, [currentPage, bingoCard.length, hasPlayed, generateCard]);

  // Handle game state changes - transition naar result scherm in overlay
  useEffect(() => {
    if (gameState === 'WON' && !isTransitioning && showGameOverlay) {
      setResultType('won');
    } else if (gameState === 'FINISHED' && !isTransitioning && showGameOverlay) {
      setResultType('lost');
    }
  }, [gameState, isTransitioning, showGameOverlay]);

  // Handle back from result screen
  const handleBackFromResult = () => {
    setResultType(null);
    setCurrentPage('bingo');
  };

  return (
    <div className="App h-full w-full flex items-center justify-center">
      {/* Mail Screen - buiten wrapper voor volledige responsive gedrag */}
      {currentPage === 'mail' && (
        <MailScreen
          onNavigateToAccount={navigateToAccount}
          onNavigateToBingo={navigateToBingo}
          onPlayNow={openGameOverlay}
        />
      )}

      {/* Andere schermen - binnen wrapper */}
      {currentPage !== 'mail' && (
        <div className="w-full max-w-[400px] h-full mx-auto relative">
          {currentPage === 'login' && (
            <LoginScreen
              onLogin={handleLogin}
              onClose={() => navigateToMail()}
            />
          )}

          {currentPage === 'account' && (
            <AccountHomeScreen
              onNavigateToMail={navigateToMail}
              onNavigateToBingo={navigateToBingo}
            />
          )}

          {currentPage === 'bingo' && (
            <BingoOverviewScreen
              onNavigateToMail={navigateToMail}
              onNavigateToAccount={() => navigateToLogin('account')}
              onPlayNow={openGameOverlay}
              onViewPrize={openResultScreen}
              bingoCard={bingoCard}
              checkedNumbers={checkedNumbers}
              hasPlayed={hasPlayed}
              prize={prize}
              panelColor={panelColor}
            />
          )}

          {/* Game Overlay - binnen wrapper */}
          {showGameOverlay && (
            <>
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={closeGameOverlay}
                aria-hidden="true"
              />
              {/* Overlay Container */}
              <div className="absolute inset-0 z-50 pointer-events-none">
                <div 
                  className="w-full h-full bg-white pointer-events-auto overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Intro Screen (StartScreen) - wanneer gameState === 'IDLE' */}
                  {gameState === 'IDLE' && !isTransitioning && (
                    <StartScreen 
                      onStart={handleStartGame} 
                      onSkipToResult={() => {
                        skipToResult();
                        // Result wordt automatisch getoond via useEffect
                      }}
                      onClose={closeGameOverlay}
                    />
                  )}

                  {/* Game Screen - wanneer gameState === 'PLAYING' */}
                  {gameState === 'PLAYING' && (
                    <GameScreen
                      bingoCard={bingoCard}
                      currentBall={currentBall}
                      checkedNumbers={checkedNumbers}
                      history={history}
                      drawnBalls={drawnBalls}
                      wigglingNumber={wigglingNumber}
                      onCardClick={handleCardClick}
                      onSkip={finishGame}
                      isSkipping={isSkipping}
                      skipOutcome={skipOutcome}
                      progress={progress}
                      panelColor={panelColor}
                      gameState={gameState}
                      prize={prize}
                      isOverlay={false}
                      onClose={closeGameOverlay}
                      isTransitioning={isTransitioning}
                      isCelebrating={isCelebrating}
                      isSkipEnding={isSkipEnding}
                    />
                  )}

                  {/* Loading Transition - tijdens transition */}
                  {isTransitioning && (
                    <LoadingTransition />
                  )}

                  {/* Result Screens in overlay - wanneer gameState === 'WON' of 'FINISHED' en niet meer transitioning */}
                  {!isTransitioning && gameState === 'WON' && resultType === 'won' && prize && (
                    <WonScreen
                      prize={prize}
                      drawnBalls={drawnBalls}
                      onBackToBingo={closeGameOverlay}
                      showHeader={true}
                      bingoCard={bingoCard}
                      checkedNumbers={checkedNumbers}
                      panelColor={panelColor}
                    />
                  )}

                  {!isTransitioning && gameState === 'FINISHED' && resultType === 'lost' && (
                    <LostScreen
                      onBackToBingo={closeGameOverlay}
                      showHeader={true}
                      bingoCard={bingoCard}
                      checkedNumbers={checkedNumbers}
                      drawnBalls={drawnBalls}
                      panelColor={panelColor}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
