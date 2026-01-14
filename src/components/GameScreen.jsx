import React, { useState, useEffect, useRef } from 'react';
import { DRAW_INTERVAL } from '../utils/constants';
import confetti from 'canvas-confetti';

// Import new components
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import GameProgress from './game/GameProgress';
import GameControls from './game/GameControls';
import LoadingTransition from './LoadingTransition';
import BallsHistory from './game/BallsHistory';
import PrizeCard from './game/PrizeCard';
import SkipResultAnimation from './game/SkipResultAnimation';

const GameScreen = ({
    bingoCard,
    currentBall,
    checkedNumbers,
    history,
    drawnBalls,
    wigglingNumber,
    onCardClick,
    onSkip,
    isSkipping,
    progress,
    panelColor,
    gameState,
    prize,
    isOverlay = false,
    onClose,
    isTransitioning = false,
    isCelebrating = false,
    isSkipEnding = false,
    isPaused = false,
    onPause,
    onResume,
    onNextBall
}) => {
    const isGameFinished = gameState === 'WON' || gameState === 'FINISHED';

    // Random kleur voor ballen (zelfde kleuren als background) - consistent per bal
    const panelColors = ['#AA167C', '#F39200', '#E73358', '#94C11F', '#009CBE'];
    const getBallColor = (ballNumber) => {
        return panelColors[ballNumber % panelColors.length];
    };

    // State voor hint timing (laatste 2 seconden voor nieuwe bal)
    const [showHint, setShowHint] = useState(false);
    const historyRef = useRef(null);
    const displayCurrentBall = isSkipping ? null : currentBall;
    const displayShowHint = isSkipping ? false : showHint;

    // Timer voor hint: toon hint 2 seconden voordat nieuwe bal komt
    useEffect(() => {
        if (!currentBall || isSkipping) return; // Don't show hint during skip

        setShowHint(false);
        const hintTimer = setTimeout(() => {
            setShowHint(true);
        }, DRAW_INTERVAL - 2000); // 2 seconden voor nieuwe draw

        return () => clearTimeout(hintTimer);
    }, [currentBall, isSkipping]);

    // Auto-scroll naar top bij nieuwe bal in history
    useEffect(() => {
        if (historyRef.current && history.length > 0) {
            historyRef.current.scrollTop = 0;
        }
    }, [history.length]);

    // Confetti effect bij Bingo - tijdens celebration
    useEffect(() => {
        if (isCelebrating) {
            const duration = 2 * 1000; // 2 seconden celebration
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isCelebrating]);

    // Header close button handler
    const handleHeaderClose = () => {
        if (onClose) {
            onClose();
        }
    };

    // Escape key handler - werkt altijd wanneer onClose beschikbaar is
    useEffect(() => {
        if (!onClose) return;

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Game content
    const gameContent = (
        <div className="flex overflow-hidden relative flex-col w-full h-full transition-colors duration-500" style={{ backgroundColor: panelColor }}>
            <GameHeader
                onClose={handleHeaderClose}
            />

            {/* Loading Transition */}
            {isTransitioning && (
                <LoadingTransition />
            )}

            {/* Celebration overlay - confetti tijdens Bingo */}
            {isCelebrating && (
                <div className="flex absolute inset-0 z-40 justify-center items-center pointer-events-none">
                    <div
                        className="text-7xl font-black text-white drop-shadow-2xl"
                        style={{
                            textShadow: '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,215,0,0.6)',
                            animation: 'bingo-celebration 2s ease-out forwards'
                        }}
                    >
                        BINGO!
                    </div>
                </div>
            )}

            {/* Hide game content during transition */}
            {!isTransitioning && (
                <>
                    {/* Hero sectie - auto hoogte gebaseerd op content + padding, met fixed progress bar */}
                    <div className="flex relative flex-col shrink-0 hero-bingo-container">
                        {/* Bingo Card Container - verticaal gecentreerd */}
                        <div className="flex relative justify-center items-center pb-4 w-full hero-bingo-card-container" style={{ overflow: 'visible' }}>
                            <BingoCard
                                bingoCard={bingoCard}
                                checkedNumbers={checkedNumbers}
                                currentBall={displayCurrentBall}
                                wigglingNumber={wigglingNumber}
                                showHint={displayShowHint}
                                onCardClick={onCardClick}
                            />
                        </div>

                        {/* GameProgress - fixed onderaan in hero */}
                        <div className="w-full shrink-0">
                            <GameProgress
                                drawnBalls={drawnBalls}
                                progress={progress}
                            />
                        </div>
                    </div>

                    {/* Content sectie - flex-1, scrollbaar, met alle game content */}
                    <div
                        ref={historyRef}
                        className="flex overflow-y-auto flex-col flex-1 bg-white"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                        }}
                        role="region"
                        aria-label="Spel voortgang"
                    >
                        {/* BallsHistory - tijdens spel */}
                        {!isSkipping && !isSkipEnding && drawnBalls.length > 0 && (
                            <div className="px-4 py-3 bg-white">
                                <BallsHistory
                                    drawnBalls={drawnBalls}
                                    getBallColor={getBallColor}
                                    checkedByUser={checkedNumbers}
                                />
                            </div>
                        )}

                        {/* Prize Card - tijdens spel */}
                        {!isSkipping && !isSkipEnding && drawnBalls.length > 0 && (
                            <div className="px-4 pb-3 bg-white">
                                <PrizeCard
                                    currentBall={currentBall}
                                    ballIndex={drawnBalls.length}
                                    prize={history[0]?.prize || null}
                                />
                            </div>
                        )}

                        {/* Skip animatie - tijdens skip/animatie */}
                        {(isSkipping || isSkipEnding) && (
                            <SkipResultAnimation
                                bingoCard={bingoCard}
                                checkedNumbers={checkedNumbers}
                                isSkipEnding={isSkipEnding}
                            />
                        )}
                    </div>

                    {/* GameControls verborgen tijdens skip ending */}
                    {!isSkipping && !isSkipEnding && (
                        <GameControls
                            onSkip={onSkip}
                            isGameFinished={isGameFinished || isSkipping}
                            isSkipping={isSkipping}
                            isPaused={isPaused}
                            onPause={onPause}
                            onResume={onResume}
                            onNextBall={onNextBall}
                        />
                    )}
                </>
            )}
        </div>
    );

    // Render as overlay or full screen
    if (isOverlay) {
        return (
            <>
                {/* Backdrop */}
                <div
                    className="fixed inset-0 z-40 backdrop-blur-sm bg-black/50"
                    onClick={onClose}
                    aria-hidden="true"
                />
                {/* Modal Container */}
                <div className="flex fixed inset-0 z-50 justify-center items-center p-4 pointer-events-none">
                    <div
                        className="w-full max-w-[400px] h-full max-h-[90vh] bg-white rounded-lg shadow-2xl pointer-events-auto overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {gameContent}
                    </div>
                </div>
            </>
        );
    }

    return gameContent;
};

export default GameScreen;
