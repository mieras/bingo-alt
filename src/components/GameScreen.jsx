import React, { useState, useEffect, useRef } from 'react';
import { DRAW_INTERVAL } from '../utils/constants';
import confetti from 'canvas-confetti';

// Import new components
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import GameProgress from './game/GameProgress';
import GameHistory from './game/GameHistory';
import GameControls from './game/GameControls';
import BouncingBall from './game/BouncingBall';
import SkipTicker from './game/SkipTicker';
import LoadingTransition from './LoadingTransition';

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
    isSkipEnding = false
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
                    {/* Kaart met fade-out tijdens skip ending */}
                    <div 
                        className={`flex flex-col shrink-0 transition-opacity duration-500 ${isSkipEnding ? 'opacity-0' : 'opacity-100'}`}
                    >
                        {/* Bingo Card Container */}
                        <div className="flex flex-col flex-1 justify-center items-center">
                            <BingoCard
                                bingoCard={bingoCard}
                                checkedNumbers={checkedNumbers}
                                currentBall={currentBall}
                                wigglingNumber={wigglingNumber}
                                showHint={showHint}
                                onCardClick={onCardClick}
                            />
                        </div>

                        <GameProgress
                            drawnBalls={drawnBalls}
                            progress={progress}
                        />
                    </div>

                    {/* Draw History / Skip Ending - Fluid Height */}
                    <div
                        ref={historyRef}
                        className="overflow-y-auto flex-1 bg-white"
                        style={{
                            WebkitOverflowScrolling: 'touch',
                        }}
                        role="region"
                        aria-label="Spel geschiedenis"
                    >
                        {(isSkipping || isSkipEnding) ? (
                            <div className="flex flex-col justify-center items-center h-full">
                                <BouncingBall
                                    ballNumber={currentBall || drawnBalls[drawnBalls.length - 1] || 1}
                                    ballColor={currentBall ? getBallColor(currentBall) : getBallColor(drawnBalls[drawnBalls.length - 1] || 1)}
                                />
                                {isSkipping && (
                                    <div className="px-4 mt-8 w-full max-w-md">
                                        <SkipTicker drawnBallsCount={drawnBalls.length} />
                                    </div>
                                )}
                                {isSkipEnding && (
                                    <p className="mt-8 text-lg font-semibold text-white animate-pulse">
                                        Resultaat ophalen...
                                    </p>
                                )}
                            </div>
                        ) : (
                            <GameHistory
                                history={history}
                                getBallColor={getBallColor}
                                isGameFinished={isGameFinished}
                            />
                        )}
                    </div>

                    {/* GameControls verborgen tijdens skip ending */}
                    {!isSkipEnding && (
                        <GameControls
                            onSkip={onSkip}
                            isGameFinished={isGameFinished || isSkipping}
                            isSkipping={isSkipping}
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
