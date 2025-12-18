import { useState, useEffect, useCallback, useRef } from 'react';
import { PRIZES, TOTAL_NUMBERS, GRID_SIZE, DRAW_INTERVAL, MAX_DRAWN_BALLS, SKIP_BALL_INTERVAL, SKIP_USE_EASING, SKIP_EASING_TYPE, SKIP_EASING_FACTOR } from '../utils/constants';

export const useBingoGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, WON, LOST, FINISHED
    const [bingoCard, setBingoCard] = useState([]);
    const [drawnBalls, setDrawnBalls] = useState([]);
    const [currentBall, setCurrentBall] = useState(null);
    const [checkedNumbers, setCheckedNumbers] = useState(new Set());
    const [history, setHistory] = useState([]); // { ball, index, prize, isBingo }
    const [prize, setPrize] = useState(null);
    const [wigglingNumber, setWigglingNumber] = useState(null);

    const timerRef = useRef(null);
    const drawDeckRef = useRef([]);

    // Generate unique random numbers
    const generateNumbers = (count, max, min = 1) => {
        const nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(nums);
    };

    const [maxBalls, setMaxBalls] = useState(MAX_DRAWN_BALLS);

    const startGame = useCallback(() => {
        // 50% chance to win
        const isWinner = Math.random() < 0.5;
        console.log('🎲 Starting game - isWinner:', isWinner);

        // Always draw all 36 balls
        const currentMaxBalls = MAX_DRAWN_BALLS;
        setMaxBalls(currentMaxBalls);

        // Step 1: Generate a completely random deck of all 45 balls
        const allNumbers = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
        const deck = allNumbers.sort(() => Math.random() - 0.5);

        // Step 2: The first 36 balls will be drawn
        const drawnBalls = deck.slice(-36); // pop() takes from end, so last 36 will be drawn
        const notDrawnBalls = deck.slice(0, 9); // first 9 won't be drawn

        // Step 3: Generate the card based on win/loss
        let cardNumbers;

        if (isWinner) {
            // Winner: All 15 card numbers come from the 36 balls that will be drawn
            const shuffledDrawn = [...drawnBalls].sort(() => Math.random() - 0.5);
            cardNumbers = shuffledDrawn.slice(0, 15);
        } else {
            // Loser: 14 numbers from drawn balls + 1-3 numbers from not-drawn balls
            const numMissing = Math.floor(Math.random() * 3) + 1; // 1-3 missing

            const shuffledDrawn = [...drawnBalls].sort(() => Math.random() - 0.5);
            const shuffledNotDrawn = [...notDrawnBalls].sort(() => Math.random() - 0.5);

            const presentNums = shuffledDrawn.slice(0, 15 - numMissing);
            const missingNums = shuffledNotDrawn.slice(0, numMissing);

            cardNumbers = [...presentNums, ...missingNums];
        }

        // Step 4: Create the 4x4 grid with empty slot at index 10
        const emptyIndex = 10;
        const grid = [];
        let numIdx = 0;
        for (let i = 0; i < 16; i++) {
            if (i === emptyIndex) {
                grid.push(null);
            } else {
                grid.push(cardNumbers[numIdx++]);
            }
        }
        setBingoCard(grid);

        drawDeckRef.current = deck;

        setDrawnBalls([]);
        setCurrentBall(null);
        setCheckedNumbers(new Set());
        setHistory([]);
        setPrize(null);
        setGameState('PLAYING');
    }, []);

    const checkWin = useCallback((checked) => {
        // Win if all numbers in bingoCard (except null) are in checked
        const numbersToWin = bingoCard.filter(n => n !== null);
        const isWin = numbersToWin.every(n => checked.has(n));
        return isWin;
    }, [bingoCard]);

    const drawNextBall = useCallback(() => {
        // Auto-check previous ball if it was on card and not checked
        // This happens when a new ball is drawn - the previous one gets auto-checked if not manually checked
        if (currentBall && bingoCard.includes(currentBall) && !checkedNumbers.has(currentBall)) {
            setCheckedNumbers(prev => new Set(prev).add(currentBall));
        }

        // Stop if we reached max balls or deck is empty
        if (drawnBalls.length >= maxBalls || drawDeckRef.current.length === 0) {
            setGameState('FINISHED');
            return;
        }

        const nextBall = drawDeckRef.current.pop();
        const newDrawn = [...drawnBalls, nextBall];

        setDrawnBalls(prev => [...prev, nextBall]);
        setCurrentBall(nextBall);

        // Do NOT auto-check the new ball - user must click it manually
        // The new ball will only be auto-checked when the NEXT ball is drawn (if still not checked)

        // Add to history
        // Always show prize based on ball index (independent of whether current player has bingo)
        const ballIndex = newDrawn.length;
        let prizeInfo = null;
        
        if (ballIndex >= 19) {
            // Prize available from ball 19 onwards
            prizeInfo = PRIZES.find(p => p.balls === ballIndex);
        }
        // If ballIndex < 19, prizeInfo remains null (will show "De Bingo is nog niet gevallen")

        setHistory(prev => [{
            ball: nextBall,
            index: ballIndex,
            prize: prizeInfo,
            timestamp: Date.now()
        }, ...prev]);

    }, [drawnBalls, currentBall, bingoCard, checkedNumbers, maxBalls]);

    // Game Loop
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        // Initial draw
        if (drawnBalls.length === 0) {
            drawNextBall();
        }

        timerRef.current = setInterval(() => {
            // Check if we won with the *previous* state (including auto-check)
            // Actually, we should check win condition continuously.
            // If we win, we stop.

            // But we need to draw the next ball.
            drawNextBall();
        }, DRAW_INTERVAL);

        return () => clearInterval(timerRef.current);
    }, [gameState, drawNextBall, drawnBalls.length]);

    const [isSkipping, setIsSkipping] = useState(false);
    const [skipTarget, setSkipTarget] = useState(null);

    // Check Win Effect
    useEffect(() => {
        if (gameState !== 'PLAYING' || isSkipping) return;

        if (checkWin(checkedNumbers)) {
            // WIN!
            clearInterval(timerRef.current);
            setGameState('WON');
            // Calculate prize based on drawnBalls count
            const count = drawnBalls.length;
            const lookupCount = Math.max(count, 19); // Minimum prize at 19 balls
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);
            setPrize(wonPrize);
        }
    }, [checkedNumbers, gameState, checkWin, drawnBalls.length, isSkipping]);

    // Skipping Animation Effect
    useEffect(() => {
        if (!isSkipping || !skipTarget) return;

        if (drawnBalls.length >= skipTarget.balls.length) {
            setIsSkipping(false);
            setPrize(skipTarget.prize);
            setGameState(skipTarget.outcome);
            setCheckedNumbers(skipTarget.finalChecked);
            setSkipTarget(null);
            return;
        }

        // Calculate delay with easing
        let delay = SKIP_BALL_INTERVAL;

        if (SKIP_USE_EASING) {
            const totalBalls = skipTarget.balls.length;
            const currentIndex = drawnBalls.length;
            const progress = currentIndex / totalBalls; // 0 to 1

            let easedProgress;

            switch (SKIP_EASING_TYPE) {
                case 'in':
                    // Ease-in cubic: starts slow, gets faster
                    easedProgress = Math.pow(progress, 3);
                    delay = SKIP_BALL_INTERVAL * (1 + (1 - easedProgress) * SKIP_EASING_FACTOR);
                    break;

                case 'out':
                    // Ease-out cubic: starts fast, ends slow
                    easedProgress = 1 - Math.pow(1 - progress, 3);
                    delay = SKIP_BALL_INTERVAL * (1 + easedProgress * SKIP_EASING_FACTOR);
                    break;

                case 'in-out':
                    // Ease-in-out cubic: slow-fast-slow
                    easedProgress = progress < 0.5
                        ? 4 * Math.pow(progress, 3)
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    delay = SKIP_BALL_INTERVAL * (1 + Math.abs(0.5 - easedProgress) * 2 * SKIP_EASING_FACTOR);
                    break;

                default:
                    // Linear (no easing)
                    delay = SKIP_BALL_INTERVAL;
            }
        }

        const timeout = setTimeout(() => {
            const nextBallIndex = drawnBalls.length;
            const nextBall = skipTarget.balls[nextBallIndex];
            const previousBall = currentBall;

            setDrawnBalls(prev => [...prev, nextBall]);
            setCurrentBall(nextBall);

            // Auto-check previous ball if it was on card and not checked
            if (previousBall && bingoCard.includes(previousBall) && !checkedNumbers.has(previousBall)) {
                setCheckedNumbers(prev => new Set(prev).add(previousBall));
            }
            // Do NOT auto-check the new ball - it will be auto-checked when next ball is drawn if still not checked

            // Update history
            // Always show prize based on ball index (independent of whether current player has bingo)
            const ballIndex = nextBallIndex + 1;
            let prizeInfo = null;
            
            if (ballIndex >= 19) {
                // Prize available from ball 19 onwards
                prizeInfo = PRIZES.find(p => p.balls === ballIndex);
            }
            // If ballIndex < 19, prizeInfo remains null (will show "De Bingo is nog niet gevallen")
            
            setHistory(prev => [{
                ball: nextBall,
                index: ballIndex,
                prize: prizeInfo,
                timestamp: Date.now()
            }, ...prev]);

        }, delay);

        return () => clearTimeout(timeout);
    }, [isSkipping, skipTarget, drawnBalls, bingoCard]);

    const handleCardClick = (number) => {
        if (gameState !== 'PLAYING' || isSkipping) return;
        if (!number) return;

        if (drawnBalls.includes(number)) {
            // Number is drawn - toggle checked state
            const newChecked = new Set(checkedNumbers);
            const wasChecked = newChecked.has(number);
            
            if (wasChecked) {
                // Already checked - uncheck it
                newChecked.delete(number);
                setCheckedNumbers(newChecked);
            } else {
                // Not checked - check it
                newChecked.add(number);
                setCheckedNumbers(newChecked);
                
                // If manually checked, immediately draw next ball
                clearInterval(timerRef.current);
                drawNextBall();
                
                // Restart the timer for the next ball
                if (gameState === 'PLAYING') {
                    timerRef.current = setInterval(() => {
                        drawNextBall();
                    }, DRAW_INTERVAL);
                }
            }
        } else {
            // Number not drawn yet - wiggle
            setWigglingNumber(number);
            setTimeout(() => setWigglingNumber(null), 500);
        }
    };

    const finishGame = useCallback(() => {
        if (gameState !== 'PLAYING' || isSkipping) return;

        clearInterval(timerRef.current);

        // Draw remaining balls UP TO maxBalls
        const currentDeck = [...drawDeckRef.current];
        const ballsNeeded = maxBalls - drawnBalls.length;

        // We need to take balls from the END of currentDeck because we use pop()
        // So we take the LAST 'ballsNeeded' elements
        const remainingToDraw = currentDeck.slice(-ballsNeeded).reverse();

        const allDrawn = [...drawnBalls, ...remainingToDraw];

        // Check if won based on allDrawn
        const numbersToWin = bingoCard.filter(n => n !== null);

        // Find the index of the last number needed to complete the card
        let maxIndex = -1;
        let missingCount = 0;

        numbersToWin.forEach(num => {
            const idx = allDrawn.indexOf(num);
            if (idx === -1) {
                missingCount++;
            } else {
                if (idx > maxIndex) maxIndex = idx;
            }
        });

        const isWin = missingCount === 0;

        let finalDrawnBalls = allDrawn;
        let outcome = 'FINISHED';
        let wonPrize = null;

        if (isWin) {
            // If win, we stop at the winning ball
            finalDrawnBalls = allDrawn.slice(0, maxIndex + 1);
            outcome = 'WON';

            // Calculate Prize
            const ballsCount = maxIndex + 1;
            const lookupCount = Math.max(ballsCount, 19);
            wonPrize = PRIZES.find(p => p.balls === lookupCount);
        }

        // Calculate final checked numbers
        const finalChecked = new Set(checkedNumbers);
        bingoCard.forEach(num => {
            if (num && finalDrawnBalls.includes(num)) {
                finalChecked.add(num);
            }
        });

        // Start Skipping Animation
        setSkipTarget({
            balls: finalDrawnBalls,
            outcome: outcome,
            prize: wonPrize,
            finalChecked: finalChecked
        });
        setIsSkipping(true);

    }, [gameState, drawnBalls, bingoCard, checkedNumbers, maxBalls, isSkipping]);

    return {
        gameState,
        bingoCard,
        currentBall,
        drawnBalls,
        checkedNumbers,
        history,
        prize,
        wigglingNumber,
        isSkipping,
        skipOutcome: skipTarget ? { outcome: skipTarget.outcome, prize: skipTarget.prize } : null,
        startGame,
        handleCardClick,
        finishGame
    };
};
