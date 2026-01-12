import { useState, useEffect, useCallback, useRef } from 'react';
import { PRIZES, TOTAL_NUMBERS, GRID_SIZE, DRAW_INTERVAL, MAX_DRAWN_BALLS, SKIP_BALL_INTERVAL, SKIP_USE_EASING, SKIP_EASING_TYPE, SKIP_EASING_FACTOR, MANUAL_CHECK_SPEED_BOOST, SKIP_RESULT_DELAY } from '../utils/constants';

export const useBingoGame = () => {
    const [gameState, setGameState] = useState('IDLE'); // IDLE, PLAYING, WON, LOST, FINISHED
    const [bingoCard, setBingoCard] = useState([]);
    const [drawnBalls, setDrawnBalls] = useState([]);
    const [currentBall, setCurrentBall] = useState(null);
    const [checkedNumbers, setCheckedNumbers] = useState(new Set());
    const [history, setHistory] = useState([]); // { ball, index, prize, isBingo }
    const [prize, setPrize] = useState(null);
    const [wigglingNumber, setWigglingNumber] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [skipTransition, setSkipTransition] = useState(false);
    const [isCelebrating, setIsCelebrating] = useState(false);
    const [manualCheckBoost, setManualCheckBoost] = useState(false);
    const [isSkipEnding, setIsSkipEnding] = useState(false); // Na skip animatie, kaart fade-out met bouncing ball

    const timerRef = useRef(null);
    const drawDeckRef = useRef([]);
    const skipResultTimeoutRef = useRef(null);
    const scheduleNextBallRef = useRef(null);

    // Generate unique random numbers
    const generateNumbers = (count, max, min = 1) => {
        const nums = new Set();
        while (nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(nums);
    };

    const [maxBalls, setMaxBalls] = useState(MAX_DRAWN_BALLS);

    // Generate card without starting the game
    const generateCard = useCallback(() => {
        // 50% chance to win
        const isWinner = Math.random() < 0.5;
        console.log('🎲 Generating card - isWinner:', isWinner);

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
        
        // Store deck for later use in startGame
        drawDeckRef.current = deck;
        
        // Set the card
        setBingoCard(grid);
        
        return { grid, deck };
    }, []);

    const startGame = useCallback(() => {
        console.log('🎲 Starting game');

        // Always draw all 36 balls
        const currentMaxBalls = MAX_DRAWN_BALLS;
        setMaxBalls(currentMaxBalls);

        // If no card exists yet, generate one
        if (bingoCard.length === 0 || drawDeckRef.current.length === 0) {
            generateCard();
        }

        // Reset game state but keep the card
        setDrawnBalls([]);
        setCurrentBall(null);
        setCheckedNumbers(new Set());
        setHistory([]);
        setPrize(null);
        setGameState('PLAYING');
    }, [bingoCard.length, generateCard]);

    const checkWin = useCallback((checked) => {
        // Win if all numbers in bingoCard (except null) are in checked
        const numbersToWin = bingoCard.filter(n => n !== null);
        return numbersToWin.every(n => checked.has(n));
    }, [bingoCard]);

    const drawNextBall = useCallback(() => {
        // Auto-check previous ball if it was on card and not checked (only when new ball is drawn)
        // We houden bij welke nummers er ECHT checked zijn (inclusief auto-check)
        let updatedChecked = new Set(checkedNumbers);
        if (currentBall && bingoCard.includes(currentBall) && !checkedNumbers.has(currentBall)) {
            updatedChecked.add(currentBall);
            setCheckedNumbers(updatedChecked);
        }

        // Stop if deck is empty
        if (drawDeckRef.current.length === 0) {
            const numbersToWin = bingoCard.filter(n => n !== null);
            const isWin = numbersToWin.every(n => updatedChecked.has(n));
            
            if (isWin) {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setIsCelebrating(true);
                const lookupCount = Math.max(drawnBalls.length, 19);
                const wonPrize = PRIZES.find(p => p.balls === lookupCount);
                setPrize(wonPrize);
                
                setTimeout(() => {
                    setIsCelebrating(false);
                    setGameState('WON');
                }, 2000);
            } else {
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setTimeout(() => {
                    setGameState('FINISHED');
                }, DRAW_INTERVAL);
            }
            return;
        }

        // Trek de volgende bal (ook als dit de 36e is)
        const nextBall = drawDeckRef.current.pop();
        const newDrawn = [...drawnBalls, nextBall];

        setDrawnBalls(prev => [...prev, nextBall]);
        setCurrentBall(nextBall);

        // Check if this is the last ball (36/36) and if we won
        // Note: updatedChecked includes the auto-checked previous ball
        const isLastBall = newDrawn.length >= maxBalls;
        if (isLastBall) {
            // Auto-check de laatste bal ook als die op de kaart staat
            if (bingoCard.includes(nextBall)) {
                updatedChecked.add(nextBall);
            }
            
            // Check win condition with the updated checked numbers (includes auto-checked previous + last ball)
            const numbersToWin = bingoCard.filter(n => n !== null);
            const isWin = numbersToWin.every(n => updatedChecked.has(n));
            
            if (isWin) {
                // WIN! Start celebration
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setCheckedNumbers(updatedChecked);
                setIsCelebrating(true);
                const lookupCount = Math.max(newDrawn.length, 19);
                const wonPrize = PRIZES.find(p => p.balls === lookupCount);
                setPrize(wonPrize);
                
                setTimeout(() => {
                    setIsCelebrating(false);
                    setGameState('WON');
                }, 2000);
            } else {
                // No win, game finished - wacht DRAW_INTERVAL zodat gebruiker de laatste bal kan zien
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setTimeout(() => {
                    setGameState('FINISHED');
                }, DRAW_INTERVAL);
            }
        }

        // Update History
        // Check if this ball causes a win (if we auto-checked it or user checked it)
        // Actually, win check happens after check.
        // But for history display "Bingo! U wint...", we need to know if this ball *could* trigger bingo?
        // The prompt says: "The number of drawn balls that you needed for a full Bingo card, determines your prize."
        // So we check win condition *after* this ball is processed (and auto-checked).

        // Wait, auto-check happens for the *previous* ball when the *new* ball appears.
        // "if they dont check the number it will automatically be checked when the new number apperars"
        // So for the *current* ball (nextBall), the user has 4 seconds.

        // Add to history
        // We need to calculate the prize for the *current* step (index + 1).
        const ballIndex = newDrawn.length;
        const prizeInfo = PRIZES.find(p => p.balls === ballIndex);

        setHistory(prev => [{
            ball: nextBall,
            index: ballIndex,
            prize: prizeInfo,
            timestamp: Date.now()
        }, ...prev]);

    }, [drawnBalls, currentBall, bingoCard, checkedNumbers, maxBalls]);

    // Functie om interval te berekenen voor normale trekking
    // Ease-in: start langzaam, eindig snel (minder vakjes om te scannen naarmate je vordert)
    const getInterval = useCallback((currentBallIndex, hasManualBoost = false) => {
            const progress = currentBallIndex / maxBalls; // 0 tot 1
            // Ease-in: start langzaam, eindig snel
            // Gebruik quadratic ease-in: t^2
            const easedProgress = Math.pow(progress, 2);
            // Interval gaat van DRAW_INTERVAL (4000ms) naar DRAW_INTERVAL * 0.5 (2000ms)
            const maxInterval = DRAW_INTERVAL; // Start interval
            const minInterval = DRAW_INTERVAL * 0.95; // Eind interval (sneller)
            let interval = maxInterval - (maxInterval - minInterval) * easedProgress;
            
            // Extra snelheidsverhoging bij handmatig afvinken
            if (hasManualBoost) {
                interval *= MANUAL_CHECK_SPEED_BOOST;
            }
            
            return interval;
    }, [maxBalls]);

    // Game Loop met ease-out interval
    useEffect(() => {
        if (gameState !== 'PLAYING') return;

        // Initial draw
        if (drawnBalls.length === 0) {
            drawNextBall();
        }

        // Recursieve timeout functie in plaats van setInterval voor dynamische interval
        const scheduleNextBall = () => {
            if (gameState !== 'PLAYING') return;
            
            const currentIndex = drawnBalls.length;
            
            // Stop als we maxBalls hebben bereikt
            if (currentIndex >= maxBalls) {
                return;
            }
            
            const interval = getInterval(currentIndex, manualCheckBoost);
            
            timerRef.current = setTimeout(() => {
                // Reset manual boost na gebruik
                setManualCheckBoost(false);
                // Check opnieuw voordat we de bal trekken
                if (gameState === 'PLAYING' && drawnBalls.length < maxBalls) {
                    drawNextBall();
                    // Schedule volgende bal (drawNextBall zal zelf stoppen als we op maxBalls zitten)
                    scheduleNextBall();
                }
            }, interval);
        };
        
        // Store scheduleNextBall in ref voor handleCardClick
        scheduleNextBallRef.current = scheduleNextBall;

        scheduleNextBall();

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [gameState, drawNextBall, drawnBalls.length, maxBalls, manualCheckBoost, getInterval]);

    const [isSkipping, setIsSkipping] = useState(false);
    const [skipTarget, setSkipTarget] = useState(null);

    // Check Win Effect
    useEffect(() => {
        if (gameState !== 'PLAYING' || isSkipping) return;

        if (checkWin(checkedNumbers)) {
            // WIN! Start celebration met confetti, dan na delay naar won scherm
            clearInterval(timerRef.current);
            setIsCelebrating(true);
            
            // Calculate prize based on drawnBalls count
            const count = drawnBalls.length;
            const lookupCount = Math.max(count, 19); // Minimum prize at 19 balls
            const wonPrize = PRIZES.find(p => p.balls === lookupCount);
            setPrize(wonPrize);
            
            // Na 2 seconden celebration, ga naar won screen
            setTimeout(() => {
                setIsCelebrating(false);
                setGameState('WON');
            }, 2000);
        }
    }, [checkedNumbers, gameState, checkWin, drawnBalls.length, isSkipping]);

    // Skipping Animation Effect
    useEffect(() => {
        if (!isSkipping || !skipTarget) return;

        if (drawnBalls.length >= skipTarget.balls.length) {
            setIsSkipping(false);
            setPrize(skipTarget.prize);
            setCheckedNumbers(skipTarget.finalChecked);
            
            // Bewaar outcome voordat skipTarget wordt gereset
            const finalOutcome = skipTarget.outcome;
            setSkipTarget(null);
            
            // Toon bouncing ball met kaart fade-out voordat we naar result gaan
            setIsSkipEnding(true);
            
            skipResultTimeoutRef.current = setTimeout(() => {
                setIsSkipEnding(false);
                setSkipTransition(true);
                setGameState(finalOutcome);
                skipResultTimeoutRef.current = null;
            }, SKIP_RESULT_DELAY);
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

            setDrawnBalls(prev => [...prev, nextBall]);
            setCurrentBall(nextBall);

            // Auto-check card
            if (bingoCard.includes(nextBall)) {
                setCheckedNumbers(prev => new Set(prev).add(nextBall));
            }

            // Update history
            const ballIndex = nextBallIndex + 1;
            const prizeInfo = PRIZES.find(p => p.balls === ballIndex);
            setHistory(prev => [{
                ball: nextBall,
                index: ballIndex,
                prize: prizeInfo,
                timestamp: Date.now()
            }, ...prev]);

        }, delay);

        return () => {
            clearTimeout(timeout);
            if (skipResultTimeoutRef.current) {
                clearTimeout(skipResultTimeoutRef.current);
                skipResultTimeoutRef.current = null;
            }
        };
    }, [isSkipping, skipTarget, drawnBalls, bingoCard]);

    const handleCardClick = useCallback((number) => {
        if (gameState !== 'PLAYING' || isSkipping) return;
        if (!number) return;

        if (drawnBalls.includes(number)) {
            // If the clicked number is a drawn ball, check it and activate speed boost
            const newChecked = new Set(checkedNumbers);
            newChecked.add(number);

            // Auto-fill other drawn numbers on the card
            bingoCard.forEach(n => {
                if (n && drawnBalls.includes(n) && !newChecked.has(n)) {
                    newChecked.add(n);
                }
            });

            // Check win condition DIRECT met de nieuwe checked numbers
            const isWin = checkWin(newChecked);

            if (isWin) {
                // WIN! Stop het spel en ga direct naar celebration
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                setCheckedNumbers(newChecked);
                setIsCelebrating(true);
                
                // Calculate prize based on drawnBalls count
                const count = drawnBalls.length;
                const lookupCount = Math.max(count, 19);
                const wonPrize = PRIZES.find(p => p.balls === lookupCount);
                setPrize(wonPrize);
                
                // Na 2 seconden celebration, ga naar won screen
                setTimeout(() => {
                    setIsCelebrating(false);
                    setGameState('WON');
                }, 2000);
                return; // Stop hier, trek geen nieuwe bal
            }

            setCheckedNumbers(newChecked);

            // Direct de volgende bal trekken als je handmatig afvinkt
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            drawNextBall();
            
            // Activeer snelheidsboost voor de bal daarna
            setManualCheckBoost(true);
            
            // Schedule de volgende bal met boost
            if (scheduleNextBallRef.current) {
                scheduleNextBallRef.current();
            }
        } else {
            // Wiggle
            setWigglingNumber(number);
            setTimeout(() => setWigglingNumber(null), 500);
        }
    }, [gameState, isSkipping, drawnBalls, checkedNumbers, bingoCard, checkWin, getInterval, drawNextBall, maxBalls]);

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
            } else if (idx > maxIndex) {
                maxIndex = idx;
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

    // Functie om direct naar resultaat te gaan zonder het spel te spelen
    const skipToResult = useCallback(() => {
        if (gameState !== 'IDLE') return;

        // Always draw all 36 balls
        const currentMaxBalls = MAX_DRAWN_BALLS;
        setMaxBalls(currentMaxBalls);

        // Use existing card if available, otherwise generate a new one
        let grid = bingoCard;
        let deck = drawDeckRef.current;
        
        if (grid.length === 0 || deck.length === 0) {
            // Generate card if it doesn't exist
            const result = generateCard();
            grid = result.grid;
            deck = result.deck;
        }

        // Step 1: Get the drawn balls from the deck (same logic as startGame)
        // In startGame: deck.slice(-36) are the balls that will be drawn (pop() takes from end)
        const drawnBalls = deck.slice(-36); // These will be drawn

        // Step 2: Determine win/loss based on card numbers and drawn balls
        // Check if all card numbers (except null) are in the drawn balls
        const numbersToWin = grid.filter(n => n !== null);
        const isWin = numbersToWin.every(n => drawnBalls.includes(n));

        console.log('🎲 Skip to result - isWin check:', {
            isWin,
            numbersToWin: numbersToWin.length,
            drawnBalls: drawnBalls.length,
            missingNumbers: numbersToWin.filter(n => !drawnBalls.includes(n))
        });

        let outcome = 'FINISHED';
        let wonPrize = null;
        let finalDrawnBalls = drawnBalls;

        if (isWin) {
            // Find the index of the last number needed to complete the card
            let maxIndex = -1;
            numbersToWin.forEach(num => {
                const idx = drawnBalls.indexOf(num);
                if (idx > maxIndex) {
                    maxIndex = idx;
                }
            });

            outcome = 'WON';
            // If win, we stop at the winning ball
            finalDrawnBalls = drawnBalls.slice(0, maxIndex + 1);
            
            // Calculate Prize based on the number of balls needed
            const ballsCount = maxIndex + 1;
            const lookupCount = Math.max(ballsCount, 19);
            wonPrize = PRIZES.find(p => p.balls === lookupCount);
            console.log('🎲 Skip to result - WON:', { ballsCount, lookupCount, prize: wonPrize });
        } else {
            console.log('🎲 Skip to result - LOST');
        }

        // Calculate final checked numbers
        const finalChecked = new Set();
        grid.forEach(num => {
            if (num && finalDrawnBalls.includes(num)) {
                finalChecked.add(num);
            }
        });

        // Set all state directly
        setDrawnBalls(finalDrawnBalls);
        setCheckedNumbers(finalChecked);
        setPrize(wonPrize);
        setSkipTransition(true); // Geen loading screen voor skipToResult
        setIsTransitioning(false); // Geen loading screen
        setGameState(outcome);

        // Create history for all drawn balls (in reverse order, newest first)
        const historyItems = finalDrawnBalls.map((ball, index) => {
            const ballIndex = index + 1;
            const prizeInfo = PRIZES.find(p => p.balls === ballIndex);
            return {
                ball: ball,
                index: ballIndex,
                prize: prizeInfo,
                timestamp: Date.now()
            };
        });
        setHistory(historyItems.reverse());

    }, [gameState, bingoCard, generateCard]);

    // Transition effect: wanneer game eindigt, geen loading screen
    useEffect(() => {
        if (gameState === 'WON' || gameState === 'FINISHED') {
            // Geen loading screen - direct naar result
            setIsTransitioning(false);
            setSkipTransition(false);
        } else {
            setIsTransitioning(false);
            setSkipTransition(false);
        }
    }, [gameState]);

    // Reset game naar IDLE state
    const resetGame = useCallback(() => {
        clearInterval(timerRef.current);
        if (skipResultTimeoutRef.current) {
            clearTimeout(skipResultTimeoutRef.current);
            skipResultTimeoutRef.current = null;
        }
        setGameState('IDLE');
        setBingoCard([]);
        setDrawnBalls([]);
        setCurrentBall(null);
        setCheckedNumbers(new Set());
        setHistory([]);
        setPrize(null);
        setWigglingNumber(null);
        setIsTransitioning(false);
        setSkipTransition(false);
        setIsSkipping(false);
        setSkipTarget(null);
        setIsCelebrating(false);
        setManualCheckBoost(false);
        setIsSkipEnding(false);
        drawDeckRef.current = [];
    }, []);

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
        isTransitioning,
        isCelebrating,
        isSkipEnding,
        skipOutcome: skipTarget ? { outcome: skipTarget.outcome, prize: skipTarget.prize } : null,
        startGame,
        generateCard,
        handleCardClick,
        finishGame,
        skipToResult,
        resetGame
    };
};
