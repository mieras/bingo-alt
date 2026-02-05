import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
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

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGameOverlay, setShowGameOverlay] = useState(false);
  const [resultType, setResultType] = useState(null); // 'won' | 'lost' | null
  const [hasPlayed, setHasPlayed] = useState(false); // Track if game has been played
  const [panelColor, setPanelColor] = useState('#AA167C'); // Panel color for current card
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal animation state
  // Bewaar het laatste resultaat zodat het beschikbaar blijft na "speel opnieuw af"
  const [lastResult, setLastResult] = useState(null); // { prize, resultType, drawnBalls, checkedNumbers, progress }

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
    isPaused,
    startGame,
    generateCard,
    handleCardClick,
    finishGame,
    skipToResult,
    resetGame,
    pauseGame,
    resumeGame,
    drawNextBallManually
  } = useBingoGame();

  const progress = (drawnBalls.length / 36) * 100;
  const runViewTransition = useCallback((update) => {
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        update();
      });
      return;
    }
    update();
  }, []);

  // Random background kleur voor het panel - consistent per kaart
  const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];

  // Navigatie functies - allemaal direct benaderbaar
  const navigateToLogin = () => {
    navigate('/login');
    setShowGameOverlay(false);
  };

  const handleLogin = () => {
    // Na login, ga naar bingo overzicht
    navigate('/bingo');
    setShowGameOverlay(false);
  };

  const navigateToAccount = () => {
    navigate('/home');
  };

  const navigateToBingo = () => {
    navigate('/bingo');
    setShowGameOverlay(false);
  };

  const handleViewBingoCard = () => {
    // Sluit de modal eerst
    setIsModalOpen(false);
    setTimeout(() => {
      setShowGameOverlay(false);
      // Ga naar bingo overview pagina
      navigate('/bingo');
      // Open modal automatisch na korte delay zodat de pagina eerst laadt
      setTimeout(() => {
        setShowGameOverlay(true);
        setIsModalOpen(false);
        setTimeout(() => {
          setIsModalOpen(true);
        }, 10);
      }, 50);
    }, 300); // Wacht tot modal animatie klaar is
  };

  const navigateToMail = () => {
    navigate('/');
    setShowGameOverlay(false);
  };

  const openGameOverlay = () => {
    setShowGameOverlay(true);
    // Trigger modal animation
    setIsModalOpen(false);
    // Generate card and color only if they don't exist yet
    // Behoud dezelfde kaart en kleur als ze al bestaan
    if (bingoCard.length === 0) {
      generateCard();
      // Generate a random color for this card (alleen als er nog geen kleur is)
      if (panelColor === '#AA167C') { // Default waarde betekent dat er nog geen kleur is gekozen
        const randomColor = panelColors[Math.floor(Math.random() * panelColors.length)];
        setPanelColor(randomColor);
      }
    }
    // Start game niet direct - laat StartScreen eerst tonen
    // Trigger animation after a tiny delay to ensure DOM is ready
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const closeGameOverlay = () => {
    // Start close animation
    setIsModalOpen(false);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      // Als het spel nog bezig is (PLAYING), reset het spel
      if (gameState === 'PLAYING') {
        resetGame();
        setHasPlayed(false);
      } else if (gameState === 'WON' || gameState === 'FINISHED') {
        // Als het spel is afgerond, markeer als gespeeld en bewaar het resultaat
        setHasPlayed(true);
        // Bewaar het laatste resultaat zodat het beschikbaar blijft na "speel opnieuw af"
        setLastResult({
          prize: prize,
          resultType: gameState === 'WON' ? 'won' : 'lost',
          drawnBalls: [...drawnBalls],
          checkedNumbers: new Set(checkedNumbers),
          progress: progress
        });
      }
      setShowGameOverlay(false);
      setResultType(null);
      // Blijf op bingo pagina (currentPage blijft 'bingo')
    }, 300); // Match animation duration
  };

  const handleStartGame = () => {
    startGame();
  };

  const openResultScreen = () => {
    // Open overlay en ga direct naar result screen
    setShowGameOverlay(true);
    // Trigger modal animation
    setIsModalOpen(false);
    // Gebruik het opgeslagen resultaat als het beschikbaar is, anders gebruik huidige gameState
    if (lastResult) {
      runViewTransition(() => setResultType(lastResult.resultType));
    } else if (gameState === 'WON') {
      runViewTransition(() => setResultType('won'));
    } else if (gameState === 'FINISHED') {
      runViewTransition(() => setResultType('lost'));
    }
    // Trigger animation after a tiny delay to ensure DOM is ready
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const replayInOverlay = () => {
    // Reset game maar behoud dezelfde kaart en kleur
    resetGame();
    // Behoud hasPlayed zodat gebruiker nog steeds naar resultaat kan gaan vanuit overview
    // setHasPlayed(false); // NIET resetten - behoud "Bekijk je prijs" functionaliteit
    runViewTransition(() => setResultType(null));
    // Behoud dezelfde kaart en kleur - geen nieuwe genereren
    // De kaart en kleur blijven behouden omdat we alleen resetGame() aanroepen
  };

  // Generate card when bingo page is loaded (if not already generated)
  useEffect(() => {
    if (location.pathname === '/bingo' && bingoCard.length === 0) {
      generateCard();
      // Generate a random color for this card (alleen als er nog geen kleur is gekozen)
      if (panelColor === '#AA167C') { // Default waarde betekent dat er nog geen kleur is gekozen
        const randomColor = panelColors[Math.floor(Math.random() * panelColors.length)];
        setPanelColor(randomColor);
      }
    }
  }, [location.pathname, bingoCard.length, generateCard, panelColor]);

  // Handle game state changes - transition naar result scherm in overlay
  useEffect(() => {
    if (gameState === 'WON' && !isTransitioning && showGameOverlay) {
      runViewTransition(() => setResultType('won'));
    } else if (gameState === 'FINISHED' && !isTransitioning && showGameOverlay) {
      runViewTransition(() => setResultType('lost'));
    }
  }, [gameState, isTransitioning, showGameOverlay, runViewTransition]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showGameOverlay) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showGameOverlay]);

  // Handle back from result screen
  const handleBackFromResult = () => {
    setResultType(null);
    navigate('/bingo');
  };

  return (
    <div className="App h-full w-full flex items-center justify-center">
      <Routes>
        {/* Mail Screen - buiten wrapper voor volledige responsive gedrag */}
        <Route
          path="/"
          element={
            <MailScreen
              onNavigateToAccount={navigateToLogin}
              onNavigateToBingo={navigateToLogin}
              onPlayNow={openGameOverlay}
            />
          }
        />

        {/* Login Screen */}
        <Route
          path="/login"
          element={
            <div className="w-full max-w-[400px] h-full mx-auto relative">
              <LoginScreen
                onLogin={handleLogin}
                onClose={() => navigateToMail()}
              />
            </div>
          }
        />

        {/* Account Home Screen */}
        <Route
          path="/home"
          element={
            <div className="w-full max-w-[400px] h-full mx-auto relative">
              <AccountHomeScreen
                onNavigateToMail={navigateToMail}
                onNavigateToBingo={navigateToBingo}
              />
            </div>
          }
        />

        {/* Bingo Overview Screen */}
        <Route
          path="/bingo"
          element={
            <div className="w-full max-w-[400px] h-full mx-auto relative">
              <BingoOverviewScreen
                onNavigateToMail={navigateToMail}
                onNavigateToAccount={navigateToAccount}
                onPlayNow={openGameOverlay}
                onViewPrize={openResultScreen}
                bingoCard={bingoCard}
                checkedNumbers={checkedNumbers}
                hasPlayed={hasPlayed}
                prize={prize}
                lastResult={lastResult}
                panelColor={panelColor}
              />

              {/* Game Overlay - binnen bingo route */}
              {showGameOverlay && (
                <>
                  {/* Backdrop */}
                  <div
                    className={`absolute inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={closeGameOverlay}
                    aria-hidden="true"
                  />
                  {/* Overlay Container */}
                  <div className="absolute inset-0 z-50 pointer-events-none">
                    <div
                      className={`game-overlay-panel w-full h-dvh bg-white pointer-events-auto overflow-hidden transition-transform duration-300 ease-out ${isModalOpen ? 'translate-y-0' : 'translate-y-full'}`}
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
                          bingoCard={bingoCard}
                          panelColor={panelColor}
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
                          isPaused={isPaused}
                          onPause={pauseGame}
                          onResume={resumeGame}
                          onNextBall={drawNextBallManually}
                        />
                      )}

                      {/* Loading Transition - tijdens transition */}
                      {isTransitioning && (
                        <LoadingTransition />
                      )}

                      {/* Result Screens in overlay - toon resultaat van huidige gameState of opgeslagen resultaat */}
                      {!isTransitioning && resultType === 'won' && (
                        // Gebruik opgeslagen resultaat als beschikbaar, anders huidige state
                        (lastResult && lastResult.resultType === 'won' && lastResult.prize) ||
                          (gameState === 'WON' && prize) ? (
                          <WonScreen
                            prize={lastResult?.prize || prize}
                            drawnBalls={lastResult?.drawnBalls || drawnBalls}
                            progress={lastResult?.progress || progress}
                            onBackToBingo={closeGameOverlay}
                            onReplay={replayInOverlay}
                            showHeader={true}
                            bingoCard={bingoCard}
                            checkedNumbers={lastResult?.checkedNumbers || checkedNumbers}
                          />
                        ) : null
                      )}

                      {!isTransitioning && resultType === 'lost' && (
                        // Gebruik opgeslagen resultaat als beschikbaar, anders huidige state
                        (lastResult && lastResult.resultType === 'lost') ||
                          (gameState === 'FINISHED') ? (
                          <LostScreen
                            onBackToBingo={closeGameOverlay}
                            onReplay={replayInOverlay}
                            progress={lastResult?.progress || progress}
                            showHeader={true}
                            bingoCard={bingoCard}
                            checkedNumbers={lastResult?.checkedNumbers || checkedNumbers}
                            drawnBalls={lastResult?.drawnBalls || drawnBalls}
                            panelColor={panelColor}
                          />
                        ) : null
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/bingo-alt">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
