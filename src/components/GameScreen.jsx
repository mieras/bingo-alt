import React, { useState, useEffect, useRef } from 'react';
import { DRAW_INTERVAL } from '../utils/constants';
import confetti from 'canvas-confetti';

// Import new components
import GameHeader from './game/GameHeader';
import BingoCard from './game/BingoCard';
import GameProgress from './game/GameProgress';
import GameHistory from './game/GameHistory';
import GameResult from './game/GameResult';
import GameControls from './game/GameControls';
import BouncingBall from './game/BouncingBall';
import SkipTicker from './game/SkipTicker';

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
    prize
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

    // Confetti effect bij winst - Pas als het spel echt klaar is (na skippen)
    useEffect(() => {
        if (prize && gameState === 'WON') {
            const duration = 5 * 1000;
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
    }, [prize, gameState]);

    return (
        <div className="flex overflow-hidden relative flex-col w-full transition-colors duration-500 h-dvh" style={{ backgroundColor: panelColor }}>

            <GameHeader />

            <div className="flex flex-col shrink-0">
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

            {/* Draw History OR Result - Fluid Height */}
            <div
                ref={historyRef}
                className="overflow-y-auto flex-1 bg-white"
                style={{
                    WebkitOverflowScrolling: 'touch',
                }}
                role="region"
                aria-label="Spel geschiedenis en resultaten"
            >
                {isSkipping ? (
                    <div className="flex flex-col justify-center items-center h-full">
                        <BouncingBall
                            ballNumber={currentBall || drawnBalls[drawnBalls.length - 1] || 1}
                            ballColor={currentBall ? getBallColor(currentBall) : getBallColor(drawnBalls[drawnBalls.length - 1] || 1)}
                        />
                        <div className="px-4 mt-8 w-full max-w-md">
                            <SkipTicker drawnBallsCount={drawnBalls.length} />
                        </div>
                    </div>
                ) : isGameFinished ? (
                    <GameResult prize={prize} />
                ) : (
                    <GameHistory
                        history={history}
                        getBallColor={getBallColor}
                        isGameFinished={isGameFinished}
                    />
                )}
            </div>

            <GameControls
                onSkip={onSkip}
                isGameFinished={isGameFinished || isSkipping}
                isSkipping={isSkipping}
            />
        </div>
    );
};

export default GameScreen;
